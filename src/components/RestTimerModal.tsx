import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Plus, Minus, Bell } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface RestTimerModalProps {
  initialSeconds?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const RestTimerModal: React.FC<RestTimerModalProps> = ({
  initialSeconds = 60,
  isOpen,
  onClose,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(initialSeconds);
  const [remaining, setRemaining] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Sync when initialSeconds changes
  useEffect(() => {
    if (isOpen) {
      setTotalSeconds(initialSeconds);
      setRemaining(initialSeconds);
      setIsRunning(true);
    }
  }, [initialSeconds, isOpen]);

  // Timer tick
  useEffect(() => {
    let interval: any = null;
    if (isOpen && isRunning && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 4 && prev > 1) {
            sound.playCountdown();
          }
          if (prev <= 1) {
            sound.playSuccess();
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isRunning, remaining]);

  if (!isOpen) return null;

  const percentage = totalSeconds > 0 ? ((totalSeconds - remaining) / totalSeconds) * 100 : 100;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const setPreset = (sec: number) => {
    setTotalSeconds(sec);
    setRemaining(sec);
    setIsRunning(true);
    sound.playTick();
  };

  const adjustTime = (delta: number) => {
    const next = Math.max(5, remaining + delta);
    setRemaining(next);
    if (next > totalSeconds) setTotalSeconds(next);
    sound.playTick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm glass-panel rounded-3xl border border-slate-700/80 p-6 text-center text-slate-100 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2 text-emerald-400 text-sm font-semibold tracking-wider uppercase">
          <Bell className="w-4 h-4 animate-bounce" />
          <span>Rest & Recover</span>
        </div>

        {/* Circular Display */}
        <div className="relative w-52 h-52 mx-auto my-6 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-800"
              strokeWidth="6"
              stroke="currentColor"
              fill="none"
            />
            {/* Progress bar */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-emerald-400 transition-all duration-1000"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - percentage / 100)}
              strokeWidth="6"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
            />
          </svg>

          {/* Center Digital Counter */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
              {formattedTime}
            </span>
            <span className="text-xs text-slate-400 mt-1">
              {remaining === 0 ? 'Ready for next set!' : isRunning ? 'Resting...' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Quick adjustment buttons */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <button
            onClick={() => adjustTime(-15)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold border border-slate-700 cursor-pointer flex items-center gap-1"
          >
            <Minus className="w-3 h-3" /> 15s
          </button>
          <button
            onClick={() => adjustTime(15)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold border border-slate-700 cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> 15s
          </button>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setRemaining(totalSeconds);
              setIsRunning(true);
            }}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-5 rounded-2xl font-bold flex items-center justify-center transition-all cursor-pointer shadow-lg ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
          </button>

          <button
            onClick={() => onClose()}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            title="Done rest"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Presets */}
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-800/80">
          {[30, 45, 60, 90, 120].map((sec) => (
            <button
              key={sec}
              onClick={() => setPreset(sec)}
              className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                totalSeconds === sec
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
