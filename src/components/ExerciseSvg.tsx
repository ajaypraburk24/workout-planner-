import React from 'react';
import { MuscleGroup } from '../types/fitness';

interface ExerciseSvgProps {
  muscleGroup: MuscleGroup;
  exerciseName?: string;
  className?: string;
}

export const ExerciseSvg: React.FC<ExerciseSvgProps> = ({ muscleGroup, className = 'w-full h-full' }) => {
  // Dynamic gradient accents based on muscle group
  const getGradient = () => {
    switch (muscleGroup) {
      case 'Chest':
        return { from: '#06b6d4', to: '#3b82f6', glow: 'rgba(6, 182, 212, 0.4)' };
      case 'Back':
        return { from: '#8b5cf6', to: '#6366f1', glow: 'rgba(139, 92, 246, 0.4)' };
      case 'Legs':
        return { from: '#10b981', to: '#059669', glow: 'rgba(16, 185, 129, 0.4)' };
      case 'Shoulders':
        return { from: '#f59e0b', to: '#d97706', glow: 'rgba(245, 158, 11, 0.4)' };
      case 'Triceps':
      case 'Biceps':
        return { from: '#ec4899', to: '#db2777', glow: 'rgba(236, 72, 153, 0.4)' };
      case 'Core':
        return { from: '#14b8a6', to: '#0d9488', glow: 'rgba(20, 184, 166, 0.4)' };
      case 'Cardio':
      case 'Full Body':
        return { from: '#ef4444', to: '#f97316', glow: 'rgba(239, 68, 68, 0.4)' };
      default:
        return { from: '#10b981', to: '#06b6d4', glow: 'rgba(16, 185, 129, 0.4)' };
    }
  };

  const { from, to } = getGradient();

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-slate-900/90 border border-slate-800 ${className}`}>
      {/* Background radial glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${from} 0%, transparent 70%)`
        }}
      />

      <svg
        viewBox="0 0 200 160"
        className="w-full h-full p-2 max-h-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${muscleGroup}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Athletic Stylized Silhouette & Biomechanical Nodes */}
        {muscleGroup === 'Chest' && (
          <g filter="url(#glow)">
            {/* Torso & Pectorals */}
            <path d="M70 40 L130 40 L120 95 L80 95 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <path d="M72 45 C85 45 98 52 98 72 C80 75 75 65 72 45 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <path d="M128 45 C115 45 102 52 102 72 C120 75 125 65 128 45 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            {/* Sternum separator */}
            <line x1="100" y1="42" x2="100" y2="80" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="3 3" />
            {/* Barbell vector */}
            <line x1="20" y1="58" x2="180" y2="58" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            <rect x="25" y="44" width="8" height="28" rx="2" fill="#94a3b8" />
            <rect x="167" y="44" width="8" height="28" rx="2" fill="#94a3b8" />
          </g>
        )}

        {muscleGroup === 'Back' && (
          <g filter="url(#glow)">
            {/* V-Taper Lats */}
            <path d="M60 40 C75 42 100 45 140 40 L125 110 L75 110 Z" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <path d="M64 45 C78 55 90 75 88 105 C75 92 68 70 64 45 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <path d="M136 45 C122 55 110 75 112 105 C125 92 132 70 136 45 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            {/* Spine column */}
            <line x1="100" y1="35" x2="100" y2="115" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 2" />
          </g>
        )}

        {muscleGroup === 'Legs' && (
          <g filter="url(#glow)">
            {/* Quads & Hamstrings */}
            <path d="M72 30 C82 30 88 45 86 95 C76 95 68 80 66 60 C64 45 68 30 72 30 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <path d="M128 30 C118 30 112 45 114 95 C124 95 132 80 134 60 C136 45 132 30 128 30 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            {/* Calves */}
            <path d="M74 105 C80 105 84 115 82 145 L70 145 C68 125 70 105 74 105 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.8" />
            <path d="M126 105 C120 105 116 115 118 145 L130 145 C132 125 130 105 126 105 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.8" />
            {/* Knee joints */}
            <circle cx="78" cy="100" r="4" fill="#34d399" />
            <circle cx="122" cy="100" r="4" fill="#34d399" />
          </g>
        )}

        {muscleGroup === 'Shoulders' && (
          <g filter="url(#glow)">
            {/* Shoulders & Traps */}
            <path d="M50 50 C60 40 80 35 100 35 C120 35 140 40 150 50 L140 85 L60 85 Z" fill="#1e293b" />
            <path d="M48 52 C55 46 68 46 72 65 C68 78 52 75 48 52 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.95" />
            <path d="M152 52 C145 46 132 46 128 65 C132 78 148 75 152 52 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.95" />
            <path d="M82 36 C90 32 110 32 118 36 L112 55 L88 55 Z" fill="#fbbf24" opacity="0.85" />
          </g>
        )}

        {muscleGroup === 'Triceps' && (
          <g filter="url(#glow)">
            {/* Upper Arm Triceps Horseshoe */}
            <path d="M65 30 L85 30 L80 80 L60 80 Z" fill="#1e293b" />
            <path d="M62 38 C75 38 80 48 78 75 C68 76 60 65 62 38 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.95" />
            <circle cx="72" cy="88" r="4" fill="#f472b6" />
            <line x1="72" y1="92" x2="72" y2="135" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
            <line x1="50" y1="135" x2="94" y2="135" stroke="#f472b6" strokeWidth="3" />
          </g>
        )}

        {muscleGroup === 'Biceps' && (
          <g filter="url(#glow)">
            {/* Arm Flex */}
            <path d="M85 35 C100 35 110 50 105 78 C92 78 82 65 85 35 Z" fill={`url(#grad-${muscleGroup})`} opacity="0.95" />
            <line x1="88" y1="82" x2="125" y2="55" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
            <circle cx="128" cy="50" r="10" fill="#f43f5e" />
          </g>
        )}

        {muscleGroup === 'Core' && (
          <g filter="url(#glow)">
            {/* 6-Pack grid */}
            <rect x="76" y="42" width="20" height="15" rx="3" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <rect x="104" y="42" width="20" height="15" rx="3" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <rect x="76" y="62" width="20" height="15" rx="3" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <rect x="104" y="62" width="20" height="15" rx="3" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <rect x="76" y="82" width="20" height="15" rx="3" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            <rect x="104" y="82" width="20" height="15" rx="3" fill={`url(#grad-${muscleGroup})`} opacity="0.9" />
            {/* Obliques waves */}
            <path d="M65 48 C70 65 70 85 64 100" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M135 48 C130 65 130 85 136 100" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        )}

        {(muscleGroup === 'Cardio' || muscleGroup === 'Full Body') && (
          <g filter="url(#glow)">
            {/* Heartbeat pulse & lightning velocity */}
            <path
              d="M20 80 L60 80 L75 40 L90 120 L105 60 L120 95 L135 80 L180 80"
              stroke={`url(#grad-${muscleGroup})`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="90" cy="120" r="5" fill="#ef4444" />
            <circle cx="75" cy="40" r="5" fill="#f97316" />
          </g>
        )}

        {muscleGroup === 'Flexibility' && (
          <g filter="url(#glow)">
            <circle cx="100" cy="50" r="14" fill="#34d399" opacity="0.8" />
            <path d="M70 120 C85 90 115 90 130 120" stroke="#10b981" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M100 68 L100 100" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
      </svg>

      {/* Target Badge */}
      <span className="absolute bottom-2 left-2 text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-700/60">
        {muscleGroup}
      </span>
    </div>
  );
};
