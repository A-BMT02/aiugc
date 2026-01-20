'use client'

import { useState } from 'react'
import { X, Search, Filter, Sparkles, User } from 'lucide-react'
import { ACTORS } from '../lib/constants'

export default function ActorLibraryModal({ isOpen, onClose, onSelectActor, selectedActor }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterRace, setFilterRace] = useState('all')


  const categories = [
    { id: 'all', name: 'All Actors', count: ACTORS.length },
    { id: 'Female', name: 'Female', count: ACTORS.filter(a => a.category === 'Female').length },
    { id: 'Male', name: 'Male', count: ACTORS.filter(a => a.category === 'Male').length },
  ]

  const races = [
    { id: 'all', name: 'All Races', count: ACTORS.length },
    { id: 'Caucasian', name: 'Caucasian', count: ACTORS.filter(a => a.Race === 'Caucasian').length },
    { id: 'Black', name: 'Black', count: ACTORS.filter(a => a.Race === 'Black').length },
    { id: 'Asian', name: 'Asian', count: ACTORS.filter(a => a.Race === 'Asian').length },
  ]
  

  const filteredActors = ACTORS.filter(actor => {
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || actor.category === filterCategory
    const matchesRace = filterRace === 'all' || actor.Race === filterRace
  
    return matchesSearch && matchesCategory && matchesRace
  })
  

  const handleSelectActor = (actor) => {
    onSelectActor(actor.id)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
  
      {/* Modal */}
      <div className="relative w-full max-w-sm sm:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-[#1a1a1a] rounded-xl sm:rounded-2xl shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col animate-scale-in border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-white/10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Actor Library</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
  
        {/* Search and Filter */}
        <div className="p-4 sm:p-5 lg:p-6 border-b border-white/10 space-y-3 sm:space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search actors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl focus:border-green-500 focus:outline-none transition text-sm sm:text-base"
            />
          </div>
  
          {/* Category Filters - Scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap flex-shrink-0 ${
                  filterCategory === category.id
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Race Filters */}
<div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
  {races.map((race) => (
    <button
      key={race.id}
      onClick={() => setFilterRace(race.id)}
      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap flex-shrink-0 ${
        filterRace === race.id
          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
          : 'bg-white/5 text-gray-400 hover:bg-white/10'
      }`}
    >
      {race.name} ({race.count})
    </button>
  ))}
</div>

        </div>
  
        {/* Actor Grid - Responsive columns */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredActors.map((actor) => (
              <button
                key={actor.id}
                onClick={() => handleSelectActor(actor)}
                className={`group relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                  selectedActor === actor.id
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
                    <div className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl lg:text-6xl">
                      {actor.thumbnail}
                    </div>
                  </div>
                )}
  
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
  
                {/* Selected Indicator */}
                {selectedActor === actor.id && (
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full"></div>
                  </div>
                )}
  
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors"></div>
  
                {/* Actor Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                  <div className="font-bold text-xs sm:text-sm mb-0.5 truncate">{actor.name}</div>
                  <div className="text-[10px] sm:text-xs text-gray-300 capitalize truncate">{actor.style}</div>
                </div>
              </button>
            ))}
          </div>
  
          {/* No Results */}
          {filteredActors.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <User className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-gray-600" />
              <p className="text-sm sm:text-base text-gray-400">No actors found</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
  
        {/* Footer */}
        <div className="p-4 sm:p-5 lg:p-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{filteredActors.length} actors available</span>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedActor) onClose()
              }}
              disabled={!selectedActor}
              className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-green-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select Actor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}