'use client'

import Link from 'next/link'
import { BookOpen, FileText, Calendar, Video, BarChart2, Zap, Layers, Home } from 'lucide-react'

const courses = [
  {
    id: 1, slug: 'playbook',
    title: 'The AI UGC Ads Playbook',
    description: 'Turn AI-generated video content into high-converting paid social and organic campaigns.',
    icon: BookOpen,
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    iconColor: 'text-purple-400',
    bonus: false,
  },
  {
    id: 2, slug: 'script-bank',
    title: 'The AI UGC Ad Script Bank',
    description: '100 done-for-you scripts across 9 niches. Hook. Script. CTA. Ready to record.',
    icon: FileText,
    color: 'from-green-500/20 to-green-600/10 border-green-500/30',
    iconColor: 'text-green-400',
    bonus: false,
  },
  {
    id: 3, slug: 'production-calendar',
    title: 'The 30-Day AI UGC Production Calendar',
    description: 'A day-by-day content schedule — what to produce, what format, what avatar, what metric.',
    icon: Calendar,
    color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    iconColor: 'text-orange-400',
    bonus: false,
  },
  {
    id: 4, slug: 'platform-walkthrough',
    title: 'Platform Walkthrough',
    description: 'Get set up in Blobbi and produce your first AI UGC creative from scratch.',
    icon: Video,
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    iconColor: 'text-blue-400',
    bonus: false,
  },
  {
    id: 5, slug: 'meta-tiktok-campaigns',
    title: 'Talking Head Ads for Meta & TikTok',
    description: 'Campaign structure, budget setup, the five metrics that matter, and when to scale.',
    icon: BarChart2,
    color: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
    iconColor: 'text-pink-400',
    bonus: true,
  },
  {
    id: 6, slug: 'script-to-screen',
    title: 'Script to Screen',
    description: 'The five-part script structure that every high-converting UGC ad follows.',
    icon: Zap,
    color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30',
    iconColor: 'text-yellow-400',
    bonus: true,
  },
  {
    id: 7, slug: 'product-lifestyle-ugc',
    title: 'Product & Lifestyle UGC',
    description: 'Beyond the talking head — product demo, unboxing, and lifestyle formats that convert.',
    icon: Layers,
    color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30',
    iconColor: 'text-cyan-400',
    bonus: true,
  },
]

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="bg-[#111] border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-7 object-contain" />
            <span className="font-black text-white">blobbi<span className="text-green-400">.</span>ai</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Home className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="px-6 pt-14 pb-10 text-center" style={{ background: 'linear-gradient(180deg, #0d1f0d 0%, #0d0d0d 100%)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen className="w-3.5 h-3.5" /> AI UGC Fast-Start Course
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Your <span className="bg-yellow-400 text-black px-2 rounded-md">Course</span> Materials
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Everything you need to create, test, and scale AI UGC ads — in one place.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const Icon = course.icon
            const inner = (
              <div className={`p-6 bg-gradient-to-br ${course.color} border rounded-2xl transition-all relative h-full flex flex-col hover:scale-[1.02] group cursor-pointer`}>
                {course.bonus && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wide">Bonus</span>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${course.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Module {course.id}</span>
                </div>
                <h3 className="font-black text-white text-lg leading-tight mb-3">{course.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-4">{course.description}</p>
                <div className={`text-sm font-semibold ${course.iconColor} group-hover:translate-x-1 transition-transform`}>
                  Open Module →
                </div>
              </div>
            )
            return (
              <Link key={course.id} href={`/app/course/${course.slug}`}>{inner}</Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
