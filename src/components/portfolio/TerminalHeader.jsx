import React from 'react';
import { motion } from 'framer-motion';

export default function TerminalHeader({ theme = 'dark' }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b ${theme === 'dark' ? 'bg-black/90 border-gray-800' : 'bg-white/90 border-gray-200'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69680ce434813b798485600f/70b26705e_Gemini_Generated_Image_9vj289vj289vj289.png"
            alt="KARCHON Logo"
            className="w-8 h-8 object-contain"
            style={{ 
              filter: theme === 'dark' ? 'brightness(1.1) contrast(1.1)' : 'brightness(0.9)',
              mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
            }}
          />
          
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <div className={`font-mono text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            kyros@kali:~$ <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>whoami</span>
          </div>
        </div>
        <div className={`font-mono text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
          Press / for terminal
        </div>
      </div>
    </motion.div>
  );
}