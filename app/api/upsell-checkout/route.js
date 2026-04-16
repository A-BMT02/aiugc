import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PRICE_ID = 'price_1TLABeROztKsDOlaSDDg6gog'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.blobbi.ai'

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const { email } = await req.json()

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ['card'],
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      mode: 'subscription',
      success_url: `${APP_URL}/upsell-trial?email=${encodeURIComponent(email)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/upsell-trial?email=${encodeURIComponent(email)}`,
      metadata: {
        plan_name: 'growth',
        email,
      },
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Upsell checkout error:', error)
    return Response.json({ error: error.message || 'Failed to create checkout' }, { status: 500 })
  }
}
