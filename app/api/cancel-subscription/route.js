import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { userId, reason, feedback } = await req.json()
    if (!userId) return Response.json({ error: 'userId required' }, { status: 400 })

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const { data: user, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('email, stripe_subscription_id, subscription_tier, subscription_end_date')
      .eq('id', userId)
      .single()

    if (fetchError || !user) return Response.json({ error: 'User not found' }, { status: 404 })

    const subscriptionId = user.stripe_subscription_id
    if (!subscriptionId) return Response.json({ error: 'No active subscription' }, { status: 400 })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    await supabaseAdmin
      .from('users')
      .update({ subscription_status: 'canceling' })
      .eq('id', userId)

    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Blobbi <hello@blobbi.ai>',
      to: 'hello@blobbi.ai',
      subject: `Cancellation: ${user.email} (${user.subscription_tier})`,
      html: `
        <h2>Subscription Cancellation</h2>
        <p><strong>User:</strong> ${user.email}</p>
        <p><strong>Plan:</strong> ${user.subscription_tier}</p>
        <p><strong>Access until:</strong> ${new Date(subscription.cancel_at * 1000).toLocaleDateString()}</p>
        <p><strong>Reason:</strong> ${reason || 'Not provided'}</p>
        <p><strong>Feedback:</strong> ${feedback || 'None'}</p>
      `,
    }).catch(() => {})

    return Response.json({
      success: true,
      cancelAt: new Date(subscription.cancel_at * 1000).toISOString(),
    })
  } catch (error) {
    console.error('Cancel subscription error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
