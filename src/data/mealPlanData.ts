import { DayMealPlan, DayOfWeek } from '../types/fitness';

export const WEEKLY_MEAL_PLANS: Record<DayOfWeek, DayMealPlan> = {
  Monday: {
    day: 'Monday',
    totalCalories: 2450,
    totalProtein: 185,
    totalCarbs: 250,
    totalFat: 68,
    meals: {
      breakfast: {
        type: 'Breakfast',
        timeSuggestion: '7:30 AM',
        items: [
          {
            id: 'mon-b1',
            name: '4 Egg Whites + 2 Whole Eggs Scramble',
            portion: '4 egg whites + 2 large whole eggs (approx 200g)',
            protein: 28,
            carbs: 2,
            fat: 10,
            calories: 215,
            cookingInstructions: 'Whisk eggs with a pinch of pink Himalayan salt and black pepper. Scramble in non-stick skillet with 1 tsp olive oil or light spray on medium-low heat until fluffy.',
            healthyAlternatives: 'Organic pasture-raised eggs, or liquid egg whites with turmeric.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Tofu Bhurji / Scramble with Turmeric & Spinach',
              portion: '200g Firm Tofu crumbled',
              protein: 26,
              carbs: 5,
              fat: 11,
              calories: 220,
              cookingInstructions: 'Sauté crumbled firm tofu with diced tomatoes, spinach, turmeric, black salt (kala namak for eggy flavor), and light cumin.'
            }
          },
          {
            id: 'mon-b2',
            name: 'Rolled Oats with Banana & Almond Milk',
            portion: '60g dry oats + 1 medium banana + 200ml unsweetened almond milk',
            protein: 9,
            carbs: 62,
            fat: 5,
            calories: 320,
            cookingInstructions: 'Simmer rolled oats in almond milk with a dash of cinnamon for 5 minutes. Top with freshly sliced ripe banana and 1 tsp chia seeds.',
            healthyAlternatives: 'Steel-cut oats, quinoa flakes, or overnight chilled chia oats.',
            isVegetarian: true
          }
        ]
      },
      morningSnack: {
        type: 'Morning Snack',
        timeSuggestion: '10:30 AM',
        items: [
          {
            id: 'mon-ms1',
            name: 'Greek Yogurt with Mixed Berries & Walnuts',
            portion: '170g non-fat Greek yogurt + 50g blueberries + 15g crushed walnuts',
            protein: 20,
            carbs: 18,
            fat: 9,
            calories: 230,
            cookingInstructions: 'Layer Greek yogurt in a bowl, fold in fresh blueberries, and top with raw walnut pieces and a dusting of cinnamon.',
            healthyAlternatives: 'Coconut yogurt with pea protein powder or dairy-free almond yogurt.',
            isVegetarian: true,
            vegAlternative: {
              name: 'Sprouted Moong & Pomegranate Chaat',
              portion: '150g sprouted green moong beans + 30g pomegranate',
              protein: 16,
              carbs: 28,
              fat: 2,
              calories: 195,
              cookingInstructions: 'Toss steamed sprouted moong beans with lime juice, chaat masala, fresh coriander, and crisp pomegranate arils.'
            }
          }
        ]
      },
      lunch: {
        type: 'Lunch',
        timeSuggestion: '1:30 PM',
        items: [
          {
            id: 'mon-l1',
            name: 'Herb Grilled Chicken Breast with Brown Rice',
            portion: '180g skinless chicken breast + 150g cooked brown basmati rice',
            protein: 46,
            carbs: 42,
            fat: 6,
            calories: 410,
            cookingInstructions: 'Marinate chicken in lemon juice, garlic, oregano, and black pepper. Grill for 6-7 minutes per side. Serve over fluffy steamed brown rice.',
            healthyAlternatives: 'Wild rice, quinoa, or roasted mashed sweet potato.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Grilled Herb Paneer or High-Protein Tempeh with Brown Rice',
              portion: '150g Low-fat Paneer or 160g Marinated Organic Tempeh',
              protein: 36,
              carbs: 44,
              fat: 14,
              calories: 440,
              cookingInstructions: 'Pan-sear spiced cottage cheese (paneer) cubes or tempeh in olive oil until golden and fragrant with garlic-herb seasoning.'
            }
          },
          {
            id: 'mon-l2',
            name: 'Steamed Broccoli, Carrots & Probiotic Curd',
            portion: '150g mixed veggies + 100g probiotic plain curd',
            protein: 6,
            carbs: 12,
            fat: 3,
            calories: 95,
            cookingInstructions: 'Steam florets of broccoli and carrot coins until tender-crisp. Serve with a chilled bowl of cumin-spiced homemade curd.',
            healthyAlternatives: 'Steamed green asparagus, zucchini, or kefir.',
            isVegetarian: true
          }
        ]
      },
      eveningSnack: {
        type: 'Evening Snack',
        timeSuggestion: '5:00 PM',
        items: [
          {
            id: 'mon-es1',
            name: 'Whey Isolate Shake with Rice Cakes & Peanut Butter',
            portion: '1 scoop (30g) Whey Isolate + 2 brown rice cakes + 1 tbsp peanut butter',
            protein: 30,
            carbs: 22,
            fat: 8,
            calories: 275,
            cookingInstructions: 'Shake whey powder in 250ml ice-cold water. Spread 1 level tablespoon of natural creamy peanut butter over 2 crunchy rice cakes.',
            healthyAlternatives: 'Plant pea/rice isolate blend, almond butter, or sliced apple wedges.',
            isVegetarian: true,
            vegAlternative: {
              name: 'Plant Protein Shake with Roasted Chana / Edamame',
              portion: '1 scoop Organic Pea Protein + 40g roasted spiced chickpeas',
              protein: 31,
              carbs: 26,
              fat: 5,
              calories: 270,
              cookingInstructions: 'Blend plant protein powder with chilled oat milk; munch with dry-roasted crisp chickpeas.'
            }
          }
        ]
      },
      dinner: {
        type: 'Dinner',
        timeSuggestion: '8:00 PM',
        items: [
          {
            id: 'mon-d1',
            name: 'Grilled White Fish / Salmon with Baked Sweet Potato',
            portion: '180g white fish fillet (or wild salmon) + 160g baked sweet potato',
            protein: 42,
            carbs: 38,
            fat: 8,
            calories: 390,
            cookingInstructions: 'Season fish fillet with sea salt, paprika, and lemon juice; pan-sear or bake at 200°C for 12 minutes. Bake sweet potato wrapped in foil until tender.',
            healthyAlternatives: 'Mahi mahi, cod, or roasted butternut squash.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Stir-Fried Edamame, Tofu & Sweet Potato Bowl',
              portion: '120g Edamame beans + 120g Firm Tofu + 160g Sweet potato',
              protein: 35,
              carbs: 46,
              fat: 10,
              calories: 410,
              cookingInstructions: 'Wok-toss shelled edamame and cubed tofu with ginger, soy aminos, and roasted sweet potato chunks.'
            }
          },
          {
            id: 'mon-d2',
            name: 'Mediterranean Crunchy Rainbow Salad',
            portion: '1 bowl: Romaine lettuce, cucumbers, cherry tomatoes, olives, olive oil',
            protein: 3,
            carbs: 9,
            fat: 7,
            calories: 110,
            cookingInstructions: 'Chop fresh greens, toss with 1 tsp extra virgin olive oil, apple cider vinegar, and dried oregano.',
            healthyAlternatives: 'Arugula and shaved radish salad with lemon vinaigrette.',
            isVegetarian: true
          }
        ]
      },
      beforeBed: {
        type: 'Before Bed',
        timeSuggestion: '10:30 PM',
        items: [
          {
            id: 'mon-bb1',
            name: 'Micellar Casein Protein or Warm Haldi Turmeric Milk',
            portion: '25g Casein protein in 250ml water OR 250ml warm milk with golden turmeric',
            protein: 21,
            carbs: 4,
            fat: 2,
            calories: 120,
            cookingInstructions: 'Mix slow-digesting micellar casein or warm low-fat milk with pinch of organic turmeric, black pepper, and cardamon for deep overnight recovery.',
            healthyAlternatives: 'Warm chamomile tea with a side of 10 raw almonds.',
            isVegetarian: true
          }
        ]
      }
    }
  },
  Tuesday: {
    day: 'Tuesday',
    totalCalories: 2520,
    totalProtein: 190,
    totalCarbs: 260,
    totalFat: 70,
    meals: {
      breakfast: {
        type: 'Breakfast',
        timeSuggestion: '7:30 AM',
        items: [
          {
            id: 'tue-b1',
            name: 'Protein Oatmeal Power Bowl with Peanut Butter',
            portion: '70g oats + 1 scoop whey isolate + 1 tbsp peanut butter + cinnamon',
            protein: 35,
            carbs: 52,
            fat: 12,
            calories: 450,
            cookingInstructions: 'Cook oats in boiling water. Remove from heat, let cool 60 seconds, then vigorously stir in whey protein to avoid clumping. Swirl in peanut butter.',
            healthyAlternatives: 'Almond butter, flaxseed meal, or chia seed pudding.',
            isVegetarian: true
          },
          {
            id: 'tue-b2',
            name: 'Whole Orange & Green Tea',
            portion: '1 large fresh orange + 1 mug brewed organic green tea',
            protein: 2,
            carbs: 22,
            fat: 0,
            calories: 90,
            cookingInstructions: 'Peel and slice orange to retain all dietary bioflavonoids and dietary fiber. Steep green tea for 3 minutes.',
            healthyAlternatives: 'Grapefruit, kiwi fruit, or matcha tea.',
            isVegetarian: true
          }
        ]
      },
      morningSnack: {
        type: 'Morning Snack',
        timeSuggestion: '10:30 AM',
        items: [
          {
            id: 'tue-ms1',
            name: 'Hard Boiled Eggs with Guacamole',
            portion: '3 boiled eggs (1 whole + 2 whites) + 40g fresh mashed avocado',
            protein: 16,
            carbs: 4,
            fat: 11,
            calories: 180,
            cookingInstructions: 'Boil eggs for 9 minutes, peel, slice in halves. Spoon freshly mashed avocado seasoned with lime juice and red chili flakes on top.',
            healthyAlternatives: 'Hummus with cucumber rounds.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Hummus & Roasted Chickpea Dip with Veggie Sticks',
              portion: '60g organic hummus + 80g crunchy carrot & celery sticks',
              protein: 10,
              carbs: 18,
              fat: 9,
              calories: 190,
              cookingInstructions: 'Dip fresh crunchy bell pepper, cucumber, and carrot batons into creamy tahini hummus.'
            }
          }
        ]
      },
      lunch: {
        type: 'Lunch',
        timeSuggestion: '1:30 PM',
        items: [
          {
            id: 'tue-l1',
            name: 'Lean Turkey or Beef Patty with Roasted Quinoa',
            portion: '180g 93% lean ground turkey breast/beef + 150g cooked quinoa',
            protein: 44,
            carbs: 35,
            fat: 10,
            calories: 410,
            cookingInstructions: 'Form lean mince into patty seasoned with cumin, garlic powder, and onion flakes. Pan-grill 4-5 mins each side. Serve atop warm fluffy quinoa.',
            healthyAlternatives: 'Chicken mince patties or baked salmon.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Spiced Black Bean & Lentil Protein Patties',
              portion: '2 large handmade bean patties (200g) + 150g cooked quinoa',
              protein: 28,
              carbs: 58,
              fat: 8,
              calories: 420,
              cookingInstructions: 'Mash black beans and cooked brown lentils with oat flour and spices. Pan-sear in olive oil until crispy on the outside.'
            }
          },
          {
            id: 'tue-l2',
            name: 'Steamed Asparagus Spears with Lemon Zest',
            portion: '150g fresh asparagus + 1 tsp olive oil',
            protein: 4,
            carbs: 6,
            fat: 4,
            calories: 75,
            cookingInstructions: 'Snap woody ends off asparagus. Steam for 4 minutes until bright green. Drizzle with cold-pressed olive oil, lemon zest, and flaky sea salt.',
            healthyAlternatives: 'Sautéed French green beans or grilled zucchini spears.',
            isVegetarian: true
          }
        ]
      },
      eveningSnack: {
        type: 'Evening Snack',
        timeSuggestion: '5:00 PM',
        items: [
          {
            id: 'tue-es1',
            name: 'Protein Bar / Whey Smoothie with Apple',
            portion: '1 high-protein low-sugar bar (60g) + 1 crisp green Granny Smith apple',
            protein: 22,
            carbs: 32,
            fat: 6,
            calories: 260,
            cookingInstructions: 'Slice crisp apple, pair with your favorite clean protein bar for steady glucose release before evening training.',
            healthyAlternatives: 'Whey shake blended with 1/2 frozen banana.',
            isVegetarian: true
          }
        ]
      },
      dinner: {
        type: 'Dinner',
        timeSuggestion: '8:00 PM',
        items: [
          {
            id: 'tue-d1',
            name: 'Zesty Lemon Pepper Chicken Breast with Roast Potatoes',
            portion: '180g chicken breast + 180g baby gold potatoes roasted in rosemary',
            protein: 46,
            carbs: 36,
            fat: 7,
            calories: 390,
            cookingInstructions: 'Rub chicken with cracked black pepper, lemon juice, and thyme. Roast baby potatoes tossed in rosemary until golden crisp on outside.',
            healthyAlternatives: 'Baked cod or extra-firm grilled tofu steaks.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Tandoori Soya Chaap / High-Protein Soya Chunks Curry',
              portion: '80g dry soya chunks (makes 220g cooked) in tomato gravy + potatoes',
              protein: 42,
              carbs: 40,
              fat: 7,
              calories: 410,
              cookingInstructions: 'Hydrate soya chunks in hot water, squeeze dry, and simmer in rich tomato, ginger, garlic, and garam masala gravy.'
            }
          },
          {
            id: 'tue-d2',
            name: 'Spinach & Rocket Baby Salad with Pumpkin Seeds',
            portion: '80g baby leaves + 15g roasted pepitas (pumpkin seeds)',
            protein: 6,
            carbs: 5,
            fat: 8,
            calories: 110,
            cookingInstructions: 'Toss young tender greens with balsamic glaze and toasted zinc-rich pumpkin seeds.',
            healthyAlternatives: 'Kale and toasted sunflower seeds.',
            isVegetarian: true
          }
        ]
      },
      beforeBed: {
        type: 'Before Bed',
        timeSuggestion: '10:30 PM',
        items: [
          {
            id: 'tue-bb1',
            name: 'Low-Fat Cottage Cheese / Paneer with Cinnamon',
            portion: '150g low-fat cottage cheese + splash of vanilla + pinch of stevia',
            protein: 21,
            carbs: 6,
            fat: 3,
            calories: 135,
            cookingInstructions: 'Whip cottage cheese until silky smooth, dusting with Ceylon cinnamon to stabilize nighttime insulin sensitivity.',
            healthyAlternatives: 'Casein shake or almond milk golden tea.',
            isVegetarian: true
          }
        ]
      }
    }
  },
  Wednesday: {
    day: 'Wednesday',
    totalCalories: 2600,
    totalProtein: 195,
    totalCarbs: 275,
    totalFat: 72,
    meals: {
      breakfast: {
        type: 'Breakfast',
        timeSuggestion: '7:30 AM',
        items: [
          {
            id: 'wed-b1',
            name: 'Whole Grain Sourdough Toast with Sliced Avocado & Poached Eggs',
            portion: '2 slices artisan sourdough + 2 poached eggs + 50g ripe avocado',
            protein: 20,
            carbs: 38,
            fat: 16,
            calories: 380,
            cookingInstructions: 'Toast sourdough until crisp. Mash avocado with sea salt. Poach 2 fresh eggs for 3 minutes until yolks are creamy. Assemble and garnish with chili flakes.',
            healthyAlternatives: 'Ezekiel sprouted grain bread, gluten-free seeded bread.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Sourdough with Smashed Chickpea Avocado & Nutritional Yeast',
              portion: '2 sourdough slices + 100g mashed spiced chickpeas with avocado',
              protein: 18,
              carbs: 46,
              fat: 14,
              calories: 390,
              cookingInstructions: 'Coarsely mash boiled chickpeas with ripe avocado, nutritional yeast, lemon juice, and smoked paprika. Spread lavishly onto toast.'
            }
          },
          {
            id: 'wed-b2',
            name: 'Fresh Papaya Bowl with Lime',
            portion: '150g ripe cubed papaya',
            protein: 1,
            carbs: 18,
            fat: 0,
            calories: 70,
            cookingInstructions: 'Cube chilled papaya and squeeze fresh lime juice over it for digestive enzymes (papain).',
            healthyAlternatives: 'Pineapple chunks (contains bromelain) or sliced strawberries.',
            isVegetarian: true
          }
        ]
      },
      morningSnack: {
        type: 'Morning Snack',
        timeSuggestion: '10:30 AM',
        items: [
          {
            id: 'wed-ms1',
            name: 'Creamy Whey Smoothie with Spinach & Chia',
            portion: '1 scoop vanilla whey + 50g baby spinach + 10g chia seeds + almond milk',
            protein: 27,
            carbs: 10,
            fat: 5,
            calories: 190,
            cookingInstructions: 'Blend high-speed for 45 seconds until velvety smooth. Spinach taste vanishes completely.',
            healthyAlternatives: 'Hemp seed protein or spirulina protein smoothie.',
            isVegetarian: true
          }
        ]
      },
      lunch: {
        type: 'Lunch',
        timeSuggestion: '1:30 PM',
        items: [
          {
            id: 'wed-l1',
            name: 'Grilled Steak or Chicken Thigh with Steamed Jasmine Rice',
            portion: '170g lean sirloin steak / boneless chicken + 160g cooked jasmine rice',
            protein: 44,
            carbs: 45,
            fat: 9,
            calories: 440,
            cookingInstructions: 'Sear steak in cast-iron skillet for 3 minutes per side. Rest for 5 minutes before slicing against the grain.',
            healthyAlternatives: 'Brown basmati rice or mashed purple yam.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Rajma (Red Kidney Beans) & Paneer Tikka with Rice',
              portion: '200g slow-cooked spiced red kidney beans + 80g grilled paneer',
              protein: 34,
              carbs: 52,
              fat: 11,
              calories: 460,
              cookingInstructions: 'Simmer red kidney beans in authentic onion-tomato-ginger masala. Serve with charred spiced paneer skewers.'
            }
          },
          {
            id: 'wed-l2',
            name: 'Sautéed Garlic Green Beans',
            portion: '120g fresh French green beans sautéed in olive oil & garlic',
            protein: 3,
            carbs: 8,
            fat: 4,
            calories: 75,
            cookingInstructions: 'Blanch beans for 2 minutes, then flash-fry in skillet with minced garlic and chili flakes.',
            healthyAlternatives: 'Steamed sugar snap peas or edamame pods.',
            isVegetarian: true
          }
        ]
      },
      eveningSnack: {
        type: 'Evening Snack',
        timeSuggestion: '5:00 PM',
        items: [
          {
            id: 'wed-es1',
            name: 'Roasted Makhana (Fox Nuts) & Roasted Almonds',
            portion: '30g crunchy roasted makhana + 15 raw almonds',
            protein: 8,
            carbs: 22,
            fat: 10,
            calories: 210,
            cookingInstructions: 'Dry roast fox nuts in a pan with a pinch of ghee, pink salt, and chaat masala until super crisp.',
            healthyAlternatives: 'Air-popped non-GMO popcorn or roasted pumpkin seeds.',
            isVegetarian: true
          }
        ]
      },
      dinner: {
        type: 'Dinner',
        timeSuggestion: '8:00 PM',
        items: [
          {
            id: 'wed-d1',
            name: 'Oven-Baked Cod / Salmon with Herb Couscous',
            portion: '180g Atlantic cod fillet + 140g prepared herb pearl couscous',
            protein: 42,
            carbs: 38,
            fat: 6,
            calories: 380,
            cookingInstructions: 'Bake fish with dill, lemon slices, and crushed garlic. Fluff couscous with chopped parsley and vegetable broth.',
            healthyAlternatives: 'Grilled chicken breast or quinoa.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Lentil & Vegetable Shepherd’s Pie / Paneer Steak',
              portion: '220g brown lentil & vegetable stew topped with cauliflower mash',
              protein: 30,
              carbs: 45,
              fat: 8,
              calories: 390,
              cookingInstructions: 'Layer seasoned green lentils and diced vegetables under a creamy golden-baked cauliflower-potato mash.'
            }
          },
          {
            id: 'wed-d2',
            name: 'Cucumber Radish Crisp Salad',
            portion: '1 bowl: sliced Persian cucumbers, red radishes, mint leaves, lemon juice',
            protein: 2,
            carbs: 6,
            fat: 1,
            calories: 40,
            cookingInstructions: 'Thinly slice cucumbers and radishes; toss with fresh garden mint and squeeze of lemon.',
            healthyAlternatives: 'Mixed baby greens.',
            isVegetarian: true
          }
        ]
      },
      beforeBed: {
        type: 'Before Bed',
        timeSuggestion: '10:30 PM',
        items: [
          {
            id: 'wed-bb1',
            name: 'Magnesium Chamomile Elixir & Casein Protein',
            portion: '20g micellar casein + warm chamomile infusion',
            protein: 20,
            carbs: 2,
            fat: 1,
            calories: 100,
            cookingInstructions: 'Drink warm chamomile tea with magnesium glycinate for deep REM sleep; drink casein shake right before bed.',
            healthyAlternatives: 'Warm oat milk with nutmeg.',
            isVegetarian: true
          }
        ]
      }
    }
  },
  Thursday: {
    day: 'Thursday',
    totalCalories: 2480,
    totalProtein: 188,
    totalCarbs: 255,
    totalFat: 69,
    meals: {
      breakfast: {
        type: 'Breakfast',
        timeSuggestion: '7:30 AM',
        items: [
          {
            id: 'thu-b1',
            name: 'Egg & Veggie Loaded Omelette with Brown Bread',
            portion: '3 eggs (2 whole + 2 whites) with bell peppers & mushrooms + 2 slices brown bread',
            protein: 28,
            carbs: 34,
            fat: 13,
            calories: 370,
            cookingInstructions: 'Whisk eggs, fold in sautéed diced bell peppers, red onion, and button mushrooms. Cook omelette until golden. Serve with toasted wholemeal bread.',
            healthyAlternatives: 'Ezekiel bread or sweet potato hash.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Besan & Moong Dal Chilla (High-Protein Savory Pancakes)',
              portion: '2 large chillas made with chickpea flour, paneer stuffing, and herbs',
              protein: 24,
              carbs: 40,
              fat: 9,
              calories: 360,
              cookingInstructions: 'Mix besan (gram flour) with water, chopped onions, and chilies. Pour onto tawa like a crepe, stuff with 50g grated paneer.'
            }
          },
          {
            id: 'thu-b2',
            name: 'Crisp Green Apple with Cinnamon',
            portion: '1 medium apple sliced',
            protein: 1,
            carbs: 22,
            fat: 0,
            calories: 85,
            cookingInstructions: 'Wash, core, and slice apple. Dust with Ceylon cinnamon powder.',
            healthyAlternatives: 'Pear slices or fresh berries.',
            isVegetarian: true
          }
        ]
      },
      morningSnack: {
        type: 'Morning Snack',
        timeSuggestion: '10:30 AM',
        items: [
          {
            id: 'thu-ms1',
            name: 'Spiced Buttermilk (Chaas) with Boiled Egg Whites',
            portion: '300ml probiotic buttermilk + 3 boiled egg whites',
            protein: 17,
            carbs: 8,
            fat: 2,
            calories: 120,
            cookingInstructions: 'Whisk chilled curd with cold water, roasted cumin, black salt, and mint. Eat alongside seasoned boiled egg whites.',
            healthyAlternatives: 'Soy milk kefir or salted edamame.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Spiced Buttermilk with Roasted Soya Nuts',
              portion: '300ml spiced buttermilk + 30g roasted soya nuts',
              protein: 19,
              carbs: 14,
              fat: 4,
              calories: 165,
              cookingInstructions: 'Sip refreshing cumin chaas while crunching on high-protein roasted soybeans.'
            }
          }
        ]
      },
      lunch: {
        type: 'Lunch',
        timeSuggestion: '1:30 PM',
        items: [
          {
            id: 'thu-l1',
            name: 'Mediterranean Grilled Chicken Shawarma Bowl',
            portion: '180g spiced chicken breast + 150g brown rice + 1 tbsp tahini garlic drizzle',
            protein: 48,
            carbs: 40,
            fat: 10,
            calories: 440,
            cookingInstructions: 'Season chicken breast with cumin, coriander, sumac, garlic, and grill. Assemble bowl over warm brown rice, cucumbers, and tahini.',
            healthyAlternatives: 'Quinoa bowl or whole wheat pita pocket.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Falafel & Grilled Halloumi / Tofu Mediterranean Bowl',
              portion: '4 baked herb falafels + 80g grilled tofu + 150g brown rice',
              protein: 32,
              carbs: 52,
              fat: 12,
              calories: 450,
              cookingInstructions: 'Bake soaked chickpea herb falafels until golden. Assemble with pan-seared tofu, parsley, and garlic tahini dressing.'
            }
          },
          {
            id: 'thu-l2',
            name: 'Charred Zucchini & Cherry Tomato Medley',
            portion: '150g grilled vegetables with balsamic drizzle',
            protein: 3,
            carbs: 9,
            fat: 3,
            calories: 70,
            cookingInstructions: 'Toss vegetables on a smoking hot grill pan until grill marks form.',
            healthyAlternatives: 'Sautéed mushrooms and spinach.',
            isVegetarian: true
          }
        ]
      },
      eveningSnack: {
        type: 'Evening Snack',
        timeSuggestion: '5:00 PM',
        items: [
          {
            id: 'thu-es1',
            name: 'Protein Mug Cake or Protein Shake with Oats',
            portion: '1 scoop chocolate whey + 20g oat flour + 1 egg white microwaved 45s',
            protein: 30,
            carbs: 18,
            fat: 3,
            calories: 220,
            cookingInstructions: 'Whisk protein powder, oat flour, baking pinch, and almond milk in a mug. Microwave 45 seconds for a warm guilt-free cake.',
            healthyAlternatives: 'Chilled protein shake with ice cubes.',
            isVegetarian: true
          }
        ]
      },
      dinner: {
        type: 'Dinner',
        timeSuggestion: '8:00 PM',
        items: [
          {
            id: 'thu-d1',
            name: 'Pan-Seared Salmon Fillet with Mashed Cauliflower & Sweet Potato',
            portion: '170g wild salmon + 150g half sweet potato & cauliflower mash',
            protein: 40,
            carbs: 30,
            fat: 14,
            calories: 420,
            cookingInstructions: 'Crisp salmon skin in hot skillet for 4 mins, flip for 3 mins. Boil sweet potato and cauliflower florets and mash with garlic and salt.',
            healthyAlternatives: 'Trout fillet, sea bass, or grilled chicken.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Pan-Roasted Spiced Paneer Steak with Cauliflower Mash',
              portion: '160g cottage cheese (paneer) marinated in tandoori spices',
              protein: 32,
              carbs: 28,
              fat: 18,
              calories: 410,
              cookingInstructions: 'Marinate thick cut slab of paneer in yogurt, ginger-garlic paste, and roasted cumin. Sear until golden and crispy.'
            }
          },
          {
            id: 'thu-d2',
            name: 'Arugula & Shaved Parmesan Salad',
            portion: '60g peppery baby arugula + 10g shaved parmesan + lemon juice',
            protein: 4,
            carbs: 2,
            fat: 4,
            calories: 60,
            cookingInstructions: 'Toss peppery wild arugula with lemon juice and paper-thin shards of aged parmesan cheese.',
            healthyAlternatives: 'Baby spinach with nutritional yeast flakes.',
            isVegetarian: true
          }
        ]
      },
      beforeBed: {
        type: 'Before Bed',
        timeSuggestion: '10:30 PM',
        items: [
          {
            id: 'thu-bb1',
            name: 'Greek Yogurt with Almonds & Ceylon Cinnamon',
            portion: '150g 0% Greek yogurt + 10 whole raw almonds',
            protein: 18,
            carbs: 6,
            fat: 6,
            calories: 150,
            cookingInstructions: 'Top velvety Greek yogurt with whole crunchy almonds and fragrant cinnamon.',
            healthyAlternatives: 'Casein pudding or warm unsweetened soy milk.',
            isVegetarian: true
          }
        ]
      }
    }
  },
  Friday: {
    day: 'Friday',
    totalCalories: 2550,
    totalProtein: 192,
    totalCarbs: 265,
    totalFat: 70,
    meals: {
      breakfast: {
        type: 'Breakfast',
        timeSuggestion: '7:30 AM',
        items: [
          {
            id: 'fri-b1',
            name: 'Banana Protein Pancakes with Pure Maple Drizzle',
            portion: '3 fluffy pancakes (made with 1 banana, 2 eggs, 1 scoop vanilla whey, 30g oats)',
            protein: 34,
            carbs: 48,
            fat: 8,
            calories: 410,
            cookingInstructions: 'Blend banana, eggs, oats, and whey powder in a blender until smooth. Cook on medium-hot griddle for 2 mins per side until bubbling and golden.',
            healthyAlternatives: 'Buckwheat flour pancakes or waffle stack.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Vegan Banana Oat Protein Pancakes (Egg-Free)',
              portion: '3 fluffy pancakes made with flax egg, oats, pea protein, and banana',
              protein: 28,
              carbs: 52,
              fat: 6,
              calories: 390,
              cookingInstructions: 'Mix 1 tbsp ground flax with 3 tbsp warm water (egg replacer). Blend with ripe banana, oat flour, plant protein, and almond milk. Cook golden on non-stick pan.'
            }
          },
          {
            id: 'fri-b2',
            name: 'Mixed Fresh Berries (Blueberries & Strawberries)',
            portion: '100g fresh mixed berries',
            protein: 1,
            carbs: 14,
            fat: 0,
            calories: 60,
            cookingInstructions: 'Rinse fresh berries and scatter atop hot pancakes.',
            healthyAlternatives: 'Raspberries, blackberries, or pomegranate.',
            isVegetarian: true
          }
        ]
      },
      morningSnack: {
        type: 'Morning Snack',
        timeSuggestion: '10:30 AM',
        items: [
          {
            id: 'fri-ms1',
            name: 'Sprouted Green Salad with Boiled Eggs',
            portion: '100g sprouted moong + 2 hard boiled egg whites + lime juice',
            protein: 14,
            carbs: 16,
            fat: 1,
            calories: 130,
            cookingInstructions: 'Mix crisp sprouts with diced red onion, tomatoes, cilantro, and diced boiled egg whites.',
            healthyAlternatives: 'Steamed edamame or roasted spiced chickpeas.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Sprouted Moong & Paneer Cubes Salad',
              portion: '100g sprouted moong + 40g fresh low-fat paneer cubes',
              protein: 16,
              carbs: 18,
              fat: 4,
              calories: 170,
              cookingInstructions: 'Toss raw sprouted beans with soft paneer cubes, chaat masala, and a squeeze of juicy lime.'
            }
          }
        ]
      },
      lunch: {
        type: 'Lunch',
        timeSuggestion: '1:30 PM',
        items: [
          {
            id: 'fri-l1',
            name: 'Thai Basil Chicken with Brown Jasmine Rice',
            portion: '180g minced chicken breast sautéed with holy basil + 150g brown rice',
            protein: 45,
            carbs: 42,
            fat: 8,
            calories: 430,
            cookingInstructions: 'Stir-fry minced chicken with garlic, Thai bird eye chilies, soy aminos, and fresh fragrant basil leaves until cooked through.',
            healthyAlternatives: 'Lean turkey mince or shrimp.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Thai Basil Tofu & Edamame with Brown Rice',
              portion: '160g firm pressed tofu + 60g shelled edamame in basil sauce',
              protein: 34,
              carbs: 46,
              fat: 12,
              calories: 440,
              cookingInstructions: 'Stir-fry cubed pressed tofu and bright green edamame with garlic, chilies, soy sauce, and aromatic fresh basil leaves.'
            }
          },
          {
            id: 'fri-l2',
            name: 'Wok-Tossed Bok Choy & Shiitake Mushrooms',
            portion: '150g bok choy and mushroom caps',
            protein: 4,
            carbs: 7,
            fat: 2,
            calories: 60,
            cookingInstructions: 'Sauté in hot wok with drops of sesame oil and minced ginger.',
            healthyAlternatives: 'Chinese broccoli (gai lan) or snap peas.',
            isVegetarian: true
          }
        ]
      },
      eveningSnack: {
        type: 'Evening Snack',
        timeSuggestion: '5:00 PM',
        items: [
          {
            id: 'fri-es1',
            name: 'Whey Protein Shake with Chia Seeds & Rice Cake',
            portion: '1 scoop whey isolate + 1 tsp chia seeds + 2 plain rice cakes',
            protein: 28,
            carbs: 20,
            fat: 4,
            calories: 230,
            cookingInstructions: 'Shake whey in ice water. Sip alongside crunchy whole grain rice cakes for clean glycogen replenishment.',
            healthyAlternatives: 'Plant protein with roasted chana.',
            isVegetarian: true
          }
        ]
      },
      dinner: {
        type: 'Dinner',
        timeSuggestion: '8:00 PM',
        items: [
          {
            id: 'fri-d1',
            name: 'Grilled Fish Fillet / Herb Chicken with Roasted Butternut Squash',
            portion: '180g white fish or chicken breast + 180g roasted sweet butternut squash cubes',
            protein: 44,
            carbs: 34,
            fat: 7,
            calories: 380,
            cookingInstructions: 'Pan-sear seasoned fish or chicken until juicy. Roast butternut squash cubes with smoked paprika until edges caramelize.',
            healthyAlternatives: 'Baked cod or sweet potatoes.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Mediterranean Stuffed Bell Peppers with Quinoa & Lentils',
              portion: '2 large roasted bell peppers stuffed with lentil-quinoa pilaf',
              protein: 28,
              carbs: 52,
              fat: 8,
              calories: 400,
              cookingInstructions: 'Stuff halved sweet bell peppers with cooked brown lentils, quinoa, herbs, and bake at 190°C for 25 minutes.'
            }
          },
          {
            id: 'fri-d2',
            name: 'Garden Fresh Green Salad with Olive Oil Vinaigrette',
            portion: '1 bowl: crisp greens, cucumber, diced red bell pepper',
            protein: 2,
            carbs: 6,
            fat: 5,
            calories: 80,
            cookingInstructions: 'Toss fresh garden vegetables with 1 tsp extra virgin olive oil and apple cider vinegar.',
            healthyAlternatives: 'Steamed green beans.',
            isVegetarian: true
          }
        ]
      },
      beforeBed: {
        type: 'Before Bed',
        timeSuggestion: '10:30 PM',
        items: [
          {
            id: 'fri-bb1',
            name: 'Slow-Release Casein Shake or Warm Golden Almond Milk',
            portion: '25g Casein protein powder in 250ml water OR 250ml warm almond milk with turmeric & saffron',
            protein: 21,
            carbs: 3,
            fat: 2,
            calories: 115,
            cookingInstructions: 'Mix casein powder with water for 7 hours of steady anti-catabolic amino acid release during sleep.',
            healthyAlternatives: 'Chamomile tea with 10 soaked almonds.',
            isVegetarian: true
          }
        ]
      }
    }
  },
  Saturday: {
    day: 'Saturday',
    totalCalories: 2650,
    totalProtein: 195,
    totalCarbs: 280,
    totalFat: 75,
    meals: {
      breakfast: {
        type: 'Breakfast',
        timeSuggestion: '8:00 AM',
        items: [
          {
            id: 'sat-b1',
            name: 'Weekend Power Breakfast: French Toast & Eggs',
            portion: '2 slices sourdough egg-dipped French toast + 3 scrambled egg whites + berries',
            protein: 30,
            carbs: 50,
            fat: 10,
            calories: 410,
            cookingInstructions: 'Dip sourdough in egg white, cinnamon, and vanilla splash. Pan toast until golden crisp. Serve with fresh strawberries.',
            healthyAlternatives: 'Oatmeal power bowl.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Vegan Chia Cinnamon French Toast & Tofu Scramble',
              portion: '2 slices sourdough dipped in chia milk batter + 120g scrambled tofu',
              protein: 24,
              carbs: 52,
              fat: 11,
              calories: 410,
              cookingInstructions: 'Dip artisanal bread in oat milk, chia seeds, and cinnamon; griddle until toasty. Pair with savory turmeric scrambled tofu.'
            }
          }
        ]
      },
      morningSnack: {
        type: 'Morning Snack',
        timeSuggestion: '11:00 AM',
        items: [
          {
            id: 'sat-ms1',
            name: 'Greek Yogurt with Granola & Honey',
            portion: '170g non-fat Greek yogurt + 25g high-protein granola + 1 tsp raw honey',
            protein: 20,
            carbs: 26,
            fat: 5,
            calories: 230,
            cookingInstructions: 'Layer Greek yogurt in a glass, top with crisp cluster granola and a golden drizzle of raw honey.',
            healthyAlternatives: 'Coconut yogurt with toasted seeds.',
            isVegetarian: true
          }
        ]
      },
      lunch: {
        type: 'Lunch',
        timeSuggestion: '2:00 PM',
        items: [
          {
            id: 'sat-l1',
            name: 'Grilled Steak or Chicken Burrito Bowl with Brown Rice & Black Beans',
            portion: '180g chicken/steak + 140g brown rice + 60g black beans + fresh salsa',
            protein: 48,
            carbs: 50,
            fat: 9,
            calories: 480,
            cookingInstructions: 'Season protein with Mexican fajita spices. Layer over brown rice, black beans, sweet corn, and zesty fresh tomato pico de gallo.',
            healthyAlternatives: 'Quinoa burrito bowl or whole grain wrap.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Fiesta Tempeh & Black Bean Burrito Bowl',
              portion: '160g seasoned tempeh strips + 100g black beans + brown rice + guacamole',
              protein: 36,
              carbs: 54,
              fat: 12,
              calories: 470,
              cookingInstructions: 'Pan-sear smoky chipotle tempeh. Layer over beans, cilantro rice, roasted sweet corn, and fresh salsa.'
            }
          }
        ]
      },
      eveningSnack: {
        type: 'Evening Snack',
        timeSuggestion: '5:30 PM',
        items: [
          {
            id: 'sat-es1',
            name: 'Protein Shake with Peanut Butter & Rice Crackers',
            portion: '1 scoop whey protein + 1 tbsp peanut butter + 2 rice crackers',
            protein: 29,
            carbs: 20,
            fat: 9,
            calories: 280,
            cookingInstructions: 'Whisk protein shake cold. Enjoy with peanut-butter topped crunchy crackers.',
            healthyAlternatives: 'Handful of mixed walnuts and almonds.',
            isVegetarian: true
          }
        ]
      },
      dinner: {
        type: 'Dinner',
        timeSuggestion: '8:30 PM',
        items: [
          {
            id: 'sat-d1',
            name: 'Healthy Homemade Grilled Chicken / Fish Burgers with Baked Wedges',
            portion: '180g lean chicken/fish burger on whole grain bun + 150g baked potato wedges',
            protein: 44,
            carbs: 52,
            fat: 10,
            calories: 480,
            cookingInstructions: 'Grill handmade lean meat patty. Assemble in whole wheat toasted bun with lettuce, tomatoes, and mustard. Bake hand-cut potato wedges with paprika.',
            healthyAlternatives: 'Lettuce wrap burger or grilled portobello.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Gourmet Black Bean & Quinoa Burger with Baked Wedges',
              portion: '1 large bean patty on whole grain bun + baked wedges',
              protein: 26,
              carbs: 65,
              fat: 9,
              calories: 450,
              cookingInstructions: 'Grill artisanal spiced bean patty. Serve on toasted seeded bun with avocado mash, pickles, and crispy oven wedges.'
            }
          }
        ]
      },
      beforeBed: {
        type: 'Before Bed',
        timeSuggestion: '11:00 PM',
        items: [
          {
            id: 'sat-bb1',
            name: 'Nighttime Herbal Tea & Cottage Cheese / Casein',
            portion: '150g low-fat cottage cheese or 1 scoop casein shake',
            protein: 22,
            carbs: 4,
            fat: 2,
            calories: 125,
            cookingInstructions: 'Eat slow-digesting cottage cheese with a dash of vanilla extract and sip calming chamomile or peppermint infusion.',
            healthyAlternatives: 'Warm almond milk.',
            isVegetarian: true
          }
        ]
      }
    }
  },
  Sunday: {
    day: 'Sunday',
    totalCalories: 2350,
    totalProtein: 175,
    totalCarbs: 240,
    totalFat: 65,
    meals: {
      breakfast: {
        type: 'Breakfast',
        timeSuggestion: '8:30 AM',
        items: [
          {
            id: 'sun-b1',
            name: 'Sunday Recovery Veggie Frittata with Sourdough',
            portion: '3 eggs (2 whole + 2 whites) baked with spinach, tomatoes, and feta + 1 sourdough slice',
            protein: 26,
            carbs: 26,
            fat: 12,
            calories: 320,
            cookingInstructions: 'Pour whisked eggs over sautéed baby spinach and cherry tomatoes in a cast-iron skillet. Crumble light feta on top and bake 15 minutes at 180°C.',
            healthyAlternatives: 'Scrambled eggs with smoked salmon.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Chickpea Flour & Tofu Spanish Frittata',
              portion: '2 slices baked chickpea flour & crumbled tofu slice with potatoes',
              protein: 22,
              carbs: 32,
              fat: 9,
              calories: 300,
              cookingInstructions: 'Whisk gram flour batter with herbs, onions, and crumbled tofu; bake until firm and slice like a savory pie.'
            }
          }
        ]
      },
      morningSnack: {
        type: 'Morning Snack',
        timeSuggestion: '11:00 AM',
        items: [
          {
            id: 'sun-ms1',
            name: 'Immunity Citrus Bowl with Walnuts',
            portion: '1 red grapefruit + 1 kiwi fruit + 15g raw walnut halves',
            protein: 5,
            carbs: 24,
            fat: 10,
            calories: 200,
            cookingInstructions: 'Slice chilled grapefruit and kiwi. Garnish with omega-3 rich walnut halves for brain and recovery support.',
            healthyAlternatives: 'Fresh strawberries and almonds.',
            isVegetarian: true
          }
        ]
      },
      lunch: {
        type: 'Lunch',
        timeSuggestion: '1:30 PM',
        items: [
          {
            id: 'sun-l1',
            name: 'Sunday Roast Chicken Breast with Roasted Root Vegetables',
            portion: '180g roast chicken breast + 180g roasted carrots, parsnips & sweet potato',
            protein: 46,
            carbs: 38,
            fat: 7,
            calories: 400,
            cookingInstructions: 'Herb-roast chicken with rosemary, thyme, and garlic cloves. Roast rainbow root vegetables on sheet pan until tender and sweet.',
            healthyAlternatives: 'Baked cod or lean roast beef.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Slow-Cooked Yellow Lentil Dal Tadka with Jeera Rice & Paneer',
              portion: '200g yellow moong/masoor dal + 140g jeera basmati rice + 60g grilled paneer',
              protein: 30,
              carbs: 52,
              fat: 9,
              calories: 420,
              cookingInstructions: 'Cook split yellow lentils until creamy. Temper with ghee, cumin seeds, garlic, and dried red chilies. Serve with fragrant cumin rice.'
            }
          }
        ]
      },
      eveningSnack: {
        type: 'Evening Snack',
        timeSuggestion: '5:00 PM',
        items: [
          {
            id: 'sun-es1',
            name: 'Matcha Green Tea Latte with Protein Energy Bites',
            portion: '1 cup warm unsweetened oat milk matcha + 2 homemade oat-date protein balls',
            protein: 14,
            carbs: 24,
            fat: 6,
            calories: 210,
            cookingInstructions: 'Whisk ceremonial grade matcha into steaming milk. Nibble on rolled oats, peanut butter, and protein balls.',
            healthyAlternatives: 'Herbal tea with rice cakes.',
            isVegetarian: true
          }
        ]
      },
      dinner: {
        type: 'Dinner',
        timeSuggestion: '7:30 PM',
        items: [
          {
            id: 'sun-d1',
            name: 'Nourishing Bone Broth / Hearty Minestrone with Grilled Protein',
            portion: '300ml rich vegetable or bone broth + 150g grilled chicken/fish + sourdough',
            protein: 42,
            carbs: 28,
            fat: 6,
            calories: 340,
            cookingInstructions: 'Simmer vegetable broth with celery, zucchini, and herbs. Serve with lean sliced protein and a crust of toasted bread.',
            healthyAlternatives: 'Pureed butternut squash soup with chicken.',
            isVegetarian: false,
            vegAlternative: {
              name: 'Hearty Tuscan White Bean & Kale Minestrone Soup',
              portion: '350ml thick soup with cannellini beans, kale, tomatoes, and quinoa',
              protein: 24,
              carbs: 46,
              fat: 6,
              calories: 340,
              cookingInstructions: 'Simmer tender cannellini beans with crushed plum tomatoes, garlic, Italian herbs, and chopped dinosaur kale. Garnish with olive oil.'
            }
          }
        ]
      },
      beforeBed: {
        type: 'Before Bed',
        timeSuggestion: '10:00 PM',
        items: [
          {
            id: 'sun-bb1',
            name: 'Golden Turmeric Coconut Elixir & Magnesium',
            portion: '250ml warm unsweetened coconut milk with turmeric, ginger, black pepper, and honey',
            protein: 3,
            carbs: 8,
            fat: 4,
            calories: 80,
            cookingInstructions: 'Gently heat milk with fresh grated ginger, organic turmeric, and pinch of black pepper (enhances curcumin absorption by 2000%).',
            healthyAlternatives: 'Chamomile tea with lemon balm.',
            isVegetarian: true
          }
        ]
      }
    }
  }
};
