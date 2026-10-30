import React from 'react';
import { Shield, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian text-ivory border-t border-antique-gold/20 pt-8 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          {/* Developer Identity */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full border border-antique-gold/40 bg-obsidian shadow-gold-glow">
                <Shield className="w-4 h-4 text-antique-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg font-bold tracking-[0.2em] text-ivory">
                  VAN JASPER BENZON
                </span>
                <span className="font-cinzel text-[9px] tracking-[0.3em] text-antique-gold-light">
                  FULL-STACK DEVELOPER // PHILIPPINES
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-gray leading-relaxed font-inter max-w-md">
              Specializing in PHP, MySQL, JavaScript, Java, and Progressive Web Applications. Building clean, user-friendly digital experiences.
            </p>
          </div>

          {/* Quick Contact Specs */}
          <div className="md:col-span-6 space-y-2 text-xs font-cinzel text-muted-gray">
            <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-antique-gold uppercase mb-2">
              DIRECT CONTACT
            </h4>
            <p className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-antique-gold" />
              <span className="text-ivory font-mono">balandoy18@gmail.com</span>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-antique-gold" />
              <span className="text-ivory font-mono">+63 930 093 0835 | +63 992 261 1995</span>
            </p>
            <p className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-antique-gold" />
              <span className="text-ivory">Purok 2, Gabao, Irosin, Sorsogon, Philippines</span>
            </p>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] font-cinzel text-muted-gray tracking-widest gap-2">
          <p>© 2025 VAN JASPER BENZON. ALL RIGHTS RESERVED.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-2 text-antique-gold hover:text-antique-gold-light transition-colors"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
