'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, DollarSign, Target, Users, Mail, PhoneCall, Briefcase, Heart, TrendingUp, Home, ChevronRight, Search, Repeat } from 'lucide-react'

const sections = [
  {
    id: '01',
    title: 'The Opportunity',
    description: "Why brands are paying for AI UGC right now — and why most agencies aren't offering it yet.",
    icon: Target,
    color: 'from-red-500/20 to-red-600/10 border-red-500/30',
    iconColor: 'text-red-400',
    badge: null,
    content: [
      { type: 'intro', text: "Most businesses that run paid social advertising know they need video content. They know UGC-style ads outperform polished brand creative. They've seen the results. What they don't have is a reliable, affordable way to produce it consistently." },
      { type: 'text', text: "Real UGC creators are expensive ($150–$500 per video), slow (5–14 day turnaround), and inconsistent. A business running paid ads on Meta needs a minimum of 4–6 new creatives per month just to keep their campaigns fresh. At real-creator rates, that's $600–$3,000 a month in production costs before a single pound of ad spend. Most brands can't sustain that. So they either run the same tired creative until it dies, or they give up on video ads entirely." },
      { type: 'text', text: "AI UGC solves this completely. You can produce professional, platform-native video ads at a fraction of the cost and in a fraction of the time. The brand gets a consistent supply of fresh creatives. You get a recurring monthly fee for producing them." },
      { type: 'heading', text: 'The Market Gap' },
      { type: 'callout', text: "Most agencies are still selling social media management — captions, scheduling, community management. Almost none are offering AI UGC production as a standalone productised service. You are not competing with agencies. You are filling a gap they have not noticed yet." },
      { type: 'heading', text: 'Who Buys This Service' },
      { type: 'bullets', items: [
        'Ecommerce brands running Meta or TikTok ads who need a constant supply of fresh creatives',
        'SaaS companies and app businesses advertising on paid social with no in-house video capability',
        'Local service businesses (gyms, clinics, salons, restaurants) who know video works but can\'t afford creators',
        'Coaches and course creators who are selling on Meta and need content that looks authentic',
        'Marketing agencies who want to white-label AI UGC production for their own clients',
      ]},
      { type: 'heading', text: 'Best Starting Point' },
      { type: 'text', text: "When you're starting out, pick one niche and go deep. Ecommerce brands are the easiest entry point — they already understand paid social, they know their CPA targets, and they are used to paying for creative services. Start there." },
    ],
  },
  {
    id: '02',
    title: "What You're Actually Selling",
    description: 'How to position AI UGC as a premium service — not a cheap shortcut.',
    icon: DollarSign,
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
    iconColor: 'text-amber-400',
    badge: null,
    content: [
      { type: 'intro', text: "The biggest mistake new AI UGC service providers make is positioning themselves as a tool operator. 'I use Blobbi to make your videos.' That is a feature, not a service. Nobody pays a premium for features. They pay a premium for outcomes." },
      { type: 'callout', text: "You are not selling video production. You are selling creative volume, testing velocity, and reduced cost per acquisition. When a brand hires you, they get a systematic creative engine that produces more high-quality ad variants per month than they could ever afford from real creators — and the results show up in their ROAS." },
      { type: 'heading', text: 'How to Talk About It' },
      { type: 'list', items: [
        { title: 'Instead of saying', text: '"I create AI-generated UGC videos for your ads."' },
        { title: 'Say', text: '"I build a monthly creative testing system for your Meta and TikTok campaigns — fresh ad creatives every week, produced at a fraction of the cost of a real creator, designed to find your winning hook and scale it."' },
      ]},
      { type: 'heading', text: 'The Value Proposition in One Sentence' },
      { type: 'callout', text: "You give brands the creative volume they need to win on paid social — without the cost, the turnaround time, or the unpredictability of real UGC creators." },
      { type: 'heading', text: 'What Makes It Premium' },
      { type: 'list', items: [
        { title: 'Creative strategy included', text: "You don't just produce videos — you advise on hook angles, content types, and testing structure. Clients pay more for thinking, not just doing." },
        { title: 'Performance framing', text: "You track what's working. Every month you report on hook rates, CTR, and CPA alongside the creatives you produced. This makes the service measurable and accountable." },
        { title: 'Speed and consistency', text: "A real creator takes 5–14 days per video. You produce an entire month's creative in a week. Consistency alone is worth the retainer." },
        { title: 'No creator management', text: "The client doesn't have to brief, manage, chase, or deal with creator egos. You handle everything. That relief has real value." },
      ]},
    ],
  },
  {
    id: '03',
    title: 'Service Packages and Pricing',
    description: 'Three tiers that work — what to include and what to charge.',
    icon: Briefcase,
    color: 'from-green-500/20 to-green-600/10 border-green-500/30',
    iconColor: 'text-green-400',
    badge: null,
    content: [
      { type: 'intro', text: "Package your service in three tiers. Three tiers gives clients a choice and anchors the middle option as the obvious value pick. Most clients will choose the middle tier. Price accordingly." },
      { type: 'package', tier: 'STARTER', price: '$500/month', tag: 'Best for: brands testing AI UGC for the first time or with smaller ad budgets', items: [
        '4–8 AI UGC creatives per month (2 per week)',
        '2 hook variants tested per creative batch',
        'One avatar style, one niche',
        '9:16 format for Reels and TikTok',
        'Captions included',
        'Monthly performance summary (hook rate, CTR)',
        'Delivery via Google Drive or Dropbox',
      ]},
      { type: 'package', tier: 'GROWTH', price: '$1,000/month', tag: 'Best for: brands actively running paid social who need consistent creative volume', highlight: true, items: [
        '16 AI UGC creatives per month (4 per week)',
        '3–4 hook variants tested per batch',
        'Up to 2 avatar styles',
        '9:16 and 4:5 formats included',
        'Captions included',
        'Monthly strategy call (30 minutes)',
        'Bi-weekly performance report with recommendations',
        'Creative brief review before production each month',
      ]},
      { type: 'package', tier: 'SCALE', price: '$2,000/month', tag: 'Best for: brands spending $5,000+ per month on paid social who need a creative partner', items: [
        '30+ AI UGC creatives per month',
        'Full hook testing framework managed for the client',
        'Multiple avatar styles and formats',
        'All aspect ratios: 9:16, 4:5, 1:1',
        'Weekly performance reporting with scaling recommendations',
        'Fortnightly strategy call',
        'Creative direction and script writing included',
        'Priority turnaround — new creatives within 48 hours of brief',
      ]},
      { type: 'heading', text: 'One-Time Project Pricing' },
      { type: 'callout', text: "If a client isn't ready for a monthly retainer, offer a starter project: a batch of 10 AI UGC creatives for a flat $750. This gets them in, gives them results to look at, and makes the retainer conversation much easier in week four." },
      { type: 'heading', text: 'White-Label Pricing (for Agencies)' },
      { type: 'text', text: "If you're selling to other agencies who want to offer AI UGC to their clients under their own brand, price it differently. You are removing a production headache from them and they will mark it up. Charge a flat per-creative rate — $40–$70 per finished video — and let them package it however they want. Minimum order of 10 creatives per month to make it worth your time." },
    ],
  },
  {
    id: '04',
    title: 'How to Find Your First Clients',
    description: 'Where to look, who to target, and how to get in front of them.',
    icon: Search,
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    iconColor: 'text-blue-400',
    badge: null,
    content: [
      { type: 'intro', text: "Your first three clients will almost certainly come from your existing network or from direct outreach — not from inbound marketing. Accept that, start there, and build the case studies that make inbound possible later." },
      { type: 'heading', text: 'The Four Best Places to Find Clients' },
      { type: 'list', items: [
        { title: 'Meta Ad Library', text: "Go to facebook.com/ads/library. Search for any brand in your target niche. If they're running video ads and those ads look polished and overproduced — they are a perfect prospect. They're already spending on paid social and already know video works. Find 20 of these brands per week and add them to your outreach list." },
        { title: 'TikTok Creative Centre', text: "Search for brands in your niche in the TikTok Creative Centre (ads.tiktok.com/business/creativecenter). Look for brands running text-only or static creatives on a platform that rewards video. These are brands who know they should be doing video but haven't worked out how." },
        { title: 'LinkedIn', text: "Search for 'ecommerce founder', 'DTC brand', 'marketing manager', or 'paid social manager' in your target geography. Connect, engage with their content for a week, then send a DM. LinkedIn warm outreach converts significantly better than cold email for service businesses." },
        { title: 'Your Existing Network', text: "Tell five people you know about what you're doing. 'I've been learning how to produce AI UGC ads and I'm looking for a brand to work with on a trial basis. Do you know anyone running paid social who might want to try it?' Referrals from people who know you convert faster than any cold outreach." },
      ]},
      { type: 'heading', text: 'Building Your Prospect List' },
      { type: 'text', text: "Before you start outreach, build a list of at least 30 prospects. For each one, note:" },
      { type: 'bullets', items: [
        'Brand name and website',
        'Where they are currently running ads (Meta, TikTok, both)',
        'What their current ad creative looks like (polished brand, static, UGC-style)',
        'Who the right contact is (founder, CMO, marketing manager)',
        'Their LinkedIn profile or email address',
        'One specific observation about their content you can reference in your outreach',
      ]},
      { type: 'callout', text: "The single thing that separates good outreach from ignored outreach is specificity. 'I noticed you're running [X type of creative] on Meta and wondered if you'd considered testing UGC-style video alongside it' will outperform any generic pitch every single time." },
    ],
  },
  {
    id: '05',
    title: 'Cold Outreach Templates',
    description: 'Email and DM scripts that get replies — copy, customise, send.',
    icon: Mail,
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    iconColor: 'text-purple-400',
    badge: null,
    content: [
      { type: 'intro', text: "Use these templates as a starting point. The structure is proven — but the specific observation in each message needs to be genuine and researched. Personalisation is what gets replies. A template without personalisation is just spam." },
      { type: 'heading', text: 'Cold Email Template' },
      { type: 'template', label: 'Subject: Quick question about your Meta ads — [Brand Name]', text: `Hi [First Name],

I was looking at [Brand Name]'s ads on the Meta Ad Library and noticed you're running [specific observation — e.g. 'mainly polished product videos' / 'mostly static image ads' / 'a mix of branded content but no UGC-style video'].

I work with ecommerce brands to produce AI UGC video ads — the kind that look like genuine creator content but are produced in a fraction of the time and cost. Most of my clients see a meaningful drop in CPC within the first 30 days of testing them alongside their existing creative.

I'd love to put together a quick example for [Brand Name] — no cost, just to show you what's possible with your product. Would that be useful?

[Your name]
[Your website or portfolio link]` },
      { type: 'heading', text: 'LinkedIn / Instagram DM Template' },
      { type: 'template', label: 'DM — keep it short, one observation, one question', text: `Hey [First Name],

Been following [Brand Name] for a while — love what you're doing with [specific product/campaign or content style].

I noticed you're running ads on Meta but mostly [static/branded/polished] creative. Have you tested UGC-style video alongside it? I produce AI UGC ads for ecom brands and the results on cold traffic have been consistently strong.

Happy to put together a quick example for your product at no cost if you'd like to see what it could look like. Just let me know.

[Your name]` },
      { type: 'heading', text: 'Follow-Up Email' },
      { type: 'text', text: 'Send 4–5 days after first email if no reply.' },
      { type: 'template', label: 'Subject: Re: Quick question about your Meta ads — [Brand Name]', text: `Hi [First Name],

Just circling back on this. Completely understand if the timing isn't right.

For context — I recently worked with a [similar brand type] who was running the same style of creative on Meta for over a year. We introduced AI UGC video alongside it and their cost per purchase dropped by around 35% in the first month.

If it's not a priority right now, no problem at all. But if you'd like to see what that could look like for [Brand Name], I'm happy to put together a free example.

[Your name]` },
      { type: 'callout', text: "Send a maximum of two follow-ups per prospect. After two unanswered messages, move on. Chasing beyond this damages your reputation and wastes time better spent on new prospects." },
    ],
  },
  {
    id: '06',
    title: 'The Discovery Call',
    description: 'What to say, what to ask, and how to close without being pushy.',
    icon: PhoneCall,
    color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
    iconColor: 'text-cyan-400',
    badge: null,
    content: [
      { type: 'intro', text: "A discovery call for an AI UGC service should run 20–30 minutes. Your goal is not to pitch — it's to understand their situation well enough to present an offer that feels obvious. Ask the right questions, listen properly, then connect what you heard to what you do." },
      { type: 'heading', text: 'The Five Questions to Ask on Every Call' },
      { type: 'list', items: [
        { title: '1 — What does your current paid social creative process look like?', text: "This tells you how much pain they're in. If they say 'we brief creators and wait two weeks,' you know the speed and cost argument will land. If they say 'we make everything in-house,' you know to focus on volume and testing." },
        { title: '2 — How many new creatives are you producing per month right now?', text: "Most brands will say 2–4. The right answer for a brand spending serious money on paid social is 10–20+. The gap between what they're doing and what they should be doing is your opening." },
        { title: '3 — What\'s your current cost per click or cost per acquisition on your best campaigns?', text: "This anchors the conversation in business outcomes. If they don't know these numbers, they need someone who cares about performance — that's you." },
        { title: '4 — Have you tested UGC-style video ads before? What happened?', text: "If they have — great, you can talk about improving what worked. If they haven't — this is the opportunity to introduce it as something that's already proven for brands like theirs." },
        { title: '5 — What would it mean for the business if you could cut your cost per acquisition by 20–30%?', text: "This is the closing question. Let them answer it. The value they articulate in their own words is far more powerful than anything you could say." },
      ]},
      { type: 'heading', text: 'The Close' },
      { type: 'text', text: "After the five questions, summarise what you heard and connect it directly to the offer:" },
      { type: 'template', label: 'Closing Script', text: `"Based on what you've described — [2 creatives a month / high CPC / no UGC testing] — I think the Growth package would be the right starting point. That's 16 new AI UGC creatives per month, two hook variants per batch, and a monthly call where we review what's working and adjust. We'd be testing against your current best performer from week one. The investment is $1,000 a month and most clients see the production cost paid back within 60 days through lower CPAs. Does that feel like the right fit, or would you rather start with the Starter?"` },
    ],
  },
  {
    id: '07',
    title: 'Delivering the Service',
    description: 'Your monthly workflow — what to do, when to do it, and how to do it efficiently.',
    icon: Briefcase,
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    iconColor: 'text-orange-400',
    badge: null,
    content: [
      { type: 'intro', text: "Professional delivery is what separates a one-month client from a twelve-month client. The product needs to arrive on time, look polished, and come with enough context that the client can use it without coming back to you with ten questions. Build the system once and every client fits into it." },
      { type: 'heading', text: 'The Monthly Delivery Cycle' },
      { type: 'week', label: 'Week 1 — Brief and Production', items: [
        'Send the client a one-page brief form: any new products to feature, upcoming promotions, any hooks or angles they want to test, and any creatives from last month that performed well.',
        'Write scripts for the month\'s batch using the Script Bank as your starting point. Adapt to the client\'s product and audience.',
        'Produce all creatives in Blobbi. Aim to have the full month\'s batch done by day 5.',
        'Quality check: watch every creative in full. Hook in the first 3 seconds, captions accurate, CTA clear, correct aspect ratios.',
      ]},
      { type: 'week', label: 'Week 2 — Delivery', items: [
        'Deliver all creatives via a shared Google Drive folder, organised by: hook type, avatar style, and recommended platform.',
        'Include a one-page delivery note with: the hook angle used for each creative, the recommended placement, and any suggested A/B tests to run.',
        'Send a brief Loom video walkthrough (5 minutes) explaining the batch — what you made, why, and how you\'d suggest testing it.',
      ]},
      { type: 'week', label: 'Week 3 — Performance Check-In', items: [
        'Send a mid-month message asking for early metrics: hook rate, CTR, any early CPA data.',
        'If a creative is fatiguing or underperforming, offer to produce a replacement — this kind of proactive service is what gets referrals.',
        'Note what\'s working for the end-of-month report.',
      ]},
      { type: 'week', label: 'Week 4 — Report and Renewal', items: [
        'Produce a one-page monthly report: creatives produced, top performers by hook rate and CTR, key learnings, and recommended focus for next month.',
        'Send the report before the monthly call.',
        'On the call, anchor the next month\'s brief and confirm renewal. If they\'re on Starter, this is your opportunity to present Growth.',
      ]},
      { type: 'heading', text: 'Client Delivery Folder Structure' },
      { type: 'template', label: 'Folder structure', text: `/ [Client Name] — [Month Year]
  / 01_Creatives
      — [Hook type]_[Avatar]_[Format].mp4
  / 02_Delivery_Note.pdf
  / 03_Monthly_Report.pdf` },
    ],
  },
  {
    id: '08',
    title: 'Keeping Clients',
    description: 'How to get renewals, upsells, and referrals from every client you work with.',
    icon: Heart,
    color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
    iconColor: 'text-pink-400',
    badge: null,
    content: [
      { type: 'intro', text: "Acquiring a new client costs far more time and energy than keeping an existing one. The economics of a retainer service are built on retention. One client who stays for twelve months is worth twelve times more than one who cancels after month one." },
      { type: 'heading', text: 'The Three Things That Keep Clients' },
      { type: 'list', items: [
        { title: 'Results', text: "The most reliable retention mechanism is performance. If your creatives are genuinely reducing their CPA and improving their hook rates, no client will leave. This is why you track metrics and report on them monthly — not to cover yourself, but because it makes the value of what you do visible." },
        { title: 'Speed', text: "Deliver faster than they expect. If they ask for a replacement creative, turn it around in 24 hours. If they have a promotion coming up, produce the assets before they ask. Clients who feel like they're always waiting are clients who start wondering if the retainer is worth it." },
        { title: 'Proactivity', text: "'I noticed Black Friday is six weeks away — here are three hook angles I think could work well for your campaign' is the message that cements a client relationship. It shows you're thinking about their business, not just producing videos." },
      ]},
      { type: 'heading', text: 'Upselling Existing Clients' },
      { type: 'text', text: "The easiest sale you will ever make is to a client who already trusts you. Every client on Starter should be moving to Growth within three months if the results are there. Every client on Growth should be hearing about Scale by month four." },
      { type: 'callout', text: "The upsell conversation is not a hard sell. It's a natural progression: 'Based on what we've learned about your audience over the last three months, I think we could get significantly better results if we increased the creative volume. Here's what Growth would look like for your account.'" },
      { type: 'heading', text: 'Getting Referrals' },
      { type: 'bullets', items: [
        "Ask for them explicitly — not vaguely. 'Do you know any other founders in your network who are running Meta ads and struggling with creative costs?' is a real question that gets real answers.",
        'Ask at the right moment — after a particularly strong month, after a creative hits a new CPA low, after they thank you for something.',
        "Offer a referral incentive — one month free for any paying client they send your way. It doesn't cost you cash and it makes the ask feel generous.",
      ]},
    ],
  },
  {
    id: '09',
    title: 'Scaling',
    description: 'Going from 1 client to 10 — what changes and what doesn\'t.',
    icon: TrendingUp,
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
    iconColor: 'text-emerald-400',
    badge: null,
    content: [
      { type: 'intro', text: "One client at $1,000 a month is a meaningful side income. Five clients is $5,000 a month. Ten clients is $10,000 a month. The work does not scale linearly — a well-systemised AI UGC service can handle ten Growth clients in roughly the same time a poorly systemised one handles three." },
      { type: 'heading', text: 'Revenue at Each Stage' },
      { type: 'table', headers: ['Setup', 'Revenue', 'Time', 'Effective Rate'], rows: [
        ['1 client (Starter)', '$500/month', '~5 hrs/month', '$100/hr'],
        ['3 clients (mixed)', '$2,500/month', '~15 hrs/month', '$167/hr'],
        ['5 clients (Growth avg)', '$5,000/month', '~25 hrs/month', '$200/hr'],
        ['10 clients (Growth avg)', '$10,000/month', '~45 hrs/month', '$222/hr'],
      ]},
      { type: 'heading', text: 'What to Systemise First' },
      { type: 'list', items: [
        { title: 'Brief intake form', text: "Use Typeform or Google Forms. Same 8 questions every month, every client. Stops you chasing information by email." },
        { title: 'Script templates', text: "Build a swipe file of your best-performing scripts per niche. Month two of any client, you are adapting — not starting from scratch." },
        { title: 'Delivery folder template', text: "Create a master Drive folder template you duplicate for each client each month. Pre-labelled, pre-structured. Takes 60 seconds to set up." },
        { title: 'Monthly report template', text: "Build a Google Slides or Notion template for the monthly report. Drop in the numbers and a few observations. Done in 20 minutes." },
        { title: 'Client communication rhythm', text: "Same touchpoints every month — delivery message, mid-month check-in, end of month report and renewal confirmation. Put them in your calendar and treat them as non-negotiable." },
      ]},
      { type: 'heading', text: 'The 10-Client Milestone' },
      { type: 'callout', text: "At 10 clients on the Growth package, you are generating $10,000 a month and spending approximately 45 hours a month on delivery. That is a full-time income on part-time hours. At that point, you have two choices: cap at 10 and enjoy the lifestyle, or hire a production assistant, raise your prices, and build toward 20. Both are good answers." },
    ],
  },
]

// ── Renderers ──────────────────────────────────────────────────────────────

function Block({ block }) {
  switch (block.type) {
    case 'intro':
      return <p className="text-gray-300 text-base leading-relaxed border-l-2 border-white/20 pl-4 italic">{block.text}</p>
    case 'heading':
      return <h3 className="text-white font-black text-lg mt-8 mb-2">{block.text}</h3>
    case 'text':
      return <p className="text-gray-300 leading-relaxed">{block.text}</p>
    case 'callout':
      return (
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4">
          <p className="text-gray-200 leading-relaxed text-sm">{block.text}</p>
        </div>
      )
    case 'bullets':
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
              <span className="text-green-400 mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      )
    case 'list':
      return (
        <div className="space-y-4">
          {block.items.map((item, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/8 rounded-xl p-4">
              <p className="font-bold text-white text-sm mb-1">{item.title}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      )
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-3 text-gray-400 font-bold text-xs uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-4 py-3 ${j === 0 ? 'text-white font-semibold' : 'text-gray-400'}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'package':
      return (
        <div className={`rounded-2xl border p-6 mb-4 ${block.highlight ? 'border-green-500/40 bg-green-500/5' : 'border-white/10 bg-white/[0.02]'}`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-black uppercase tracking-widest ${block.highlight ? 'text-green-400' : 'text-gray-400'}`}>{block.tier}</span>
            <span className={`text-2xl font-black ${block.highlight ? 'text-green-400' : 'text-white'}`}>{block.price}</span>
          </div>
          <ul className="space-y-2 mb-4">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                <span className={`shrink-0 mt-0.5 ${block.highlight ? 'text-green-400' : 'text-gray-500'}`}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 italic">{block.tag}</p>
        </div>
      )
    case 'template':
      return (
        <div className="rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden">
          {block.label && <div className="px-4 py-2 bg-white/5 border-b border-white/10 text-xs text-gray-500 font-mono">{block.label}</div>}
          <pre className="px-4 py-4 text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed overflow-x-auto">{block.text}</pre>
        </div>
      )
    case 'week':
      return (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
            <p className="font-bold text-white text-sm">{block.label}</p>
          </div>
          <ul className="space-y-2 pl-5">
            {block.items.map((item, i) => (
              <li key={i} className="text-sm text-gray-400 leading-relaxed list-disc">{item}</li>
            ))}
          </ul>
        </div>
      )
    default:
      return null
  }
}

// ── Section reader ─────────────────────────────────────────────────────────

function SectionReader({ section, index, total, onBack, onNext, onPrev }) {
  const Icon = section.icon
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to sections
      </button>

      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold mb-4 ${section.iconColor} border-current bg-current/10`}>
        Section {section.id} of {String(total).padStart(2, '0')}
      </div>
      <h2 className="text-3xl font-black text-white mb-2">{section.title}</h2>
      <p className="text-gray-400 mb-10">{section.description}</p>

      <div className="space-y-5">
        {section.content.map((block, i) => <Block key={i} block={block} />)}
      </div>

      <div className="flex items-center justify-between mt-14 pt-8 border-t border-white/10">
        <button
          onClick={onPrev}
          disabled={index === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-sm font-semibold text-gray-400 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        {index < total - 1 ? (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all"
          >
            Next Section <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-bold transition-all"
          >
            Complete ✓
          </button>
        )}
      </div>
    </div>
  )
}

// ── Hub view ───────────────────────────────────────────────────────────────

function Hub({ onSelect }) {
  return (
    <>
      <div className="px-6 pt-12 pb-10" style={{ background: 'linear-gradient(180deg, #1a0808 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest mb-5">
            <DollarSign className="w-3.5 h-3.5" /> Module 8
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            The AI UGC <span className="bg-yellow-400 text-black px-2 rounded-md">Agency Blueprint</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            How to sell AI UGC content to brands as a productised monthly retainer service.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { val: '$500–$2k', label: 'Per Client / Month' },
              { val: '5–10 hrs', label: 'Per Client / Month' },
              { val: '1 tool', label: 'Blobbi — ready' },
            ].map(({ val, label }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl py-3 px-2">
                <p className="text-lg font-black text-white">{val}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <button key={section.id} onClick={() => onSelect(i)} className={`p-6 bg-gradient-to-br ${section.color} border rounded-2xl text-left hover:scale-[1.02] transition-all group cursor-pointer`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${section.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Section {section.id}</span>
                </div>
                <h3 className="font-black text-white text-lg leading-tight mb-2">{section.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{section.description}</p>
                <div className={`text-sm font-semibold ${section.iconColor} group-hover:translate-x-1 transition-transform`}>
                  Read Section →
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function AgencyBlueprintPage() {
  const [activeIndex, setActiveIndex] = useState(null)

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

      {activeIndex !== null ? (
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-24">
          <SectionReader
            section={sections[activeIndex]}
            index={activeIndex}
            total={sections.length}
            onBack={() => setActiveIndex(null)}
            onNext={() => setActiveIndex(i => Math.min(i + 1, sections.length - 1))}
            onPrev={() => setActiveIndex(i => Math.max(i - 1, 0))}
          />
        </div>
      ) : (
        <Hub onSelect={setActiveIndex} />
      )}

    </div>
  )
}
