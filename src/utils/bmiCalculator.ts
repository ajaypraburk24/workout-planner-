import { BmiResult, FitnessGoal } from '../types/fitness';

export function calculateBmiData(
  heightCm: number,
  weightKg: number,
  age: number,
  gender: 'Male' | 'Female' | 'Other',
  goal: FitnessGoal = 'Build Muscle'
): BmiResult {
  // Height in meters
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese' = 'Normal';
  let color = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-blue-400 border-blue-500/30 bg-blue-500/10';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
    color = 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  } else {
    category = 'Obese';
    color = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  }

  // Healthy weight range for normal BMI (18.5 - 24.9)
  const minWeight = parseFloat((18.5 * heightM * heightM).toFixed(1));
  const maxWeight = parseFloat((24.9 * heightM * heightM).toFixed(1));

  // BMR calculation using Mifflin-St Jeor Equation
  // Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
  // Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  if (gender === 'Male') {
    bmr += 5;
  } else if (gender === 'Female') {
    bmr -= 161;
  } else {
    bmr -= 78;
  }
  bmr = Math.round(bmr);

  // TDEE estimate (assuming moderate activity level 1.55 for workout trainees)
  const tdee = Math.round(bmr * 1.55);

  // Goal adjustment
  let dailyCalories = tdee;
  if (goal === 'Lose Fat') {
    dailyCalories = Math.round(tdee - 500); // 500 kcal deficit
  } else if (goal === 'Build Muscle' || goal === 'Gain Weight') {
    dailyCalories = Math.round(tdee + 300); // 300 kcal lean surplus
  } else {
    dailyCalories = tdee;
  }

  // Macronutrient calculation based on goal and bodyweight
  // Protein: 2.0g per kg for muscle building/fat loss retention
  let proteinGrams = Math.round(weightKg * 2.0);
  if (goal === 'Build Muscle') proteinGrams = Math.round(weightKg * 2.2);

  // Fat: approx 25% of calories (9 kcal/g)
  const fatCalories = dailyCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);

  // Remaining calories to Carbs (4 kcal/g)
  const proteinCalories = proteinGrams * 4;
  const remainingCaloriesForCarbs = Math.max(200, dailyCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(remainingCaloriesForCarbs / 4);

  let summary = '';
  if (category === 'Normal') {
    summary = `Your BMI is in the healthy range! Focus on maintaining lean mass and cardiovascular vigor with progressive overload and nutrient-dense whole foods.`;
  } else if (category === 'Underweight') {
    summary = `You are slightly under the standard weight range. A moderate caloric surplus with plenty of protein and resistance training will help build solid muscle.`;
  } else if (category === 'Overweight') {
    summary = `Your BMI indicates higher mass for your height. Focus on high protein intake (preserving muscle), consistent resistance training, and a sustainable caloric deficit.`;
  } else {
    summary = `Prioritize balanced whole foods, steady daily steps (8,000-10,000 steps), hydration, and structured resistance training with moderate deficit.`;
  }

  return {
    bmi,
    category,
    color,
    healthyWeightRange: { min: minWeight, max: maxWeight },
    bmr,
    tdee,
    dailyCalories,
    proteinGrams,
    fatGrams,
    carbGrams,
    summary
  };
}
