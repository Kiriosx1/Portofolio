import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Sun, Moon, ZoomIn, ZoomOut, Wind, Eye } from 'lucide-react';

export default function AccessibilityPanel({ theme, setTheme, fontSize, setFontSize, reducedMotion, setReducedMotion }) {
  const [open, setOpen] = useState(false);
  const dark = theme === 'dark';

  const fontSizes = [
    { label: 'A', value: 'normal', title: 'Normal font size' },
    { label: 'A+', value: 'large', title: 'Large font size' },
    { label: 'A++', value: 'xlarge', title: 'Extra large font size' },
  ];

  return (
    <div className="fixed top-14 right-4 z-50 flex flex-col items-end gap-2">
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? 'Close accessibility panel' : 'Open accessibility panel'}
        aria-expanded={open}
        className={`p-2.5 rounded-full border backdrop-blur-sm shadow-lg transition-all ${
          dark ? 'bg-gray-900 border-gray-700 text-gray-300 hover:border-gray-500' : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
        }`}
      >
        <Settings className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            role="region"
            aria-label="Accessibility settings"
            className={`rounded-xl border p-4 shadow-xl w-52 ${
              dark ? 'bg-gray-900 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'
            }`}
          >
            <p className={`font-mono text-xs mb-3 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>// ACCESSIBILITY</p>

            {/* Theme */}
            <div className="mb-4">
              <p className={`text-xs font-mono mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Theme</p>
              <button
                onClick={() => setTheme(dark ? 'light' : 'dark')}
                aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-mono transition-all ${
                  dark ? 'bg-gray-800 border-gray-700 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                }`}
              >
                <span>{dark ? 'Dark Mode' : 'Light Mode'}</span>
                {dark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <p className={`text-xs font-mono mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Font Size</p>
              <div className="flex gap-1.5">
                {fontSizes.map((fs) => (
                  <button
                    key={fs.value}
                    onClick={() => setFontSize(fs.value)}
                    aria-label={fs.title}
                    aria-pressed={fontSize === fs.value}
                    className={`flex-1 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                      fontSize === fs.value
                        ? dark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                        : dark ? 'bg-gray-800 border-gray-700 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {fs.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reduce Motion */}
            <div>
              <p className={`text-xs font-mono mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Motion</p>
              <button
                onClick={() => setReducedMotion(!reducedMotion)}
                aria-label={reducedMotion ? 'Enable animations' : 'Reduce animations'}
                aria-pressed={reducedMotion}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-mono transition-all ${
                  reducedMotion
                    ? dark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                    : dark ? 'bg-gray-800 border-gray-700 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                }`}
              >
                <span>{reducedMotion ? 'Reduced' : 'Full Animations'}</span>
                <Wind className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}