'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Check, Lock, Shield, Zap, Star, ArrowRight, Tag } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const courseItems = [
  'AI UGC creation tools access',
  'Secret realism enhancers',
  'High-converting AI script writing prompts',
  'Avatar creation process for testing UGC at scale',
]

const TESTIMONIAL_PHOTOS = [
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Sarah-Image.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Daniel-Image.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Federico-Image.jpg',
]

const BUMPS = [
  {
    id: 'bump1',
    tag: 'Bump 1',
    title: 'AI UGC Ad Script Bank — $19',
    price: 19,
    regular: 147,
    desc: '100 done-for-you UGC ad scripts across 9 niches, each with a hook, body script, and CTA ready to paste into Blobbi.',
  },
  {
    id: 'bump2',
    tag: 'Bump 2',
    title: 'AI UGC Agency Blueprint — $19',
    price: 19,
    regular: 97,
    desc: 'A guide to packaging and selling AI UGC as a service to clients as a monthly retainer.',
  },
]

function TrustRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-gray-500 mt-4">
      <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-green-500" /> Secure checkout</span>
      <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-500" /> 30-day guarantee</span>
      <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-green-500" /> Instant access</span>
    </div>
  )
}

function BumpCard({ bump, selected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${selected ? 'border-orange-400 bg-orange-50' : 'border-dashed border-gray-300 hover:border-gray-400 bg-white'}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${selected ? 'bg-orange-500' : 'border-2 border-gray-300 bg-white'}`}>
          {selected && <Check className="w-3 h-3 text-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{bump.tag}</span>
            <span className="text-xs text-gray-400">(regular price ${bump.regular})</span>
          </div>
          <p className="font-bold text-sm text-gray-900 mb-1">{bump.title}</p>
          <p className="text-xs text-gray-500 leading-relaxed">{bump.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedBumps, setSelectedBumps] = useState({})
  const [addGrowth, setAddGrowth] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const stripeRef = useRef(null)
  const cardRef = useRef(null)
  const clientSecretRef = useRef(null)

  const bumpTotal = BUMPS.filter(b => selectedBumps[b.id]).reduce((sum, b) => sum + b.price, 0)
  const total = 1 + bumpTotal

  const toggleBump = (id) => setSelectedBumps(prev => ({ ...prev, [id]: !prev[id] }))

  // Mount Stripe card element when entering step 2
  useEffect(() => {
    if (step !== 2) return

    let card

    async function mountStripe() {
      try {
        const stripe = await stripePromise
        stripeRef.current = stripe

        const res = await fetch('/api/course-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, addGrowth, bumps: selectedBumps }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        clientSecretRef.current = data.clientSecret

        const elements = stripe.elements()
        card = elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#111827',
              fontFamily: 'inherit',
              '::placeholder': { color: '#9ca3af' },
            },
            invalid: { color: '#ef4444' },
          },
        })
        card.mount('#card-element')
        cardRef.current = card
      } catch (err) {
        setError(err.message || 'Failed to load payment form.')
      }
    }

    mountStripe()
    return () => { if (card) card.destroy() }
  }, [step])

  const handleContinue = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) { setError('Please fill in all fields.'); return }
    setError('')
    setStep(2)
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    if (!stripeRef.current || !cardRef.current || !clientSecretRef.current) return
    setLoading(true)
    setError('')

    const { error: stripeError, paymentIntent } = await stripeRef.current.confirmCardPayment(
      clientSecretRef.current,
      { payment_method: { card: cardRef.current, billing_details: { name, email } } }
    )

    if (stripeError) { setError(stripeError.message); setLoading(false); return }
    if (paymentIntent.status !== 'succeeded') { setError('Payment did not complete. Please try again.'); setLoading(false); return }

    // Send welcome email
    fetch('/api/send-course-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    }).catch(() => {})

    if (addGrowth) {
      const pmId = typeof paymentIntent.payment_method === 'string'
        ? paymentIntent.payment_method
        : paymentIntent.payment_method?.id

      if (pmId) {
        try {
          const subRes = await fetch('/api/create-growth-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentMethodId: pmId, email, name }),
          })
          const subData = await subRes.json()
          if (subData.subscriptionId) {
            window.location.href = `${window.location.origin}/upsell-trial?email=${encodeURIComponent(email)}&subscription_id=${subData.subscriptionId}`
            return
          }
        } catch {}
      }
      window.location.href = `${window.location.origin}/upsell-trial?email=${encodeURIComponent(email)}`
    } else {
      window.location.href = `${window.location.origin}/lifetime-upsell?email=${encodeURIComponent(email)}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-8 object-contain" />
            <span className="font-black text-gray-900 text-lg">blobbi<span className="text-green-500">.</span>ai</span>
          </div>
          <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
            <Lock className="w-4 h-4" /> Secure Checkout
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="grid lg:grid-cols-[340px_1fr] gap-6 items-start">

          {/* ── LEFT: Order summary ── */}
          <div className="lg:sticky lg:top-6 space-y-4">

            {/* What's included */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Your order</p>
              <h2 className="text-lg font-black text-gray-900 mb-1">AI UGC Fast-Start Course</h2>
              <p className="text-2xl font-black text-orange-500 mb-4">$1 <span className="text-sm text-gray-400 font-normal line-through">$297</span></p>

              <ul className="space-y-2.5 mb-5">
                {courseItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Free bonus */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1.5">Free bonus included</p>
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">30-Day AI UGC Production Calendar</p>
                    <p className="text-xs text-gray-500">Day-by-day content schedule — included free</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order total */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>AI UGC Fast-Start Course</span>
                <span className="font-semibold">$1.00</span>
              </div>
              {BUMPS.filter(b => selectedBumps[b.id]).map(b => (
                <div key={b.id} className="flex justify-between text-sm text-gray-500">
                  <span>{b.title}</span>
                  <span className="font-semibold">${b.price}.00</span>
                </div>
              ))}
              {addGrowth && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Blobbi Growth (7-day trial)</span>
                  <span className="font-semibold">$0 today</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Total today</span>
                <span>${total}.00</span>
              </div>
              {addGrowth && <p className="text-xs text-gray-400">Then $47/month after 7 days</p>}
            </div>

            {/* Trust */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-500 shrink-0" /> 30-Day Money-Back Guarantee
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock className="w-4 h-4 text-green-500 shrink-0" /> 256-bit SSL Secure Encryption
              </div>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-3 flex items-center justify-center bg-gray-900 mt-2">
                <img src="/money-back-guarantee.png" alt="30-Day Money-Back Guarantee" className="h-20 object-contain" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form + add-ons ── */}
          <div className="flex flex-col gap-4">

            {/* Flash banner */}
            <div className="bg-orange-500 text-white text-center py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 fill-white" /> Limited Time Offer — Only $1 Today!
            </div>

            {/* Social proof */}
            <div className="bg-white rounded-2xl px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {TESTIMONIAL_PHOTOS.map((src, i) => (
                    <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <p className="text-sm font-semibold text-gray-700"><span className="text-orange-500">1,247+</span> students enrolled</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic mt-3">"We just hit our first $10,000 month using AI UGC ads built with Blobbi." — <strong>Sarah M.</strong></p>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl px-6 py-6 shadow-sm">

              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-6">
                {[{ n: 1, label: 'Info' }, { n: 2, label: 'Payment' }].map(({ n, label }, i, arr) => (
                  <div key={n} className="flex items-center gap-2 flex-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${step > n ? 'bg-green-500 text-white' : step === n ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {step > n ? <Check className="w-4 h-4" /> : n}
                    </div>
                    <span className={`text-sm font-semibold ${step === n ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
                    {i < arr.length - 1 && (
                      <div className="flex-1 h-px bg-gray-200 relative mx-1">
                        <div className={`absolute inset-y-0 left-0 bg-orange-400 transition-all duration-500 ${step > n ? 'w-full' : 'w-0'}`} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h1 className="text-xl font-black text-gray-900 mb-1">Complete Your Order</h1>
              <p className="text-gray-500 text-sm mb-5">Get instant access to everything</p>

              {/* STEP 1 */}
              {step === 1 && (
                <form onSubmit={handleContinue} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your full name" required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-sm" />
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1"><Lock className="w-3 h-3" /> We'll send your login details here</p>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2">
                    Continue to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                  <TrustRow />
                </form>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <form onSubmit={handlePayment} className="space-y-4">

                  {/* Order bumps */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="w-4 h-4 text-orange-500" />
                      <p className="text-sm font-black text-gray-900">Upgrade your order — one-time add-ons</p>
                    </div>
                    {BUMPS.map(bump => (
                      <BumpCard key={bump.id} bump={bump} selected={!!selectedBumps[bump.id]} onToggle={() => toggleBump(bump.id)} />
                    ))}
                  </div>

                  {/* Growth add-on */}
                  <div onClick={() => setAddGrowth(!addGrowth)}
                    className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${addGrowth ? 'border-green-500 bg-green-50' : 'border-dashed border-gray-300 hover:border-gray-400'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${addGrowth ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'}`}>
                        {addGrowth && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-black text-sm text-gray-900">Add Blobbi Growth Platform</span>
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">7-day free trial</span>
                        </div>
                        <p className="text-xs text-gray-500">20+ AI UGC videos/month, UGC Studio, AI Editor &amp; more. $0 now, then $47/month after trial.</p>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Details</label>
                    <div id="card-element" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all" />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2">
                    {loading ? 'Processing...' : `Complete Order — $${total}.00${addGrowth ? ' + Growth Trial' : ''}`}
                  </button>

                  <TrustRow />

                  <button type="button" onClick={() => setStep(1)} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors">
                    ← Back to info
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-6 px-6">
        <div className="max-w-6xl mx-auto text-center text-xs text-gray-400 space-y-1">
          <p>© 2026 Blobbi.ai · <Link href="/privacy" className="hover:text-gray-600 transition">Privacy Policy</Link> · <Link href="/terms" className="hover:text-gray-600 transition">Terms of Service</Link> · <a href="mailto:support@blobbi.ai" className="hover:text-gray-600 transition">Contact Support</a></p>
          <p>Results mentioned are not typical. Individual results will vary.</p>
        </div>
      </footer>
    </div>
  )
}
