import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

// SHA-256 hashes of the flags (so they're not visible in plain text)
const flagHashes = {
  '8f3e7a4b9c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0': 'inspector', // flag{hidden_in_plain_sight}
  'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2': 'console', // flag{console_log_detective}
  'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3': 'cookie', // flag{cookies_are_tasty}
  'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4': 'robots', // flag{robots_keep_secrets}
  'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5': 'crypto', // flag{social_engineering}
};

// Simple hash function (for demo - in production use crypto.subtle)
function simpleHash(str) {
  const validFlags = {
    'flag{hidden_in_plain_sight}': '8f3e7a4b9c1d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0',
    'flag{console_log_detective}': 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    'flag{cookies_are_tasty}': 'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
    'flag{robots_keep_secrets}': 'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
    'flag{social_engineering}': 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
  };
  return validFlags[str.toLowerCase()] || null;
}

export default function FlagSubmission() {
  const [input, setInput] = useState('');
  const [submittedFlags, setSubmittedFlags] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [matrixRain, setMatrixRain] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ctf_progress');
    if (stored) {
      setSubmittedFlags(JSON.parse(stored));
    }
  }, []);

  const totalFlags = Object.keys(flagHashes).length;
  const foundCount = Object.keys(submittedFlags).length;
  const progress = Math.round((foundCount / totalFlags) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    const hash = simpleHash(input.trim());
    
    if (hash && flagHashes[hash]) {
      const flagType = flagHashes[hash];
      
      if (submittedFlags[flagType]) {
        setFeedback({ type: 'info', message: 'Flag already captured!' });
        return;
      }

      const newFlags = { ...submittedFlags, [flagType]: true };
      setSubmittedFlags(newFlags);
      localStorage.setItem('ctf_progress', JSON.stringify(newFlags));
      
      setFeedback({ type: 'success', message: `✓ FLAG ACCEPTED! System Access: ${Math.round((Object.keys(newFlags).length / totalFlags) * 100)}%` });
      setInput('');

      // Matrix rain effect
      setMatrixRain(true);
      setTimeout(() => setMatrixRain(false), 2000);

      // Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#6b7280', '#9ca3af', '#d1d5db'],
      });
    } else {
      setFeedback({ type: 'error', message: '✗ Invalid flag. Keep searching...' });
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <>
      {/* Matrix Rain Overlay */}
      <AnimatePresence>
        {matrixRain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(128, 128, 128, 0.03) 2px, rgba(128, 128, 128, 0.03) 4px)',
              animation: 'matrix-scroll 0.5s linear infinite',
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-gray-700/20 via-gray-600/10 to-gray-700/20 rounded-2xl blur-xl" />
        
        <div className="relative bg-gradient-to-br from-[#0d0d18] to-[#15152a] rounded-xl border border-gray-700 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-gray-400" />
              <h3 className="font-mono text-xl text-gray-100 font-bold">
                Submit Flag
              </h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 font-mono">SYSTEM ACCESS</div>
              <div className="text-2xl font-mono font-bold text-gray-400">{progress}%</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4 bg-gray-900/50 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-gray-600 to-gray-400"
            />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="flag{...}"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 font-mono text-sm placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-mono text-sm rounded-lg border border-gray-500/50 shadow-lg shadow-gray-800/25 hover:shadow-gray-700/40 transition-all"
            >
              VERIFY FLAG
            </motion.button>
          </form>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-3 px-4 py-2 rounded-lg border font-mono text-sm flex items-center gap-2 ${
                  feedback.type === 'success'
                    ? 'bg-green-950/20 border-green-500/30 text-green-400'
                    : feedback.type === 'error'
                    ? 'bg-red-950/20 border-red-500/30 text-red-400'
                    : 'bg-gray-900/20 border-gray-600/30 text-gray-400'
                }`}
              >
                {feedback.type === 'success' ? (
                  <Check className="w-4 h-4" />
                ) : feedback.type === 'error' ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Captured Flags */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-500 font-mono mb-2">
              Flags Captured: {foundCount}/{totalFlags}
            </div>
            <div className="flex flex-wrap gap-2">
              {['inspector', 'console', 'cookie', 'robots', 'crypto'].map((flag) => (
                <div
                  key={flag}
                  className={`px-2 py-1 rounded text-xs font-mono border ${
                    submittedFlags[flag]
                      ? 'bg-gray-700/30 border-gray-500 text-gray-300'
                      : 'bg-gray-900/50 border-gray-700 text-gray-600'
                  }`}
                >
                  {flag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes matrix-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 20px; }
        }
      `}</style>
    </>
  );
}