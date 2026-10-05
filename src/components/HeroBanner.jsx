import React, { useState } from 'react';
import { Search, Sparkles, Shuffle, Flame, Heart, Clock, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/sound';

export const POPULAR_CHIPS = [
  'All',
  'Paneer',
  'Dal & Lentils',
  'Biryani & Rice',
  'Quick (<30m)',
  'South Indian',
  'Street Food',
  'Chai & Nashta',
  'Mithai'
];

export default function HeroBanner({
  profile,
  recipes,
  searchQuery,
  setSearchQuery,
  selectedChip,
  setSelectedChip,
  onPickRandomRecipe,
  favoritesCount
}) {
  const [isRolling, setIsRolling] = useState(false);

  const handleSurpriseMe = () => {
    setIsRolling(true);
    soundManager.playTick();
    
    // Confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ea580c', '#f59e0b', '#10b981', '#fbbf24']
    });

    setTimeout(() => {
      setIsRolling(false);
      onPickRandomRecipe();
      soundManager.playSuccess();
    }, 400);
  };

  const vegCount = recipes.filter(r => r.diet === 'Veg' || r.diet === 'Jain Option').length;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#FEF7EE] via-[#FDF3E5] to-[#FCECDC] border-b border-amber-200/60 pt-8 pb-10 px-4 sm:px-6 lg:px-8">
      {/* Decorative Traditional Paisley / Mandala Accents */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-10 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        
        {/* Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-amber-200/80 shadow-xs mb-4">
          <span className="text-base">🪔</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 font-serif-heading">
            Namaste, {profile.name || 'Chef'}! Welcome to your culinary sanctuary
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-3">
          Every Spice Tells a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700">Heartfelt Story</span>
        </h1>

        {/* Subtitle / Bio */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-stone-600 font-medium mb-8">
          {profile.tagline || 'Cherished family recipes, fragrant spices, and timeless regional Indian delicacies.'}
        </p>

        {/* Action Bar: Search Input & "Aaj Kya Banaye?" Randomizer */}
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3 mb-6">
          
          {/* Main Search Bar */}
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-700/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by recipe, spice (e.g. Kasuri Methi), cuisine, or dish..."
              className="w-full pl-11 pr-4 py-3.5 bg-white/95 backdrop-blur-sm rounded-2xl border border-amber-200/90 text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 text-sm sm:text-base shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 px-2 py-1 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* "Aaj Kya Banaye?" (Surprise Me) Button */}
          <button
            onClick={handleSurpriseMe}
            disabled={isRolling}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm sm:text-base shadow-md shadow-orange-500/20 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            title="Randomly pick a recipe for today!"
          >
            <Shuffle className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>Aaj Kya Banaye?</span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">🎲</span>
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-6">
          {POPULAR_CHIPS.map(chip => (
            <button
              key={chip}
              onClick={() => setSelectedChip(chip === selectedChip ? 'All' : chip)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                selectedChip === chip
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'bg-white/80 text-stone-600 hover:bg-amber-100/70 hover:text-amber-900 border border-amber-200/60'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Quick Kitchen Stats Pills */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-3 border-t border-amber-200/50 text-xs sm:text-sm text-stone-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-orange-600" />
            <span><strong className="text-stone-900">{recipes.length}</strong> Recipes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
            <span><strong className="text-stone-900">{vegCount}</strong> Shakahari (Veg)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span><strong className="text-stone-900">{favoritesCount}</strong> Favorites</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Secret Tip in Every Dish</span>
          </div>
        </div>

      </div>
    </div>
  );
}
