import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, Send, Sparkles, Mic, CheckCircle2 } from 'lucide-react';

export default function AIAssistantModal({ isOpen, onClose, onSelectPresetRoute }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Greetings citizen! I am Centenova AI, your 2100 Smart City Neural Assistant. How may I optimize your transit today?'
    }
  ]);
  const [isListening, setIsListening] = useState(false);

  if (!isOpen) return null;

  const presets = [
    { title: '⚡ Fastest route across city', action: 'fastest' },
    { title: '♿ Low-sensory & accessible option', action: 'access' },
    { title: '🌱 Zero-emission Sky Pod path', action: 'eco' }
  ];

  const handleSend = (textToSend) => {
    const inputText = textToSend || query;
    if (!inputText.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMsgs);
    setQuery('');

    // Generate intelligent AI response
    setTimeout(() => {
      let aiText = "I have computed the optimal sub-atmospheric route matrix based on real-time atmospheric laser conditions. Transport doors are synced to your neural profile.";
      if (inputText.toLowerCase().includes('fast') || inputText.toLowerCase().includes('quick')) {
        aiText = "Recommending Sky Pod AP-902 -> Hyper-Train HT-01. Total estimated time is 4m 12s with 99.8% AI confidence score.";
      } else if (inputText.toLowerCase().includes('access') || inputText.toLowerCase().includes('wheelchair')) {
        aiText = "Recommending Smart Road Cyber-Pod SR-44. Zero-step level entry ramp with voice guidance activated at Gate 3.";
      }
      setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
    }, 700);
  };

  const handleVoiceSim = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend("Find fastest route to Neo-Shibuya Hyper-Hub");
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg glass-panel p-6 rounded-3xl border-pink-500/40 space-y-4 shadow-2xl relative flex flex-col h-[520px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/30 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Centenova Neural AI Assistant</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                    ONLINE
                  </span>
                </h2>
                <p className="text-xs text-gray-400">Predictive Routing & Instant Rebooking Engine</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl glass-pill text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.title)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-400/50 text-gray-300 hover:text-white whitespace-nowrap transition-all"
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Messages Chat Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-2xl bg-slate-950/70 border border-white/5 scrollbar-thin">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium'
                      : 'bg-slate-900 border border-cyan-500/20 text-gray-200 font-sans'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Voice & Input Controls */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleVoiceSim}
              className={`p-3 rounded-xl border transition-all ${
                isListening 
                  ? 'bg-red-500/30 border-red-400 text-red-300 animate-pulse' 
                  : 'glass-pill text-pink-400 hover:border-pink-400/50'
              }`}
              title="Speak Neural Prompt"
            >
              <Mic className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder={isListening ? "Listening to neural voice prompt..." : "Ask Centenova AI anything about city travel..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-900/90 border border-cyan-500/30 text-white text-xs rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400 font-sans"
            />

            <button
              onClick={() => handleSend()}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold shadow-lg hover:scale-105 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
