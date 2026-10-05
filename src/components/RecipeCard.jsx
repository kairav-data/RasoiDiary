import React from 'react';
import { Heart, Clock, Users, Flame, ChefHat, Sparkles, Star } from 'lucide-react';
import { soundManager } from '../utils/sound';

export default function RecipeCard({
  recipe,
  onSelectRecipe,
  onStartCooking,
  onToggleFavorite
}) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  const getDietBadge = (diet) => {
    if (diet === 'Veg') {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          Veg
        </span>
      );
    }
    if (diet === 'Jain Option') {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Jain
        </span>
      );
    }
    if (diet === 'Non-Veg') {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-800 border border-red-300">
          <span className="w-2 h-2 rounded-full bg-red-600"></span>
          Non-Veg
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
        {diet}
      </span>
    );
  };

  const getSpiceBadge = (spice) => {
    switch (spice) {
      case 'Mild':
        return <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Mild 🌿</span>;
      case 'Medium':
        return <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">Medium 🌶️</span>;
      case 'Spicy':
        return <span className="text-[11px] font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">Spicy 🌶️🌶️</span>;
      case 'Desi Teekha':
        return <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200 animate-pulse">Desi Teekha 🔥</span>;
      default:
        return null;
    }
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    soundManager.playTick();
    onToggleFavorite(recipe.id);
  };

  return (
    <div 
      onClick={() => onSelectRecipe(recipe)}
      className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-amber-100/90 shadow-xs hover:shadow-xl hover:shadow-orange-950/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
    >
      {/* Recipe Image Banner */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

        {/* Top Badges: Diet & Favorite */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {getDietBadge(recipe.diet)}
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-stone-800 shadow-xs">
              {recipe.region}
            </span>
          </div>

          <button
            onClick={handleHeartClick}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-700 hover:text-rose-600 transition-transform active:scale-90 shadow-md"
            title={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                recipe.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-400 hover:text-rose-500'
              }`} 
            />
          </button>
        </div>

        {/* Bottom Banner inside Image: Hindi Title & Spice Level */}
        <div className="absolute bottom-3 inset-x-3 flex items-end justify-between">
          {recipe.hindiTitle && (
            <span className="font-ethnic text-amber-200 text-lg drop-shadow-md">
              {recipe.hindiTitle}
            </span>
          )}
          <div className="ml-auto">
            {getSpiceBadge(recipe.spiceLevel)}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Title */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-serif-heading font-bold text-lg text-stone-900 group-hover:text-orange-700 transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          {recipe.rating && (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded-md shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{recipe.rating}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
          {recipe.description}
        </p>

        {/* Dadi Maa's Secret Tip Snippet */}
        {recipe.secretTip && (
          <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-2.5 mb-4 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 italic line-clamp-1">
              <span className="font-bold not-italic">Secret Tip: </span>
              {recipe.secretTip}
            </p>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
          
          {/* Prep/Cook Info */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-stone-600 font-medium">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              {totalTime}m
            </span>
            <span className="flex items-center gap-1 text-stone-600 font-medium">
              <Users className="w-3.5 h-3.5 text-amber-700" />
              {recipe.servings} Servings
            </span>
          </div>

          {/* Quick Cook Mode Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playTick();
              onStartCooking(recipe);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-xs hover:shadow-md transition-all active:scale-95"
            title="Open Interactive Kitchen Cooking Mode"
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Cook</span>
          </button>

        </div>

      </div>
    </div>
  );
}
