import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
})

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

const getRawBody = async (req: NextRequest): Promise<Buffer> => {
  const chunks: Uint8Array[] = []
  const reader = req.body?.getReader()

  if (!reader) {
    throw new Error('No request body found')
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  return Buffer.concat(chunks.map(chunk => Buffer.from(chunk)), totalLength)
}

// Credit mapping for each plan
const PLAN_CREDITS = {
  starter: 300,
  growth: 700,
  pro: 1500,
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await getRawBody(req)
    const sig = req.headers.get('stripe-signature')

    if (!sig) {
      return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('✅ Checkout completed:', session.id)

        const userId = session.metadata?.user_id
        const planName = session.metadata?.plan_name

        if (!userId || !planName) {
          console.error('Missing metadata in session')
          return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
        }

        // Get the subscription - retrieve returns the subscription object directly
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string) as Stripe.Subscription
        
        // Determine credits based on plan
        const planKey = planName.toLowerCase() as keyof typeof PLAN_CREDITS
        const creditsToAdd = PLAN_CREDITS[planKey] || 0

        // Update user in database
        const { data: currentUser } = await supabaseAdmin
          .from('users')
          .select('credits_remaining, total_credits_purchased')
          .eq('id', userId)
          .single()

        const newCredits = (currentUser?.credits_remaining || 0) + creditsToAdd
        const totalPurchased = (currentUser?.total_credits_purchased || 0) + creditsToAdd

        await supabaseAdmin
          .from('users')
          .update({
            subscription_tier: planName.toLowerCase(),
            subscription_status: 'active',
            subscription_start_date: new Date((subscription as any).current_period_start * 1000).toISOString(),
            subscription_end_date: new Date((subscription as any).current_period_end * 1000).toISOString(),
            stripe_subscription_id: subscription.id,
            credits_remaining: newCredits,
            total_credits_purchased: totalPurchased,
          })
          .eq('id', userId)

        // Record the transaction
        await supabaseAdmin
          .from('credit_transactions')
          .insert({
            user_id: userId,
            type: 'purchase',
            amount: creditsToAdd,
            balance_after: newCredits,
            stripe_payment_id: session.payment_intent as string,
            description: `${planName} subscription - initial purchase`,
          })

        // Record payment history
        await supabaseAdmin
          .from('payment_history')
          .insert({
            user_id: userId,
            amount: session.amount_total! / 100,
            currency: session.currency || 'usd',
            status: 'succeeded',
            stripe_payment_intent_id: session.payment_intent as string,
            subscription_plan_id: planName.toLowerCase(),
            credits_added: creditsToAdd,
            description: `${planName} subscription purchase`,
          })

        console.log(`✅ User ${userId} subscribed to ${planName}, added ${creditsToAdd} credits`)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        // Skip the first invoice (handled by checkout.session.completed)
        if (invoice.billing_reason === 'subscription_create') {
          console.log('Skipping first invoice (already handled)')
          return NextResponse.json({ received: true })
        }

        // Handle subscription renewal
        const subscription = await stripe.subscriptions.retrieve((invoice as any).subscription as string) as Stripe.Subscription
        
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('id, subscription_tier, credits_remaining, total_credits_purchased')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (!userData) {
          console.error('User not found for subscription:', subscription.id)
          return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        const planKey = userData.subscription_tier as keyof typeof PLAN_CREDITS
        const creditsToAdd = PLAN_CREDITS[planKey] || 0

        const newCredits = (userData.credits_remaining || 0) + creditsToAdd
        const totalPurchased = (userData.total_credits_purchased || 0) + creditsToAdd

        await supabaseAdmin
          .from('users')
          .update({
            credits_remaining: newCredits,
            total_credits_purchased: totalPurchased,
            subscription_end_date: new Date((subscription as any).current_period_end * 1000).toISOString(),
          })
          .eq('id', userData.id)

        await supabaseAdmin
          .from('credit_transactions')
          .insert({
            user_id: userData.id,
            type: 'purchase',
            amount: creditsToAdd,
            balance_after: newCredits,
            stripe_payment_id: (invoice as any).payment_intent as string,
            description: `${userData.subscription_tier} subscription renewal`,
          })

        await supabaseAdmin
          .from('payment_history')
          .insert({
            user_id: userData.id,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            status: 'succeeded',
            stripe_payment_intent_id: (invoice as any).payment_intent as string,
            subscription_plan_id: userData.subscription_tier,
            credits_added: creditsToAdd,
            description: 'Subscription renewal',
          })

        console.log(`✅ Subscription renewed for user ${userData.id}, added ${creditsToAdd} credits`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        await supabaseAdmin
          .from('users')
          .update({
            subscription_status: 'canceled',
            subscription_tier: 'free',
          })
          .eq('stripe_subscription_id', subscription.id)

        console.log(`✅ Subscription canceled: ${subscription.id}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}