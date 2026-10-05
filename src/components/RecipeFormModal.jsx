import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Sparkles, 
  Save, 
  Flame, 
  Clock, 
  Users,
  Check
} from 'lucide-react';
import { CURATED_FOOD_IMAGES } from '../data/imageGallery';
import { soundManager } from '../utils/sound';

const QUICK_SPICES = [
  'Haldi (Turmeric)',
  'Jeera (Cumin)',
  'Rai (Mustard seeds)',
  'Dhania Powder',
  'Kashmiri Red Chili',
  'Garam Masala',
  'Kasuri Methi',
  'Hing (Asafoetida)',
  'Amchur Powder',
  'Ginger-Garlic Paste'
];

export default function RecipeFormModal({
  initialRecipe,
  onClose,
  onSave
}) {
  const isEditing = Boolean(initialRecipe && initialRecipe.id);

  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [hindiTitle, setHindiTitle] = useState(initialRecipe?.hindiTitle || '');
  const [category, setCategory] = useState(initialRecipe?.category || 'Main Course');
  const [region, setRegion] = useState(initialRecipe?.region || 'North Indian');
  const [diet, setDiet] = useState(initialRecipe?.diet || 'Veg');
  const [spiceLevel, setSpiceLevel] = useState(initialRecipe?.spiceLevel || 'Medium');
  const [prepTime, setPrepTime] = useState(initialRecipe?.prepTime || 15);
  const [cookTime, setCookTime] = useState(initialRecipe?.cookTime || 25);
  const [servings, setServings] = useState(initialRecipe?.servings || 4);
  const [description, setDescription] = useState(initialRecipe?.description || '');
  const [secretTip, setSecretTip] = useState(initialRecipe?.secretTip || '');
  const [nutritionNote, setNutritionNote] = useState(initialRecipe?.nutritionNote || '');
  const [image, setImage] = useState(
    initialRecipe?.image || 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=80'
  );

  const [ingredients, setIngredients] = useState(
    initialRecipe?.ingredients || [
      { amount: '1', unit: 'tbsp', item: 'Ghee or Mustard Oil', category: 'Dairy' },
      { amount: '1', unit: 'tsp', item: 'Jeera (Cumin seeds)', category: 'Spices' },
      { amount: '1', unit: 'medium', item: 'Finely Chopped Onion', category: 'Produce' }
    ]
  );

  const [instructions, setInstructions] = useState(
    initialRecipe?.instructions || [
      { step: 1, title: 'Prepare & Temper', text: 'Heat oil/ghee in a kadai and splutter whole spices until fragrant.', durationMinutes: 3 },
      { step: 2, title: 'Simmer Gravy', text: 'Add onions, ginger-garlic paste and tomatoes. Cook until oil separates.', durationMinutes: 10 }
    ]
  );

  const [showGallery, setShowGallery] = useState(false);

  // Add ingredient row
  const handleAddIngredient = (presetItem = null) => {
    soundManager.playTick();
    if (presetItem) {
      setIngredients(prev => [
        ...prev,
        { amount: '1', unit: 'tsp', item: presetItem, category: 'Spices' }
      ]);
    } else {
      setIngredients(prev => [
        ...prev,
        { amount: '1', unit: 'tsp', item: '', category: 'Produce' }
      ]);
    }
  };

  const handleUpdateIngredient = (index, field, value) => {
    setIngredients(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveIngredient = (index) => {
    soundManager.playTick();
    setIngredients(prev => prev.filter((_, i) => i !== index));
  };

  // Add instruction row
  const handleAddInstruction = () => {
    soundManager.playTick();
    setInstructions(prev => [
      ...prev,
      { 
        step: prev.length + 1, 
        title: `Step ${prev.length + 1}`, 
        text: '', 
        durationMinutes: 5 
      }
    ]);
  };

  const handleUpdateInstruction = (index, field, value) => {
    setInstructions(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleRemoveInstruction = (index) => {
    soundManager.playTick();
    setInstructions(prev => {
      const filtered = prev.filter((_, i) => i !== index);
      return filtered.map((item, idx) => ({ ...item, step: idx + 1 }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a recipe title');
      return;
    }

    const recipeData = {
      id: initialRecipe?.id || `recipe-${Date.now()}`,
      title: title.trim(),
      hindiTitle: hindiTitle.trim(),
      category,
      region,
      diet,
      spiceLevel,
      prepTime: Number(prepTime) || 15,
      cookTime: Number(cookTime) || 20,
      servings: Number(servings) || 4,
      image: image.trim(),
      description: description.trim(),
      secretTip: secretTip.trim(),
      nutritionNote: nutritionNote.trim(),
      ingredients: ingredients.filter(i => i.item.trim() !== ''),
      instructions: instructions.filter(i => i.text.trim() !== ''),
      isFavorite: initialRecipe?.isFavorite || false,
      rating: initialRecipe?.rating || 4.9
    };

    soundManager.playSuccess();
    onSave(recipeData);
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
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span>{isEditing ? 'Edit Recipe' : 'Add Treasured Recipe'}</span>
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Save her signature dishes, secret spice blends, and kitchen nuska.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Section 1: Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Recipe Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Paneer Butter Masala, Masala Chai"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Hindi / Regional Name
              </label>
              <input
                type="text"
                value={hindiTitle}
                onChange={(e) => setHindiTitle(e.target.value)}
                placeholder="e.g. पनीर बटर मसाला, गुजराती ढोकला"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Section 2: Culinary Taxonomy */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Course Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium"
              >
                <option value="Main Course">Main Course (Sabzi/Dal)</option>
                <option value="Rice & Biryani">Rice & Biryani</option>
                <option value="Breakfast">Breakfast (Nashta)</option>
                <option value="Street Food">Street Food & Chaat</option>
                <option value="Beverage">Beverage & Chai</option>
                <option value="Dessert">Mithai & Dessert</option>
                <option value="Chutney & Achaar">Chutney & Pickle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium"
              >
                <option value="North Indian">North Indian (Punjabi/Awadhi)</option>
                <option value="South Indian">South Indian (Chettinad/Kerala)</option>
                <option value="West Indian">West Indian (Gujarati/Marathi)</option>
                <option value="East Indian">East Indian (Bengali/Odia)</option>
                <option value="Street Food">Street Food Style</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Diet Type
              </label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium"
              >
                <option value="Veg">Pure Veg (Shakahari)</option>
                <option value="Jain Option">Jain Friendly</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Spice Heat (Mirchi)
              </label>
              <select
                value={spiceLevel}
                onChange={(e) => setSpiceLevel(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-medium"
              >
                <option value="Mild">Mild 🌿</option>
                <option value="Medium">Medium 🌶️</option>
                <option value="Spicy">Spicy 🌶️🌶️</option>
                <option value="Desi Teekha">Desi Teekha 🔥</option>
              </select>
            </div>
          </div>

          {/* Section 3: Time & Servings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Prep Time (mins)
              </label>
              <input
                type="number"
                min="1"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Cook Time (mins)
              </label>
              <input
                type="number"
                min="1"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Default Servings
              </label>
              <input
                type="number"
                min="1"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Section 4: Image Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Photo URL
              </label>
              <button
                type="button"
                onClick={() => setShowGallery(!showGallery)}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{showGallery ? 'Hide Gallery' : 'Choose from Curated Photos'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={image}
                alt="Preview"
                className="w-14 h-14 rounded-xl object-cover border border-amber-200 shrink-0 bg-stone-100"
              />
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste image URL here"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm"
              />
            </div>

            {/* Curated Gallery Picker Drawer */}
            {showGallery && (
              <div className="mt-3 p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <p className="text-xs font-bold text-stone-500 mb-2">Tap any photo to select:</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                  {CURATED_FOOD_IMAGES.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setImage(item.url);
                        setShowGallery(false);
                      }}
                      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 hover:border-orange-500 transition-all"
                    >
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center p-1 text-[10px] text-white font-bold text-center">
                        {item.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Brief Description
            </label>
            <textarea
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A few words describing the warmth, taste and texture of this dish..."
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm"
            />
          </div>

          {/* Section 6: Ingredients with Quick Spice Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                सामग्री • Ingredients
              </label>
              <button
                type="button"
                onClick={() => handleAddIngredient()}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Row</span>
              </button>
            </div>

            {/* Quick Spice Chips to easily append common Indian spices */}
            <div className="mb-3 flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-stone-400 font-semibold">Quick add:</span>
              {QUICK_SPICES.map((spice) => (
                <button
                  type="button"
                  key={spice}
                  onClick={() => handleAddIngredient(spice)}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 font-medium transition-colors"
                >
                  + {spice}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={ing.amount}
                    onChange={(e) => handleUpdateIngredient(idx, 'amount', e.target.value)}
                    placeholder="Qty (e.g. 1)"
                    className="w-16 px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={(e) => handleUpdateIngredient(idx, 'unit', e.target.value)}
                    placeholder="Unit (tbsp)"
                    className="w-20 px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={ing.item}
                    onChange={(e) => handleUpdateIngredient(idx, 'item', e.target.value)}
                    placeholder="Ingredient name"
                    className="flex-1 px-2.5 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                  />
                  <select
                    value={ing.category}
                    onChange={(e) => handleUpdateIngredient(idx, 'category', e.target.value)}
                    className="w-24 px-2 py-1.5 bg-stone-50 border border-stone-200 rounded-lg text-[11px]"
                  >
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Spices">Spices</option>
                    <option value="Grains">Grains</option>
                    <option value="Pantry">Pantry</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: Step-by-Step Instructions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                बनाने की विधि • Step-by-Step Method
              </label>
              <button
                type="button"
                onClick={handleAddInstruction}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {instructions.map((stepItem, idx) => (
                <div key={idx} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-orange-600">
                      Step {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={stepItem.title}
                      onChange={(e) => handleUpdateInstruction(idx, 'title', e.target.value)}
                      placeholder="Step Title (e.g. Temper Whole Spices)"
                      className="flex-1 px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-xs font-semibold"
                    />
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <input
                        type="number"
                        min="1"
                        value={stepItem.durationMinutes || 5}
                        onChange={(e) => handleUpdateInstruction(idx, 'durationMinutes', Number(e.target.value))}
                        className="w-14 px-2 py-1 bg-white border border-stone-200 rounded-lg text-xs"
                      />
                      <span className="text-[11px] text-stone-400">min</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveInstruction(idx)}
                      className="p-1 text-stone-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows="2"
                    value={stepItem.text}
                    onChange={(e) => handleUpdateInstruction(idx, 'text', e.target.value)}
                    placeholder="Describe what to do in this cooking step..."
                    className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Section 8: Dadi Maa's Secret Tip (Nuska) */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <label className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 font-serif-heading flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>दादी माँ का नुस्खा • Secret Culinary Tip</span>
            </label>
            <input
              type="text"
              value={secretTip}
              onChange={(e) => setSecretTip(e.target.value)}
              placeholder="e.g. Always crush kasuri methi between palms; Soak paneer in warm salted water for tenderness."
              className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-stone-900 text-xs sm:text-sm italic"
            />
          </div>

          {/* Wholesome Note */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              Wholesome / Nutritional Highlight
            </label>
            <input
              type="text"
              value={nutritionNote}
              onChange={(e) => setNutritionNote(e.target.value)}
              placeholder="e.g. High in protein, probiotic rich, zero onion-garlic sattvic dish."
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm"
            />
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-600 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/30 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Update Recipe' : 'Save Recipe'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
