import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_YEARLY_SPECIAL

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { customerId } = await req.json()

    if (!customerId) {
      return Response.json({ error: 'customerId is required' }, { status: 400 })
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: PRICE_ID }],
      trial_period_days: 7,
      trial_settings: {
        end_behavior: { missing_payment_method: 'cancel' },
      },
      metadata: { plan_name: 'growth' },
    })

    return Response.json({ subscriptionId: subscription.id })
  } catch (error) {
    console.error('Free trial error:', error)
    return Response.json({ error: error.message || 'Failed to start trial' }, { status: 500 })
  }
}
