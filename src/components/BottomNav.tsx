import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Timer, Bot, BarChart2 } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const mobileTabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/workouts', label: 'Workouts', icon: Dumbbell },
    { to: '/nutrition', label: 'Meals', icon: Utensils },
    { to: '/timer', label: 'Timer', icon: Timer },
    { to: '/coach', label: 'Coach', icon: Bot, highlight: true },
    { to: '/progress', label: 'Progress', icon: BarChart2 },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800/90 pb-safe backdrop-blur-xl">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.to;

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? tab.highlight
                    ? 'text-cyan-400 font-bold'
                    : 'text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-transform ${
                  isActive ? 'scale-110' : ''
                } ${tab.highlight && !isActive ? 'text-cyan-400' : ''}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
