import React, { useState } from 'react';
import { WEEKLY_MEAL_PLANS } from '../data/mealPlanData';
import { DayOfWeek } from '../types/fitness';
import { MealCard } from '../components/MealCard';
import { useFitness } from '../context/FitnessContext';
import {
  Utensils,
  Leaf,
  Printer,
  Flame,
  PieChart as PieChartIcon,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const NutritionPage: React.FC = () => {
  const { profile, todayLog } = useFitness();
  const daysList: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const todayDayName: DayOfWeek = daysList[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(todayDayName || 'Monday');

  // Vegetarian mode toggle for entire page
  const [vegetarianMode, setVegetarianMode] = useState<boolean>(
    profile.dietaryPreference === 'Vegetarian'
  );

  const currentPlan = WEEKLY_MEAL_PLANS[selectedDay] || WEEKLY_MEAL_PLANS['Monday'];

  const handlePrint = () => {
    window.print();
  };

  const completedCount = todayLog.completedMealSlots?.length || 0;

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <Utensils className="w-8 h-8 text-cyan-400" />
            Daily Nutrition Routine
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Precision fueling, macro tracking, and chef-curated cooking instructions
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Global Vegetarian Toggle */}
          <button
            onClick={() => setVegetarianMode(!vegetarianMode)}
            className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              vegetarianMode
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-emerald-400'
            }`}
          >
            <Leaf className={`w-4 h-4 ${vegetarianMode ? 'fill-current' : ''}`} />
            <span>{vegetarianMode ? 'Vegetarian Mode: ON' : 'Switch All to Veg'}</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            title="Print clean meal schedule"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Meal Plan</span>
          </button>
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-print">
        {daysList.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md'
                  : 'glass-card border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Macro Breakdown Header Card */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 sm:p-7 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
              {selectedDay} Full Day Targets
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              ~{currentPlan.totalCalories} kcal Total Intake
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Calibrated for {profile.fitnessGoal} ({profile.dietaryPreference})
            </p>
          </div>

          {/* Macro Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
              <span className="text-[11px] text-slate-400 block font-semibold mb-0.5">
                Calories
              </span>
              <span className="text-2xl font-black text-white font-mono">
                {currentPlan.totalCalories}
              </span>
              <span className="text-[10px] text-slate-500 block">kcal</span>
            </div>

            <div className="bg-slate-950/80 border border-cyan-500/20 rounded-2xl p-3.5">
              <span className="text-[11px] text-cyan-400 block font-semibold mb-0.5">
                Protein
              </span>
              <span className="text-2xl font-black text-cyan-300 font-mono">
                {currentPlan.totalProtein}g
              </span>
              <span className="text-[10px] text-slate-500 block">
                {Math.round((currentPlan.totalProtein * 4 / currentPlan.totalCalories) * 100)}%
              </span>
            </div>

            <div className="bg-slate-950/80 border border-amber-500/20 rounded-2xl p-3.5">
              <span className="text-[11px] text-amber-400 block font-semibold mb-0.5">
                Carbs
              </span>
              <span className="text-2xl font-black text-amber-300 font-mono">
                {currentPlan.totalCarbs}g
              </span>
              <span className="text-[10px] text-slate-500 block">
                {Math.round((currentPlan.totalCarbs * 4 / currentPlan.totalCalories) * 100)}%
              </span>
            </div>

            <div className="bg-slate-950/80 border border-rose-500/20 rounded-2xl p-3.5">
              <span className="text-[11px] text-rose-400 block font-semibold mb-0.5">
                Fat
              </span>
              <span className="text-2xl font-black text-rose-300 font-mono">
                {currentPlan.totalFat}g
              </span>
              <span className="text-[10px] text-slate-500 block">
                {Math.round((currentPlan.totalFat * 9 / currentPlan.totalCalories) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Meal Slots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold font-display text-white">
            Structured Meal Schedule (6 Feedings)
          </h3>
          <span className="text-xs font-semibold text-slate-400">
            {completedCount}/6 meals checked off today
          </span>
        </div>

        <div className="space-y-4">
          <MealCard
            mealSlot={currentPlan.meals.breakfast}
            slotKey="breakfast"
            globalVegetarianMode={vegetarianMode}
          />
          <MealCard
            mealSlot={currentPlan.meals.morningSnack}
            slotKey="morningSnack"
            globalVegetarianMode={vegetarianMode}
          />
          <MealCard
            mealSlot={currentPlan.meals.lunch}
            slotKey="lunch"
            globalVegetarianMode={vegetarianMode}
          />
          <MealCard
            mealSlot={currentPlan.meals.eveningSnack}
            slotKey="eveningSnack"
            globalVegetarianMode={vegetarianMode}
          />
          <MealCard
            mealSlot={currentPlan.meals.dinner}
            slotKey="dinner"
            globalVegetarianMode={vegetarianMode}
          />
          <MealCard
            mealSlot={currentPlan.meals.beforeBed}
            slotKey="beforeBed"
            globalVegetarianMode={vegetarianMode}
          />
        </div>
      </div>
    </div>
  );
};
