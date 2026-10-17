import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/soundEffects';
import { useFitness } from '../context/FitnessContext';
import {
  Timer as TimerIcon,
  Play,
  Pause,
  RotateCcw,
  Flag,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Clock,
  Dumbbell,
  Volume2,
} from 'lucide-react';

type TimerMode = 'rest' | 'countdown' | 'stopwatch' | 'autonext';

export const TimerPage: React.FC = () => {
  const navigate = useNavigate();
  const { startWorkoutSession } = useFitness();
  const [activeMode, setActiveMode] = useState<TimerMode>('rest');

  // --- REST TIMER STATE ---
  const [restInitial, setRestInitial] = useState<number>(60);
  const [restRemaining, setRestRemaining] = useState<number>(60);
  const [isRestRunning, setIsRestRunning] = useState<boolean>(false);

  // --- COUNTDOWN TIMER STATE ---
  const [cdHours, setCdHours] = useState<number>(0);
  const [cdMinutes, setCdMinutes] = useState<number>(5);
  const [cdSeconds, setCdSeconds] = useState<number>(0);
  const [cdRemaining, setCdRemaining] = useState<number>(300);
  const [cdInitialTotal, setCdInitialTotal] = useState<number>(300);
  const [isCdRunning, setIsCdRunning] = useState<boolean>(false);

  // --- STOPWATCH STATE ---
  const [swTimeMs, setSwTimeMs] = useState<number>(0);
  const [isSwRunning, setIsSwRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swIntervalRef = useRef<any>(null);

  // --- AUTO NEXT EXERCISE SIMULATOR ---
  const [routineStep, setRoutineStep] = useState<number>(1);
  const [routinePhase, setRoutinePhase] = useState<'Work' | 'Rest'>('Work');
  const [routineRemaining, setRoutineRemaining] = useState<number>(45);
  const [isRoutineRunning, setIsRoutineRunning] = useState<boolean>(false);

  // Rest Timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isRestRunning && restRemaining > 0) {
      interval = setInterval(() => {
        setRestRemaining((prev) => {
          if (prev <= 4 && prev > 1) sound.playCountdown();
          if (prev <= 1) {
            sound.playSuccess();
            setIsRestRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestRunning, restRemaining]);

  // Countdown timer effect
  useEffect(() => {
    let interval: any = null;
    if (isCdRunning && cdRemaining > 0) {
      interval = setInterval(() => {
        setCdRemaining((prev) => {
          if (prev <= 4 && prev > 1) sound.playCountdown();
          if (prev <= 1) {
            sound.playSuccess();
            setIsCdRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCdRunning, cdRemaining]);

  // Stopwatch effect
  useEffect(() => {
    if (isSwRunning) {
      swIntervalRef.current = setInterval(() => {
        setSwTimeMs((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(swIntervalRef.current);
    }
    return () => clearInterval(swIntervalRef.current);
  }, [isSwRunning]);

  // Auto next exercise effect
  useEffect(() => {
    let interval: any = null;
    if (isRoutineRunning && routineRemaining > 0) {
      interval = setInterval(() => {
        setRoutineRemaining((prev) => {
          if (prev <= 4 && prev > 1) sound.playCountdown();
          if (prev <= 1) {
            sound.playSuccess();
            // Switch phase
            if (routinePhase === 'Work') {
              setRoutinePhase('Rest');
              return 30; // 30s rest
            } else {
              setRoutinePhase('Work');
              setRoutineStep((s) => s + 1);
              return 45; // 45s work
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRoutineRunning, routineRemaining, routinePhase]);

  // Formatters
  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatStopwatch = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const centis = Math.floor((ms % 1000) / 10);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}.${centis < 10 ? '0' : ''}${centis}`;
  };

  const handleSetRestPreset = (sec: number) => {
    setRestInitial(sec);
    setRestRemaining(sec);
    setIsRestRunning(true);
    sound.playTick();
  };

  const handleStartCountdown = () => {
    const total = cdHours * 3600 + cdMinutes * 60 + cdSeconds;
    if (total > 0) {
      setCdInitialTotal(total);
      setCdRemaining(total);
      setIsCdRunning(true);
      sound.playTick();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <TimerIcon className="w-8 h-8 text-emerald-400" />
            Workout Timer Suite
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Intervals, rest tracking, stopwatch laps, and auto-next stepper
          </p>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(
          [
            ['rest', 'Rest Timer'],
            ['countdown', 'Countdown'],
            ['stopwatch', 'Stopwatch'],
            ['autonext', 'Auto Next Flow'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveMode(key)}
            className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold transition-all border cursor-pointer ${
              activeMode === key
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                : 'glass-card border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* MODE 1: REST TIMER */}
      {activeMode === 'rest' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Set Rest Interval
          </div>

          {/* Big Circular Ring Display */}
          <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-slate-800"
                strokeWidth="5"
                stroke="currentColor"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-emerald-400 transition-all duration-1000"
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={
                  2 * Math.PI * 44 * (1 - (restInitial - restRemaining) / restInitial)
                }
                strokeWidth="5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-6xl font-black font-mono text-white tracking-tight">
                {formatSeconds(restRemaining)}
              </span>
              <span className="text-xs text-slate-400 mt-2 font-medium">
                {restRemaining === 0 ? 'Time to lift!' : isRestRunning ? 'Resting...' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Primary Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setRestRemaining(restInitial);
                setIsRestRunning(false);
              }}
              className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRestRunning(!isRestRunning)}
              className={`p-6 rounded-2xl font-bold flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                isRestRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
              }`}
            >
              {isRestRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
            </button>
          </div>

          {/* Quick Presets */}
          <div className="pt-4 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 block mb-3 font-semibold">Common Presets:</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[30, 45, 60, 90, 120, 180].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleSetRestPreset(sec)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    restInitial === sec
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {sec < 60 ? `${sec}s` : `${sec / 60} min`}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: COUNTDOWN TIMER */}
      {activeMode === 'countdown' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Custom Interval Countdown
          </div>

          {/* Inputs when not running */}
          {!isCdRunning && cdRemaining === cdInitialTotal && (
            <div className="flex items-center justify-center gap-3">
              <div>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={cdHours}
                  onChange={(e) => setCdHours(parseInt(e.target.value, 10) || 0)}
                  className="w-16 bg-slate-900 border border-slate-700 rounded-xl py-2 text-center text-xl font-bold font-mono text-white"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Hours</span>
              </div>
              <span className="text-xl font-bold text-slate-500">:</span>
              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={cdMinutes}
                  onChange={(e) => setCdMinutes(parseInt(e.target.value, 10) || 0)}
                  className="w-16 bg-slate-900 border border-slate-700 rounded-xl py-2 text-center text-xl font-bold font-mono text-white"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Mins</span>
              </div>
              <span className="text-xl font-bold text-slate-500">:</span>
              <div>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={cdSeconds}
                  onChange={(e) => setCdSeconds(parseInt(e.target.value, 10) || 0)}
                  className="w-16 bg-slate-900 border border-slate-700 rounded-xl py-2 text-center text-xl font-bold font-mono text-white"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Secs</span>
              </div>
            </div>
          )}

          {/* Display */}
          <div className="py-4">
            <span className="text-6xl sm:text-7xl font-black font-mono text-white tracking-tight">
              {formatSeconds(cdRemaining)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsCdRunning(false);
                setCdRemaining(cdHours * 3600 + cdMinutes * 60 + cdSeconds);
              }}
              className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                if (!isCdRunning && cdRemaining === cdInitialTotal) {
                  handleStartCountdown();
                } else {
                  setIsCdRunning(!isCdRunning);
                }
              }}
              className="p-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center justify-center transition-all cursor-pointer shadow-xl shadow-cyan-500/25"
            >
              {isCdRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
            </button>
          </div>
        </div>
      )}

      {/* MODE 3: STOPWATCH */}
      {activeMode === 'stopwatch' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Precision Lap Stopwatch
          </div>

          <div className="py-4">
            <span className="text-5xl sm:text-7xl font-black font-mono text-white tracking-tight">
              {formatStopwatch(swTimeMs)}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsSwRunning(false);
                setSwTimeMs(0);
                setLaps([]);
              }}
              className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsSwRunning(!isSwRunning)}
              className={`p-6 rounded-2xl font-bold flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                isSwRunning
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
              }`}
            >
              {isSwRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
            </button>

            <button
              onClick={() => {
                if (isSwRunning) {
                  setLaps((prev) => [swTimeMs, ...prev]);
                  sound.playTick();
                }
              }}
              disabled={!isSwRunning}
              className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-40 transition-all cursor-pointer"
              title="Record Lap"
            >
              <Flag className="w-5 h-5 text-cyan-400" />
            </button>
          </div>

          {/* Laps List */}
          {laps.length > 0 && (
            <div className="max-h-52 overflow-y-auto pt-4 border-t border-slate-800 text-left space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">Recorded Laps:</span>
              {laps.map((lap, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono"
                >
                  <span className="text-slate-400">Lap {laps.length - index}</span>
                  <span className="text-white font-bold">{formatStopwatch(lap)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODE 4: AUTO NEXT EXERCISE ROUTINE */}
      {activeMode === 'autonext' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span
              className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${
                routinePhase === 'Work'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
              }`}
            >
              Phase: {routinePhase} (Round {routineStep})
            </span>
          </div>

          <div className="py-2">
            <span className="text-6xl sm:text-7xl font-black font-mono text-white tracking-tight">
              {formatSeconds(routineRemaining)}
            </span>
            <span className="text-xs text-slate-400 block mt-2">
              {routinePhase === 'Work'
                ? '🔥 Push Hard: Execute sets with proper tempo'
                : '💧 Deep Rest: Catch breath and hydrate'}
            </span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setIsRoutineRunning(false);
                setRoutinePhase('Work');
                setRoutineStep(1);
                setRoutineRemaining(45);
              }}
              className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsRoutineRunning(!isRoutineRunning)}
              className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold flex items-center justify-center transition-all cursor-pointer shadow-xl shadow-emerald-500/25"
            >
              {isRoutineRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => {
                startWorkoutSession('Monday');
                navigate('/active-workout');
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              <span>Switch to Active Guided Workout Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
