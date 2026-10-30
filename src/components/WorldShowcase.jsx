import React, { useState, useRef } from 'react';
import { SKILLS } from '../data/skills';
import { Code, Server, Database, Cpu, Eye, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function WorldShowcase() {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS[0]);
  const containerRef = useRef(null);

  useScrollAnimation(containerRef, { y: 30 });

  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-antique-gold" />;
      case 'Server': return <Server className="w-5 h-5 text-antique-gold" />;
      case 'Database': return <Database className="w-5 h-5 text-antique-gold" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-antique-gold" />;
      default: return <Code className="w-5 h-5 text-antique-gold" />;
    }
  };

  return (
    <section
      id="world"
      ref={containerRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center bg-obsidian text-ivory overflow-x-hidden overflow-y-auto lg:overflow-hidden border-t border-antique-gold/10 pt-20 pb-8 sm:py-12 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center space-x-2 text-antique-gold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-cinzel font-semibold mb-1.5 sm:mb-2 uppercase">
            <Cpu className="w-4 h-4" />
            <span>CHAPTER 02 // TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black font-cinzel tracking-wider sm:tracking-[0.15em] gold-text-gradient uppercase mb-2 leading-snug">
            SKILLS & EXPERTISE
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray font-cinzel tracking-wider max-w-xl mx-auto">
            Explore Van Jasper Benzon's mastered frontend, backend, database, and system integration weaponry.
          </p>
        </div>

        {/* Featured Active Skill Hero Card */}
        <div className="relative mb-4 sm:mb-6 rounded-xl overflow-hidden border border-antique-gold/30 bg-charcoal p-4 xs:p-5 sm:p-8 shadow-cinematic">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Skill Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="p-2 bg-obsidian/80 border border-antique-gold/30 rounded">
                  {getSkillIcon(selectedSkill.icon)}
                </span>
                <span className="text-xs font-cinzel tracking-[0.3em] text-antique-gold font-bold uppercase">
                  {selectedSkill.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-ivory tracking-wider uppercase">
                {selectedSkill.name}
              </h3>

              <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed font-inter">
                {selectedSkill.description}
              </p>

              <div className="p-3 bg-obsidian/60 rounded border border-white/10">
                <p className="text-[10px] font-cinzel text-muted-gray tracking-widest uppercase">TECH STACK SUMMARY</p>
                <p className="text-xs font-semibold text-antique-gold mt-1 font-mono">{selectedSkill.tagline}</p>
              </div>
            </div>

            {/* Proficiency Breakdown List */}
            <div className="lg:col-span-6 bg-obsidian/80 rounded-lg p-5 border border-white/10 space-y-3">
              <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-antique-gold uppercase mb-2">
                PROFICIENCY MATRIX
              </h4>

              {selectedSkill.items.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-cinzel">
                    <span className="text-ivory font-semibold">{item.title}</span>
                    <span className="text-antique-gold">{item.prof}</span>
                  </div>
                  <div className="w-full h-1.5 bg-charcoal rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-antique-gold-dark via-antique-gold to-antique-gold-light rounded-full"
                      style={{ width: item.prof }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Selection Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((sk) => {
            const isSelected = selectedSkill.id === sk.id;
            return (
              <div
                key={sk.id}
                onClick={() => setSelectedSkill(sk)}
                className={`relative rounded-lg cursor-pointer border transition-all duration-300 p-4 bg-charcoal/80 hover:bg-charcoal ${
                  isSelected
                    ? 'border-antique-gold shadow-gold-glow scale-[1.02]'
                    : 'border-white/10 hover:border-antique-gold/40'
                }`}
              >
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className="p-1.5 bg-obsidian/80 rounded border border-antique-gold/30">
                    {getSkillIcon(sk.icon)}
                  </div>
                  <span className="text-[10px] font-cinzel font-bold text-antique-gold tracking-widest">
                    {sk.level}
                  </span>
                </div>

                <h4 className="text-xs font-bold font-cinzel tracking-wider text-ivory uppercase truncate">
                  {sk.name}
                </h4>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-cinzel text-antique-gold">
                  <span>{isSelected ? 'ACTIVE' : 'SELECT'}</span>
                  <Eye className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
