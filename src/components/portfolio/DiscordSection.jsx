import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Shield, Terminal, Cpu, ExternalLink, Hash } from 'lucide-react';

const channels = [
  { name: 'general', desc: 'Community chat & announcements', icon: Hash },
  { name: 'ctf-challenges', desc: 'Active CTF writeups & hints', icon: Shield },
  { name: 'red-team', desc: 'Offensive security techniques', icon: Terminal },
  { name: 'blue-team', desc: 'Defense, SOC & incident response', icon: Shield },
  { name: 'architecture', desc: 'Low-level & computer architecture', icon: Cpu },
  { name: 'resources', desc: 'Tools, books, courses', icon: Hash },
];

const DISCORD_INVITE = 'https://discord.gg/MvVNJHjvSG';

export default function DiscordSection({ theme = 'dark' }) {
  const [hovered, setHovered] = useState(false);
  const dark = theme === 'dark';

  return (
    <section className="relative py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Main card */}
        <div className={`relative rounded-2xl border overflow-hidden ${dark ? 'bg-gradient-to-br from-[#0d0d18] to-[#111118] border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
          
          {/* Top bar */}
          <div className={`flex items-center gap-3 px-6 py-4 border-b ${dark ? 'bg-gray-900/60 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className={`font-mono text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>karchon-discord://server</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className={`text-xs font-mono ${dark ? 'text-green-400' : 'text-green-600'}`}>LIVE</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: info */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className={`w-8 h-8 ${dark ? 'text-white' : 'text-black'}`} />
                  <div>
                    <h2 className={`font-mono text-2xl font-black ${dark ? 'text-white' : 'text-black'}`}>KARCHON</h2>
                    <p className={`font-mono text-xs ${dark ? 'text-gray-500' : 'text-gray-500'}`}>Cybersecurity Community</p>
                  </div>
                </div>

                <p className={`text-sm leading-relaxed mb-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  A growing community for cybersecurity learners and practitioners. 
                  CTF challenges, red & blue team discussions, computer architecture deep-dives, 
                  and everything in between. All skill levels welcome.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {['CTF', 'Red Team', 'Blue Team', 'Architecture', 'Networking', 'Linux'].map((tag) => (
                    <span key={tag} className={`px-2 py-1 text-xs font-mono rounded border ${dark ? 'bg-gray-800/50 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-mono font-bold text-base border-2 transition-all duration-300 ${
                  dark
                    ? 'bg-white text-black border-white hover:bg-gray-100'
                    : 'bg-black text-white border-black hover:bg-gray-900'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                JOIN KARCHON DISCORD
                <ExternalLink className={`w-4 h-4 transition-transform duration-300 ${hovered ? 'translate-x-1 -translate-y-1' : ''}`} />
              </motion.a>

              <p className={`font-mono text-xs mt-3 text-center ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                discord.gg/MvVNJHjvSG · Free forever · All levels
              </p>
            </div>

            {/* Right: channels */}
            <div className={`p-6 border-l ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
              <p className={`font-mono text-xs mb-4 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>// SERVER CHANNELS</p>
              <div className="space-y-2">
                {channels.map((ch, i) => {
                  const Icon = ch.icon;
                  return (
                    <motion.div
                      key={ch.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${dark ? 'border-gray-800 hover:border-gray-600 hover:bg-gray-800/30' : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      <span className={`font-mono text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>#</span>
                      <div>
                        <p className={`font-mono text-sm font-medium ${dark ? 'text-gray-200' : 'text-gray-800'}`}>{ch.name}</p>
                        <p className={`text-xs ${dark ? 'text-gray-600' : 'text-gray-400'}`}>{ch.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className={`mt-4 p-3 rounded-lg border font-mono text-xs ${dark ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" />
                  <span>Community growing · invite your friends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}