import React from 'react';
import { motion } from 'framer-motion';

export default function GlassFlow({ 
  children, 
  className = "", 
  blur = "backdrop-blur-2xl",
  glowColor = "cyan" 
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-cyan-500/30 glass-panel shadow-2xl ${className}`}>
      
      {/* Animated Flowing Liquid Glass Gradient Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Primary Liquid Wave 1 */}
        <motion.div
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-10%', '15%', '-10%'],
            rotate: [0, 180, 360],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] opacity-40 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 243, 255, 0.35) 0%, rgba(157, 78, 221, 0.25) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Secondary Liquid Wave 2 */}
        <motion.div
          animate={{
            x: ['20%', '-20%', '20%'],
            y: ['15%', '-15%', '15%'],
            rotate: [360, 180, 0],
            scale: [1.2, 0.9, 1.2],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] opacity-35 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 0, 127, 0.35) 0%, rgba(0, 255, 136, 0.2) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Dynamic Glass Refraction Shimmer Overlay */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(115deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 80%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Specular Frosted Glass Edge Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-pink-400/60 to-transparent" />
      </div>

      {/* Frosted Glass Content Wrapper */}
      <div className={`relative z-10 ${blur} bg-slate-950/40 p-6 sm:p-10`}>
        {children}
      </div>

    </div>
  );
}
