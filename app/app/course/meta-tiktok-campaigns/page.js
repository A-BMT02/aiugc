'use client'

import Link from 'next/link'
import { Home, BookOpen, Video, Clock } from 'lucide-react'

const VIDEO_EMBED_URL = 'https://drive.google.com/file/d/1plJ1PMbIouGhtpG6JkJuVtFn7VtCgVbS/preview'

const SECTIONS = [
  {
    title: 'OPEN — HOOK',
    timestamp: '0:00–0:45',
    blocks: [
      { d: true, t: 'Direct, confident. This is the most business-critical video in the course.' },
      { t: "Everything in the previous three videos — the platform, the script, the creative formats — has been building to this. Because a great AI UGC ad sitting in your exports folder isn't doing anything. It needs to be in front of the right people, with the right budget behind it." },
      { t: "This video is about running your AI UGC as paid ads. I'm going to show you the campaign structure that works, how to allocate budget across your creatives, what metrics to watch, and the exact point at which you should be scaling." },
      { t: "By the end of this, you should have your first campaign live. Let's go." },
    ],
  },
  {
    title: 'SECTION 1 — WHY CREATIVE IS THE MOST IMPORTANT VARIABLE',
    timestamp: '0:45–2:15',
    blocks: [
      { t: "Before we get into the platform, one principle that will save you a lot of money and frustration." },
      { t: "Most people think media buying is about targeting — finding the right audience segments, building the perfect lookalike, refining the interest stack. That's 2018 thinking. The algorithms on Meta and TikTok in 2026 are significantly better at audience finding than you are. Your job is not to tell the algorithm who to show your ad to. Your job is to give it creative good enough that it can figure that out on its own." },
      { t: "The single biggest lever you have in paid social is the quality and volume of your creative. The brand with the best creative wins — regardless of budget, regardless of targeting. AI UGC gives you the ability to produce that creative volume. That's the actual advantage." },
      { t: "So when something isn't working in your campaigns, look at the creative before you look at anything else. Change the hook. Change the avatar. Change the script structure. Don't start adjusting targeting or budgets when the creative is the variable that actually matters." },
    ],
  },
  {
    title: 'SECTION 2 — CAMPAIGN STRUCTURE ON META',
    timestamp: '2:15–5:00',
    blocks: [
      { d: true, t: 'Transition to screen if possible, or to camera with overlay graphics showing campaign structure.' },
      { t: "For Meta, the campaign structure I recommend for AI UGC is straightforward. One campaign. Within that campaign, one or two ad sets. Within each ad set, between four and six active creatives." },
      { t: "For ecommerce, use Advantage+ Shopping Campaigns — Meta's automated shopping format. For lead generation or app installs, use a standard conversion campaign with Campaign Budget Optimisation (CBO) turned on." },
      { t: "Why CBO? Because it lets Meta distribute your budget across ad sets based on what's performing — rather than you manually controlling spend per ad set. Combine that with Advantage+ placements, and you're letting the algorithm do the heavy lifting on both audience and placement. Your focus is creative." },
      { t: "Upload your AI UGC creatives at the ad level. Each creative gets its own ad. Do not put multiple creatives in a single ad — you want clean, separate performance data for each one." },
      { t: "Start with a daily budget that gives each creative room to gather data. As a rough guide: if you're running four creatives, your daily budget should be high enough to get each one at least 500 to 1,000 impressions per day. If your budget is tight, run fewer creatives with more budget each — rather than spreading thin across ten." },
      { t: "One critical rule: do not edit the campaign for the first 72 hours. Every time you change something during the learning phase, Meta resets the algorithm's learning. Set it, leave it, and watch the data come in." },
    ],
  },
  {
    title: 'SECTION 3 — CAMPAIGN STRUCTURE ON TIKTOK',
    timestamp: '5:00–6:30',
    blocks: [
      { t: "TikTok's structure is similar in principle, but the platform moves faster. Creative fatigues quicker, audiences burn through content faster, and you need to be rotating fresh creatives more regularly." },
      { t: "Use TikTok's Smart Performance Campaign — it's the equivalent of Meta's Advantage+. Feed it between six and ten AI UGC creatives and let it optimise delivery." },
      { t: "One thing that works particularly well on TikTok: adding trending audio to your AI UGC creative before you upload it. You can do this in any basic video editor — just layer a trending TikTok sound under your video at low volume. It doesn't change what the viewer hears, but it signals to the TikTok algorithm that your content is relevant to what's currently performing on the platform. It's a small thing that has a meaningful effect on reach and delivery." },
      { t: "TikTok's Spark Ads are also worth knowing about. If you're running your AI UGC organically on TikTok alongside your paid campaigns — which I recommend — you can boost your best-performing organic posts as Spark Ads. They carry over the organic engagement metrics, which makes the paid post look more credible to new viewers." },
    ],
  },
  {
    title: 'SECTION 4 — WHAT TO MEASURE AND WHEN TO ACT',
    timestamp: '6:30–8:30',
    blocks: [
      { d: true, t: 'Back to camera. Precise and clear — this is the decision-making framework.' },
      { t: "Here are the five metrics that matter, in the order you should look at them." },
      { t: "First: hook rate. The percentage of people who watch past the three-second mark. If this is below 25 percent on most of your creatives, your hooks aren't landing. Go back to the script and rewrite the opening line." },
      { t: "Second: thumb-stop rate. Are people pausing on your opening frame? If your hook rate is strong but your thumb-stop is weak, the visual opening — the setting, the avatar, the first image — isn't stopping the scroll. Try a different avatar or a different opening visual." },
      { t: "Third: completion rate. What percentage of viewers watch to 75 percent or more? If this is low, you're losing people mid-script. The problem is usually in the body copy — too long, too vague, or not delivering on the promise the hook made." },
      { t: "Fourth: click-through rate. The percentage clicking through to your landing page or offer. If your hook rate and completion rate are strong but your CTR is low, the problem is usually the CTA — either it's too weak, too vague, or the offer itself isn't compelling enough at the price point." },
      { t: "Fifth: cost per acquisition. This is your bottom line — what it costs you to get a customer. Compare this against your target CPA based on your product margin. Any creative consistently hitting your target CPA should be getting more budget. Any creative that isn't, after at least 2,000 impressions, should be paused." },
      { t: "The budget scaling rule: when you identify a winning creative, increase the daily budget by no more than 20 to 25 percent every 48 to 72 hours. Larger jumps trigger a new learning phase, which resets the algorithm's optimisation. Slow, steady increases compound into significant scale without disrupting delivery." },
    ],
  },
  {
    title: 'SECTION 5 — CREATIVE FATIGUE AND WHAT TO DO ABOUT IT',
    timestamp: '8:30–9:30',
    blocks: [
      { t: "Every creative fatigues eventually. Even the best ones. When you notice your CPA creeping up, your CTR dropping week on week, or your frequency rising above three to four per week — the creative is tired." },
      { t: "The fix is not to adjust targeting or increase budget. The fix is new creative. Go back to Blobbi, write a new script using a different hook format, and generate a fresh batch. Keep the winning elements — if a particular avatar has performed well, keep using it. If a particular hook structure has worked, use it again with a new topic. Build on what the data has already told you." },
      { t: "Your 30-day production calendar has this rotation built in. Stick to it, and creative fatigue becomes a manageable, predictable cycle rather than a crisis." },
    ],
  },
  {
    title: 'CLOSE',
    timestamp: '9:30–10:15',
    blocks: [
      { d: true, t: 'Final close — warm, motivating, forward-looking. This is the end of the course.' },
      { t: "That's the full course. You've gone from understanding why AI UGC works, to producing your first creative, to writing scripts that convert, to running and scaling paid campaigns. That's the complete system." },
      { t: "The only thing left to do is use it. Pick a product. Write a hook. Generate your first creative today. Run it with a small budget to gather data. Then let the data tell you what to build next." },
      { t: "The brands winning on paid social right now are not the ones with the biggest budgets. They're the ones producing the most creative volume, testing the fastest, and learning more quickly than everyone else. That's what this system gives you." },
      { t: "Go build something. Good luck." },
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

export default function MetaTikTokCampaignsPage() {
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
      <div className="px-6 pt-12 pb-10" style={{ background: 'linear-gradient(180deg, #1a0d1a 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-400 text-xs font-bold uppercase tracking-widest mb-5">
            <Video className="w-3.5 h-3.5" /> Video 4 · Course 5
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Talking Head Ads —{' '}
            <span className="bg-yellow-400 text-black px-2 rounded-md">Direct Response on Meta & TikTok</span>
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 9–11 min</span>
            <span className="text-gray-600">·</span>
            <span>Format: Talking head with Ads Manager walkthroughs</span>
            <span className="text-gray-600">·</span>
            <span>Assets: Playbook Sections 03 & 04, 30-Day Calendar</span>
          </div>
          <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl px-5 py-4">
            <p className="text-sm text-pink-300 font-semibold mb-1">Goal</p>
            <p className="text-sm text-gray-400">Viewer has a live paid campaign running by the end of the video.</p>
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
          <p className="text-gray-400 font-semibold mb-1">Course complete.</p>
          <p className="text-gray-500 text-sm mb-4">You have everything you need. Go build something.</p>
          <Link href="/app/course" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all">
            ← Back to All Courses
          </Link>
        </div>
      </div>

    </div>
  )
}
