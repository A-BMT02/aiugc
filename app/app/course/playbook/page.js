'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BookOpen, BarChart2, Zap, TrendingUp, Share2, Calendar, ChevronRight, Home } from 'lucide-react'

const sections = [
  {
    id: '01',
    title: 'Why AI UGC Works — The Psychology Behind It',
    description: 'Understand the trust signals, platform dynamics, and cost equation that make AI UGC outperform traditional creative.',
    icon: BookOpen,
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    iconColor: 'text-purple-400',
    badge: null,
    content: [
      {
        type: 'intro',
        text: "Before you produce your first AI UGC creative, it helps to understand why this format converts — because it isn't magic, and it isn't luck. There are specific psychological mechanisms at play, and knowing them will make you a far better creative director.",
      },
      {
        type: 'heading',
        text: 'The UGC Trust Signal',
      },
      {
        type: 'text',
        text: "Traditional polished ad creative signals 'brand.' The moment someone sees a high-production video with slick transitions and a voiceover, their brain categorises it as an advert and engagement drops. UGC — content that looks like it was filmed by a real person on their phone — bypasses that filter entirely. It reads as a recommendation, not a sales pitch.",
      },
      {
        type: 'text',
        text: "AI UGC mimics this format precisely. An AI avatar speaking directly to camera, in a natural setting, with a conversational script, triggers the same trust response as a genuine creator video. The platform algorithms treat it the same way too — it competes in the same creative auction as organic content, which means lower CPMs and better delivery.",
      },
      {
        type: 'callout',
        text: "Your audience isn't analysing whether the creator is AI-generated. They're responding to the format, the hook, and the message. AI UGC delivers all three at a fraction of the cost of hiring a real creator.",
      },
      {
        type: 'heading',
        text: 'Why It Outperforms Brand Creative on Meta & TikTok',
      },
      {
        type: 'list',
        items: [
          { title: 'Native format', text: "UGC-style video is the native language of Reels, TikTok, and Stories. It doesn't look like an ad because it follows the same visual grammar as organic content." },
          { title: 'Hook performance', text: 'The first 2–3 seconds of a UGC ad — someone talking directly to camera with a specific hook — consistently outperforms branded intros in thumb-stop rate.' },
          { title: 'Algorithm preference', text: 'Meta and TikTok reward content that keeps users on the platform. UGC-style ads generate higher watch time, which signals quality to the algorithm and reduces CPCs.' },
          { title: 'Social proof framing', text: "A person speaking about a product feels like a recommendation. The viewer's brain processes it similarly to a friend telling them about something — not a company advertising at them." },
          { title: 'Volume advantage', text: 'With AI UGC you can produce 10, 20, 50 variations of a creative in the time it takes to brief a single real creator. More volume means more data and faster optimisation.' },
        ],
      },
      {
        type: 'heading',
        text: 'The Cost Equation',
      },
      {
        type: 'text',
        text: "Here's the real reason brands are switching to AI UGC at scale. A single UGC creator video — brief, filming, editing, revisions — typically costs between $150 and $500 per deliverable. For a proper creative testing framework, you need a minimum of 10–15 creative variants. That's $1,500–$7,500 before you've run a single dollar of spend.",
      },
      {
        type: 'table',
        headers: ['', 'Real Creator UGC', 'AI UGC Tool'],
        rows: [
          ['Cost per video', '$150–$500', 'Included in subscription'],
          ['Turnaround time', '5–14 days', 'Minutes'],
          ['Revision rounds', '1–2 (extra cost)', 'Unlimited'],
          ['10-creative test batch', '$1,500–$5,000+', 'Same monthly cost'],
          ['Scale to 50 variants', '$7,500–$25,000', 'No additional cost'],
          ['Rights & exclusivity', 'Negotiated separately', 'Full ownership'],
        ],
      },
      {
        type: 'callout',
        text: "AI UGC doesn't just reduce your production costs — it changes how fast you can test, learn, and scale. The brands winning on paid social in 2026 are the ones producing the most creative volume.",
      },
    ],
  },
  {
    id: '02',
    title: 'Briefing & Producing AI UGC Ads',
    description: 'Hook formulas, script structures, and avatar selection strategies to get high-converting output every time.',
    icon: Zap,
    color: 'from-green-500/20 to-green-600/10 border-green-500/30',
    iconColor: 'text-green-400',
    badge: null,
    content: [
      {
        type: 'intro',
        text: "Getting great output from AI UGC starts before you open any tool. The quality of your AI UGC is almost entirely determined by the quality of your brief — specifically, your hook, your script, and your avatar selection.",
      },
      {
        type: 'heading',
        text: 'Step 1 — Know Your Audience Before You Script Anything',
      },
      {
        type: 'text',
        text: "The single most common mistake brands make with UGC is writing scripts that describe the product rather than speaking directly to the viewer's problem. Before you script anything, you need to be crystal clear on three things:",
      },
      {
        type: 'bullets',
        items: [
          'Who is this person? (Age, lifestyle, what they care about)',
          'What problem are they experiencing that your product solves?',
          'What objection do they have that stopping them from buying?',
        ],
      },
      {
        type: 'heading',
        text: 'Step 2 — Write a Hook That Stops the Scroll',
      },
      {
        type: 'text',
        text: 'The first 2–3 seconds of your AI UGC ad determines everything. Here are the seven hook formats that consistently perform:',
      },
      {
        type: 'hooks',
        items: [
          { name: 'The Problem Hook', formula: '"If you\'re struggling with [problem], this is for you."', note: "Calls out the viewer's pain directly. Works best for problem-aware audiences." },
          { name: 'The Curiosity Hook', formula: '"I didn\'t believe this would work until I tried it myself."', note: 'Creates a knowledge gap the viewer feels compelled to close.' },
          { name: 'The Result Hook', formula: '"I went from [bad situation] to [good result] in just [timeframe]."', note: 'Leads with the transformation. Works well for before/after product stories.' },
          { name: 'The Contrarian Hook', formula: '"Stop doing [common thing]. Here\'s what actually works."', note: 'Pattern interrupt. Gets attention by challenging an assumption the viewer holds.' },
          { name: 'The Social Proof Hook', formula: '"Over [X] people have used this to [result]."', note: 'Leverages social validation as the attention mechanism.' },
          { name: 'The How-To Hook', formula: '"Here\'s exactly how I [achieved result] without [common barrier]."', note: 'Positions the video as useful, educational content rather than an ad.' },
          { name: 'The Direct CTA Hook', formula: '"If you want [specific result], keep watching."', note: 'Simple and works well for warm audiences already familiar with the category.' },
        ],
      },
      {
        type: 'heading',
        text: 'Step 3 — Script Structure',
      },
      {
        type: 'script-structure',
        items: [
          { time: '0–3 sec', label: 'Hook', text: 'Your scroll-stopping opening line. One sentence. No preamble.' },
          { time: '3–15 sec', label: 'Problem + Empathy', text: "Acknowledge the viewer's pain. Make them feel understood before you introduce anything." },
          { time: '15–35 sec', label: 'Solution + Product', text: "Introduce the product as the natural answer to the problem. Focus on what it does for them, not what it is." },
          { time: '35–45 sec', label: 'Proof', text: 'One quick proof point — a result, a stat, a social proof number. Keeps the claim credible.' },
          { time: '45–60 sec', label: 'CTA', text: "One clear instruction. 'Tap the link below', 'Shop now', 'Try it free'. Never give them two options." },
        ],
      },
      {
        type: 'heading',
        text: 'Step 4 — Avatar Selection',
      },
      {
        type: 'bullets',
        items: [
          'Match the demographic: Age, presentation, and energy should align with your target customer.',
          'Match the tone: High-energy avatars work well for impulse purchases. Calm avatars work better for considered purchases.',
          'Test across avatars: Run the same script across 2–3 avatar styles and let the data decide.',
          'Consistency breeds familiarity: Once you find an avatar that performs, stick with it.',
        ],
      },
      {
        type: 'checklist',
        title: 'AI UGC Production Checklist',
        items: [
          'Hook is in the first 3 seconds — no intro, no preamble',
          'Script is under 60 seconds for Meta, under 45 for TikTok',
          'One CTA only — specific and action-oriented',
          'Avatar matches the target demographic and product tone',
          'Captions are enabled — 85% of social video is watched without sound',
          'Aspect ratio is 9:16 for Reels/TikTok, 1:1 or 4:5 for Meta feed',
        ],
      },
    ],
  },
  {
    id: '03',
    title: 'Creative Testing Framework',
    description: 'The batch testing method, what variables to test and in what order, and key metrics to track.',
    icon: BarChart2,
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    iconColor: 'text-orange-400',
    badge: null,
    content: [
      {
        type: 'intro',
        text: "AI UGC gives you a volume advantage that real-creator brands simply cannot match. But volume without structure is just noise. This section gives you the framework to test systematically so every creative you produce teaches you something useful about your audience.",
      },
      {
        type: 'callout',
        text: "Most brands focus on targeting, bidding, and campaign structure. But on Meta and TikTok in 2026, the algorithm does most of that work for you. The biggest lever you have is creative. The brand with the best creative wins — regardless of budget.",
      },
      {
        type: 'heading',
        text: 'The Batch Testing Method',
      },
      {
        type: 'list',
        items: [
          { title: 'Batch size', text: 'Produce a minimum of 6 creatives per test round. Ideally 10–15 if budget allows.' },
          { title: 'One variable at a time', text: 'Isolate what you\'re testing. In round one, test hooks only — keep the script body identical.' },
          { title: 'Same budget per creative', text: "Give each creative an equal budget at launch. Don't manually favour one — let performance determine the winner." },
          { title: 'Decision threshold', text: 'Review performance after 2,000 impressions minimum per creative, or 72 hours — whichever comes first.' },
          { title: 'Kill or scale', text: 'Any creative hitting your target CPC/CPA gets additional budget. Everything else is paused.' },
        ],
      },
      {
        type: 'heading',
        text: 'What to Test and in What Order',
      },
      {
        type: 'rounds',
        items: [
          { round: '1', title: 'Hook Variations', text: 'Produce 6–10 creatives with different hooks but identical scripts. This tells you which opening line resonates most.' },
          { round: '2', title: 'Script Structure', text: 'Take your 2–3 winning hooks. Now test different script bodies — vary the problem framing, proof point, or CTA language.' },
          { round: '3', title: 'Avatar Variations', text: 'Take your winning hook + script combination. Run it across 3–4 different AI avatar styles.' },
          { round: '4', title: 'Format Variations', text: 'Test the same script in different formats — talking head vs. text overlay vs. lifestyle footage with voiceover.' },
          { round: '5', title: 'Scaling & Iteration', text: 'Combine all winning elements. Scale the best performer and begin your next batch cycle with fresh hook ideas.' },
        ],
      },
      {
        type: 'heading',
        text: 'Key Metrics to Track',
      },
      {
        type: 'metrics',
        items: [
          { metric: 'Hook Rate (3-sec view %)', benchmark: '30%+', text: 'The percentage of people who watch past the 3-second mark. If this is low, your hook isn\'t working.' },
          { metric: 'Thumb-Stop Rate', benchmark: '—', text: 'Impressions that result in a pause or engagement. Tells you whether the visual is stopping the scroll.' },
          { metric: 'Video Completion Rate', benchmark: '75%+', text: 'The percentage of viewers who watch to 75%+. Low completion suggests the script is losing them.' },
          { metric: 'Click-Through Rate (CTR)', benchmark: '1%+', text: 'The percentage clicking through to your landing page. Benchmark: 1%+ for cold traffic on Meta.' },
          { metric: 'Cost Per Click / CPA', benchmark: 'vs target', text: 'The bottom-line measure of creative efficiency. Higher CTR + lower CPC = more budget.' },
        ],
      },
    ],
  },
  {
    id: '04',
    title: 'Scaling Winning Creatives on Meta & TikTok',
    description: 'Campaign structures, budget scaling rules, creative refresh cycles, and how to spot and fix creative fatigue.',
    icon: TrendingUp,
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    iconColor: 'text-blue-400',
    badge: null,
    content: [
      {
        type: 'intro',
        text: "Once your testing framework has identified a winning creative, the next challenge is scaling it without killing its performance.",
      },
      {
        type: 'heading',
        text: 'Scaling on Meta (Facebook & Instagram)',
      },
      {
        type: 'bullets',
        items: [
          'One campaign, multiple ad sets: Group AI UGC creatives by hook type or audience intent. Let Meta find the right people.',
          'Minimum 4–6 active creatives per ad set: Meta needs creative variety to optimise delivery.',
          "Don't touch it for 72 hours: Every time you edit a campaign during learning phase, you reset the algorithm.",
          'Budget scaling rule: Increase daily budget by no more than 20–25% every 48–72 hours on winning ad sets.',
          'Creative refresh cycle: When average frequency exceeds 3–4 per week, rotate in fresh AI UGC creatives.',
        ],
      },
      {
        type: 'heading',
        text: 'Scaling on TikTok',
      },
      {
        type: 'bullets',
        items: [
          "Use TikTok's Smart Performance Campaign: Feed it 6–10 AI UGC creatives and let it optimise.",
          'Refresh creatives weekly: TikTok audiences burn through content faster. Introduce 3–5 new creatives per week.',
          "Follow TikTok sound trends: Adding trending audio significantly improves organic reach even on paid posts.",
          "Engage the comment section: Seed a question in your CTA — 'Comment below if this is you'.",
          'Spark Ads: Boost best-performing organic posts as Spark Ads — they carry over organic engagement metrics.',
        ],
      },
      {
        type: 'heading',
        text: 'Creative Fatigue — How to Spot It and Fix It',
      },
      {
        type: 'list',
        items: [
          { title: 'Signs of fatigue', text: 'CTR dropping week-over-week, frequency rising above 3–4 in 7 days, CPC/CPA increasing without targeting changes.' },
          { title: 'New hook angle', text: 'Produce a fresh batch using a new hook angle — same product, different opening frame.' },
          { title: 'Switch the avatar', text: 'Keep the winning script, change the face. New face, proven copy.' },
          { title: 'Recut the format', text: 'Recut the existing winning script into a shorter format — 60-second ad cut to 15 seconds for Stories.' },
        ],
      },
      {
        type: 'callout',
        text: "Never scale spend faster than you scale creative. If you're doubling your budget, you need to be doubling your creative output to match. AI UGC makes this possible at a cost that real-creator production never could.",
      },
    ],
  },
  {
    id: '05',
    title: 'Organic Use Cases — Beyond Paid Ads',
    description: 'How to use AI UGC for organic TikTok & Reels, product page conversion, email campaigns, and building a content library.',
    icon: Share2,
    color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
    iconColor: 'text-pink-400',
    badge: 'BONUS',
    content: [
      {
        type: 'intro',
        text: "AI UGC isn't only a paid social tool. The same content that powers your Meta and TikTok campaigns can also serve as the backbone of an organic social strategy.",
      },
      {
        type: 'heading',
        text: 'TikTok & Instagram Reels — Organic Posting',
      },
      {
        type: 'bullets',
        items: [
          'Post 3–5 times per week: Consistency matters more than perfection. Regular cadence signals to the algorithm your account is active.',
          'Use the hook structures from the Script Bank: The same hooks that work in paid ads work organically.',
          'Repurpose ad creatives as organic posts: Winning ads are usually winning content too.',
          'Engage in the first 30 minutes: Reply to every comment within 30 minutes. Early engagement boosts distribution.',
        ],
      },
      {
        type: 'heading',
        text: 'Using AI UGC as Social Proof on Product Pages',
      },
      {
        type: 'bullets',
        items: [
          'Place a talking-head AI UGC video near the add-to-cart button addressing the top 1–2 objections',
          "Use a 'results' format video in the reviews section as a visual testimonial stand-in",
          'Add an AI UGC explainer to your checkout page to reduce cart abandonment',
          'Embed an AI UGC video in email campaigns — a thumbnail with a play button increases click-through rate',
        ],
      },
      {
        type: 'heading',
        text: 'Building a Content Library',
      },
      {
        type: 'list',
        items: [
          { title: 'Tag by hook type', text: 'Label every AI UGC creative by the hook format it uses. Over time you\'ll see which hook categories consistently outperform.' },
          { title: 'Tag by product/offer', text: 'Keep creatives separated by what they\'re selling. Makes it easy to pull relevant assets for new campaigns.' },
          { title: 'Archive, don\'t delete', text: 'A creative that didn\'t work in Q1 might work perfectly in Q4 with a seasonal hook. Never permanently delete AI UGC output.' },
          { title: 'Build a winning creative swipe file', text: "Your top 5–10 performing creatives should be documented with their metrics. New team members can use this as a brief for what 'good' looks like." },
        ],
      },
      {
        type: 'callout',
        text: "The brands getting the most from AI UGC treat organic and paid as a single integrated creative system. Organic posts tell you what your audience engages with. Paid campaigns amplify what's already working.",
      },
    ],
  },
  {
    id: '06',
    title: 'Your 30-Day Action Plan',
    description: 'A week-by-week roadmap from zero to live, tested AI UGC campaigns with a proven winning creative.',
    icon: Calendar,
    color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    iconColor: 'text-yellow-400',
    badge: 'BONUS',
    content: [
      {
        type: 'intro',
        text: "This is your practical roadmap from zero to live, tested AI UGC campaigns. Follow this sequence and by the end of 30 days you'll have a functioning creative testing system and at least one proven winning creative.",
      },
      {
        type: 'week',
        week: 'Week 1',
        subtitle: 'Foundation',
        items: [
          'Define your target audience — write a one-paragraph description of who you\'re selling to and what problem they have',
          'Write 6 hook variations using the formats in Section 02',
          'Write one base script (30–45 seconds) using the five-part structure',
          'Select 2–3 AI avatar styles that match your target demographic and product tone',
          'Produce your first batch of 6 AI UGC creatives — one hook per creative, same script body',
          'Export in the correct aspect ratios (9:16 and 4:5)',
        ],
      },
      {
        type: 'week',
        week: 'Week 2',
        subtitle: 'Launch & Test',
        items: [
          'Set up your Meta or TikTok campaign using the structure in Section 04',
          'Upload all 6 creatives with equal budget allocation',
          'Post 2–3 creatives organically on TikTok and/or Instagram Reels',
          'Monitor hook rate and thumb-stop rate daily — do not adjust the campaign',
          'After 72 hours, identify your top 2 performing hooks by hook rate',
          'Begin scripting your second batch using learnings from round one',
        ],
      },
      {
        type: 'week',
        week: 'Week 3',
        subtitle: 'Iterate & Optimise',
        items: [
          'Pause the bottom 3 performing creatives',
          'Increase budget by 20% on top performers',
          'Produce your second creative batch — test new script structures using your winning hooks',
          'Continue organic posting — 3–5 times this week',
          'Review CPC and CPA data. Identify your first winning creative',
          'Embed your top performing AI UGC video on your product page or landing page',
        ],
      },
      {
        type: 'week',
        week: 'Week 4',
        subtitle: 'Scale & Systematise',
        items: [
          'Scale budget on your winning creative using the 20–25% rule every 48 hours',
          'Produce your third creative batch — test avatar variations on your winning hook + script',
          'Build your content library tagging system (hook type, product, performance tier)',
          'Document your winning creative with full metrics as your benchmark',
          'Set a weekly creative production target — minimum 5 new AI UGC creatives per week going forward',
          'Review what worked and plan your next 30-day cycle',
        ],
      },
      {
        type: 'callout',
        text: "The brands winning on paid and organic social right now are not the ones with the biggest budgets. They're the ones with the most creative volume, the fastest testing cycles, and the clearest understanding of what their audience responds to. AI UGC gives you all three.",
      },
    ],
  },
]

function renderContent(content) {
  return content.map((block, i) => {
    switch (block.type) {
      case 'intro':
        return <p key={i} className="text-gray-300 text-lg leading-relaxed mb-6 border-l-4 border-green-500 pl-4">{block.text}</p>

      case 'heading':
        return <h3 key={i} className="text-xl font-black text-white mt-8 mb-4">{block.text}</h3>

      case 'text':
        return <p key={i} className="text-gray-400 leading-relaxed mb-4">{block.text}</p>

      case 'callout':
        return (
          <div key={i} className="my-6 p-5 bg-green-500/10 border border-green-500/30 rounded-xl">
            <p className="text-green-300 font-semibold leading-relaxed">{block.text}</p>
          </div>
        )

      case 'bullets':
        return (
          <ul key={i} className="space-y-2 mb-6">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-gray-400 leading-relaxed">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )

      case 'list':
        return (
          <div key={i} className="space-y-4 mb-6">
            {block.items.map((item, j) => (
              <div key={j} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 shrink-0" />
                <div>
                  <span className="font-bold text-white">{item.title}: </span>
                  <span className="text-gray-400">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        )

      case 'table':
        return (
          <div key={i} className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {block.headers.map((h, j) => (
                    <th key={j} className="text-left py-3 px-4 font-bold text-gray-300">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, j) => (
                  <tr key={j} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    {row.map((cell, k) => (
                      <td key={k} className={`py-3 px-4 ${k === 0 ? 'font-semibold text-gray-300' : k === 2 ? 'text-green-400 font-semibold' : 'text-gray-400'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'hooks':
        return (
          <div key={i} className="space-y-3 mb-6">
            {block.items.map((hook, j) => (
              <div key={j} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="font-bold text-orange-400 mb-1 text-sm">{hook.name}</div>
                <div className="font-mono text-green-300 text-sm mb-2 bg-black/30 px-3 py-2 rounded-lg">{hook.formula}</div>
                <div className="text-gray-400 text-sm">{hook.note}</div>
              </div>
            ))}
          </div>
        )

      case 'script-structure':
        return (
          <div key={i} className="space-y-2 mb-6">
            {block.items.map((item, j) => (
              <div key={j} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl items-start">
                <div className="shrink-0 text-xs font-black text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg px-2 py-1 w-20 text-center">{item.time}</div>
                <div>
                  <div className="font-bold text-white mb-1">{item.label}</div>
                  <div className="text-gray-400 text-sm">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        )

      case 'checklist':
        return (
          <div key={i} className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl mb-6">
            <h4 className="font-black text-green-400 mb-4">{block.title}</h4>
            <ul className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                  <div className="w-4 h-4 rounded bg-green-500/30 border border-green-500/50 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-sm bg-green-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )

      case 'rounds':
        return (
          <div key={i} className="space-y-3 mb-6">
            {block.items.map((item, j) => (
              <div key={j} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-black text-white text-sm shrink-0">{item.round}</div>
                <div>
                  <div className="font-bold text-white mb-1">Round {item.round} — {item.title}</div>
                  <div className="text-gray-400 text-sm">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        )

      case 'metrics':
        return (
          <div key={i} className="space-y-3 mb-6">
            {block.items.map((item, j) => (
              <div key={j} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl items-start">
                <div className="shrink-0">
                  <div className="text-xs font-black text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-2 py-1 text-center whitespace-nowrap">{item.benchmark}</div>
                </div>
                <div>
                  <div className="font-bold text-white mb-1 text-sm">{item.metric}</div>
                  <div className="text-gray-400 text-sm">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        )

      case 'week':
        return (
          <div key={i} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-4 py-1.5 bg-orange-500 text-white font-black text-sm rounded-full">{block.week}</div>
              <span className="text-gray-400 font-semibold">{block.subtitle}</span>
            </div>
            <ul className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-5 h-5 rounded border border-green-500/50 bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-sm bg-green-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )

      default:
        return null
    }
  })
}

function SectionView({ section, onBack, onNext, onPrev, hasNext, hasPrev }) {
  const Icon = section.icon
  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Nav */}
      <div className="bg-[#111] border-b border-white/10 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Playbook
          </button>
          <div className="flex items-center gap-2">
            <button onClick={onPrev} disabled={!hasPrev} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-gray-500 text-sm px-2">Section {section.id} of {sections.length}</span>
            <button onClick={onNext} disabled={!hasNext} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Section {section.id}</span>
          {section.badge && <span className="bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded-full">{section.badge}</span>}
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight">{section.title}</h1>
        <div className="prose-content">
          {renderContent(section.content)}
        </div>

        {/* Bottom navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-white/10">
          <button onClick={onPrev} disabled={!hasPrev} className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 disabled:opacity-30 transition-all text-sm font-semibold">
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          {hasNext ? (
            <button onClick={onNext} className="flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-xl transition-all text-sm font-semibold">
              Next Section <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-400 text-black rounded-xl transition-all text-sm font-bold">
              Back to Playbook <Home className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PlaybookPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  if (activeIndex !== null) {
    return (
      <SectionView
        section={sections[activeIndex]}
        onBack={() => setActiveIndex(null)}
        onNext={() => setActiveIndex(i => Math.min(i + 1, sections.length - 1))}
        onPrev={() => setActiveIndex(i => Math.max(i - 1, 0))}
        hasNext={activeIndex < sections.length - 1}
        hasPrev={activeIndex > 0}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      {/* Nav */}
      <div className="bg-[#111] border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-7 object-contain" />
            <span className="font-black text-white">blobbi<span className="text-green-400">.</span>ai</span>
            <span className="text-white/20 mx-1">/</span>
            <span className="text-gray-400 text-sm">AI UGC Ads Playbook</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Home className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 pt-14 pb-10 text-center" style={{ background: 'linear-gradient(180deg, #0d1f0d 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen className="w-3.5 h-3.5" /> Course Material
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            The AI UGC Ads <span className="bg-yellow-400 text-black px-2 rounded-md">Playbook</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Turn AI-Generated Video Content Into High-Converting Paid Social and Organic Campaigns — Without Hiring a Single Creator
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-300"><span className="text-green-400 font-black">Up to 80%</span> cheaper than real creators</div>
            <div className="flex items-center gap-2 text-gray-300"><span className="text-green-400 font-black">10x faster</span> creative production</div>
            <div className="flex items-center gap-2 text-gray-300"><span className="text-green-400 font-black">No face.</span> No camera. No creator fees.</div>
          </div>
        </div>
      </div>

      {/* Section cards grid */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-black text-center mb-10">
          What's Inside — <span className="text-gray-400 font-normal text-lg">6 sections</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveIndex(i)}
                className={`text-left p-6 bg-gradient-to-br ${section.color} border rounded-2xl hover:scale-[1.02] transition-all group relative`}
              >
                {section.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded-full">{section.badge}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${section.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Section {section.id}</span>
                </div>
                <h3 className="font-black text-white text-lg leading-tight mb-3">{section.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{section.description}</p>
                <div className={`flex items-center gap-2 text-sm font-semibold ${section.iconColor} group-hover:gap-3 transition-all`}>
                  Read Section <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
