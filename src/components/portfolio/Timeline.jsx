import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Terminal, Network, Award } from 'lucide-react';

const timelineData = [
  {
    year: '2024',
    title: 'TryHackMe Journey',
    description: 'Completed numerous rooms and learning paths, mastering penetration testing fundamentals.',
    icon: Shield,
    color: 'from-gray-600 to-gray-400',
  },
  {
    year: '2024',
    title: 'Hack The Box',
    description: 'Conquered challenging machines, sharpening real-world hacking skills and methodology.',
    icon: Terminal,
    color: 'from-gray-500 to-gray-300',
  },
  {
    year: '2024',
    title: 'Networking Fundamentals',
    description: 'Deep dive into FTP, DNS, TCP/IP protocols. Understanding the backbone of digital communication.',
    icon: Network,
    color: 'from-gray-400 to-gray-200',
  },
  {
    year: 'Ongoing',
    title: 'Continuous Learning',
    description: 'Every day is a new challenge. Improving C++, Python, and security skills constantly.',
    icon: Award,
    color: 'from-gray-300 to-gray-100',
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Central line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-gray-500/50 via-gray-600/30 to-transparent" />

      <div className="space-y-12">
        {timelineData.map((item, index) => {
          const Icon = item.icon;
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content */}
              <div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  {/* Card glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative bg-gradient-to-br from-[#0d0d18] to-[#15152a] p-5 rounded-lg border border-gray-700 group-hover:border-gray-500 transition-all duration-300">
                    <span className="inline-block px-2 py-0.5 text-xs font-mono bg-gray-800/50 text-gray-300 rounded mb-2">
                      {item.year}
                    </span>
                    <h4 className="font-mono text-gray-100 font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </div>

              {/* Center icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`
                    w-12 h-12 rounded-full 
                    bg-gradient-to-br ${item.color}
                    flex items-center justify-center
                    border-4 border-[#0a0a0f]
                    shadow-lg shadow-gray-500/30
                  `}
                >
                  <Icon className="w-5 h-5 text-[#0a0a0f]" />
                </motion.div>
              </div>

              {/* Empty space for opposite side */}
              <div className="w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}