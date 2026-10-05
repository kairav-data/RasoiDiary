import React from 'react';
import { 
  UtensilsCrossed, 
  CalendarDays, 
  ShoppingCart, 
  Sparkles, 
  PlusCircle, 
  User, 
  Download,
  BookOpen
} from 'lucide-react';

export default function Navbar({ 
  profile, 
  activeTab, 
  setActiveTab, 
  onOpenNewRecipe, 
  onOpenMealPlanner, 
  onOpenGrocery, 
  onOpenMasalaDabba, 
  onOpenProfile, 
  onExportRecipes,
  groceryCount 
}) {
  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Kitchen Identity */}
          <div 
            onClick={() => setActiveTab('recipes')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 p-0.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl">
                {profile.avatarEmoji || '👩‍🍳'}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-heading font-bold text-xl sm:text-2xl text-stone-900 tracking-tight">
                  {profile.kitchenName || 'Rasoi Diary'}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full border border-amber-200">
                  {profile.name ? `${profile.name}'s Kitchen` : 'Desi Flavors'}
                </span>
              </div>
              <p className="text-xs text-amber-800/80 font-medium flex items-center gap-1 font-serif-heading italic">
                <span>स्वाद और सुगंध</span>
                <span className="text-stone-300">•</span>
                <span>Treasured Indian Recipes</span>
              </p>
            </div>
          </div>

          {/* Quick Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* All Recipes button */}
            <button
              onClick={() => setActiveTab('recipes')}
              className={`hidden md:flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'recipes' 
                  ? 'bg-amber-100 text-amber-900 shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Recipe Book</span>
            </button>

            {/* Meal Planner button */}
            <button
              onClick={onOpenMealPlanner}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-sm font-semibold rounded-xl text-stone-700 hover:text-amber-900 hover:bg-amber-50/80 transition-all border border-stone-200/70 hover:border-amber-200"
              title="Aaj Kya Banega? - Weekly Meal Planner"
            >
              <CalendarDays className="w-4 h-4 text-orange-600" />
              <span className="hidden sm:inline">Meal Plan</span>
            </button>

            {/* Grocery List button */}
            <button
              onClick={onOpenGrocery}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-sm font-semibold rounded-xl text-stone-700 hover:text-amber-900 hover:bg-amber-50/80 transition-all border border-stone-200/70 hover:border-amber-200"
              title="Bazaar Grocery Shopping List"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Bazaar List</span>
              {groceryCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-emerald-600 rounded-full">
                  {groceryCount}
                </span>
              )}
            </button>

            {/* Masala Dabba button */}
            <button
              onClick={onOpenMasalaDabba}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-sm font-semibold rounded-xl text-amber-900 bg-amber-50 hover:bg-amber-100 transition-all border border-amber-200/70"
              title="Indian Spice Box & Substitution Guide"
            >
              <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500/20" />
              <span className="hidden lg:inline">Masala Dabba</span>
            </button>

            {/* Add Recipe Button (Primary CTA) */}
            <button
              onClick={onOpenNewRecipe}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 rounded-xl shadow-sm shadow-orange-600/30 hover:shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Recipe</span>
            </button>

            {/* Profile & Settings */}
            <button
              onClick={onOpenProfile}
              className="p-2 text-stone-600 hover:text-amber-900 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200/70"
              title="Personalize Chef Profile & Kitchen Name"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Export Backup */}
            <button
              onClick={onExportRecipes}
              className="hidden xl:flex p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200/60"
              title="Download Recipe Backup (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
