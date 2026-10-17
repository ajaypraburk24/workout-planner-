import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFitness } from '../context/FitnessContext';
import {
  Dumbbell,
  Flame,
  Zap,
  Sun,
  Moon,
  Bot,
  Calendar,
  Utensils,
  Calculator,
  Timer,
  BarChart2,
  Trophy,
  Settings,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, streak, xp, level, profile } = useFitness();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: Calendar },
    { to: '/workouts', label: 'Workouts', icon: Dumbbell },
    { to: '/nutrition', label: 'Meal Plan', icon: Utensils },
    { to: '/bmi', label: 'BMI & Macros', icon: Calculator },
    { to: '/timer', label: 'Timer', icon: Timer },
    { to: '/progress', label: 'Progress', icon: BarChart2 },
    { to: '/coach', label: 'AI Coach', icon: Bot, isSpecial: true },
    { to: '/challenges', label: 'Challenges', icon: Trophy },
  ];

  const currentLevelMinXp = (level - 1) * 250;
  const nextLevelXp = level * 250;
  const levelProgressPct = Math.min(
    100,
    Math.round(((xp - currentLevelMinXp) / (nextLevelXp - currentLevelMinXp)) * 100)
  );

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-display flex items-center gap-1">
              Workout Planner <span className="text-emerald-400">PRO</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5 hidden sm:inline">
              Elite Fitness Dashboard
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? item.isSpecial
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Stats & Profile Controls */}
        <div className="flex items-center gap-3">
          {/* Daily Streak Indicator */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold"
            title={`${streak} Day Workout Streak`}
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{streak}d</span>
          </div>

          {/* XP & Level Badge */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs"
            title={`${xp} total XP. Reach ${nextLevelXp} for Level ${level + 1}`}
          >
            <div className="flex items-center gap-1 text-cyan-400 font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Lv.{level}</span>
            </div>
            <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${levelProgressPct}%` }}
              />
            </div>
          </div>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* Settings Link */}
          <Link
            to="/settings"
            className={`p-2 rounded-xl border transition-all ${
              location.pathname === '/settings'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="User Profile & Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
