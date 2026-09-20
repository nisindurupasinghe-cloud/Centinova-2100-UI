import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, 
  Eye, 
  Map
} from 'lucide-react';
import { LIVE_VEHICLES } from '../../data/transitData';
import LiveTracking3DCanvas from '../3d/LiveTracking3DCanvas';

export default function LiveMapScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState(LIVE_VEHICLES[0]);
  const [viewMode, setViewMode] = useState('3d');

  return (
    <div className="space-y-8 pb-16">
      
      {/* SCREEN 3 HERO: Real-Time Map-Based Visual Tracking & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>SCREEN 3: LIVE MAP & REAL-TIME TRACKING</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white font-mono mt-2 tracking-tight">
            REAL-TIME VISUAL TRACKER
          </h1>
        </div>

        {/* 3D vs 2D Map View Mode Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border-2 border-cyan-500/30">
          {[
            { id: '3d', label: '3D MAP', icon: Eye },
            { id: 'top', label: '2D GRID', icon: Map }
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = viewMode === mode.id;
            return (
              <motion.button
                key={mode.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-mono font-black transition-all ${
                  isActive
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{mode.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Real-time Map Interface Container */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border-2 border-cyan-500/40 shadow-2xl">
        
        {/* Map-Based Interface (3D Canvas) */}
        <div className="h-[75vh] min-h-[600px] w-full">
          <LiveTracking3DCanvas
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
            viewMode={viewMode}
          />
        </div>

        {/* Clear Telemetry HUD (Communicates tracking status clearly to any user) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6 z-20 max-w-sm pointer-events-none"
        >
          <div className="bg-slate-950/95 backdrop-blur-2xl p-6 rounded-3xl border-2 border-cyan-400/50 pointer-events-auto space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-cyan-400 font-black text-lg">{selectedVehicle.id}</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-400/40 animate-pulse">
                LIVE: {selectedVehicle.status}
              </span>
            </div>

            <h3 className="text-3xl font-black text-white font-mono">{selectedVehicle.name}</h3>

            <div className="space-y-1 font-mono text-sm text-gray-300">
              <div>📍 CURRENT: <span className="text-white font-bold">{selectedVehicle.currentLocation}</span></div>
              <div>🏁 NEXT STOP: <span className="text-cyan-300 font-bold">{selectedVehicle.nextStop}</span></div>
            </div>

            {/* Giant Speed & Altitude */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono">
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-cyan-400/30 text-center">
                <div className="text-xs text-gray-400 font-bold">SPEED</div>
                <div className="text-2xl font-black text-cyan-400 mt-1">{selectedVehicle.speed}</div>
              </div>
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-pink-400/30 text-center">
                <div className="text-xs text-gray-400 font-bold">ALTITUDE</div>
                <div className="text-2xl font-black text-pink-400 mt-1">{selectedVehicle.altitude}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Easy Vehicle Selector Carousel */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-center">
          <div className="bg-slate-950/95 backdrop-blur-2xl p-3 rounded-3xl border-2 border-cyan-400/40 flex items-center gap-3 overflow-x-auto max-w-full shadow-2xl scrollbar-none">
            {LIVE_VEHICLES.map((v) => {
              const isSelected = selectedVehicle.id === v.id;
              return (
                <motion.button
                  key={v.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedVehicle(v)}
                  className={`px-5 py-3 rounded-2xl text-sm font-mono font-black whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
                    isSelected
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300 shadow-xl shadow-cyan-500/30'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>TRACK {v.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
