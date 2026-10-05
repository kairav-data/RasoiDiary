import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner, { POPULAR_CHIPS } from './components/HeroBanner';
import FilterBar from './components/FilterBar';
import RecipeCard from './components/RecipeCard';
import RecipeDetailModal from './components/RecipeDetailModal';
import CookingModeModal from './components/CookingModeModal';
import RecipeFormModal from './components/RecipeFormModal';
import MealPlannerModal from './components/MealPlannerModal';
import GroceryListModal from './components/GroceryListModal';
import MasalaDabbaModal from './components/MasalaDabbaModal';
import ChefProfileModal from './components/ChefProfileModal';
import { 
  loadRecipes, 
  saveRecipes, 
  loadProfile, 
  saveProfile, 
  loadGroceryList, 
  saveGroceryList, 
  loadMealPlan, 
  saveMealPlan, 
  exportRecipesToJson 
} from './utils/storage';
import { Heart, Sparkles, Plus, BookOpen, UtensilsCrossed } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from './utils/sound';

export default function App() {
  // Primary Data State (Persistent)
  const [recipes, setRecipes] = useState(loadRecipes);
  const [profile, setProfile] = useState(loadProfile);
  const [groceryList, setGroceryList] = useState(loadGroceryList);
  const [mealPlan, setMealPlan] = useState(loadMealPlan);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedDiet, setSelectedDiet] = useState('All Diets');
  const [selectedSpice, setSelectedSpice] = useState('All Heat');
  const [quickOnly, setQuickOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [selectedChip, setSelectedChip] = useState('All');

  // Modal State
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [cookingRecipe, setCookingRecipe] = useState(null);
  const [formRecipe, setFormRecipe] = useState(null); // null = closed, {} = new, obj = edit
  const [isMealPlannerOpen, setIsMealPlannerOpen] = useState(false);
  const [isGroceryOpen, setIsGroceryOpen] = useState(false);
  const [isMasalaDabbaOpen, setIsMasalaDabbaOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Filter Recipes Logic
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // 1. Text Search (title, hindi title, description, ingredients, spice)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = recipe.title?.toLowerCase().includes(q);
        const matchesHindi = recipe.hindiTitle?.toLowerCase().includes(q);
        const matchesDesc = recipe.description?.toLowerCase().includes(q);
        const matchesIngredients = recipe.ingredients?.some(i => i.item.toLowerCase().includes(q));
        const matchesRegion = recipe.region?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesHindi && !matchesDesc && !matchesIngredients && !matchesRegion) {
          return false;
        }
      }

      // 2. Chip Filter Shortcut
      if (selectedChip !== 'All') {
        if (selectedChip === 'Paneer') {
          const hasPaneer = recipe.title.toLowerCase().includes('paneer') || 
            recipe.ingredients.some(i => i.item.toLowerCase().includes('paneer'));
          if (!hasPaneer) return false;
        } else if (selectedChip === 'Dal & Lentils') {
          const hasDal = recipe.title.toLowerCase().includes('dal') || 
            recipe.ingredients.some(i => i.item.toLowerCase().includes('dal') || i.item.toLowerCase().includes('chana'));
          if (!hasDal) return false;
        } else if (selectedChip === 'Biryani & Rice') {
          if (recipe.category !== 'Rice & Biryani') return false;
        } else if (selectedChip === 'Quick (<30m)') {
          const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
          if (totalTime > 30) return false;
        } else if (selectedChip === 'South Indian') {
          if (recipe.region !== 'South Indian') return false;
        } else if (selectedChip === 'Street Food') {
          if (recipe.category !== 'Street Food') return false;
        } else if (selectedChip === 'Chai & Nashta') {
          if (recipe.category !== 'Beverage' && recipe.category !== 'Breakfast') return false;
        } else if (selectedChip === 'Mithai') {
          if (recipe.category !== 'Dessert') return false;
        }
      }

      // 3. Region Filter
      if (selectedRegion !== 'All Regions') {
        if (selectedRegion === 'Beverage' && recipe.category !== 'Beverage') return false;
        else if (selectedRegion === 'Dessert' && recipe.category !== 'Dessert') return false;
        else if (selectedRegion === 'Street Food' && recipe.category !== 'Street Food') return false;
        else if (!['Beverage', 'Dessert', 'Street Food'].includes(selectedRegion) && recipe.region !== selectedRegion) {
          return false;
        }
      }

      // 4. Diet Filter
      if (selectedDiet !== 'All Diets') {
        if (selectedDiet === 'Veg' && recipe.diet !== 'Veg' && recipe.diet !== 'Jain Option') return false;
        if (selectedDiet === 'Jain Option' && recipe.diet !== 'Jain Option') return false;
        if (selectedDiet === 'Non-Veg' && recipe.diet !== 'Non-Veg') return false;
        if (selectedDiet === 'Vegan' && recipe.diet !== 'Vegan') return false;
      }

      // 5. Spice Level Filter
      if (selectedSpice !== 'All Heat' && recipe.spiceLevel !== selectedSpice) {
        return false;
      }

      // 6. Quick Cook Only
      if (quickOnly) {
        const total = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        if (total > 30) return false;
      }

      // 7. Favorites Only
      if (favoritesOnly && !recipe.isFavorite) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'quickest') {
        const timeA = (a.prepTime || 0) + (a.cookTime || 0);
        const timeB = (b.prepTime || 0) + (b.cookTime || 0);
        return timeA - timeB;
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [recipes, searchQuery, selectedChip, selectedRegion, selectedDiet, selectedSpice, quickOnly, favoritesOnly, sortBy]);

  // Handler: Toggle Favorite
  const handleToggleFavorite = (recipeId) => {
    const updated = recipes.map(r => {
      if (r.id === recipeId) {
        return { ...r, isFavorite: !r.isFavorite };
      }
      return r;
    });
    setRecipes(updated);
    saveRecipes(updated);
    if (activeRecipe && activeRecipe.id === recipeId) {
      setActiveRecipe(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  // Handler: Save Recipe (Add or Edit)
  const handleSaveRecipe = (recipeData) => {
    let updated;
    const exists = recipes.some(r => r.id === recipeData.id);
    if (exists) {
      updated = recipes.map(r => r.id === recipeData.id ? recipeData : r);
    } else {
      updated = [recipeData, ...recipes];
    }
    setRecipes(updated);
    saveRecipes(updated);
    setFormRecipe(null);
    if (activeRecipe && activeRecipe.id === recipeData.id) {
      setActiveRecipe(recipeData);
    }
  };

  // Handler: Delete Recipe
  const handleDeleteRecipe = (recipeId) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      const updated = recipes.filter(r => r.id !== recipeId);
      setRecipes(updated);
      saveRecipes(updated);
      setActiveRecipe(null);
      soundManager.playTick();
    }
  };

  // Handler: Save Profile
  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  };

  // Handler: Add to Grocery List
  const handleAddIngredientsToGrocery = (items) => {
    const updatedList = [...groceryList];
    items.forEach(newItem => {
      // Check if item with similar name already exists in the list
      const existing = updatedList.find(
        i => i.name.toLowerCase().trim() === newItem.name.toLowerCase().trim()
      );
      if (existing) {
        // Mark unchecked if adding again
        existing.checked = false;
      } else {
        updatedList.push({
          name: newItem.name,
          amount: newItem.amount || '1',
          unit: newItem.unit || 'unit',
          category: newItem.category || 'Produce',
          checked: false,
          recipeTitle: newItem.recipeTitle || ''
        });
      }
    });

    setGroceryList(updatedList);
    saveGroceryList(updatedList);
  };

  // Handler: Update Grocery List
  const handleUpdateGroceryList = (list) => {
    setGroceryList(list);
    saveGroceryList(list);
  };

  // Handler: Save Meal Plan
  const handleSaveMealPlan = (plan) => {
    setMealPlan(plan);
    saveMealPlan(plan);
  };

  // Handler: Random Recipe Picker ("Aaj Kya Banaye?")
  const handlePickRandomRecipe = () => {
    const listToPick = filteredRecipes.length > 0 ? filteredRecipes : recipes;
    if (listToPick.length === 0) return;
    const randomPick = listToPick[Math.floor(Math.random() * listToPick.length)];
    setActiveRecipe(randomPick);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedRegion('All Regions');
    setSelectedDiet('All Diets');
    setSelectedSpice('All Heat');
    setQuickOnly(false);
    setFavoritesOnly(false);
    setSelectedChip('All');
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(
    selectedRegion !== 'All Regions' ||
    selectedDiet !== 'All Diets' ||
    selectedSpice !== 'All Heat' ||
    quickOnly ||
    favoritesOnly ||
    selectedChip !== 'All' ||
    searchQuery.trim()
  );

  const favoritesCount = recipes.filter(r => r.isFavorite).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D241E]">
      
      {/* Top Navigation */}
      <Navbar
        profile={profile}
        activeTab="recipes"
        setActiveTab={() => {}}
        onOpenNewRecipe={() => setFormRecipe({})}
        onOpenMealPlanner={() => setIsMealPlannerOpen(true)}
        onOpenGrocery={() => setIsGroceryOpen(true)}
        onOpenMasalaDabba={() => setIsMasalaDabbaOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onExportRecipes={() => exportRecipesToJson(recipes)}
        groceryCount={groceryList.filter(i => !i.checked).length}
      />

      {/* Hero Welcome & Instant Search */}
      <HeroBanner
        profile={profile}
        recipes={recipes}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedChip={selectedChip}
        setSelectedChip={setSelectedChip}
        onPickRandomRecipe={handlePickRandomRecipe}
        favoritesCount={favoritesCount}
      />

      {/* Filter & Sorting Controls */}
      <FilterBar
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedDiet={selectedDiet}
        setSelectedDiet={setSelectedDiet}
        selectedSpice={selectedSpice}
        setSelectedSpice={setSelectedSpice}
        quickOnly={quickOnly}
        setQuickOnly={setQuickOnly}
        favoritesOnly={favoritesOnly}
        setFavoritesOnly={setFavoritesOnly}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Main Content Recipe Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        
        {/* Results Counter & Headline */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-amber-200/60">
          <div className="flex items-center gap-3">
            <h2 className="font-serif-heading font-extrabold text-2xl sm:text-3xl text-stone-900 tracking-tight">
              {favoritesOnly ? 'Her Favorite Recipes' : 'Treasured Recipes'}
            </h2>
            <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200">
              {filteredRecipes.length} {filteredRecipes.length === 1 ? 'Dish' : 'Dishes'}
            </span>
          </div>

          {/* Quick Add Recipe text button */}
          <button
            onClick={() => setFormRecipe({})}
            className="flex items-center gap-1.5 text-xs font-bold text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Her Recipe</span>
          </button>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelectRecipe={(r) => setActiveRecipe(r)}
                onStartCooking={(r) => setCookingRecipe(r)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-amber-200 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center text-2xl mb-4">
              🍛
            </div>
            <h3 className="font-serif-heading text-xl font-bold text-stone-900 mb-2">
              No dishes found matching this search
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mb-6">
              Try adjusting your region, spice level, or diet filters to discover her other delicious recipes.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-amber-800 text-white font-bold text-xs hover:bg-amber-900 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>

      {/* Warm Footer */}
      <footer className="bg-stone-900 text-stone-300 py-12 border-t border-amber-950/40 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600/30 flex items-center justify-center text-xl">
              {profile.avatarEmoji || '👩‍🍳'}
            </div>
            <div>
              <p className="font-serif-heading font-bold text-lg text-white">
                {profile.kitchenName || 'Rasoi Diary'}
              </p>
              <p className="text-xs text-amber-400 font-ethnic">
                स्वादिष्ट और दिलकश भारतीय व्यंजन
              </p>
            </div>
          </div>

          <p className="text-xs text-stone-400 max-w-md">
            Created with profound love for her incredible cooking, honoring the aromatic soul of Indian cuisine.
          </p>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <button
              onClick={() => setIsMasalaDabbaOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Masala Dabba Guide
            </button>
            <span>•</span>
            <button
              onClick={() => exportRecipesToJson(recipes)}
              className="hover:text-amber-400 transition-colors"
            >
              Export Backup (JSON)
            </button>
            <span>•</span>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Personalize
            </button>
          </div>

        </div>
      </footer>

      {/* Modals */}
      {/* 1. Recipe Detail Modal */}
      {activeRecipe && (
        <RecipeDetailModal
          recipe={activeRecipe}
          onClose={() => setActiveRecipe(null)}
          onStartCooking={(recipeWithServings) => {
            setActiveRecipe(null);
            setCookingRecipe(recipeWithServings);
          }}
          onEditRecipe={(r) => {
            setActiveRecipe(null);
            setFormRecipe(r);
          }}
          onDeleteRecipe={handleDeleteRecipe}
          onToggleFavorite={handleToggleFavorite}
          onAddIngredientsToGrocery={handleAddIngredientsToGrocery}
        />
      )}

      {/* 2. Interactive Kitchen Cooking Mode */}
      {cookingRecipe && (
        <CookingModeModal
          recipe={cookingRecipe}
          onClose={() => setCookingRecipe(null)}
        />
      )}

      {/* 3. Add / Edit Recipe Form Modal */}
      {formRecipe !== null && (
        <RecipeFormModal
          initialRecipe={formRecipe.id ? formRecipe : null}
          onClose={() => setFormRecipe(null)}
          onSave={handleSaveRecipe}
        />
      )}

      {/* 4. Weekly Meal Planner */}
      {isMealPlannerOpen && (
        <MealPlannerModal
          recipes={recipes}
          mealPlan={mealPlan}
          onSaveMealPlan={handleSaveMealPlan}
          onAddIngredientsToGrocery={handleAddIngredientsToGrocery}
          onClose={() => setIsMealPlannerOpen(false)}
          onSelectRecipe={(r) => setActiveRecipe(r)}
        />
      )}

      {/* 5. Bazaar Grocery List */}
      {isGroceryOpen && (
        <GroceryListModal
          groceryList={groceryList}
          onUpdateGroceryList={handleUpdateGroceryList}
          onClose={() => setIsGroceryOpen(false)}
        />
      )}

      {/* 6. Masala Dabba Spice Guide */}
      {isMasalaDabbaOpen && (
        <MasalaDabbaModal
          onClose={() => setIsMasalaDabbaOpen(false)}
        />
      )}

      {/* 7. Chef Profile Personalization */}
      {isProfileOpen && (
        <ChefProfileModal
          profile={profile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

    </div>
  );
}
