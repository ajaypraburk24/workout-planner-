import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FitnessProvider } from './context/FitnessContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { BadgeNotificationModal } from './components/BadgeNotificationModal';

import { HomePage } from './pages/HomePage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { ActiveWorkoutPage } from './pages/ActiveWorkoutPage';
import { NutritionPage } from './pages/NutritionPage';
import { BmiPage } from './pages/BmiPage';
import { TimerPage } from './pages/TimerPage';
import { ProgressPage } from './pages/ProgressPage';
import { AiCoachPage } from './pages/AiCoachPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <FitnessProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950">
          {/* Top Glass Header */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 lg:pb-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/active-workout" element={<ActiveWorkoutPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/bmi" element={<BmiPage />} />
              <Route path="/timer" element={<TimerPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/coach" element={<AiCoachPage />} />
              <Route path="/challenges" element={<ChallengesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Mobile Bottom Navigation */}
          <BottomNav />

          {/* Global Achievement Badge Unlock Notification */}
          <BadgeNotificationModal />
        </div>
      </BrowserRouter>
    </FitnessProvider>
  );
}
