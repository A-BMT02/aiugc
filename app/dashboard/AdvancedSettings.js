'use client'

import { ChevronRight } from 'lucide-react'
import { LANGUAGES, ASPECT_RATIOS } from '../../lib/constants'

export default function AdvancedSettings({ 
  language, 
  onLanguageChange, 
  aspectRatio, 
  onAspectRatioChange 
}) {
  return (
    <details className="group" open>
      <summary className="cursor-pointer text-sm font-semibold flex items-center justify-between py-2">
        Advanced Settings
        <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
      </summary>
      <div className="mt-3 space-y-4">
        <div>
          <label className="text-xs text-gray-400 mb-2 block">Language</label>
          <select 
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-green-500 focus:outline-none transition text-sm"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* <label className="text-xs text-gray-400 mb-2 block">Aspect Ratio</label>
          <div className="flex gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio}
                onClick={() => onAspectRatioChange(ratio)}
                className={`flex-1 px-3 py-2 border rounded-lg transition text-xs font-semibold ${
                  aspectRatio === ratio
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : 'bg-white/5 border-white/10 hover:border-white/30'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </details>
  )
}