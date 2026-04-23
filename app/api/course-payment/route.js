import Stripe from 'stripe'

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { name, email, bumps = {} } = await req.json()

    // $1 base + $19 per selected bump
    const bumpAmount = Object.values(bumps).filter(Boolean).length * 1900
    const amount = 100 + bumpAmount // in cents

    // Create a customer so we can save their card for the upsell
    const customer = await stripe.customers.create({ email, name })

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
      setup_future_usage: 'off_session', // saves card for one-click upsell
      receipt_email: email,
      metadata: {
        customer_name: name,
        customer_email: email,
        product: 'ai-ugc-course',
        bumps: JSON.stringify(bumps),
      },
    })

    return Response.json({ clientSecret: paymentIntent.client_secret, customerId: customer.id })
  } catch (error) {
    console.error('Payment intent error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
