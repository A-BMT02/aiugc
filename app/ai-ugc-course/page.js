'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, X, Shield, Lock, Zap, Star, ChevronDown, ChevronUp, ArrowRight, Play } from 'lucide-react'

const CHECKOUT_URL = '/ai-ugc-course-checkout'

const STEP_IMAGES = [
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Steps/Step1.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Steps/Step2.png',
  'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Steps/Step3.png',
]

const faqs = [
  { q: 'Do I need to already have a Blobbi account?', a: "No. The course walks you through setting up your account in lesson one. You'll have everything you need by the end of the first video." },
  { q: "I'm not technical. Will I be able to do this?", a: "Yes. The course is designed specifically for people with no prior experience producing AI video content. If you can type a script and click a few buttons, you can do this." },
  { q: 'What kind of products does AI UGC work for?', a: "It works well for physical ecommerce products, SaaS tools, digital products, coaching offers, and service businesses. If you're running paid ads on Meta or TikTok, AI UGC can work for your offer." },
  { q: 'Why is it only $1?', a: "The $1 price is a limited launch promotion designed to get the course in front of as many people as possible quickly. Once we hit our launch target, it returns to $297. We don't have a fixed date for when that happens." },
  { q: 'How long does it take to complete?', a: "The four video lessons run for approximately 35 minutes total. You can complete the full course in a single sitting. Most people produce their first AI UGC creative on the same day." },
  { q: "What's included exactly?", a: "Four video lessons, the AI UGC Ads Playbook, the AI UGC Ad Script Bank (100 scripts across 9 niches), and the 30-Day AI UGC Production Calendar. All instant access on purchase." },
  { q: 'Is there a refund policy?', a: "Yes. 30 days, no questions asked. Email us, we'll refund you. That's it." },
  { q: 'Can I use this to offer AI UGC as a service to clients?', a: "Absolutely. Several of our students have built freelance or agency income streams around AI UGC production. The course gives you the foundation — the Agency Blueprint bonus gives you the service packaging." },
]

function Stars({ count = 5, size = 'sm' }) {
  const cls = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={`${cls} text-yellow-400 fill-yellow-400`} />
      ))}
    </div>
  )
}

function CTAButton({ text = 'Yes, Give Me Instant Access — Just $1', sub }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Link
        href={CHECKOUT_URL}
        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-black text-xl md:text-2xl rounded-xl hover:from-orange-400 hover:to-orange-300 transition-all hover:scale-105 shadow-2xl shadow-orange-500/40 text-center"
      >
        {text}
        <ArrowRight className="w-6 h-6 shrink-0" />
      </Link>
      {sub && <p className="text-gray-400 text-sm text-center">{sub}</p>}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 mt-1">
        <span className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-green-400" /> 100% Secure Checkout</span>
        <span className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-green-400" /> Instant Access</span>
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-green-400" /> 30-Day Guarantee</span>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition-colors">
        <span className="font-bold text-base pr-4">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-green-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/10 pt-4 text-sm">{a}</div>}
    </div>
  )
}

export default function AIUGCCoursePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* ── 01 TOP BAR ── */}
      <div className="bg-orange-500 text-white text-sm font-black text-center py-3 px-4 sticky top-0 z-50 tracking-wide">
        ⚡ LIMITED TIME: Get the AI UGC Fast-Start Course for just <span className="bg-yellow-300 text-black px-1.5 rounded">$1 today</span> (regular price $297)
      </div>

      {/* ── 02 HERO ── */}
      <section className="px-6 pt-16 pb-20 text-center" style={{ background: 'linear-gradient(180deg, #0d1f0d 0%, #0d0d0d 100%)' }}>
        <div className="max-w-4xl mx-auto">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-12 object-contain" />
          </div>

          {/* Pre-headline */}
          <p className="text-green-400 text-sm font-bold uppercase tracking-widest mb-4">
            The $1 AI UGC course brands are using to replace their content creators
          </p>

          {/* Stars */}
          <div className="flex justify-center mb-6">
            <Stars size="lg" />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Create AI Video Ads That{' '}
            <span className="bg-yellow-400 text-black px-2 rounded-md">Actually Convert</span>
            {' '}— Without Hiring a Single Creator
          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            Join thousands of brands using Blobbi to produce scroll-stopping AI UGC ads
            for Meta and TikTok in minutes — at a fraction of the cost of real creators.
          </p>

          {/* Video */}
          <div className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 overflow-hidden mb-10 shadow-2xl shadow-black/60">
            <video controls autoPlay muted playsInline className="w-full">
              <source src="https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/DemoVideo%20(1).mp4" type="video/mp4" />
            </video>
          </div>

          {/* CTA */}
          <CTAButton sub="Regular price $297 · Instant access · No risk — 30-day money-back guarantee" />
        </div>
      </section>

      {/* ── 03 SOCIAL PROOF BAR ── */}
      <section className="bg-green-500 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-black">
          {[
            { stat: '10,000+', label: 'Brands & Creators Enrolled' },
            { stat: '$0', label: 'Creator Fees Required' },
            { stat: '30 min', label: 'To Your First AI UGC Ad' },
            { stat: '$1,500', label: 'Saved on Average' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="text-3xl md:text-4xl font-black">{stat}</div>
              <div className="text-sm font-semibold opacity-80 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04 PROBLEM ── */}
      <section className="py-24 px-6 bg-[#111111]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-10">Sound familiar?</h2>
          <div className="space-y-5 text-left text-gray-300 leading-relaxed">
            <p>You've got a great product. You know video ads work. But getting consistent, high-quality video content is <span className="text-white font-semibold">expensive, slow, and unpredictable.</span></p>
            <p>Real UGC creators charge <span className="bg-yellow-400 text-black font-black px-1.5 rounded text-sm">$150 to $500 per video</span>. Half of what they deliver doesn't convert. You're briefing, waiting, reviewing, revising — and still not sure if the content is going to perform.</p>
            <p>So you either spend a fortune on creators and hope for the best, or you skip video ads altogether and watch your competitors run circles around you with content that actually looks like it comes from real people.</p>
            <p className="text-orange-400 font-bold text-lg">There's a third option. And it's what thousands of brands are quietly switching to right now.</p>
          </div>
        </div>
      </section>

      {/* ── 05 SOLUTION ── */}
      <section className="py-16 px-6 bg-[#0d0d0d]" style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #0f0e07 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-green-500/10 border border-green-500/30 rounded-2xl px-8 py-8">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Introducing</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-5">The <span className="bg-yellow-400 text-black px-2 rounded-md">AI UGC Fast-Start</span> Course</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              A short, practical course that shows you exactly how to create professional AI UGC video ads
              using Blobbi — from your first creative to your first live campaign — in one afternoon.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              No camera. No creators. No technical experience required. Just a product to sell and a willingness to follow a simple process.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              By the time you finish this course, you'll have a working AI UGC ad ready to publish on Meta or
              TikTok — and the system to produce more whenever you need them.
            </p>
            <p className="text-sm text-gray-400 italic">
              This isn't a theory course. It isn't 10 hours of content you'll never get through. It's four focused video
              lessons and three done-for-you tools that take you from zero to live creative — step by step, nothing skipped.
            </p>
          </div>
        </div>
      </section>

      {/* ── 06 WHAT YOU GET — MODULE CARDS (alternating) ── */}
      <section className="py-16 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Course contents</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Here's everything included for just <span className="bg-yellow-400 text-black px-2 rounded-md">$1</span>
            </h2>
          </div>

          {/* Module cards - alternating left/right */}
          <div className="space-y-6">
            {[
              { num: '01', title: 'Platform Walkthrough', desc: "Get set up in Blobbi and produce your first AI UGC creative from scratch. By the end of this lesson, you'll have a finished ad ready to export.", img: STEP_IMAGES[0] },
              { num: '02', title: 'Script to Screen', desc: 'Learn the five-part script structure that every high-converting UGC ad follows. Write a script that stops the scroll, holds attention, and drives action.', img: null },
              { num: '03', title: 'Product & Lifestyle UGC', desc: "Go beyond the talking head. See how to produce product-focused and lifestyle-style AI UGC for ecommerce brands where the product is part of the story.", img: null },
              { num: '04', title: 'Talking Head Ads for Meta & TikTok', desc: 'Launch your first paid AI UGC campaign. Campaign structure, budget setup, the five metrics that matter, and exactly when to scale.', img: null },
            ].map(({ num, title, desc, img }, i) => (
              <div
                key={num}
                className={`flex flex-col ${img ? (i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse') : ''} gap-0 rounded-2xl overflow-hidden border border-white/10`}
              >
                {/* Text side */}
                <div className={`${img ? 'flex-1' : 'w-full'} p-8 md:p-10 bg-white/[0.04] flex flex-col justify-center`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0">
                      {num}
                    </div>
                    <div className="h-px flex-1 bg-orange-500/30" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Play className="w-4 h-4 text-orange-400 fill-orange-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Video {num}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4">{title}</h3>
                  <p className="text-gray-400 leading-relaxed">{desc}</p>
                </div>
                {/* Image side — only if img provided */}
                {img && (
                  <div className="w-full md:w-2/5 aspect-video md:aspect-auto bg-black/60 overflow-hidden">
                    <img src={img} alt={title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── BONUSES ── */}
          <div className="mt-14">
            <div className="text-center mb-12">
              <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Also included</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Plus these 3 free bonuses</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: 'BONUS 1', title: 'The AI UGC Ads Playbook', desc: 'The complete guide to using AI UGC across paid social and organic — from briefing your first creative to scaling a winning campaign.', value: '$97 value' },
                { num: 'BONUS 2', title: 'The AI UGC Ad Script Bank', desc: '100 done-for-you scripts across 9 niches. Hook, body, CTA — ready to drop into Blobbi and record.', value: '$147 value' },
                { num: 'BONUS 3', title: 'The 30-Day AI UGC Production Calendar', desc: 'A day-by-day content schedule telling you exactly what to produce, what format to use, what avatar style to choose, and what metric to watch.', value: '$47 value' },
              ].map(({ num, title, desc, value }) => (
                <div key={num} className="relative pt-8 p-6 bg-gradient-to-br from-orange-950/30 to-black border border-orange-500/20 rounded-2xl flex flex-col">
                  <div className="absolute -top-3 left-6">
                    <span className="bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full">{num}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{desc}</p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-yellow-400 font-black">{value}</span>
                    <Check className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mid-page CTA */}
          <div className="mt-14 text-center">
            <CTAButton sub="Instant access · All 4 videos + 3 bonuses · 30-day money-back guarantee" />
          </div>
        </div>
      </section>

      {/* ── 07 WHO IT'S FOR ── */}
      <section className="py-20 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">This is for you if...</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-green-950/40 border border-green-500/25 rounded-3xl">
              <h3 className="font-black text-lg text-green-400 mb-6 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"><Check className="w-3.5 h-3.5 text-black" /></div>
                This IS for you if:
              </h3>
              <ul className="space-y-4">
                {[
                  'You sell a product or service and want to run video ads without hiring creators',
                  "You're spending too much on UGC content and not getting consistent results",
                  "You've heard about AI UGC but don't know where to start or what actually works",
                  'You want to test more ad creatives without multiplying your production budget',
                  "You're running an ecommerce store, SaaS product, or service business and want cheaper, faster creative",
                  "You're a freelancer or agency who wants to offer AI UGC as a service to clients",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl">
              <h3 className="font-black text-lg text-gray-400 mb-6 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500/20 border border-red-500/40 rounded-full flex items-center justify-center"><X className="w-3.5 h-3.5 text-red-400" /></div>
                This is NOT for you if:
              </h3>
              <ul className="space-y-4">
                {[
                  "You're looking for a get-rich-quick scheme — this is a practical marketing tool, not a passive income system",
                  "You're not willing to write a basic script or spend 30 minutes producing your first creative",
                  "You expect results without any paid ad spend — the course teaches you to produce creative, not run ads for you",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-[#111111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <div className="flex justify-center"><Stars size="lg" /></div>
          </div>
          <div className="text-center mb-14">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3 mt-3">Real results</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">What brands are saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I was paying $400 per UGC video and getting maybe 2 a week. Now I produce 10 in a morning. My cost per purchase on Meta dropped 43% in the first month.", name: 'Sarah M.', role: 'Ecommerce founder, beauty brand', photo: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Sarah-Image.png' },
              { quote: "The script bank alone was worth it. I've adapted about 30 of the scripts across different client accounts. The hooks are genuinely strong — not the generic stuff you find everywhere.", name: 'James K.', role: 'Performance marketing manager', photo: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Daniel-Image.png' },
              { quote: "I now offer AI UGC as a service to ecom clients. I charge $800 a month for 8 creatives. This course is what made that possible — I had no idea how to produce this stuff before.", name: 'Priya T.', role: 'Freelance media buyer', photo: 'https://lfhcefxmgyjzggqzsxxr.supabase.co/storage/v1/object/public/static/Homepage/Testimonial/Testimonial-Federico-Image.jpg' },
            ].map(({ quote, name, role, photo }) => (
              <div key={name} className="p-7 bg-white/5 border border-white/10 rounded-3xl flex flex-col">
                <Stars />
                <p className="text-gray-300 leading-relaxed flex-1 my-5 text-sm italic">"{quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img src={photo} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-green-500/40 shrink-0" />
                  <div>
                    <div className="font-bold text-sm">{name}</div>
                    <div className="text-xs text-gray-500">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 09 VALUE STACK ── */}
      <section className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">The offer</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Here's what you're getting <span className="bg-yellow-400 text-black px-2 rounded-md">today</span></h2>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10">
            {[
              { item: 'AI UGC Fast-Start Course (4 videos)', value: '$297' },
              { item: 'BONUS: The AI UGC Ads Playbook', value: '$97' },
              { item: 'BONUS: AI UGC Ad Script Bank (100 scripts)', value: '$147' },
              { item: 'BONUS: The 30-Day Production Calendar', value: '$47' },
            ].map(({ item, value }, i, arr) => (
              <div key={item} className={`flex items-center justify-between px-7 py-4 bg-white/[0.03] ${i < arr.length - 1 ? 'border-b border-white/10' : ''}`}>
                <div className="flex items-center gap-3 text-gray-300 text-sm">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />{item}
                </div>
                <span className="text-gray-500 font-bold text-sm shrink-0 ml-4">{value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between px-7 py-4 bg-white/5 border-t border-white/10">
              <span className="font-bold text-gray-400">Total value</span>
              <span className="font-black text-xl line-through text-gray-500">$588</span>
            </div>
            <div className="px-7 py-10 bg-gradient-to-br from-green-950/80 to-black border-t border-green-500/20 text-center">
              <p className="text-gray-400 text-sm mb-2">Your price today</p>
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-2xl line-through text-gray-600">$588</span>
                <span className="text-7xl font-black text-orange-400">$1</span>
              </div>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                Not $588. Not $97. One dollar. You'll wonder why it's not more — start the course and you'll understand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 PRIMARY CTA BLOCK ── */}
      <section className="py-24 px-6 bg-[#111111]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Limited time offer</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Get instant access for just $1</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            This offer won't last. The $1 price is a limited-time launch promotion — once it's gone,
            the course returns to its regular price of $297. Lock in your access now.
          </p>
          <CTAButton sub="Instant access · All 4 videos + 3 bonuses · 30-day money-back guarantee" />
        </div>
      </section>

      {/* ── 11 GUARANTEE ── */}
      <section className="py-16 px-6 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 p-10 border-2 border-green-500/30 rounded-3xl bg-green-950/20">
            <img src="/money-back-guarantee.png" alt="30-Day Money-Back Guarantee" className="w-32 h-32 object-contain shrink-0" />
            <div>
              <h3 className="text-2xl font-black mb-3">30-Day Money-Back Guarantee</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Try the full course for 30 days. If you don't find it useful — for any reason — email us
                and we'll refund your $1 immediately, no questions asked. You have nothing to lose and a
                working AI UGC system to gain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12 FAQ ── */}
      <section className="py-24 px-6 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Got questions?</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── 13 FINAL CTA ── */}
      <section className="py-24 px-6" style={{ background: 'linear-gradient(160deg, #0d1f0d 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Don't wait</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            You're <span className="bg-yellow-400 text-black px-2 rounded-md">one afternoon</span> away from your first AI UGC ad.
          </h2>
          <p className="text-gray-400 mb-4 leading-relaxed text-lg">
            Every day you wait is another day your competitors are producing cheaper, faster creative than you are.
            AI UGC is not coming. It's already here. The brands using it are already seeing the results.
          </p>
          <p className="text-gray-300 mb-10 leading-relaxed">
            For $1, you get everything you need to start. The course. The scripts. The calendar. The system.{' '}
            <strong className="text-white">Get in. Go build something.</strong>
          </p>
          <CTAButton sub="Click below to go to checkout · Takes less than 60 seconds" />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-10 px-6 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-6 object-contain opacity-60" />
            <span className="font-black tracking-tight text-white">blobbi<span className="text-green-400">.</span>ai</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-green-400 transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-green-400 transition">Terms of Service</Link>
          </div>
          <span>© 2025 Blobbi. All rights reserved.</span>
        </div>
      </footer>

    </div>
  )
}
