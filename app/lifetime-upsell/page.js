'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, Check, Zap, Calendar, Video, Headphones } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const PRICE_ID = 'price_1TLABeROztKsDOlaSDDg6gog'

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
      let session = null
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        session = data.session
      } catch {
        await supabase.auth.signOut()
        router.push('/login?redirect=/lifetime-upsell')
        return
      }
      if (!session) { router.push('/login?redirect=/lifetime-upsell'); return }

      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${session.access_token}` },
        body: JSON.stringify({ priceId: PRICE_ID, planName: 'growth' }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else throw new Error(data.error || 'Checkout failed')
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg, #140826 0%, #1c0f3a 40%, #0e1830 100%)' }}>

      {/* Dot pattern */}
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4">

        {/* ── HEADER ── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-full text-base font-bold mb-4 animate-pulse">
            <Clock className="w-5 h-5" /> FINAL OFFER — THIS PAGE DISAPPEARS IN MOMENTS
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="text-yellow-300">Get A FULL YEAR</span>{' '}
            <span className="text-white">of The AI Software We Use In The Course —</span>{' '}
            <span className="text-yellow-300">For Just $354</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white font-semibold max-w-4xl mx-auto">
            This is your only chance to lock in the Growth plan for an entire year at this price. Once you leave, this offer is gone forever.
          </p>
        </div>

        {/* ── BIG WHITE CARD ── */}
        <div className="rounded-[2rem] overflow-hidden bg-white mb-8 shadow-2xl">

          {/* Card header — gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block bg-yellow-400 text-black text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                  🔥 YEARLY DEAL
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-3">Blobbi Growth — Full Year Access</h2>
                <p className="text-white/90 text-xl">Never pay monthly again. Locked in for 12 months.</p>
              </div>
              <div className="text-center w-full md:w-auto">
                <div className="text-lg line-through opacity-75 mb-1">Regular price $828/year</div>
                <div className="text-6xl md:text-7xl font-black mb-2">$354</div>
                <div className="text-base bg-yellow-400 text-black font-bold px-5 py-2 rounded-full inline-block">ONE YEAR • 57% OFF</div>
              </div>
            </div>
          </div>

          {/* Card body — white */}
          <div className="p-8 bg-white">

            <h3 className="text-3xl font-bold mb-8 text-black text-center">Here's Everything You're Getting:</h3>

            <div className="space-y-6 mb-10 -mx-4">

              {/* Feature 1 */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-[2rem] p-6">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="bg-blue-500 rounded-full p-3 mx-auto md:mx-0 md:mt-1">
                    <Calendar className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-black text-2xl text-black mb-2">Full Year of Blobbi Growth Access</h4>
                    <p className="text-gray-700 text-lg mb-3">The same AI UGC tool used to create every video in this course. Locked in for 12 months — no monthly billing, no surprises, no losing access.</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-base text-green-700 font-bold">
                      <Check className="w-5 h-5" /> Save $474 vs paying monthly ($69/mo × 12 = $828)
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-[2rem] p-6">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="bg-purple-500 rounded-full p-3 mx-auto md:mx-0 md:mt-1">
                    <Video className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-black text-2xl text-black mb-2">20+ Videos Per Month</h4>
                    <p className="text-gray-700 text-lg mb-3">That's 240+ AI-generated videos over the year — enough to run paid ads, build organic content, and test dozens of hooks every single month.</p>
                    <div className="bg-purple-100 rounded-[1.5rem] p-4 mb-3">
                      <p className="text-base font-bold text-purple-900 mb-2">📹 What's included:</p>
                      <p className="text-base text-purple-800">Multiple Actors + Custom Actor + Product Holding</p>
                      <p className="text-base text-purple-800 font-bold">UGC Studio + AI Editor + Multiple Languages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-orange-50 border-2 border-orange-200 rounded-[2rem] p-6">
                <div className="flex flex-col md:flex-row items-start gap-4">
                  <div className="bg-orange-500 rounded-full p-3 mx-auto md:mx-0 md:mt-1">
                    <Headphones className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-black text-2xl text-black mb-2">Priority Support for 12 Months</h4>
                    <p className="text-gray-700 text-lg mb-3">Get direct access to our team for ANY questions. Software setup, content strategy, technical issues — we've got you covered for the full year.</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-base text-green-700 font-bold">
                      <Check className="w-5 h-5" /> Value: $354 (Included FREE)
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Center price */}
            <div className="text-center my-10">
              <div className="text-xl text-gray-400 mb-2">JUST</div>
              <div className="text-7xl font-bold text-gray-700">$354</div>
              <div className="text-xl text-gray-400 line-through mt-2">Usually $828/year</div>
            </div>

            {/* Comparison */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-[2rem] p-6 mb-8 shadow-lg -mx-4">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black">Monthly Subscriber vs Annual Owner</h3>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-3">
                  <h4 className="font-bold text-red-600 text-xl mb-3">❌ Monthly Subscriber:</h4>
                  <ul className="space-y-3 text-gray-800 text-base">
                    <li>• Pay $69 every single month</li>
                    <li>• $828/year forever</li>
                    <li>• Lose access if you cancel</li>
                    <li>• Price can increase anytime</li>
                    <li>• No passive income potential</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-green-600 text-xl mb-3">✅ Annual Owner:</h4>
                  <ul className="space-y-3 text-gray-800 text-base">
                    <li>• Pay $354 ONE TIME per year</li>
                    <li>• Save $474 immediately</li>
                    <li>• Locked in for 12 months</li>
                    <li>• Price guaranteed all year</li>
                    <li>• Just focus on creating</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Why annual wins */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-[2rem] p-6 mb-8 -mx-4">
              <h3 className="text-2xl font-black text-yellow-900 mb-4 text-center">⚡ Why Annual Beats Monthly Every Time</h3>
              <div className="space-y-4">
                {[
                  { t: 'No Monthly Anxiety', d: "You're locked in for a year — just focus on creating content and growing your business." },
                  { t: 'Massive Cost Saving', d: "You're paying $29.50/month instead of $69/month. Real money back in your pocket every single month." },
                  { t: 'Consistency Wins', d: "The brands making money with AI UGC create consistently. Annual access forces that habit." },
                  { t: 'We Handle Everything', d: 'Updates, new features, new actors, hosting, support — you just create.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-800 text-lg"><span className="font-bold">{item.t}:</span> {item.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgency */}
            <div className="bg-red-50 border-2 border-red-500 rounded-[2rem] p-6 mb-8 -mx-4">
              <h3 className="text-2xl font-bold text-red-700 mb-2 text-center">⚠️ This Offer Expires When You Leave This Page</h3>
              <p className="text-center text-red-600 text-lg mb-3">
                This is the ONLY time you'll see the Growth plan at this price.<br />
                After today, it goes back to $828/year (if we even offer this deal again).
              </p>
              <div className="bg-white rounded-[2rem] p-5 text-center">
                <p className="text-3xl font-black text-red-700">You're Saving $474 Right Now</p>
                <p className="text-base text-gray-600 mt-1">$828 Regular Price — $354 Today Only = $474 Savings</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-4 -mx-4">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-8 px-4 rounded-[2rem] shadow-xl transform hover:scale-105 transition-all min-h-[160px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              >
                <div className="flex flex-col items-center justify-center gap-3 w-full">
                  <div className="flex items-center gap-3 justify-center w-full text-2xl md:text-3xl">
                    <Zap className="w-7 h-7 flex-shrink-0" />
                    <div className="text-center leading-relaxed">
                      {loading ? 'Processing...' : <>YES! Give Me The Full Year<br />of Blobbi Growth for $354</>}
                    </div>
                  </div>
                  <div className="text-base md:text-lg font-normal opacity-90 text-center">
                    One annual payment of $354<br />(Save $474 • Instant access • Locked in for 12 months)
                  </div>
                </div>
              </button>

              <button
                onClick={() => router.push('/dashboard')}
                className="w-full text-gray-500 underline hover:text-gray-700 text-base py-4 px-4 cursor-pointer"
              >
                No thanks, I'll pay full monthly price instead
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white text-xl font-bold mb-2">🔒 100% Secure Checkout • Instant Access</p>
          <p className="text-white/80 text-base">Once you leave this page, this offer is GONE forever</p>
        </div>

      </div>
    </div>
  )
}
