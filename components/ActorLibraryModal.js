'use client'

import { useState } from 'react'
import { X, Search, Filter, Sparkles, User } from 'lucide-react'
import { ACTORS } from '../lib/constants'

export default function ActorLibraryModal({ isOpen, onClose, onSelectActor, selectedActor }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Actors', count: ACTORS.length },
    { id: 'female', name: 'Female', count: ACTORS.filter(a => a.category === 'female').length },
    { id: 'male', name: 'Male', count: ACTORS.filter(a => a.category === 'male').length },
  ]

  const filteredActors = ACTORS.filter(actor => {
    const matchesSearch = actor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || actor.category === filterCategory
    return matchesSearch && matchesCategory
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
      <div className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-2xl shadow-2xl max-h-[85vh] flex flex-col animate-scale-in border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold">Actor Library</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-white/10 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search actors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-green-500 focus:outline-none transition"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  filterCategory === category.id
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Actor Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-4 gap-4">
            {filteredActors.map((actor) => (
              <button
                key={actor.id}
                onClick={() => handleSelectActor(actor)}
                className={`group relative aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all ${
                  selectedActor === actor.id
                    ? 'border-green-500 ring-2 ring-green-500/50 scale-105'
                    : 'border-white/10 hover:border-green-500/50 hover:scale-105'
                }`}
              >
                {/* Actor Image - Show real image if available, otherwise emoji */}
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
                    {/* Placeholder gradient background */}
                    <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
                    
                    {/* Actor thumbnail/emoji */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl">
                      {actor.thumbnail}
                    </div>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Selected Indicator */}
                {selectedActor === actor.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 transition-colors"></div>

                {/* Actor Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="font-bold text-sm mb-0.5">{actor.name}</div>
                  <div className="text-xs text-gray-300 capitalize">{actor.style}</div>
                </div>
              </button>
            ))}
          </div>

          {/* No Results */}
          {filteredActors.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">No actors found</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span>{filteredActors.length} actors available</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedActor) onClose()
              }}
              disabled={!selectedActor}
              className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select Actor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}