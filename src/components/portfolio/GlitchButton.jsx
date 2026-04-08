import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GlitchButton({ children, className = '', onClick, 'aria-label': ariaLabel }) {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 200);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleHover}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        relative overflow-hidden px-6 py-3 font-mono text-sm
        bg-gradient-to-r from-gray-700 to-gray-600
        text-white rounded-lg
        border border-gray-500/50
        shadow-lg shadow-gray-800/25
        transition-all duration-300
        hover:shadow-gray-700/40 hover:border-gray-400/70
        ${className}
      `}
    >
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 flex items-center justify-center bg-gray-400 text-black"
            style={{ 
              clipPath: 'inset(20% 0 50% 0)',
              transform: 'translate(-4px, 0)'
            }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 flex items-center justify-center bg-gray-800"
            style={{ 
              clipPath: 'inset(50% 0 20% 0)',
              transform: 'translate(4px, 0)'
            }}
          >
            {children}
          </span>
        </>
      )}
      
      {/* Main content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.button>
  );
}