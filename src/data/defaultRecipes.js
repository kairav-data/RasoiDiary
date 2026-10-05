// Comprehensive authentic Indian recipes collection
export const DEFAULT_RECIPES = [
  {
    id: 'paneer-butter-masala',
    title: 'Paneer Butter Masala',
    hindiTitle: 'पनीर बटर मसाला',
    category: 'Main Course',
    region: 'North Indian',
    course: 'Dinner / Lunch',
    diet: 'Veg',
    spiceLevel: 'Medium',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    isFavorite: true,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1000&q=80',
    description: 'Velvety, creamy restaurant-style cottage cheese cubes simmered in a mildly spiced, sweet and tangy butter tomato-cashew makhani gravy.',
    secretTip: 'Soak paneer cubes in warm salted water for 10 minutes before adding to the gravy. Crush kasuri methi between palms and add right at the end with a pinch of honey or sugar to balance acidity.',
    nutritionNote: 'High protein from fresh paneer, rich in calcium and lycopene.',
    ingredients: [
      { amount: '350', unit: 'g', item: 'Fresh Malai Paneer (cubed)', category: 'Dairy' },
      { amount: '4', unit: 'large', item: 'Ripe Tomatoes (roughly chopped)', category: 'Produce' },
      { amount: '1', unit: 'large', item: 'Red Onion (sliced)', category: 'Produce' },
      { amount: '15', unit: 'pieces', item: 'Whole Cashew Nuts', category: 'Pantry' },
      { amount: '3', unit: 'tbsp', item: 'Desi Butter (Makhan)', category: 'Dairy' },
      { amount: '1', unit: 'tbsp', item: 'Fresh Cooking Cream / Malai', category: 'Dairy' },
      { amount: '1', unit: 'tbsp', item: 'Ginger-Garlic Paste', category: 'Produce' },
      { amount: '1', unit: 'tbsp', item: 'Kashmiri Red Chili Powder', category: 'Spices' },
      { amount: '1/2', unit: 'tsp', item: 'Turmeric (Haldi)', category: 'Spices' },
      { amount: '1', unit: 'tsp', item: 'Garam Masala', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Kasuri Methi (Dried Fenugreek)', category: 'Spices' },
      { amount: '1', unit: 'tsp', item: 'Sugar or Honey', category: 'Pantry' },
      { amount: '1', unit: 'tsp', item: 'Salt (to taste)', category: 'Pantry' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Boil Makhani Base',
        text: 'In a saucepan, add chopped tomatoes, sliced onion, cashews, 1 cup water, and a pinch of salt. Boil for 10-12 minutes until soft and pulpy.',
        durationMinutes: 12
      },
      {
        step: 2,
        title: 'Blend to Silkiness',
        text: 'Let the boiled mixture cool down, then transfer to a mixer grinder. Blend into a super silky smooth puree. Strain through a fine sieve for signature restaurant velvet texture.',
        durationMinutes: 4
      },
      {
        step: 3,
        title: 'Tadka & Gravy Simmer',
        text: 'Melt 2 tbsp butter with 1 tbsp oil in a heavy kadai. Add ginger-garlic paste and sauté for 1 minute. Add Kashmiri chili powder and turmeric, stir for 10 seconds, then immediately pour in the strained puree.',
        durationMinutes: 5
      },
      {
        step: 4,
        title: 'Cook the Makhani Gravy',
        text: 'Cook gravy on low flame with lid partially covered until butter begins separating on the surface. Add garam masala, salt, and sugar to balance the tomato tartness.',
        durationMinutes: 8
      },
      {
        step: 5,
        title: 'Paneer & Finishing Royal Touch',
        text: 'Gently slide in the soft paneer cubes. Stir in 1 tbsp fresh cream and crushed kasuri methi. Simmer gently for 2 minutes. Garnish with a swirl of fresh cream and coriander.',
        durationMinutes: 3
      }
    ]
  },
  {
    id: 'dal-makhani',
    title: 'Amritsari Dal Makhani',
    hindiTitle: 'अमृतसरी दाल मखनी',
    category: 'Main Course',
    region: 'North Indian',
    course: 'Dinner',
    diet: 'Veg',
    spiceLevel: 'Medium',
    prepTime: 20,
    cookTime: 50,
    servings: 5,
    isFavorite: true,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    description: 'Authentic slow-simmered whole black lentils (urad dal) and kidney beans (rajma) cooked with butter, cream, and fragrant Kashmiri aromatics.',
    secretTip: 'The magic of authentic Dal Makhani is slow cooking on low flame ("dum"). Mash 25% of the cooked lentils against the pan side with a wooden spoon for natural starch creaminess.',
    nutritionNote: 'Packed with plant-based protein, dietary fiber, iron, and potassium.',
    ingredients: [
      { amount: '1', unit: 'cup', item: 'Whole Black Urad Dal (Sabut Urad)', category: 'Grains' },
      { amount: '1/4', unit: 'cup', item: 'Rajma (Red Kidney Beans)', category: 'Grains' },
      { amount: '4', unit: 'tbsp', item: 'Desi Butter / White Makhan', category: 'Dairy' },
      { amount: '3', unit: 'tbsp', item: 'Fresh Cream', category: 'Dairy' },
      { amount: '1', unit: 'cup', item: 'Fresh Tomato Puree', category: 'Produce' },
      { amount: '1', unit: 'tbsp', item: 'Ginger-Garlic Paste', category: 'Produce' },
      { amount: '1.5', unit: 'tsp', item: 'Kashmiri Red Chili Powder', category: 'Spices' },
      { amount: '1/2', unit: 'tsp', item: 'Garam Masala', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Kasuri Methi', category: 'Spices' },
      { amount: '1', unit: 'tsp', item: 'Salt', category: 'Pantry' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Soak & Pressure Cook Dal',
        text: 'Soak sabut urad dal and rajma overnight (8 hours). Rinse thoroughly. Pressure cook with 4 cups water, 1 tsp salt, and 1 black cardamom for 6-7 whistles until completely tender.',
        durationMinutes: 25
      },
      {
        step: 2,
        title: 'Make Butter Tomato Base',
        text: 'In a heavy-bottom pot, heat 2 tbsp butter. Add ginger-garlic paste and sauté until golden. Add fresh tomato puree and Kashmiri chili powder. Sauté until butter separates.',
        durationMinutes: 8
      },
      {
        step: 3,
        title: 'Slow Simmer Dal',
        text: 'Pour cooked dal with its cooking liquor into the tomato masala. Bring to a simmer. Turn flame to lowest setting. Lightly mash lentils against the pot edge and simmer for 30 minutes, adding warm water as needed.',
        durationMinutes: 30
      },
      {
        step: 4,
        title: 'Makhan & Finishing Touch',
        text: 'Stir in remaining 2 tbsp butter, fresh cream, garam masala, and roasted kasuri methi. Simmer for 5 more minutes until unctuous and silky.',
        durationMinutes: 5
      }
    ]
  },
  {
    id: 'hyderabadi-biryani',
    title: 'Hyderabadi Veg Dum Biryani',
    hindiTitle: 'हैदराबादी दम बिरयानी',
    category: 'Rice & Biryani',
    region: 'South Indian',
    course: 'Dinner / Lunch',
    diet: 'Veg',
    spiceLevel: 'Spicy',
    prepTime: 25,
    cookTime: 40,
    servings: 4,
    isFavorite: true,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80',
    description: 'Regal layered Basmati rice infused with whole spices, saffron-milk, golden fried onions (birista), fresh mint, and marinated spiced garden vegetables.',
    secretTip: 'Cook the basmati rice only up to 70% (it should have a slight bite in the center). The remaining 30% cooks in the steam (dum) with the vegetable juices.',
    nutritionNote: 'Complex carbohydrates, dietary fiber, and aromatic phytonutrients.',
    ingredients: [
      { amount: '2', unit: 'cups', item: 'Aged Basmati Rice', category: 'Grains' },
      { amount: '2', unit: 'cups', item: 'Mixed Veggies (Carrot, Beans, Cauliflower, Peas)', category: 'Produce' },
      { amount: '1', unit: 'cup', item: 'Thick Whisked Curd (Dahi)', category: 'Dairy' },
      { amount: '2', unit: 'large', item: 'Fried Onions (Birista)', category: 'Produce' },
      { amount: '1/4', unit: 'cup', item: 'Warm Milk with Saffron Strands', category: 'Dairy' },
      { amount: '1/4', unit: 'cup', item: 'Fresh Mint & Coriander leaves', category: 'Produce' },
      { amount: '3', unit: 'tbsp', item: 'Pure Desi Ghee', category: 'Dairy' },
      { amount: '1', unit: 'tbsp', item: 'Biryani Masala Powder', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Ginger Garlic Green Chili Paste', category: 'Produce' },
      { amount: '1', unit: 'tsp', item: 'Shahi Jeera & Whole Spices', category: 'Spices' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Marinate Vegetables',
        text: 'In a bowl, mix vegetables with thick dahi, ginger-garlic-chili paste, biryani masala, red chili powder, turmeric, half of the fried onions, mint, and salt. Rest for 20 minutes.',
        durationMinutes: 20
      },
      {
        step: 2,
        title: 'Parboil Basmati Rice',
        text: 'Boil water with whole spices (cinnamon, clove, cardamom, bay leaf, shahi jeera) and salt. Add soaked rice. Cook for 6-7 minutes until 70% done. Drain immediately.',
        durationMinutes: 7
      },
      {
        step: 3,
        title: 'Layer the Handi',
        text: 'In a heavy pot, spread the vegetable marinade at the bottom. Layer parboiled hot rice on top. Scatter remaining fried onions, chopped mint, coriander, saffron milk, and drizzle ghee.',
        durationMinutes: 5
      },
      {
        step: 4,
        title: 'Dum Cooking (Slow Steam)',
        text: 'Seal pot tightly with foil and heavy lid. Cook on high flame for 5 minutes, then place a tawa underneath and cook on lowest flame for 20 minutes. Rest for 10 minutes before gently fluffing.',
        durationMinutes: 25
      }
    ]
  },
  {
    id: 'crispy-masala-dosa',
    title: 'Crispy South Indian Masala Dosa',
    hindiTitle: 'मसाला दोसा और नारियल चटनी',
    category: 'Breakfast',
    region: 'South Indian',
    course: 'Breakfast / Snack',
    diet: 'Veg',
    spiceLevel: 'Medium',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    isFavorite: false,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=1000&q=80',
    description: 'Golden, paper-crisp fermented rice-lentil crepes filled with turmeric-tempered mustard potato bhaji, paired with fresh coconut chutney.',
    secretTip: 'Sprinkle a light dusting of water on the hot cast-iron tawa and wipe with a halved onion before swirling each dosa for that perfect hotel-style golden lattice crunch.',
    nutritionNote: 'Naturally fermented, gut-friendly probiotics, gluten-free.',
    ingredients: [
      { amount: '3', unit: 'cups', item: 'Fermented Dosa Batter', category: 'Grains' },
      { amount: '4', unit: 'medium', item: 'Boiled Potatoes (crumbled)', category: 'Produce' },
      { amount: '1', unit: 'medium', item: 'Onion (thinly sliced)', category: 'Produce' },
      { amount: '2', unit: 'slit', item: 'Green Chilies', category: 'Produce' },
      { amount: '1', unit: 'sprig', item: 'Fresh Curry Leaves', category: 'Produce' },
      { amount: '1', unit: 'tsp', item: 'Mustard Seeds (Rai)', category: 'Spices' },
      { amount: '1/2', unit: 'tsp', item: 'Turmeric (Haldi)', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Chana Dal & Urad Dal', category: 'Grains' },
      { amount: '3', unit: 'tbsp', item: 'Ghee or Sesame Oil', category: 'Dairy' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Tempered Potato Masala (Aloo Bhaji)',
        text: 'Heat oil in a pan. Splutter mustard seeds, chana dal, urad dal, curry leaves, and green chilies. Add sliced onions and sauté until translucent. Add turmeric and salt.',
        durationMinutes: 5
      },
      {
        step: 2,
        title: 'Combine Crumbled Potatoes',
        text: 'Add crumbled boiled potatoes and 3 tbsp water. Mix well, cook on medium heat for 3-4 minutes until moist and aromatic. Finish with fresh coriander.',
        durationMinutes: 4
      },
      {
        step: 3,
        title: 'Pour & Swirl Dosa',
        text: 'Heat a heavy cast iron or non-stick tawa. Pour a ladleful of batter in center, gently swirl in outward spirals to spread thin. Drizzle ghee around edges.',
        durationMinutes: 3
      },
      {
        step: 4,
        title: 'Fill & Fold',
        text: 'Cook until bottom turns deep golden brown and crisp. Place potato masala in center, fold into a cylinder or triangle, and serve smoking hot with coconut chutney.',
        durationMinutes: 2
      }
    ]
  },
  {
    id: 'mumbai-pav-bhaji',
    title: 'Mumbai Chowpatty Pav Bhaji',
    hindiTitle: 'मुंबई पाव भाजी',
    category: 'Street Food',
    region: 'West Indian',
    course: 'Snack / Dinner',
    diet: 'Veg',
    spiceLevel: 'Desi Teekha',
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    isFavorite: true,
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1000&q=80',
    description: 'Iconic Mumbai street-style mashed spiced vegetable medley swimming in butter, served with golden toasted buttery ladi pav and lemon wedges.',
    secretTip: 'Mash the boiled veggies directly on the flat tawa while cooking with butter. Squeeze fresh lemon juice right into the bubbling bhaji right before serving.',
    nutritionNote: 'Loaded with mixed vegetables like cauliflower, capsicum, peas, and potatoes.',
    ingredients: [
      { amount: '3', unit: 'large', item: 'Boiled Potatoes', category: 'Produce' },
      { amount: '1', unit: 'cup', item: 'Boiled Cauliflower florets', category: 'Produce' },
      { amount: '1/2', unit: 'cup', item: 'Green Peas', category: 'Produce' },
      { amount: '1', unit: 'large', item: 'Capsicum (finely chopped)', category: 'Produce' },
      { amount: '3', unit: 'medium', item: 'Finely Chopped Tomatoes', category: 'Produce' },
      { amount: '2', unit: 'medium', item: 'Finely Chopped Red Onions', category: 'Produce' },
      { amount: '5', unit: 'tbsp', item: 'Amul Butter', category: 'Dairy' },
      { amount: '2.5', unit: 'tbsp', item: 'Everest / MDH Pav Bhaji Masala', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Kashmiri Chili Garlic Paste', category: 'Produce' },
      { amount: '8', unit: 'pieces', item: 'Soft Ladi Pav', category: 'Bakery' },
      { amount: '1', unit: 'whole', item: 'Lemon & Fresh Coriander', category: 'Produce' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Boil & Roughly Mash Veggies',
        text: 'Pressure cook potatoes, cauliflower, and peas with a little water and salt until very soft. Mash with a potato masher until semi-smooth.',
        durationMinutes: 10
      },
      {
        step: 2,
        title: 'Sauté Capsicum & Onions',
        text: 'Melt 2 tbsp butter on a large tawa or wide pan. Sauté chopped onions and capsicum for 4 minutes until tender.',
        durationMinutes: 4
      },
      {
        step: 3,
        title: 'Spice Infusion & Tomatoes',
        text: 'Add chili-garlic paste, pav bhaji masala, and chopped tomatoes. Cook and mash continuously with the masher until tomatoes dissolve and butter glistens.',
        durationMinutes: 6
      },
      {
        step: 4,
        title: 'Simmer & Mash Bhaji',
        text: 'Add mashed vegetables and 1/2 cup warm water. Mash vigorously until velvety. Add 1 tbsp butter, salt, and simmer for 6 minutes.',
        durationMinutes: 6
      },
      {
        step: 5,
        title: 'Butter-Toast the Pav',
        text: 'Slice pav in half. Melt generous butter on hot tawa with a pinch of pav bhaji masala and coriander. Toast pav until golden and pillowy.',
        durationMinutes: 3
      }
    ]
  },
  {
    id: 'kashmiri-dum-aloo',
    title: 'Authentic Kashmiri Dum Aloo',
    hindiTitle: 'कश्मीरी दम आलू',
    category: 'Main Course',
    region: 'North Indian',
    course: 'Dinner / Lunch',
    diet: 'Veg',
    spiceLevel: 'Medium',
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    isFavorite: false,
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
    description: 'Golden-fried baby potatoes pierced with fork and simmered in a yogurt gravy infused with saunth (dry ginger) and fennel powder (saunf) without onion or garlic.',
    secretTip: 'Prick baby potatoes thoroughly with a fork and fry until golden on slow heat; this allows the rich spiced yogurt gravy to seep all the way into the potato core.',
    nutritionNote: 'Sattvic preparation (No onion, no garlic), rich in digestive warming spices.',
    ingredients: [
      { amount: '500', unit: 'g', item: 'Baby Potatoes (boiled & peeled)', category: 'Produce' },
      { amount: '1', unit: 'cup', item: 'Fresh Yogurt (whisked smooth)', category: 'Dairy' },
      { amount: '1.5', unit: 'tbsp', item: 'Fennel Seed Powder (Saunf)', category: 'Spices' },
      { amount: '1', unit: 'tsp', item: 'Dry Ginger Powder (Saunth)', category: 'Spices' },
      { amount: '1.5', unit: 'tbsp', item: 'Kashmiri Red Chili Powder', category: 'Spices' },
      { amount: '1/4', unit: 'tsp', item: 'Hing (Asafoetida)', category: 'Spices' },
      { amount: '3', unit: 'tbsp', item: 'Mustard Oil (Sarson ka tel)', category: 'Pantry' },
      { amount: '1', unit: 'tsp', item: 'Salt', category: 'Pantry' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Prick & Fry Potatoes',
        text: 'Prick peeled boiled baby potatoes all over with a toothpick or fork. Heat mustard oil to smoking point, cool slightly, then shallow-fry potatoes until crispy golden brown all over.',
        durationMinutes: 10
      },
      {
        step: 2,
        title: 'Prepare Spiced Yogurt Gravy',
        text: 'In a bowl, whisk curd with Kashmiri red chili powder, fennel powder, and saunth powder to create a lump-free ruby slurry.',
        durationMinutes: 3
      },
      {
        step: 3,
        title: 'Tadka & Gravy Cook',
        text: 'In the remaining mustard oil, add hing, cloves, and cardamom. Pour in the yogurt mixture while stirring vigorously on low heat so yogurt does not split.',
        durationMinutes: 5
      },
      {
        step: 4,
        title: 'Dum Cook Potatoes',
        text: 'Slide in golden fried potatoes with 1/2 cup warm water. Cover with tight lid and cook on dum (very low flame) for 15 minutes until gravy clings to the potatoes.',
        durationMinutes: 15
      }
    ]
  },
  {
    id: 'adrak-elaichi-chai',
    title: 'Desi Adrak Elaichi Masala Chai',
    hindiTitle: 'अदरक इलायची मसाला चाय',
    category: 'Beverage',
    region: 'North Indian',
    course: 'Morning / Evening',
    diet: 'Veg',
    spiceLevel: 'Mild',
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    isFavorite: true,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1000&q=80',
    description: 'Soul-soothing Indian cutting chai simmered with freshly crushed ginger, green cardamom pods, and whole milk, boiled to aromatic perfection.',
    secretTip: 'Crush the ginger and cardamom fresh in a mortar pestle right before brewing. Always boil the tea leaves in water FIRST before adding milk to extract full polyphenols.',
    nutritionNote: 'Immunity booster with gingerol, aids digestion and elevates mood.',
    ingredients: [
      { amount: '1.5', unit: 'cups', item: 'Water', category: 'Pantry' },
      { amount: '1', unit: 'cup', item: 'Full Cream Milk', category: 'Dairy' },
      { amount: '2.5', unit: 'tsp', item: 'Assam CTC Black Tea Leaves', category: 'Pantry' },
      { amount: '1', unit: 'inch', item: 'Fresh Ginger (crushed)', category: 'Produce' },
      { amount: '3', unit: 'pods', item: 'Green Cardamom (cracked open)', category: 'Spices' },
      { amount: '2', unit: 'tsp', item: 'Raw Sugar or Jaggery (Gud)', category: 'Pantry' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Crush Aromatics & Boil Water',
        text: 'In a saucepan, bring 1.5 cups water to a boil. Add freshly crushed ginger and cracked cardamom pods. Boil for 2 minutes to infuse the aromatic oils.',
        durationMinutes: 2
      },
      {
        step: 2,
        title: 'Add Tea Leaves (Kadhak Brew)',
        text: 'Add Assam black tea leaves. Let it boil vigorously for 2 minutes until deep amber in color and robust in aroma.',
        durationMinutes: 2
      },
      {
        step: 3,
        title: 'Add Milk & Simmer "Ubaal"',
        text: 'Pour in the whole milk and sugar. Bring the chai to a rolling boil. Let it rise to the top of the pot, lower the flame, and repeat 3 times for that quintessential creamy thickness.',
        durationMinutes: 5
      },
      {
        step: 4,
        title: 'Strain & Serve Hot',
        text: 'Strain using a fine mesh tea strainer into kulhad (clay cups) or your favorite mugs. Enjoy with hot rusk or crispy samosas.',
        durationMinutes: 1
      }
    ]
  },
  {
    id: 'khaman-dhokla',
    title: 'Spongy Gujarati Khaman Dhokla',
    hindiTitle: 'गुजराती खमन ढोकला',
    category: 'Breakfast',
    region: 'West Indian',
    course: 'Breakfast / Snack',
    diet: 'Veg',
    spiceLevel: 'Mild',
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    isFavorite: false,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80',
    description: 'Cloud-soft, juicy steamed savory cakes made from gram flour (besan), tempered with mustard seeds, sesame, green chilies, and a sweet-tangy lemon wash.',
    secretTip: 'Pour the warm sweet-tangy tempering water over the dhokla while it is still warm; it absorbs like a sponge and turns delightfully juicy!',
    nutritionNote: 'Low calorie, steamed snack rich in chickpea protein.',
    ingredients: [
      { amount: '1.5', unit: 'cups', item: 'Gram Flour (Besan)', category: 'Grains' },
      { amount: '1', unit: 'tsp', item: 'Fruit Salt (Eno) or Baking Soda', category: 'Pantry' },
      { amount: '1', unit: 'tsp', item: 'Turmeric (tiny pinch for golden color)', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Lemon Juice', category: 'Produce' },
      { amount: '2', unit: 'tbsp', item: 'Sugar', category: 'Pantry' },
      { amount: '1', unit: 'tsp', item: 'Mustard Seeds (Rai)', category: 'Spices' },
      { amount: '1', unit: 'tsp', item: 'White Sesame Seeds (Til)', category: 'Spices' },
      { amount: '3', unit: 'slit', item: 'Green Chilies', category: 'Produce' },
      { amount: '1', unit: 'sprig', item: 'Curry Leaves', category: 'Produce' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare Smooth Besan Batter',
        text: 'Whisk besan with water, lemon juice, sugar, pinch of turmeric, and salt into a smooth lump-free batter. Let it rest for 10 minutes.',
        durationMinutes: 10
      },
      {
        step: 2,
        title: 'Aerate with Eno & Steam',
        text: 'Add Eno fruit salt and 1 tsp water on top. Whisk briskly in one direction until batter doubles in volume and turns foamy. Immediately pour into greased tin and steam for 18 minutes.',
        durationMinutes: 18
      },
      {
        step: 3,
        title: 'Make Sweet-Tangy Tempering',
        text: 'Heat 1 tbsp oil. Crackle mustard seeds, sesame seeds, curry leaves, and green chilies. Add 1/2 cup water, 1 tbsp sugar, and 1 tsp lemon juice. Bring to a boil.',
        durationMinutes: 3
      },
      {
        step: 4,
        title: 'Pour Tempering & Cut',
        text: 'Cut steamed dhokla into square cubes. Spoon warm tempering water evenly all over. Garnish with fresh grated coconut and coriander.',
        durationMinutes: 2
      }
    ]
  },
  {
    id: 'gulab-jamun',
    title: 'Melt-in-Mouth Royal Gulab Jamun',
    hindiTitle: 'शाही गुलाब जामुन',
    category: 'Dessert',
    region: 'North Indian',
    course: 'Dessert / Mithai',
    diet: 'Veg',
    spiceLevel: 'Mild',
    prepTime: 20,
    cookTime: 25,
    servings: 6,
    isFavorite: true,
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14d48?auto=format&fit=crop&w=1000&q=80',
    description: 'Golden fried dumplings made from soft khoya and chenna, soaked in warm saffron, rose water, and green cardamom-scented sugar syrup.',
    secretTip: 'Fry on very gentle, low flame! If the ghee/oil is too hot, the exterior will brown while the interior remains doughy and won’t soak the syrup.',
    nutritionNote: 'Pure festive celebration sweet made with rich dairy solids.',
    ingredients: [
      { amount: '200', unit: 'g', item: 'Mawa / Khoya (crumbled)', category: 'Dairy' },
      { amount: '50', unit: 'g', item: 'Soft Paneer / Chenna', category: 'Dairy' },
      { amount: '3', unit: 'tbsp', item: 'Maida (All-Purpose Flour)', category: 'Grains' },
      { amount: '1/4', unit: 'tsp', item: 'Baking Powder', category: 'Pantry' },
      { amount: '2', unit: 'cups', item: 'Sugar', category: 'Pantry' },
      { amount: '1.5', unit: 'cups', item: 'Water', category: 'Pantry' },
      { amount: '4', unit: 'pods', item: 'Cardamom (crushed)', category: 'Spices' },
      { amount: '1', unit: 'tsp', item: 'Rose Water & Saffron Strands', category: 'Pantry' },
      { amount: '2', unit: 'cups', item: 'Ghee or Oil for frying', category: 'Dairy' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Knead Khoya & Paneer Dough',
        text: 'Knead crumbled khoya and paneer together with the heel of your palm for 5 minutes until silky smooth. Add maida and baking powder. Knead into a crack-free soft dough.',
        durationMinutes: 8
      },
      {
        step: 2,
        title: 'Roll Crack-Free Jamuns',
        text: 'Pinch small portions and gently roll between palms into smooth, crack-free marble-sized balls. Keep covered with a damp cloth.',
        durationMinutes: 7
      },
      {
        step: 3,
        title: 'Make Rose & Saffron Chashni',
        text: 'In a wide pan, boil sugar and water with crushed cardamom and saffron for 6-8 minutes until slightly sticky (half-string consistency). Stir in rose water. Keep warm.',
        durationMinutes: 8
      },
      {
        step: 4,
        title: 'Gentle Ghee Fry',
        text: 'Heat ghee on low flame. Gently slide in jamuns. Slowly rotate ghee with ladle without touching balls until they rise and turn uniform deep golden brown.',
        durationMinutes: 10
      },
      {
        step: 5,
        title: 'Soak in Warm Syrup',
        text: 'Remove fried jamuns, drain ghee, and immediately immerse into warm sugar syrup. Let them soak for minimum 2 hours to become spongy and juicy.',
        durationMinutes: 5
      }
    ]
  },
  {
    id: 'amritsari-chole',
    title: 'Pindi Amritsari Chole',
    hindiTitle: 'पिंडी अमृतसरी छोले',
    category: 'Main Course',
    region: 'North Indian',
    course: 'Lunch / Dinner',
    diet: 'Veg',
    spiceLevel: 'Spicy',
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    isFavorite: false,
    rating: 4.89,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
    description: 'Dark, tangy, rustic Punjabi chickpeas simmered with whole spices, black tea infusion, pomegranate seeds (anardana), and ginger juliennes.',
    secretTip: 'Boil chickpeas with 2 tea bags and whole spices (black cardamom, cinnamon) to give them that authentic dark Punjabi dhaba color and deep earthy tone.',
    nutritionNote: 'Rich in plant-based proteins, fiber, folate, and low glycemic index.',
    ingredients: [
      { amount: '1.5', unit: 'cups', item: 'Kabuli Chana (Chickpeas, soaked)', category: 'Grains' },
      { amount: '2', unit: 'bags', item: 'Black Tea Bags (for rich dark color)', category: 'Pantry' },
      { amount: '2', unit: 'medium', item: 'Onions (finely chopped)', category: 'Produce' },
      { amount: '2', unit: 'medium', item: 'Tomatoes (pureed)', category: 'Produce' },
      { amount: '1.5', unit: 'tbsp', item: 'Chole Masala Powder', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Anardana (Pomegranate powder)', category: 'Spices' },
      { amount: '1', unit: 'tbsp', item: 'Ginger Juliennes', category: 'Produce' },
      { amount: '1/2', unit: 'tsp', item: 'Amchur (Dry Mango Powder)', category: 'Spices' },
      { amount: '2', unit: 'tbsp', item: 'Desi Ghee', category: 'Dairy' }
    ],
    instructions: [
      {
        step: 1,
        title: 'Boil Chana with Tea Bags',
        text: 'Soak chickpeas overnight. Pressure cook with 4 cups water, tea bags, 1 black cardamom, 1 cinnamon stick, and 1 tsp salt for 5 whistles until melt-in-mouth soft. Discard tea bags.',
        durationMinutes: 20
      },
      {
        step: 2,
        title: 'Bhunao Onion Masala',
        text: 'Heat ghee in a pan. Sauté finely chopped onions until deep golden brown. Add ginger-garlic paste and sauté for 1 minute.',
        durationMinutes: 7
      },
      {
        step: 3,
        title: 'Add Spices & Pureed Tomatoes',
        text: 'Add chole masala, anardana powder, amchur, Kashmiri chili powder, and tomato puree. Cook until ghee separates from masala.',
        durationMinutes: 6
      },
      {
        step: 4,
        title: 'Simmer & Mash Chickpeas',
        text: 'Add boiled chickpeas along with their dark broth. Mash a ladleful of chickpeas to thicken gravy. Simmer for 15 minutes. Top with ghee-fried ginger juliennes and slit green chilies.',
        durationMinutes: 15
      }
    ]
  }
];
