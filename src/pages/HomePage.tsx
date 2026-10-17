import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFitness } from '../context/FitnessContext';
import { WEEKLY_WORKOUT_PLANS } from '../data/workoutPlanData';
import { WEEKLY_MEAL_PLANS } from '../data/mealPlanData';
import { getRandomQuote, Quote } from '../data/quotesData';
import { WaterTracker } from '../components/WaterTracker';
import { StepsTracker } from '../components/StepsTracker';
import { ExerciseCard } from '../components/ExerciseCard';
import { ExerciseModal } from '../components/ExerciseModal';
import { RestTimerModal } from '../components/RestTimerModal';
import { DayOfWeek, Exercise } from '../types/fitness';
import { fetchDailyBoost } from '../services/aiCoachService';
import {
  Flame,
  Dumbbell,
  Play,
  RotateCw,
  Sparkles,
  ArrowRight,
  Calculator,
  Timer,
  Bot,
  Scale,
  Award,
  Calendar,
  Utensils,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    profile,
    todayLog,
    streak,
    xp,
    level,
    startWorkoutSession,
    logWeight,
  } = useFitness();

  // Selected exercise for modal
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [restTimerSeconds, setRestTimerSeconds] = useState<number | null>(null);

  // Motivational Quote
  const [quote, setQuote] = useState<Quote>(getRandomQuote);
  const [isRefreshingQuote, setIsRefreshingQuote] = useState<boolean>(false);
  const [aiFocusTip, setAiFocusTip] = useState<string>('Focus on deliberate eccentrics today.');

  // Weight quick log modal
  const [showWeightModal, setShowWeightModal] = useState<boolean>(false);
  const [weightInput, setWeightInput] = useState<string>(profile.weight.toString());

  // Determine current day of week
  const days: DayOfWeek[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayName: DayOfWeek = days[new Date().getDay()];
  const todayWorkout = WEEKLY_WORKOUT_PLANS[todayDayName];
  const todayMeals = WEEKLY_MEAL_PLANS[todayDayName] || WEEKLY_MEAL_PLANS['Monday'];

  // Calculate completed exercises today
  const completedTodayCount = todayLog.completedExerciseIds?.length || 0;
  const totalTodayExercises = todayWorkout.exercises.length || 1;
  const workoutProgressPct = Math.min(
    100,
    Math.round((completedTodayCount / totalTodayExercises) * 100)
  );

  // Calorie target progress
  const targetCalories = profile.dailyCalorieTarget || 2500;
  const caloriesBurned = todayLog.caloriesBurned || 0;

  // Meal completed slots count
  const completedMealsCount = todayLog.completedMealSlots?.length || 0;

  // Refresh Quote or fetch AI boost
  const handleRefreshQuote = async () => {
    setIsRefreshingQuote(true);
    try {
      const boost = await fetchDailyBoost();
      setQuote({
        id: 'ai-boost',
        text: boost.quote,
        author: boost.author || 'AI Fitness Coach',
        category: 'discipline',
      });
      if (boost.focusTip) setAiFocusTip(boost.focusTip);
    } catch {
      setQuote(getRandomQuote());
    } finally {
      setIsRefreshingQuote(false);
    }
  };

  const handleStartWorkout = () => {
    startWorkoutSession(todayDayName);
    navigate('/active-workout');
  };

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(weightInput);
    if (!isNaN(val) && val > 30) {
      logWeight(val);
      setShowWeightModal(false);
    }
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* 1. WELCOME HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                {streak} Day Streak
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                Level {level} Athlete
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {profile.fitnessGoal} • {profile.level}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              Ready to Conquer, <span className="text-emerald-400">{profile.name}</span>?
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Today is <strong className="text-white">{todayDayName}</strong>. Focus target is{' '}
              <span className="text-emerald-300 font-semibold">{todayWorkout.title}</span>. Push your limits and track your nutrition.
            </p>
          </div>

          {/* Quick Action: Continue Workout */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleStartWorkout}
              className="py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-emerald-500/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Continue Workout</span>
            </button>

            <Link
              to="/workouts"
              className="py-4 px-5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700/80 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>View Routine</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. DAILY METRICS ROW: WORKOUT PROGRESS, CALORIES, WATER, STEPS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Workout Completion Ring */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Today's Session
            </span>
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white font-display">
                {completedTodayCount}
              </span>
              <span className="text-slate-400 text-sm">/ {totalTodayExercises} exercises</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${workoutProgressPct}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {workoutProgressPct === 100
              ? '🎉 Full routine crushed today!'
              : `${totalTodayExercises - completedTodayCount} moves left`}
          </p>
        </div>

        {/* Calories Target Card */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Calories Burned
            </span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white font-display">
                {caloriesBurned}
              </span>
              <span className="text-slate-400 text-sm">/ ~{todayWorkout.estimatedCalories} kcal</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((caloriesBurned / todayWorkout.estimatedCalories) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Daily Budget: {targetCalories} kcal
          </p>
        </div>

        {/* Water Tracker Component */}
        <WaterTracker />

        {/* Steps Tracker Component */}
        <StepsTracker />
      </section>

      {/* 3. MOTIVATIONAL FITNESS QUOTE & COACH BOOST */}
      <section className="relative overflow-hidden rounded-2xl glass-card border border-slate-800/80 p-6 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-medium text-slate-100 italic">
                "{quote.text}"
              </p>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="text-xs font-bold text-amber-400 font-mono">— {quote.author}</span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-xs text-slate-400">💡 Focus: {aiFocusTip}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRefreshQuote}
            disabled={isRefreshingQuote}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/80 transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer flex-shrink-0"
            title="Refresh motivational quote"
          >
            <RotateCw className={`w-4 h-4 ${isRefreshingQuote ? 'animate-spin text-emerald-400' : ''}`} />
            <span>New Quote</span>
          </button>
        </div>
      </section>

      {/* 4. QUICK SHORTCUT LAUNCHER */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          to="/timer"
          className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-emerald-500/40 flex items-center gap-3 group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              Workout Timer
            </div>
            <div className="text-[11px] text-slate-400">Rest & Stopwatch</div>
          </div>
        </Link>

        <Link
          to="/bmi"
          className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/40 flex items-center gap-3 group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
              BMI & TDEE
            </div>
            <div className="text-[11px] text-slate-400">Macro Calculator</div>
          </div>
        </Link>

        <Link
          to="/coach"
          className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-purple-500/40 flex items-center gap-3 group transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
              AI Coach
            </div>
            <div className="text-[11px] text-slate-400">Form & Advice</div>
          </div>
        </Link>

        <button
          onClick={() => setShowWeightModal(true)}
          className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-amber-500/40 flex items-center gap-3 group transition-all text-left cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
              Log Weight
            </div>
            <div className="text-[11px] text-slate-400">{profile.weight} kg current</div>
          </div>
        </button>
      </section>

      {/* 5. TODAY'S WORKOUT PREVIEW (EXERCISE LIST) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Today's Workout: <span className="text-emerald-400">{todayWorkout.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {todayWorkout.tagline} • Est. {todayWorkout.estimatedDuration} mins
            </p>
          </div>

          <Link
            to="/workouts"
            className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Weekly Schedule</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {todayWorkout.exercises.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {todayWorkout.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onOpenDetails={(ex) => setSelectedExercise(ex)}
                onStartTimer={(sec) => setRestTimerSeconds(sec)}
              />
            ))}
          </div>
        ) : (
          /* Recovery day display */
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/20 text-center space-y-3">
            <Award className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Active Recovery & Restoration Day</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Give your central nervous system and muscle fibers time to rebuild. Take a 20-minute nature walk, practice foam rolling, and hydrate thoroughly.
            </p>
            <Link
              to="/workouts"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
            >
              <span>Explore Recovery Protocol</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </section>

      {/* 6. TODAY'S MEALS PREVIEW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Today's Meal Routine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Target: ~{todayMeals.totalCalories} kcal • {todayMeals.totalProtein}g Protein • {completedMealsCount}/6 logged
            </p>
          </div>

          <Link
            to="/nutrition"
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Full Meal Plan & Swaps</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(
            [
              ['breakfast', todayMeals.meals.breakfast],
              ['lunch', todayMeals.meals.lunch],
              ['dinner', todayMeals.meals.dinner],
            ] as const
          ).map(([key, slot]) => {
            const isCompleted = todayLog.completedMealSlots?.includes(key);
            return (
              <div
                key={key}
                className={`glass-card rounded-2xl p-5 border transition-all ${
                  isCompleted ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{slot.type}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{slot.timeSuggestion}</span>
                    </div>
                  </div>
                  {isCompleted && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Logged
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  {slot.items.map((item) => (
                    <div key={item.id} className="text-xs">
                      <span className="text-slate-200 font-medium">• {item.name}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/nutrition"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 pt-2 border-t border-slate-800"
                >
                  <span>View Details & Vegetarian Option</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Exercise Detail Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onStartTimer={(sec) => setRestTimerSeconds(sec)}
      />

      {/* Rest Timer Modal */}
      <RestTimerModal
        initialSeconds={restTimerSeconds || 60}
        isOpen={restTimerSeconds !== null}
        onClose={() => setRestTimerSeconds(null)}
      />

      {/* Quick Weight Log Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm glass-panel rounded-3xl border border-slate-700 p-6 text-slate-100 shadow-2xl">
            <h3 className="text-xl font-bold font-display text-white mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Log Current Weight
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Keep your progress chart accurate by logging your morning fasted weight.
            </p>
            <form onSubmit={handleWeightSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 mb-1 block">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weightInput}
                  onChange={(e) => setWeightInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWeightModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm cursor-pointer shadow-lg shadow-emerald-500/25"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
