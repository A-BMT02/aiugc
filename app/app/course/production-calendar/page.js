'use client'

import Link from 'next/link'
import { Home, BookOpen, Calendar, ExternalLink } from 'lucide-react'

export default function ProductionCalendarPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col">

      {/* Nav */}
      <div className="bg-[#111] border-b border-white/10 px-6 py-4 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/blobbi-logo-green500-exact.png" alt="Blobbi" className="h-7 object-contain" />
            <span className="font-black text-white">blobbi<span className="text-green-400">.</span>ai</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://drive.google.com/file/d/1g3toznZe08yuKlkgRbDzJ0DDPG-aPKU-/view"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Open in Google Drive
            </a>
            <Link href="/app/course" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <BookOpen className="w-4 h-4" /> All Courses
            </Link>
            <Link href="/dashboard" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <Home className="w-4 h-4" /> Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Label bar */}
      <div className="px-6 py-3 bg-[#0d0d0d] border-b border-white/5 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-xs font-bold">
          <Calendar className="w-3 h-3" /> Course 3 — The 30-Day AI UGC Production Calendar
        </div>
      </div>

      {/* Iframe */}
      <div className="flex-1">
        <iframe
          src="https://drive.google.com/file/d/1g3toznZe08yuKlkgRbDzJ0DDPG-aPKU-/preview"
          className="w-full"
          style={{ height: 'calc(100vh - 112px)', border: 'none' }}
          allow="autoplay"
        />
      </div>

    </div>
  )
}
