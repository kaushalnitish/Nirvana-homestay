import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GalleryItem } from "../types";
import { defaultGallery } from "../data";
import { X, ChevronLeft, ChevronRight, Grid, Eye, Image as ImageIcon } from "lucide-react";

interface GalleryLightboxProps {
  initialItems?: GalleryItem[];
}

export default function GalleryLightbox({ initialItems }: GalleryLightboxProps) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fetch items from our API
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        } else {
          setItems(initialItems || defaultGallery);
        }
      })
      .catch((err) => {
        console.warn("Failed to load gallery items via API, falling back to local data:", err);
        setItems(initialItems || defaultGallery);
      });
  }, [initialItems]);

  const categories = [
    { value: "all", label: "All Stories" },
    { value: "views", label: "Views" },
    { value: "rooms", label: "Suites" },
    { value: "food", label: "Organic Food" },
    { value: "bonfire", label: "Bonfire" },
    { value: "interiors", label: "Interiors" }
  ];

  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <div id="gallery-component-root" className="space-y-8">
      {/* Category Pills Selector */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar px-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-300 border ${
              selectedCategory === cat.value
                ? "bg-brand-green border-brand-green text-white shadow-sm font-medium"
                : "bg-white border-brand-border text-brand-text-sec hover:border-brand-text/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Masonry-Style Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="break-inside-avoid relative group overflow-hidden rounded-2xl bg-white border border-brand-border shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[4/3] sm:aspect-auto">
                <picture className="w-full h-full block">
                  <source srcSet={item.url.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </picture>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-brand-text/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Caption Card Footer */}
              <div className="p-4 border-t border-brand-border">
                <div className="flex items-center justify-between">
                  <h4 className="font-editorial text-lg tracking-wide text-brand-text leading-snug">
                    {item.caption}
                  </h4>
                  <span className="text-[9px] uppercase tracking-widest text-brand-green font-semibold bg-brand-green/5 px-2 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>
                {item.description && (
                  <p className="text-xs text-brand-text-sec mt-1.5 leading-relaxed font-light">
                    {item.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center text-brand-text-sec">
          <ImageIcon className="h-12 w-12 stroke-[1.25] text-brand-text-sec/40 mb-3" />
          <p className="text-sm font-light">No memories recorded in this gallery folder yet.</p>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-brand-text/95 flex flex-col items-center justify-center p-4 md:p-8 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Lightbox Wrapper */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              {/* Navigation arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 h-12 w-12 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 h-12 w-12 rounded-full bg-white/15 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
                aria-label="Next Image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Frame */}
              <motion.div
                key={lightboxIndex}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-bg rounded-2xl overflow-hidden shadow-2xl max-w-full max-h-[70vh] border border-white/10"
              >
                <picture className="w-full h-full block">
                  <source srcSet={filteredItems[lightboxIndex].url.replace(/\.jpg$/, '.webp')} type="image/webp" />
                  <img
                    src={filteredItems[lightboxIndex].url}
                    alt={filteredItems[lightboxIndex].caption}
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                </picture>

                {/* Caption Bar */}
                <div className="bg-white p-5 text-brand-text">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-editorial text-2xl tracking-wide leading-tight text-brand-text">
                      {filteredItems[lightboxIndex].caption}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-brand-green font-semibold bg-brand-green/10 px-2.5 py-1 rounded-full">
                      {filteredItems[lightboxIndex].category}
                    </span>
                  </div>
                  {filteredItems[lightboxIndex].description && (
                    <p className="text-sm text-brand-text-sec font-light leading-relaxed">
                      {filteredItems[lightboxIndex].description}
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Progress counter */}
              <div className="text-white/60 text-xs tracking-wider mt-4">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
