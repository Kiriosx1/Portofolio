import React from 'react';
import { motion } from 'framer-motion';
import GlitchText from './GlitchText';

export default function SectionTitle({ title, subtitle, align = 'center', theme = 'dark' }) {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${alignClasses[align]}`}
    >
      <div className="inline-block relative">
        {/* Decorative brackets */}
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-2xl opacity-50">
          {'<'}
        </span>
        <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-2xl opacity-50">
          {'/>'}
        </span>
        
        <h2 className="text-3xl md:text-4xl font-mono font-bold">
          <GlitchText text={title} className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`} />
        </h2>
      </div>
      
      {subtitle && (
        <p className={`mt-3 font-light tracking-wide ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
      
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-px bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-gray-500' : 'via-gray-400'} to-transparent mt-6 max-w-xs ${align === 'center' ? 'mx-auto' : ''}`}
      />
    </motion.div>
  );
}