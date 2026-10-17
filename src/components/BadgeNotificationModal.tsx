import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { Award, Zap, X, Sparkles } from 'lucide-react';

export const BadgeNotificationModal: React.FC = () => {
  const { recentlyUnlockedBadge, dismissBadgeNotification } = useFitness();

  if (!recentlyUnlockedBadge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm glass-panel rounded-3xl border border-amber-500/40 p-6 text-center text-slate-100 shadow-2xl glow-amber">
        <button
          onClick={dismissBadgeNotification}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy Glow Icon */}
        <div className="relative w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping opacity-60" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30">
            <Award className="w-9 h-9" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Achievement Unlocked!</span>
        </div>

        <h3 className="text-xl font-extrabold text-white font-display mb-1">
          {recentlyUnlockedBadge.title}
        </h3>

        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          {recentlyUnlockedBadge.description}
        </p>

        {/* XP Bonus */}
        <div className="bg-slate-900/90 rounded-2xl p-3 border border-amber-500/30 mb-6 flex items-center justify-center gap-2">
          <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span className="text-lg font-extrabold text-amber-300 font-mono">
            +{recentlyUnlockedBadge.xp} XP Earned
          </span>
        </div>

        <button
          onClick={dismissBadgeNotification}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-bold transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
        >
          Claim Reward & Continue
        </button>
      </div>
    </div>
  );
};
