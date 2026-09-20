import React from 'react';
import { Zap, ShieldCheck, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-cyan-500/30 glass-panel bg-slate-950/90 backdrop-blur-2xl py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        {/* Status Ticker */}
        <div className="bg-slate-900/90 p-4 rounded-3xl border-2 border-cyan-500/30 flex flex-wrap items-center justify-between gap-4 font-mono text-sm text-gray-200 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-black text-base">GRID 100% OPERATIONAL</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 font-bold text-gray-300">
            <span className="flex items-center gap-1.5"><Cpu className="w-4 h-4 text-cyan-400" /> SYNC 99.98%</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-pink-400" /> SHIELD SECURE</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-emerald-400" /> ZERO EMISSION</span>
          </div>
        </div>

        {/* Minimal Footer Brand */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pt-4">
          <div className="flex items-center gap-3">
            <Zap className="w-7 h-7 text-cyan-400 animate-pulse" />
            <span className="font-black text-2xl text-white font-mono tracking-widest">CENTENOVA</span>
          </div>

          <div className="text-xs font-mono text-gray-400">
            © 2100 CENTENOVA METROPOLIS • QUANTUM MOBILITY NETWORK
          </div>
        </div>

      </div>
    </footer>
  );
}
