import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google Gen AI client if key is available
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Coach Chat Endpoint
app.post('/api/coach/chat', async (req: Request, res: Response) => {
  try {
    const { message, userContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!aiClient) {
      // Provide an intelligent fallback response if API key is not configured
      return res.json({
        reply: `Coach Pro Tip: Consistency and progressive overload are the keystones to reaching your fitness goals! Keep your core tight, focus on controlled eccentrics (2-3 seconds down), hydrate with 3+ liters daily, and hit your protein target (around 1.6-2.2g per kg of bodyweight). What specific exercise or meal would you like to optimize next?`,
        source: 'local-fallback',
      });
    }

    const systemInstruction = `You are "Coach Titan", an elite Full-Stack Fitness Coach, Kinesiologist, and Sports Nutritionist at Workout Planner Pro.
You give encouraging, science-backed, practical advice for workouts, recovery, fat loss, muscle building, form corrections, and nutrition.
Keep replies concise, energetic, structured (use bullet points and bold highlights), and action-oriented.
User Context:
- Goal: ${userContext?.goal || 'Build Muscle & Stay Fit'}
- Level: ${userContext?.level || 'Intermediate'}
- Equipment: ${userContext?.equipment || 'Full Gym'}
- Diet Preference: ${userContext?.diet || 'Non-Vegetarian'}
- Current Streak: ${userContext?.streak || 0} days
Always personalize your guidance to their goal and equipment!`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Keep pushing your limits! Focus on clean form and consistent recovery.';
    return res.json({ reply, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating AI coach reply:', error);
    return res.status(500).json({
      error: 'Failed to generate AI advice',
      reply: 'Remember to warm up properly, maintain a neutral spine, and hydrate throughout your workout! Let me know if you need specific exercise tweaks.',
      source: 'fallback',
    });
  }
});

// AI Form Correction & Tips Endpoint
app.post('/api/coach/form-check', async (req: Request, res: Response) => {
  try {
    const { exercise, concern } = req.body;
    if (!exercise) {
      return res.status(400).json({ error: 'Exercise name is required' });
    }

    if (!aiClient) {
      return res.json({
        exercise,
        analysis: `For ${exercise}: Ensure your spine remains neutral, brace your core as if taking a punch, control the negative portion of the repetition, and avoid locking your joints aggressively at peak contraction.`,
        keyCues: ['Brace core before starting movement', '2-second controlled eccentric phase', 'Full active range of motion', 'Exhale during exertion'],
        commonMistakes: ['Using momentum/swinging weight', 'Flaring elbows excessively', 'Skipping warm-up sets'],
        source: 'local-fallback',
      });
    }

    const prompt = `Provide an expert biomechanical form analysis and cue guide for the exercise "${exercise}".
${concern ? `The user reports this specific issue/feeling: "${concern}".` : 'The user wants standard master-level form cues and error corrections.'}

Provide your answer in clear sections:
1. Master Execution Step-by-Step
2. 3 Golden Cues
3. Critical Mistakes to Avoid
4. Progression / Safety Tweak`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an Olympic strength and conditioning coach specializing in injury prevention and biomechanics.',
        temperature: 0.6,
      },
    });

    return res.json({
      exercise,
      analysis: response.text || 'Focus on controlled tempo and maintaining stability.',
      source: 'gemini',
    });
  } catch (error: any) {
    console.error('Error in form check:', error);
    return res.status(500).json({
      exercise: req.body?.exercise || 'Exercise',
      analysis: 'Maintain a stable base of support, engage your lats and core, and never sacrifice form for heavier weights.',
      source: 'fallback',
    });
  }
});

// AI Daily Motivational Boost & Recovery Endpoint
app.get('/api/coach/daily-boost', async (req: Request, res: Response) => {
  try {
    if (!aiClient) {
      return res.json({
        quote: "Discipline is choosing between what you want now and what you want most.",
        author: "Abraham Lincoln",
        focusTip: "Today, focus on mind-muscle connection. Don't just move the weight; make the target muscle work.",
        recoveryTip: "Get 7-8 hours of quality sleep tonight. Muscle protein synthesis happens during rest!",
        source: 'local-fallback',
      });
    }

    const prompt = `Generate a high-impact daily motivational workout booster in JSON with these keys:
- quote: powerful fitness/discipline quote
- author: author or speaker
- focusTip: 1 tactical tip for today's workout
- recoveryTip: 1 recovery or hydration tip for tonight`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are a sports psychologist and fitness coach inspiring athletes.',
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ ...parsed, source: 'gemini' });
  } catch (error: any) {
    console.error('Error fetching daily boost:', error);
    return res.json({
      quote: "The only bad workout is the one that didn't happen.",
      author: "Fitness Pro",
      focusTip: "Focus on controlled breathing and full range of motion.",
      recoveryTip: "Drink at least 500ml of water with electrolytes post-workout.",
      source: 'fallback',
    });
  }
});

// Mount Vite or serve static
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Workout Planner Pro server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
