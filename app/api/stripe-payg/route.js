import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { global: { headers: { Authorization: authHeader } } }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const PRICE_IDS = {
      Starter: 'price_1TeL9rROztKsDOlaiklOBIJT',
      Creator: 'price_1TeLAeROztKsDOlaWqmuEpgm',
      Studio:  'price_1TeLBMROztKsDOlaSPd7L0m0',
    }

    const { packName, credits, duration } = await req.json()
    if (!packName || !credits) {
      return Response.json({ error: 'packName and credits are required' }, { status: 400 })
    }

    const priceId = PRICE_IDS[packName]
    if (!priceId) {
      return Response.json({ error: 'Unknown pack' }, { status: 400 })
    }

    // Get or create Stripe customer
    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    let customerId = userData?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userData?.email || user.email,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payg/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payg`,
      metadata: {
        user_id: user.id,
        pack_name: packName,
        credits: String(credits),
        duration,
      },
    })

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('PAYG checkout error:', error)
    return Response.json({ error: error.message || 'Failed to create checkout' }, { status: 500 })
  }
}
