import React, { useState, useEffect, useRef } from 'react';
import { useFitness } from '../context/FitnessContext';
import {
  sendCoachMessage,
  checkExerciseForm,
  fetchDailyBoost,
  ChatMessage,
} from '../services/aiCoachService';
import { WEEKLY_WORKOUT_PLANS } from '../data/workoutPlanData';
import { sound } from '../utils/soundEffects';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  Flame,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  RefreshCw,
  Zap,
} from 'lucide-react';

export const AiCoachPage: React.FC = () => {
  const { profile, streak, addXP } = useFitness();
  const [activeTab, setActiveTab] = useState<'chat' | 'formCheck' | 'boost'>('chat');

  // --- CHAT STATE ---
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'coach',
      text: `Hello ${profile.name}! I am Coach Titan, your dedicated AI Fitness Coach & Sports Nutritionist. I know your current goal is **${profile.fitnessGoal}** at an **${profile.level}** level with **${profile.equipment}**. How can I help optimize your training, form, recovery, or meals today?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // --- FORM CHECK STATE ---
  const allExerciseNames: string[] = Object.values(WEEKLY_WORKOUT_PLANS).flatMap((plan) =>
    plan.exercises.map((e) => e.name)
  );
  const [selectedExercise, setSelectedExercise] = useState<string>(allExerciseNames[0] || 'Push Ups');
  const [formConcern, setFormConcern] = useState<string>('');
  const [isAnalyzingForm, setIsAnalyzingForm] = useState<boolean>(false);
  const [formAnalysisResult, setFormAnalysisResult] = useState<string | null>(null);

  // --- DAILY BOOST STATE ---
  const [dailyBoost, setDailyBoost] = useState<{
    quote: string;
    author: string;
    focusTip: string;
    recoveryTip: string;
  } | null>(null);
  const [isLoadingBoost, setIsLoadingBoost] = useState<boolean>(false);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    handleLoadBoost();
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);
    sound.playTick();

    try {
      const reply = await sendCoachMessage(text, profile, streak);
      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, coachMsg]);
      sound.playSuccess();
      addXP(20, 'Consulted AI Coach');
    } catch {
      // Fallback
    } finally {
      setIsSending(false);
    }
  };

  const handleAnalyzeForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzingForm(true);
    sound.playTick();
    try {
      const res = await checkExerciseForm(selectedExercise, formConcern);
      setFormAnalysisResult(res.analysis);
      sound.playSuccess();
      addXP(30, 'Analyzed Exercise Form');
    } finally {
      setIsAnalyzingForm(false);
    }
  };

  const handleLoadBoost = async () => {
    setIsLoadingBoost(true);
    try {
      const data = await fetchDailyBoost();
      setDailyBoost(data);
    } finally {
      setIsLoadingBoost(false);
    }
  };

  const promptSuggestions = [
    'How do I break through a bench press plateau?',
    'What should I eat 1 hour before an intense leg day?',
    'How to alleviate lower back stiffness after deadlifts?',
    'What are the best vegetarian high-protein sources?',
    'Can I build muscle with just dumbbells at home?',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight flex items-center gap-2.5">
            <Bot className="w-8 h-8 text-cyan-400" />
            AI Fitness Coach & Kinesiologist
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Powered by Google Gemini 3.8 Flash • Biomechanics, recovery, and meal guidance
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'chat'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Coach Chat
          </button>
          <button
            onClick={() => setActiveTab('formCheck')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'formCheck'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Form Analyzer
          </button>
          <button
            onClick={() => setActiveTab('boost')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'boost'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily Mindset
          </button>
        </div>
      </div>

      {/* TAB 1: COACH CHAT */}
      {activeTab === 'chat' && (
        <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden flex flex-col h-[650px] shadow-2xl">
          {/* Coach Identity Banner */}
          <div className="bg-slate-900/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Coach Titan
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[11px] text-slate-400">
                  Targeting: {profile.fitnessGoal} ({profile.level})
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-full">
              Gemini 3.8 Flash
            </span>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {msg.sender === 'coach' && (
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-xs mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div
                    className={`text-[10px] mt-1.5 text-right font-mono ${
                      msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-xs">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-slate-900/90 rounded-2xl p-3.5 border border-slate-800 rounded-tl-none text-xs text-slate-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Coach Titan is analyzing biomechanics and nutrition protocols...
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="p-3 bg-slate-900/50 border-t border-slate-800/80 overflow-x-auto scrollbar-none flex gap-2">
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isSending}
                className="py-1.5 px-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700/80 whitespace-nowrap transition-all cursor-pointer hover:text-cyan-300 hover:border-cyan-500/40"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything about exercises, form tweaks, recipes, or plateaus..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="p-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: BIOMECHANICAL FORM ANALYZER */}
      {activeTab === 'formCheck' && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              Exercise Biomechanical Form Diagnostics
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select any movement and specify joint aches, imbalance, or sticking points to receive elite coaching cues.
            </p>
          </div>

          <form onSubmit={handleAnalyzeForm} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Select Exercise
              </label>
              <select
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 font-semibold"
              >
                {allExerciseNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                What issue or discomfort are you experiencing? (Optional)
              </label>
              <textarea
                value={formConcern}
                onChange={(e) => setFormConcern(e.target.value)}
                placeholder="e.g. My wrists hurt when benching, or I feel my lower back rounding at the bottom of the squat..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzingForm}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              {isAnalyzingForm ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Biomechanical Vector...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Diagnose Exercise Form (+30 XP)</span>
                </>
              )}
            </button>
          </form>

          {/* Form Result */}
          {formAnalysisResult && (
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-emerald-500/30 space-y-3 animate-in fade-in">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Coach Analysis for {selectedExercise}
              </h3>
              <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                {formAnalysisResult}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DAILY MINDSET & RECOVERY BOOST */}
      {activeTab === 'boost' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Daily Mindset Protocol</h3>
              </div>
              <button
                onClick={handleLoadBoost}
                disabled={isLoadingBoost}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingBoost ? 'animate-spin text-amber-400' : ''}`} />
              </button>
            </div>

            {dailyBoost && (
              <div className="space-y-6">
                <blockquote className="border-l-4 border-amber-400 pl-4 py-1 italic text-lg sm:text-xl text-slate-100 font-medium">
                  "{dailyBoost.quote}"
                  <footer className="text-xs font-mono font-bold text-amber-400 mt-2 not-italic">
                    — {dailyBoost.author}
                  </footer>
                </blockquote>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 block mb-1 uppercase tracking-wider">
                      🎯 Workout Focus Directive
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {dailyBoost.focusTip}
                    </p>
                  </div>

                  <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 block mb-1 uppercase tracking-wider">
                      🌙 Sleep & Recovery Directive
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {dailyBoost.recoveryTip}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
