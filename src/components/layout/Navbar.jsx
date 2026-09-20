import React, { useState } from 'react';
import { 
  Navigation, 
  MapPin, 
  Layers, 
  Menu, 
  X, 
  Zap 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ 
  currentTab, 
  setCurrentTab 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '1. HOME SCREEN', icon: Navigation },
    { id: 'details', label: '2. ROUTE DETAILS', icon: Layers },
    { id: 'map', label: '3. LIVE MAP TRACKING', icon: MapPin }
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b-2 border-cyan-500/30 backdrop-blur-2xl">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Logo & Brand */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentTab('home')} 
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-purple-600 to-pink-500 p-0.5 shadow-xl shadow-cyan-500/40">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Zap className="w-7 h-7 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="font-black text-2xl sm:text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 font-mono">
                Cente<span className="text-cyan-400">nova</span>
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation Tabs for the 3 Core Screens */}
          <nav className="hidden md:flex items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border-2 border-cyan-500/30">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black font-mono tracking-wider transition-all ${
                    isActive 
                      ? 'text-cyan-300 bg-cyan-500/30 border border-cyan-400 shadow-lg shadow-cyan-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 rounded-2xl glass-pill text-cyan-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t-2 border-cyan-500/30 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 space-y-4"
          >
            <div className="grid grid-cols-1 gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-4 rounded-2xl border-2 text-base font-black font-mono transition-all ${
                      isActive 
                        ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300' 
                        : 'bg-white/5 border-white/10 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-cyan-400" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
