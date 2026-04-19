import Stripe from 'stripe'

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { name, email, addGrowth, bumps = {} } = await req.json()

    // $1 base + $19 per selected bump
    const bumpAmount = Object.values(bumps).filter(Boolean).length * 1900
    const amount = 100 + bumpAmount // in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
      ...(addGrowth ? { setup_future_usage: 'off_session' } : {}),
      metadata: {
        customer_name: name,
        customer_email: email,
        product: 'ai-ugc-course',
        add_growth: addGrowth ? 'true' : 'false',
        bumps: JSON.stringify(bumps),
      },
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Payment intent error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
