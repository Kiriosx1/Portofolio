import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';

export default function IntroScreen({ onEnter, theme = 'dark' }) {
  const [isExploding, setIsExploding] = useState(false);

  const handleEnter = () => {
    setIsExploding(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEnter();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed inset-0 z-[200] flex items-center justify-center ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}
      >
        {/* Explosion particles */}
        {isExploding && (
          <>
            {[...Array(60)].map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const distance = 150 + Math.random() * 300;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: x,
                    y: y,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: theme === 'dark' 
                      ? `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${200 + Math.random() * 55}, 1)`
                      : `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 100}, 1)`,
                  }}
                />
              );
            })}
          </>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isExploding ? 0 : 1, scale: isExploding ? 1.2 : 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10"
        >
          {/* Logo */}
          <motion.div
            animate={{ 
              rotate: isExploding ? 360 : 0,
              scale: isExploding ? 0 : 1,
            }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex justify-center"
          >
            <div className={`p-6 rounded-2xl border-2 ${
              theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'
            }`}>
              <Terminal className={`w-16 h-16 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-6xl md:text-8xl font-mono font-black mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            KARCHON
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`text-xl md:text-2xl font-mono mb-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Cybersecurity Hub & Learning Platform
          </motion.p>

          {/* Enter Button */}
          <motion.button
            onClick={handleEnter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group px-8 py-4 rounded-xl font-mono text-lg font-bold transition-all duration-300 flex items-center gap-3 mx-auto ${
              theme === 'dark'
                ? 'bg-white text-black hover:bg-gray-200 border-2 border-white'
                : 'bg-black text-white hover:bg-gray-800 border-2 border-black'
            }`}
          >
            <span>PRESS ENTER</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className={`text-sm font-mono mt-6 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            Press [ENTER] or click the button
          </motion.p>
        </motion.div>

        {/* Scanline effect */}
        {!isExploding && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${
                theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'
              } 50%, transparent 100%)`,
              height: '100px',
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}