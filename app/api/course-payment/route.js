import Stripe from 'stripe'

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { name, email, addGrowth } = await req.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // $1.00 in cents
      currency: 'usd',
      receipt_email: email,
      // Save the card for subscription creation if Growth is selected
      ...(addGrowth ? { setup_future_usage: 'off_session' } : {}),
      metadata: {
        customer_name: name,
        customer_email: email,
        product: 'ai-ugc-course',
        add_growth: addGrowth ? 'true' : 'false',
      },
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Payment intent error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
