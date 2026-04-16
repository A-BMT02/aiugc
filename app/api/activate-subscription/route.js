import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

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

    const { sessionId, userId } = await req.json()

    if (!sessionId || !userId) {
      return Response.json({ error: 'sessionId and userId are required' }, { status: 400 })
    }

    // Retrieve and verify the Stripe checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return Response.json({ error: 'Payment not completed' }, { status: 400 })
    }

    const planName = session.metadata?.plan_name || 'growth'
    const creditsToAdd = PLAN_CREDITS[planName] || 120

    // Retrieve subscription details
    const subscription = await stripe.subscriptions.retrieve(session.subscription)

    const startDate = new Date(subscription.current_period_start * 1000).toISOString()
    const endDate = new Date(subscription.current_period_end * 1000).toISOString()

    // Get current user credits
    const { data: currentUser } = await supabaseAdmin
      .from('users')
      .select('credits_remaining, total_credits_purchased')
      .eq('id', userId)
      .single()

    const newCredits = (currentUser?.credits_remaining || 0) + creditsToAdd
    const totalPurchased = (currentUser?.total_credits_purchased || 0) + creditsToAdd

    // Update user subscription
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

    // Record transaction
    await supabaseAdmin
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'purchase',
        amount: creditsToAdd,
        balance_after: newCredits,
        stripe_payment_id: session.payment_intent,
        description: `${planName} subscription - upsell purchase`,
      })

    return Response.json({ success: true, creditsAdded: creditsToAdd })
  } catch (error) {
    console.error('Activate subscription error:', error)
    return Response.json({ error: error.message || 'Failed to activate subscription' }, { status: 500 })
  }
}
