import React, { useState, useRef } from 'react';
import { PROJECTS } from '../data/projects';
import { ShieldAlert, ChevronLeft, ChevronRight, Server, Terminal } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function MonsterShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useScrollAnimation(containerRef, { y: 30 });

  const activeProject = PROJECTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === PROJECTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="monsters"
      ref={containerRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center bg-obsidian text-ivory overflow-x-hidden overflow-y-auto lg:overflow-hidden border-t border-antique-gold/10 pt-20 pb-8 sm:py-12 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center space-x-2 text-antique-gold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-cinzel font-semibold mb-1.5 sm:mb-2 uppercase">
            <Terminal className="w-4 h-4" />
            <span>CHAPTER 04 // SYSTEM ENCYCLOPEDIA</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black font-cinzel tracking-wider sm:tracking-[0.15em] gold-text-gradient uppercase mb-2 leading-snug">
            ENTERPRISE POS & PWA SYSTEMS
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray font-cinzel tracking-wider">
            Deep dive into complex database architecture, shift reconciliations, and PWA integrations.
          </p>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative bg-charcoal/80 rounded-xl overflow-hidden border border-antique-gold/40 shadow-gold-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* System Visual */}
            <div className="lg:col-span-7 relative h-[180px] xs:h-[220px] sm:h-[360px] lg:h-[420px] overflow-hidden group">
              <img
                src={activeProject.image}
                alt={activeProject.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-110 transition duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90" />

              {/* Status Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 py-1 rounded bg-obsidian/80 border border-antique-gold/60 backdrop-blur-md">
                <Server className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-antique-gold animate-pulse" />
                <span className="text-[9px] sm:text-[10px] font-bold font-cinzel text-antique-gold tracking-widest uppercase">
                  {activeProject.difficulty} CLASS ARCHITECTURE
                </span>
              </div>
            </div>

            {/* System Info */}
            <div className="lg:col-span-5 p-4 xs:p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-cinzel tracking-[0.25em] text-antique-gold font-bold uppercase block mb-0.5">
                  {activeProject.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-ivory tracking-wider uppercase mb-1">
                  {activeProject.name}
                </h3>
                <p className="text-[10px] font-cinzel text-muted-gray tracking-widest uppercase mb-3">
                  TECH STACK: {activeProject.techStack}
                </p>

                <p className="text-xs text-ivory/80 leading-relaxed font-inter mb-4 line-clamp-3">
                  {activeProject.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-obsidian/60 rounded border border-white/5 mb-4">
                  <div>
                    <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">CATEGORY</span>
                    <p className="text-xs font-semibold text-ivory mt-0.5">{activeProject.category}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">PERFORMANCE</span>
                    <p className="text-xs font-semibold text-antique-gold mt-0.5">{activeProject.stats.performance} STABILITY</p>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-[10px] font-cinzel font-bold tracking-widest text-antique-gold uppercase mb-1.5">
                    KEY SYSTEM HIGHLIGHTS
                  </h4>
                  <ul className="space-y-1">
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx} className="text-[11px] text-ivory/80 flex items-start space-x-1.5">
                        <span className="text-antique-gold mt-0.5">•</span>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="text-xs font-cinzel text-muted-gray tracking-widest">
                  APPLICATION <span className="text-antique-gold font-bold">0{currentIndex + 1}</span> / 0{PROJECTS.length}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrev}
                    className="p-2.5 rounded bg-obsidian border border-white/10 hover:border-antique-gold text-ivory hover:text-antique-gold transition-colors"
                    aria-label="Previous system"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2.5 rounded bg-obsidian border border-white/10 hover:border-antique-gold text-ivory hover:text-antique-gold transition-colors"
                    aria-label="Next system"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
