import React from 'react';
import { FileText, X, Download, ExternalLink, Mail, ShieldCheck } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col h-[85vh] overflow-hidden text-ivory">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-cinzel text-ivory tracking-wider uppercase">
                CURRICULUM VITAE // VAN JASPER BENZON
              </h3>
              <p className="text-[9px] text-cyan-400 font-cinzel tracking-widest uppercase">
                Full-Stack Developer & Digital Architect
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/Van_Jasper_Benzon_CV.pdf"
              download="Van_Jasper_Benzon_CV.pdf"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-cinzel font-bold tracking-wider hover:bg-cyan-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">DOWNLOAD PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 border border-white/10 text-muted-gray hover:text-cyan-400 hover:border-cyan-400 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer or Fallback Preview */}
        <div className="flex-1 bg-black p-2 sm:p-4 overflow-hidden relative">
          <iframe
            src="/Van_Jasper_Benzon_CV.pdf#toolbar=0"
            title="Van Jasper Benzon CV Preview"
            className="w-full h-full rounded border border-white/10"
          />
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-2.5 bg-slate-900 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-cinzel">
          <span className="text-muted-gray tracking-wider text-[10px]">
            BS IT GRADUATE // SPECIALIZING IN FULL-STACK & POS SYSTEMS
          </span>

          <div className="flex items-center space-x-3">
            <a
              href="mailto:balandoy18@gmail.com"
              className="text-cyan-400 hover:text-cyan-300 text-[11px] tracking-widest font-bold uppercase flex items-center space-x-1"
            >
              <Mail className="w-3.5 h-3.5 mr-1" />
              <span>HIRE DEVELOPER</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
