import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { paymentMethodId, email, name } = await req.json()

    if (!paymentMethodId || !email) {
      return Response.json({ error: 'paymentMethodId and email are required' }, { status: 400 })
    }

    // Create a Stripe customer and attach the payment method
    const customer = await stripe.customers.create({
      email,
      name: name || '',
      payment_method: paymentMethodId,
      invoice_settings: { default_payment_method: paymentMethodId },
    })

    // Create subscription with 7-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_GROWTH_MONTHLY }],
      trial_period_days: 7,
      default_payment_method: paymentMethodId,
      metadata: {
        plan_name: 'growth',
        email,
      },
    })

    return Response.json({ subscriptionId: subscription.id })
  } catch (error) {
    console.error('Create growth subscription error:', error)
    return Response.json({ error: error.message || 'Failed to create subscription' }, { status: 500 })
  }
}
