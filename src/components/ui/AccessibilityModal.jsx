import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Type, Volume2, Sparkles, Sun, ShieldCheck } from 'lucide-react';

export default function AccessibilityModal({
  isOpen,
  onClose,
  isHighContrast,
  setIsHighContrast,
  isSimpleMode,
  setIsSimpleMode,
  textScale,
  setTextScale,
  isAudioGuide,
  setIsAudioGuide
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border-cyan-400/40 space-y-6 shadow-2xl relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Inclusion & Accessibility Settings</h2>
                <p className="text-xs text-gray-400">Tailor your Centenova experience for maximum comfort</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass-pill text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Options List */}
          <div className="space-y-4">
            
            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span>Ultra High-Contrast View</span>
                </div>
                <div className="text-xs text-gray-400">Pure black backdrop and maximum contrast colors</div>
              </div>
              <button
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  isHighContrast ? 'bg-yellow-400' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  isHighContrast ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Microcopy Plain Language */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Simple Microcopy Mode</span>
                </div>
                <div className="text-xs text-gray-400">Replaces complex tech terms with plain everyday words</div>
              </div>
              <button
                onClick={() => setIsSimpleMode(!isSimpleMode)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  isSimpleMode ? 'bg-cyan-400' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  isSimpleMode ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Audio Voice Cues */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-pink-400" />
                  <span>Neural Voice Assistant Prompts</span>
                </div>
                <div className="text-xs text-gray-400">Spoken auditory guidance at transfer gates</div>
              </div>
              <button
                onClick={() => setIsAudioGuide(!isAudioGuide)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                  isAudioGuide ? 'bg-pink-500' : 'bg-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                  isAudioGuide ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Text Scaling */}
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Type className="w-4 h-4 text-emerald-400" />
                  <span>Text & Target Size</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{textScale}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['100%', '125%', '150%'].map((scale) => (
                  <button
                    key={scale}
                    onClick={() => setTextScale(scale)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                      textScale === scale 
                        ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300' 
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    {scale}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm shadow-lg hover:scale-[1.02] transition-all"
            >
              Apply Accessibility Settings
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
