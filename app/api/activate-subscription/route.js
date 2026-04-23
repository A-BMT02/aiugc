import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendCapiEvent } from '../../../lib/capi'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PLAN_CREDITS = {
  growth: 120,
  pro: 225,
  starter: 65,
}

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const body = await req.json()
    console.log('[activate-subscription] received:', JSON.stringify(body))
    const { sessionId, subscriptionId, userId } = body

    if (!userId) {
      return Response.json({ error: 'userId is required' }, { status: 400 })
    }
    if (!sessionId && !subscriptionId) {
      return Response.json({ error: 'sessionId or subscriptionId is required' }, { status: 400 })
    }

    let subscription
    let planName
    let customerEmail
    let paymentIntentId

    if (sessionId) {
      console.log('[activate-subscription] retrieving session:', sessionId)
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      console.log('[activate-subscription] session payment_status:', session.payment_status, 'customer_email:', session.customer_details?.email)
      if (session.payment_status !== 'paid') {
        return Response.json({ error: 'Payment not completed' }, { status: 400 })
      }
      planName = session.metadata?.plan_name || 'growth'
      customerEmail = session.customer_details?.email
      paymentIntentId = session.payment_intent
      subscription = await stripe.subscriptions.retrieve(session.subscription)
    } else {
      console.log('[activate-subscription] retrieving subscription:', subscriptionId)
      subscription = await stripe.subscriptions.retrieve(subscriptionId)
      console.log('[activate-subscription] subscription status:', subscription.status)
      if (!['active', 'trialing'].includes(subscription.status)) {
        return Response.json({ error: 'Subscription not active' }, { status: 400 })
      }
      planName = subscription.metadata?.plan_name || 'growth'
      customerEmail = subscription.metadata?.customer_email
    }

    console.log('[activate-subscription] planName:', planName, 'customerEmail:', customerEmail)
    const creditsToAdd = PLAN_CREDITS[planName] || 0
    console.log('[activate-subscription] creditsToAdd:', creditsToAdd)

    // Fire CAPI Purchase event immediately after confirming payment
    console.log('[activate-subscription] firing CAPI, customerEmail:', customerEmail)
    if (customerEmail) {
      sendCapiEvent({
        eventName: 'Purchase',
        email: customerEmail,
        value: 47,
        currency: 'USD',
        contentIds: ['blobbi-growth'],
        customData: { predicted_ltv: 47, content_name: 'Blobbi Growth Plan' },
      }).catch(() => {})
    }

    const startDate = new Date(subscription.current_period_start * 1000).toISOString()
    const endDate = new Date(subscription.current_period_end * 1000).toISOString()

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
        subscription_tier: planName,
        subscription_status: 'active',
        subscription_start_date: startDate,
        subscription_end_date: endDate,
        stripe_subscription_id: subscription.id,
        credits_remaining: newCredits,
        total_credits_purchased: totalPurchased,
      })
      .eq('id', userId)

    await supabaseAdmin
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'purchase',
        amount: creditsToAdd,
        balance_after: newCredits,
        stripe_payment_id: paymentIntentId,
        description: `${planName} subscription - upsell purchase`,
      })

    console.log('[activate-subscription] done, creditsAdded:', creditsToAdd)
    return Response.json({ success: true, creditsAdded: creditsToAdd })
  } catch (error) {
    console.error('[activate-subscription] error:', error)
    return Response.json({ error: error.message || 'Failed to activate subscription' }, { status: 500 })
  }
}
