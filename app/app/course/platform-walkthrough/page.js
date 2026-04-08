'use client'

import Link from 'next/link'
import { Home, BookOpen, Video, Clock } from 'lucide-react'

const SECTIONS = [
  {
    title: 'OPEN — HOOK',
    timestamp: '0:00–0:45',
    blocks: [
      { d: true, t: 'Presenter to camera. Upbeat energy. No long intro.' },
      { t: "Welcome. If you're watching this, you've just made a decision that most people in your industry haven't made yet — and by the time this video ends, you're going to have something most of them still don't have: a live AI UGC creative, ready to publish." },
      { t: "This first video is a walkthrough. I'm going to show you exactly how to get from a blank screen to an exported AI UGC ad — in one sitting. No prior experience needed. Just follow along." },
      { t: "Let's start with the only question that matters right now: what product or offer are we making this for?" },
      { d: true, t: 'Pause beat — rhetorical, viewer answers mentally.' },
      { t: "Got it in your head? Good. Keep that in mind throughout, because every decision we make in this video is going to be about that specific thing." },
    ],
  },
  {
    title: 'SECTION 1 — WHAT AI UGC ACTUALLY IS',
    timestamp: '0:45–2:30',
    blocks: [
      { d: true, t: 'Slight shift in tone — teaching mode, but still conversational.' },
      { t: "Before we touch the platform, I want to spend 60 seconds on why this works — because understanding the mechanism makes you a much better creative director." },
      { t: "UGC stands for user-generated content. But really, what it means in advertising is: content that looks like a real person made it on their phone, not a brand in a studio. That distinction matters enormously, because the moment someone's brain registers 'this is an ad,' their guard goes up and engagement drops." },
      { t: "AI UGC mimics the format of genuine creator content — a person talking to camera, in a real-looking setting, with a natural conversational script. The algorithms on Meta and TikTok treat it the same as organic content. Which means lower CPMs, better delivery, and audiences who are actually listening rather than scrolling past." },
      { t: "You're not trying to deceive anyone. You're just speaking in the native language of the platform. And AI UGC does that at a fraction of the cost of hiring a real creator — and in a fraction of the time." },
      { t: "Okay. Now let's build your first one." },
    ],
  },
  {
    title: 'SECTION 2 — PLATFORM ORIENTATION',
    timestamp: '2:30–4:30',
    blocks: [
      { d: true, t: "Transition to screen-share OR continue to camera with visual overlays showing the platform UI." },
      { t: "When you log into Blobbi, the first thing you'll see is your dashboard. Don't get distracted by everything on here just yet — we're going to do one thing at a time." },
      { t: "The first step is creating a new project. Click 'New creative' and you'll be taken to the setup screen." },
      { d: true, t: 'Pause — point to the relevant part of the screen.' },
      { t: "Three things to set up here: your avatar, your script, and your output format. We're going to go through each one." },
      { t: "Avatar first. This is the AI presenter who's going to deliver your ad. You'll see a selection of different faces, ages, and styles. Here's how to choose the right one: think about your customer. Not you — your customer. What do they look like? What kind of person do they trust? Your avatar should feel like someone they'd already be inclined to listen to." },
      { t: "If you're selling a premium skincare product to women in their late thirties, you don't want a high-energy 22-year-old avatar. You want someone who feels like a peer — calm, credible, put-together." },
      { t: "If you're selling a fitness supplement to young men who want to build muscle fast, the energy level and presentation should match that. Confident, direct, slightly more intense." },
      { t: "Choose your avatar based on your audience, not your personal preference. Click on one that fits, and move to the next step." },
    ],
  },
  {
    title: 'SECTION 3 — ENTERING YOUR SCRIPT',
    timestamp: '4:30–6:30',
    blocks: [
      { d: true, t: 'Stay on screen or transition back to camera.' },
      { t: "Next is your script. This is the text your avatar is going to speak. We have a full module on writing great scripts in Video 2, but for your first creative, I want to give you something simple that works right now." },
      { t: "Use this structure. Three parts. Write it out before you paste it in." },
      { t: "Part one is your hook — one sentence, delivered in the first three seconds. Something that calls out your customer's problem or stops them mid-scroll. From the Script Bank, Script number one is a great starting point: 'Stop doing X. It's costing you more than you think.' Fill in the X with whatever applies to your product." },
      { t: "Part two is your body — eight to twelve sentences that acknowledge the problem, introduce your product as the solution, and give one proof point. Keep it conversational. Write it the way you'd explain it to a friend." },
      { t: "Part three is your CTA — one instruction. Not two, not a question. One clear action. 'Tap the link below.' 'Shop now.' 'Try it free.' Pick one and end on it." },
      { t: "Paste your full script into the text field. Aim for between 120 and 180 words for a 30 to 45 second video. If you're over 200 words, cut it down. Shorter almost always performs better." },
      { d: true, t: 'Demonstrate pasting script in on screen if screen-sharing.' },
      { t: "Once your script is in, read it back once before you go further. Ask yourself: does this sound like a real person talking? Or does it sound like marketing copy? If it sounds like a brochure, rewrite it. If it sounds like you explaining something to someone you know — you're good." },
    ],
  },
  {
    title: 'SECTION 4 — OUTPUT SETTINGS AND EXPORT',
    timestamp: '6:30–8:00',
    blocks: [
      { t: "Last step before you generate: output format." },
      { t: "For Meta Reels and TikTok, you want 9:16 — that's vertical, full screen. For Meta feed placements, 4:5 or 1:1 works better. If you're not sure, start with 9:16. It works everywhere and you can always resize later." },
      { t: "Enable captions if the platform gives you that option. Eighty-five percent of social video is watched without sound. Captions are not optional — they're essential." },
      { t: "Hit generate. Depending on the platform, this will take anywhere from a few seconds to a couple of minutes. While it's processing — don't touch anything. Let it run." },
      { d: true, t: 'If screen-sharing, show the generation process. If to camera, hold the beat naturally.' },
      { t: "When it's done, preview the output. Watch the full thing. Listen to the pacing. Is the hook delivered in the first three seconds? Does the body hold attention? Does the CTA land cleanly at the end?" },
      { t: "If something feels off — the pacing, the emphasis, the way a line is delivered — go back and adjust the script. You can regenerate as many times as you need." },
      { t: "When you're happy with it, export. You've got your first AI UGC creative." },
    ],
  },
  {
    title: 'CLOSE',
    timestamp: '8:00–8:45',
    blocks: [
      { d: true, t: 'Back to camera, warm close.' },
      { t: "That's video one. You just produced something that most businesses are still paying hundreds of dollars per video to get from real creators. You did it in one sitting." },
      { t: "In video two, we're going deep on scripts — specifically, how to write hooks that stop the scroll, body copy that keeps people watching, and CTAs that actually drive action. That's where good AI UGC becomes great AI UGC." },
      { t: "Don't skip it. The platform is just a tool. The script is everything. I'll see you in the next one." },
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

export default function PlatformWalkthroughPage() {
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
      <div className="px-6 pt-12 pb-10" style={{ background: 'linear-gradient(180deg, #0d1220 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-5">
            <Video className="w-3.5 h-3.5" /> Video 1 · Course 4
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Your First AI UGC Ad —{' '}
            <span className="bg-yellow-400 text-black px-2 rounded-md">Platform Walkthrough</span>
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8–10 min</span>
            <span className="text-gray-600">·</span>
            <span>Format: Talking head to camera</span>
            <span className="text-gray-600">·</span>
            <span>Assets: Playbook Section 02, Script Bank #1 or #7</span>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-5 py-4">
            <p className="text-sm text-blue-300 font-semibold mb-1">Goal</p>
            <p className="text-sm text-gray-400">The viewer should have their first AI UGC creative exported by the time this video ends.</p>
          </div>
        </div>
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
          <Link href="/app/course/script-to-screen" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">
            Video 2 — Script to Screen →
          </Link>
        </div>
      </div>

    </div>
  )
}
