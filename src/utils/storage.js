import { DEFAULT_RECIPES } from '../data/defaultRecipes';

const STORAGE_KEYS = {
  RECIPES: 'rasoi_diary_recipes_v1',
  PROFILE: 'rasoi_diary_profile_v1',
  GROCERY: 'rasoi_diary_grocery_v1',
  MEAL_PLAN: 'rasoi_diary_mealplan_v1'
};

export const defaultProfile = {
  name: "Pooja",
  kitchenName: "Her Secret Rasoi",
  tagline: "Authentic Indian Flavors Crafted with Love & Warmth ✨",
  bio: "Preserving cherished family recipes, fragrant masalas, and festive dishes passed down through generations.",
  avatarEmoji: "👩‍🍳",
  favoriteSpice: "Kasuri Methi & Cardamom"
};

export const defaultMealPlan = {
  Monday: { breakfast: 'crispy-masala-dosa', lunch: 'amritsari-chole', dinner: 'paneer-butter-masala' },
  Tuesday: { breakfast: 'khaman-dhokla', lunch: 'dal-makhani', dinner: 'kashmiri-dum-aloo' },
  Wednesday: { breakfast: 'adrak-elaichi-chai', lunch: 'hyderabadi-biryani', dinner: 'dal-makhani' },
  Thursday: { breakfast: 'crispy-masala-dosa', lunch: 'paneer-butter-masala', dinner: 'amritsari-chole' },
  Friday: { breakfast: 'khaman-dhokla', lunch: 'kashmiri-dum-aloo', dinner: 'mumbai-pav-bhaji' },
  Saturday: { breakfast: 'adrak-elaichi-chai', lunch: 'hyderabadi-biryani', dinner: 'gulab-jamun' },
  Sunday: { breakfast: 'crispy-masala-dosa', lunch: 'dal-makhani', dinner: 'mumbai-pav-bhaji' }
};

export function loadRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECIPES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(DEFAULT_RECIPES));
      return DEFAULT_RECIPES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_RECIPES;
  } catch (e) {
    console.error('Error loading recipes from storage', e);
    return DEFAULT_RECIPES;
  }
}

export function saveRecipes(recipes) {
  try {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
  } catch (e) {
    console.error('Error saving recipes', e);
  }
}

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile;
  } catch (e) {
    return defaultProfile;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
}

export function loadGroceryList() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GROCERY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function saveGroceryList(list) {
  try {
    localStorage.setItem(STORAGE_KEYS.GROCERY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving grocery list', e);
  }
}

export function loadMealPlan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEAL_PLAN);
    return raw ? JSON.parse(raw) : defaultMealPlan;
  } catch (e) {
    return defaultMealPlan;
  }
}

export function saveMealPlan(plan) {
  try {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(plan));
  } catch (e) {
    console.error('Error saving meal plan', e);
  }
}

// Export all recipes as JSON file
export function exportRecipesToJson(recipes) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recipes, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `rasoi_diary_recipes_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
