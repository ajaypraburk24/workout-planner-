import { UserProfile } from '../types/fitness';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
}

export async function sendCoachMessage(
  message: string,
  profile: UserProfile,
  streak: number
): Promise<string> {
  try {
    const res = await fetch('/api/coach/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        userContext: {
          goal: profile.fitnessGoal,
          level: profile.level,
          equipment: profile.equipment,
          diet: profile.dietaryPreference,
          streak,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.reply || getLocalFallbackAdvice(message, profile);
  } catch (err) {
    console.warn('AI Coach server call failed, using smart local advisor:', err);
    return getLocalFallbackAdvice(message, profile);
  }
}

export async function checkExerciseForm(
  exercise: string,
  concern: string
): Promise<{ analysis: string }> {
  try {
    const res = await fetch('/api/coach/form-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exercise, concern }),
    });

    if (!res.ok) {
      throw new Error('Form check endpoint error');
    }

    const data = await res.json();
    return { analysis: data.analysis };
  } catch (err) {
    return {
      analysis: `### Biomechanical Tips for ${exercise}\n\n1. **Setup & Stance:** Ground your feet firmly, engage your abdominal wall, and pull shoulders down.\n2. **Path of Motion:** Control the lowering (eccentric) phase across 2-3 seconds. Never drop into the bottom.\n3. **Breathing:** Inhale on the stretch/descent; exhale forcefully as you drive through the concentric portion.\n4. **Correction:** ${concern ? `Addressing "${concern}": Reduce load by 15-20% and focus on full active range of motion without momentum.` : 'Prioritize clean form before adding weight.'}`,
    };
  }
}

export async function fetchDailyBoost(): Promise<{
  quote: string;
  author: string;
  focusTip: string;
  recoveryTip: string;
}> {
  try {
    const res = await fetch('/api/coach/daily-boost');
    if (!res.ok) throw new Error('Failed to fetch boost');
    const data = await res.json();
    return data;
  } catch {
    return {
      quote: "Discipline is choosing between what you want now and what you want most.",
      author: "Abraham Lincoln",
      focusTip: "Focus on slow, controlled eccentric tempos (2-3 seconds down) on every set today.",
      recoveryTip: "Target 8 hours of sleep and replenish electrolytes with adequate water.",
    };
  }
}

// Robust offline expert knowledge engine
function getLocalFallbackAdvice(msg: string, profile: UserProfile): string {
  const lower = msg.toLowerCase();

  if (lower.includes('protein') || lower.includes('eat') || lower.includes('meal') || lower.includes('diet')) {
    return `### Nutrition Strategy for ${profile.fitnessGoal}\n- **Protein Intake:** Aim for ~${Math.round(profile.weight * 2.0)}g daily (approx 2.0g per kg of bodyweight).\n- **Macro Timing:** Space your protein into 4-5 feedings with 25-40g each.\n- **Whole Food Staples:** ${profile.dietaryPreference === 'Vegetarian' ? 'Paneer, Greek yogurt, lentils, tofu, and whey/plant isolate.' : 'Chicken breast, eggs, salmon, lean beef, and Greek yogurt.'}\n- **Hydration:** Pair meals with water, aiming for ${profile.dailyWaterGoal}ml total today!`;
  }

  if (lower.includes('sore') || lower.includes('pain') || lower.includes('hurt') || lower.includes('recover')) {
    return `### Recovery Protocol\n- **Active Recovery:** Go for a brisk 20-minute walk or do light foam rolling to flush out metabolic waste.\n- **Sleep:** Muscle protein synthesis peaks during deep REM sleep. Aim for 7.5 to 8.5 hours tonight.\n- **Hydration & Salt:** Mild dehydration worsens DOMS. Add a pinch of sea salt or electrolytes to your water.\n- **Rule of Thumb:** If pain is sharp in a joint or tendon, rest immediately. Muscle belly soreness responds best to gentle movement and warm baths.`;
  }

  if (lower.includes('fat') || lower.includes('lose') || lower.includes('weight') || lower.includes('cut')) {
    return `### Fat Loss Execution\n1. **Caloric Deficit:** A moderate deficit of 300-500 kcal below maintenance is ideal to shred fat while preserving lean muscle mass.\n2. **High Daily Steps:** Hit your daily goal of ${profile.dailyStepGoal} steps. Non-Exercise Activity Thermogenesis (NEAT) accounts for far more fat burn than cardio alone!\n3. **Lift Heavy:** Don't drop your weights for light "toning" reps. Heavy lifting signals your brain to keep your muscle while burning stored fat.`;
  }

  return `### Coach Titan's Prescription\n- **Core Focus:** For ${profile.fitnessGoal} as an ${profile.level} trainee, focus on **progressive overload**—log your weights, add 1 rep or 1-2.5kg whenever possible.\n- **Consistency:** You're on a great path! Never skip a warm-up, brace your core on every compound movement, and finish every workout with full hydration.\n- Let me know if you need specific exercise adjustments or alternative meal swaps!`;
}
