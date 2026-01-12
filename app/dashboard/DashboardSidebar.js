'use client'

import { Video, Image as ImageIcon, User, Settings, LogOut } from 'lucide-react'

export default function DashboardSidebar() {
  return (
    <aside className="w-16 bg-[#1a1a1a] border-r border-white/10 flex flex-col items-center py-4">
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-black font-black text-xl">
          S
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        <button className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition">
          <Video className="w-5 h-5" />
        </button>
        <button className="p-3 hover:bg-white/10 rounded-lg transition">
          <ImageIcon className="w-5 h-5" />
        </button>
        <button className="p-3 hover:bg-white/10 rounded-lg transition">
          <User className="w-5 h-5" />
        </button>
        <button className="p-3 hover:bg-white/10 rounded-lg transition">
          <Settings className="w-5 h-5" />
        </button>
      </nav>

      <button className="p-3 hover:bg-white/10 rounded-lg transition mt-auto">
        <LogOut className="w-5 h-5" />
      </button>
    </aside>
  )
}