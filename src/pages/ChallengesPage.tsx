import React from 'react';
import { useFitness } from '../context/FitnessContext';
import {
  Trophy,
  Award,
  Zap,
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  Calendar,
  Droplet,
  Footprints,
  Dumbbell,
} from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  const { badges, challenges, xp, level, triggerConfetti } = useFitness();

  const unlockedCount = badges.filter((b) => !!b.unlockedAt).length;

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <Trophy className="w-8 h-8 text-amber-400" />
            Challenges & Badges
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Level up your athlete rank, unlock rare badges, and claim XP rewards
          </p>
        </div>

        {/* Current Level Pill */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-amber-500/30">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-300">Rank: Level {level}</div>
            <div className="text-[11px] text-slate-400 font-mono">{xp} Total XP Earned</div>
          </div>
        </div>
      </div>

      {/* 1. WEEKLY & MONTHLY CHALLENGES */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Active Challenges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((c) => {
            const pct = Math.min(100, Math.round((c.current / c.target) * 100));
            const isCompleted = pct >= 100;

            return (
              <div
                key={c.id}
                className={`glass-card rounded-2xl p-5 border transition-all ${
                  isCompleted ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      c.timeframe === 'Weekly'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    }`}
                  >
                    {c.timeframe} Challenge
                  </span>

                  <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    +{c.xpReward} XP
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">{c.title}</h3>
                <p className="text-xs text-slate-300 mb-4">{c.description}</p>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">
                      Progress: {c.current.toLocaleString()} / {c.target.toLocaleString()} {c.unit}
                    </span>
                    <span className="text-white font-bold">{pct}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-emerald-400' : 'bg-cyan-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-800/80">
                  <span>Expires: {c.deadline}</span>
                  {isCompleted && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ACHIEVEMENT BADGES SHOWCASE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Achievement Hall of Fame
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {unlockedCount} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const isUnlocked = !!badge.unlockedAt;

            return (
              <div
                key={badge.id}
                className={`rounded-2xl p-5 border transition-all relative overflow-hidden ${
                  isUnlocked
                    ? 'glass-card border-amber-500/40 bg-gradient-to-br from-slate-900/90 to-amber-950/20 shadow-md'
                    : 'bg-slate-900/40 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Badge Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                      isUnlocked
                        ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-500 border-slate-700'
                    }`}
                  >
                    {isUnlocked ? (
                      <Award className="w-6 h-6" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-sm font-bold ${
                          isUnlocked ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {badge.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {badge.description}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-xs">
                      <span className="font-mono text-amber-400 font-bold">
                        +{badge.xp} XP
                      </span>
                      {isUnlocked ? (
                        <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Locked</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
