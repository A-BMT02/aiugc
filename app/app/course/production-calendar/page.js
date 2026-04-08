'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Home, Calendar, ChevronLeft, Check, X, BookOpen } from 'lucide-react'

const WEEKS = [
  {
    week: 1,
    theme: 'Test & Learn',
    summary: 'Launch 6 test creatives across formats. Find your top hook type.',
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    accent: 'text-orange-400',
    dotColor: 'bg-orange-400',
    days: [
      {
        day: 1, weekday: 'Monday', contentType: 'Problem Hook', typeColor: 'bg-rose-500',
        scriptRef: '#1', avatarStyle: 'Energetic', platform: 'Meta + TikTok',
        hook: "Stop doing [X]. It's costing you more than you think.",
        brief: 'Open with the pain point. No product reveal until the 25-second mark. Keep to 35 seconds.',
        metric: 'Hook rate (target: 30%+)', produce: true, runPaid: true,
      },
      {
        day: 2, weekday: 'Tuesday', contentType: 'Result Hook', typeColor: 'bg-green-500',
        scriptRef: '#4', avatarStyle: 'Calm/authoritative', platform: 'Meta + TikTok',
        hook: "I went from [bad situation] to [result] in [timeframe]. Here's how.",
        brief: 'Lead with the transformation. Product is the mechanism, not the hero.',
        metric: 'Hook rate (target: 30%+)', produce: true, runPaid: true,
      },
      {
        day: 3, weekday: 'Wednesday', contentType: 'Myth Breaker', typeColor: 'bg-purple-500',
        scriptRef: '#6', avatarStyle: 'Energetic', platform: 'TikTok',
        hook: "Everyone says [common advice]. Here's why that's actually wrong.",
        brief: 'Contrarian angle. First 3 seconds must create genuine tension. Best for organic reach.',
        metric: 'Thumb-stop rate', produce: true, runPaid: false,
      },
      {
        day: 4, weekday: 'Thursday', contentType: 'Social Proof', typeColor: 'bg-blue-500',
        scriptRef: '#9', avatarStyle: 'Relatable', platform: 'Meta',
        hook: "Over [X] people have used this to [result]. Here's what they're saying.",
        brief: 'Numbers in the hook. Keep social proof specific — percentages beat vague claims.',
        metric: 'CTR (target: 1%+)', produce: true, runPaid: true,
      },
      {
        day: 5, weekday: 'Friday', contentType: 'How-To', typeColor: 'bg-amber-500',
        scriptRef: '#7', avatarStyle: 'Calm/authoritative', platform: 'Meta + TikTok',
        hook: "Here's exactly how I [achieved result] without [common barrier].",
        brief: 'Educational tone. Deliver real value in the body. CTA should feel like a natural next step.',
        metric: 'Completion rate (target: 50%+)', produce: true, runPaid: true,
      },
      {
        day: 6, weekday: 'Saturday', contentType: 'Curiosity Hook', typeColor: 'bg-cyan-500',
        scriptRef: '#2', avatarStyle: 'Energetic', platform: 'TikTok',
        hook: "I didn't believe this would work until I tried it myself.",
        brief: "Build genuine intrigue in the first 5 seconds. Don't reveal the answer until 70% through.",
        metric: 'Watch time', produce: true, runPaid: false,
      },
      {
        day: 7, weekday: 'Sunday', contentType: 'REST DAY', typeColor: 'bg-gray-600',
        scriptRef: '—', avatarStyle: '—', platform: '—',
        hook: 'No production today.',
        brief: 'Review hook rates from the week. Rate your top 2 performing content types. Plan week 2 scripts.',
        metric: '—', produce: false, runPaid: false, isRest: true,
      },
    ],
  },
  {
    week: 2,
    theme: 'Double Down',
    summary: 'Repeat best-performing formats. Introduce transparency & lifestyle angles.',
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    accent: 'text-purple-400',
    dotColor: 'bg-purple-400',
    days: [
      {
        day: 8, weekday: 'Monday', contentType: 'Problem Hook', typeColor: 'bg-rose-500',
        scriptRef: '#10', avatarStyle: 'Relatable', platform: 'Meta + TikTok',
        hook: "I've been dealing with [problem] for [timeframe] and nothing worked — until this.",
        brief: "Empathy-first opening. Match the frustration level of the audience. Speak their language.",
        metric: 'Hook rate (target: 30%+)', produce: true, runPaid: true,
      },
      {
        day: 9, weekday: 'Tuesday', contentType: 'Result Hook', typeColor: 'bg-green-500',
        scriptRef: '#21', avatarStyle: 'Lifestyle', platform: 'Meta',
        hook: "This is what a real [timeframe] transformation actually looks like.",
        brief: 'No filters, no overediting. Authenticity is the mechanism. Real numbers only.',
        metric: 'CTR (target: 1%+)', produce: true, runPaid: true,
      },
      {
        day: 10, weekday: 'Wednesday', contentType: 'Transparency', typeColor: 'bg-indigo-500',
        scriptRef: '#6', avatarStyle: 'Calm/authoritative', platform: 'TikTok',
        hook: "Want to see how much I actually [result] last month? Spoiler: it wasn't perfect.",
        brief: 'Results transparency format. Show the real side. Audiences reward honesty with shares.',
        metric: 'Share rate', produce: true, runPaid: false,
      },
      {
        day: 11, weekday: 'Thursday', contentType: 'How-To', typeColor: 'bg-amber-500',
        scriptRef: '#18', avatarStyle: 'Energetic', platform: 'Meta + TikTok',
        hook: 'If you want [result] this week, use this simple formula.',
        brief: 'Quick-action format. Give them something immediately actionable. CTA connects to product.',
        metric: 'CTR (target: 1%+)', produce: true, runPaid: true,
      },
      {
        day: 12, weekday: 'Friday', contentType: 'Myth Breaker', typeColor: 'bg-purple-500',
        scriptRef: '#17', avatarStyle: 'Calm/authoritative', platform: 'Meta + TikTok',
        hook: "You've been told you need [myth] to get [result]. That's what's keeping you stuck.",
        brief: 'Belief inversion. Challenge an assumption they hold. Follow immediately with the truth.',
        metric: 'Thumb-stop + hook rate', produce: true, runPaid: true,
      },
      {
        day: 13, weekday: 'Saturday', contentType: 'Social Proof', typeColor: 'bg-blue-500',
        scriptRef: '#13', avatarStyle: 'Relatable', platform: 'TikTok',
        hook: "I've repurchased this [X] times. Here's why I keep coming back.",
        brief: 'Repeat purchase story. Signals product quality. Keep it feeling personal.',
        metric: 'Watch time', produce: true, runPaid: false,
      },
      {
        day: 14, weekday: 'Sunday', contentType: 'REST DAY', typeColor: 'bg-gray-600',
        scriptRef: '—', avatarStyle: '—', platform: '—',
        hook: 'No production today.',
        brief: 'Complete week 1 vs week 2 hook data. Identify your top format. Plan week 3 production research.',
        metric: '—', produce: false, runPaid: false, isRest: true,
      },
    ],
  },
  {
    week: 3,
    theme: 'Expand & Optimise',
    summary: 'Widen avatar styles. Introduce Direct CTA. Identify your first CPA winner.',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    accent: 'text-blue-400',
    dotColor: 'bg-blue-400',
    days: [
      {
        day: 15, weekday: 'Monday', contentType: 'Curiosity Hook', typeColor: 'bg-cyan-500',
        scriptRef: '#1', avatarStyle: 'Energetic', platform: 'Meta + TikTok',
        hook: 'Stop showing your product. Start showing the problem it solves.',
        brief: 'Opens on the problem, not the product. Product appears as the solution at 20 seconds.',
        metric: 'Hook rate (target: 30%+)', produce: true, runPaid: true,
      },
      {
        day: 16, weekday: 'Tuesday', contentType: 'Result Hook', typeColor: 'bg-green-500',
        scriptRef: '#43', avatarStyle: 'Lifestyle', platform: 'Meta',
        hook: 'I bloated for [X] years and made less progress than I did in the last [Y] weeks.',
        brief: 'Contrast structure. The gap between before and after in the hook. Be specific with numbers.',
        metric: 'CTR (target: 1%+)', produce: true, runPaid: true,
      },
      {
        day: 17, weekday: 'Wednesday', contentType: 'Transparency', typeColor: 'bg-indigo-500',
        scriptRef: '#55', avatarStyle: 'Calm/authoritative', platform: 'TikTok',
        hook: "I was earning good money and still living paycheck to paycheck. Here's what changed.",
        brief: 'Vulnerability + practical lesson. This format drives high share rates. End with a clear next step.',
        metric: 'Share rate', produce: true, runPaid: false,
      },
      {
        day: 18, weekday: 'Thursday', contentType: 'How-To', typeColor: 'bg-amber-500',
        scriptRef: '#65', avatarStyle: 'Relatable', platform: 'Meta + TikTok',
        hook: 'I was spending [X] hours on [task]. This tool does it in [Y] minutes.',
        brief: 'Before/after time comparison. Quantify the benefit precisely. Completion rate format.',
        metric: 'Completion rate (target: 50%+)', produce: true, runPaid: true,
      },
      {
        day: 19, weekday: 'Friday', contentType: 'Direct CTA', typeColor: 'bg-orange-500',
        scriptRef: '#15', avatarStyle: 'Energetic', platform: 'Meta',
        hook: "This costs $[X] and it's replaced something I was spending $[X] on monthly.",
        brief: 'Price-anchor format. Lead with the saving, not the product. Strong purchase intent audience.',
        metric: 'CPA vs target', produce: true, runPaid: true,
      },
      {
        day: 20, weekday: 'Saturday', contentType: 'Myth Breaker', typeColor: 'bg-purple-500',
        scriptRef: '#97', avatarStyle: 'Calm/authoritative', platform: 'Meta + TikTok',
        hook: "The financial habit that matters more than any investment you'll make.",
        brief: 'Authority positioning. Deliver a contrarian but true insight. Product follows naturally.',
        metric: 'Hook rate + watch time', produce: true, runPaid: false,
      },
      {
        day: 21, weekday: 'Sunday', contentType: 'REST DAY', typeColor: 'bg-gray-600',
        scriptRef: '—', avatarStyle: '—', platform: '—',
        hook: 'No production today.',
        brief: 'Identify your first creative hitting CPA target. Begin scaling. Fix budget this week (100–200%).',
        metric: '—', produce: false, runPaid: false, isRest: true,
      },
    ],
  },
  {
    week: 4,
    theme: 'Scale & Systematise',
    summary: 'Scale winning creatives. Add review formats. Document your system.',
    color: 'from-green-500/20 to-green-600/10 border-green-500/30',
    accent: 'text-green-400',
    dotColor: 'bg-green-400',
    days: [
      {
        day: 22, weekday: 'Monday', contentType: 'Problem Hook', typeColor: 'bg-rose-500',
        scriptRef: '#31', avatarStyle: 'Relatable', platform: 'Meta + TikTok',
        hook: "I've spent thousands on [category]. This $[X] product outperforms most of it.",
        brief: 'Price-contrast hook. Immediately signals value. Works well for premium-adjacent niches.',
        metric: 'Hook rate (target: 30%+)', produce: true, runPaid: true,
      },
      {
        day: 23, weekday: 'Tuesday', contentType: 'Review', typeColor: 'bg-pink-500',
        scriptRef: '#6', avatarStyle: 'Lifestyle', platform: 'TikTok',
        hook: 'The honest review nobody asked for but everyone needed.',
        brief: 'No-sponsor framing. Bought with own money. Audiences trust this significantly more than #ad.',
        metric: 'Watch time + share rate', produce: true, runPaid: false,
      },
      {
        day: 24, weekday: 'Wednesday', contentType: 'Curiosity Hook', typeColor: 'bg-cyan-500',
        scriptRef: '#32', avatarStyle: 'Energetic', platform: 'Meta + TikTok',
        hook: 'My [product] was so bad [extreme pain point] noticed. Here\'s what I changed.',
        brief: 'Third-party-validation hook. Creates curiosity gap. Body delivers the practical lesson.',
        metric: 'Thumb-stop rate', produce: true, runPaid: true,
      },
      {
        day: 25, weekday: 'Thursday', contentType: 'Social Proof', typeColor: 'bg-blue-500',
        scriptRef: '#77', avatarStyle: 'Relatable', platform: 'Meta',
        hook: "What [timeframe] of [coaching/product/system] gave me that [X] years of self-study didn't.",
        brief: 'Credibility + transformation. Strong for coaching and education niches. Specific timeframes only.',
        metric: 'CTR (target: 1%+)', produce: true, runPaid: true,
      },
      {
        day: 26, weekday: 'Friday', contentType: 'Direct CTA', typeColor: 'bg-orange-500',
        scriptRef: '#19', avatarStyle: 'Energetic', platform: 'Meta + TikTok',
        hook: 'This is the most underrated product in the [niche] space right now.',
        brief: 'Hidden-gem framing. Creates urgency without false scarcity.',
        metric: 'CPA vs target', produce: true, runPaid: true,
      },
      {
        day: 27, weekday: 'Saturday', contentType: 'Confession', typeColor: 'bg-slate-500',
        scriptRef: '#6', avatarStyle: 'Relatable', platform: 'TikTok',
        hook: "I let my [confession] go on for [timeframe] before I fixed it. Here's what I did.",
        brief: 'Vulnerability drives trust. Keep the lesson practical. CTA as the solution.',
        metric: 'Share rate', produce: true, runPaid: false,
      },
      {
        day: 28, weekday: 'Sunday', contentType: 'REST DAY', typeColor: 'bg-gray-600',
        scriptRef: '—', avatarStyle: '—', platform: '—',
        hook: 'No production today.',
        brief: 'Document your top 5 creatives by metric. Note your best-performing format and ideal avatar style.',
        metric: '—', produce: false, runPaid: false, isRest: true,
      },
    ],
  },
  {
    week: 5,
    theme: 'Final Push',
    summary: 'Finish strong. Scale your best creative. Lock in your system for month 2.',
    color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
    accent: 'text-pink-400',
    dotColor: 'bg-pink-400',
    days: [
      {
        day: 29, weekday: 'Monday', contentType: 'Result Hook', typeColor: 'bg-green-500',
        scriptRef: '#100', avatarStyle: 'Lifestyle', platform: 'Meta + TikTok',
        hook: "I stopped trying to [old approach] and started [new approach]. Here's what changed.",
        brief: 'Mindset shift format. Broad appeal. Works for product, coaching, and service niches equally.',
        metric: 'Hook rate + completion rate', produce: true, runPaid: true,
      },
      {
        day: 30, weekday: 'Tuesday', contentType: 'Review + Direct CTA', typeColor: 'bg-orange-500',
        scriptRef: '#14', avatarStyle: 'Calm/authoritative', platform: 'Meta + TikTok',
        hook: "What I wish I'd known before buying [product category].",
        brief: "Use your best-performing hook from the full month's data. This is your scale creative for day 30.",
        metric: 'CPA → scale target', produce: true, runPaid: true,
      },
    ],
  },
]

function Badge({ yes }) {
  return yes
    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold"><Check className="w-3 h-3" /> Yes</span>
    : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 text-gray-500 text-xs font-semibold"><X className="w-3 h-3" /> No</span>
}

function DayCard({ d }) {
  if (d.isRest) {
    return (
      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-gray-700/50 flex items-center justify-center text-sm font-black text-gray-400">{d.day}</div>
          <div>
            <p className="text-xs text-gray-600 font-semibold">{d.weekday}</p>
            <span className="inline-block px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-500 text-xs font-bold">REST DAY</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{d.brief}</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 flex flex-col gap-3">
      {/* Day header */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-sm font-black text-white shrink-0">{d.day}</div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-semibold mb-1">{d.weekday}</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-white text-xs font-bold ${d.typeColor}`}>{d.contentType}</span>
        </div>
      </div>

      {/* Hook */}
      <div className="bg-black/30 rounded-lg px-3 py-2.5">
        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Hook</p>
        <p className="text-sm text-white font-semibold leading-snug">"{d.hook}"</p>
      </div>

      {/* Brief */}
      <p className="text-xs text-gray-400 leading-relaxed">{d.brief}</p>

      {/* Meta row */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <p className="text-gray-600 font-semibold mb-0.5">Avatar</p>
          <p className="text-gray-300">{d.avatarStyle}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold mb-0.5">Platform</p>
          <p className="text-gray-300">{d.platform}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold mb-0.5">Script Ref</p>
          <p className="text-gray-300">{d.scriptRef}</p>
        </div>
        <div>
          <p className="text-gray-600 font-semibold mb-0.5">Goal Metric</p>
          <p className="text-gray-300">{d.metric}</p>
        </div>
      </div>

      {/* Produce / Run Paid */}
      <div className="flex items-center gap-3 pt-1 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Produce:</span>
          <Badge yes={d.produce} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Run Paid:</span>
          <Badge yes={d.runPaid} />
        </div>
      </div>
    </div>
  )
}

function WeekView({ weekData, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
        <ChevronLeft className="w-4 h-4" /> Back to overview
      </button>

      <div className="mb-8">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-3 ${weekData.accent} border-current bg-current/10`}>
          Week {weekData.week}
        </div>
        <h2 className="text-3xl font-black text-white mb-2">{weekData.theme}</h2>
        <p className="text-gray-400">{weekData.summary}</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {weekData.days.map((d) => (
          <DayCard key={d.day} d={d} />
        ))}
      </div>
    </div>
  )
}

export default function ProductionCalendarPage() {
  const [activeWeek, setActiveWeek] = useState(null)

  const totalDays = WEEKS.reduce((acc, w) => acc + w.days.filter(d => !d.isRest).length, 0)
  const paidDays = WEEKS.reduce((acc, w) => acc + w.days.filter(d => d.runPaid).length, 0)

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* Nav */}
      <div className="bg-[#111] border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-7 object-contain" />
            <span className="font-black text-white">blobbi<span className="text-green-400">.</span>ai</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/app/course" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <BookOpen className="w-4 h-4" /> All Courses
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Home className="w-4 h-4" /> Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      {!activeWeek && (
        <div className="px-6 pt-12 pb-10 text-center" style={{ background: 'linear-gradient(180deg, #0d1a0d 0%, #0d0d0d 100%)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Calendar className="w-3.5 h-3.5" /> Course 3
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              The <span className="bg-yellow-400 text-black px-2 rounded-md">30-Day</span> AI UGC Production Calendar
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              A day-by-day production and publishing schedule for AI UGC ads and organic content.
            </p>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[
                { val: '30', label: 'Production Days' },
                { val: '5', label: 'Weekly Themes' },
                { val: `${paidDays}`, label: 'Paid Creatives' },
              ].map(({ val, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl py-3 px-2">
                  <p className="text-2xl font-black text-white">{val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        {activeWeek ? (
          <div className="pt-10">
            <WeekView weekData={activeWeek} onBack={() => setActiveWeek(null)} />
          </div>
        ) : (
          <>
            <h2 className="text-lg font-black text-gray-300 mb-5">Select a week to view the daily schedule</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WEEKS.map((w) => {
                const productionDays = w.days.filter(d => !d.isRest)
                const paidCount = w.days.filter(d => d.runPaid).length
                return (
                  <button
                    key={w.week}
                    onClick={() => setActiveWeek(w)}
                    className={`p-6 bg-gradient-to-br ${w.color} border rounded-2xl text-left hover:scale-[1.02] transition-all group cursor-pointer`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs font-bold uppercase tracking-widest ${w.accent}`}>Week {w.week}</span>
                    </div>
                    <h3 className="font-black text-white text-xl mb-2">{w.theme}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5">{w.summary}</p>

                    {/* Day dots */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {w.days.map((d) => (
                        <div
                          key={d.day}
                          title={`Day ${d.day} — ${d.weekday}: ${d.contentType}`}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white ${d.isRest ? 'bg-white/10 text-gray-600' : d.typeColor}`}
                        >
                          {d.day}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span>{productionDays.length} shoots</span>
                        <span>{paidCount} paid ads</span>
                      </div>
                      <span className={`text-sm font-semibold ${w.accent} group-hover:translate-x-1 transition-transform`}>View Schedule →</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className="mt-10 p-6 bg-white/[0.03] border border-white/8 rounded-2xl">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Content Type Legend</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'Problem Hook', color: 'bg-rose-500' },
                  { label: 'Result Hook', color: 'bg-green-500' },
                  { label: 'Curiosity Hook', color: 'bg-cyan-500' },
                  { label: 'Myth Breaker', color: 'bg-purple-500' },
                  { label: 'Social Proof', color: 'bg-blue-500' },
                  { label: 'How-To', color: 'bg-amber-500' },
                  { label: 'Transparency', color: 'bg-indigo-500' },
                  { label: 'Direct CTA', color: 'bg-orange-500' },
                  { label: 'Review', color: 'bg-pink-500' },
                  { label: 'Confession', color: 'bg-slate-500' },
                ].map(({ label, color }) => (
                  <div key={label} className="flex items-center gap-2 text-xs text-gray-400">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
