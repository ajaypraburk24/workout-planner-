export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type MuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Shoulders'
  | 'Triceps'
  | 'Biceps'
  | 'Core'
  | 'Cardio'
  | 'Full Body'
  | 'Flexibility';

export type FitnessLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type FitnessGoal = 'Lose Fat' | 'Build Muscle' | 'Gain Weight' | 'Maintain Weight';

export type EquipmentType =
  | 'Full Gym'
  | 'Dumbbells Only'
  | 'Bodyweight'
  | 'Resistance Bands'
  | 'Home Gym';

export type DietaryPreference = 'Non-Vegetarian' | 'Vegetarian' | 'Vegan';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  secondaryMuscles?: string[];
  sets: number;
  reps: string;
  restTime: number; // in seconds
  caloriesBurned: number;
  difficulty: FitnessLevel;
  description: string;
  tips: string[];
  instructions: string[];
  equipment: string;
  iconName?: string;
}

export interface RecoveryActivity {
  id: string;
  name: string;
  duration: string;
  caloriesBurned: number;
  description: string;
  tips: string[];
  instructions: string[];
  benefits: string;
}

export interface DayWorkoutPlan {
  day: DayOfWeek;
  title: string;
  tagline: string;
  targetMuscles: string;
  estimatedDuration: number; // in minutes
  estimatedCalories: number;
  exercises: Exercise[];
  recoveryActivities?: RecoveryActivity[];
}

export interface MealFoodItem {
  id: string;
  name: string;
  portion: string;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  calories: number;
  cookingInstructions: string;
  healthyAlternatives: string;
  isVegetarian?: boolean;
  vegAlternative?: {
    name: string;
    portion: string;
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
    cookingInstructions: string;
  };
}

export interface MealSlot {
  type: 'Breakfast' | 'Morning Snack' | 'Lunch' | 'Evening Snack' | 'Dinner' | 'Before Bed';
  timeSuggestion: string;
  items: MealFoodItem[];
}

export interface DayMealPlan {
  day: DayOfWeek;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  meals: Record<'breakfast' | 'morningSnack' | 'lunch' | 'eveningSnack' | 'dinner' | 'beforeBed', MealSlot>;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  height: number; // in cm
  weight: number; // in kg
  targetWeight: number; // in kg
  fitnessGoal: FitnessGoal;
  level: FitnessLevel;
  workoutDuration: number; // in mins
  equipment: EquipmentType;
  location: 'Gym' | 'Home';
  dietaryPreference: DietaryPreference;
  allergies: string[];
  sleepHours: number;
  dailyWaterGoal: number; // ml
  dailyStepGoal: number;
  dailyCalorieTarget: number;
}

export interface DailyActivityLog {
  date: string; // YYYY-MM-DD
  waterIntake: number; // in ml
  steps: number;
  weight?: number;
  bodyFat?: number;
  completedExerciseIds: string[];
  completedMealSlots: string[]; // e.g. "breakfast", "lunch"
  workoutCompleted: boolean;
  caloriesBurned: number;
  notes?: string;
}

export interface WeightRecord {
  date: string;
  weight: number;
  bodyFat?: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'workout' | 'streak' | 'nutrition' | 'xp' | 'challenge';
  xp: number;
  unlockedAt?: string;
  progress?: { current: number; total: number };
}

export interface Challenge {
  id: string;
  title: string;
  timeframe: 'Weekly' | 'Monthly';
  description: string;
  category: 'workout' | 'water' | 'steps' | 'streak';
  target: number;
  current: number;
  unit: string;
  xpReward: number;
  completed: boolean;
  deadline: string;
}

export interface BmiResult {
  bmi: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  color: string;
  healthyWeightRange: { min: number; max: number };
  bmr: number;
  tdee: number;
  dailyCalories: number;
  proteinGrams: number;
  fatGrams: number;
  carbGrams: number;
  summary: string;
}
