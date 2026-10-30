import React, { useEffect, useState } from 'react';
import Canvas3DLogo from './Canvas3DLogo';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsFading(true), 300);
          setTimeout(() => onComplete && onComplete(), 1000);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-ivory transition-opacity duration-1000 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient from-antique-gold/10 via-obsidian/80 to-obsidian pointer-events-none" />

      {/* 3D Canvas Artifact */}
      <div className="relative z-10 mb-8 scale-90 sm:scale-100">
        <Canvas3DLogo size={220} interactive={false} />
      </div>

      {/* Game Title */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl sm:text-5xl font-black tracking-[0.3em] gold-text-gradient uppercase mb-2 font-cinzel">
          ECLIPSE
        </h1>
        <p className="text-xs sm:text-sm tracking-[0.4em] text-muted-gray uppercase mb-8 font-cinzel">
          AGE OF THE FORGOTTEN
        </p>
      </div>

      {/* Progress Bar Container */}
      <div className="relative z-10 w-64 sm:w-80 flex flex-col items-center">
        <div className="w-full h-[3px] bg-charcoal rounded-full overflow-hidden border border-antique-gold/20 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-blood-red via-antique-gold to-antique-gold-light transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between w-full mt-2 text-[10px] sm:text-xs text-muted-gray tracking-widest font-mono">
          <span>INITIALIZING REALM</span>
          <span className="text-antique-gold">{progress}%</span>
        </div>
      </div>

      <p className="relative z-10 mt-12 text-xs text-ivory/50 tracking-widest italic font-cinzel animate-pulse">
        "When the light fades, legends awaken."
      </p>
    </div>
  );
}
