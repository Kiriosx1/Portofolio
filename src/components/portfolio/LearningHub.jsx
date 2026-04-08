import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Shield, Terminal, Wifi, Lock, Code, FileSearch, AlertTriangle, Zap, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import SectionTitle from './SectionTitle';
import ScrollReveal from './ScrollReveal';

const learningCategories = [
  {
    id: 'getting-started',
    icon: Book,
    title: 'Getting Started',
    color: 'from-blue-600 to-blue-400',
    resources: [
      {
        name: 'What is Cybersecurity?',
        description: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks aim to access, change, or destroy sensitive information, extort money, or interrupt normal business processes.',
        topics: ['CIA Triad (Confidentiality, Integrity, Availability)', 'Defense in Depth', 'Risk Management', 'Security Policies']
      },
      {
        name: 'Essential Skills',
        description: 'Master these fundamental skills: Linux command line, networking basics (TCP/IP, OSI model), programming (Python, Bash), web technologies (HTTP, DNS), and understanding of common vulnerabilities.',
        topics: ['Linux Administration', 'Network Protocols', 'Scripting', 'Web Security']
      },
      {
        name: 'Learning Path',
        description: 'Start with fundamentals → Learn a programming language → Study networking → Practice on CTF platforms → Get certifications → Build projects → Join communities',
        topics: ['Self-study resources', 'Online labs', 'Certification roadmap', 'Hands-on practice']
      }
    ]
  },
  {
    id: 'pentesting',
    icon: Terminal,
    title: 'Penetration Testing',
    color: 'from-red-600 to-red-400',
    resources: [
      {
        name: 'Pentesting Methodology',
        description: 'Professional pentesting follows a structured approach: 1) Reconnaissance - Gather information about the target. 2) Scanning - Identify live hosts, open ports, and services. 3) Gaining Access - Exploit vulnerabilities. 4) Maintaining Access - Install backdoors. 5) Covering Tracks - Remove evidence.',
        topics: ['OSINT', 'Enumeration', 'Exploitation', 'Post-exploitation', 'Reporting']
      },
      {
        name: 'Essential Tools',
        description: 'Nmap (network scanning), Burp Suite (web app testing), Metasploit (exploitation framework), Wireshark (packet analysis), Hashcat/John (password cracking), SQLMap (SQL injection), Gobuster (directory busting)',
        topics: ['Reconnaissance tools', 'Vulnerability scanners', 'Exploitation frameworks', 'Post-exploitation tools']
      },
      {
        name: 'Common Vulnerabilities',
        description: 'OWASP Top 10: SQL Injection, XSS, Broken Authentication, Security Misconfiguration, XXE, Broken Access Control, CSRF, Insecure Deserialization, Using Components with Known Vulnerabilities, Insufficient Logging',
        topics: ['Web vulnerabilities', 'Network exploits', 'Privilege escalation', 'Buffer overflows']
      }
    ]
  },
  {
    id: 'networking',
    icon: Wifi,
    title: 'Network Security',
    color: 'from-purple-600 to-purple-400',
    resources: [
      {
        name: 'Network Fundamentals',
        description: 'Understand OSI/TCP IP models, how packets travel through networks, protocols (HTTP, FTP, SSH, DNS, SMTP), ports and services, subnetting, and routing. This foundation is critical for pentesting.',
        topics: ['OSI Model', 'TCP/IP Stack', 'DNS & DHCP', 'VLANs & Routing']
      },
      {
        name: 'Network Attacks',
        description: 'Common attacks include: Man-in-the-Middle (MITM), ARP Spoofing, DNS Poisoning, DDoS, Port Scanning, Packet Sniffing, Session Hijacking, and SSL Stripping. Learn how they work and how to defend against them.',
        topics: ['MITM attacks', 'Sniffing & Spoofing', 'DoS/DDoS', 'Wireless attacks']
      },
      {
        name: 'Wireless Security',
        description: 'WEP is broken (never use), WPA2 is vulnerable to KRACK, WPA3 is current standard. Practice with Aircrack-ng, capture handshakes, crack WPA passwords, perform deauth attacks, and understand rogue APs.',
        topics: ['WiFi encryption', 'Aircrack-ng', 'Evil Twin', 'Handshake capture']
      }
    ]
  },
  {
    id: 'webapp',
    icon: Code,
    title: 'Web Application Security',
    color: 'from-green-600 to-green-400',
    resources: [
      {
        name: 'OWASP Top 10',
        description: 'The most critical web application security risks: Injection flaws, Broken Authentication, Sensitive Data Exposure, XML External Entities (XXE), Broken Access Control, Security Misconfiguration, Cross-Site Scripting (XSS), Insecure Deserialization, Using Components with Known Vulnerabilities, Insufficient Logging & Monitoring.',
        topics: ['Injection attacks', 'Auth bypass', 'XSS', 'CSRF']
      },
      {
        name: 'SQL Injection',
        description: "Exploiting unsanitized user input in SQL queries. Types: Classic (UNION-based), Blind (boolean/time-based), Error-based. Tools: SQLMap. Prevention: Prepared statements, input validation, least privilege DB access.",
        topics: ['UNION injection', 'Blind SQLi', 'SQLMap automation', 'Prevention techniques']
      },
      {
        name: 'XSS & CSRF',
        description: 'XSS: Injecting malicious scripts into web pages. Types: Stored, Reflected, DOM-based. CSRF: Forcing users to execute unwanted actions. Prevention: Input sanitization, CSP headers, CSRF tokens, HttpOnly cookies.',
        topics: ['Stored XSS', 'Reflected XSS', 'CSRF tokens', 'Cookie security']
      }
    ]
  },
  {
    id: 'cryptography',
    icon: Lock,
    title: 'Cryptography',
    color: 'from-yellow-600 to-yellow-400',
    resources: [
      {
        name: 'Encryption Basics',
        description: 'Symmetric (AES, DES, 3DES) - same key for encryption/decryption. Asymmetric (RSA, ECC) - public/private key pairs. Hashing (MD5, SHA, bcrypt) - one-way functions for integrity. Each has specific use cases.',
        topics: ['Symmetric encryption', 'Asymmetric encryption', 'Hash functions', 'Digital signatures']
      },
      {
        name: 'Common Attacks',
        description: 'Brute force (trying all combinations), Dictionary attacks (wordlists), Rainbow tables (pre-computed hashes), Man-in-the-Middle (intercepting communications), Padding Oracle, Downgrade attacks, Side-channel attacks.',
        topics: ['Password cracking', 'Rainbow tables', 'SSL/TLS attacks', 'Cryptanalysis']
      },
      {
        name: 'Best Practices',
        description: 'Use strong algorithms (AES-256, SHA-256+, RSA 2048+), never roll your own crypto, implement perfect forward secrecy, use salt for password hashing, keep keys secure, rotate credentials regularly.',
        topics: ['Key management', 'Secure protocols', 'Salt & pepper', 'Certificate pinning']
      }
    ]
  },
  {
    id: 'malware',
    icon: AlertTriangle,
    title: 'Malware Analysis',
    color: 'from-orange-600 to-orange-400',
    resources: [
      {
        name: 'Types of Malware',
        description: 'Virus (self-replicating), Worm (spreads without user action), Trojan (disguised as legitimate software), Ransomware (encrypts files for ransom), Spyware (steals information), Rootkit (hides presence), Backdoor (remote access).',
        topics: ['Malware classification', 'Attack vectors', 'Payload delivery', 'Persistence mechanisms']
      },
      {
        name: 'Analysis Techniques',
        description: 'Static analysis (examining code without execution), Dynamic analysis (running in sandbox), Behavioral analysis (monitoring actions), Memory forensics, Network traffic analysis, Reverse engineering.',
        topics: ['Static analysis', 'Sandboxing', 'Reverse engineering', 'IDA Pro & Ghidra']
      },
      {
        name: 'Protection & Response',
        description: 'Defense layers: Antivirus, EDR, IDS/IPS, email filtering, user training, backups. Incident response: Identify, contain, eradicate, recover, lessons learned. Always maintain offline backups.',
        topics: ['Defense strategies', 'Incident response', 'Forensics', 'Recovery procedures']
      }
    ]
  }
];

const practiceResources = [
  { name: 'HackTheBox', url: 'https://hackthebox.eu', description: 'Real-world penetration testing labs', icon: Terminal },
  { name: 'TryHackMe', url: 'https://tryhackme.com', description: 'Guided cybersecurity training', icon: Book },
  { name: 'OverTheWire', url: 'https://overthewire.org', description: 'War games for learning security', icon: Zap },
  { name: 'PentesterLab', url: 'https://pentesterlab.com', description: 'Web penetration testing exercises', icon: Code },
  { name: 'VulnHub', url: 'https://vulnhub.com', description: 'Vulnerable VMs for practice', icon: Shield },
  { name: 'PortSwigger Academy', url: 'https://portswigger.net/web-security', description: 'Free web security training', icon: FileSearch }
];

const certifications = [
  { name: 'CompTIA Security+', level: 'Beginner', description: 'Foundation security certification' },
  { name: 'CEH (Certified Ethical Hacker)', level: 'Intermediate', description: 'Ethical hacking certification' },
  { name: 'OSCP (Offensive Security)', level: 'Advanced', description: 'Hands-on penetration testing cert' },
  { name: 'CISSP', level: 'Expert', description: 'Security management certification' },
  { name: 'eJPT', level: 'Beginner', description: 'Entry-level pentest certification' },
  { name: 'PNPT', level: 'Intermediate', description: 'Practical network penetration tester' }
];

export default function LearningHub({ theme = 'dark' }) {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedResource, setExpandedResource] = useState({});

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const toggleResource = (categoryId, resourceIndex) => {
    const key = `${categoryId}-${resourceIndex}`;
    setExpandedResource(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <SectionTitle 
            title="Cybersecurity Learning Hub"
            subtitle="Master pentesting and security with comprehensive resources"
            theme={theme}
          />
        </ScrollReveal>

        {/* Learning Categories */}
        <div className="mt-16 space-y-6">
          {learningCategories.map((category, idx) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.id;
            
            return (
              <ScrollReveal key={category.id} delay={idx * 0.1}>
                <motion.div
                  className={`border rounded-xl overflow-hidden ${
                    theme === 'dark' 
                      ? 'bg-gray-900/50 border-gray-800' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-6 flex items-center justify-between hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          {category.title}
                        </h3>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {category.resources.length} topics to explore
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    ) : (
                      <ChevronDown className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                    )}
                  </button>

                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={`border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
                    >
                      <div className="p-6 space-y-4">
                        {category.resources.map((resource, resIdx) => {
                          const key = `${category.id}-${resIdx}`;
                          const isResourceExpanded = expandedResource[key];
                          
                          return (
                            <div
                              key={resIdx}
                              className={`p-4 rounded-lg border ${
                                theme === 'dark' 
                                  ? 'bg-gray-800/50 border-gray-700' 
                                  : 'bg-white border-gray-300'
                              }`}
                            >
                              <button
                                onClick={() => toggleResource(category.id, resIdx)}
                                className="w-full flex items-start justify-between text-left"
                              >
                                <div className="flex-1">
                                  <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {resource.name}
                                  </h4>
                                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {resource.description}
                                  </p>
                                </div>
                                {isResourceExpanded ? (
                                  <ChevronUp className={`ml-4 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                                ) : (
                                  <ChevronDown className={`ml-4 flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                                )}
                              </button>

                              {isResourceExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  className="mt-4 pt-4 border-t border-gray-700"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {resource.topics.map((topic, topicIdx) => (
                                      <div
                                        key={topicIdx}
                                        className={`p-2 rounded text-sm font-mono ${
                                          theme === 'dark' 
                                            ? 'bg-gray-900 text-gray-300' 
                                            : 'bg-gray-100 text-gray-800'
                                        }`}
                                      >
                                        → {topic}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Practice Platforms */}
        <ScrollReveal delay={0.2}>
          <div className="mt-20">
            <h3 className={`text-2xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Practice Platforms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practiceResources.map((platform, idx) => {
                const Icon = platform.icon;
                return (
                  <motion.a
                    key={idx}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-xl border transition-all ${
                      theme === 'dark'
                        ? 'bg-gray-900/50 border-gray-800 hover:border-gray-600'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Icon className={`w-8 h-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <ExternalLink className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`} />
                    </div>
                    <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {platform.name}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {platform.description}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Certifications */}
        <ScrollReveal delay={0.3}>
          <div className="mt-20">
            <h3 className={`text-2xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Certification Roadmap
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-900/50 border-gray-800'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {cert.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      cert.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      cert.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      cert.level === 'Advanced' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {cert.level}
                    </span>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}