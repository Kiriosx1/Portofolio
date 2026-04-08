import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function HiddenTerminal({ onFlagFound, theme = 'dark' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Kyros Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '/') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    switch (trimmedCmd) {
      case 'help':
        output = `Available commands:
  whoami    - Display current user
  ls        - List directory contents
  cat       - Read file contents
  clear     - Clear terminal
  help      - Show this help message`;
        break;
      case 'whoami':
        output = 'kyros@kali:~$ root';
        break;
      case 'ls':
        output = 'secret.txt  portfolio.js  skills.dat  projects.db';
        break;
      case 'cat secret.txt':
        output = '🎉 FLAG CAPTURED: flag{linux_master_kyros}';
        onFlagFound('terminal');
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#9333ea', '#a855f7', '#c084fc'],
        });
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory([...history, { type: 'input', text: `$ ${cmd}` }, { type: 'output', text: output }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed top-0 left-0 right-0 z-50 border-b-2 shadow-2xl ${theme === 'dark' ? 'bg-black border-gray-600 shadow-gray-600/30' : 'bg-white border-gray-400 shadow-gray-400/30'}`}
          style={{ maxHeight: '50vh' }}
          >
          <div className="h-full overflow-auto p-4 font-mono text-sm">
            <div className={`flex items-center justify-between mb-2 pb-2 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Kyros Terminal - Press / to close</span>
              <button
                onClick={() => setIsOpen(false)}
                className={`text-xs ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}
              >
                [X]
              </button>
            </div>

            {history.map((entry, i) => (
              <div key={i} className={entry.type === 'input' ? (theme === 'dark' ? 'text-gray-300' : 'text-gray-700') : (theme === 'dark' ? 'text-gray-100' : 'text-gray-800')}>
                {entry.text.split('\n').map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`flex-1 bg-transparent outline-none border-none ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}
                autoComplete="off"
                spellCheck="false"
              />
              <span className={`animate-pulse ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>█</span>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}