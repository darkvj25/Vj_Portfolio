import React, { useRef } from 'react';
import { Mail, Phone, MapPin, Send, Shield, ArrowUp, Calculator, FileText, Zap } from 'lucide-react';
import Canvas3DLogo from './Canvas3DLogo';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function CallToAction({ onOpenEstimator, onOpenResume, onOpenPos, onShowToast }) {
  const containerRef = useRef(null);

  useScrollAnimation(containerRef, { y: 20 });

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('balandoy18@gmail.com');
    if (onShowToast) onShowToast('📋 Copied email (balandoy18@gmail.com) to clipboard!');
  };

  const handleCopyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('+639300930835');
    if (onShowToast) onShowToast('📋 Copied phone (+63 930 093 0835) to clipboard!');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative min-h-screen w-full max-w-full flex flex-col justify-between bg-obsidian text-ivory overflow-x-hidden overflow-y-auto border-t border-cyan-500/20 pt-20 pb-6 lg:py-8 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image with Dramatic Shimmer Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop"
          alt="Developer Contact"
          className="w-full h-full object-cover object-center filter brightness-40 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto relative z-10 text-center flex flex-col items-center w-full my-auto py-4">
        {/* Compact 3D Artifact */}
        <div className="mb-2 scale-75 sm:scale-85">
          <Canvas3DLogo size={130} interactive={true} />
        </div>

        <span className="text-[10px] sm:text-xs font-cinzel tracking-[0.3em] text-cyan-400 font-bold uppercase mb-1.5">
          READY TO FORGE YOUR NEXT DIGITAL REALM
        </span>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-cinzel tracking-[0.15em] cyan-text-gradient uppercase mb-2 leading-tight">
          VAN JASPER BENZON
        </h2>

        <p className="max-w-2xl text-[11px] sm:text-xs text-ivory/80 font-cinzel tracking-wider uppercase mb-5 leading-relaxed border-y border-cyan-500/20 py-2 px-4 bg-obsidian/50 backdrop-blur-md">
          Open for full-time web developer roles, internships, freelance POS development, and system collaborations.
        </p>

        {/* Contact Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-2xl mb-5">
          <div
            onClick={handleCopyEmail}
            className="p-2.5 bg-charcoal/80 border border-cyan-500/30 rounded flex flex-col items-center hover:border-cyan-400 transition-colors group cursor-pointer"
            title="Click to copy email address"
          >
            <Mail className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">EMAIL (CLICK TO COPY)</span>
            <span className="text-[11px] font-semibold text-ivory mt-0.5 font-mono">balandoy18@gmail.com</span>
          </div>

          <div
            onClick={handleCopyPhone}
            className="p-2.5 bg-charcoal/80 border border-cyan-500/30 rounded flex flex-col items-center hover:border-cyan-400 transition-colors group cursor-pointer"
            title="Click to copy phone number"
          >
            <Phone className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">PHONE (CLICK TO COPY)</span>
            <span className="text-[11px] font-semibold text-ivory mt-0.5 font-mono">+63 930 093 0835</span>
          </div>

          <div className="p-2.5 bg-charcoal/80 border border-cyan-500/30 rounded flex flex-col items-center">
            <MapPin className="w-4 h-4 text-cyan-400 mb-1" />
            <span className="text-[9px] font-cinzel text-muted-gray tracking-widest uppercase">LOCATION</span>
            <span className="text-[11px] font-semibold text-ivory mt-0.5">Sorsogon, Philippines</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 w-full max-w-xl">
          <button
            onClick={onOpenPos}
            className="inline-flex items-center justify-center px-4 py-2.5 font-cinzel font-bold text-[11px] tracking-[0.15em] text-emerald-300 bg-slate-900 border border-emerald-500/50 rounded-sm hover:bg-emerald-500/20 transition-all uppercase shadow-lg group"
          >
            <Zap className="w-3.5 h-3.5 mr-1.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>POS SIMULATOR</span>
          </button>

          <button
            onClick={onOpenEstimator}
            className="inline-flex items-center justify-center px-4 py-2.5 font-cinzel font-bold text-[11px] tracking-[0.15em] text-cyan-300 bg-slate-900 border border-cyan-500/50 rounded-sm hover:bg-cyan-500/20 transition-all uppercase shadow-lg group"
          >
            <Calculator className="w-3.5 h-3.5 mr-1.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>ESTIMATOR</span>
          </button>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center justify-center px-4 py-2.5 font-cinzel font-bold text-[11px] tracking-[0.15em] text-ivory bg-slate-900 border border-white/20 rounded-sm hover:bg-cyan-500/20 transition-all uppercase shadow-lg group"
          >
            <FileText className="w-3.5 h-3.5 mr-1.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>PREVIEW CV</span>
          </button>

          <a
            href="mailto:balandoy18@gmail.com"
            className="inline-flex items-center justify-center px-5 py-2.5 font-cinzel font-bold text-[11px] tracking-[0.15em] text-obsidian bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 rounded-sm hover:brightness-110 transition-all transform hover:-translate-y-0.5 shadow-cyan-glow uppercase group"
          >
            <Send className="w-3.5 h-3.5 mr-1.5 text-obsidian group-hover:translate-x-1 transition-transform" />
            <span>SEND INQUIRY</span>
          </a>
        </div>
      </div>

      {/* Integrated Compact Footer Bar */}
      <footer className="relative z-10 w-full max-w-5xl mx-auto pt-4 border-t border-white/10 mt-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-cinzel text-muted-gray tracking-widest gap-2">
          <div className="flex items-center space-x-2">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-ivory font-bold">VAN JASPER BENZON</span>
            <span>// FULL-STACK DEVELOPER</span>
          </div>

          <p>© 2025 ALL RIGHTS RESERVED.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </footer>
    </section>
  );
}
