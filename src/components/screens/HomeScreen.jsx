import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Sparkles, 
  Zap, 
  Bus,
  TrainTrack,
  Plane,
  Car
} from 'lucide-react';
import { TRANSPORT_MODES, CITY_NODES, SAMPLE_ROUTES } from '../../data/transitData';
import CityGlobe3DCanvas from '../3d/CityGlobe3DCanvas';
import GlassFlow from '../ui/GlassFlow';
import Landscape from '../ui/Landscape';

export default function HomeScreen({ onSelectRoute }) {
  const [origin, setOrigin] = useState('node-1');
  const [destination, setDestination] = useState('node-2');
  const [selectedVehicleType, setSelectedVehicleType] = useState('smart_road');
  const [selectedGlobeNode, setSelectedGlobeNode] = useState(CITY_NODES[0]);

  const activeModeObj = TRANSPORT_MODES.find(m => m.modelType === selectedVehicleType) || TRANSPORT_MODES.find(m => m.modelType === 'smart_road');

  const modeIcons = {
    air_pod: { icon: Plane, label: 'AIR' },
    hyper_train: { icon: TrainTrack, label: 'TRAIN' },
    quantum_bus: { icon: Bus, label: 'BUS' },
    smart_road: { icon: Car, label: 'ROAD' }
  };

  return (
    <div className="space-y-10 pb-16">
      
      {/* HERO SECTION WITH GLASS FLOW */}
      <GlassFlow className="p-2 sm:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-6 z-10"
          >
            {/* Title */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white font-mono leading-none">
              CENTE<span className="shimmer-text">NOVA</span>
            </h1>

            {/* Mode Pills */}
            <div className="grid grid-cols-4 gap-2">
              {TRANSPORT_MODES.map((mode) => {
                const conf = modeIcons[mode.modelType] || { icon: Zap, label: mode.category };
                const IconComp = conf.icon;
                const isSelected = selectedVehicleType === mode.modelType;
                return (
                  <motion.button
                    key={mode.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedVehicleType(mode.modelType)}
                    className={`py-3 px-2 rounded-2xl border-2 flex flex-col items-center justify-center font-mono font-black text-xs transition-all ${
                      isSelected 
                        ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/30' 
                        : 'bg-slate-900/80 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <IconComp className="w-5 h-5 mb-1 text-cyan-400" />
                    <span>{conf.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Inputs Box */}
            <div className="glass-panel p-6 rounded-3xl border-cyan-400/40 space-y-4 shadow-2xl bg-slate-950/70">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* From */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-cyan-400 font-black flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-cyan-400" /> FROM
                  </label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-slate-900/90 border-2 border-cyan-500/40 text-white rounded-2xl p-3.5 text-base font-bold focus:outline-none focus:border-cyan-400 transition-all font-mono"
                  >
                    {CITY_NODES.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* To */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-pink-400 font-black flex items-center gap-1">
                    <Navigation className="w-4 h-4 text-pink-400" /> TO
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-900/90 border-2 border-pink-500/40 text-white rounded-2xl p-3.5 text-base font-bold focus:outline-none focus:border-pink-400 transition-all font-mono"
                  >
                    {CITY_NODES.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectRoute(SAMPLE_ROUTES[0])}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-600 to-pink-500 text-white font-black text-xl shadow-xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transition-all flex items-center justify-center gap-2 uppercase font-mono tracking-wider"
              >
                <Search className="w-6 h-6" />
                <span>SEARCH</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column: 3D Hologlobe */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-5 h-[380px] sm:h-[440px] relative rounded-3xl overflow-hidden glass-panel border-2 border-cyan-500/40 shadow-2xl animate-float-slow"
          >
            <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-cyan-400/40 text-xs text-cyan-300 font-mono font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>3D MATRIX</span>
            </div>
            
            <CityGlobe3DCanvas 
              activeNode={selectedGlobeNode} 
              onSelectNode={setSelectedGlobeNode} 
            />

            <div className="absolute bottom-4 left-4 right-4 z-10 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-2xl border border-cyan-400/30 text-center font-mono font-bold text-cyan-400 text-xs">
              {selectedGlobeNode.name}
            </div>
          </motion.div>

        </div>
      </GlassFlow>

      {/* 3D SCROLLING LANDSCAPE HORIZON SECTION */}
      <section className="space-y-4">
        <h2 className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tighter flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" />
          <span>CYBER HORIZON</span>
        </h2>

        <Landscape speed={1.2} color="#00f3ff" className="h-[220px]">
          <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
            <span className="font-mono text-xs font-black text-cyan-300 px-4 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 uppercase tracking-widest">
              ENDLESS 3D SCROLLING CORRIDOR
            </span>
            <div className="text-2xl sm:text-4xl font-black text-white font-mono tracking-wider">
              REAL-TIME TERRAIN CORRIDOR
            </div>
          </div>
        </Landscape>
      </section>

      {/* 3D FLEET */}
      <section className="space-y-4">
        <h2 className="text-4xl sm:text-6xl font-black text-white font-mono tracking-tighter flex items-center gap-3">
          <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
          <span>FLEET</span>
        </h2>

        <GlassFlow>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div 
              animate={{ 
                scale: [0.94, 1.06, 0.94],
                y: [0, -5, 1, -4, 0],
                x: [-12, 12, -12]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              whileHover={{ scale: 1.08 }}
              className="lg:col-span-6 h-[280px] sm:h-[350px] relative rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/40 group cursor-pointer"
            >
              {/* High-Speed Passing Road Streaks (Speed Lines) */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: ['120%', '-120%'],
                      opacity: [0, 0.9, 0],
                    }}
                    transition={{
                      duration: 1.2 + i * 0.3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.25,
                    }}
                    className="absolute h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#00f3ff]"
                    style={{
                      top: `${20 + i * 20}%`,
                      width: '180px',
                    }}
                  />
                ))}
              </div>

              {/* Pulsing Underglow Aura */}
              <motion.div 
                animate={{
                  opacity: [0.5, 0.9, 0.5],
                  scale: [1, 1.15, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-purple-600/30 to-pink-500/30 pointer-events-none"
              />

              {/* Animated Car Image (Driving Forward Zoom) */}
              <motion.img 
                src="/car.jpg" 
                alt="Smart Road Cyber-Pod Car" 
                animate={{ 
                  scale: [1, 1.05, 1],
                  filter: ['brightness(1)', 'brightness(1.15)', 'brightness(1)']
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />

              {/* Scanning Holographic Laser Light Line */}
              <motion.div 
                animate={{ y: ['-100%', '350%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f3ff] pointer-events-none z-10 opacity-75"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 right-3 text-[10px] text-cyan-300 font-mono bg-black/80 px-3.5 py-1 rounded-full border border-cyan-400/50 backdrop-blur-md font-black tracking-wider flex items-center gap-1.5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>DRIVING FORWARD 220 KM/H</span>
              </div>
            </motion.div>

            <div className="lg:col-span-6 space-y-6">
              <div>
                <span 
                  className="text-xs font-mono font-black px-4 py-1.5 rounded-full border-2 uppercase tracking-widest"
                  style={{ borderColor: activeModeObj.color, color: activeModeObj.color, backgroundColor: `${activeModeObj.color}20` }}
                >
                  {activeModeObj.category}
                </span>
                <h3 className="text-4xl sm:text-5xl font-black text-white font-mono mt-2">{activeModeObj.name}</h3>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-cyan-500/30 text-center">
                  <div className="text-[10px] text-cyan-400 font-mono font-black">SPEED</div>
                  <div className="text-xl sm:text-3xl font-black text-white font-mono mt-1">{activeModeObj.speed}</div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-pink-500/30 text-center">
                  <div className="text-[10px] text-pink-400 font-mono font-black">CAPACITY</div>
                  <div className="text-xl sm:text-3xl font-black text-white font-mono mt-1">{activeModeObj.capacity}</div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border-2 border-emerald-500/30 text-center">
                  <div className="text-[10px] text-emerald-400 font-mono font-black">POWER</div>
                  <div className="text-sm sm:text-lg font-black text-emerald-300 font-mono mt-1.5">{activeModeObj.energy}</div>
                </div>
              </div>
            </div>
          </div>
        </GlassFlow>
      </section>

    </div>
  );
}
