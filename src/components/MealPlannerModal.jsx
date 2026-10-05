import React, { useState } from 'react';
import { 
  X, 
  CalendarDays, 
  ShoppingCart, 
  Sparkles, 
  Check, 
  RotateCcw, 
  Utensils, 
  Coffee, 
  Sun, 
  Moon,
  Shuffle
} from 'lucide-react';
import { soundManager } from '../utils/sound';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function MealPlannerModal({
  recipes,
  mealPlan,
  onSaveMealPlan,
  onAddIngredientsToGrocery,
  onClose,
  onSelectRecipe
}) {
  const [currentPlan, setCurrentPlan] = useState(mealPlan);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [groceryNotice, setGroceryNotice] = useState(false);

  const getRecipe = (id) => recipes.find(r => r.id === id);

  const handleSetMeal = (day, mealType, recipeId) => {
    soundManager.playTick();
    const updated = {
      ...currentPlan,
      [day]: {
        ...(currentPlan[day] || {}),
        [mealType]: recipeId
      }
    };
    setCurrentPlan(updated);
    onSaveMealPlan(updated);
  };

  const handleAutoFillWeek = () => {
    soundManager.playTick();
    const breakfastList = recipes.filter(r => r.category === 'Breakfast' || r.category === 'Beverage');
    const mainList = recipes.filter(r => r.category === 'Main Course' || r.category === 'Rice & Biryani');
    
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]?.id || '';

    const newPlan = {};
    DAYS.forEach(day => {
      newPlan[day] = {
        breakfast: getRandom(breakfastList.length ? breakfastList : recipes),
        lunch: getRandom(mainList.length ? mainList : recipes),
        dinner: getRandom(mainList.length ? mainList : recipes)
      };
    });

    setCurrentPlan(newPlan);
    onSaveMealPlan(newPlan);
    soundManager.playSuccess();
  };

  const handleAddWeekToGrocery = () => {
    // Collect all recipe IDs in current week plan
    const recipeIds = new Set();
    Object.values(currentPlan).forEach(dayObj => {
      if (dayObj.breakfast) recipeIds.add(dayObj.breakfast);
      if (dayObj.lunch) recipeIds.add(dayObj.lunch);
      if (dayObj.dinner) recipeIds.add(dayObj.dinner);
    });

    const allItems = [];
    recipeIds.forEach(id => {
      const r = getRecipe(id);
      if (r && r.ingredients) {
        r.ingredients.forEach(ing => {
          allItems.push({
            name: ing.item,
            amount: ing.amount,
            unit: ing.unit,
            category: ing.category || 'Pantry',
            recipeTitle: r.title
          });
        });
      }
    });

    onAddIngredientsToGrocery(allItems);
    setGroceryNotice(true);
    soundManager.playSuccess();
    setTimeout(() => setGroceryNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-200/60 my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#FAF6F0] border-b border-amber-200/70 px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-serif-heading font-extrabold text-xl sm:text-2xl text-stone-900 flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-orange-600" />
              <span>आज क्या बनेगा? • Weekly Meal Planner</span>
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Eliminate daily kitchen indecision. Plan healthy and flavorful Indian meals for the week.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoFillWeek}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors"
              title="Surprise me with a balanced meal schedule!"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Auto-Suggest Week</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week Tab Strip */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 py-2 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {DAYS.map(day => {
            const hasMeals = currentPlan[day]?.breakfast || currentPlan[day]?.lunch || currentPlan[day]?.dinner;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                  selectedDay === day
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-amber-50 hover:text-amber-900 border border-stone-200/80'
                }`}
              >
                <span>{day}</span>
                {hasMeals && (
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ml-1.5 ${selectedDay === day ? 'bg-amber-300' : 'bg-emerald-500'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Day's Meal Slots Detail */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="font-serif-heading font-bold text-lg text-stone-900">
              Menu for {selectedDay}
            </h3>
            <span className="text-xs text-stone-500 italic">
              Select any dish from your collection
            </span>
          </div>

          {/* 3 Meals: Breakfast, Lunch, Dinner */}
          {[
            { key: 'breakfast', title: 'नाश्ता • Breakfast', icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-50' },
            { key: 'lunch', title: 'दोपहर का खाना • Lunch', icon: Sun, color: 'text-orange-600', bg: 'bg-orange-50' },
            { key: 'dinner', title: 'रात का खाना • Dinner', icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          ].map(({ key, title, icon: Icon, color, bg }) => {
            const selectedRecipeId = currentPlan[selectedDay]?.[key] || '';
            const assignedRecipe = getRecipe(selectedRecipeId);

            return (
              <div
                key={key}
                className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      {title}
                    </h4>
                    {assignedRecipe ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <span 
                          onClick={() => {
                            onClose();
                            onSelectRecipe(assignedRecipe);
                          }}
                          className="font-serif-heading font-bold text-sm sm:text-base text-stone-900 hover:text-orange-700 cursor-pointer underline decoration-dotted"
                        >
                          {assignedRecipe.title}
                        </span>
                        {assignedRecipe.hindiTitle && (
                          <span className="text-xs text-amber-800 font-ethnic">
                            ({assignedRecipe.hindiTitle})
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-stone-400 italic mt-0.5">
                        Nothing planned yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Dropdown to assign */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={selectedRecipeId}
                    onChange={(e) => handleSetMeal(selectedDay, key, e.target.value)}
                    className="flex-1 sm:w-56 text-xs font-medium px-3 py-2 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="">-- Choose Recipe --</option>
                    {recipes.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.title} ({r.category})
                      </option>
                    ))}
                  </select>

                  {selectedRecipeId && (
                    <button
                      onClick={() => handleSetMeal(selectedDay, key, '')}
                      className="p-2 text-stone-400 hover:text-red-500 rounded-lg"
                      title="Clear slot"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick Week Overview Cards */}
          <div className="pt-4 border-t border-stone-200">
            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              Full Week Glimpse
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-xs">
              {DAYS.map(day => (
                <div 
                  key={day} 
                  onClick={() => setSelectedDay(day)}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedDay === day 
                      ? 'bg-amber-100 border-amber-300 shadow-xs' 
                      : 'bg-stone-50 border-stone-200/70 hover:bg-stone-100'
                  }`}
                >
                  <p className="font-bold text-stone-900">{day.slice(0, 3)}</p>
                  <div className="mt-1 space-y-0.5 text-[10px] text-stone-500 truncate">
                    <p className="truncate">☕ {getRecipe(currentPlan[day]?.breakfast)?.title || '-'}</p>
                    <p className="truncate">☀️ {getRecipe(currentPlan[day]?.lunch)?.title || '-'}</p>
                    <p className="truncate">🌙 {getRecipe(currentPlan[day]?.dinner)?.title || '-'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#FAF6F0] border-t border-amber-200/70 px-6 py-3.5 flex items-center justify-between shrink-0">
          <p className="text-xs text-stone-500">
            Changes save automatically to your personal rasoi diary.
          </p>

          <button
            onClick={handleAddWeekToGrocery}
            disabled={groceryNotice}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              groceryNotice
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white shadow-md active:scale-95'
            }`}
          >
            {groceryNotice ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4 text-emerald-400" />}
            <span>{groceryNotice ? 'Added to Bazaar List!' : 'Add Week to Grocery List'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
