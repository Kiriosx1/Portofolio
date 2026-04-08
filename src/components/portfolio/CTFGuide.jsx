import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Eye, Terminal, Database, FileText, Gamepad2, ChevronDown, Lock } from 'lucide-react';
import SectionTitle from './SectionTitle';

const flags = [
  {
    id: 'inspector',
    icon: Eye,
    name: 'Hidden in Plain Sight',
    flag: 'flag{hidden_in_plain_sight}',
    difficulty: 'EASY',
    hint: 'Open DevTools → Elements tab (F12). Look through the HTML source code carefully. Developers often leave debug comments in the markup.',
    steps: [
      'Press F12 to open DevTools',
      'Go to the "Elements" tab',
      'Look through the HTML — search for "flag" with Ctrl+F',
      'Find the hidden comment in the hero section',
    ],
  },
  {
    id: 'console',
    icon: Terminal,
    name: 'Console Log Detective',
    flag: 'flag{console_log_detective}',
    difficulty: 'EASY',
    hint: 'Open DevTools → Console tab. Developers sometimes accidentally log sensitive data to the console. Reload the page with the console open.',
    steps: [
      'Press F12 to open DevTools',
      'Go to the "Console" tab',
      'Reload the page (Ctrl+R)',
      'Look at the security warning log — the trace_id field contains the flag',
    ],
  },
  {
    id: 'cookie',
    icon: Database,
    name: 'Cookie Monster',
    flag: 'flag{cookies_are_tasty}',
    difficulty: 'MEDIUM',
    hint: 'Check localStorage in DevTools → Application tab. The value is Base64 encoded. Decode it to find the flag.',
    steps: [
      'Press F12 → Application tab → Local Storage',
      'Find the "debug_mode" key',
      'Copy the Base64 encoded value',
      'Decode it: atob("ZmxhZ3...") in the Console, or use base64decode.org',
    ],
  },
  {
    id: 'robots',
    icon: FileText,
    name: 'Robots Keep Secrets',
    flag: 'flag{robots_keep_secrets}',
    difficulty: 'EASY',
    hint: 'Scroll to the CTF submission section at the bottom. There is a tiny "robots.txt" link. Click it.',
    steps: [
      'Scroll down to the Flag Submission section',
      'Look for the tiny "robots.txt" text below the submission form',
      'Click it — a popup will appear with the robots.txt content',
      'Read the content carefully',
    ],
  },
  {
    id: 'crypto',
    icon: Lock,
    name: 'Social Engineering',
    flag: 'flag{social_engineering}',
    difficulty: 'MEDIUM',
    hint: 'The About Me section contains a comment in ROT13 cipher. ROT13 shifts each letter by 13 positions. Decode: synt{fbpvny_ratvarrevat}',
    steps: [
      'Find the About Me section',
      'Look at the grayed-out comment text: "// synt{fbpvny_ratvarrevat}"',
      'Apply ROT13 cipher to decode it',
      'Use rot13.com or the Console: "synt{...}".replace(/[a-z]/gi, c => String.fromCharCode((c.charCodeAt(0) - (c < "a" ? 65 : 97) + 13) % 26 + (c < "a" ? 65 : 97)))',
    ],
  },
  {
    id: 'terminal',
    icon: Terminal,
    name: 'Terminal Master',
    flag: 'flag{linux_master_kyros}',
    difficulty: 'MEDIUM',
    hint: 'Press the "/" key on your keyboard to open the hidden terminal. Use Linux commands to navigate and find the flag.',
    steps: [
      'Press "/" on your keyboard — a terminal slides down from the top',
      'Type "help" to see available commands',
      'Type "ls" to list files',
      'Type "cat secret.txt" to read the secret file',
    ],
  },
  {
    id: 'konami',
    icon: Gamepad2,
    name: 'Retro Gamer',
    flag: 'flag{retro_gamer_mode}',
    difficulty: 'HARD',
    hint: 'Enter the legendary Konami Code using your keyboard: ↑ ↑ ↓ ↓ ← → ← → B A. A classic cheat code from the 80s.',
    steps: [
      'Make sure the page is focused (click anywhere)',
      'Type on keyboard: Up Up Down Down Left Right Left Right B A',
      'The screen will glitch — that\'s the flag being captured',
      'Check the toast notification for confirmation',
    ],
  },
];

const difficultyColors = {
  EASY: 'text-green-400 border-green-400/30 bg-green-400/10',
  MEDIUM: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  HARD: 'text-red-400 border-red-400/30 bg-red-400/10',
};

export default function CTFGuide({ theme = 'dark' }) {
  const [expanded, setExpanded] = useState(null);
  const dark = theme === 'dark';

  return (
    <section className="relative py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="FLAG_HUNTER_GUIDE"
          subtitle="// How to find all hidden flags on this site"
          theme={theme}
        />

        <div className={`mb-8 p-4 rounded-xl border font-mono text-sm ${dark ? 'bg-[#0d0d18] border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
          <p>$ cat guide.txt</p>
          <p className="mt-2">This site has <span className={`font-bold ${dark ? 'text-white' : 'text-black'}`}>{flags.length} hidden flags</span> for you to find. Each flag follows the format <span className={`${dark ? 'text-white' : 'text-black'}`}>flag{'{...}'}</span>. Submit them in the Flag Submission section below to track your progress. Click any challenge below to reveal the hint and step-by-step guide.</p>
        </div>

        <div className="space-y-3">
          {flags.map((f, i) => {
            const Icon = f.icon;
            const isOpen = expanded === f.id;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className={`rounded-xl border overflow-hidden ${dark ? 'bg-[#0d0d18] border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : f.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <Icon className={`w-4 h-4 ${dark ? 'text-gray-300' : 'text-gray-700'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-mono font-bold text-sm ${dark ? 'text-white' : 'text-black'}`}>{f.name}</span>
                      <span className={`text-xs font-mono px-2 py-0.5 rounded border ${difficultyColors[f.difficulty]}`}>
                        {f.difficulty}
                      </span>
                    </div>
                    <p className={`text-xs font-mono truncate ${dark ? 'text-gray-500' : 'text-gray-400'}`}>{f.flag}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${dark ? 'text-gray-500' : 'text-gray-400'} ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`overflow-hidden border-t ${dark ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                      <div className="p-5 space-y-4">
                        <div className={`p-3 rounded-lg border ${dark ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                          <p className={`font-mono text-xs mb-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>// HINT</p>
                          <p className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{f.hint}</p>
                        </div>
                        <div>
                          <p className={`font-mono text-xs mb-2 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>// STEPS</p>
                          <ol className="space-y-2">
                            {f.steps.map((step, si) => (
                              <li key={si} className={`flex items-start gap-3 text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className={`font-mono text-xs w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${dark ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>{si + 1}</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className={`mt-8 p-4 rounded-xl border text-center font-mono text-xs ${dark ? 'border-gray-700 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
          Found all flags? Share your score in the KARCHON Discord! #ctf-challenges
        </div>
      </div>
    </section>
  );
}