import React, { useState } from 'react';

export default function SideNav({ sections, activeSection, onSelectSection }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end space-y-4 select-none">
      {sections.map((sec, idx) => {
        const isActive = activeSection === idx;
        const isHovered = hoveredIndex === idx;

        return (
          <div
            key={sec.id}
            className="group relative flex items-center cursor-pointer py-1"
            onClick={() => onSelectSection(idx)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip Label */}
            <div
              className={`absolute right-8 px-3 py-1 rounded bg-obsidian/90 border border-cyan-500/40 text-[10px] font-cinzel font-bold tracking-[0.2em] text-cyan-400 whitespace-nowrap transition-all duration-300 shadow-cyan-glow pointer-events-none ${
                isHovered || isActive
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-2'
              }`}
            >
              <span className="text-ivory/60 mr-1.5">0{idx + 1}</span>
              {sec.label}
            </div>

            {/* Indicator Dot & Ring */}
            <div className="relative flex items-center justify-center w-6 h-6">
              {/* Outer Pulsing Ring when Active */}
              <div
                className={`absolute inset-0 rounded-full border border-cyan-400 transition-all duration-500 ${
                  isActive ? 'scale-100 opacity-100 animate-pulse' : 'scale-50 opacity-0'
                }`}
              />

              {/* Inner Dot */}
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2.5 h-2.5 bg-cyan-400 shadow-cyan-glow'
                    : isHovered
                    ? 'w-2 h-2 bg-sky-400'
                    : 'w-1.5 h-1.5 bg-white/30'
                }`}
              />
            </div>
          </div>
        );
      })}

      {/* Vertical Connecting Line */}
      <div className="absolute right-[11px] top-2 bottom-2 w-[1px] bg-white/10 -z-10 pointer-events-none" />
    </div>
  );
}
