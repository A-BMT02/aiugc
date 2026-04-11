'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Zap, Shield, Clock, Star, AlertTriangle, ChevronRight } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import { createClient } from '@supabase/supabase-js'

const PRICE_ID = 'price_1TLABeROztKsDOlaSDDg6gog' // $197/year Growth Special

export default function LifetimeUpsellPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/login?redirect=/lifetime-upsell')
        return
      }

      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          priceId: PRICE_ID,
          planName: 'growth',
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Checkout failed')
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">

      {/* Top bar */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-2.5 px-4 text-sm font-bold tracking-wide">
        ⚡ FINAL OFFER &nbsp;•&nbsp; One-Time Annual Payment &nbsp;•&nbsp; Won't See This Price Again
      </div>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-5 pt-12 pb-6 text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6">
          <Star className="w-3.5 h-3.5" /> Special Upgrade Offer
        </div>
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
          Get A <span className="text-yellow-400">Full Year</span> of Blobbi<br />
          Growth Plan for Just{' '}
          <span className="bg-green-500 text-black px-2 rounded-md">$197</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
          This is your only chance to lock in the Growth plan for an entire year at this price. Once you leave this page, this offer is gone forever.
        </p>
      </div>

      {/* Price card */}
      <div className="max-w-2xl mx-auto px-5 mb-10">
        <div className="relative bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500 rounded-3xl p-7 overflow-hidden">
          <div className="absolute top-0 left-0 bg-green-500 text-black text-xs font-black px-4 py-1.5 rounded-br-xl uppercase tracking-wider">
            Yearly Deal
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-white font-black text-xl mb-0.5">Blobbi Growth — Full Year</p>
              <p className="text-gray-400 text-sm">Never lose access. Locked in for 12 months.</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 line-through text-lg">$708</p>
              <p className="text-green-400 font-black text-5xl leading-none">$197</p>
              <div className="bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full mt-1">
                ONE YEAR • 72% OFF
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What you get */}
      <div className="max-w-2xl mx-auto px-5 mb-10">
        <h2 className="text-2xl font-black text-center mb-8">Here's Everything You're Getting:</h2>

        <div className="space-y-5">

          {/* Item 1 */}
          <div className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className="w-11 h-11 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0 text-green-400 font-black text-lg">1</div>
            <div>
              <p className="font-black text-white text-lg mb-1">Full Year of Blobbi Growth Access</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">The same tool used to create every AI UGC video in this course. Locked in for 12 months — no monthly billing, no surprises.</p>
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                <Check className="w-4 h-4" /> Save $511 vs paying monthly
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0 text-blue-400 font-black text-lg">2</div>
            <div>
              <p className="font-black text-white text-lg mb-1">11 Minutes of AI UGC Video Per Month</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">That's 132 minutes of AI-generated content over the year — enough to run ads, build organic content, and test dozens of hooks.</p>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <Check className="w-4 h-4" /> Multiple Actors + Custom Actor
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <Check className="w-4 h-4" /> Product Holding + UGC Studio + AI Editor
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                  <Check className="w-4 h-4" /> Multiple languages included
                </div>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0 text-purple-400 font-black text-lg">3</div>
            <div>
              <p className="font-black text-white text-lg mb-1">Priority Support for 12 Months</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-2">Direct access to our team for any questions — software setup, content strategy, technical issues.</p>
              <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                <Check className="w-4 h-4" /> Value: $197 — Included FREE
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price CTA block */}
      <div className="max-w-2xl mx-auto px-5 mb-10 text-center">
        <p className="text-gray-500 text-sm uppercase tracking-widest mb-1">Just</p>
        <p className="text-7xl font-black text-white mb-1">$197</p>
        <p className="text-gray-500 line-through mb-6">Normally $708/year</p>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading ? 'Processing...' : 'YES! Lock In My $197 Yearly Plan →'}
        </button>
        <p className="text-gray-500 text-xs mt-3">One annual payment of $197 • Save $511 • Renews at $197/year</p>
      </div>

      {/* Comparison table */}
      <div className="max-w-2xl mx-auto px-5 mb-10">
        <h2 className="text-2xl font-black text-center mb-7">Monthly Subscriber vs Annual Owner</h2>
        <div className="grid grid-cols-2 gap-4">

          {/* Monthly */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <X className="w-5 h-5 text-red-400" />
              <p className="font-black text-red-400">Monthly Subscriber</p>
            </div>
            <ul className="space-y-3">
              {[
                'Pay $69 every single month',
                '$828/year total cost',
                'Lose access if you cancel',
                'Price can increase anytime',
                'Always at risk of losing progress',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                  <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Annual */}
          <div className="bg-green-500/5 border border-green-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Check className="w-5 h-5 text-green-400" />
              <p className="font-black text-green-400">Annual Owner</p>
            </div>
            <ul className="space-y-3">
              {[
                'Pay $197 once per year',
                'Save $511 immediately',
                'Locked in for 12 months',
                'Price guaranteed for the year',
                'Focus on results, not billing',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Why annual beats monthly */}
      <div className="max-w-2xl mx-auto px-5 mb-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <p className="font-black text-white text-lg mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" /> Why Annual Beats Monthly Every Time
          </p>
          <ul className="space-y-3">
            {[
              { title: 'No monthly anxiety', text: 'You\'re locked in for a year — just focus on creating and growing.' },
              { title: 'Massive cost saving', text: 'You\'re paying $16.42/month instead of $69/month. That\'s money back in your pocket every single month.' },
              { title: 'Consistency wins', text: 'The brands making money with AI UGC are the ones creating consistently. Annual access forces that habit.' },
              { title: 'We handle everything', text: 'Updates, new features, actor additions — all included. You just create.' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300"><span className="text-white font-bold">{item.title} —</span> {item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Urgency */}
      <div className="max-w-2xl mx-auto px-5 mb-10">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <p className="font-black text-orange-400 text-lg mb-2">This Offer Expires When You Leave This Page</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            This is NOT available anywhere else at this price. Once you navigate away, this offer disappears and the Growth plan goes back to full price. There are no second chances, no coupon codes, and no way to get back to this page at this price.
          </p>
        </div>
      </div>

      {/* Savings callout */}
      <div className="max-w-2xl mx-auto px-5 mb-10">
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm mb-1">$708 Regular Price — $197 Today = <span className="text-green-400 font-bold">$511 in Savings</span></p>
          <p className="text-4xl font-black text-white mb-1">You're Saving $511 Right Now</p>
          <p className="text-gray-500 text-sm">That's 72% off the standard yearly price</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-2xl mx-auto px-5 pb-16 text-center">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-black font-black text-2xl rounded-2xl transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/40 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mb-3"
        >
          {loading ? 'Processing...' : 'YES! Give Me The $197 Yearly Plan →'}
        </button>
        <p className="text-gray-500 text-xs mb-8">One annual payment of $197 • Cancel anytime • Instant access</p>

        <a
          href="/dashboard"
          className="text-gray-600 text-sm underline hover:text-gray-400 transition-colors"
        >
          No thanks, I'll pay full price monthly
        </a>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Shield className="w-4 h-4" /> 100% Secure Checkout
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Zap className="w-4 h-4" /> Instant Access
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Clock className="w-4 h-4" /> Limited Time Offer
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-4">Once you leave this page, this offer will no longer be available at this price.</p>
      </div>

    </div>
  )
}
