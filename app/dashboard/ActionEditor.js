'use client'

export default function ActionEditor({ action, onChange }) {
  return (
    <div>
      <label className="text-sm font-semibold mb-2 block">Action (Optional)</label>
      <p className="text-xs text-gray-400 mb-3">
        What skills you want your actor to do
      </p>
      <textarea
        value={action}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Describe the gestures, expressions, or actions you want... ie 'Smiling and flexing muscles while holding a dumbbell'"
        rows={4}
        className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-green-500 focus:outline-none transition resize-none text-sm"
      />
    </div>
  )
}