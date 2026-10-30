import React, { useState, useRef } from 'react';
import { GAMEPLAY_FEATURES } from '../data/features';
import { Compass, Swords, Hammer, Target, Users, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function GameplayFeatures() {
  const [activeFeature, setActiveFeature] = useState(GAMEPLAY_FEATURES[0]);
  const containerRef = useRef(null);

  useScrollAnimation(containerRef, { y: 30 });

  const getFeatureIcon = (icon) => {
    switch (icon) {
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Swords': return <Swords className="w-5 h-5" />;
      case 'Hammer': return <Hammer className="w-5 h-5" />;
      case 'Target': return <Target className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <Swords className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="gameplay"
      ref={containerRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center bg-gradient-to-b from-obsidian via-charcoal/40 to-obsidian text-ivory overflow-x-hidden overflow-y-auto lg:overflow-hidden border-t border-antique-gold/10 pt-16 pb-8 sm:py-12 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 text-antique-gold text-[9px] xs:text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-cinzel font-semibold mb-1 sm:mb-2 uppercase">
            <Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>CHAPTER 05 // NEXT-GEN GAMEPLAY MECHANICS</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-black font-cinzel tracking-wider sm:tracking-[0.15em] gold-text-gradient uppercase mb-1.5 sm:mb-2 leading-snug">
            GAMEPLAY FEATURES
          </h2>
          <p className="text-[11px] sm:text-sm text-muted-gray font-cinzel tracking-wider max-w-xl mx-auto">
            Built from the ground up for deep tactical combat, fluid traversal, and unmatched cooperative depth.
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mb-4 sm:mb-6">
          {GAMEPLAY_FEATURES.map((feat) => {
            const isActive = activeFeature.id === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => setActiveFeature(feat)}
                className={`inline-flex items-center space-x-1.5 px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5 rounded-sm font-cinzel text-[10px] xs:text-xs font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-all duration-300 border ${
                  isActive
                    ? 'bg-antique-gold text-obsidian border-antique-gold shadow-gold-glow scale-105'
                    : 'bg-obsidian/80 text-ivory/70 border-white/10 hover:border-antique-gold/50 hover:text-ivory'
                }`}
              >
                <span>{getFeatureIcon(feat.icon)}</span>
                <span className="text-[10px] sm:text-xs">{feat.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center bg-charcoal/80 rounded-xl overflow-hidden border border-antique-gold/30 p-3.5 xs:p-5 sm:p-8 shadow-cinematic">
          {/* Feature Image */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black">
              <img
                src={activeFeature.image}
                alt={activeFeature.title}
                className="w-full h-[180px] xs:h-[220px] sm:h-[340px] lg:h-[380px] object-cover object-center transform group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
            </div>
          </div>

          {/* Feature Details */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <div>
              <span className="text-[9px] sm:text-xs font-cinzel tracking-[0.25em] sm:tracking-[0.3em] text-antique-gold font-bold uppercase block mb-0.5">
                {activeFeature.subtitle}
              </span>
              <h3 className="text-lg xs:text-xl sm:text-3xl font-black font-cinzel text-ivory tracking-wider uppercase">
                {activeFeature.title}
              </h3>
            </div>

            <p className="text-[11px] sm:text-xs text-ivory/80 leading-relaxed font-inter">
              {activeFeature.description}
            </p>

            {/* Highlights Bullet List */}
            <div className="space-y-2 pt-1 sm:pt-2">
              {activeFeature.highlights.map((item, hIdx) => (
                <div key={hIdx} className="flex items-center space-x-2 text-[11px] sm:text-xs font-cinzel text-ivory/90">
                  <CheckCircle className="w-3.5 h-3.5 text-antique-gold shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
