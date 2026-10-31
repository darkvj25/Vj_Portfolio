import React, { useState, useRef } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { Image, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function MediaGallery() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const containerRef = useRef(null);

  useScrollAnimation(containerRef, { y: 30 });

  const categories = ['ALL', 'World', 'Character', 'Monsters', 'Combat'];

  const filteredItems = activeCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category.toUpperCase() === activeCategory.toUpperCase());

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="snap-section relative min-h-screen lg:h-screen w-full max-w-full flex items-center justify-center bg-gradient-to-b from-obsidian via-charcoal/50 to-obsidian text-ivory overflow-x-hidden overflow-y-auto lg:overflow-hidden border-t border-antique-gold/10 pt-20 pb-8 sm:py-12 lg:py-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 lg:mb-8">
          <div className="inline-flex items-center space-x-2 text-antique-gold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] font-cinzel font-semibold mb-1.5 sm:mb-2 uppercase">
            <Image className="w-4 h-4" />
            <span>VISUAL ARCHIVES</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-black font-cinzel tracking-wider sm:tracking-[0.15em] gold-text-gradient uppercase mb-2 leading-snug">
            MEDIA GALLERY
          </h2>
          <p className="text-xs sm:text-sm text-muted-gray font-cinzel tracking-wider">
            Explore high-resolution screenshots, concept artwork, and action captures from the world of Eclipse.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-cinzel font-bold tracking-[0.2em] uppercase rounded-sm border transition-all duration-300 ${
                  isActive
                    ? 'bg-antique-gold text-obsidian border-antique-gold shadow-gold-glow'
                    : 'bg-obsidian text-ivory/70 border-white/10 hover:border-antique-gold/40 hover:text-ivory'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filteredItems.slice(0, 8).map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-lg overflow-hidden border border-white/10 bg-charcoal hover:border-antique-gold/60 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between p-3">
                  <div className="self-end p-1.5 bg-obsidian/80 rounded-full border border-antique-gold/30">
                    <Maximize2 className="w-3.5 h-3.5 text-antique-gold" />
                  </div>
                  <div>
                    <span className="text-[9px] font-cinzel text-antique-gold font-bold tracking-widest uppercase">
                      {item.category}
                    </span>
                    <h3 className="text-xs font-bold font-cinzel text-ivory uppercase truncate">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 backdrop-blur-xl p-4 sm:p-8 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-charcoal border border-antique-gold/40 text-ivory hover:text-antique-gold hover:border-antique-gold transition-colors z-[110] shadow-lg"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal/80 border border-white/20 text-ivory hover:border-antique-gold hover:text-antique-gold transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-charcoal/80 border border-white/20 text-ivory hover:border-antique-gold hover:text-antique-gold transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="relative max-h-[75vh] overflow-hidden rounded-lg border border-antique-gold/40 shadow-2xl bg-black mb-4">
              <img
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-center max-w-xl">
              <span className="text-xs font-cinzel text-antique-gold font-bold tracking-widest uppercase">
                {filteredItems[selectedImageIndex].category}
              </span>
              <h3 className="text-xl font-bold font-cinzel text-ivory uppercase mt-1">
                {filteredItems[selectedImageIndex].title}
              </h3>
              <p className="text-xs text-muted-gray mt-2 font-inter">
                {filteredItems[selectedImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
