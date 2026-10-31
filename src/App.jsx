import React, { useState, useEffect, useRef, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import Hero from './components/Hero';
import GameIntroduction from './components/GameIntroduction';
import WorldShowcase from './components/WorldShowcase';
import CharacterShowcase from './components/CharacterShowcase';
import MonsterShowcase from './components/MonsterShowcase';
import GameplayFeatures from './components/GameplayFeatures';
import TrailerSection from './components/TrailerSection';
import MediaGallery from './components/MediaGallery';
import CallToAction from './components/CallToAction';
import TerminalModal from './components/TerminalModal';
import ProjectEstimatorModal from './components/ProjectEstimatorModal';
import ResumeModal from './components/ResumeModal';
import PosSimulatorModal from './components/PosSimulatorModal';
import Toast from './components/Toast';
import { Terminal, Calculator, FileText, Zap, Sun, Moon } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('vj_theme') || 'dark';
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPosOpen, setIsPosOpen] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('vj_theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  }, []);

  const sectionList = [
    {
      id: 'hero',
      label: 'HERO',
      component: (
        <Hero
          onOpenTrailer={() => setIsTrailerOpen(true)}
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      ),
    },
    { id: 'intro', label: 'BIO & LORE', component: <GameIntroduction /> },
    { id: 'world', label: 'SKILLS', component: <WorldShowcase /> },
    {
      id: 'characters',
      label: 'PROJECTS',
      component: (
        <CharacterShowcase
          onShowToast={showToast}
          onOpenPos={() => setIsPosOpen(true)}
        />
      ),
    },
    { id: 'monsters', label: 'SYSTEMS', component: <MonsterShowcase /> },
    { id: 'gameplay', label: 'CAPABILITIES', component: <GameplayFeatures /> },
    {
      id: 'trailer',
      label: 'DEMO',
      component: (
        <TrailerSection
          isTrailerOpen={isTrailerOpen}
          onOpenTrailer={() => setIsTrailerOpen(true)}
          onCloseTrailer={() => setIsTrailerOpen(false)}
        />
      ),
    },
    { id: 'gallery', label: 'ARCHIVES', component: <MediaGallery /> },
    {
      id: 'cta',
      label: 'CONTACT',
      component: (
        <CallToAction
          onOpenEstimator={() => setIsEstimatorOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenPos={() => setIsPosOpen(true)}
          onShowToast={showToast}
        />
      ),
    },
  ];

  const changeSection = useCallback(
    (newIndex) => {
      if (newIndex < 0 || newIndex >= sectionList.length || isTransitioningRef.current) return;

      isTransitioningRef.current = true;
      setActiveSection(newIndex);

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 850);
    },
    [sectionList.length]
  );

  const isAnyModalOpen = isTrailerOpen || isTerminalOpen || isEstimatorOpen || isResumeOpen || isPosOpen;

  // Wheel listener for full-page section fade transitions
  useEffect(() => {
    const handleWheel = (e) => {
      if (isAnyModalOpen) return;

      if (Math.abs(e.deltaY) < 15) return;

      if (e.deltaY > 0) {
        changeSection(activeSection + 1);
      } else {
        changeSection(activeSection - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeSection, isAnyModalOpen, changeSection]);

  // Touch Swipe listener
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isAnyModalOpen) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartYRef.current - touchEndY;

      if (Math.abs(diffY) > 50) {
        const currentSecId = sectionList[activeSection]?.id;
        const activeElem = currentSecId ? document.getElementById(currentSecId) : null;

        if (activeElem) {
          const isAtTop = activeElem.scrollTop <= 10;
          const isAtBottom = activeElem.scrollTop + activeElem.clientHeight >= activeElem.scrollHeight - 10;

          if (diffY > 0 && isAtBottom) {
            changeSection(activeSection + 1);
          } else if (diffY < 0 && isAtTop) {
            changeSection(activeSection - 1);
          }
        } else {
          if (diffY > 0) {
            changeSection(activeSection + 1);
          } else {
            changeSection(activeSection - 1);
          }
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, isAnyModalOpen, changeSection, sectionList]);

  // Keyboard Arrow, Escape & Terminal (~ / Ctrl+K) listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Terminal on `~` or `Ctrl+K`
      if (e.key === '`' || e.key === '~' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
        return;
      }

      // Close any open modal on Escape key press
      if (e.key === 'Escape') {
        setIsTrailerOpen(false);
        setIsTerminalOpen(false);
        setIsEstimatorOpen(false);
        setIsResumeOpen(false);
        setIsPosOpen(false);
        return;
      }

      if (isAnyModalOpen) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        changeSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        changeSection(activeSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, isAnyModalOpen, changeSection]);

  return (
    <div className="bg-obsidian text-ivory h-screen w-full max-w-full font-inter selection:bg-antique-gold selection:text-obsidian relative overflow-x-hidden overflow-y-hidden select-none">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Navbar
        activeSection={activeSection}
        onNavigate={(idx) => changeSection(idx)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <SideNav
        sections={sectionList}
        activeSection={activeSection}
        onSelectSection={(idx) => changeSection(idx)}
      />

      {/* Full-Page Section Stack with Cinematic Fade & Zoom Overlay */}
      <main className="relative w-full h-full overflow-x-hidden overflow-y-hidden">
        {sectionList.map((sec, idx) => {
          const isActive = activeSection === idx;
          const isNearby = Math.abs(activeSection - idx) <= 1;

          return (
            <div
              key={sec.id}
              id={sec.id}
              className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden transition-all duration-700 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 z-10 pointer-events-auto translate-y-0 visible'
                  : 'opacity-0 scale-95 z-0 pointer-events-none translate-y-4 invisible'
              }`}
            >
              {isNearby ? sec.component : null}
            </div>
          );
        })}
      </main>

      {/* Section Progress Indicator Bar at Bottom Left */}
      <div className="fixed bottom-3 left-3 sm:left-6 z-30 flex items-center space-x-2.5 sm:space-x-3 text-[10px] font-cinzel text-muted-gray tracking-widest bg-obsidian/85 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border border-cyan-500/20 backdrop-blur-md shadow-lg">
        <span className="text-cyan-400 font-bold">0{activeSection + 1}</span>
        <div className="w-12 sm:w-16 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-500"
            style={{ width: `${((activeSection + 1) / sectionList.length) * 100}%` }}
          />
        </div>
        <span>0{sectionList.length}</span>
        <span className="text-white/30">|</span>
        <span className="text-cyan-300 font-bold uppercase tracking-widest truncate max-w-[80px] sm:max-w-none">
          {sectionList[activeSection]?.label}
        </span>
      </div>

      {/* Bottom Right Floating Quick Actions Widget */}
      <div className="fixed bottom-3 right-3 sm:right-6 z-30 flex items-center space-x-1.5 sm:space-x-2">
        <button
          onClick={toggleTheme}
          className="p-1.5 sm:p-2 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-400 hover:text-amber-300 hover:border-amber-400 transition-all shadow-lg"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
          )}
        </button>

        <button
          onClick={() => setIsPosOpen(true)}
          className="p-1.5 sm:p-2 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 transition-all shadow-lg"
          title="Live Interactive POS & Shift Simulator"
        >
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button
          onClick={() => setIsTerminalOpen(true)}
          className="p-1.5 sm:p-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all shadow-cyan-glow"
          title="Open Cyber Terminal (~)"
        >
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button
          onClick={() => setIsEstimatorOpen(true)}
          className="p-1.5 sm:p-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all shadow-cyan-glow"
          title="Project Cost & Scope Estimator"
        >
          <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        <button
          onClick={() => setIsResumeOpen(true)}
          className="p-1.5 sm:p-2 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 transition-all shadow-cyan-glow"
          title="Preview Resume CV"
        >
          <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Floating Toast Notification */}
      <Toast message={toastMsg} visible={toastVisible} />

      {/* Interactive Modals */}
      <PosSimulatorModal
        isOpen={isPosOpen}
        onClose={() => setIsPosOpen(false)}
        onShowToast={showToast}
      />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenEstimator={() => setIsEstimatorOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenPos={() => setIsPosOpen(true)}
        onShowToast={showToast}
        onNavigate={(idx) => changeSection(idx)}
      />

      <ProjectEstimatorModal
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
