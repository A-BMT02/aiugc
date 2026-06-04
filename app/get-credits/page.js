'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ArrowRight, Sparkles, Loader2, ChevronRight, Zap, Coins, Infinity } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase/client'

const CREDIT_PACKS = [
  {
    name: 'Starter',
    price: 5,
    credits: 5,
    duration: '30 sec',
    popular: false,
    perks: ['~30 sec of video', 'All actors & voices', 'Credits never expire', '20+ languages'],
  },
  {
    name: 'Creator',
    price: 19,
    credits: 20,
    duration: '2 min',
    popular: true,
    perks: ['~2 min of video', 'All actors & voices', 'Credits never expire', '20+ languages'],
  },
  {
    name: 'Studio',
    price: 49,
    credits: 60,
    duration: '6 min',
    popular: false,
    perks: ['~6 min of video', 'All actors & voices', 'Credits never expire', '20+ languages'],
  },
]

const ACTOR_PREVIEWS = [
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Melissa.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Darius_Black_Young_Male.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Anna_Caucasian_Young_Female.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jake_Caucasian_Young_Male.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/avatars/Jasmine_Black_Young_Female.png',
]

export default function GetCreditsPage() {
  const { user } = useAuth()
  const [loadingPack, setLoadingPack] = useState(null)

  const handleBuy = async (pack) => {
    if (!user) {
      window.location.href = '/signup'
      return
    }
    try {
      setLoadingPack(pack.name)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { window.location.href = '/login'; return }

      const res = await fetch('/api/stripe-payg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          packName: pack.name,
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-8 object-contain" />
          <span className="text-lg font-black tracking-tight">blobbi<span className="text-green-400">.</span></span>
        </div>
        {/* Step indicator */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-black">✓</div>
            <span className="text-gray-400 hidden sm:inline">Account</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-black">2</div>
            <span className="text-white font-medium hidden sm:inline">Get Credits</span>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">3</div>
            <span className="text-gray-500 hidden sm:inline">Create</span>
          </div>
        </div>
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-300 transition">
          Skip for now →
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">

        {/* Heading */}
        <div className="text-center mb-12 max-w-2xl">
          {/* Actor faces */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex -space-x-3">
              {ACTOR_PREVIEWS.map((url, i) => (
                <div key={i} className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0a0a0a] ring-1 ring-white/10">
                  <img src={url} alt="" className="w-full h-full object-cover object-top" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-[#0a0a0a] ring-1 ring-green-500/30 flex items-center justify-center text-xs font-bold text-green-400">
                +95
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400 font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            100+ actors · 51 voices · 20+ languages
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">
            Choose Your Credit Pack
          </h1>
          <p className="text-gray-400 text-lg">
            Buy once, use whenever. Credits never expire — no subscriptions, ever.
          </p>
        </div>

        {/* Packs */}
        <div className="grid md:grid-cols-3 gap-5 w-full max-w-4xl mb-8">
          {CREDIT_PACKS.map(pack => (
            <div
              key={pack.name}
              className={`relative rounded-2xl p-6 border flex flex-col transition-all hover:scale-[1.02] ${
                pack.popular
                  ? 'border-green-500/60 bg-gradient-to-br from-green-500/10 to-green-600/5 shadow-xl shadow-green-500/10'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/20'
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-black px-4 py-1 rounded-full tracking-wide">
                  BEST VALUE
                </div>
              )}

              {/* Price */}
              <div className="mb-5">
                <div className="text-4xl font-black mb-0.5">${pack.price}</div>
                <div className="text-sm text-gray-400">one-time payment</div>
              </div>

              {/* What you get */}
              <div className={`rounded-xl p-3 mb-5 ${pack.popular ? 'bg-green-500/10' : 'bg-white/5'}`}>
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">You get</div>
                <div className={`text-2xl font-black ${pack.popular ? 'text-green-400' : 'text-white'}`}>
                  {pack.duration}
                </div>
                <div className="text-xs text-gray-400">of AI video</div>
              </div>

              {/* Perks */}
              <div className="space-y-2 mb-6 flex-1">
                {pack.perks.map(perk => (
                  <div key={perk} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className={`w-3.5 h-3.5 flex-shrink-0 ${pack.popular ? 'text-green-400' : 'text-green-500'}`} />
                    {perk}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleBuy(pack)}
                disabled={!!loadingPack}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${
                  pack.popular
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-black hover:shadow-lg hover:shadow-green-500/40'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {loadingPack === pack.name ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Get {pack.name}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Coins className="w-4 h-4 text-green-500/70" />
            No subscriptions
          </div>
          <div className="flex items-center gap-1.5">
            <Infinity className="w-4 h-4 text-green-500/70" />
            Credits never expire
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-green-500/70" />
            Instant access after payment
          </div>
        </div>
      </div>
    </div>
  )
}
