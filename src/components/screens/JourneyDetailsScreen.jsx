import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  RefreshCw, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  Compass,
  Bus,
  TrainTrack,
  Plane,
  Car
} from 'lucide-react';

export default function JourneyDetailsScreen({ 
  route, 
  onBack, 
  onTrackLive 
}) {
  const [currentRoute, setCurrentRoute] = useState(route);
  const [isDelaySimulated, setIsDelaySimulated] = useState(false);
  const [rebookSuccess, setRebookSuccess] = useState(false);

  const modeIcons = {
    air_pod: Plane,
    hyper_train: TrainTrack,
    quantum_bus: Bus,
    smart_road: Car
  };

  const handleSimulateDelay = () => {
    setIsDelaySimulated(true);
    setRebookSuccess(false);
  };

  const handleApplyRebooking = () => {
    const updated = {
      ...currentRoute,
      title: 'AI REROUTED: NO DELAY',
      totalTime: '3m 50s',
      legs: currentRoute.legs.map((leg, idx) => 
        idx === 0 ? {
          ...leg,
          status: '⚡ FAST-TRACK SYNCED',
          duration: '1m 20s'
        } : leg
      )
    };
    setCurrentRoute(updated);
    setIsDelaySimulated(false);
    setRebookSuccess(true);
    setTimeout(() => setRebookSuccess(false), 4000);
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="px-6 py-3 rounded-2xl glass-pill text-cyan-300 border-2 border-cyan-500/40 font-mono font-black text-sm flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>BACK TO SEARCH</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTrackLive}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-mono font-black text-base shadow-xl shadow-cyan-500/30 flex items-center gap-2"
        >
          <Compass className="w-5 h-5 animate-spin" />
          <span>TRACK ON LIVE MAP</span>
        </motion.button>
      </div>

      {/* SCREEN 2 HERO: Critical Information Hierarchy (Arrival Time, Delays, Route Title, Transfers) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-cyan-500/40 cyber-grid space-y-8 bg-slate-950/70"
      >
        <div className="space-y-2">
          <span className="text-xs font-mono font-black text-cyan-400 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 uppercase tracking-widest">
            SCREEN 2: JOURNEY & ROUTE DETAILS
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white font-mono mt-2 tracking-tight">
            {currentRoute.title}
          </h1>
        </div>

        {/* Critical Information Cards Grid (Immediately Visible Hierarchy) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* 1. Arrival Time */}
          <div className="bg-slate-900/90 p-6 rounded-3xl border-2 border-cyan-400/40 text-center shadow-xl">
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" /> ARRIVAL TIME
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono mt-2">
              {currentRoute.totalTime}
            </div>
            <div className="text-xs text-emerald-400 font-mono mt-1 font-bold">ESTIMATED ACCURACY 99.8%</div>
          </div>

          {/* 2. Delays Status */}
          <div className="bg-slate-900/90 p-6 rounded-3xl border-2 border-emerald-400/40 text-center shadow-xl">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center justify-center gap-1">
              <Zap className="w-4 h-4" /> DELAY STATUS
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono mt-2 text-emerald-300">
              {isDelaySimulated ? '⚠️ +2M TUBE DELAY' : 'ON TIME'}
            </div>
            <div className="text-xs text-gray-400 font-mono mt-1">REAL-TIME TRAFFIC MATRIX</div>
          </div>

          {/* 3. Transfer Information */}
          <div className="bg-slate-900/90 p-6 rounded-3xl border-2 border-pink-400/40 text-center shadow-xl">
            <div className="text-xs font-mono font-bold text-pink-400 uppercase flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4" /> TRANSFERS
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-2">
              {currentRoute.transfers === 0 ? 'DIRECT' : `${currentRoute.transfers} GATE SYNC`}
            </div>
            <div className="text-xs text-pink-300 font-mono mt-1 font-bold">SMOOTH LEVEL ACCESS</div>
          </div>

        </div>

        {/* Dynamic Real-time Delay Notification */}
        <AnimatePresence>
          {rebookSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 font-mono font-black text-xl flex items-center gap-3"
            >
              <CheckCircle2 className="w-7 h-7 text-emerald-400 animate-bounce" />
              <span>DELAY RESOLVED • ROUTE UPDATED</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delay Simulation Trigger */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSimulateDelay}
            className="px-6 py-3 rounded-2xl bg-amber-500/20 border-2 border-amber-400/50 text-amber-300 font-mono font-bold text-sm flex items-center gap-2"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>TEST TRAFFIC DELAY SIMULATOR</span>
          </motion.button>

          {isDelaySimulated && (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleApplyRebooking}
              className="px-8 py-3.5 rounded-2xl bg-pink-500 text-white font-mono font-black text-base shadow-xl shadow-pink-500/50 animate-pulse flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>APPLY AUTO-REROUTE</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Breakdown of Transport Modes & Transfer Gate Details */}
      <section className="space-y-6">
        <h2 className="text-3xl font-black text-white font-mono tracking-tight">
          TRANSPORT MODES & TRANSFERS
        </h2>

        <div className="grid grid-cols-1 gap-6">
          {currentRoute.legs.map((leg, idx) => {
            const IconComp = modeIcons[leg.modeId] || Zap;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-950/60 shadow-xl"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className="p-4 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400/40 text-cyan-300">
                    <IconComp className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">STEP 0{idx + 1} • {leg.modeName}</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">{leg.from} → {leg.to}</h3>
                    <p className="text-sm font-mono text-gray-400 mt-1">{leg.instruction}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-2xl font-black font-mono text-pink-400 bg-slate-900 px-6 py-3 rounded-2xl border border-pink-500/30">
                    {leg.duration}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
