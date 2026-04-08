'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Home, Copy, Check } from 'lucide-react'

const niches = [
  {
    id: '01', title: 'E-commerce / Physical Products', range: 'Scripts 1–15',
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30', iconColor: 'text-purple-400',
    scripts: [
      { n: 1, hook: "I spent $300 on ads and got nothing back. Then I changed one thing.", script: "I was running the same product ads as everyone else — polished, branded, expensive. The moment I switched to UGC-style video with a real hook, my cost per purchase dropped by 60%. The product didn't change. The creative did.", cta: "Tap the link to see the exact ad format I used. Your first one takes less than 30 minutes to make." },
      { n: 2, hook: "This product has been sitting in my basket for weeks. Here's why I finally bought it.", script: "I kept seeing this everywhere and kept scrolling. Then someone explained exactly what it did for them — no fancy studio, just them talking about it. I bought it within 24 hours. That's the power of UGC. It doesn't feel like an ad. It feels like a recommendation.", cta: "If you're selling a physical product, tap the link. This is how you get people off the fence." },
      { n: 3, hook: "Stop showing your product. Start showing the problem it solves.", script: "Most product ads lead with the item. Great ads lead with the moment before someone needs it — the frustration, the mess, the situation. When your viewer sees themselves in the problem, they're already halfway sold before you mention the product.", cta: "Tap below to get 100 scripts built around this exact approach. Drop your niche in, hit record." },
      { n: 4, hook: "I ordered this thinking it was a gimmick. I use it every single day now.", script: "I'd seen it all over my feed and assumed it was one of those things that looks great in videos and does nothing in real life. I was wrong. Three weeks in and I genuinely don't know how I managed without it. Here's what it actually does.", cta: "Link below if you want to see it. First order ships free." },
      { n: 5, hook: "The honest review nobody asked for but everyone needed.", script: "I'm not sponsored. I bought this with my own money after seeing it everywhere. So here's what it's actually like — the good, the slightly annoying, and the reason I'm still using it two months later.", cta: "Tap below if you want the link. No referral code, no hidden discount — just the product." },
      { n: 6, hook: "My kitchen was a disaster until this arrived.", script: "I'd tried every organiser, every system, every hack. Nothing stuck because nothing was actually designed for how real kitchens work. This was. Within a weekend the whole thing made sense again.", cta: "Link in the description. Comes in three sizes and ships within two days." },
      { n: 7, hook: "Three reasons I almost didn't buy this — and why I'm glad I did.", script: "First, the price made me hesitate. Second, I'd been burned by similar products before. Third, I genuinely didn't think it would work for my specific situation. Wrong on all three counts. Here's the honest breakdown.", cta: "Tap below to see it for yourself. They've got a 30-day return policy so there's no real risk." },
      { n: 8, hook: "This is the most underrated product in the [niche] space right now.", script: "Nobody's talking about it because the brand doesn't have a massive marketing budget. But the product itself is genuinely excellent. I've been using it for six weeks and I'd recommend it over anything twice the price.", cta: "Tap below before they run out. They sell out most weeks." },
      { n: 9, hook: "I gifted this to my [friend/partner/parent] and now they won't stop talking about it.", script: "I wasn't even buying it for myself — I needed a gift that felt thoughtful but wasn't going to break the bank. It landed perfectly. I've since bought two more for different people.", cta: "Great gift option. Tap the link to see sizing and delivery times." },
      { n: 10, hook: "Here's what [product] actually looks like after 90 days of daily use.", script: "Most reviews are from people who've had something for a week. I've been using this every day for three months. Here's the real durability, the real wear, and whether it's still worth buying.", cta: "Tap below. They do free shipping on orders over $40." },
      { n: 11, hook: "The packaging alone made me feel like I'd spent more than I did.", script: "I ordered this expecting a plastic bag and a receipt. What arrived felt like a proper purchase — good materials, thoughtful presentation. The product is solid too, but the unboxing experience genuinely surprised me.", cta: "Tap below. Makes a great gift even if you're buying it for yourself." },
      { n: 12, hook: "Why does nobody talk about how good [product category] from small brands can be?", script: "I've been buying from the same big names for years out of habit. Tried this smaller brand on a recommendation and it's genuinely better. Better quality, better service, nearly half the price.", cta: "Link below. They're running a launch discount right now." },
      { n: 13, hook: "I've repurchased this four times. Here's why.", script: "I don't repurchase things often. I try something, move on. This is the exception. I've been buying it consistently for over a year now because nothing else does the same job at the same quality.", cta: "Tap below to try it. First order comes with a small sample pack so you can test before committing." },
      { n: 14, hook: "What I wish I'd known before I bought [product category].", script: "There's a lot of noise in this space and it's genuinely hard to know what's worth buying. I wasted money on two others before I found this one. This is what I'd tell anyone starting from scratch.", cta: "Tap the link. This is the one I'd buy again without hesitation." },
      { n: 15, hook: "This costs $[X] and it's replaced something I was spending $[3X] on every month.", script: "I kept paying for [expensive alternative] because I assumed it was the only option that actually worked. This does the same job — arguably better — and I've saved over $200 in the last three months alone.", cta: "Tap below. Saves money month one. Ships in two days." },
    ],
  },
  {
    id: '02', title: 'Health & Wellness', range: 'Scripts 16–30',
    color: 'from-green-500/20 to-green-600/10 border-green-500/30', iconColor: 'text-green-400',
    scripts: [
      { n: 16, hook: "I didn't change my diet. I didn't start going to the gym. Here's what I did change.", script: "I'd been trying to feel better for two years. Same advice everywhere — eat less, move more. I know. I was doing that. What actually made the difference was this one addition to my daily routine. I'm not saying it's magic. I'm saying it worked when nothing else did.", cta: "Tap below to see exactly what I'm using. Takes about 60 seconds a day." },
      { n: 17, hook: "Six weeks ago I couldn't get through the afternoon without crashing. This is what changed.", script: "Energy crashes at 2pm had become my normal. Coffee made it worse. I'd tried everything people recommend and kept getting the same result. A friend mentioned this and I tried it mostly out of desperation. Week two, the crashes stopped.", cta: "Tap below. Comes with a starter kit if it's your first order." },
      { n: 18, hook: "My sleep was so bad my doctor mentioned it at a routine appointment.", script: "I wasn't tracking it. I wasn't aware how bad it had gotten until someone external said something. I started addressing it properly six months ago. Here's what I changed and what actually made the difference.", cta: "Link below. The one thing I'd tell anyone who's tired all the time." },
      { n: 19, hook: "Stop spending money on supplements that don't absorb properly.", script: "Most supplements have a bioavailability problem — your body can't actually use what you're taking in. I spent months researching this and switched to a formulation that addresses it directly. The difference showed up in my bloodwork within 12 weeks.", cta: "Tap below. Third-party tested. Full ingredients on the label." },
      { n: 20, hook: "I've tried every protein powder on the market. Here's my honest ranking.", script: "I'm not a nutritionist. I'm just someone who's been training for eight years and has bought way too many tubs of powder. Here's what I actually use now and why everything I used before was either undrinkable or overpriced.", cta: "Tap below for the one I currently use. Ships within 24 hours." },
      { n: 21, hook: "This is what a 90-day health transformation actually looks like — no filters.", script: "Not a before and after with perfect lighting. The real version — slow progress, a few setbacks, and the things that actually kept me consistent when motivation disappeared.", cta: "Tap below. The approach I used is linked in the description." },
      { n: 22, hook: "Your gut health is affecting more than you think.", script: "Mood, energy, skin, sleep — all of it is connected to what's happening in your gut. I had no idea how much until I started addressing it. Here's what I changed and what I noticed within the first month.", cta: "Tap below. The product I use has a 30-day guarantee so there's no risk trying it." },
      { n: 23, hook: "I was taking five different supplements. I'm down to two. Here's why.", script: "The supplement industry is designed to make you buy more. I spent a year consolidating and now I only take two things — both backed by evidence, both at doses that actually do something. Everything else went in the bin.", cta: "Tap below if you want to know what I kept. Happy to share." },
      { n: 24, hook: "Three things I stopped doing that improved my health more than anything I started.", script: "We spend a lot of time looking for things to add. Sometimes the better move is removing what's working against you. Here are the three things I cut out and what changed as a result.", cta: "Tap below. The full breakdown is linked." },
      { n: 25, hook: "My inflammation was so bad I thought it was just how getting older felt.", script: "Joint pain, bloating, skin flare-ups — I assumed it was age. I was 34. When I actually started treating it as an inflammation problem, most of those symptoms improved within eight weeks.", cta: "Tap below. This is what I used. Not sponsored — I paid full price." },
      { n: 26, hook: "What nobody tells you about magnesium.", script: "Most people are deficient. Most magnesium supplements use a form your body can barely absorb. Here's what I switched to and why my sleep quality changed within two weeks of making the swap.", cta: "Tap below. The form matters — details in the link." },
      { n: 27, hook: "I've been tracking my health for three years. This is the one thing that moved the needle most.", script: "I've tried a lot of things with a lot of data behind me. Nutrition changes, training changes, sleep protocols. One intervention consistently shows up as the most impactful across every metric I track.", cta: "Tap below. Simple habit, meaningful results." },
      { n: 28, hook: "My skin cleared up and I didn't change my skincare routine.", script: "I'd been treating it as a topical problem for years. Turns out it was largely internal. Three months of addressing what was actually causing it and my skin is the best it's been since my early twenties.", cta: "Tap below for what I changed. Diet, one supplement, one habit." },
      { n: 29, hook: "Why I stopped relying on motivation to stay healthy.", script: "Motivation is unreliable. I trained myself to rely on systems instead. Here's what my health routine looks like on the days I don't want to do it — and how I built it so those days don't derail everything.", cta: "Tap below. The app I use for tracking is linked." },
      { n: 30, hook: "I used to think rest days were for people who weren't working hard enough.", script: "Two stress fractures and one bout of adrenal fatigue later, I understand recovery differently. Here's what I do on rest days now and why my training performance actually improved when I started taking them seriously.", cta: "Tap below. The recovery protocol I follow is linked in the description." },
    ],
  },
  {
    id: '03', title: 'Beauty & Skincare', range: 'Scripts 31–42',
    color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30', iconColor: 'text-pink-400',
    scripts: [
      { n: 31, hook: "I've spent thousands on skincare. This $[X] product outperforms most of it.", script: "I'm not someone who buys cheap skincare as a rule. I've paid for the expensive stuff and genuinely believed it was worth it. Then I tried this and I'm having a hard time justifying the price difference.", cta: "Tap below. It's been in my routine for four months now." },
      { n: 32, hook: "My skin looked exhausted all the time and nobody told me why until I figured it out myself.", script: "It wasn't products. It wasn't sleep, exactly. It was my barrier — I'd been stripping it for years with the wrong routine. Here's what I changed and how long it took to see a difference.", cta: "Tap below. The routine I rebuilt is linked." },
      { n: 33, hook: "Stop buying the serum. Start fixing the routine it goes into.", script: "The most expensive serum in the world won't work if it's applied to a compromised barrier, layered incorrectly, or used at the wrong time. Here's the order that actually makes your products work.", cta: "Tap below. I put together a full routine guide if you want it." },
      { n: 34, hook: "I went makeup-free for 30 days. Here's what I noticed about my skin.", script: "Not a lecture about natural beauty. A genuine experiment. My skin had become dependent on coverage and I wanted to understand what was actually going on underneath. Thirty days of data.", cta: "Tap below. The two products I kept throughout are linked." },
      { n: 35, hook: "The ingredient everyone's adding to their routine and what it's actually doing.", script: "It's in everything right now. Some of the claims are valid. Some are marketing. Here's what the evidence actually says about [ingredient] and how to use it without overdoing it.", cta: "Tap below. I use it twice a week — the protocol is in the description." },
      { n: 36, hook: "My under-eye area was the one thing my skincare wasn't fixing.", script: "Everything else had improved over two years of building a proper routine. The under-eye area was stubbornly the same. Here's what finally made a difference and why I hadn't tried it sooner.", cta: "Tap below. The product is linked. Works best with consistent use over six to eight weeks." },
      { n: 37, hook: "I used the same foundation for seven years. Here's why I finally switched.", script: "It wasn't broken. But I'd changed — my skin tone, my skin type, what I needed from a base. Here's what I moved to and what made the difference in how it wears through a full day.", cta: "Tap below. Comes in 42 shades. The shade finder tool on their site is actually accurate." },
      { n: 38, hook: "What I'd spend my first $100 on if I was building a skincare routine from scratch.", script: "Not the trendiest products. Not the most talked-about brands. The ones that are boring, evidence-based, and actually work for most skin types. Three products, $100, sorted.", cta: "Tap below. The full list is in the link." },
      { n: 39, hook: "I ignored SPF for years. My dermatologist showed me what that looks like under UV light.", script: "Not to scare anyone. Just to say — the damage is there even when you can't see it. I've been consistent with SPF daily for 18 months now. Here's what I use and why it doesn't feel like sunscreen.", cta: "Tap below. Wears well under makeup. No white cast." },
      { n: 40, hook: "The product my esthetician told me to stop using and what to use instead.", script: "I'd been loyal to it for three years. She looked at my skin and within two minutes identified it as the thing causing my recurring congestion. The swap was $12 cheaper and my skin has been clear since.", cta: "Tap below. Simple switch. Obvious results." },
      { n: 41, hook: "My hair was breaking off at the ends for two years. Here's what fixed it.", script: "I blamed heat. I blamed my water. I blamed everything except the thing that was actually causing it — my protein-moisture balance was completely off. Once I addressed that, the breakage stopped within six weeks.", cta: "Tap below. The treatment I used is linked. Use it once a week." },
      { n: 42, hook: "Nobody told me that fragrance in skincare was probably causing my sensitivity.", script: "I'd been patching new products, eliminating dairy, trying everything. The answer was sitting in the ingredient list of products I'd been using for years. Fragrance — both synthetic and natural — was the trigger.", cta: "Tap below. The fragrance-free alternatives I switched to are linked." },
    ],
  },
  {
    id: '04', title: 'Fitness & Training', range: 'Scripts 43–54',
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30', iconColor: 'text-orange-400',
    scripts: [
      { n: 43, hook: "I trained for five years and made less progress than I did in the last eight months.", script: "The first five years I worked hard. The last eight months I trained smart. Here's the difference — what I changed, what I stopped doing, and what the results actually look like.", cta: "Tap below. The program I'm following is linked." },
      { n: 44, hook: "You don't need to be in the gym six days a week. Here's the evidence.", script: "Three well-structured sessions per week outperforms six poorly structured ones almost every time. I train less than I used to, lift more than I ever have, and recover properly for the first time in years.", cta: "Tap below. The three-day programme I use is in the description." },
      { n: 45, hook: "The fitness advice I wish I'd ignored for the first three years.", script: "More is more. No pain no gain. You have to earn your rest days. All of it cost me injuries, plateaus, and a lot of time. Here's what I know now.", cta: "Tap below. Happy to share what actually works." },
      { n: 46, hook: "I lost 18 pounds without doing a single minute of cardio.", script: "Not anti-cardio. Just showing that it's not the only tool and for a lot of people it's not the most efficient one. Here's what I did instead and why the weight came off and stayed off.", cta: "Tap below. The approach is straightforward and sustainable." },
      { n: 47, hook: "My squat went from 60kg to 120kg in 14 months. Here's the exact progression I used.", script: "Not genetics. Not steroids. A structured progression model, consistent technique work, and patience. Here's the programme broken down simply.", cta: "Tap below. The spreadsheet is free to download." },
      { n: 48, hook: "I started training at 47. Here's what nobody tells you about building muscle later in life.", script: "It's slower. The recovery window is different. The nutritional demands change. But it absolutely works — and the health benefits are arguably more significant than they are at 25. Here's what I've learned in two years.", cta: "Tap below. The programme I follow accounts for all of this." },
      { n: 49, hook: "Stop chasing the pump. Start chasing progressive overload.", script: "Feeling worked isn't the same as improving. I spent two years confusing soreness and fatigue with progress. Once I started measuring overload systematically, my results in six months eclipsed everything that came before.", cta: "Tap below. Simple tracking method in the link." },
      { n: 50, hook: "What happened when I stopped doing ab exercises and focused on this instead.", script: "I did direct ab work for four years. Switched to prioritising compound lifts and fixing my nutrition. My core looks better now than at any point when I was doing daily ab circuits.", cta: "Tap below. The compound routine that made the difference is linked." },
      { n: 51, hook: "My protein intake was half what it needed to be and I had no idea.", script: "I thought I was eating enough protein. I was getting around 80 grams a day. I needed closer to 160. When I fixed that, my recovery changed, my strength went up, and I stopped feeling constantly run down.", cta: "Tap below. The protein calculator I use is linked." },
      { n: 52, hook: "The warm-up routine that eliminated my lower back pain during deadlifts.", script: "I'd been pushing through discomfort for over a year. Turns out the problem wasn't the movement — it was how I was preparing for it. Eight minutes of targeted prep work and the pain disappeared.", cta: "Tap below. The routine is in the description. Takes less than 10 minutes." },
      { n: 53, hook: "I trained through burnout for six months and here's what it cost me.", script: "A stress response I couldn't shake, poor sleep, stalled progress, and eventually a forced break. What I thought was dedication was actually just stubbornness. Here's what I do differently now.", cta: "Tap below. The deload protocol I follow is linked." },
      { n: 54, hook: "Home gym vs commercial gym — 18 months of training in both.", script: "I've done both seriously and both have real trade-offs. Here's my honest assessment of what you gain and lose with each, and which one is actually right for your situation.", cta: "Tap below. The home gym setup I'd recommend for under $800 is in the description." },
    ],
  },
  {
    id: '05', title: 'Finance & Money', range: 'Scripts 55–64',
    color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30', iconColor: 'text-yellow-400',
    scripts: [
      { n: 55, hook: "I was earning good money and still living paycheck to paycheck. Here's what changed.", script: "Income wasn't the problem. The system was the problem. Or rather, the absence of one. I didn't have a budget — I had a vague sense of what I was spending. When I built an actual system, I found $800 a month I wasn't aware I was wasting.", cta: "Tap below. The budgeting method I use is simple and linked." },
      { n: 56, hook: "I paid off $23,000 in debt in 19 months on an average salary.", script: "Not a high earner. Not a side hustle story. Just a method, applied consistently, with some genuinely uncomfortable decisions along the way. Here's exactly how it worked.", cta: "Tap below. The debt payoff calculator I used is in the link." },
      { n: 57, hook: "The financial habit that matters more than any investment decision you'll make.", script: "Not the stock market. Not real estate. The gap between what you earn and what you spend — and doing something intentional with that gap every month. Everything else builds on top of this.", cta: "Tap below. The tool I use to track it is linked." },
      { n: 58, hook: "I started investing at 31 and here's what I wish I'd started at 21.", script: "Not here to make anyone feel bad about starting late. Just to show what the numbers actually look like when you begin now versus waiting another five years. The maths is more motivating than any pep talk.", cta: "Tap below. The compound interest calculator is in the description." },
      { n: 59, hook: "My emergency fund saved me from going back into debt twice this year.", script: "Two unexpected expenses — one $1,400, one $2,800. Both absorbed without touching a credit card. The peace of mind alone is worth building it. Here's how I built mine in seven months.", cta: "Tap below. The savings plan I followed is linked." },
      { n: 60, hook: "Stop optimising your coffee spend. Fix the three things that actually move the needle.", script: "Housing, transport, and food account for the majority of most people's budgets. A few hundred dollars saved on subscription services is noise compared to right-sizing any one of those three. Here's how to look at each of them.", cta: "Tap below. The audit template I use is in the link." },
      { n: 61, hook: "I switched banks and made an extra $400 last year doing nothing differently.", script: "High-yield savings account. That's it. Same money, same habits, four times the interest. If your savings are sitting in a standard account earning 0.01%, tap below.", cta: "Tap below. The account I use is in the description. Takes 10 minutes to set up." },
      { n: 62, hook: "What my net worth looked like at 25, 30, and 35 — and what made the difference.", script: "Not showing off. Showing the math of consistency. The gap between 25 and 30 was modest. The gap between 30 and 35 was significant. Here's what compounding actually looks like in real numbers.", cta: "Tap below. The net worth tracker I use is linked and free." },
      { n: 63, hook: "The subscription audit that freed up $180 a month I didn't know I was spending.", script: "I was paying for three services I hadn't used in over a year. Two gym memberships. A software subscription I'd forgotten to cancel after a free trial. Total: $180 a month. Here's how to find yours.", cta: "Tap below. The audit tool is in the link." },
      { n: 64, hook: "I negotiated my rent down by $150 a month. Here's exactly what I said.", script: "Most people assume rent is non-negotiable. It isn't. Here's the exact conversation I had, what leverage I used, and what the outcome was. Works better than you'd expect, particularly with smaller landlords.", cta: "Tap below. The script I used is in the link." },
    ],
  },
  {
    id: '06', title: 'SaaS & Digital Tools', range: 'Scripts 65–74',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30', iconColor: 'text-blue-400',
    scripts: [
      { n: 65, hook: "I was spending 12 hours a week on a task that this tool now does in 20 minutes.", script: "Not an exaggeration. I tracked my time for a month before and after. Here's what the workflow looked like, what changed, and what I'd say to anyone still doing it manually.", cta: "Tap below. Free trial available. No credit card required." },
      { n: 66, hook: "The tool my entire team uses now that nobody had heard of 18 months ago.", script: "We tried the big names. They were either overbuilt for what we needed or too expensive to justify. This one does exactly what we need at a third of the price. Here's what we use it for.", cta: "Tap below. Team pricing is in the link." },
      { n: 67, hook: "I replaced three paid subscriptions with one. Here's the breakdown.", script: "I was paying for [Tool A], [Tool B], and [Tool C] separately. Combined cost: $140 a month. Found one platform that handles all three. Now paying $35. Same outcomes, less context switching.", cta: "Tap below. The platform is linked. Free 14-day trial." },
      { n: 68, hook: "Stop doing your reporting manually. Here's what I use instead.", script: "I spent Friday afternoons pulling data from four different places and pasting it into a spreadsheet. That was my life for two years. Here's the tool that automated the whole thing and gave me my Fridays back.", cta: "Tap below. Connects to most platforms in under five minutes." },
      { n: 69, hook: "The free tool that does what $80-a-month tools charge you for.", script: "I'm not against paying for software. But I am against paying for something when a better free version exists. Here's what I switched to and what I'm saving every month.", cta: "Tap below. It's free. The setup guide is in the link." },
      { n: 70, hook: "My client onboarding used to take three days. Now it takes two hours.", script: "Not because I'm cutting corners. Because I built a proper system with the right tools. Here's the stack I use and what each piece does.", cta: "Tap below. The onboarding template is free to download." },
      { n: 71, hook: "I tried every project management tool. Here's the only one I still use.", script: "Notion, Asana, Monday, ClickUp, Trello — I've run real workflows through all of them. Here's my honest verdict and why I ended up back with one I'd dismissed early on.", cta: "Tap below. The workspace template I use is linked." },
      { n: 72, hook: "This AI tool saved me eight hours last week. Here's exactly how I used it.", script: "Not vague. Here are the five specific tasks I ran through it, how long they used to take, and what the output quality was like. Practical and honest.", cta: "Tap below. Free plan covers most use cases." },
      { n: 73, hook: "The tool that made me look like I had a team when I was working alone.", script: "Solopreneur for three years. Here's the stack that let me produce the output of a small agency — proposals, design, copy, scheduling — without hiring anyone.", cta: "Tap below. Full stack breakdown in the link." },
      { n: 74, hook: "I almost cancelled this subscription. Then I found the feature I'd been missing.", script: "I was getting 40% of the value and nearly walked away. Here's the thing I hadn't discovered that changed how I use the platform — and why it's now the tool I'd least like to give up.", cta: "Tap below. The feature walkthrough is in the link." },
    ],
  },
  {
    id: '07', title: 'Coaching & Online Education', range: 'Scripts 75–84',
    color: 'from-teal-500/20 to-teal-600/10 border-teal-500/30', iconColor: 'text-teal-400',
    scripts: [
      { n: 75, hook: "I spent $4,000 on a course that changed nothing. Here's what actually moved the needle.", script: "Not a course review. A reflection on why information alone doesn't produce results — and what needs to be in place for any learning investment to pay off.", cta: "Tap below. The approach I take now is linked." },
      { n: 76, hook: "The question I ask every potential coaching client before we start working together.", script: "It tells me immediately whether they're ready. Most people aren't — and that's not a criticism, it's just data. Here's the question and what the right answer looks like.", cta: "Tap below if you want to know whether coaching is the right next step for you." },
      { n: 77, hook: "What six months of coaching gave me that five years of self-study didn't.", script: "Not because the coach knew things I couldn't have found. Because accountability, feedback, and an external perspective compress learning in a way that solo study simply can't replicate.", cta: "Tap below. Applications open for the next cohort." },
      { n: 78, hook: "The course I took that I'd recommend to every person starting out in [niche].", script: "I've taken a lot of courses. Most are fine. This one is genuinely different — the structure, the depth, and the quality of the community make it worth every dollar.", cta: "Tap below. They run it twice a year and it fills up quickly." },
      { n: 79, hook: "I went from charging $500 to $3,000 for the same service. Here's how the positioning changed.", script: "Not a different service. Different framing, different delivery, different client profile. Here's what I changed about how I talk about my work and how that changed who pays for it.", cta: "Tap below. Free workshop on positioning is linked." },
      { n: 80, hook: "My biggest lesson from coaching 200 people over three years.", script: "Most people know what to do. The gap is almost never information. Here's what I've learned about what actually creates change — and how I build it into the work now.", cta: "Tap below. I have a few spots open for 1:1 work this quarter." },
      { n: 81, hook: "Stop buying courses until you've done this first.", script: "One question that tells you whether you're buying information you'll use or information that makes you feel productive. I wasted three years and several thousand dollars learning this lesson.", cta: "Tap below. The filter I use before any learning investment is in the link." },
      { n: 82, hook: "What I'd do if I had to rebuild my expertise from zero in 90 days.", script: "Not theoretical. I've thought this through carefully. Here's the sequence — what I'd learn first, how I'd practice, and how I'd start getting in front of people before I felt fully ready.", cta: "Tap below. The 90-day framework is in the description." },
      { n: 83, hook: "The free resource that's better than most paid courses I've seen.", script: "Not clickbait. There is a free resource in [niche] that is more comprehensive, more honest, and more practical than things people charge $500 for. Here it is.", cta: "Tap below. No opt-in required." },
      { n: 84, hook: "I've been teaching [skill] for four years. Here's what my best students have in common.", script: "It's not talent. It's not prior experience. It's not even how much time they put in. Here's the one thing that separates the people who get results from the ones who don't.", cta: "Tap below. Applications for the next programme are open." },
    ],
  },
  {
    id: '08', title: 'Home & Lifestyle', range: 'Scripts 85–92',
    color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30', iconColor: 'text-rose-400',
    scripts: [
      { n: 85, hook: "My home felt chaotic no matter how much I cleaned. Here's what I finally changed.", script: "It wasn't a cleaning problem. It was a systems problem. Once I addressed the structure — storage, flow, the way things move through the house — the maintenance became effortless.", cta: "Tap below. The organising method I used is linked." },
      { n: 86, hook: "I spent $200 on home upgrades that made a bigger difference than $2,000 worth of furniture.", script: "Not minimalism content. Just practical observations about where visual impact actually comes from in a room. The things that matter most are often the cheapest to change.", cta: "Tap below. The full list is in the description." },
      { n: 87, hook: "The cleaning product I've been loyal to for four years and why I've never switched.", script: "I've tried the trendy alternatives. I've made my own. Nothing has matched this for how well it works, how long it lasts, and how it leaves surfaces. Here's what it is.", cta: "Tap below. Available online. Usually cheaper than the supermarket." },
      { n: 88, hook: "My morning routine used to take 45 minutes. I got it to 12 without cutting anything that matters.", script: "Not a productivity lecture. A practical audit of what was adding time without adding value. Here's what I removed, what I kept, and what the difference feels like.", cta: "Tap below. The routine template is in the link." },
      { n: 89, hook: "The one change that made our home feel twice as calm.", script: "Not a renovation. Not new furniture. A decision about how we manage one specific thing — and it's had an outsized effect on how the whole space feels to live in.", cta: "Tap below. Simple change. Surprisingly big difference." },
      { n: 90, hook: "I tracked my grocery spend for three months. Here's what surprised me.", script: "I thought I was reasonably careful. The numbers told a different story. Here's where the money was going, what I changed, and how much I'm saving now without eating differently.", cta: "Tap below. The tracking template I used is free to download." },
      { n: 91, hook: "The $30 item that made our kitchen actually functional.", script: "Not a gadget. Not a fancy appliance. The single most useful addition to our kitchen in five years of living here — and we nearly didn't buy it because it seemed too simple.", cta: "Tap below. In stock. Ships in two days." },
      { n: 92, hook: "I decluttered every room in our house over six months. Here's what actually stayed.", script: "Not a minimalist manifesto. A practical record of what we owned, what we got rid of, and what the house feels like now. And the things I nearly threw away that I'm glad I kept.", cta: "Tap below. The room-by-room method I used is in the description." },
    ],
  },
  {
    id: '09', title: 'Travel', range: 'Scripts 93–100',
    color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30', iconColor: 'text-indigo-400',
    scripts: [
      { n: 93, hook: "I travelled for three weeks on a budget most people spend in four days. Here's how.", script: "Not staying in hostels. Not eating badly. Just a few decisions made before I left that completely changed the economics of the trip. Here's the breakdown.", cta: "Tap below. The full budget breakdown is in the link." },
      { n: 94, hook: "The travel mistake I made twice before I stopped making it.", script: "Overplanning. I had every hour accounted for on my first two solo trips and I was exhausted by day three. Here's how I plan now and why the trips have been better since.", cta: "Tap below. The planning framework I use is in the description." },
      { n: 95, hook: "I've been to 31 countries. The one that surprised me most was [destination].", script: "Not the most obvious choice. Not somewhere that comes up in the top ten lists. Here's why I went, what I expected, and what I found instead.", cta: "Tap below. Full itinerary in the link if you're planning a trip." },
      { n: 96, hook: "How I got business class flights for the price of economy.", script: "Points. But actually useful, specific information about points — not vague advice to 'get a travel card.' Here's the exact approach I used for a specific route and what the process looked like.", cta: "Tap below. The card I use for travel spend is linked." },
      { n: 97, hook: "The hidden cost of travelling that nobody talks about.", script: "Not baggage fees. Time. Decision fatigue. The energy of constant novelty. Here's how I manage the invisible costs of travel that don't show up in any budget calculator.", cta: "Tap below. The travel system I use is in the description." },
      { n: 98, hook: "I spent two months in [destination] working remotely. Here's what nobody tells you.", script: "The good parts are as good as people say. The difficult parts are different from what you'd expect. Here's the honest version of what slow travel with remote work actually looks like.", cta: "Tap below. The setup I used for work is linked." },
      { n: 99, hook: "The packing list I've used for every trip in the last three years — nothing more, nothing less.", script: "I used to overpack badly. Two checked bags for a two-week trip. I've got it down to a carry-on for anything up to a month. Here's exactly what's in it.", cta: "Tap below. The packing list is free to download." },
      { n: 100, hook: "Why I stopped trying to see everything and started trying to understand one place properly.", script: "Six cities in eight days used to feel like an achievement. Now it feels like I was just moving. Here's how my approach to travel has changed and what the trips look and feel like now.", cta: "Tap below. The trip I'm planning next is in the description." },
    ],
  },
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all shrink-0" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
    </button>
  )
}

function ScriptCard({ script }) {
  const full = `HOOK:\n${script.hook}\n\nSCRIPT:\n${script.script}\n\nCTA:\n${script.cta}`
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
        <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Script #{script.n}</span>
        <CopyButton text={full} />
      </div>
      <div className="p-5 space-y-4">
        <div>
          <div className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1.5">Hook</div>
          <p className="text-white font-semibold leading-relaxed text-sm bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">{script.hook}</p>
        </div>
        <div>
          <div className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1.5">Script</div>
          <p className="text-gray-300 leading-relaxed text-sm">{script.script}</p>
        </div>
        <div>
          <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1.5">CTA</div>
          <p className="text-gray-400 leading-relaxed text-sm italic">{script.cta}</p>
        </div>
      </div>
    </div>
  )
}

function NicheView({ niche, onBack }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="bg-[#111] border-b border-white/10 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Script Bank
          </button>
          <span className="text-gray-500 text-sm">{niche.scripts.length} scripts · {niche.range}</span>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Niche {niche.id}</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-2">{niche.title}</h1>
          <p className="text-gray-400 text-sm">Replace any [bracketed text] with your product or specific detail. Adapt the language to match your brand voice.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {niche.scripts.map(s => <ScriptCard key={s.n} script={s} />)}
        </div>
      </div>
    </div>
  )
}

export default function ScriptBankPage() {
  const [activeNiche, setActiveNiche] = useState(null)

  if (activeNiche !== null) {
    return <NicheView niche={niches[activeNiche]} onBack={() => setActiveNiche(null)} />
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="bg-[#111] border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-7 object-contain" />
            <span className="font-black">blobbi<span className="text-green-400">.</span>ai</span>
            <span className="text-white/20 mx-1">/</span>
            <Link href="/app/course" className="text-gray-400 text-sm hover:text-white transition-colors">Course</Link>
            <span className="text-white/20 mx-1">/</span>
            <span className="text-gray-400 text-sm">Script Bank</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Home className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="px-6 pt-14 pb-10 text-center" style={{ background: 'linear-gradient(180deg, #0d1f0d 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
            Course 2 of 6
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            The AI UGC Ad <span className="bg-yellow-400 text-black px-2 rounded-md">Script Bank</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            100 done-for-you scripts across 9 niches. Hook. Script. CTA. Ready to record.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="text-gray-300"><span className="text-green-400 font-black">100</span> ready-to-use scripts</div>
            <div className="text-gray-300"><span className="text-green-400 font-black">9</span> niches covered</div>
            <div className="text-gray-300"><span className="text-green-400 font-black">3</span> parts per script</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <p className="text-gray-500 text-sm text-center mb-10">Select a niche to view all scripts</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {niches.map((niche, i) => (
            <button key={niche.id} onClick={() => setActiveNiche(i)}
              className={`text-left p-6 bg-gradient-to-br ${niche.color} border rounded-2xl hover:scale-[1.02] transition-all group`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Niche {niche.id}</span>
                <span className={`text-xs font-bold ${niche.iconColor}`}>{niche.range}</span>
              </div>
              <h3 className="font-black text-white text-lg leading-tight mb-2">{niche.title}</h3>
              <p className="text-gray-500 text-xs mb-4">{niche.scripts.length} scripts</p>
              <div className={`flex items-center gap-2 text-sm font-semibold ${niche.iconColor} group-hover:gap-3 transition-all`}>
                View Scripts <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
