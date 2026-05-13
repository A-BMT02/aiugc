'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Clock, Check, Zap, Calendar, Video, Headphones, Shield, Star } from 'lucide-react'
import { trackEvent } from '../../lib/pixel'

const getCookie = (name) => {
  if (typeof document === 'undefined') return undefined
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : undefined
}

function LifetimeUpsellContent() {
  const [loading, setLoading] = useState(false)
  const [trialLoading, setTrialLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = (typeof window !== 'undefined' ? localStorage.getItem('blobbi_email') : null) || searchParams.get('email') || ''

  const handleCheckout = async () => {
    setLoading(true)
    trackEvent('InitiateCheckout', { value: 47, currency: 'USD', content_name: 'Blobbi Growth Plan' })
    try {
      const customerId = typeof window !== 'undefined' ? localStorage.getItem('blobbi_customer_id') : null

      if (customerId) {
        const res = await fetch('/api/upsell-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        localStorage.removeItem('blobbi_customer_id')
        router.push(`/upsell-trial?subscription_id=${data.subscriptionId}`)
      } else {
        if (email) localStorage.setItem('blobbi_email', email)
        const res = await fetch('/api/upsell-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, fbc: getCookie('_fbc'), fbp: getCookie('_fbp') }),
        })
        const data = await res.json()
        if (data.url) window.location.href = data.url
        else throw new Error(data.error || 'Checkout failed')
      }
    } catch (err) {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFreeTrial = async () => {
    setTrialLoading(true)
    try {
      const customerId = typeof window !== 'undefined' ? localStorage.getItem('blobbi_customer_id') : null
      if (customerId) {
        const res = await fetch('/api/free-trial', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId }),
        })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        localStorage.removeItem('blobbi_customer_id')
        router.push(`/upsell-trial?subscription_id=${data.subscriptionId}&free_trial=1`)
      } else {
        router.push('/upsell-trial')
      }
    } catch (err) {
      router.push('/upsell-trial')
    } finally {
      setTrialLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">

        {/* ── HEADER ── */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 text-sm font-semibold mb-6 animate-pulse">
            <Clock className="w-4 h-4" /> ONE-TIME OFFER — THIS PAGE DISAPPEARS WHEN YOU LEAVE
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-5 leading-tight">
            Keep Using the{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              AI From the Course
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            You just learned how to create AI UGC ads. Now use the exact tool to make them — start free for 7 days, or lock in our best price today.
          </p>
        </div>

        {/* ── MAIN CARD ── */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden mb-6">

          {/* Card header */}
          <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-b border-green-500/30 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-xs font-semibold mb-3">
                  <Star className="w-3 h-3" /> SPECIAL OFFER
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-2">Full Access to the AI Tool</h2>
                <p className="text-gray-400 text-sm">The exact software used to create every video in the course — no restrictions.</p>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 line-through mb-1">Regular $97/month</div>
                <div className="text-5xl md:text-6xl font-black text-white mb-1">$47</div>
                <div className="text-sm text-gray-400">/month</div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded-full text-green-400 text-xs font-bold">
                  32% OFF TODAY ONLY
                </div>
              </div>
            </div>
          </div>

          {/* Card body */}
          <div className="p-6 md:p-8 space-y-4">

            <h3 className="text-lg font-bold text-center mb-6">Here's Everything You're Getting:</h3>

            {/* Feature 1 */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Full Blobbi Growth Access</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">The same AI UGC tool used to create every video in this course — no restrictions, no limits on features.</p>
                  <div className="flex items-center gap-1.5 mt-2 text-green-400 text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" /> Save $50/month vs regular pricing
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">20+ Videos Per Month</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">Enough to run paid ads, build organic content, and test dozens of hooks every single month.</p>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                    <p className="text-green-400 text-xs font-semibold mb-1">Included features:</p>
                    <p className="text-gray-300 text-xs">Multiple Actors • Custom Actor • Product Holding</p>
                    <p className="text-gray-300 text-xs">UGC Studio • AI Editor • Multiple Languages</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1">Priority Support</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Direct access to our team for software setup, content strategy, and technical questions.</p>
                  <div className="flex items-center gap-1.5 mt-2 text-green-400 text-xs font-semibold">
                    <Check className="w-3.5 h-3.5" /> Included FREE with Growth plan
                  </div>
                </div>
              </div>
            </div>

            {/* Price summary */}
            <div className="text-center py-6 border-t border-white/10">
              <div className="text-sm text-gray-500 mb-1">YOUR PRICE TODAY</div>
              <div className="text-5xl font-black mb-1">$47</div>
              <div className="text-gray-500 text-sm line-through">Usually $97/month</div>
            </div>

            {/* What's included */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <h3 className="text-base font-bold mb-4 text-center">What's Included in Growth</h3>
              <ul className="space-y-2.5">
                {[
                  '20+ AI-generated videos per month',
                  'Full actor library + custom actor',
                  'Product holding & interaction',
                  'UGC Studio + AI Editor',
                  'Multi-language support',
                  'Priority support',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why upgrade */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
              <h3 className="text-base font-bold text-green-400 mb-4">Why Upgrade Right Now</h3>
              <div className="space-y-3">
                {[
                  { t: 'Scale Without Limits', d: "3 videos/month won't build a business. 20+ gives you the volume to test, iterate, and win." },
                  { t: 'Immediate Cost Saving', d: '$47 instead of $97 — that\'s $50 back in your pocket every month you stay on Growth.' },
                  { t: 'Consistency Drives Results', d: 'The brands winning with AI UGC create constantly. Growth plan gives you the tools to stay consistent.' },
                  { t: 'We Handle Everything', d: 'Updates, new features, new actors, hosting, support — you just focus on creating.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm"><span className="font-semibold text-white">{item.t}:</span> {item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center">
              <h3 className="text-base font-bold text-red-400 mb-2">$47/Month Offer Expires When You Leave</h3>
              <p className="text-gray-400 text-sm mb-3">
                The $47/month deal is only available here. After you leave, it goes back to $97/month.<br />
                <span className="text-white font-semibold">Either way, you can start free for 7 days below.</span>
              </p>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-lg font-black text-white">You're Saving $50/Month Right Now</p>
                <p className="text-gray-500 text-xs mt-0.5">$97 Regular Price — $47 Today Only</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleCheckout}
                disabled={loading || trialLoading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-6 rounded-2xl shadow-xl hover:shadow-green-500/25 transform hover:scale-[1.02] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                <div className="flex flex-col items-center gap-1.5">
                  <div className="flex items-center gap-2 text-lg">
                    <Zap className="w-5 h-5 flex-shrink-0" />
                    <span>{loading ? 'Processing...' : 'YES! Get Full Access for $47/Month'}</span>
                  </div>
                  <div className="text-sm font-normal opacity-80">
                    Save $50/month • Instant access • Cancel anytime
                  </div>
                </div>
              </button>

              <button
                onClick={handleFreeTrial}
                disabled={loading || trialLoading}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/20 hover:border-green-500/40 text-white font-semibold py-4 px-6 rounded-2xl transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-base">{trialLoading ? 'Starting your trial...' : 'Start My Free 7-Day Trial'}</span>
                  <span className="text-xs text-gray-400 font-normal">No credit card needed • Cancel anytime</span>
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Footer trust */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Shield className="w-4 h-4" />
            <span>100% Secure Checkout • Instant Access • Cancel Anytime</span>
          </div>
          <p className="text-gray-600 text-xs mt-2">Once you leave this page, this offer is gone forever</p>
        </div>

      </div>
    </div>
  )
}

export default function LifetimeUpsellPage() {
  return (
    <Suspense>
      <LifetimeUpsellContent />
    </Suspense>
  )
}
