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

    // Get the saved payment method from the course purchase
    const paymentMethods = await stripe.paymentMethods.list({ customer: customerId, type: 'card' })
    const paymentMethodId = paymentMethods.data[0]?.id

    if (!paymentMethodId) {
      return Response.json({ error: 'No saved payment method found' }, { status: 400 })
    }

    // Set as default payment method on customer
    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    })

    // Create subscription directly — no Stripe redirect needed
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: PRICE_ID }],
      default_payment_method: paymentMethodId,
      trial_period_days: 7,
      metadata: { plan_name: 'growth' },
    })

    return Response.json({ subscriptionId: subscription.id })
  } catch (error) {
    console.error('Upsell subscribe error:', error)
    return Response.json({ error: error.message || 'Failed to create subscription' }, { status: 500 })
  }
}
