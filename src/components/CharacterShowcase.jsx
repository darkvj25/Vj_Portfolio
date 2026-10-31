import React, { useState, useRef } from 'react';
import { PROJECTS } from '../data/projects';
import { FolderGit2, Code, ShieldCheck, Sparkles, Server, Github, ExternalLink, Copy, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function CharacterShowcase({ onShowToast, onOpenPos }) {
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const containerRef = useRef(null);

  useScrollAnimation(containerRef, { y: 30 });

  const handleCopySql = () => {
    const sqlSnippet = `-- ${activeProject.name} Database Schema (MySQL / PHP PDO)
CREATE TABLE transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reference_no VARCHAR(32) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  vat_amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('CASH', 'GCASH', 'MAYA') NOT NULL,
  cashier_id INT NOT NULL,
  shift_reconciled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

    navigator.clipboard.writeText(sqlSnippet);
    if (onShowToast) onShowToast(`📋 Copied ${activeProject.name} SQL Schema snippet!`);
  };

  return (
    <section
      id="characters"
      ref={containerRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center bg-gradient-to-b from-obsidian via-charcoal to-obsidian text-ivory overflow-x-hidden overflow-y-auto lg:overflow-hidden border-t border-antique-gold/10 pt-20 pb-8 sm:py-12 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full overflow-x-hidden">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 lg:mb-6">
          <div className="inline-flex items-center space-x-2 text-antique-gold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-cinzel font-semibold mb-1.5 sm:mb-2 uppercase">
            <FolderGit2 className="w-4 h-4" />
            <span>CHAPTER 03 // SIGNATURE PROJECTS</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black font-cinzel tracking-wider sm:tracking-[0.15em] gold-text-gradient uppercase mb-2 leading-snug">
            FEATURED APPLICATIONS
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray font-cinzel tracking-wider">
            Explore Van Jasper Benzon's full-stack POS systems, municipal PWAs, and AI applications.
          </p>
        </div>

        {/* Project Navigation Tabs (Horizontal Scroll on Mobile) */}
        <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap justify-start sm:justify-center gap-1.5 sm:gap-2 mb-3 pb-1 w-full max-w-full px-1 sm:px-0">
          {PROJECTS.map((proj) => {
            const isActive = activeProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-sm font-cinzel text-[10px] sm:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-all duration-300 border whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-antique-gold text-obsidian border-antique-gold shadow-gold-glow scale-105'
                    : 'bg-obsidian/80 text-ivory/70 border-white/10 hover:border-antique-gold/50 hover:text-ivory'
                }`}
              >
                <span>{proj.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch bg-charcoal/90 rounded-xl overflow-hidden border border-antique-gold/30 shadow-cinematic">
          {/* Project Screenshot & Visual */}
          <div className="lg:col-span-5 relative min-h-[160px] xs:min-h-[190px] sm:min-h-[320px] lg:min-h-[380px] overflow-hidden group">
            <img
              src={activeProject.image}
              alt={activeProject.name}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90" />

            {/* Quote overlay */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 p-2 sm:p-3 bg-obsidian/85 backdrop-blur-md rounded border border-antique-gold/20">
              <p className="text-[10px] sm:text-xs font-cinzel italic text-antique-gold-light line-clamp-2">
                "{activeProject.quote}"
              </p>
              <p className="text-[8px] sm:text-[10px] font-cinzel tracking-widest text-muted-gray uppercase mt-0.5 truncate">
                — {activeProject.name}, {activeProject.title}
              </p>
            </div>
          </div>

          {/* Project Details & Features */}
          <div className="lg:col-span-7 p-4 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
                <div>
                  <span className="text-[9px] sm:text-[10px] font-cinzel tracking-[0.2em] sm:tracking-[0.3em] text-antique-gold font-bold uppercase">
                    {activeProject.category} // {activeProject.role}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black font-cinzel text-ivory tracking-wider uppercase mt-0.5">
                    {activeProject.name}
                  </h3>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <span className="text-[8px] sm:text-[9px] font-cinzel text-muted-gray tracking-widest uppercase block">
                    COMPLEXITY
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold font-cinzel text-antique-gold border border-antique-gold/40 px-1.5 py-0.5 rounded bg-antique-gold/10 inline-block mt-0.5">
                    {activeProject.difficulty}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-ivory/80 leading-relaxed font-inter mb-3 line-clamp-2">
                {activeProject.description}
              </p>

              {/* Tech Stack Banner */}
              <div className="p-2.5 bg-obsidian/60 rounded border border-white/5 mb-3">
                <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase flex items-center space-x-1">
                  <Code className="w-3 h-3 text-antique-gold mr-1" />
                  TECHNOLOGY STACK
                </span>
                <p className="text-xs font-mono font-semibold text-antique-gold mt-0.5">{activeProject.techStack}</p>
              </div>

              {/* Key Features Bullet List */}
              <div className="mb-3">
                <h4 className="text-[10px] font-cinzel font-bold tracking-[0.2em] text-antique-gold uppercase mb-1.5">
                  CORE SYSTEM ARCHITECTURE
                </h4>
                <div className="space-y-1">
                  {activeProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-ivory/90">
                      <ShieldCheck className="w-3.5 h-3.5 text-antique-gold shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Stats & Action Links */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="grid grid-cols-4 gap-2 text-center w-full sm:w-auto flex-1">
                <div>
                  <p className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">STABILITY</p>
                  <p className="text-sm font-black font-cinzel text-antique-gold">{activeProject.stats.performance}</p>
                </div>
                <div>
                  <p className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">SECURITY</p>
                  <p className="text-sm font-black font-cinzel text-antique-gold">{activeProject.stats.security}</p>
                </div>
                <div>
                  <p className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">DB OPTIM</p>
                  <p className="text-sm font-black font-cinzel text-antique-gold">{activeProject.stats.dbEfficiency}</p>
                </div>
                <div>
                  <p className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">PLATFORM</p>
                  <p className="text-sm font-black font-cinzel text-antique-gold">{activeProject.stats.type}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-[10px] font-cinzel font-bold tracking-wider text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                  title="Copy sample MySQL database schema"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>SQL SCHEMA</span>
                </button>

                <button
                  onClick={onOpenPos}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-emerald-400 to-teal-400 text-obsidian text-[10px] font-cinzel font-bold tracking-wider hover:brightness-110 transition-all shadow-lg"
                  title="Test Live POS Simulator Widget"
                >
                  <Zap className="w-3.5 h-3.5 text-obsidian" />
                  <span>TEST POS WIDGET</span>
                </button>

                <a
                  href={activeProject.github || "https://github.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-obsidian border border-cyan-500/30 hover:border-cyan-400 text-[10px] font-cinzel font-bold tracking-wider text-ivory hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                  <span>REPOSITORY</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
