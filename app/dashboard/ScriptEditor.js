'use client'

import { Wand2, Play } from 'lucide-react'

export default function ScriptEditor({ script, onScriptChange }) {  // Changed from onChange to onScriptChange
  return (
    <div>
      <label className="text-sm font-semibold mb-2 block">Script</label>
      <p className="text-xs text-gray-400 mb-3">
        What would you want your actor to say
      </p>
      <textarea
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}  // Changed to onScriptChange
        placeholder="Type exactly what you want the actor to say... ie 'Buy this supplement now to start getting bigger '"
        rows={8}
        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-green-500 focus:outline-none transition resize-none text-sm"
      />
      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
        <span>{script.length} characters</span>
        {/* <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-white/10 rounded transition">
            <Wand2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:bg-white/10 rounded transition">
            <Play className="w-3.5 h-3.5" />
          </button>
        </div> */}
      </div>
    </div>
  )
}