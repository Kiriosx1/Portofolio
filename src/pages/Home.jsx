import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Mail, Github, Shield } from 'lucide-react';

import SkeletonBackground from '@/components/portfolio/SkeletonBackground';
import CircuitBackground from '@/components/portfolio/CircuitBackground';
import GlitchText from '@/components/portfolio/GlitchText';
import TypewriterText from '@/components/portfolio/TypewriterText';
import SkillCard from '@/components/portfolio/SkillCard';
import ProjectCard from '@/components/portfolio/ProjectCard';
import Timeline from '@/components/portfolio/Timeline';
import ScrollReveal from '@/components/portfolio/ScrollReveal';
import GlitchButton from '@/components/portfolio/GlitchButton';
import SectionTitle from '@/components/portfolio/SectionTitle';
import BackToTop from '@/components/portfolio/BackToTop';
import HiddenTerminal from '@/components/portfolio/HiddenTerminal';
import KonamiCode from '@/components/portfolio/KonamiCode';
import TerminalHeader from '@/components/portfolio/TerminalHeader';
import FlagSubmission from '@/components/portfolio/FlagSubmission';
import ThemeToggle from '@/components/portfolio/ThemeToggle';
import AccessibilityPanel from '@/components/portfolio/AccessibilityPanel';
import InteractiveTutorials from '@/components/portfolio/InteractiveTutorials';
import DiscordSection from '@/components/portfolio/DiscordSection';
import CTFGuide from '@/components/portfolio/CTFGuide';
import IntroScreen from '@/components/portfolio/IntroScreen';
import CertificateGenerator from '@/components/portfolio/CertificateGenerator';
import LearningHub from '@/components/portfolio/LearningHub';
import { useFlagTracker } from '@/components/portfolio/FlagTracker';
import { Toaster } from 'sonner';

const skills = [
  { name: 'C++', category: 'CORE LANGUAGE' },
  { name: 'Python', category: 'SCRIPTING' },
  { name: 'Bash', category: 'SHELL' },
  { name: 'Linux', category: 'OPERATING SYSTEM' },
  { name: 'Kali Linux', category: 'PENETRATION TESTING' },
  { name: 'Nmap', category: 'RECON TOOL' },
];

const projects = [
  {
    name: 'C++ Multi-Tool',
    filename: 'multitool.cpp',
    description: 'A comprehensive C++ utility suite featuring network diagnostics, system monitoring, and automation tools. Built with efficiency and security in mind.',
    tech: ['C++', 'Networking', 'CLI'],
    github: 'https://github.com/Kiriosx1',
  },
  {
    name: 'Security Tools',
    filename: 'security.py',
    description: 'Collection of penetration testing and security research tools including port scanners, network analyzers, and vulnerability assessment scripts.',
    tech: ['Python', 'Security', 'Automation'],
    github: 'https://github.com/Kiriosx1',
  },
  {
    name: 'Linux Scripts',
    filename: 'scripts.sh',
    description: 'Bash automation scripts for system administration, security hardening, and network configuration on Linux distributions.',
    tech: ['Bash', 'Linux', 'Automation'],
    github: 'https://github.com/Kiriosx1',
  },
];

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [tutorialsCompleted, setTutorialsCompleted] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState('normal');
  const [reducedMotion, setReducedMotion] = useState(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const { foundFlags, captureFlag } = useFlagTracker();

  // Font size map
  const fontSizeClass = fontSize === 'large' ? 'text-lg' : fontSize === 'xlarge' ? 'text-xl' : 'text-base';

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // CTF Challenge: Console Cowboy
  useEffect(() => {
    const warningStyle = 'color: #a855f7; font-size: 16px; font-weight: bold;';
    console.log('%c⚠️ SECURITY WARNING: Unauthorized access detected.', warningStyle);
    console.log('%cTrace Analysis:', 'color: #9333ea; font-weight: bold;', {
      timestamp: new Date().toISOString(),
      trace_id: 'flag{console_log_detective}',
      severity: 'HIGH',
      source: 'security_monitor.js'
    });
  }, []);

  // CTF Challenge: Cookie Monster
  useEffect(() => {
    localStorage.setItem('debug_mode', 'ZmxhZ3tjb29raWVzX2FyZV90YXN0eX0=');
  }, []);

  return (
    <>
      {/* Intro Screen */}
      {showIntro && <IntroScreen onEnter={() => setShowIntro(false)} theme={theme} />}

      <div className={`min-h-screen overflow-x-hidden ${fontSizeClass} ${theme === 'dark' ? 'bg-[#0a0a0f] text-white' : 'bg-white text-gray-900'}`}>
        {/* Accessibility skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-sm focus:rounded focus:border focus:border-gray-400"
      >
        Skip to main content
      </a>

      {/* CTF Components */}
      <TerminalHeader theme={theme} />
      <AccessibilityPanel
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
      />
      <HiddenTerminal onFlagFound={captureFlag} theme={theme} />
      <KonamiCode onFlagFound={captureFlag} />
      <Toaster richColors position="top-right" />
      
      {/* Circuit Background */}
      {!reducedMotion && <CircuitBackground theme={theme} />}

      {/* Mouse follower glow */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="fixed w-96 h-96 rounded-full pointer-events-none z-0 opacity-20"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(128, 128, 128, 0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(100, 100, 100, 0.2) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
          }}
        />
      )}

      {/* Hero Section */}
      {/* TODO: Fix production deployment issue - flag{hidden_in_plain_sight} */}
      <motion.section
        id="main-content"
        style={reducedMotion ? {} : { opacity: heroOpacity, scale: heroScale }}
        aria-label="Hero section"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16"
      >
        {/* Decorative grid */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[linear-gradient(rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(128,128,128,0.03)_1px,transparent_1px)]' : 'bg-[linear-gradient(rgba(200,200,200,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.3)_1px,transparent_1px)]'} bg-[size:50px_50px]`} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          {/* Terminal-style header */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>SYSTEM ONLINE</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-mono font-black mb-4 leading-tight">
            <span className={`text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-gray-200 via-white to-gray-300' : 'bg-gradient-to-r from-gray-800 via-black to-gray-700'}`}>
              KYROS
            </span>
            <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}> // </span>
            <br className="sm:hidden" />
            <GlitchText text="CYBERSECURITY" className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} delay={500} />
            <br />
            <GlitchText text="EXPLORER & DEVELOPER" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} delay={800} />
          </h1>

          {/* Subtitle */}
          <div className={`text-lg md:text-xl font-mono mb-8 h-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TypewriterText 
              text="Securing the Digital Frontier | C++ & Python" 
              delay={2500}
              speed={40}
            />
          </div>

          {/* Scroll down hint */}
          <div className={`mt-12 text-sm font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            Scroll to explore ↓
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4" role="list" aria-label="Social links">
            <motion.a
              href="https://github.com/Kiriosx1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reducedMotion ? {} : { scale: 1.2, y: -2 }}
              aria-label="GitHub profile - @Kiriosx1 (opens in new tab)"
              role="listitem"
              className={`p-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 focus:ring-gray-400' : 'bg-gray-100 border-gray-300 text-gray-700 hover:text-black hover:border-gray-500 focus:ring-gray-600'}`}
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="mailto:kyros.businesss@gmail.com"
              whileHover={reducedMotion ? {} : { scale: 1.2, y: -2 }}
              aria-label="Send email to kyros.businesss@gmail.com"
              role="listitem"
              className={`p-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 focus:ring-gray-400' : 'bg-gray-100 border-gray-300 text-gray-700 hover:text-black hover:border-gray-500 focus:ring-gray-600'}`}
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        {!reducedMotion && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className={`w-6 h-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
          </motion.div>
        )}
      </motion.section>

      {/* About Section */}
      <section aria-label="About me" className="relative py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="ABOUT_ME" subtitle="// Who is behind the terminal" theme={theme} />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative">
                {/* Terminal window */}
                <div className={`rounded-xl border overflow-hidden ${theme === 'dark' ? 'bg-[#0d0d18] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <div className={`flex items-center gap-2 px-4 py-3 border-b ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className={`text-xs font-mono ml-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>kyros@kali:~</span>
                  </div>
                  <div className="p-6 font-mono text-sm">
                    <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>$ cat about.txt</p>
                    <div className={`mt-4 space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <p><span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>name:</span> Kyros (kiriosx1)</p>
                      <p><span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>role:</span> Cybersecurity Researcher</p>
                      <p><span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>stack:</span> C++ | Python | Bash</p>
                      <p><span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>os:</span> Linux (Kali/Arch)</p>
                    </div>
                    <p className="mt-4 text-green-400">$ _</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="space-y-6">
                <div className={`relative p-6 rounded-xl border ${theme === 'dark' ? 'bg-gradient-to-br from-[#0d0d18] to-[#15152a] border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
                  <div className={`absolute top-0 right-0 w-20 h-20 rounded-bl-full ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-200/50'}`} />
                  <h3 className={`font-mono text-xl font-bold mb-3 relative z-10 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{'<'}</span>
                    Who Am I?
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{'/>'}</span>
                  </h3>
                  <p className={`leading-relaxed relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    I'm a passionate cybersecurity enthusiast and developer specializing in C++, Python, and Linux systems. 
                    I believe in the hacker mindset: understanding systems deeply to protect them better.
                  </p>
                  <p className={`text-xs font-mono mt-3 relative z-10 select-none ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {'// synt{fbpvny_ratvarrevat}'}
                  </p>
                </div>

                <div className={`relative p-6 rounded-xl border ${theme === 'dark' ? 'bg-gradient-to-br from-[#0d0d18] to-[#15152a] border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
                  <div className={`absolute bottom-0 left-0 w-20 h-20 rounded-tr-full ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-200/50'}`} />
                  <h3 className={`font-mono text-xl font-bold mb-3 relative z-10 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{'<'}</span>
                    My Mission
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{'/>'}</span>
                  </h3>
                  <p className={`leading-relaxed relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Exploring the digital frontier through penetration testing, secure coding, and low-level programming. 
                    Every vulnerability discovered is a lesson learned, every exploit understood makes the digital world safer.
                  </p>
                </div>

                <div className={`relative p-6 rounded-xl border ${theme === 'dark' ? 'bg-gradient-to-br from-[#0d0d18] to-[#15152a] border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
                  <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-full ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-200/50'}`} />
                  <h3 className={`font-mono text-xl font-bold mb-3 relative z-10 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{'<'}</span>
                    Always Learning
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>{'/>'}</span>
                  </h3>
                  <p className={`leading-relaxed relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    From TryHackMe challenges to Hack The Box machines, I'm constantly sharpening my skills. 
                    The journey of a security researcher never ends—there's always a new technique to master.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section aria-label="Skills" className="relative py-24 px-4 md:px-8">
        {/* Background accent */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${theme === 'dark' ? 'via-gray-900/30' : 'via-gray-200/30'}`} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle title="SKILL_LOADOUT" subtitle="// Equipped for digital warfare" theme={theme} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" aria-label="Projects" className="relative py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="PROJECT_LAB" subtitle="// Compiled and deployed" theme={theme} />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="relative py-24 px-4 md:px-8">
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent ${theme === 'dark' ? 'via-gray-900/30' : 'via-gray-200/30'}`} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionTitle title="EXPERIENCE" subtitle="// The journey so far" theme={theme} />
          <Timeline />
        </div>
      </section>

      {/* Contact Section */}
      <section aria-label="Contact" className="relative py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="GET_IN_TOUCH" subtitle="// Let's build something secure together" theme={theme} />
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-gray-700/10 to-gray-900/10 rounded-xl blur-lg" />
                  <div className={`relative rounded-xl border p-6 ${theme === 'dark' ? 'bg-[#0d0d18] border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h3 className={`font-mono text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                      <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>$</span> Contact Methods
                    </h3>
                    
                    <div className="space-y-4">
                      <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
                        <Github className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                        <div>
                          <p className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>GitHub</p>
                          <a href="https://github.com/Kiriosx1" target="_blank" rel="noopener noreferrer" className={`text-sm transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                            @Kiriosx1
                          </a>
                        </div>
                      </div>
                      
                      <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}>
                        <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} aria-hidden="true" />
                        <div>
                          <p className={`text-xs font-mono ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>Email</p>
                          <a
                            href="mailto:kyros.businesss@gmail.com"
                            className={`text-sm transition-colors focus:outline-none focus:underline ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
                          >
                            kyros.businesss@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`relative rounded-xl border p-6 ${theme === 'dark' ? 'bg-[#0d0d18] border-gray-700' : 'bg-white border-gray-200'}`}>
                  <h3 className={`font-mono text-lg font-bold mb-3 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}>$</span> Availability
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Currently available for projects</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA Card */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative h-full">
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-700/10 to-gray-900/10 rounded-2xl blur-xl" />
                
                <div className={`relative rounded-xl border p-8 h-full flex flex-col justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-[#0d0d18] to-[#15152a] border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}>
                  <h2 className={`text-3xl md:text-4xl font-mono font-bold mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                    <GlitchText text="LET'S CONNECT" delay={300} />
                  </h2>
                  <p className={`mb-8 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Have a project in mind or want to discuss cybersecurity? I'm always open to new challenges, collaborations, and learning opportunities.
                  </p>
                  
                  <div className="space-y-4">
                    <a href="mailto:kyros.businesss@gmail.com" className="block">
                      <GlitchButton aria-label="Send email to kyros.businesss@gmail.com" className="w-full justify-center">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                        SEND EMAIL
                      </GlitchButton>
                    </a>
                    
                    <motion.a
                      href="https://github.com/Kiriosx1"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm border rounded-lg transition-all duration-300 w-full ${theme === 'dark' ? 'text-gray-300 border-gray-600 hover:bg-gray-800' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                    >
                      <Github className="w-4 h-4" />
                      VIEW GITHUB
                    </motion.a>
                  </div>

                  {/* Decorative code */}
                  <div className={`mt-8 font-mono text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
                    <p>{'// kyros.connect()'}</p>
                    <p>{'// status: AVAILABLE'}</p>
                    <p>{'// response_time: FAST'}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTF Flag Submission */}
      <section className="relative py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <FlagSubmission />
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                alert(`User-agent: *\nDisallow: /admin\nDisallow: /secret\n\n# flag{robots_keep_secrets}\n\n# If you're reading this, you're doing great!`);
              }}
              className={`text-xs font-mono transition-colors ${theme === 'dark' ? 'text-gray-700 hover:text-gray-500' : 'text-gray-300 hover:text-gray-500'}`}
            >
              robots.txt
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Tutorials */}
      <InteractiveTutorials 
        theme={theme} 
        reducedMotion={reducedMotion}
        onTutorialComplete={(count) => setTutorialsCompleted(count)}
      />

      {/* Learning Hub */}
      <LearningHub theme={theme} />

      {/* Discord Section */}
      <DiscordSection theme={theme} />

      {/* CTF Guide */}
      <CTFGuide theme={theme} />

      {/* Footer */}
      <footer role="contentinfo" className={`relative py-8 px-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`font-mono text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            © 2026 KYROS // All rights reserved
          </p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:kyros.businesss@gmail.com"
              className={`font-mono text-xs transition-colors focus:outline-none focus:underline ${theme === 'dark' ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
            >
              kyros.businesss@gmail.com
            </a>
            <p className={`font-mono text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>
              {'<'} Built with passion {'/>'}
            </p>
          </div>
        </div>
      </footer>

      {/* Certificate Generator - Shows when all 5 labs completed */}
      <CertificateGenerator 
        isComplete={tutorialsCompleted === 5}
        flagsFound={foundFlags.length}
        tutorialsCompleted={tutorialsCompleted}
        theme={theme}
      />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Custom styles for animations */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
      `}</style>
      </div>
    </>
  );
}