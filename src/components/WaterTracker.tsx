import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Droplet, Plus, Minus, RotateCcw, Sparkles } from 'lucide-react';

export const WaterTracker: React.FC = () => {
  const { todayLog, profile, addWater, setWater } = useFitness();
  const current = todayLog.waterIntake || 0;
  const goal = profile.dailyWaterGoal || 3000;
  const percentage = Math.min(100, Math.round((current / goal) * 100));
  const isGoalReached = current >= goal;

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Droplet className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Water Intake</h3>
            <p className="text-xs text-slate-400">Daily hydration tracker</p>
          </div>
        </div>

        <button
          onClick={() => setWater(0)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
          title="Reset hydration"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Graphic Visualization & Numbers */}
      <div className="flex items-center gap-5 my-3">
        {/* Animated Water Vessel */}
        <div className="relative w-16 h-28 rounded-2xl border-2 border-cyan-400/30 bg-slate-900/90 overflow-hidden flex-shrink-0 shadow-inner flex flex-col justify-end">
          {/* Water Fill with Wave */}
          <div
            className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all duration-500 relative"
            style={{ height: `${percentage}%` }}
          >
            <div className="absolute inset-x-0 top-0 h-2 bg-white/30 animate-pulse" />
          </div>

          {/* Scale marks */}
          <div className="absolute inset-y-0 right-1 flex flex-col justify-between py-2 pointer-events-none opacity-40">
            <div className="w-2 h-0.5 bg-slate-300" />
            <div className="w-1.5 h-0.5 bg-slate-300" />
            <div className="w-2 h-0.5 bg-slate-300" />
            <div className="w-1.5 h-0.5 bg-slate-300" />
            <div className="w-2 h-0.5 bg-slate-300" />
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white font-display">
              {(current / 1000).toFixed(current % 1000 === 0 ? 0 : 2)}
            </span>
            <span className="text-slate-400 text-sm">/ {(goal / 1000).toFixed(1)} L</span>
          </div>

          <div className="flex items-center gap-2 mt-1 mb-2">
            <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-cyan-400">{percentage}%</span>
          </div>

          {isGoalReached ? (
            <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Optimal hydration achieved!
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              {Math.max(0, goal - current)} ml remaining today
            </p>
          )}
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => addWater(250)}
          className="py-2 px-1 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all flex flex-col items-center gap-0.5 cursor-pointer"
        >
          <span className="text-[10px] text-slate-400">+Glass</span>
          <span>250ml</span>
        </button>

        <button
          onClick={() => addWater(500)}
          className="py-2 px-1 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all flex flex-col items-center gap-0.5 cursor-pointer"
        >
          <span className="text-[10px] text-slate-400">+Bottle</span>
          <span>500ml</span>
        </button>

        <button
          onClick={() => addWater(750)}
          className="py-2 px-1 rounded-xl bg-slate-800/90 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all flex flex-col items-center gap-0.5 cursor-pointer"
        >
          <span className="text-[10px] text-slate-400">+Shaker</span>
          <span>750ml</span>
        </button>

        <button
          onClick={() => addWater(-250)}
          disabled={current <= 0}
          className="py-2 px-1 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-xs font-medium text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex flex-col items-center gap-0.5 cursor-pointer"
        >
          <span className="text-[10px]">Undo</span>
          <Minus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
