import React from 'react';
import { Exercise } from '../types/fitness';
import { ExerciseSvg } from './ExerciseSvg';
import { Flame, Clock, Heart, CheckCircle2, ChevronRight, Dumbbell } from 'lucide-react';
import { useFitness } from '../context/FitnessContext';

interface ExerciseCardProps {
  exercise: Exercise;
  onOpenDetails: (exercise: Exercise) => void;
  onStartTimer: (seconds: number) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onOpenDetails,
  onStartTimer,
}) => {
  const {
    todayLog,
    toggleExerciseCompletion,
    favoriteExerciseIds,
    toggleFavoriteExercise,
  } = useFitness();

  const isCompleted = todayLog.completedExerciseIds?.includes(exercise.id);
  const isFavorite = favoriteExerciseIds.includes(exercise.id);

  return (
    <div
      className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
        isCompleted
          ? 'bg-emerald-950/20 border-emerald-500/40'
          : 'glass-card border-slate-800 hover:border-slate-700'
      }`}
    >
      {/* Top Banner on Mobile / Side layout on desktop */}
      <div className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
        {/* Left Side: Thumbnail Visual */}
        <div
          onClick={() => onOpenDetails(exercise)}
          className="relative w-full sm:w-36 h-32 sm:h-28 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border border-slate-800/80 group-hover:scale-[1.02] transition-transform"
        >
          <ExerciseSvg muscleGroup={exercise.muscleGroup} exerciseName={exercise.name} />
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Center: Info */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {exercise.muscleGroup}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {exercise.difficulty}
            </span>
            <span className="text-[11px] text-slate-400">
              {exercise.equipment}
            </span>
          </div>

          <h3
            onClick={() => onOpenDetails(exercise)}
            className="text-lg font-bold text-white hover:text-emerald-400 cursor-pointer transition-colors truncate"
          >
            {exercise.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 mt-1 mb-3">
            {exercise.description}
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
              <Dumbbell className="w-3.5 h-3.5 text-cyan-400" />
              <span>{exercise.sets} sets</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-md border border-slate-800">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{exercise.reps}</span>
            </div>
            <button
              onClick={() => onStartTimer(exercise.restTime)}
              className="flex items-center gap-1 bg-slate-900/80 hover:bg-slate-800 px-2 py-1 rounded-md border border-slate-800 hover:border-emerald-500/40 text-emerald-400 transition-colors cursor-pointer"
              title="Start rest timer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{exercise.restTime}s rest</span>
            </button>
            <div className="text-slate-400 text-[11px]">
              ~{exercise.caloriesBurned} kcal
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex sm:flex-col items-center justify-between sm:justify-center w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteExercise(exercise.id)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isFavorite
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-slate-900/80 text-slate-400 hover:text-rose-400 border border-slate-800'
              }`}
              title={isFavorite ? 'Favorited' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => onOpenDetails(exercise)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Tips</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Completion Checkbox */}
          <button
            onClick={() => toggleExerciseCompletion(exercise.id)}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isCompleted
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/80 hover:border-emerald-500/40'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-slate-950' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'Completed' : 'Complete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
