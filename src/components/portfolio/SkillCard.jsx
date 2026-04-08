import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SkillCard({ skill, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const iconMap = {
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Bash': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg',
    'Linux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    'Kali Linux': 'https://www.kali.org/images/kali-dragon-icon.svg',
    'Nmap': 'https://nmap.org/images/nmap-logo-256x256.png',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className={`
        relative overflow-hidden rounded-lg border
        bg-gradient-to-br from-[#0d0d15] to-[#1a1a2e]
        p-5 transition-all duration-300
        ${isHovered ? 'border-gray-400 shadow-lg shadow-gray-500/20 scale-105' : 'border-gray-700'}
      `}>
        {/* Scan line effect */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/5 to-transparent
            transition-transform duration-1000
            ${isHovered ? 'translate-y-full' : '-translate-y-full'}
          `}
        />
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gray-500/50" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gray-500/50" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gray-500/50" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gray-500/50" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={iconMap[skill.name]} 
              alt={skill.name}
              className="w-10 h-10 object-contain"
              style={{ filter: isHovered ? 'drop-shadow(0 0 8px rgba(200, 200, 200, 0.6))' : 'none' }}
            />
            <div>
              <h3 className="font-mono text-gray-100 font-semibold text-base">{skill.name}</h3>
              <span className="text-xs text-gray-400 font-mono">{skill.category}</span>
            </div>
          </div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            <CheckCircle className={`w-6 h-6 transition-colors duration-300 ${isHovered ? 'text-gray-300' : 'text-gray-600'}`} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}