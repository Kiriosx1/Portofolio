import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Terminal } from 'lucide-react';

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  const handleHover = (hovering) => {
    setIsHovered(hovering);
    if (hovering) {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="relative group"
    >
      {/* Glow effect */}
      <div className={`
        absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl
        opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm
      `} />
      
      <div className={`
        relative overflow-hidden rounded-xl
        bg-gradient-to-br from-[#0d0d18] via-[#12121f] to-[#0d0d18]
        border border-gray-700 group-hover:border-gray-400
        transition-all duration-500
        ${glitchActive ? 'translate-x-[2px]' : ''}
      `}>
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border-b border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-gray-400 ml-2" />
          <span className="text-xs font-mono text-gray-400">{project.filename}</span>
        </div>

        <div className="p-5">
          {/* Project title with glitch */}
          <h3 className={`
            font-mono text-lg font-bold text-gray-100 mb-2
            ${glitchActive ? 'text-white' : ''}
            transition-colors duration-100
          `}>
            <span className="text-gray-500">./</span>{project.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs font-mono bg-gray-800/50 text-gray-300 rounded border border-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono
                bg-gray-700/30 hover:bg-gray-700/50 text-gray-300
                rounded border border-gray-600 hover:border-gray-500
                transition-all duration-300"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono
                bg-gray-600/30 hover:bg-gray-600/50 text-gray-200
                rounded border border-gray-500 hover:border-gray-400
                transition-all duration-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View
            </motion.a>
          </div>
        </div>

        {/* Scan line animation */}
        <div className={`
          absolute inset-0 pointer-events-none
          bg-gradient-to-b from-transparent via-gray-500/5 to-transparent
          ${isHovered ? 'animate-scan' : 'opacity-0'}
        `} />
      </div>
    </motion.div>
  );
}