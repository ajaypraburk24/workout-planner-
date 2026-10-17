import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  DailyActivityLog,
  WeightRecord,
  Badge,
  Challenge,
  DayOfWeek,
} from '../types/fitness';
import { INITIAL_BADGES, INITIAL_CHALLENGES } from '../data/badgesData';
import { WEEKLY_WORKOUT_PLANS } from '../data/workoutPlanData';
import { sound } from '../utils/soundEffects';

interface ActiveWorkoutState {
  day: DayOfWeek;
  currentExerciseIndex: number;
  completedIds: string[];
  startTime: number;
}

interface FitnessContextType {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  todayLog: DailyActivityLog;
  todayDateStr: string;
  streak: number;
  xp: number;
  level: number;
  addXP: (amount: number, reason?: string) => void;
  addWater: (amountMl: number) => void;
  setWater: (amountMl: number) => void;
  addSteps: (count: number) => void;
  setSteps: (count: number) => void;
  toggleExerciseCompletion: (exerciseId: string) => void;
  toggleMealCompletion: (mealKey: string) => void;
  favoriteExerciseIds: string[];
  toggleFavoriteExercise: (exerciseId: string) => void;
  weightHistory: WeightRecord[];
  logWeight: (weight: number, bodyFat?: number) => void;
  badges: Badge[];
  challenges: Challenge[];
  activeSession: ActiveWorkoutState | null;
  startWorkoutSession: (day: DayOfWeek) => void;
  nextSessionExercise: () => void;
  prevSessionExercise: () => void;
  endWorkoutSession: () => void;
  triggerConfetti: () => void;
  recentlyUnlockedBadge: Badge | null;
  dismissBadgeNotification: () => void;
  resetAllData: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Alex Hunter',
  age: 26,
  gender: 'Male',
  height: 178,
  weight: 76,
  targetWeight: 78,
  fitnessGoal: 'Build Muscle',
  level: 'Intermediate',
  workoutDuration: 60,
  equipment: 'Full Gym',
  location: 'Gym',
  dietaryPreference: 'Non-Vegetarian',
  allergies: ['None'],
  sleepHours: 8,
  dailyWaterGoal: 3000,
  dailyStepGoal: 10000,
  dailyCalorieTarget: 2500,
};

const getTodayDateStr = () => new Date().toISOString().split('T')[0];

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const todayDateStr = getTodayDateStr();

  // Theme
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('wpp_theme') as 'dark' | 'light') || 'dark';
  });

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    localStorage.setItem('wpp_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // User Profile
  const [profile, setProfileState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('wpp_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('wpp_profile', JSON.stringify(updated));
      return updated;
    });
  };

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState<Record<string, DailyActivityLog>>(() => {
    try {
      const saved = localStorage.getItem('wpp_logs');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Today Log
  const todayLog: DailyActivityLog = activityLogs[todayDateStr] || {
    date: todayDateStr,
    waterIntake: 1250,
    steps: 6420,
    completedExerciseIds: [],
    completedMealSlots: ['breakfast'],
    workoutCompleted: false,
    caloriesBurned: 350,
  };

  // Favorites
  const [favoriteExerciseIds, setFavoriteExerciseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wpp_favorites');
      return saved ? JSON.parse(saved) : ['bench-press', 'deadlift', 'squats'];
    } catch {
      return ['bench-press', 'deadlift', 'squats'];
    }
  });

  const toggleFavoriteExercise = (id: string) => {
    setFavoriteExerciseIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('wpp_favorites', JSON.stringify(next));
      return next;
    });
  };

  // Weight History
  const [weightHistory, setWeightHistory] = useState<WeightRecord[]>(() => {
    try {
      const saved = localStorage.getItem('wpp_weight_history');
      if (saved) return JSON.parse(saved);
      // Default 6-week progression
      return [
        { date: '2026-09-01', weight: 78.5, bodyFat: 17.5 },
        { date: '2026-09-10', weight: 77.8, bodyFat: 17.1 },
        { date: '2026-09-20', weight: 77.2, bodyFat: 16.8 },
        { date: '2026-10-01', weight: 76.6, bodyFat: 16.4 },
        { date: '2026-10-10', weight: 76.2, bodyFat: 16.1 },
        { date: todayDateStr, weight: 76.0, bodyFat: 15.9 },
      ];
    } catch {
      return [{ date: todayDateStr, weight: 76.0, bodyFat: 16.0 }];
    }
  });

  const logWeight = (weight: number, bodyFat?: number) => {
    const record: WeightRecord = { date: todayDateStr, weight, bodyFat };
    setWeightHistory((prev) => {
      const filtered = prev.filter((r) => r.date !== todayDateStr);
      const updated = [...filtered, record].sort((a, b) => a.date.localeCompare(b.date));
      localStorage.setItem('wpp_weight_history', JSON.stringify(updated));
      return updated;
    });
    updateProfile({ weight });
    addXP(40, 'Logged Body Weight');
  };

  // XP & Level
  const [xp, setXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('wpp_xp');
      return saved ? parseInt(saved, 10) : 480;
    } catch {
      return 480;
    }
  });

  const level = Math.floor(xp / 250) + 1;

  // Streak
  const [streak, setStreak] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('wpp_streak');
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  // Badges & Challenges
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('wpp_badges');
      return saved ? JSON.parse(saved) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    try {
      const saved = localStorage.getItem('wpp_challenges');
      return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
    } catch {
      return INITIAL_CHALLENGES;
    }
  });

  const [recentlyUnlockedBadge, setRecentlyUnlockedBadge] = useState<Badge | null>(null);

  // Active workout session
  const [activeSession, setActiveSession] = useState<ActiveWorkoutState | null>(null);

  // Confetti helper
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#f59e0b', '#ec4899'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const addXP = (amount: number, reason?: string) => {
    setXp((prev) => {
      const next = prev + amount;
      localStorage.setItem('wpp_xp', next.toString());
      const prevLvl = Math.floor(prev / 250) + 1;
      const nextLvl = Math.floor(next / 250) + 1;
      if (nextLvl > prevLvl) {
        sound.playLevelUp();
        triggerConfetti();
      }
      return next;
    });
  };

  const unlockBadge = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === badgeId && !b.unlockedAt) {
          const unlocked = { ...b, unlockedAt: new Date().toISOString() };
          setRecentlyUnlockedBadge(unlocked);
          sound.playLevelUp();
          triggerConfetti();
          addXP(b.xp, `Badge Unlocked: ${b.title}`);
          return unlocked;
        }
        return b;
      })
    );
  };

  // Sync log helper
  const saveTodayLog = (newTodayLog: DailyActivityLog) => {
    setActivityLogs((prev) => {
      const updated = { ...prev, [todayDateStr]: newTodayLog };
      localStorage.setItem('wpp_logs', JSON.stringify(updated));
      return updated;
    });
  };

  const addWater = (amountMl: number) => {
    const current = todayLog.waterIntake || 0;
    const next = Math.max(0, current + amountMl);
    setWater(next);
  };

  const setWater = (amountMl: number) => {
    const updated: DailyActivityLog = {
      ...todayLog,
      waterIntake: amountMl,
    };
    saveTodayLog(updated);
    sound.playTick();

    if (amountMl >= profile.dailyWaterGoal) {
      unlockBadge('hydro-hero');
    }
    addXP(10, 'Logged Hydration');
  };

  const addSteps = (count: number) => {
    const current = todayLog.steps || 0;
    setSteps(current + count);
  };

  const setSteps = (count: number) => {
    const updated: DailyActivityLog = {
      ...todayLog,
      steps: count,
    };
    saveTodayLog(updated);
    if (count >= 10000) {
      unlockBadge('step-master');
    }
    addXP(15, 'Logged Steps');
  };

  const toggleExerciseCompletion = (exerciseId: string) => {
    const current = todayLog.completedExerciseIds || [];
    const isCompleted = current.includes(exerciseId);
    const nextCompleted = isCompleted
      ? current.filter((id) => id !== exerciseId)
      : [...current, exerciseId];

    const updated: DailyActivityLog = {
      ...todayLog,
      completedExerciseIds: nextCompleted,
      workoutCompleted: nextCompleted.length >= 3,
      caloriesBurned: (todayLog.caloriesBurned || 0) + (isCompleted ? -60 : 60),
    };

    saveTodayLog(updated);

    if (!isCompleted) {
      sound.playSuccess();
      unlockBadge('first-workout');
      addXP(30, 'Completed Exercise');
      // Update streak if first completion of the day
      if (current.length === 0) {
        setStreak((s) => {
          const nextS = s + 1;
          localStorage.setItem('wpp_streak', nextS.toString());
          if (nextS >= 3) unlockBadge('iron-will-streak');
          if (nextS >= 7) unlockBadge('unbreakable-7');
          return nextS;
        });
      }
    }
  };

  const toggleMealCompletion = (mealKey: string) => {
    const current = todayLog.completedMealSlots || [];
    const isDone = current.includes(mealKey);
    const next = isDone ? current.filter((k) => k !== mealKey) : [...current, mealKey];

    const updated: DailyActivityLog = {
      ...todayLog,
      completedMealSlots: next,
    };
    saveTodayLog(updated);
    sound.playTick();
    if (!isDone) {
      addXP(15, 'Logged Meal');
      if (next.length >= 6) {
        unlockBadge('macro-discipline');
      }
    }
  };

  // Workout Session Flow
  const startWorkoutSession = (day: DayOfWeek) => {
    setActiveSession({
      day,
      currentExerciseIndex: 0,
      completedIds: [],
      startTime: Date.now(),
    });
  };

  const nextSessionExercise = () => {
    if (!activeSession) return;
    const plan = WEEKLY_WORKOUT_PLANS[activeSession.day];
    const currentEx = plan.exercises[activeSession.currentExerciseIndex];
    if (currentEx) {
      toggleExerciseCompletion(currentEx.id);
    }

    if (activeSession.currentExerciseIndex < plan.exercises.length - 1) {
      setActiveSession((prev) =>
        prev
          ? {
              ...prev,
              currentExerciseIndex: prev.currentExerciseIndex + 1,
              completedIds: [...prev.completedIds, currentEx.id],
            }
          : null
      );
    } else {
      endWorkoutSession();
    }
  };

  const prevSessionExercise = () => {
    if (!activeSession || activeSession.currentExerciseIndex <= 0) return;
    setActiveSession((prev) =>
      prev ? { ...prev, currentExerciseIndex: prev.currentExerciseIndex - 1 } : null
    );
  };

  const endWorkoutSession = () => {
    if (activeSession) {
      sound.playLevelUp();
      triggerConfetti();
      addXP(100, `Completed ${activeSession.day} Workout Session`);
      setActiveSession(null);
    }
  };

  const dismissBadgeNotification = () => {
    setRecentlyUnlockedBadge(null);
  };

  const resetAllData = () => {
    localStorage.clear();
    setProfileState(DEFAULT_PROFILE);
    setActivityLogs({});
    setStreak(1);
    setXp(100);
    setBadges(INITIAL_BADGES);
    setChallenges(INITIAL_CHALLENGES);
    setWeightHistory([{ date: todayDateStr, weight: 76.0, bodyFat: 16.0 }]);
    setFavoriteExerciseIds(['bench-press', 'deadlift', 'squats']);
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <FitnessContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        profile,
        updateProfile,
        todayLog,
        todayDateStr,
        streak,
        xp,
        level,
        addXP,
        addWater,
        setWater,
        addSteps,
        setSteps,
        toggleExerciseCompletion,
        toggleMealCompletion,
        favoriteExerciseIds,
        toggleFavoriteExercise,
        weightHistory,
        logWeight,
        badges,
        challenges,
        activeSession,
        startWorkoutSession,
        nextSessionExercise,
        prevSessionExercise,
        endWorkoutSession,
        triggerConfetti,
        recentlyUnlockedBadge,
        dismissBadgeNotification,
        resetAllData,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
