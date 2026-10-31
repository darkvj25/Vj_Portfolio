import React, { useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Compass, Sparkles, FileText, Calculator } from 'lucide-react';
import Canvas3DLogo from './Canvas3DLogo';
import { gsap } from 'gsap';

export default function Hero({ onOpenTrailer, onOpenEstimator, onOpenResume }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, letterSpacing: '0.1em' },
          { opacity: 1, letterSpacing: '0.35em', duration: 1, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const embers = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      width: `${Math.random() * 3 + 2}px`,
      height: `${Math.random() * 3 + 2}px`,
      left: `${Math.random() * 100}%`,
      bottom: `${Math.random() * 30}%`,
      animationDuration: `${Math.random() * 4 + 4}s`,
      animationDelay: `${Math.random() * 3}s`
    }));
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center overflow-x-hidden overflow-y-auto lg:overflow-hidden bg-obsidian pt-20 pb-8 sm:py-0"
    >
      {/* Background Developer Image with Vignette and Dark Fantasy Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/me.png"
          alt="Van Jasper Benzon Background"
          className="w-full h-full object-cover object-top scale-105 filter brightness-40 contrast-125 transition-transform duration-10000 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/75 to-obsidian/40" />
        <div className="absolute inset-0 vignette-overlay" />
        <div className="absolute inset-0 bg-noise pointer-events-none" />
      </div>

      {/* Floating Cyan/Emerald Embers Animated Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden hidden sm:block">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="absolute rounded-full bg-cyan-400/80 animate-ember"
            style={{
              width: ember.width,
              height: ember.height,
              left: ember.left,
              bottom: ember.bottom,
              animationDuration: ember.animationDuration,
              animationDelay: ember.animationDelay
            }}
          />
        ))}
      </div>

      {/* Hero Central Content Container */}
      <div className="relative z-10 max-w-5xl w-full px-4 text-center flex flex-col items-center justify-center py-4 sm:py-6 overflow-x-hidden">
        {/* Terminal Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-obsidian/90 border border-cyan-500/40 backdrop-blur-md mb-2 sm:mb-3 shadow-cyan-glow max-w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-[8px] xs:text-[9px] sm:text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase truncate">
            SYSTEM: ONLINE // OPEN FOR ROLES & FREELANCE
          </span>
        </div>

        {/* Interactive 3D Canvas Emblem */}
        <div className="transform hover:scale-105 transition-transform scale-75 sm:scale-100 my-0 sm:my-1">
          <Canvas3DLogo size={180} interactive={true} />
        </div>

        {/* Developer Name Title */}
        <h1
          ref={titleRef}
          className="text-2xl xs:text-3xl sm:text-5xl md:text-7xl font-black tracking-wider sm:tracking-[0.15em] leading-tight cyan-text-gradient font-cinzel uppercase drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] break-words max-w-full"
        >
          VAN JASPER BENZON
        </h1>

        {/* Subtitle / Role */}
        <p
          ref={subtitleRef}
          className="text-[10px] sm:text-base md:text-lg font-semibold tracking-[0.15em] sm:tracking-[0.35em] text-ivory/90 uppercase font-cinzel mt-1 sm:mt-2 mb-2 sm:mb-4 text-shadow max-w-full"
        >
          FULL-STACK DEVELOPER & DIGITAL ARCHITECT
        </p>

        {/* Code Snippet Tagline Box */}
        <div
          ref={taglineRef}
          className="max-w-2xl w-full text-[8px] xs:text-[9.5px] sm:text-xs md:text-sm font-mono text-cyan-400/90 tracking-normal xs:tracking-wider mb-4 sm:mb-6 border border-cyan-500/30 rounded py-2 px-3 sm:py-2.5 sm:px-6 bg-slate-900/80 backdrop-blur-md shadow-lg text-center overflow-x-auto overflow-y-hidden"
        >
          <div className="whitespace-nowrap inline-block">
            <span className="text-pink-400">const</span> <span className="text-sky-300">developer</span> = &#123; <span className="text-emerald-400">focus</span>: <span className="text-amber-300">'Clean, Functional & User-Friendly Systems'</span> &#125;;
          </div>
        </div>

        {/* Buttons CTA Grid */}
        <div
          ref={ctaRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-3xl"
        >
          <button
            onClick={handleExploreClick}
            className="w-full py-2.5 sm:py-3 px-2 sm:px-3 inline-flex items-center justify-center font-cinzel font-bold text-[9px] xs:text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] text-obsidian bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 rounded-sm hover:brightness-110 transition-all transform hover:-translate-y-0.5 shadow-cyan-glow uppercase group truncate"
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0 group-hover:rotate-45 transition-transform duration-300 text-obsidian" />
            <span className="truncate">EXPLORE PROJECTS</span>
          </button>

          <a
            href="mailto:balandoy18@gmail.com"
            className="w-full py-2.5 sm:py-3 px-2 sm:px-3 inline-flex items-center justify-center font-cinzel font-bold text-[9px] xs:text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] text-obsidian bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-sm hover:brightness-110 transition-all transform hover:-translate-y-0.5 shadow-cyan-glow uppercase group truncate"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0 text-obsidian group-hover:scale-110 transition-transform" />
            <span className="truncate">HIRE DEVELOPER</span>
          </a>

          <button
            onClick={onOpenEstimator}
            className="w-full py-2.5 sm:py-3 px-2 sm:px-3 inline-flex items-center justify-center font-cinzel font-bold text-[9px] xs:text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] text-cyan-300 bg-slate-900/90 border border-cyan-500/50 rounded-sm hover:bg-cyan-500/20 hover:border-cyan-400 transition-all transform hover:-translate-y-0.5 shadow-lg uppercase backdrop-blur-sm group truncate"
          >
            <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="truncate">ESTIMATOR</span>
          </button>

          <button
            onClick={onOpenResume}
            className="w-full py-2.5 sm:py-3 px-2 sm:px-3 inline-flex items-center justify-center font-cinzel font-bold text-[9px] xs:text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] text-ivory bg-slate-900/90 border border-white/20 rounded-sm hover:bg-cyan-500/20 hover:border-cyan-400 transition-all transform hover:-translate-y-0.5 shadow-lg uppercase backdrop-blur-sm group truncate"
          >
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 shrink-0 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="truncate">PREVIEW CV</span>
          </button>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="hidden sm:flex absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex-col items-center pointer-events-none opacity-80">
        <span className="text-[10px] font-cinzel tracking-[0.3em] text-cyan-400 uppercase mb-1">
          SCROLL TO EXPLORE LORE
        </span>
        <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
}
