'use client'

import Link from 'next/link'
import { Home, BookOpen, Video, Clock } from 'lucide-react'

const VIDEO_EMBED_URL = '' // Replace with Google Drive embed URL

const SECTIONS = [
  {
    title: 'OPEN — HOOK',
    timestamp: '0:00–0:45',
    blocks: [
      { d: true, t: 'Direct to camera. Slightly more playful energy — this video is about creative range.' },
      { t: "If you've watched the first two videos, you know how to produce a talking head AI UGC ad and write a script that converts. That's your foundation. But the talking head format is just one tool." },
      { t: "In this video, I'm going to show you two other formats that work extremely well for certain types of products and audiences — product-focused UGC and lifestyle UGC. Once you know how to use all three, you have a complete creative toolkit. And more creative variety means more data, faster learning, and better results." },
    ],
  },
  {
    title: 'SECTION 1 — WHY FORMAT VARIETY MATTERS',
    timestamp: '0:45–2:00',
    blocks: [
      { t: "Here's the thing about creative testing. When you run the same format over and over — even with different scripts — you eventually hit a ceiling. Your audience gets used to the visual pattern. The hook stops landing with the same impact." },
      { t: "Varying your formats solves two problems at once. First, it keeps your content feeling fresh to audiences who've seen your talking head ads. Second, it gives you more data about what actually resonates — because different formats perform differently for different products and audiences." },
      { t: "A high-consideration purchase — something someone thinks about before buying — tends to respond well to a calm, authoritative talking head. A visually appealing product — something people want to see in action — often performs better with a product or lifestyle format that shows it being used." },
      { t: "Know which you're dealing with, and match the format to the product." },
    ],
  },
  {
    title: 'SECTION 2 — PRODUCT-FOCUSED UGC',
    timestamp: '2:00–4:30',
    blocks: [
      { d: true, t: 'Shift to examples on screen. Show what product-focused UGC looks like.' },
      { t: "Product-focused UGC puts the item at the centre of the frame rather than a talking head avatar. Think unboxing-style content, product demonstration, before-and-after, or close-up detail shots. The voiceover does the scripting work while the visual tells the product story." },
      { t: "This format works especially well for physical ecommerce products — beauty, food and drink, home goods, fitness equipment, anything with a strong visual quality or a transformation to show." },
      { t: "How to produce it with AI UGC: you're using your AI avatar as the voice — the hook and CTA are still delivered in the talking head format — but the body of the video cuts to product footage, lifestyle imagery, or text overlays showing the key benefit." },
      { t: "For the talking head segments, keep them short. The hook should be 3 seconds to camera. Then cut to the product visuals for the body of the script. Then back to camera for the CTA. This pattern — face, product, face — mimics the structure of the best-performing real creator UGC and it works for the same reason: it keeps the eye engaged while the voice delivers the message." },
      { t: "Script-wise, the five-part structure still applies. But the solution and proof sections are where you let the visuals do more of the heavy lifting. 'Here's what it looks like in practice' — and then you show it, rather than describing it." },
      { d: true, t: "Show example on screen if available. If not, describe it: 'Imagine the hook delivered to camera, then 10 seconds of product footage with a voiceover line, then the avatar returns for the CTA.'" },
    ],
  },
  {
    title: 'SECTION 3 — LIFESTYLE UGC',
    timestamp: '4:30–6:15',
    blocks: [
      { t: "Lifestyle UGC is broader. Instead of focusing on the product itself, it focuses on the life the product enables — or the type of person who uses it." },
      { t: "This is aspirational content. The viewer watches it and thinks: 'that's who I want to be' or 'that's my life, or the life I want.' The product becomes part of an identity rather than just a solution to a problem." },
      { t: "Lifestyle UGC performs particularly well for fashion, fitness, food, travel, and wellness brands — anything where the experience of using the product matters as much as the product itself." },
      { t: "The script structure changes slightly here. The hook is still the most important line. But instead of leading with a problem, the best lifestyle hooks lead with aspiration or with a relatable situation." },
      { d: true, t: "Show example: 'This is what my morning looks like now. [lifestyle footage]. It took me six months to build this routine — and this is the one thing I added that made everything else easier.'" },
      { t: "Notice that the script evokes a feeling before it introduces the product. The viewer has already imagined themselves in that situation. When the product appears, it already belongs in the life they've been picturing." },
      { t: "For lifestyle content, the avatar style matters more than in other formats. Choose an avatar whose aesthetic matches the lifestyle you're evoking. Someone who looks like they actually live that life, not someone who looks like they're advertising it." },
    ],
  },
  {
    title: 'SECTION 4 — WHEN TO USE WHICH FORMAT',
    timestamp: '6:15–7:15',
    blocks: [
      { d: true, t: 'Back to camera. Practical summary.' },
      { t: "Here's a simple decision framework. If your product has a strong visual quality — something that looks better when shown than when described — lead with product-focused UGC in your test batch." },
      { t: "If your product is tied to a specific lifestyle or identity your customer aspires to — lead with lifestyle UGC." },
      { t: "If your product solves a clear, specific problem — lead with talking head, problem hook format." },
      { t: "In practice, you want all three in your creative library. Your 30-day calendar has the format rotation built in — you'll notice different content types scheduled across the month. That's intentional. You're building data across formats so you know which one your specific audience responds to most." },
      { t: "Once you know that, you weight your production toward the winner. But you don't stop producing the others entirely — you keep rotating to prevent fatigue and catch the moments when a different format lands better for a particular offer or season." },
    ],
  },
  {
    title: 'CLOSE',
    timestamp: '7:15–7:50',
    blocks: [
      { d: true, t: 'Energetic close — build momentum toward the final video.' },
      { t: "You now have three formats in your toolkit. Talking head, product-focused, and lifestyle. Each one serves a different purpose and works with a different kind of audience." },
      { t: "Video four is where it all comes together. We're going to look at how to actually run your AI UGC creatives as paid ads on Meta and TikTok — campaign structure, budget, what to watch, and how to know when something is working well enough to scale." },
      { t: "That's the video most people skip. Don't. See you there." },
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

export default function ProductLifestyleUGCPage() {
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
      <div className="px-6 pt-12 pb-10" style={{ background: 'linear-gradient(180deg, #0d1a15 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest mb-5">
            <Video className="w-3.5 h-3.5" /> Video 3 · Bonus
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Product & Lifestyle UGC —{' '}
            <span className="bg-yellow-400 text-black px-2 rounded-md">Beyond the Talking Head</span>
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 7–9 min</span>
            <span className="text-gray-600">·</span>
            <span>Format: Talking head with screen examples</span>
            <span className="text-gray-600">·</span>
            <span>Assets: 30-Day Calendar, Playbook Section 05</span>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-4">
            <p className="text-sm text-green-300 font-semibold mb-1">Goal</p>
            <p className="text-sm text-gray-400">Viewer understands when and how to use product and lifestyle formats alongside talking head.</p>
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
          <Link href="/app/course/meta-tiktok-campaigns" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all">
            Video 4 — Talking Head Ads for Meta & TikTok →
          </Link>
        </div>
      </div>

    </div>
  )
}
