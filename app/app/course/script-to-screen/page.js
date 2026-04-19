'use client'

import Link from 'next/link'
import { Home, BookOpen, Video, Clock } from 'lucide-react'

const VIDEO_EMBED_URL = 'https://drive.google.com/file/d/14MEHcUyPmyDuSLFH69fcw3MPEcV1PYgm/preview'

const SECTIONS = [
  {
    title: 'OPEN — HOOK',
    timestamp: '0:00–0:40',
    blocks: [
      { d: true, t: 'Direct to camera. Slightly more serious energy than Video 1 — this is the craft lesson.' },
      { t: "Here's something most people get wrong about AI UGC: they think the tool does the work. It doesn't. The tool renders what you give it. Which means your script is everything." },
      { t: "A mediocre script delivered by a perfect avatar is still a mediocre ad. A great script delivered by an average avatar will still outperform it almost every time." },
      { t: "This video is about writing great scripts. Specifically, the five-part structure that every high-converting UGC ad follows — whether it's made by a real creator or an AI one. Once you know this structure, you'll never start from a blank page again." },
    ],
  },
  {
    title: 'SECTION 1 — WHY MOST UGC SCRIPTS FAIL',
    timestamp: '0:40–2:00',
    blocks: [
      { t: "Before we get into the structure, let's talk about why most UGC scripts don't work." },
      { t: "The most common mistake is leading with the product. 'Hi, I want to tell you about this amazing new thing I've been using.' The viewer doesn't care about your product. Not yet. They care about themselves. Their problem. Their situation." },
      { t: "The second mistake is being vague. 'This product really helped me feel better.' Better how? Compared to what? In what timeframe? Vague claims don't convert. Specific claims do." },
      { t: "The third mistake is a weak CTA. Two options, a question, or no instruction at all. Your CTA needs to be one specific action. The viewer's brain needs zero ambiguity about what to do next." },
      { t: "Keep those three mistakes in mind. The structure we're about to go through is designed to eliminate all of them." },
    ],
  },
  {
    title: 'SECTION 2 — THE FIVE-PART STRUCTURE',
    timestamp: '2:00–5:30',
    blocks: [
      { d: true, t: 'This is the core teaching section. Slow down slightly. Use the screen to show each part as you explain it.' },
      { t: "Every converting UGC script has five parts. Hook, problem, solution, proof, CTA. In that order, every time. Here's what each one does and how to write it." },

      { d: true, t: 'PART 1 — THE HOOK (0 to 3 seconds)' },
      { t: "This is the most important line in your entire script. If you lose someone here, the rest doesn't matter. Your hook has one job: make the viewer stop scrolling." },
      { t: "The best hooks do one of seven things. They call out a problem directly. They open with a surprising result. They challenge a belief the viewer holds. They create a curiosity gap. They use a social proof number. They lead with a how-to framing. Or they make a direct, specific promise." },
      { t: "Your hook should be one sentence. It should be delivered in the first three seconds. And it should feel like it's speaking directly to one specific person — not a general audience." },
      { d: true, t: "Show example on screen: 'I've been spending $400 a month on UGC creators. Here's what I switched to.'" },
      { t: "Notice what that hook does. It names a specific number. It implies a problem — cost. And it promises a revelation. The viewer now wants to know what the switch was. That's a hook doing its job." },

      { d: true, t: 'PART 2 — THE PROBLEM (3 to 15 seconds)' },
      { t: "Now that you've stopped the scroll, you need to earn the viewer's attention by showing them you understand their situation." },
      { t: "This section isn't about your product. It's about their frustration. Their experience. The thing they've been dealing with that your product solves. Describe it specifically enough that the viewer thinks: 'yes, that's exactly it.'" },
      { d: true, t: "Show example on screen: 'I'd tried briefing real creators — slow turnaround, expensive revisions, no guarantee the content would even work. I was spending more time managing the process than running ads.'" },
      { t: "The viewer in your target audience recognises that experience immediately. That recognition creates connection. And connection is what keeps them watching." },

      { d: true, t: 'PART 3 — THE SOLUTION (15 to 35 seconds)' },
      { t: "Now introduce your product. Not as a product — as the answer to the problem you just described." },
      { t: "The framing matters here. 'I found a tool' is weaker than 'I switched to AI UGC.' 'It helps with content' is weaker than 'I went from one video a week to twenty.' Lead with what it does, not what it is." },
      { t: "Keep the product description functional. Explain the mechanism briefly — how it works in one or two sentences — then move straight to the result it creates." },
      { d: true, t: "Show example: 'I started using AI-generated UGC. I brief a script, pick an avatar, and I have a finished video in minutes. No creator fees, no revision rounds, no waiting.'" },

      { d: true, t: 'PART 4 — THE PROOF (35 to 45 seconds)' },
      { t: "One proof point. Not five. One." },
      { t: "A specific result. A number. A timeframe. Something that makes the claim feel real and verifiable. 'My cost per purchase dropped by 40 percent in the first two weeks.' 'I've produced 30 creatives this month for less than I used to pay for two.'" },
      { t: "The proof point doesn't need to be dramatic. It just needs to be specific. Specificity is credibility." },

      { d: true, t: 'PART 5 — THE CTA (45 to 60 seconds)' },
      { t: "One instruction. Clear, direct, friction-free. Tell the viewer exactly what to do and why to do it now." },
      { t: "'Tap the link below and try it free.' 'Shop now — they're running a launch discount this week.' 'Click below to see how it works.'" },
      { t: "Do not give them two options. Do not end with a question. End with a direction." },
    ],
  },
  {
    title: 'SECTION 3 — WRITING YOUR SCRIPT',
    timestamp: '5:30–7:30',
    blocks: [
      { d: true, t: 'Shift to practical application. More energetic — let\'s do the work.' },
      { t: "Now you're going to write one. Right now. Pause this video if you need to — but ideally, follow along." },
      { t: "Step one: write your hook. Use one of the seven hook types. My recommendation for your first script: the problem hook. 'If you're struggling with [specific problem], this is for you.' Fill in the specific problem your product solves." },
      { t: "Step two: write two to three sentences describing that problem. Make it specific. Make it recognisable." },
      { t: "Step three: introduce your product in one sentence — what it is and what it does." },
      { t: "Step four: one proof point. A number, a result, a timeframe." },
      { t: "Step five: your CTA. One instruction." },
      { t: "Total word count: aim for 120 to 160 words. Read it aloud once. If it takes longer than 45 seconds, cut it. If it sounds like a brochure, rewrite the problem section in simpler language." },
      { t: "The Script Bank you received with this course has 100 scripts already written to this structure across nine different niches. Use them as inspiration, adapt them to your product, or use them word-for-word with your details filled in. They're there to make this faster — not to replace your voice, but to give you a starting point that already works." },
    ],
  },
  {
    title: 'CLOSE',
    timestamp: '7:30–8:15',
    blocks: [
      { d: true, t: 'Warm, forward-looking close.' },
      { t: "The five-part structure is the foundation of every great UGC ad, whether it's made by a real creator or an AI one. Hook, problem, solution, proof, CTA. Once it's muscle memory, scripting becomes fast." },
      { t: "In video three, we're moving beyond the talking head format. I'll show you how to use AI UGC for product and lifestyle content — the formats that work especially well for ecommerce brands where the product itself is part of the story." },
      { t: "See you there." },
    ],
  },
]

function Direction({ text }) {
  return (
    <div className="flex gap-3 my-4">
      <div className="w-0.5 bg-gray-700 rounded-full shrink-0" />
      <p className="text-sm italic text-gray-500">{text}</p>
    </div>
  )
}

export default function ScriptToScreenPage() {
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
      <div className="px-6 pt-12 pb-10" style={{ background: 'linear-gradient(180deg, #1a150d 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-bold uppercase tracking-widest mb-5">
            <Video className="w-3.5 h-3.5" /> Video 2 · Course 6
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Script to Screen —{' '}
            <span className="bg-yellow-400 text-black px-2 rounded-md">Writing UGC That Converts</span>
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8–10 min</span>
            <span className="text-gray-600">·</span>
            <span>Format: Talking head with written examples</span>
            <span className="text-gray-600">·</span>
            <span>Assets: Script Bank (all 100), Playbook Section 02</span>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-5 py-4">
            <p className="text-sm text-yellow-300 font-semibold mb-1">Goal</p>
            <p className="text-sm text-gray-400">Viewer can write any UGC script from scratch using the five-part structure.</p>
          </div>
        </div>
      </div>

      {/* Video */}
      <div className="max-w-3xl mx-auto px-6 mb-10">
        {VIDEO_EMBED_URL ? (
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl" style={{ paddingTop: '56.25%' }}>
            <iframe src={VIDEO_EMBED_URL} className="absolute inset-0 w-full h-full" allow="autoplay" allowFullScreen />
          </div>
        ) : (
          <div className="w-full rounded-2xl border border-dashed border-white/20 bg-white/[0.02] flex items-center justify-center" style={{ minHeight: '320px' }}>
            <div className="text-center px-6">
              <Video className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Video coming soon</p>
            </div>
          </div>
        )}
      </div>

      {/* Script */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {SECTIONS.map((section, i) => (
          <div key={i} className="mb-12">
            <div className="flex items-baseline gap-3 mb-5 pb-4 border-b border-white/10">
              <h2 className="font-black text-white text-base tracking-wide">{section.title}</h2>
              <span className="text-xs text-gray-600 font-mono">{section.timestamp}</span>
            </div>
            <div className="space-y-4">
              {section.blocks.map((block, j) =>
                block.d
                  ? <Direction key={j} text={block.t} />
                  : <p key={j} className="text-gray-300 leading-relaxed text-[15px]">{block.t}</p>
              )}
            </div>
          </div>
        ))}

        <div className="mt-8 p-6 bg-white/[0.03] border border-white/8 rounded-2xl text-center">
          <p className="text-gray-500 text-sm mb-4">Up next</p>
          <Link href="/app/course/product-lifestyle-ugc" className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all">
            Video 3 — Product & Lifestyle UGC →
          </Link>
        </div>
      </div>

    </div>
  )
}
