import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { calculateBmiData } from '../utils/bmiCalculator';
import { sound } from '../utils/soundEffects';
import {
  Calculator,
  Scale,
  Activity,
  Flame,
  Check,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const BmiPage: React.FC = () => {
  const { profile, updateProfile, addXP } = useFitness();

  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState<number>(profile.height || 178);
  const [weightKg, setWeightKg] = useState<number>(profile.weight || 76);
  const [age, setAge] = useState<number>(profile.age || 26);
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(profile.gender || 'Male');
  const [goal, setGoal] = useState(profile.fitnessGoal);

  // Imperial states
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(10);
  const [weightLbs, setWeightLbs] = useState<number>(Math.round((profile.weight || 76) * 2.20462));

  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  // Sync metric with imperial changes
  const handleImperialChange = (f: number, i: number, lbs: number) => {
    const totalInches = f * 12 + i;
    const cm = Math.round(totalInches * 2.54);
    const kg = parseFloat((lbs / 2.20462).toFixed(1));
    setHeightCm(cm);
    setWeightKg(kg);
  };

  const results = calculateBmiData(heightCm, weightKg, age, gender, goal);

  const handleApplyToProfile = () => {
    updateProfile({
      height: heightCm,
      weight: weightKg,
      age,
      gender,
      fitnessGoal: goal,
      dailyCalorieTarget: results.dailyCalories,
    });
    sound.playSuccess();
    addXP(50, 'Updated Fitness Profile via BMI Calculator');
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <Calculator className="w-8 h-8 text-emerald-400" />
            BMI & Macro Calculator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Clinical Mifflin-St Jeor TDEE & body composition recommendation engine
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unitSystem === 'metric'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unitSystem === 'imperial'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Your Body Parameters
          </h2>

          {/* Gender Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Gender</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Male', 'Female', 'Other'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    gender === g
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Height Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Height</label>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {unitSystem === 'metric'
                  ? `${heightCm} cm`
                  : `${Math.floor(heightCm / 30.48)}' ${Math.round((heightCm % 30.48) / 2.54)}"`}
              </span>
            </div>
            {unitSystem === 'metric' ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="130"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500"
                />
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseInt(e.target.value, 10) || 150)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    min="3"
                    max="7"
                    value={feet}
                    onChange={(e) => {
                      const f = parseInt(e.target.value, 10) || 5;
                      setFeet(f);
                      handleImperialChange(f, inches, weightLbs);
                    }}
                    placeholder="Feet"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Feet</span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={inches}
                    onChange={(e) => {
                      const i = parseInt(e.target.value, 10) || 0;
                      setInches(i);
                      handleImperialChange(feet, i, weightLbs);
                    }}
                    placeholder="Inches"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Inches</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Weight</label>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {unitSystem === 'metric' ? `${weightKg} kg` : `${Math.round(weightKg * 2.20462)} lbs`}
              </span>
            </div>
            {unitSystem === 'metric' ? (
              <div className="space-y-2">
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <input
                  type="number"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value) || 60)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => {
                    const lbs = parseFloat(e.target.value) || 120;
                    setWeightLbs(lbs);
                    handleImperialChange(feet, inches, lbs);
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                />
                <span className="text-[10px] text-slate-500 block mt-1">Pounds (lbs)</span>
              </div>
            )}
          </div>

          {/* Age Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Age</label>
              <span className="text-xs font-mono font-bold text-emerald-400">{age} years</span>
            </div>
            <input
              type="range"
              min="14"
              max="90"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-500"
            />
          </div>

          {/* Goal Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-2">Fitness Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="Lose Fat">Lose Fat (Caloric Deficit)</option>
              <option value="Build Muscle">Build Muscle (Lean Hypertrophy)</option>
              <option value="Gain Weight">Gain Weight (Surplus)</option>
              <option value="Maintain Weight">Maintain Weight</option>
            </select>
          </div>
        </div>

        {/* Right Column: Calculated Outputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main BMI Result Gauge Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-slate-900/90 to-slate-950">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Body Mass Index (BMI)
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-black font-display text-white">{results.bmi}</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${results.color}`}>
                    {results.category}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block">Healthy Range for Your Height:</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {results.healthyWeightRange.min} kg – {results.healthyWeightRange.max} kg
                </span>
              </div>
            </div>

            {/* Gauge Visual Bar */}
            <div className="space-y-1 mb-6">
              <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div className="h-full bg-blue-500 flex-1" title="Underweight (<18.5)" />
                <div className="h-full bg-emerald-500 flex-1" title="Normal (18.5 - 24.9)" />
                <div className="h-full bg-amber-500 flex-1" title="Overweight (25 - 29.9)" />
                <div className="h-full bg-rose-500 flex-1" title="Obese (30+)" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                <span>16.0</span>
                <span>18.5 (Normal)</span>
                <span>25.0 (Overweight)</span>
                <span>30.0+ (Obese)</span>
              </div>
            </div>

            {/* Scientific Summary */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {results.summary}
            </p>
          </div>

          {/* Caloric & Macronutrient Breakdown Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  Daily Caloric & Macro Targets
                </h3>
                <p className="text-xs text-slate-400">
                  BMR: {results.bmr} kcal • TDEE: {results.tdee} kcal
                </p>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {results.dailyCalories}
                </span>
                <span className="text-xs text-slate-400 block -mt-1">kcal / day</span>
              </div>
            </div>

            {/* Macro Cards Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-900/90 rounded-2xl p-4 border border-cyan-500/20">
                <span className="text-xs text-cyan-400 font-bold block mb-1">Protein</span>
                <span className="text-2xl font-black font-mono text-cyan-300">
                  {results.proteinGrams}g
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {results.proteinGrams * 4} kcal
                </span>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-4 border border-amber-500/20">
                <span className="text-xs text-amber-400 font-bold block mb-1">Carbs</span>
                <span className="text-2xl font-black font-mono text-amber-300">
                  {results.carbGrams}g
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {results.carbGrams * 4} kcal
                </span>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-4 border border-rose-500/20">
                <span className="text-xs text-rose-400 font-bold block mb-1">Fat</span>
                <span className="text-2xl font-black font-mono text-rose-300">
                  {results.fatGrams}g
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">
                  {results.fatGrams * 9} kcal
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2">
              <button
                onClick={handleApplyToProfile}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                {appliedNotice ? (
                  <>
                    <Check className="w-5 h-5 text-slate-950" />
                    <span>Applied to Your Profile Targets!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Save These Targets to My Profile (+50 XP)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
