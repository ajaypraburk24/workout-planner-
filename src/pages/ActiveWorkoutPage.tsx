import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFitness } from '../context/FitnessContext';
import { WEEKLY_WORKOUT_PLANS } from '../data/workoutPlanData';
import { ExerciseSvg } from '../components/ExerciseSvg';
import { sound } from '../utils/soundEffects';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  X,
  Volume2,
  Sparkles,
} from 'lucide-react';

export const ActiveWorkoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    activeSession,
    nextSessionExercise,
    prevSessionExercise,
    endWorkoutSession,
    toggleExerciseCompletion,
    todayLog,
    startWorkoutSession,
  } = useFitness();

  // If no active session, initialize today's workout
  useEffect(() => {
    if (!activeSession) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
      const todayDay = days[new Date().getDay()];
      startWorkoutSession(todayDay);
    }
  }, [activeSession, startWorkoutSession]);

  const [currentSet, setCurrentSet] = useState<number>(1);
  const [restTimerSeconds, setRestTimerSeconds] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [autoNextEnabled, setAutoNextEnabled] = useState<boolean>(true);

  if (!activeSession) {
    return (
      <div className="py-20 text-center space-y-4">
        <Dumbbell className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-bold text-white">Loading Workout Session...</h2>
      </div>
    );
  }

  const currentPlan = WEEKLY_WORKOUT_PLANS[activeSession.day];
  const exercises = currentPlan.exercises;
  const currentExercise = exercises[activeSession.currentExerciseIndex] || exercises[0];

  const totalExercises = exercises.length;
  const currentExIndex = activeSession.currentExerciseIndex;
  const isFinished = currentExIndex >= totalExercises;

  // Handle rest timer tick
  useEffect(() => {
    let interval: any = null;
    if (isResting && restTimerSeconds > 0) {
      interval = setInterval(() => {
        setRestTimerSeconds((prev) => {
          if (prev <= 4 && prev > 1) sound.playCountdown();
          if (prev <= 1) {
            sound.playSuccess();
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimerSeconds]);

  const handleCompleteSet = () => {
    sound.playTick();
    if (currentSet < currentExercise.sets) {
      setCurrentSet((s) => s + 1);
      // Trigger rest timer
      setRestTimerSeconds(currentExercise.restTime || 60);
      setIsResting(true);
    } else {
      // Completed all sets for this exercise
      toggleExerciseCompletion(currentExercise.id);
      setCurrentSet(1);
      if (currentExIndex < totalExercises - 1) {
        nextSessionExercise();
        setRestTimerSeconds(currentExercise.restTime || 60);
        setIsResting(true);
      } else {
        endWorkoutSession();
        navigate('/workouts');
      }
    }
  };

  const handleNext = () => {
    setCurrentSet(1);
    setIsResting(false);
    nextSessionExercise();
  };

  const handlePrev = () => {
    setCurrentSet(1);
    setIsResting(false);
    prevSessionExercise();
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-300">
      {/* Top Session Bar */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white font-display">
              {activeSession.day}: {currentPlan.title}
            </h1>
            <p className="text-xs text-slate-400">
              Exercise {currentExIndex + 1} of {totalExercises}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            endWorkoutSession();
            navigate('/workouts');
          }}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          title="Exit Session"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-400 transition-all duration-300"
          style={{ width: `${((currentExIndex + 1) / totalExercises) * 100}%` }}
        />
      </div>

      {/* Main Focus Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Graphic and Muscle Visual */}
          <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <ExerciseSvg
              muscleGroup={currentExercise.muscleGroup}
              exerciseName={currentExercise.name}
            />
          </div>

          {/* Right: Exercise Controls */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {currentExercise.muscleGroup}
                </span>
                <span className="text-xs text-slate-400">
                  {currentExercise.equipment}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {currentExercise.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {currentExercise.description}
              </p>
            </div>

            {/* Set & Rep Counter */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Set</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {currentSet} <span className="text-sm text-slate-500">/ {currentExercise.sets}</span>
                </span>
              </div>
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Target</span>
                <span className="text-2xl font-black text-white font-mono">
                  {currentExercise.reps}
                </span>
              </div>
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">Rest</span>
                <span className="text-2xl font-black text-cyan-400 font-mono">
                  {currentExercise.restTime}s
                </span>
              </div>
            </div>

            {/* Rest Timer Banner */}
            {isResting && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 animate-spin" />
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Rest Interval</div>
                    <div className="text-xl font-bold font-mono text-emerald-300">
                      {formatSeconds(restTimerSeconds)} remaining
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsResting(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 cursor-pointer"
                >
                  Skip Rest
                </button>
              </div>
            )}

            {/* Complete Set Action */}
            <button
              onClick={handleCompleteSet}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {currentSet >= currentExercise.sets
                  ? 'Finish Exercise & Continue'
                  : `Complete Set ${currentSet}`}
              </span>
            </button>
          </div>
        </div>

        {/* Pro Tips Footer */}
        {currentExercise.tips && currentExercise.tips.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-2 bg-slate-900/50 p-4 rounded-xl">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Form Focus:</strong> {currentExercise.tips[0]}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Step Controller */}
      <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-slate-800">
        <button
          onClick={handlePrev}
          disabled={currentExIndex === 0}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <SkipBack className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={() => setAutoNextEnabled(!autoNextEnabled)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
            autoNextEnabled
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}
        >
          Auto Timer: {autoNextEnabled ? 'ON' : 'OFF'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentExIndex >= totalExercises - 1}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <span>Next</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
