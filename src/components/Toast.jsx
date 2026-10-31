import React from 'react';
import { CheckCircle2, Copy } from 'lucide-react';

export default function Toast({ message, visible }) {
  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-2.5 bg-slate-900/95 border border-cyan-400 text-ivory rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.5)] backdrop-blur-md text-xs font-mono animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
      <span className="font-semibold text-cyan-300">{message}</span>
    </div>
  );
}
