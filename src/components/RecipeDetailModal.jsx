import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChefHat, 
  ShoppingCart, 
  Printer, 
  Edit3, 
  Trash2, 
  Clock, 
  Users, 
  Sparkles, 
  Check, 
  Plus, 
  Minus, 
  Flame, 
  Heart,
  Share2,
  CheckCircle2,
  ArrowLeft,
  Home
} from 'lucide-react';
import { scaleIngredient } from '../utils/scaler';
import { soundManager } from '../utils/sound';

export default function RecipeDetailModal({
  recipe,
  onClose,
  onStartCooking,
  onEditRecipe,
  onDeleteRecipe,
  onToggleFavorite,
  onAddIngredientsToGrocery
}) {
  const [servings, setServings] = useState(recipe?.servings || 4);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [addedGroceryNotice, setAddedGroceryNotice] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  const handleServingChange = (delta) => {
    const next = Math.max(1, servings + delta);
    setServings(next);
    soundManager.playTick();
  };

  const toggleIngredientCheck = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleAddAllGrocery = () => {
    // Pass ingredients scaled to current servings
    const items = recipe.ingredients.map(ing => ({
      name: ing.item,
      amount: scaleIngredient(ing.amount, recipe.servings, servings),
      unit: ing.unit,
      category: ing.category || 'Pantry',
      recipeTitle: recipe.title
    }));
    onAddIngredientsToGrocery(items);
    setAddedGroceryNotice(true);
    soundManager.playSuccess();
    setTimeout(() => setAddedGroceryNotice(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this delicious Indian recipe for ${recipe.title}: ${recipe.description}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${recipe.title} - ${recipe.description}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-6 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 my-4 sm:my-6 print-container flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Top Header Bar with Prominent Back to Home / Recipes Button */}
        <div className="sticky top-0 z-30 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-6 py-3 flex items-center justify-between no-print shadow-xs">
          {/* Back to Home / Recipes Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100/80 text-amber-950 font-bold text-xs sm:text-sm border border-amber-200/90 shadow-xs hover:shadow-sm transition-all hover:-translate-x-0.5 cursor-pointer active:scale-95"
            title="Return to Home Page and Recipe List"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span className="hidden xs:inline">← Back to Recipes</span>
            <span className="xs:hidden">← Back</span>
          </button>

          {/* Right Controls: Share, Favorite, Close Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-xl bg-white hover:bg-amber-50 text-stone-700 border border-stone-200/80 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Share Recipe"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                soundManager.playTick();
                onToggleFavorite(recipe.id);
              }}
              className="w-9 h-9 rounded-xl bg-white hover:bg-amber-50 border border-stone-200/80 flex items-center justify-center transition-all cursor-pointer shadow-xs"
              title="Toggle Favorite"
            >
              <Heart 
                className={`w-4 h-4 transition-colors ${recipe.isFavorite ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} 
              />
            </button>
            
            {/* Clear Close Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer active:scale-95"
              title="Close modal and return to home"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Hero Banner with Photo */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-stone-900 shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/40 to-transparent" />

          {/* Title & Metadata inside Banner */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/90 text-stone-950 uppercase tracking-wide">
                {recipe.region}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs text-white">
                {recipe.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs text-white">
                {recipe.diet}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/80 text-white">
                Spice: {recipe.spiceLevel}
              </span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="font-serif-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                {recipe.title}
              </h2>
              {recipe.hindiTitle && (
                <span className="font-ethnic text-amber-300 text-xl sm:text-2xl">
                  {recipe.hindiTitle}
                </span>
              )}
            </div>
            
            <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 mt-1 max-w-2xl font-light">
              {recipe.description}
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="bg-[#FAF6F0] border-b border-amber-200/70 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 no-print shrink-0">
          
          {/* Quick Metrics */}
          <div className="flex items-center gap-4 sm:gap-5 text-xs sm:text-sm font-semibold text-stone-700 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>Prep: {recipe.prepTime}m | Cook: {recipe.cookTime}m ({totalTime}m total)</span>
            </div>

            {/* Dynamic Servings Controls */}
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
              <span className="text-stone-500 font-normal">Servings:</span>
              <button
                onClick={() => handleServingChange(-1)}
                className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold cursor-pointer"
                title="Decrease servings"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-bold text-amber-900 px-1">{servings}</span>
              <button
                onClick={() => handleServingChange(1)}
                className="w-6 h-6 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center justify-center font-bold cursor-pointer"
                title="Increase servings"
              >
                <Plus className="w-3 h-3" />
              </button>
              {servings !== recipe.servings && (
                <span className="text-[10px] text-amber-700 italic ml-1">
                  (auto-scaled)
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Start Cooking Button */}
            <button
              onClick={() => {
                soundManager.playTick();
                onStartCooking({ ...recipe, targetServings: servings });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-orange-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <ChefHat className="w-4 h-4" />
              <span>Start Kitchen Mode</span>
            </button>

            {/* Add to Grocery */}
            <button
              onClick={handleAddAllGrocery}
              disabled={addedGroceryNotice}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                addedGroceryNotice
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-white text-stone-700 hover:text-emerald-800 border-stone-200 hover:border-emerald-300'
              }`}
              title="Add all ingredients to Bazaar Grocery list"
            >
              {addedGroceryNotice ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  <span>Add to Bazaar List</span>
                </>
              )}
            </button>

            {/* Print Recipe */}
            <button
              onClick={handlePrint}
              className="p-2 bg-white text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50 cursor-pointer"
              title="Print Recipe"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Edit */}
            <button
              onClick={() => onEditRecipe(recipe)}
              className="p-2 bg-white text-stone-600 hover:text-stone-900 border border-stone-200 rounded-xl hover:bg-stone-50 cursor-pointer"
              title="Edit Recipe"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Delete */}
            <button
              onClick={() => onDeleteRecipe(recipe.id)}
              className="p-2 bg-white text-stone-400 hover:text-rose-600 border border-stone-200 rounded-xl hover:bg-rose-50 cursor-pointer"
              title="Delete Recipe"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Content Body: 2 Columns (Ingredients vs Step Instructions) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Ingredients (5 cols) */}
          <div className="md:col-span-5 flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
              <h3 className="font-serif-heading font-bold text-lg text-stone-900 flex items-center gap-2">
                <span>सामग्री • Ingredients</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {recipe.ingredients.length} items ({servings} servings)
              </span>
            </div>

            <p className="text-[11px] text-stone-500 mb-3 italic">
              Tap any item to tick it off as prepared on your counter.
            </p>

            <ul className="space-y-2 mb-6">
              {recipe.ingredients.map((ing, idx) => {
                const scaledAmount = scaleIngredient(ing.amount, recipe.servings, servings);
                const isChecked = checkedIngredients[idx];

                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-stone-100/70 border-stone-200 text-stone-400 line-through'
                        : 'bg-white hover:bg-amber-50/50 border-amber-100 text-stone-800'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-stone-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 text-xs sm:text-sm">
                      <span className="font-bold text-stone-900 mr-1.5">
                        {scaledAmount} {ing.unit}
                      </span>
                      <span>{ing.item}</span>
                      {ing.category && (
                        <span className="ml-2 text-[10px] font-semibold text-stone-400 uppercase">
                          • {ing.category}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Dadi Maa's Secret Tip */}
            {recipe.secretTip && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 shadow-xs mt-auto">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1.5 font-serif-heading">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>दादी माँ का नुस्खा • Chef's Secret Tip</span>
                </div>
                <p className="text-xs text-amber-950 font-serif-heading leading-relaxed italic">
                  "{recipe.secretTip}"
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Step-by-Step Instructions (7 cols) */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
              <h3 className="font-serif-heading font-bold text-lg text-stone-900 flex items-center gap-2">
                <span>बनाने की विधि • Step-by-Step Method</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {recipe.instructions.length} steps
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {recipe.instructions.map((stepItem, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50/70 rounded-2xl p-4 border border-stone-200/80 hover:border-amber-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-extrabold font-serif-heading">
                      {stepItem.step || idx + 1}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-stone-900 font-serif-heading ml-2 flex-1">
                      {stepItem.title}
                    </span>
                    {stepItem.durationMinutes && (
                      <span className="text-xs font-semibold text-orange-800 bg-orange-100/70 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-700" />
                        {stepItem.durationMinutes} min
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-8">
                    {stepItem.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Nutrition / Wholesome Note */}
            {recipe.nutritionNote && (
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-3">
                <span className="text-lg">🌿</span>
                <p className="text-xs text-emerald-900 font-medium">
                  <strong>Wholesome Goodness: </strong>
                  {recipe.nutritionNote}
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Bottom Navigation & Close Bar */}
        <div className="bg-[#FAF6F0] border-t border-amber-200/80 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 no-print shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-stone-800 font-bold text-xs sm:text-sm border border-stone-300 hover:border-amber-400 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>← Back to Home / All Recipes</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                soundManager.playTick();
                onStartCooking({ ...recipe, targetServings: servings });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-orange-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <ChefHat className="w-4 h-4" />
              <span>Start Kitchen Cooking Mode</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
