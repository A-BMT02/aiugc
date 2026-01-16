'use client'

export default function AdvancedSettings({
  language,
  onLanguageChange,
  aspectRatio,
  onAspectRatioChange,
}) {
  return (
    <div>
      <label className="text-sm font-semibold mb-3 block">Advanced Settings</label>

      {/* Language Selection */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 mb-2 block">Language</label>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-green-500 focus:outline-none transition text-sm"
        >
          <option value="en">English</option>

        </select>
      </div>

      {/* Aspect Ratio Selection */}
      {/* <div>
        <label className="text-xs text-gray-400 mb-2 block">Aspect Ratio</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onAspectRatioChange('9:16')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${
              aspectRatio === '9:16'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            9:16
            <span className="block text-[10px] text-gray-500">Vertical</span>
          </button>
          <button
            onClick={() => onAspectRatioChange('16:9')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${
              aspectRatio === '16:9'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            16:9
            <span className="block text-[10px] text-gray-500">Horizontal</span>
          </button>
          <button
            onClick={() => onAspectRatioChange('1:1')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition ${
              aspectRatio === '1:1'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
            }`}
          >
            1:1
            <span className="block text-[10px] text-gray-500">Square</span>
          </button>
        </div>
      </div> */}
    </div>
  )
}