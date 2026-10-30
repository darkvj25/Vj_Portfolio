import React, { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Sparkles, GraduationCap } from 'lucide-react';

export default function GameIntroduction() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useScrollAnimation(containerRef, { y: 40 });

  return (
    <section
      id="intro"
      ref={containerRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center bg-gradient-to-b from-obsidian via-charcoal/50 to-obsidian text-ivory overflow-x-hidden overflow-y-auto lg:overflow-hidden border-t border-cyan-500/10 pt-20 pb-8 sm:py-12 lg:py-0"
    >
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 cinematic-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-6 lg:mb-10">
          <div className="inline-flex items-center space-x-2 text-cyan-400 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-cinzel font-semibold mb-1 sm:mb-2 uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>CHAPTER 01 // DEVELOPER LORE & ORIGINS</span>
          </div>
          <h2 className="text-lg xs:text-xl sm:text-3xl md:text-5xl font-black font-cinzel tracking-wider sm:tracking-[0.15em] cyan-text-gradient uppercase mb-2 sm:mb-3 leading-snug sm:leading-tight">
            FORGING SIMPLE & POWERFUL DIGITAL REALMS.
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
        </div>

        {/* Editorial 2-Column Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-center">
          {/* Image Container with Framing and Glow */}
          <div ref={imageRef} className="lg:col-span-7 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-blue-500/30 rounded-lg blur-md group-hover:opacity-100 transition duration-1000 opacity-70" />

            <div className="relative rounded-lg overflow-hidden border border-cyan-500/30 bg-charcoal shadow-cinematic">
              <img
                src="/images/me.png"
                alt="Van Jasper Benzon Portrait"
                className="w-full h-[240px] xs:h-[280px] sm:h-[380px] lg:h-[420px] object-cover object-top transform group-hover:scale-105 transition duration-700 filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-6 p-2 sm:p-4 bg-obsidian/85 backdrop-blur-md rounded border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <p className="text-[9px] sm:text-xs font-cinzel text-cyan-400 font-bold tracking-widest uppercase">
                    DEVELOPER // VAN JASPER BENZON
                  </p>
                  <p className="text-[8px] sm:text-[11px] text-muted-gray tracking-wider">
                    BS INFORMATION TECHNOLOGY GRADUATE // SORSOGON, PHILIPPINES
                  </p>
                </div>
                <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-cyan-400 animate-pulse shrink-0 ml-2" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={textRef} className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-2xl font-cinzel font-bold tracking-wider text-ivory border-l-2 border-cyan-400 pl-4">
              PASSIONATE ABOUT CLEAN CODE & USER EXPERIENCES
            </h3>

            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-inter">
              I am a recent IT graduate with a solid foundation in both front-end and back-end web development. Over the past year of intensive hands-on development, I have engineered over 10 production-ready applications spanning POS platforms, municipal PWAs, and AI-driven finance systems.
            </p>

            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-inter">
              My focus is on creating simple, functional, highly responsive, and user-friendly digital systems using HTML, PHP, MySQL, JavaScript, and modern frameworks.
            </p>

            <div className="pt-2 sm:pt-4 grid grid-cols-3 gap-3 border-t border-white/10">
              <div className="p-3 bg-charcoal/60 rounded border border-cyan-500/20 text-center">
                <p className="text-xl sm:text-2xl font-black font-cinzel text-cyan-400">10+</p>
                <p className="text-[9px] sm:text-[10px] text-muted-gray font-cinzel tracking-wider mt-0.5">PRO PROJECTS</p>
              </div>
              <div className="p-3 bg-charcoal/60 rounded border border-cyan-500/20 text-center">
                <p className="text-xl sm:text-2xl font-black font-cinzel text-cyan-400">1 YEAR</p>
                <p className="text-[9px] sm:text-[10px] text-muted-gray font-cinzel tracking-wider mt-0.5">IT EXPERIENCE</p>
              </div>
              <div className="p-3 bg-charcoal/60 rounded border border-cyan-500/20 text-center">
                <p className="text-xl sm:text-2xl font-black font-cinzel text-emerald-400">100%</p>
                <p className="text-[9px] sm:text-[10px] text-muted-gray font-cinzel tracking-wider mt-0.5">CLEAN CODE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
