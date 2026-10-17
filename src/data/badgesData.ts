import { Badge, Challenge } from '../types/fitness';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first-workout',
    title: 'First Step to Greatness',
    description: 'Complete your first exercise in Workout Planner Pro.',
    icon: 'Flame',
    category: 'workout',
    xp: 50,
    progress: { current: 0, total: 1 }
  },
  {
    id: 'chest-crusher',
    title: 'Chest & Tricep Champion',
    description: 'Complete all Monday chest and tricep exercises.',
    icon: 'Dumbbell',
    category: 'workout',
    xp: 120,
    progress: { current: 0, total: 6 }
  },
  {
    id: 'iron-will-streak',
    title: 'Iron Will: 3-Day Streak',
    description: 'Log active workouts or hydration 3 days in a row.',
    icon: 'Zap',
    category: 'streak',
    xp: 150,
    progress: { current: 1, total: 3 }
  },
  {
    id: 'unbreakable-7',
    title: 'Unbreakable: 7-Day Streak',
    description: 'Maintain a 7-day daily fitness streak.',
    icon: 'Crown',
    category: 'streak',
    xp: 300,
    progress: { current: 1, total: 7 }
  },
  {
    id: 'hydro-hero',
    title: 'Hydration Hero',
    description: 'Reach your daily 3,000ml water goal.',
    icon: 'Droplet',
    category: 'nutrition',
    xp: 80,
    progress: { current: 0, total: 3000 }
  },
  {
    id: 'step-master',
    title: '10,000 Step Master',
    description: 'Log 10,000 steps in a single day.',
    icon: 'Footprints',
    category: 'workout',
    xp: 100,
    progress: { current: 0, total: 10000 }
  },
  {
    id: 'macro-discipline',
    title: 'Macro Perfectionist',
    description: 'Check off all meals in a single day.',
    icon: 'Apple',
    category: 'nutrition',
    xp: 120,
    progress: { current: 0, total: 6 }
  },
  {
    id: 'timer-titan',
    title: 'Rest Discipline Titan',
    description: 'Complete 5 rest timer intervals during a workout.',
    icon: 'Timer',
    category: 'workout',
    xp: 90,
    progress: { current: 0, total: 5 }
  },
  {
    id: 'century-club',
    title: 'Century Club (Level 5)',
    description: 'Accumulate 1,000 total fitness XP.',
    icon: 'Award',
    category: 'xp',
    xp: 250,
    progress: { current: 0, total: 1000 }
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'w-chal-1',
    title: 'Weekly Iron Circuit',
    timeframe: 'Weekly',
    description: 'Complete 15 total sets across any workout routines this week.',
    category: 'workout',
    target: 15,
    current: 4,
    unit: 'sets',
    xpReward: 200,
    completed: false,
    deadline: 'This Sunday'
  },
  {
    id: 'w-chal-2',
    title: 'Hydro Flush Challenge',
    timeframe: 'Weekly',
    description: 'Log at least 15,000ml (15L) of pure water intake this week.',
    category: 'water',
    target: 15000,
    current: 6500,
    unit: 'ml',
    xpReward: 150,
    completed: false,
    deadline: 'This Sunday'
  },
  {
    id: 'm-chal-1',
    title: '300,000 Step Quest',
    timeframe: 'Monthly',
    description: 'Accumulate 150,000+ steps across the entire month.',
    category: 'steps',
    target: 150000,
    current: 42500,
    unit: 'steps',
    xpReward: 500,
    completed: false,
    deadline: 'End of month'
  },
  {
    id: 'm-chal-2',
    title: 'Centurion Workout Habit',
    timeframe: 'Monthly',
    description: 'Complete 18 full workout sessions in 30 days.',
    category: 'workout',
    target: 18,
    current: 6,
    unit: 'sessions',
    xpReward: 600,
    completed: false,
    deadline: 'End of month'
  }
];
