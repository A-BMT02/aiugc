'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, Check, Sparkles, Zap, Globe, Users, Wand2, Video,
  Play, Pause, Coins, Infinity, Clock, Star, Shield, ChevronRight, Loader2,
} from 'lucide-react'
import Header from '@/components/Header'
import TestimonialsSection from '@/components/TestimonialsSection'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'

const SUPABASE = 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public'

const ACTOR_IMAGES = [
  { name: 'Melissa',  url: `${SUPABASE}/avatars/Melissa.png` },
  { name: 'Anna',     url: `${SUPABASE}/avatars/Anna_Caucasian_Young_Female.png` },
  { name: 'Jasmine',  url: `${SUPABASE}/avatars/Jasmine_Black_Young_Female.png` },
  { name: 'Jessica',  url: `${SUPABASE}/avatars/Jessica_Asian_Young_Female.png` },
  { name: 'Darius',   url: `${SUPABASE}/avatars/Darius_Black_Young_Male.png` },
  { name: 'Jake',     url: `${SUPABASE}/avatars/Jake_Caucasian_Young_Male.png` },
  { name: 'Madison',  url: `${SUPABASE}/avatars/Madison_Caucasian_Young_Female.png` },
  { name: 'Ryan',     url: `${SUPABASE}/avatars/Ryan_Caucasian_Young_Male.png` },
  { name: 'Hannah',   url: `${SUPABASE}/avatars/Hannah_Caucasian_Young_Female.png` },
  { name: 'Tyler',    url: `${SUPABASE}/avatars/Tyler_Caucasian_Young_Male.png` },
  { name: 'Audrey',   url: `${SUPABASE}/avatars/Audrey_Caucasian_Young_Female.png` },
  { name: 'Chloe',    url: `${SUPABASE}/avatars/Chloe_Caucasian_Young_Female.png` },
  { name: 'Ruby',     url: `${SUPABASE}/avatars/Ruby_Caucasian_Young_Female.png` },
  { name: 'Bella',    url: `${SUPABASE}/avatars/Bella_Caucasian_Young_Female.png` },
  { name: 'Sophie',   url: `${SUPABASE}/avatars/Sophie_Caucasian_Young_Female.png` },
  { name: 'Natalie',  url: `${SUPABASE}/avatars/Natalie_Caucasian_Young_Female.png` },
]

const SAMPLE_VOICES = [
  'James', 'Arabella', 'Bradford', 'Eve', 'Liam', 'Laura',
  'Brian', 'Brittney', 'Nathan', 'Bella', 'Jeff', 'Finn',
  'Emma', 'Brock', 'Rachel M', 'Felix', 'Sven', 'Allison',
]

const AD_VIDEOS = [
  `${SUPABASE}/static/Homepage/Ads/boy_e-commerce-ad.mp4`,
  `${SUPABASE}/static/Homepage/Ads/boy-day-in-life-ad.mp4`,
  `${SUPABASE}/static/Homepage/Ads/boy-supplement-ad.mp4`,
  `${SUPABASE}/static/Homepage/Ads/girl_makeup_ad.mp4`,
]

const CREDIT_PACKS = [
  { name: 'Starter', price: 5,  credits: 5,  duration: '30 sec', popular: false },
  { name: 'Creator', price: 19, credits: 20, duration: '2 min',  popular: true  },
  { name: 'Studio',  price: 49, credits: 60, duration: '6 min',  popular: false },
]

function WaitlistForm({ size = 'default' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 ${size === 'large' ? 'text-lg' : 'text-sm'} text-green-400 font-semibold`}>
        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4" />
        </div>
        You're on the list! We'll email you when we launch.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${size === 'large' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'} w-full max-w-lg`}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email address"
        required
        className={`flex-1 ${size === 'large' ? 'px-5 py-4 text-base' : 'px-4 py-3 text-sm'} bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-green-500 transition placeholder-gray-500`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`${size === 'large' ? 'px-8 py-4 text-base' : 'px-5 py-3 text-sm'} bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold hover:shadow-xl hover:shadow-green-500/30 transition-all disabled:opacity-50 whitespace-nowrap flex items-center gap-2`}
      >
        {status === 'loading' ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>Notify Me <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1 w-full">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}

export default function PaygPage() {
  const { user } = useAuth()
  const [loadingPack, setLoadingPack] = useState(null)

  const handleBuy = async (pack) => {
    if (!user) {
      window.location.href = '/signup?redirect=/payg'
      return
    }
    try {
      setLoadingPack(pack.name)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login?redirect=/payg'; return }

      const res = await fetch('/api/stripe-payg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          packName: pack.name,
          price: pack.price,
          credits: pack.credits,
          duration: pack.duration,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout')
      window.location.href = data.url
    } catch (err) {
      console.error(err)
      alert(err.message || 'Something went wrong')
    } finally {
      setLoadingPack(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <Header />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Coming Soon — Join the Waitlist</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
            Pay Only for<br />
            <span className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
              What You Create
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-6 leading-relaxed">
            No subscriptions. No monthly fees. Buy credits once, use them whenever.
            Scale up or down — your call, every time.
          </p>

          <p className="text-base text-gray-500 mb-10">
            100s of AI actors &amp; voices · 20+ languages · Professional ad videos in minutes
          </p>

          <div className="flex justify-center mb-16">
            <WaitlistForm size="large" />
          </div>

          {/* Ad video grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {AD_VIDEOS.map((url, i) => (
              <div key={i} className="aspect-[9/16] rounded-2xl border border-white/10 hover:border-green-500/50 transition-all hover:scale-105 relative overflow-hidden group">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={url} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20 pt-20 border-t border-white/10">
            {[
              { value: '100+', label: 'AI Actors' },
              { value: '51',   label: 'Voices' },
              { value: '20+',  label: 'Languages' },
              { value: '~3min', label: 'Per Video' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-4xl font-black text-green-400 mb-1">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO VIDEO ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              See It In Action
            </h2>
            <p className="text-gray-400 text-lg">From idea to ad in under 3 minutes</p>
          </div>
          <div className="rounded-3xl border border-white/10 overflow-hidden">
            <video controls autoPlay muted playsInline className="w-full">
              <source src={`${SUPABASE}/static/Homepage/DemoVideo%20(1).mp4`} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── ACTOR SHOWCASE ── */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
              100s of Actors<br />
              <span className="text-green-400">to Choose From</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Diverse, realistic AI actors across ages, ethnicities, and styles. More added every week.
            </p>
          </div>

          {/* Actor grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 mb-8">
            {ACTOR_IMAGES.map((actor) => (
              <div key={actor.name} className="group relative">
                <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 group-hover:border-green-500/50 transition-all group-hover:scale-105">
                  <img
                    src={actor.url}
                    alt={actor.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-center text-xs text-gray-500 mt-1.5 truncate">{actor.name}</p>
              </div>
            ))}
            {/* "More coming" cards */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={`more-${i}`} className="aspect-square rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center">
                <span className="text-2xl text-white/10">+</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <Sparkles className="w-3 h-3 text-green-400" />
              New actors added weekly — 100s more at launch
            </span>
          </div>
        </div>
      </section>

      {/* ── VOICE SHOWCASE ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
              51 Voices.<br />
              <span className="text-green-400">Every Style.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From deep narrators to energetic creators — pick the perfect voice for your brand in any of 20+ languages.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            {SAMPLE_VOICES.map(name => (
              <div key={name} className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:border-green-500/40 hover:bg-green-500/5 transition group cursor-default">
                <div className="w-7 h-7 bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 text-green-400 fill-green-400" />
                </div>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] border border-white/5 rounded-xl">
              <span className="text-sm text-gray-500">+33 more at launch</span>
            </div>
          </div>

          {/* Language flags row */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">Available in 20+ languages including</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['🇺🇸 English','🇸🇦 Arabic','🇪🇸 Spanish','🇫🇷 French','🇩🇪 German','🇮🇳 Hindi','🇯🇵 Japanese','🇧🇷 Portuguese','🇮🇩 Indonesian','🇰🇷 Korean'].map(lang => (
                <span key={lang} className="text-sm px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-gray-300">{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
              Three Steps.<br />
              <span className="text-green-400">One Video.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Buy Credits',
                description: 'Choose a credit pack that fits your needs. Credits never expire — use them at your own pace.',
                image: `${SUPABASE}/static/Homepage/Steps/Step1.png`,
                aspect: 'aspect-square',
              },
              {
                step: '02',
                title: 'Pick Your Actor & Voice',
                description: 'Browse 100s of actors and 51 voices. Customize background, style, and language.',
                image: `${SUPABASE}/static/Homepage/Steps/Step2.png`,
                aspect: 'aspect-video',
              },
              {
                step: '03',
                title: 'Generate & Download',
                description: 'Write your script, hit generate, and download a production-ready video. 10 credits per minute.',
                image: `${SUPABASE}/static/Homepage/Steps/Step3.png`,
                aspect: 'aspect-[9/16]',
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-white/5 absolute -top-8 -left-4">{item.step}</div>
                <div className="relative bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 rounded-3xl p-8 h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-xl font-black mb-6">
                    {i + 1}
                  </div>
                  <div className={`${item.aspect} w-full mb-6 rounded-xl overflow-hidden border border-white/10 bg-gray-900`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
              Everything You Need.<br />
              <span className="text-green-400">Nothing You Don't.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Coins,
                title: 'No Subscription',
                description: 'Buy credits once, use them whenever. No monthly charges, no surprises on your card.',
              },
              {
                icon: Infinity,
                title: 'Credits Never Expire',
                description: "Your credits sit in your account until you're ready to create. No use-it-or-lose-it pressure.",
              },
              {
                icon: Users,
                title: '100s of Actors',
                description: 'Diverse AI actors across ages, ethnicities, and styles — with new ones added every week.',
              },
              {
                icon: Wand2,
                title: 'Add Your Product',
                description: 'Make actors naturally hold, wear, or interact with your product using AI magic edit.',
              },
              {
                icon: Globe,
                title: '20+ Languages',
                description: 'Generate videos in Arabic, Spanish, French, Hindi, and 16+ more languages natively.',
              },
              {
                icon: Zap,
                title: 'Ready in Minutes',
                description: 'Write your script, pick your actor and voice, and have a professional video in under 3 minutes.',
              },
            ].map((f, i) => (
              <div key={i} className="group p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl hover:border-green-500/50 transition-all hover:scale-105">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="py-24 px-6 bg-white/[0.02]" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
              Simple Credit Packs<br />
              <span className="text-green-400">No Subscription</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Buy once, use whenever. Credits never expire.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {CREDIT_PACKS.map(pack => (
              <div key={pack.name} className={`relative rounded-3xl p-8 border flex flex-col ${pack.popular ? 'border-green-500/50 bg-gradient-to-br from-green-500/10 to-green-600/5' : 'border-white/10 bg-white/[0.02]'}`}>
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-xl font-bold mb-1">{pack.name}</div>
                <div className="text-5xl font-black mb-1">${pack.price}</div>
                <div className="text-gray-400 text-sm mb-6">one-time · no subscription</div>
                <div className="space-y-3 mb-8 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{pack.duration} of video</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>Credits never expire</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>All actors &amp; voices included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>20+ languages</span>
                  </div>
                </div>

                <button
                  onClick={() => handleBuy(pack)}
                  disabled={loadingPack === pack.name}
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                    pack.popular
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/30'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {loadingPack === pack.name ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>Get {pack.name} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500">
            One-time purchase · credits never expire · use at your own pace
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/40 rounded-3xl p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 text-sm text-green-400 font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Be First in Line
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Get Early Access.<br />
              <span className="text-green-400">No Commitment Required.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Join the waitlist and we'll email you the moment PAYG launches — including any early-bird pricing.
            </p>
            <div className="flex justify-center">
              <WaitlistForm size="large" />
            </div>
            <p className="text-xs text-gray-600 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-8 object-contain" />
                <span className="text-xl font-black tracking-tight">
                  blobbi<span className="text-green-400">.</span>
                </span>
              </div>
              <p className="text-sm text-gray-400">AI video creation — pay only for what you create.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="#pricing" className="hover:text-green-400 transition">Pricing</a></div>
                <div><Link href="/" className="hover:text-green-400 transition">Homepage</Link></div>
                <div><Link href="/login" className="hover:text-green-400 transition">Sign In</Link></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="/privacy" className="hover:text-green-400 transition">Privacy Policy</a></div>
                <div><a href="/terms" className="hover:text-green-400 transition">Terms of Service</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div><a href="mailto:hello@blobbi.ai" className="hover:text-green-400 transition">hello@blobbi.ai</a></div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex items-center justify-center gap-3 text-sm text-gray-400">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-5 object-contain opacity-60" />
            <span>© 2025 Blobbi. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
