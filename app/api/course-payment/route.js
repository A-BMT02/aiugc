import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  try {
    const { name, email } = await req.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // $1.00 in cents
      currency: 'usd',
      receipt_email: email,
      metadata: {
        customer_name: name,
        customer_email: email,
        product: 'ai-ugc-course',
      },
    })

    return Response.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Payment intent error:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
