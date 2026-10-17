import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { FitnessGoal, FitnessLevel, EquipmentType, DietaryPreference } from '../types/fitness';
import { sound } from '../utils/soundEffects';
import {
  Settings as SettingsIcon,
  User,
  Target,
  Dumbbell,
  Clock,
  Moon,
  Sun,
  RotateCcw,
  Check,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { profile, updateProfile, theme, setTheme, resetAllData, addXP } = useFitness();

  const [name, setName] = useState<string>(profile.name);
  const [goal, setGoal] = useState<FitnessGoal>(profile.fitnessGoal);
  const [level, setLevel] = useState<FitnessLevel>(profile.level);
  const [duration, setDuration] = useState<number>(profile.workoutDuration);
  const [equipment, setEquipment] = useState<EquipmentType>(profile.equipment);
  const [location, setLocation] = useState<'Gym' | 'Home'>(profile.location);
  const [diet, setDiet] = useState<DietaryPreference>(profile.dietaryPreference);
  const [sleepHours, setSleepHours] = useState<number>(profile.sleepHours);
  const [dailyWater, setDailyWater] = useState<number>(profile.dailyWaterGoal);
  const [dailySteps, setDailySteps] = useState<number>(profile.dailyStepGoal);
  const [allergiesInput, setAllergiesInput] = useState<string>(profile.allergies.join(', '));

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAllergies = allergiesInput
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    updateProfile({
      name,
      fitnessGoal: goal,
      level,
      workoutDuration: duration,
      equipment,
      location,
      dietaryPreference: diet,
      sleepHours,
      dailyWaterGoal: dailyWater,
      dailyStepGoal: dailySteps,
      allergies: parsedAllergies.length > 0 ? parsedAllergies : ['None'],
    });

    sound.playSuccess();
    addXP(25, 'Updated Fitness Profile Settings');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetConfirm = () => {
    resetAllData();
    sound.playTick();
    setConfirmReset(false);
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-8 h-8 text-emerald-400" />
          Settings & Customization
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Personalize your training split, equipment, macros, and preferences
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-400" />
            Athlete Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Full Name / Nickname
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Sleep Schedule Target (Hours)
              </label>
              <input
                type="number"
                min="5"
                max="12"
                value={sleepHours}
                onChange={(e) => setSleepHours(parseInt(e.target.value, 10) || 8)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Goals & Experience */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Fitness Goals & Experience Level
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Primary Goal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Lose Fat', 'Build Muscle', 'Gain Weight', 'Maintain Weight'] as const).map(
                  (g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        goal === g
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-md'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      level === lvl
                        ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Equipment & Workout Environment */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-amber-400" />
            Environment & Equipment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Training Location
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Gym', 'Home'] as const).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocation(loc)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      location === loc
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Preferred Duration (Mins)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value={30}>30 minutes (Express)</option>
                <option value={45}>45 minutes (Standard)</option>
                <option value={60}>60 minutes (Comprehensive)</option>
                <option value={90}>90 minutes (High Volume)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Available Equipment
              </label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Full Gym">Full Commercial Gym (Barbells, Cables, Machines)</option>
                <option value="Dumbbells Only">Dumbbells Only</option>
                <option value="Bodyweight">Bodyweight / Calisthenics Only</option>
                <option value="Resistance Bands">Resistance Bands</option>
                <option value="Home Gym">Home Gym (Bench + Rack)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dietary & Hydration */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Dietary & Daily Targets
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Dietary Preference
              </label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Non-Vegetarian">Non-Vegetarian (Includes Poultry & Fish)</option>
                <option value="Vegetarian">Vegetarian (Dairy & Plant-Based)</option>
                <option value="Vegan">Vegan (100% Plant-Based)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Allergies or Intolerances
              </label>
              <input
                type="text"
                value={allergiesInput}
                onChange={(e) => setAllergiesInput(e.target.value)}
                placeholder="e.g. Gluten, Dairy, Peanuts, None"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Daily Water Goal (ml)
              </label>
              <input
                type="number"
                step="250"
                value={dailyWater}
                onChange={(e) => setDailyWater(parseInt(e.target.value, 10) || 3000)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Daily Step Target
              </label>
              <input
                type="number"
                step="500"
                value={dailySteps}
                onChange={(e) => setDailySteps(parseInt(e.target.value, 10) || 10000)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Theme Preference */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Appearance Theme</h3>
            <p className="text-xs text-slate-400">Choose between dark aesthetic and light mode</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                theme === 'dark' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark Mode</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                theme === 'light' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light Mode</span>
            </button>
          </div>
        </div>

        {/* Save Changes Button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <Check className="w-5 h-5 text-slate-950" />
              <span>Settings Saved Successfully!</span>
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              <span>Save & Update Preferences</span>
            </>
          )}
        </button>

        {/* Reset Data Zone */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="bg-rose-950/20 border border-rose-500/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Reset Application Data
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Clear all logs, history, streak, and reset to initial presets
              </p>
            </div>

            {confirmReset ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetConfirm}
                  className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-xs font-bold text-white cursor-pointer"
                >
                  Confirm Reset
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all cursor-pointer"
              >
                Reset Data
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
