import React, { useState } from 'react';
import { FileText, X, Download, ExternalLink, Mail, Phone, MapPin, Award, CheckCircle2, Code2, Briefcase, GraduationCap } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' or 'pdf'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/90 backdrop-blur-md p-2 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.25)] flex flex-col h-[90vh] sm:h-[85vh] overflow-hidden text-ivory">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-cyan-500/30">
          <div className="flex items-center space-x-2 shrink-0">
            <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold font-cinzel text-ivory tracking-wider uppercase">
                CURRICULUM VITAE
              </h3>
              <p className="text-[9px] text-cyan-400 font-cinzel tracking-widest uppercase hidden xs:block">
                VAN JASPER BENZON // FULL-STACK DEVELOPER
              </p>
            </div>
          </div>

          {/* View Switcher Tabs & Download Button */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="flex bg-slate-950 rounded p-0.5 border border-white/10 text-[10px] font-cinzel">
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-2.5 py-1 rounded transition-all font-bold uppercase ${
                  viewMode === 'interactive'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                    : 'text-muted-gray hover:text-ivory'
                }`}
              >
                DIGITAL CV
              </button>
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded transition-all font-bold uppercase ${
                  viewMode === 'pdf'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                    : 'text-muted-gray hover:text-ivory'
                }`}
              >
                PDF VIEW
              </button>
            </div>

            <a
              href="/Van_Jasper_Benzon_CV.pdf"
              download="Van_Jasper_Benzon_CV.pdf"
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-[10px] sm:text-xs font-cinzel font-bold tracking-wider hover:bg-cyan-500/30 transition-colors shrink-0"
              title="Download official PDF resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DOWNLOAD PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 border border-white/10 text-muted-gray hover:text-cyan-400 hover:border-cyan-400 transition-colors shrink-0 ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        {viewMode === 'interactive' ? (
          /* Mobile-Optimized Digital Resume View */
          <div className="flex-1 bg-slate-950 p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-200 text-xs font-inter">
            {/* Candidate Identity Banner */}
            <div className="p-4 rounded-lg bg-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[10px] font-cinzel text-cyan-400 tracking-[0.2em] font-bold uppercase block mb-1">
                  BS INFORMATION TECHNOLOGY GRADUATE
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-cinzel text-ivory tracking-wider uppercase">
                  VAN JASPER BENZON
                </h2>
                <p className="text-xs text-muted-gray font-cinzel tracking-wider uppercase mt-0.5">
                  Full-Stack Developer & Digital Architect
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[10px] font-mono text-cyan-300">
                <a
                  href="mailto:balandoy18@gmail.com"
                  className="inline-flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded border border-cyan-500/30 hover:border-cyan-400"
                >
                  <Mail className="w-3 h-3 text-cyan-400" />
                  <span>balandoy18@gmail.com</span>
                </a>
                <a
                  href="tel:+639300930835"
                  className="inline-flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded border border-cyan-500/30 hover:border-cyan-400"
                >
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>+63 930 093 0835</span>
                </a>
                <span className="inline-flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded border border-white/10 text-muted-gray">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>Sorsogon, PH</span>
                </span>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-cyan-400 uppercase flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>EXECUTIVE SUMMARY</span>
              </h4>
              <p className="text-ivory/80 leading-relaxed font-inter">
                Passionate Full-Stack Developer with expertise in building offline-first POS systems, municipal PWAs, database schema optimizations, and custom web applications. Experienced in developing PHP/PDO backend architectures paired with modern React interfaces and local storage engines for shift reconciliations.
              </p>
            </div>

            {/* Core Technical Stack Grid */}
            <div className="space-y-2">
              <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-cyan-400 uppercase flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>TECHNICAL ARSENAL</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900 rounded border border-white/5 space-y-1">
                  <span className="text-[10px] font-cinzel text-cyan-400 font-bold uppercase block">FRONTEND & PWA</span>
                  <p className="font-mono text-ivory">React.js, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3, PWA Service Workers</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-white/5 space-y-1">
                  <span className="text-[10px] font-cinzel text-cyan-400 font-bold uppercase block">BACKEND & DATABASE</span>
                  <p className="font-mono text-ivory">PHP (PDO), MySQL, Node.js, Express, IndexedDB, LocalStorage Engine</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-white/5 space-y-1">
                  <span className="text-[10px] font-cinzel text-cyan-400 font-bold uppercase block">SPECIALIZED LOGIC</span>
                  <p className="font-mono text-ivory">POS Cash Shift Reconciliation, E-Wallet Gateways (GCash/Maya), Inventory Lifecycle</p>
                </div>
                <div className="p-3 bg-slate-900 rounded border border-white/5 space-y-1">
                  <span className="text-[10px] font-cinzel text-cyan-400 font-bold uppercase block">DEVELOPMENT TOOLS</span>
                  <p className="font-mono text-ivory">Git, GitHub, Vite, Postman, Linux CLI, Chart.js, Leaflet JS</p>
                </div>
              </div>
            </div>

            {/* Signature Project Engineering */}
            <div className="space-y-2">
              <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-cyan-400 uppercase flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>KEY PRODUCTION APPLICATIONS</span>
              </h4>
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-900 rounded border border-white/10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h5 className="font-cinzel font-bold text-ivory uppercase text-xs">RetailPOS Pro & PensionPOS Citadel</h5>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">FULL-STACK POS</span>
                  </div>
                  <p className="text-[11px] text-ivory/80 leading-relaxed">
                    Developed web-based retail and hospitality POS applications featuring cash drawer float calculations, inventory deduction logs, e-wallet receipt auditing, and PDF invoice generators.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900 rounded border border-white/10 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <h5 className="font-cinzel font-bold text-ivory uppercase text-xs">Irosin Communal Resource & Map PWA</h5>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">CIVIC PWA</span>
                  </div>
                  <p className="text-[11px] text-ivory/80 leading-relaxed">
                    Engineered a Progressive Web App for local government communal venue reservations and Leaflet JS map-based resource tracking across 28 barangays with offline request caching.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-cyan-400 uppercase flex items-center space-x-1.5 border-b border-white/10 pb-1">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>EDUCATION & SPECIALIZATION</span>
              </h4>
              <div className="p-3.5 bg-slate-900 rounded border border-white/10 flex justify-between items-center">
                <div>
                  <h5 className="font-cinzel font-bold text-ivory uppercase text-xs">Bachelor of Science in Information Technology (BS IT)</h5>
                  <p className="text-[10px] text-muted-gray">Specialization in Web Development & Software Systems</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-1 rounded border border-emerald-500/30">
                  GRADUATE
                </span>
              </div>
            </div>

            {/* Direct PDF Link Banner */}
            <div className="p-4 rounded bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <p className="font-cinzel font-bold text-cyan-300 uppercase text-xs">NEED THE OFFICIAL PRINTABLE PDF RESUME?</p>
                <p className="text-[10px] text-muted-gray font-mono mt-0.5">Download official PDF or open in a new browser tab directly.</p>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href="/Van_Jasper_Benzon_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-slate-800 border border-cyan-500/40 text-cyan-300 text-[10px] font-cinzel font-bold uppercase hover:bg-cyan-500/20 transition-all inline-flex items-center space-x-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>OPEN TAB</span>
                </a>
                <a
                  href="/Van_Jasper_Benzon_CV.pdf"
                  download="Van_Jasper_Benzon_CV.pdf"
                  className="px-4 py-1.5 rounded bg-gradient-to-r from-sky-400 to-cyan-400 text-obsidian text-[10px] font-cinzel font-bold uppercase hover:brightness-110 transition-all inline-flex items-center space-x-1 shadow-cyan-glow"
                >
                  <Download className="w-3 h-3 text-obsidian" />
                  <span>DOWNLOAD PDF</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Embedded PDF Viewer View */
          <div className="flex-1 bg-black p-2 sm:p-4 overflow-hidden relative flex flex-col items-center justify-center">
            <iframe
              src="/Van_Jasper_Benzon_CV.pdf#toolbar=0"
              title="Van Jasper Benzon CV Preview"
              className="w-full h-full rounded border border-white/10 hidden sm:block"
            />

            {/* Mobile Fallback Card when PDF tab is selected on small screens */}
            <div className="block sm:hidden text-center p-6 bg-slate-900 rounded-lg border border-cyan-500/40 max-w-sm space-y-4">
              <FileText className="w-10 h-10 text-cyan-400 mx-auto" />
              <div>
                <h4 className="font-cinzel font-bold text-ivory uppercase text-sm">MOBILE PDF VIEWER</h4>
                <p className="text-xs text-muted-gray mt-1">
                  Mobile browsers do not support rendering inline PDF frames natively. Please open the PDF in a new tab or view the Digital CV.
                </p>
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <a
                  href="/Van_Jasper_Benzon_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded bg-cyan-400 text-obsidian font-cinzel font-bold text-xs uppercase flex items-center justify-center space-x-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>OPEN PDF IN NEW TAB</span>
                </a>
                <button
                  onClick={() => setViewMode('interactive')}
                  className="w-full py-2.5 rounded bg-slate-800 border border-white/10 text-cyan-300 font-cinzel font-bold text-xs uppercase"
                >
                  SWITCH TO DIGITAL CV
                </button>
              </div>
            </div>
          </div>
        )}

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

