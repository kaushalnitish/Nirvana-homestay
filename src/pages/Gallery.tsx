import React from "react";
import { motion } from "motion/react";
import GalleryLightbox from "../components/GalleryLightbox";
import ScrollReveal from "../components/ScrollReveal";
import { Sparkles, Camera } from "lucide-react";

export default function Gallery() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-brand-bg min-h-screen pb-24"
    >
      {/* Premium Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-brand-border bg-white">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-green filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-brand-green">
            <Camera className="h-4.5 w-4.5 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Visual Diary</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-7xl tracking-tight text-brand-text">
            Capturing the Mist & Warmth.
          </h1>
          <p className="text-sm sm:text-base text-brand-text-sec font-light max-w-xl mx-auto leading-relaxed">
            A visual journal of cozy fireplaces, misty valley mornings, organic delicacies, and peaceful forest trials recorded on-site at Nirvana.
          </p>
        </div>
      </section>

      {/* Main Gallery Workspace Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-brand-border shadow-xs">
            <GalleryLightbox />
          </div>
        </ScrollReveal>
      </section>
    </motion.div>
  );
}
