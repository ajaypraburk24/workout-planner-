import React from 'react';
import { Exercise, FitnessLevel } from '../types/fitness';
import { ExerciseSvg } from './ExerciseSvg';
import { X, Flame, Dumbbell, Clock, ShieldCheck, Heart, Play, CheckCircle2 } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

interface ExerciseModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  onStartTimer: (seconds: number) => void;
}

export const ExerciseModal: React.FC<ExerciseModalProps> = ({
  exercise,
  onClose,
  onStartTimer,
}) => {
  const {
    todayLog,
    toggleExerciseCompletion,
    favoriteExerciseIds,
    toggleFavoriteExercise,
  } = useFitness();

  if (!exercise) return null;

  const isCompleted = todayLog.completedExerciseIds?.includes(exercise.id);
  const isFavorite = favoriteExerciseIds.includes(exercise.id);

  const getDifficultyBadge = (diff: FitnessLevel) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Advanced':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-slate-700/60 shadow-2xl p-6 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4 pr-10">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getDifficultyBadge(exercise.difficulty)}`}>
            {exercise.difficulty}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            {exercise.muscleGroup}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
            {exercise.equipment}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
            {exercise.name}
          </h2>
          <button
            onClick={() => toggleFavoriteExercise(exercise.id)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-rose-400'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Visual Anatomy Graphic */}
        <div className="w-full h-48 sm:h-56 mb-6">
          <ExerciseSvg muscleGroup={exercise.muscleGroup} exerciseName={exercise.name} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs flex items-center justify-center gap-1 mb-1">
              <Dumbbell className="w-3.5 h-3.5 text-cyan-400" /> Sets
            </div>
            <div className="text-xl font-bold text-white">{exercise.sets}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Reps
            </div>
            <div className="text-xl font-bold text-white">{exercise.reps}</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs flex items-center justify-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> Rest
            </div>
            <div className="text-xl font-bold text-white">{exercise.restTime}s</div>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="text-slate-400 text-xs flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3.5 h-3.5 text-rose-400" /> Burn
            </div>
            <div className="text-xl font-bold text-white">~{exercise.caloriesBurned} kcal</div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Exercise Overview
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {exercise.description}
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        {exercise.instructions && exercise.instructions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Step-by-Step Execution
            </h3>
            <ol className="space-y-2.5">
              {exercise.instructions.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs mt-0.5">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Pro Form Tips */}
        {exercise.tips && exercise.tips.length > 0 && (
          <div className="mb-6 bg-slate-900/60 border border-emerald-500/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
              💡 Coach Pro Tips
            </h3>
            <ul className="space-y-1.5">
              {exercise.tips.map((tip, index) => (
                <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              toggleExerciseCompletion(exercise.id);
            }}
            className={`w-full sm:flex-1 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/25'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            {isCompleted ? 'Mark as Incomplete' : 'Mark as Completed (+30 XP)'}
          </button>

          <button
            onClick={() => {
              onStartTimer(exercise.restTime);
              onClose();
            }}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
            Start Rest Timer ({exercise.restTime}s)
          </button>
        </div>
      </div>
    </div>
  );
};
