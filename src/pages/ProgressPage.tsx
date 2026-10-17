import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  BarChart2,
  TrendingDown,
  TrendingUp,
  Flame,
  Droplet,
  Dumbbell,
  Calendar,
  Scale,
  Award,
  CheckCircle2,
  Plus,
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const {
    profile,
    weightHistory,
    logWeight,
    streak,
    todayLog,
    xp,
    level,
  } = useFitness();

  const [newWeight, setNewWeight] = useState<string>('');
  const [newBodyFat, setNewBodyFat] = useState<string>('');
  const [showLogModal, setShowLogModal] = useState<boolean>(false);

  // Weekly Workouts Mock & Current Data
  const weeklyWorkoutsData = [
    { day: 'Mon', completed: 6, target: 6, calories: 420 },
    { day: 'Tue', completed: 6, target: 6, calories: 480 },
    { day: 'Wed', completed: 5, target: 6, calories: 410 },
    { day: 'Thu', completed: 6, target: 6, calories: 430 },
    { day: 'Fri', completed: 4, target: 6, calories: 380 },
    { day: 'Sat', completed: 6, target: 6, calories: 560 },
    { day: 'Sun', completed: 3, target: 5, calories: 180 },
  ];

  // Calories Burned vs Intake comparison
  const calorieComparisonData = [
    { day: 'Mon', intake: 2450, burned: 420 },
    { day: 'Tue', intake: 2520, burned: 480 },
    { day: 'Wed', intake: 2600, burned: 520 },
    { day: 'Thu', intake: 2480, burned: 430 },
    { day: 'Fri', intake: 2550, burned: 380 },
    { day: 'Sat', intake: 2650, burned: 560 },
    { day: 'Sun', intake: 2350, burned: 180 },
  ];

  // Formatting Weight History for Recharts
  const formattedWeightData = weightHistory.map((item) => ({
    date: item.date.slice(5), // MM-DD
    weight: item.weight,
    bodyFat: item.bodyFat || 16.0,
  }));

  const currentWeight = weightHistory[weightHistory.length - 1]?.weight || profile.weight;
  const initialWeight = weightHistory[0]?.weight || currentWeight;
  const weightDiff = (currentWeight - initialWeight).toFixed(1);
  const isLoss = parseFloat(weightDiff) < 0;

  const handleAddWeightLog = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(newWeight);
    const bf = parseFloat(newBodyFat);
    if (!isNaN(w) && w > 30) {
      logWeight(w, !isNaN(bf) ? bf : undefined);
      setShowLogModal(false);
      setNewWeight('');
      setNewBodyFat('');
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <BarChart2 className="w-8 h-8 text-emerald-400" />
            Performance & Body Metrics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Tracking your trajectory, consistency, calorie balance, and physique changes
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Weight & Fat %</span>
        </button>
      </div>

      {/* Top Key Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Current Weight */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Body Weight</span>
            <Scale className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-white">{currentWeight}</span>
            <span className="text-slate-400 text-sm">kg</span>
          </div>
          <div className="flex items-center gap-1 text-xs mt-2 font-medium">
            {isLoss ? (
              <span className="text-emerald-400 flex items-center gap-0.5">
                <TrendingDown className="w-3.5 h-3.5" /> {Math.abs(parseFloat(weightDiff))} kg change
              </span>
            ) : (
              <span className="text-cyan-400 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" /> +{weightDiff} kg change
              </span>
            )}
            <span className="text-slate-500">• Target: {profile.targetWeight} kg</span>
          </div>
        </div>

        {/* Metric 2: Streak */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Workout Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-white">{streak}</span>
            <span className="text-slate-400 text-sm">Days Strong</span>
          </div>
          <p className="text-xs text-amber-400/90 mt-2 font-medium">
            Keep momentum alive tomorrow!
          </p>
        </div>

        {/* Metric 3: Weekly Completion */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Weekly Completion</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-white">88%</span>
            <span className="text-slate-400 text-sm">34 / 40 sets</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Level {level} • {xp} XP accumulated
          </p>
        </div>

        {/* Metric 4: Hydration Today */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Water Intake</span>
            <Droplet className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-white">
              {(todayLog.waterIntake / 1000).toFixed(1)}
            </span>
            <span className="text-slate-400 text-sm">/ {(profile.dailyWaterGoal / 1000).toFixed(1)} L</span>
          </div>
          <p className="text-xs text-cyan-400 mt-2">
            {todayLog.steps.toLocaleString()} steps logged
          </p>
        </div>
      </div>

      {/* CHART 1: Weight & Body Fat Changes */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              Weight Progression Over Time (kg)
            </h3>
            <p className="text-xs text-slate-400">
              Logged weigh-ins across recent weeks
            </p>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={formattedWeightData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="weight"
                name="Weight (kg)"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#weightGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHARTS 2 & 3: Weekly Workouts & Calorie Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Workouts Completed */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-cyan-400" />
              Weekly Workouts Completed
            </h3>
            <p className="text-xs text-slate-400">Exercises completed per day</p>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWorkoutsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="completed" name="Completed Exercises" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Caloric Intake vs Burn */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              Exercise Calorie Burn (kcal)
            </h3>
            <p className="text-xs text-slate-400">Workout energy expenditure this week</p>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWorkoutsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="calories" name="Calories Burned" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Exercise History Table */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Recent Exercise & Activity Log
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="pb-3 px-3">Date</th>
                <th className="pb-3 px-3">Routine</th>
                <th className="pb-3 px-3">Exercises Done</th>
                <th className="pb-3 px-3">Steps</th>
                <th className="pb-3 px-3">Hydration</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              <tr>
                <td className="py-3 px-3 text-white font-bold">Today</td>
                <td className="py-3 px-3 font-sans">Chest & Triceps</td>
                <td className="py-3 px-3">{todayLog.completedExerciseIds?.length || 4} moves</td>
                <td className="py-3 px-3">{todayLog.steps.toLocaleString()}</td>
                <td className="py-3 px-3">{(todayLog.waterIntake / 1000).toFixed(1)} L</td>
                <td className="py-3 px-3 text-right font-sans">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    Active
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-white">Yesterday</td>
                <td className="py-3 px-3 font-sans">Legs & Hamstrings</td>
                <td className="py-3 px-3">6 moves</td>
                <td className="py-3 px-3">10,450</td>
                <td className="py-3 px-3">3.2 L</td>
                <td className="py-3 px-3 text-right font-sans">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                    Crushed
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 text-white">2 Days Ago</td>
                <td className="py-3 px-3 font-sans">Back & Biceps</td>
                <td className="py-3 px-3">6 moves</td>
                <td className="py-3 px-3">9,200</td>
                <td className="py-3 px-3">3.0 L</td>
                <td className="py-3 px-3 text-right font-sans">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/30">
                    Crushed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Weight Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm glass-panel rounded-3xl border border-slate-700 p-6 text-slate-100 shadow-2xl">
            <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              Log Weigh-In
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your morning body metrics to update historical trend graphs.
            </p>

            <form onSubmit={handleAddWeightLog} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Body Weight (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  placeholder="e.g. 75.8"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Body Fat % (Optional)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newBodyFat}
                  onChange={(e) => setNewBodyFat(e.target.value)}
                  placeholder="e.g. 15.8"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-lg shadow-emerald-500/25"
                >
                  Save Entry (+40 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
