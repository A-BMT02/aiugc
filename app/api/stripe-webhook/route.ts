import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

// Add runtime config to prevent build-time evaluation
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Lazy initialization - only create Stripe client when route is called
const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-12-15.clover',
  })
}

const getSupabaseAdmin = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Supabase environment variables are not set')
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

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
// 10 credits per minute of video
// Start Up: 6 min = 60 credits + 2 credits (10 edits @ 0.2) = 62 ≈ 65 credits
// Growth: 11 min = 110 credits + 4 credits (20 edits @ 0.2) = 114 ≈ 120 credits
// Pro: 21 min = 210 credits + 6 credits (30 edits @ 0.2) = 216 ≈ 225 credits
const PLAN_CREDITS = {
  'start up': 65,
  starter: 65,
  growth: 120,
  pro: 225,
}

export async function POST(req: NextRequest) {
  try {
    // Initialize clients at runtime
    const stripe = getStripe()
    const supabaseAdmin = getSupabaseAdmin()
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

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
        console.log('📦 Session metadata:', session.metadata)
        console.log('💳 Session subscription:', session.subscription)

        const userId = session.metadata?.user_id
        const planName = session.metadata?.plan_name

        if (!userId || !planName) {
          // Upsell checkout sessions have no user_id — handled by /api/activate-subscription
          console.log('ℹ️ No user_id in session metadata, skipping (upsell flow)')
          return NextResponse.json({ received: true })
        }

        console.log('👤 Processing for user:', userId, 'Plan:', planName)

        // Normalize plan name to match database constraint
        // "Start Up" -> "starter"
        const normalizedPlanName = planName.toLowerCase() === 'start up' ? 'starter' : planName.toLowerCase()
        console.log('📝 Normalized plan name:', normalizedPlanName)

        // Get the subscription
        const subscriptionId = session.subscription as string
        if (!subscriptionId) {
          console.error('❌ No subscription ID in session')
          return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
        }

        console.log('🔍 Fetching subscription:', subscriptionId)
        const subscription : any = await stripe.subscriptions.retrieve(subscriptionId)
        console.log('📅 Subscription periods:', {
          start: subscription.current_period_start,
          end: subscription.current_period_end
        })
        
        // Determine credits based on plan
        const planKey = planName.toLowerCase() as keyof typeof PLAN_CREDITS
        const creditsToAdd = PLAN_CREDITS[planKey] || 0

        if (creditsToAdd === 0) {
          console.error('⚠️ Unknown plan:', planName, 'Available plans:', Object.keys(PLAN_CREDITS))
        } else {
          console.log('💰 Credits to add:', creditsToAdd)
        }

        // Get current user data
        console.log('🔍 Fetching current user data for:', userId)
        const { data: currentUser, error: fetchError } = await supabaseAdmin
          .from('users')
          .select('credits_remaining, total_credits_purchased')
          .eq('id', userId)
          .single()

        if (fetchError) {
          console.error('❌ Error fetching user:', fetchError)
        } else {
          console.log('📊 Current user data:', currentUser)
        }

        const newCredits = (currentUser?.credits_remaining || 0) + creditsToAdd
        const totalPurchased = (currentUser?.total_credits_purchased || 0) + creditsToAdd

        console.log('➕ New credits:', newCredits, 'Total purchased:', totalPurchased)

        // Convert Unix timestamps to ISO strings safely
        const startDate = subscription.current_period_start 
          ? new Date(subscription.current_period_start * 1000).toISOString()
          : new Date().toISOString()
        
        const endDate = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now

        console.log('📅 Dates:', { startDate, endDate })

        const updateData = {
          subscription_tier: normalizedPlanName,
          subscription_status: 'active',
          subscription_start_date: startDate,
          subscription_end_date: endDate,
          stripe_subscription_id: subscription.id,
          credits_remaining: newCredits,
          total_credits_purchased: totalPurchased,
        }

        console.log('💾 Updating user with data:', updateData)

        // Update user in database
        const { data: updatedUser, error: updateError } = await supabaseAdmin
          .from('users')
          .update(updateData)
          .eq('id', userId)
          .select()

        if (updateError) {
          console.error('❌ Error updating user:', updateError)
          return NextResponse.json({ error: 'Failed to update user' }, { status: 500 })
        }

        console.log('✅ User updated successfully:', updatedUser)

        // Record the transaction
        console.log('💳 Recording credit transaction...')
        const { error: transactionError } = await supabaseAdmin
          .from('credit_transactions')
          .insert({
            user_id: userId,
            type: 'purchase',
            amount: creditsToAdd,
            balance_after: newCredits,
            stripe_payment_id: session.payment_intent as string,
            description: `${planName} subscription - initial purchase`,
          })

        if (transactionError) {
          console.error('❌ Error recording transaction:', transactionError)
        } else {
          console.log('✅ Transaction recorded')
        }

        // Record payment history
        console.log('📝 Recording payment history...')
        const { error: paymentError } = await supabaseAdmin
          .from('payment_history')
          .insert({
            user_id: userId,
            amount: (session.amount_total || 0) / 100,
            currency: session.currency || 'usd',
            status: 'succeeded',
            stripe_payment_intent_id: session.payment_intent as string,
            subscription_plan_id: normalizedPlanName,
            credits_added: creditsToAdd,
            description: `${planName} subscription purchase`,
          })

        if (paymentError) {
          console.error('❌ Error recording payment:', paymentError)
        } else {
          console.log('✅ Payment history recorded')
        }

        console.log(`✅✅✅ COMPLETE: User ${userId} subscribed to ${planName}, added ${creditsToAdd} credits`)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice : any = event.data.object as Stripe.Invoice

        // Skip the first invoice (handled by checkout.session.completed)
        if (invoice.billing_reason === 'subscription_create') {
          console.log('Skipping first invoice (already handled)')
          return NextResponse.json({ received: true })
        }

        // Handle subscription renewal
        const subscriptionId = invoice.subscription as string
        if (!subscriptionId) {
          console.error('No subscription ID in invoice')
          return NextResponse.json({ error: 'No subscription found' }, { status: 400 })
        }

        const subscription : any = await stripe.subscriptions.retrieve(subscriptionId)
        
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

        const endDate = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

        await supabaseAdmin
          .from('users')
          .update({
            credits_remaining: newCredits,
            total_credits_purchased: totalPurchased,
            subscription_end_date: endDate,
          })
          .eq('id', userData.id)

        await supabaseAdmin
          .from('credit_transactions')
          .insert({
            user_id: userData.id,
            type: 'purchase',
            amount: creditsToAdd,
            balance_after: newCredits,
            stripe_payment_id: invoice.payment_intent as string,
            description: `${userData.subscription_tier} subscription renewal`,
          })

        await supabaseAdmin
          .from('payment_history')
          .insert({
            user_id: userData.id,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            status: 'succeeded',
            stripe_payment_intent_id: invoice.payment_intent as string,
            subscription_plan_id: userData.subscription_tier,
            credits_added: creditsToAdd,
            description: 'Subscription renewal',
          })

        console.log(`✅ Subscription renewed for user ${userData.id}, added ${creditsToAdd} credits`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription : any = event.data.object as Stripe.Subscription

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