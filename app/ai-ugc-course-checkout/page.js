'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Check, Lock, Shield, Zap, Star, ArrowRight, ChevronDown, ChevronUp, Plus } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const courseItems = [
  'AI UGC creation tools access',
  'Secret realism enhancers',
  'High-converting AI script writing prompts',
  'Avatar creation process for testing UGC at scale',
]

const whatYoullLearn = [
  'How to create scroll-stopping AI video ads in minutes',
  'The 5-part script structure that converts on Meta & TikTok',
  'Product & lifestyle UGC formats that work at scale',
  'How to launch and optimise your first paid AI UGC campaign',
]

const TESTIMONIAL_PHOTOS = [
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Sarah-Image.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Daniel-Image.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Federico-Image.jpg',
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

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [addGrowth, setAddGrowth] = useState(false)
  const [showLearn, setShowLearn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const stripeRef = useRef(null)
  const cardRef = useRef(null)
  const clientSecretRef = useRef(null)

  // Mount Stripe card element when entering step 2
  useEffect(() => {
    if (step !== 2) return

    let card

    async function mountStripe() {
      try {
        const stripe = await stripePromise
        stripeRef.current = stripe

        // Create payment intent (with setup_future_usage if Growth selected)
        const res = await fetch('/api/course-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, addGrowth }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        clientSecretRef.current = data.clientSecret

        // Mount card element
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

    return () => {
      if (card) card.destroy()
    }
  }, [step])

  const handleContinue = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields.')
      return
    }
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
      {
        payment_method: {
          card: cardRef.current,
          billing_details: { name, email },
        },
      }
    )

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
      return
    }

    if (paymentIntent.status !== 'succeeded') {
      setError('Payment did not complete. Please try again.')
      setLoading(false)
      return
    }

    // Send welcome email (fire and forget)
    fetch('/api/send-course-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    }).catch(() => {})

    if (addGrowth) {
      // Create Growth subscription using the same payment method
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
      // Fallback: go to upsell-trial without subscription
      window.location.href = `${window.location.origin}/upsell-trial?email=${encodeURIComponent(email)}`
    } else {
      window.location.href = `${window.location.origin}/lifetime-upsell?email=${encodeURIComponent(email)}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-8 object-contain" />
            <span className="font-black text-gray-900 text-lg">
              blobbi<span className="text-green-500">.</span>ai
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
            <Lock className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="grid md:grid-cols-[420px_1fr] gap-6 items-start">

          {/* ── LEFT: Order summary panel ── */}
          <div className="bg-white rounded-2xl p-8 shadow-sm md:sticky md:top-6 space-y-6">

            {/* Course contents */}
            <div>
              <h2 className="text-xl font-black text-gray-900 mb-1">Your Order Today</h2>
              <p className="text-green-600 font-bold text-sm mb-4">AI UGC Fast-Start Course — $1</p>
              <ul className="space-y-2.5 mb-4">
                {courseItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {/* What you'll learn toggle */}
              <button
                onClick={() => setShowLearn(!showLearn)}
                className="flex items-center gap-1.5 text-xs font-semibold text-green-600 hover:text-green-500 transition-colors"
              >
                {showLearn ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {showLearn ? 'Hide' : 'See'} what you'll learn
              </button>
              {showLearn && (
                <ul className="mt-3 space-y-2 pl-1">
                  {whatYoullLearn.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-500">
                      <span className="text-green-500 font-bold mt-0.5">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Growth add-on toggle */}
            <div
              onClick={() => setAddGrowth(!addGrowth)}
              className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${addGrowth ? 'border-green-500 bg-green-50' : 'border-dashed border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${addGrowth ? 'bg-green-500' : 'border-2 border-gray-300 bg-white'}`}>
                    {addGrowth && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-black text-sm text-gray-900">Add Blobbi Growth</span>
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">7-day free trial</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      20+ AI UGC videos/month, UGC Studio, AI Editor &amp; more.<br />
                      $0 now, then $47/month after trial. Cancel anytime.
                    </p>
                  </div>
                </div>
                {!addGrowth && <Plus className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>AI UGC Fast-Start Course</span>
                <span className="font-semibold">$1.00</span>
              </div>
              {addGrowth && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Blobbi Growth (7-day trial)</span>
                  <span className="font-semibold text-green-600">$0 today</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-100">
                <span>Total today</span>
                <span>$1.00</span>
              </div>
              {addGrowth && (
                <p className="text-xs text-gray-400">Then $47/month after 7 days (cancel anytime)</p>
              )}
            </div>

            {/* Trust */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-green-500 shrink-0" />
                30-Day Money-Back Guarantee
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Lock className="w-4 h-4 text-green-500 shrink-0" />
                256-bit SSL Secure Encryption
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center bg-gray-900">
              <img src="/money-back-guarantee.png" alt="30-Day Money-Back Guarantee" className="h-24 object-contain" />
            </div>
          </div>

          {/* ── RIGHT: Form column ── */}
          <div className="flex flex-col gap-4">

            {/* Flash banner */}
            <div className="bg-orange-500 text-white text-center py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 fill-white" />
              Limited Time Offer — Only $1 Today!
            </div>

            {/* Social proof */}
            <div className="bg-white rounded-2xl px-6 py-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {TESTIMONIAL_PHOTOS.map((src, i) => (
                    <img key={i} src={src} alt="" className="w-9 h-9 rounded-full object-cover border-2 border-white" />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    <span className="text-orange-500">1,247+</span> students enrolled
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic mt-3">
                "We just hit our first $10,000 month using AI UGC ads built with Blobbi." — <strong>Sarah M.</strong>
              </p>
            </div>

            {/* Form card */}
            <div className="bg-white rounded-2xl px-6 py-7 shadow-sm">

              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-7">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black ${step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <span className={`text-sm font-semibold ${step === 1 ? 'text-gray-900' : 'text-gray-400'}`}>Info</span>
                </div>
                <div className="flex-1 h-px bg-gray-200 relative">
                  <div className={`absolute inset-y-0 left-0 bg-orange-400 transition-all duration-500 ${step > 1 ? 'w-full' : 'w-0'}`} />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black ${step === 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    2
                  </div>
                  <span className={`text-sm font-semibold ${step === 2 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-2xl font-black text-gray-900 mb-1">Complete Your Order</h1>
              <p className="text-gray-500 text-sm mb-6">Get instant access to everything</p>

              {/* ── STEP 1: Info ── */}
              {step === 1 && (
                <form onSubmit={handleContinue} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> We'll send your login details here
                    </p>
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    Continue to Payment <ArrowRight className="w-5 h-5" />
                  </button>

                  <TrustRow />
                </form>
              )}

              {/* ── STEP 2: Payment ── */}
              {step === 2 && (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Details</label>
                    <div
                      id="card-element"
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {loading
                      ? 'Processing...'
                      : addGrowth
                        ? 'Complete Order — $1.00 + Growth Trial'
                        : 'Complete My Order — $1.00'}
                  </button>

                  <TrustRow />

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ← Back to info
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-200 py-6 px-6">
        <div className="max-w-5xl mx-auto text-center text-xs text-gray-400 space-y-1">
          <p>© 2026 Blobbi.ai · <Link href="/privacy" className="hover:text-gray-600 transition">Privacy Policy</Link> · <Link href="/terms" className="hover:text-gray-600 transition">Terms of Service</Link> · <a href="mailto:support@blobbi.ai" className="hover:text-gray-600 transition">Contact Support</a></p>
          <p>Results mentioned are not typical. Individual results will vary.</p>
        </div>
      </footer>

    </div>
  )
}
