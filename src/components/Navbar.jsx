import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Sparkles, Volume2, VolumeX, Terminal, Calculator, FileText, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeSection, onNavigate, onOpenTerminal, onOpenEstimator, onOpenResume, theme, onToggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const navLinks = [
    { name: 'HOME', index: 0 },
    { name: 'ABOUT', index: 1 },
    { name: 'SKILLS', index: 2 },
    { name: 'PROJECTS', index: 3 },
    { name: 'SYSTEMS', index: 4 },
    { name: 'CAPABILITIES', index: 5 },
    { name: 'DEMO', index: 6 },
    { name: 'ARCHIVES', index: 7 },
    { name: 'CONTACT', index: 8 },
  ];

  // Prevent background scrolling when mobile menu drawer is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(index);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 z-50 bg-[#0b0f19] border-b border-cyan-500/20 px-3 sm:px-6 lg:px-8 flex items-center justify-between transition-colors">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={(e) => handleLinkClick(e, 0)}
          className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer min-w-0"
        >
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-full border border-cyan-500/40 bg-[#0b0f19] group-hover:border-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] shrink-0">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-sm group-hover:opacity-100 opacity-0 transition-opacity" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-cinzel text-[11px] xs:text-xs sm:text-base font-bold tracking-wider sm:tracking-[0.2em] text-ivory group-hover:text-cyan-400 transition-colors truncate">
              VAN JASPER BENZON
            </span>
            <span className="font-cinzel text-[6px] xs:text-[7px] sm:text-[8px] tracking-[0.15em] sm:tracking-[0.3em] text-cyan-400/90 opacity-90 truncate">
              FULL-STACK DEVELOPER
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.index;
            return (
              <a
                key={link.name}
                href={`#sec-${link.index}`}
                onClick={(e) => handleLinkClick(e, link.index)}
                className={`relative text-[11px] font-cinzel tracking-[0.2em] font-medium transition-colors py-1 group ${
                  isActive ? 'text-cyan-400 font-bold' : 'text-ivory/80 hover:text-cyan-400'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Controls (Desktop) */}
        <div className="hidden lg:flex items-center space-x-2.5">
          <button
            onClick={onToggleTheme}
            className="p-2 text-ivory/70 hover:text-amber-400 transition-colors border border-white/10 rounded-full hover:border-amber-400/50"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          <button
            onClick={onOpenTerminal}
            className="p-2 text-ivory/70 hover:text-cyan-400 transition-colors border border-white/10 rounded-full hover:border-cyan-500/40"
            title="Open Cyber Terminal (~)"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenEstimator}
            className="p-2 text-ivory/70 hover:text-cyan-400 transition-colors border border-white/10 rounded-full hover:border-cyan-500/40"
            title="Project Estimator"
          >
            <Calculator className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-ivory/70 hover:text-cyan-400 transition-colors border border-white/10 rounded-full hover:border-cyan-500/40"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
          </button>

          <button
            onClick={(e) => handleLinkClick(e, 8)}
            className="relative inline-flex items-center px-4 py-2 text-[11px] font-cinzel font-bold tracking-[0.2em] text-obsidian bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 rounded-sm hover:brightness-110 transition-all transform hover:-translate-y-0.5 shadow-cyan-glow uppercase overflow-hidden group ml-1"
          >
            <span className="relative z-10 flex items-center space-x-1.5">
              <span>HIRE DEVELOPER</span>
              <Sparkles className="w-3 h-3 text-obsidian" />
            </span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2 shrink-0">
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 text-ivory/80 hover:text-amber-400 transition-colors border border-white/10 rounded-full bg-slate-900"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 sm:p-2 text-ivory/80 hover:text-cyan-400 transition-colors border border-white/10 rounded-full bg-slate-900"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
          </button>

          <button
            onClick={onOpenTerminal}
            className="p-1.5 sm:p-2 text-cyan-400 transition-colors border border-cyan-500/40 rounded-full bg-slate-900 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
            title="Open Terminal"
          >
            <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-ivory hover:text-cyan-400 transition-colors focus:outline-none border border-white/10 rounded-lg bg-slate-900 ml-0.5"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-cyan-400 animate-in fade-in zoom-in duration-200" />
            ) : (
              <Menu className="w-5 h-5 text-ivory hover:text-cyan-400 transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-14 sm:top-16 bottom-0 h-[calc(100dvh-56px)] sm:h-[calc(100dvh-64px)] bg-[#0b0f19] z-[100] flex flex-col justify-between px-5 py-5 sm:px-8 sm:py-6 border-t border-cyan-500/30 overflow-y-auto shadow-2xl">
          {/* Section Navigation Links */}
          <div className="flex flex-col space-y-2">
            <span className="text-[9px] font-mono font-bold text-cyan-400/80 tracking-widest uppercase mb-1">
              // SYSTEM NAVIGATION MENU
            </span>

            {navLinks.map((link) => {
              const isActive = activeSection === link.index;
              return (
                <a
                  key={link.name}
                  href={`#sec-${link.index}`}
                  onClick={(e) => handleLinkClick(e, link.index)}
                  className={`text-xs sm:text-sm font-cinzel tracking-[0.2em] transition-all flex justify-between items-center py-2 px-3 rounded ${
                    isActive
                      ? 'text-cyan-400 font-bold bg-cyan-500/10 border-l-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'text-ivory/80 hover:text-cyan-300 hover:bg-white/5 border-b border-white/5'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                    <span>{link.name}</span>
                  </span>
                  <span className={`text-[10px] font-mono ${isActive ? 'text-cyan-300 font-bold' : 'text-muted-gray'}`}>
                    0{link.index + 1}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Bottom Action CTAs */}
          <div className="mt-5 flex flex-col space-y-2 pt-3 border-t border-cyan-500/20 shrink-0">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEstimator) onOpenEstimator();
                }}
                className="inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 font-cinzel font-bold tracking-[0.15em] text-cyan-300 bg-slate-900 border border-cyan-500/40 rounded-sm text-[10px] sm:text-xs uppercase hover:bg-cyan-500/20 transition-all"
              >
                <Calculator className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">ESTIMATOR</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenResume) onOpenResume();
                }}
                className="inline-flex items-center justify-center space-x-1.5 py-2.5 px-3 font-cinzel font-bold tracking-[0.15em] text-cyan-300 bg-slate-900 border border-cyan-500/40 rounded-sm text-[10px] sm:text-xs uppercase hover:bg-cyan-500/20 transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">PREVIEW CV</span>
              </button>
            </div>

            <button
              onClick={(e) => handleLinkClick(e, 8)}
              className="w-full text-center py-3 font-cinzel font-bold tracking-[0.2em] text-obsidian bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 rounded-sm shadow-cyan-glow uppercase text-xs hover:brightness-110 transition-all flex items-center justify-center space-x-2"
            >
              <span>HIRE DEVELOPER</span>
              <Sparkles className="w-3.5 h-3.5 text-obsidian" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
