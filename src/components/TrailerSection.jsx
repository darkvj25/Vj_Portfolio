import React, { useState, useRef } from 'react';
import { Play, Film, X, MonitorPlay } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function TrailerSection({ isTrailerOpen, onOpenTrailer, onCloseTrailer }) {
  const containerRef = useRef(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useScrollAnimation(containerRef, { y: 30 });

  const demos = [
    {
      id: 'demo1',
      title: 'DEMO REEL 01',
      subtitle: 'PRIMARY SYSTEM OVERVIEW',
      description: 'Comprehensive walkthrough of full-stack workflow and core capabilities.',
      src: '/images/demo/demo.mp4',
      poster: '/images/samlou_dash.png',
      badge: 'DEMO 01',
    },
    {
      id: 'demo2',
      title: 'DEMO REEL 02',
      subtitle: 'EXTENDED FEATURE DEMO',
      description: 'Deep dive into interactive features, responsive design, and user interactions.',
      src: '/images/demo/demo_2.mp4',
      poster: '/images/ice_login.png',
      badge: 'DEMO 02',
    },
    {
      id: 'demo3',
      title: 'DEMO REEL 03',
      subtitle: 'APPLICATION WORKFLOW',
      description: 'Live demonstration of end-to-end functionality and system architecture.',
      src: '/images/demo/demo_3.mp4',
      poster: '/images/pos_terminal.png',
      badge: 'DEMO 03',
    },
    {
      id: 'demo4',
      title: 'DEMO REEL 04',
      subtitle: 'LIVE PERFORMANCE DEMO',
      description: 'Real-time performance, responsive interactions, and interface showcases.',
      src: '/images/demo/demo_4.mp4',
      poster: '/images/pension_grid.png',
      badge: 'DEMO 04',
    },
  ];

  const handleCardClick = (index) => {
    setActiveVideoIndex(index);
    if (onOpenTrailer) {
      onOpenTrailer();
    }
  };

  return (
    <section
      id="trailer"
      ref={containerRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center bg-obsidian text-ivory overflow-x-hidden overflow-y-auto lg:overflow-hidden border-t border-antique-gold/10 py-12 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-8">
          <div className="inline-flex items-center space-x-2 text-antique-gold text-xs tracking-[0.3em] font-cinzel font-semibold mb-2 uppercase">
            <Film className="w-4 h-4" />
            <span>PROJECT PRESENTATION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-cinzel tracking-[0.15em] gold-text-gradient uppercase mb-2">
            SYSTEM DEMOS & PRESENTATIONS
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray font-cinzel tracking-wider">
            Explore video demonstrations showcasing real-time full-stack applications, interactive UI, and system workflows.
          </p>
        </div>

        {/* 4-Column Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {demos.map((demo, idx) => (
            <div
              key={demo.id}
              onClick={() => handleCardClick(idx)}
              className="relative rounded-xl overflow-hidden border border-antique-gold/40 hover:border-antique-gold/80 shadow-lg cursor-pointer group bg-charcoal transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-[180px] xs:h-[220px] sm:h-[230px] lg:h-[260px] w-full overflow-hidden">
                {/* Real-time Video Frame Thumbnail Preview */}
                <video
                  src={`${demo.src}#t=0.5`}
                  preload="metadata"
                  muted
                  playsInline
                  poster={demo.poster}
                  className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/20" />

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-obsidian/90 border border-antique-gold/50 rounded-full text-[9px] font-cinzel font-bold text-antique-gold tracking-widest">
                  {demo.badge}
                </div>

                {/* Glowing Play Button Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                  <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-antique-gold border-2 border-ivory text-obsidian shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 fill-obsidian text-obsidian" />
                  </div>

                  <span className="mt-2.5 text-xs font-cinzel font-bold tracking-[0.2em] text-ivory uppercase group-hover:text-antique-gold transition-colors truncate max-w-full px-1">
                    {demo.title}
                  </span>
                  <span className="text-[9px] font-cinzel text-muted-gray tracking-widest mt-0.5 truncate max-w-full px-1">
                    {demo.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Lightbox Overlay */}
      {isTrailerOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian/95 backdrop-blur-xl p-4 sm:p-8 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={onCloseTrailer}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-charcoal border border-antique-gold/40 text-ivory hover:text-antique-gold hover:border-antique-gold transition-colors z-[110] shadow-lg"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Switcher Tabs in Modal */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 z-50 max-w-4xl px-8">
            {demos.map((demo, idx) => {
              const isActive = activeVideoIndex === idx;
              return (
                <button
                  key={demo.id}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-cinzel text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                    isActive
                      ? 'bg-antique-gold text-obsidian border-antique-gold shadow-gold-glow'
                      : 'bg-charcoal/90 text-ivory/80 border-white/20 hover:border-antique-gold/60 hover:text-ivory'
                  }`}
                >
                  <MonitorPlay className="w-3.5 h-3.5" />
                  <span>{demo.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Video Player Box */}
          <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-antique-gold/40 shadow-2xl bg-black">
            <video
              key={demos[activeVideoIndex].src}
              src={demos[activeVideoIndex].src}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          </div>

          <div className="mt-3 text-center">
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-antique-gold tracking-widest uppercase">
              {demos[activeVideoIndex].title} — {demos[activeVideoIndex].subtitle}
            </h3>
            <p className="text-xs text-muted-gray font-inter mt-0.5 max-w-xl mx-auto">
              {demos[activeVideoIndex].description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
