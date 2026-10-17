import React, { useState } from 'react';
import { MealSlot } from '../types/fitness';
import { Utensils, CheckCircle2, ChevronDown, ChevronUp, Leaf, Flame, Sparkles } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

interface MealCardProps {
  mealSlot: MealSlot;
  slotKey: string;
  globalVegetarianMode?: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({
  mealSlot,
  slotKey,
  globalVegetarianMode = false,
}) => {
  const { todayLog, toggleMealCompletion } = useFitness();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  // Per-item vegetarian toggles
  const [vegItemOverrides, setVegItemOverrides] = useState<Record<string, boolean>>({});

  const isSlotCompleted = todayLog.completedMealSlots?.includes(slotKey);

  const toggleItemVeg = (itemId: string) => {
    setVegItemOverrides((prev) => ({
      ...prev,
      [itemId]: !(prev[itemId] ?? globalVegetarianMode),
    }));
  };

  // Calculate totals for this meal based on active veg / non-veg selections
  const slotTotals = mealSlot.items.reduce(
    (acc, item) => {
      const isItemVeg = vegItemOverrides[item.id] ?? globalVegetarianMode;
      if (isItemVeg && item.vegAlternative) {
        acc.calories += item.vegAlternative.calories;
        acc.protein += item.vegAlternative.protein;
        acc.carbs += item.vegAlternative.carbs;
        acc.fat += item.vegAlternative.fat;
      } else {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
      }
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isSlotCompleted
          ? 'bg-emerald-950/20 border-emerald-500/40'
          : 'glass-card border-slate-800'
      }`}
    >
      {/* Header Bar */}
      <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-slate-900/60 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {mealSlot.type}
              </h3>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                {mealSlot.timeSuggestion}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{slotTotals.calories} kcal</span>
              <span>•</span>
              <span className="text-cyan-400 font-semibold">{slotTotals.protein}g Protein</span>
              <span>•</span>
              <span className="text-amber-400">{slotTotals.carbs}g Carbs</span>
              <span>•</span>
              <span className="text-rose-400">{slotTotals.fat}g Fat</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Completion Checkbox */}
          <button
            onClick={() => toggleMealCompletion(slotKey)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSlotCompleted
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isSlotCompleted ? 'Logged' : 'Log Meal'}</span>
          </button>

          {/* Collapse / Expand Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors cursor-pointer"
            aria-label="Toggle meal details"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body Items */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4">
          {mealSlot.items.map((item) => {
            const isItemVeg = vegItemOverrides[item.id] ?? globalVegetarianMode;
            const displayItem = isItemVeg && item.vegAlternative ? item.vegAlternative : item;
            const hasVegAlt = !!item.vegAlternative;

            return (
              <div
                key={item.id}
                className="bg-slate-900/80 border border-slate-800/90 rounded-xl p-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2.5">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                        {isItemVeg && <Leaf className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        {displayItem.name}
                      </h4>
                      {isItemVeg && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Vegetarian Version
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      <span className="font-semibold text-slate-300">Portion:</span> {displayItem.portion}
                    </p>
                  </div>

                  {/* Veg / Non-Veg Switch */}
                  {hasVegAlt && (
                    <button
                      onClick={() => toggleItemVeg(item.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1 transition-all cursor-pointer flex-shrink-0 ${
                        isItemVeg
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-emerald-400 hover:border-emerald-500/30'
                      }`}
                    >
                      <Leaf className="w-3.5 h-3.5" />
                      <span>{isItemVeg ? 'Switch to Standard' : 'Show Veg Option'}</span>
                    </button>
                  )}
                </div>

                {/* Macro breakdown badges */}
                <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950 font-mono text-slate-200 border border-slate-800 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <strong>{displayItem.calories}</strong> kcal
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 font-mono text-cyan-300 border border-cyan-800/40">
                    P: <strong>{displayItem.protein}g</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-950/60 font-mono text-amber-300 border border-amber-800/40">
                    C: <strong>{displayItem.carbs}g</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-rose-950/60 font-mono text-rose-300 border border-rose-800/40">
                    F: <strong>{displayItem.fat}g</strong>
                  </span>
                </div>

                {/* Instructions */}
                <div className="bg-slate-950/60 rounded-lg p-3 text-xs text-slate-300 border border-slate-800/60 mb-2">
                  <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Preparation & Cooking:
                  </div>
                  <p className="leading-relaxed">{displayItem.cookingInstructions}</p>
                </div>

                {/* Healthy Alternatives */}
                {item.healthyAlternatives && (
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-300 font-semibold">Healthy Alternatives:</span> {item.healthyAlternatives}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
