import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { Footprints, Plus, Flame, MapPin, Check } from 'lucide-react';

export const StepsTracker: React.FC = () => {
  const { todayLog, profile, addSteps, setSteps } = useFitness();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customValue, setCustomValue] = useState<string>('');

  const steps = todayLog.steps || 0;
  const goal = profile.dailyStepGoal || 10000;
  const percentage = Math.min(100, Math.round((steps / goal) * 100));

  // Approx 0.75m per step -> 1,000 steps = 0.75 km
  const km = (steps * 0.00075).toFixed(1);
  // Approx 0.04 kcal per step
  const burned = Math.round(steps * 0.04);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customValue, 10);
    if (!isNaN(val) && val >= 0) {
      setSteps(val);
      setIsEditing(false);
      setCustomValue('');
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Daily Steps</h3>
            <p className="text-xs text-slate-400">Activity & NEAT tracking</p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setCustomValue(steps.toString());
          }}
          className="text-xs text-slate-400 hover:text-emerald-400 underline cursor-pointer"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleCustomSubmit} className="my-4 flex items-center gap-2">
          <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
            placeholder="Enter total steps"
            autoFocus
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
          </button>
        </form>
      ) : (
        /* Progress & Numbers */
        <div className="flex items-center gap-5 my-3">
          {/* Circular Progress Ring */}
          <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400 transition-all duration-500"
                strokeDasharray={`${percentage}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-xs font-bold text-white font-mono">{percentage}%</span>
            </div>
          </div>

          {/* Stats Info */}
          <div className="flex-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white font-display">
                {steps.toLocaleString()}
              </span>
              <span className="text-slate-400 text-sm">/ {goal.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{km} km</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>~{burned} kcal</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => addSteps(500)}
          className="py-2 px-1 rounded-xl bg-slate-800/90 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>500</span>
        </button>

        <button
          onClick={() => addSteps(1000)}
          className="py-2 px-1 rounded-xl bg-slate-800/90 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>1,000</span>
        </button>

        <button
          onClick={() => addSteps(2500)}
          className="py-2 px-1 rounded-xl bg-slate-800/90 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-500/40 border border-slate-700/80 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-3 h-3" />
          <span>2,500</span>
        </button>
      </div>
    </div>
  );
};
