import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WEEKLY_WORKOUT_PLANS } from '../data/workoutPlanData';
import { DayOfWeek, Exercise, MuscleGroup, FitnessLevel } from '../types/fitness';
import { ExerciseCard } from '../components/ExerciseCard';
import { ExerciseModal } from '../components/ExerciseModal';
import { RestTimerModal } from '../components/RestTimerModal';
import { generateWorkoutPlanPdf } from '../utils/pdfGenerator';
import { useFitness } from '../context/FitnessContext';
import {
  Calendar,
  Download,
  Search,
  Filter,
  Play,
  Flame,
  Clock,
  Heart,
  Dumbbell,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const WorkoutsPage: React.FC = () => {
  const navigate = useNavigate();
  const { startWorkoutSession, favoriteExerciseIds } = useFitness();

  const daysList: DayOfWeek[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  // Auto-select current day by default
  const todayDayName: DayOfWeek = daysList[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(todayDayName || 'Monday');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMuscleFilter, setSelectedMuscleFilter] = useState<string>('All');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>('All');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  // Modals
  const [modalExercise, setModalExercise] = useState<Exercise | null>(null);
  const [restTimerSeconds, setRestTimerSeconds] = useState<number | null>(null);

  const currentPlan = WEEKLY_WORKOUT_PLANS[selectedDay];

  // Filter exercises
  const filteredExercises = currentPlan.exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMuscle =
      selectedMuscleFilter === 'All' || ex.muscleGroup === selectedMuscleFilter;

    const matchesDifficulty =
      selectedDifficultyFilter === 'All' || ex.difficulty === selectedDifficultyFilter;

    const matchesFavorites = !showOnlyFavorites || favoriteExerciseIds.includes(ex.id);

    return matchesSearch && matchesMuscle && matchesDifficulty && matchesFavorites;
  });

  const muscleGroupsList: string[] = [
    'All',
    'Chest',
    'Back',
    'Legs',
    'Shoulders',
    'Triceps',
    'Biceps',
    'Core',
    'Cardio',
    'Full Body',
  ];

  const handleStartSession = () => {
    startWorkoutSession(selectedDay);
    navigate('/active-workout');
  };

  const handleDownloadPdf = () => {
    generateWorkoutPlanPdf(selectedDay);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Header & Day Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <Dumbbell className="w-8 h-8 text-emerald-400" />
            Weekly Workout Plan
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Science-backed 7-day hypertrophy and conditioning split
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleDownloadPdf}
            className="py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm hover:border-emerald-500/40"
            title="Download formatted PDF workout plan"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export Plan (PDF)</span>
          </button>

          {currentPlan.exercises.length > 0 && (
            <button
              onClick={handleStartSession}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start {selectedDay} Session</span>
            </button>
          )}
        </div>
      </div>

      {/* Days Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {daysList.map((day) => {
          const plan = WEEKLY_WORKOUT_PLANS[day];
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setSearchQuery('');
              }}
              className={`py-3 px-4 rounded-2xl flex-shrink-0 text-left transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border-emerald-500/50 text-white shadow-lg shadow-emerald-500/10'
                  : 'glass-card border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider">
                {day.slice(0, 3)}
              </div>
              <div
                className={`text-sm font-extrabold font-display truncate max-w-[120px] ${
                  isSelected ? 'text-emerald-400' : 'text-slate-200'
                }`}
              >
                {plan.title.split('&')[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Day Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel border border-slate-800 p-6 sm:p-7 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                {selectedDay} Protocol
              </span>
              <span className="text-xs text-slate-400">
                Target: {currentPlan.targetMuscles}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              {currentPlan.title}
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {currentPlan.tagline}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{currentPlan.estimatedDuration} mins</span>
            </div>
            <div className="bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>~{currentPlan.estimatedCalories} kcal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises by name, muscle, or description..."
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Muscle Filter dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={selectedMuscleFilter}
            onChange={(e) => setSelectedMuscleFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {muscleGroupsList.map((m) => (
              <option key={m} value={m}>
                Muscle: {m}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficultyFilter}
            onChange={(e) => setSelectedDifficultyFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="All">Difficulty: All</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Favorite Only Toggle */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              showOnlyFavorites
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-white'
            }`}
            title="Show only bookmarked favorites"
          >
            <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Exercise Cards Grid */}
      {currentPlan.exercises.length > 0 ? (
        filteredExercises.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onOpenDetails={(ex) => setModalExercise(ex)}
                onStartTimer={(sec) => setRestTimerSeconds(sec)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">
              No exercises match your search and filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMuscleFilter('All');
                setSelectedDifficultyFilter('All');
                setShowOnlyFavorites(false);
              }}
              className="mt-3 text-xs font-semibold text-emerald-400 underline"
            >
              Reset Filters
            </button>
          </div>
        )
      ) : (
        /* Recovery Protocol Activities */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlan.recoveryActivities?.map((activity) => (
              <div
                key={activity.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{activity.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {activity.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activity.description}
                </p>
                <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 text-xs">
                  <span className="text-emerald-400 font-bold">Key Benefit:</span>{' '}
                  <span className="text-slate-300">{activity.benefits}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercise Modal */}
      <ExerciseModal
        exercise={modalExercise}
        onClose={() => setModalExercise(null)}
        onStartTimer={(sec) => setRestTimerSeconds(sec)}
      />

      {/* Rest Timer Modal */}
      <RestTimerModal
        initialSeconds={restTimerSeconds || 60}
        isOpen={restTimerSeconds !== null}
        onClose={() => setRestTimerSeconds(null)}
      />
    </div>
  );
};
