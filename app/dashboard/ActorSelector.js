'use client'

import { Sparkles } from 'lucide-react'
import { ACTORS } from '../../lib/constants'

export default function ActorSelector({
  selectedAvatar,
  onSelectActor,
  onOpenActorLibrary,
  onOpenMagicEdit,
}) {
  // Get selected actor data
  const selectedActorData = ACTORS.find(a => a.id === selectedAvatar)



  return (
    <div>
      <label className="text-xs sm:text-sm font-semibold mb-3 block">Select Actor from Library</label>

      {/* Quick Preview Grid - 6 actors */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
        {ACTORS.slice(0, 6).map((actor) => {
          const isSelected = selectedAvatar === actor.id
          
          // Debug log for each actor
          if (isSelected) {
            
          }
          
          return (
            <button
              key={actor.id}
              onClick={() => {
               
                onSelectActor(actor.id)
              }}
              className={`group relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                isSelected
                  ? 'border-green-500 ring-2 ring-green-500/50 scale-105'
                  : 'border-white/10 hover:border-green-500/50 hover:scale-105'
              }`}
            >
              {/* Actor Image */}
              {actor.imageUrl ? (
                <div className="absolute inset-0">
                  <img 
                    src={actor.imageUrl} 
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800">
                  <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl">
                    {actor.thumbnail}
                  </div>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors"></div>

              {/* Actor Info */}
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <div className="font-bold text-[10px] sm:text-xs mb-0.5 truncate">{actor.name}</div>
                <div className="text-[9px] sm:text-[10px] text-gray-300 capitalize truncate">{actor.style}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* View All Button */}
      <button
        onClick={onOpenActorLibrary}
        className="w-full py-2.5 sm:py-3 text-sm text-green-400 hover:text-green-300 transition font-semibold"
      >
        View All {ACTORS.length} Actors →
      </button>

      {/* Magic Edit Button - Only show if actor selected */}
      {selectedActorData && (
        <button
          onClick={onOpenMagicEdit}
          className="w-full mt-3 py-2.5 sm:py-3 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg transition text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Magic Edit Actor
        </button>
      )}

      {/* Info */}
      <div className="mt-4 bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
        <p className="text-xs text-blue-400 font-semibold mb-1">💡 Pro Tip</p>
        <p className="text-xs text-gray-400">
          Use Magic Edit to add products or customize any actor from the library!
        </p>
      </div>
    </div>
  )
}