import React from 'react';
import { Filter, Flame, Clock, Heart, SlidersHorizontal, RotateCcw } from 'lucide-react';

export const REGIONS = [
  'All Regions',
  'North Indian',
  'South Indian',
  'West Indian',
  'Street Food',
  'Beverage',
  'Dessert'
];

export const DIETS = [
  'All Diets',
  'Veg',
  'Jain Option',
  'Non-Veg',
  'Vegan'
];

export const SPICE_LEVELS = [
  'All Heat',
  'Mild',
  'Medium',
  'Spicy',
  'Desi Teekha'
];

export default function FilterBar({
  selectedRegion,
  setSelectedRegion,
  selectedDiet,
  setSelectedDiet,
  selectedSpice,
  setSelectedSpice,
  quickOnly,
  setQuickOnly,
  favoritesOnly,
  setFavoritesOnly,
  sortBy,
  setSortBy,
  onResetFilters,
  hasActiveFilters
}) {
  return (
    <div className="bg-white border-b border-amber-100/90 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left Side: Region Tabs (horizontal scrollable on mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-amber-600" />
            Region:
          </span>
          {REGIONS.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-all cursor-pointer ${
                selectedRegion === region
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-50 text-stone-600 hover:bg-amber-50 hover:text-amber-900 border border-stone-200/70'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Right Side: Detailed Filter Controls & Sorting */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          
          {/* Diet Dropdown */}
          <select
            value={selectedDiet}
            onChange={(e) => setSelectedDiet(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 bg-stone-50 border border-stone-200/80 rounded-lg text-stone-700 hover:border-amber-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          >
            {DIETS.map(diet => (
              <option key={diet} value={diet}>{diet}</option>
            ))}
          </select>

          {/* Spice Level Dropdown */}
          <select
            value={selectedSpice}
            onChange={(e) => setSelectedSpice(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 bg-stone-50 border border-stone-200/80 rounded-lg text-stone-700 hover:border-amber-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          >
            {SPICE_LEVELS.map(spice => (
              <option key={spice} value={spice}>
                {spice === 'Desi Teekha' ? '🔥 Desi Teekha' : spice}
              </option>
            ))}
          </select>

          {/* Quick (<30m) Toggle */}
          <button
            onClick={() => setQuickOnly(!quickOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              quickOnly
                ? 'bg-orange-100 text-orange-800 border-orange-300'
                : 'bg-stone-50 text-stone-600 border-stone-200/80 hover:bg-stone-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>&le; 30 Mins</span>
          </button>

          {/* Favorites Only Toggle */}
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
              favoritesOnly
                ? 'bg-rose-100 text-rose-800 border-rose-300'
                : 'bg-stone-50 text-stone-600 border-stone-200/80 hover:bg-stone-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-rose-600 text-rose-600' : 'text-stone-400'}`} />
            <span>Favorites</span>
          </button>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 bg-stone-50 border border-stone-200/80 rounded-lg text-stone-700 hover:border-amber-300 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          >
            <option value="rating">Top Rated ⭐</option>
            <option value="quickest">Quickest Cook ⏱️</option>
            <option value="alphabetical">Alphabetical (A-Z)</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-red-700 px-2 py-1.5 rounded-md hover:bg-stone-100 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
}
