import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function GlitchText({ text, className = '', delay = 0, reducedMotion = false }) {
  const [displayText, setDisplayText] = useState(reducedMotion ? text : '');
  const [isGlitching, setIsGlitching] = useState(false);
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    if (reducedMotion) {
      setDisplayText(text);
      return;
    }
    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text.split('').map((char, index) => {
            if (index < iteration) return char;
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }).join('')
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, [reducedMotion]);

  return (
    <span className={`relative inline-block ${className}`} aria-label={text}>
      <span className="relative z-10">{displayText || text}</span>
      {isGlitching && !reducedMotion && (
        <>
          <span
            className="absolute inset-0 text-gray-400 z-0"
            aria-hidden="true"
            style={{ transform: 'translate(-2px, -1px)', clipPath: 'inset(10% 0 60% 0)' }}
          >{text}</span>
          <span
            className="absolute inset-0 text-gray-600 z-0"
            aria-hidden="true"
            style={{ transform: 'translate(2px, 1px)', clipPath: 'inset(60% 0 10% 0)' }}
          >{text}</span>
        </>
      )}
    </span>
  );
}