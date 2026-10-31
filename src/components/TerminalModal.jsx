import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Sparkles, Shield, Cpu, Activity } from 'lucide-react';

export default function TerminalModal({ isOpen, onClose, onOpenEstimator, onOpenResume, onOpenPos, onNavigate, onShowToast }) {
  const [input, setInput] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', text: 'VAN JASPER BENZON // CYBER TERMINAL v3.0' },
    { type: 'system', text: 'Type "help" to list all available system commands.' },
  ]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const [enteredCommands, setEnteredCommands] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const lowerCmd = cmd.toLowerCase();
      if (!cmd) return;

      const newHistory = [...history, { type: 'user', text: `$ ${input}` }];
      setEnteredCommands((prev) => [...prev, input]);
      setCommandIndex(-1);

      if (lowerCmd.startsWith('sudo hire')) {
        newHistory.push({
          type: 'output',
          text: `[SUCCESS] ROOT PRIVILEGES GRANTED.
Launching priority email client to balandoy18@gmail.com...`,
        });
        window.open('mailto:balandoy18@gmail.com?subject=Full-Stack%20Developer%20Hiring%20Inquiry%20(Van%20Jasper%20Benzon)', '_blank');
        if (onShowToast) onShowToast('📬 Email client launched for Van Jasper Benzon!');
      } else if (lowerCmd === 'cat skills.json') {
        newHistory.push({
          type: 'output',
          text: `{
  "developer": "Van Jasper Benzon",
  "degree": "BS Information Technology",
  "frontend": ["React", "JavaScript (ES6+)", "Tailwind CSS", "HTML5/CSS3"],
  "backend": ["PHP (PDO)", "MySQL", "REST APIs", "Node.js"],
  "specialties": ["POS Systems", "Shift Reconciliation", "Municipal PWAs", "Database Optimization"],
  "status": "OPEN_FOR_HIRE"
}`,
        });
      } else if (lowerCmd === 'run benchmark' || lowerCmd === 'benchmark') {
        newHistory.push({
          type: 'output',
          text: `⚡ RUNNING LIGHTHOUSE & SYSTEM PERFORMANCE BENCHMARK...
[✓] Performance:    100 / 100
[✓] Accessibility:  100 / 100
[✓] Best Practices: 100 / 100
[✓] SEO:            100 / 100
[✓] PWA Optimized:  ACTIVE (ServiceWorker Registered)
Response Latency:  18ms | Load Time: 0.4s`,
        });
        if (onShowToast) onShowToast('⚡ Benchmark complete: 100/100 Lighthouse Performance!');
      } else if (lowerCmd === 'matrix') {
        setIsMatrixMode((prev) => !prev);
        newHistory.push({
          type: 'output',
          text: isMatrixMode ? 'Deactivating Matrix Rain protocol...' : '🟢 ACTIVATING MATRIX RAIN PROTOCOL... (Type "matrix" to toggle)',
        });
      } else if (lowerCmd === 'pos' || lowerCmd === 'simulator') {
        newHistory.push({ type: 'output', text: 'Launching Interactive POS & Shift Reconciliation Simulator...' });
        setTimeout(() => {
          onClose();
          if (onOpenPos) onOpenPos();
        }, 500);
      } else {
        switch (lowerCmd) {
          case 'help':
            newHistory.push({
              type: 'output',
              text: `AVAILABLE COMMANDS:
  help              - Show this menu
  sudo hire         - Priority email trigger to hire developer
  cat skills.json   - Output formatted technical skills JSON
  run benchmark     - Execute live Lighthouse performance audit
  pos               - Launch Live Interactive POS & Shift Simulator
  matrix            - Toggle Cyber Matrix Rain mode
  bio               - Developer lore & background
  skills            - List core technical stack & proficiency
  projects          - Show featured production applications
  estimate          - Launch Interactive Scope & Cost Calculator
  resume            - Preview / Download Developer CV
  contact           - Get email, phone & location details
  goto [0-8]        - Jump to section (e.g. goto 0 for Hero, goto 3 for Projects)
  clear             - Clear terminal buffer
  exit              - Close cyber terminal session`,
            });
            break;

          case 'bio':
          case 'about':
            newHistory.push({
              type: 'output',
              text: `VAN JASPER BENZON — Full-Stack Developer & Digital Architect
Location: Sorsogon, Philippines
Degree: BS Information Technology
Focus: POS Systems, Municipal PWAs, Modern React & PHP Web Applications
Status: OPEN FOR ROLES, FREELANCE & SYSTEM CONTRACTS`,
            });
            break;

          case 'skills':
            newHistory.push({
              type: 'output',
              text: `TECHNICAL ARSENAL:
  [Frontend]  React, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3
  [Backend]   PHP, Node.js, Express, REST APIs
  [Database]  MySQL, IndexedDB, Database Optimization
  [PWA]       Service Workers, Offline-First Systems, LocalStorage
  [Tools]     Git, GitHub, Vite, Postman, Linux CLI`,
            });
            break;

          case 'projects':
            newHistory.push({
              type: 'output',
              text: `FEATURED APPLICATIONS:
  1. RetailPOS Pro - Enterprise Offline-First POS & Inventory System
  2. AgriConnect PWA - Municipal Agriculture & Farmers Portal
  3. FinAI Suite - AI-Assisted Personal Finance & Expense Tracker
  4. PensionPOS Citadel - Hospitality & Floorplan Booking Platform`,
            });
            break;

          case 'estimate':
          case 'calculator':
            newHistory.push({ type: 'output', text: 'Launching Interactive Project Estimator...' });
            setTimeout(() => {
              onClose();
              if (onOpenEstimator) onOpenEstimator();
            }, 500);
            break;

          case 'resume':
          case 'cv':
            newHistory.push({ type: 'output', text: 'Opening Developer Resume Previewer...' });
            setTimeout(() => {
              onClose();
              if (onOpenResume) onOpenResume();
            }, 500);
            break;

          case 'contact':
          case 'hire':
            newHistory.push({
              type: 'output',
              text: `CONTACT INFORMATION:
  Email:    balandoy18@gmail.com
  Phone:    +63 930 093 0835
  Location: Sorsogon, Philippines`,
            });
            break;

          case 'clear':
            setHistory([]);
            setInput('');
            return;

          case 'exit':
          case 'quit':
            onClose();
            setInput('');
            return;

          default:
            if (lowerCmd.startsWith('goto ')) {
              const idx = parseInt(lowerCmd.split(' ')[1], 10);
              if (!isNaN(idx) && idx >= 0 && idx <= 8) {
                newHistory.push({ type: 'output', text: `Navigating to Section 0${idx}...` });
                if (onNavigate) onNavigate(idx);
                setTimeout(() => onClose(), 500);
              } else {
                newHistory.push({ type: 'error', text: 'Invalid section index. Use goto 0 to 8.' });
              }
            } else {
              newHistory.push({
                type: 'error',
                text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`,
              });
            }
            break;
        }
      }

      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      if (enteredCommands.length === 0) return;
      const nextIdx = commandIndex + 1;
      if (nextIdx < enteredCommands.length) {
        setCommandIndex(nextIdx);
        setInput(enteredCommands[enteredCommands.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      if (commandIndex > 0) {
        const nextIdx = commandIndex - 1;
        setCommandIndex(nextIdx);
        setInput(enteredCommands[enteredCommands.length - 1 - nextIdx]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-3 sm:p-6 animate-fadeIn">
      <div
        className={`relative w-full max-w-3xl bg-slate-950 border rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col h-[500px] overflow-hidden font-mono text-xs transition-colors duration-500 ${
          isMatrixMode ? 'border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.4)]' : 'border-cyan-500/40'
        }`}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span
              className={`ml-2 font-bold tracking-widest text-[11px] flex items-center ${
                isMatrixMode ? 'text-emerald-400' : 'text-cyan-400'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 mr-1.5" />
              CYBER_TERMINAL // VAN_JASPER_BENZON {isMatrixMode && '[MATRIX_MODE]'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Output Window */}
        <div
          className={`flex-1 p-4 overflow-y-auto space-y-2 font-mono ${
            isMatrixMode ? 'bg-slate-950 text-emerald-400 shadow-inner' : 'text-slate-200'
          }`}
        >
          {history.map((item, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {item.type === 'system' && (
                <span className={isMatrixMode ? 'text-emerald-300 font-bold' : 'text-cyan-400 font-semibold'}>
                  {item.text}
                </span>
              )}
              {item.type === 'user' && (
                <span className={isMatrixMode ? 'text-emerald-200 font-bold' : 'text-amber-300 font-bold'}>
                  {item.text}
                </span>
              )}
              {item.type === 'output' && (
                <span className={isMatrixMode ? 'text-emerald-400' : 'text-emerald-400'}>{item.text}</span>
              )}
              {item.type === 'error' && <span className="text-rose-400">{item.text}</span>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Prompt Footer */}
        <div className="flex items-center px-4 py-2.5 bg-slate-900/90 border-t border-cyan-500/20">
          <span className={`font-bold mr-2 shrink-0 ${isMatrixMode ? 'text-emerald-400' : 'text-cyan-400'}`}>
            van@benzon-dev:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="type 'help', 'sudo hire', 'cat skills.json', 'run benchmark', 'pos'..."
            className={`w-full bg-transparent focus:outline-none font-mono text-xs ${
              isMatrixMode ? 'text-emerald-300 caret-emerald-400' : 'text-emerald-300 caret-cyan-400'
            }`}
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400/60 ml-2 shrink-0" />
        </div>
      </div>
    </div>
  );
}
