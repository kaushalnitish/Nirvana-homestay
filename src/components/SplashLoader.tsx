import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SplashLoaderProps {
  onComplete: () => void;
}

export default function SplashLoader({ onComplete }: SplashLoaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600); // Wait for exit animation
    }, 1500); // 1.5s max as requested

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="splash-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-bg text-brand-text"
        >
          {/* Main Logo & Text Reveal */}
          <div className="flex flex-col items-center text-center px-6">
            <motion.div
              id="splash-logo-line"
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-[1px] bg-brand-green mb-6"
            />
            
            <motion.h1
              id="splash-title"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-editorial text-4xl sm:text-5xl tracking-widest text-brand-text mb-2 font-light"
            >
              N I R V A N A
            </motion.h1>

            <motion.p
              id="splash-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xs uppercase tracking-[0.25em] text-brand-text-sec"
            >
              Mountain Stay • Chamba
            </motion.p>
          </div>

          {/* Minimal Silhouette Reveal */}
          <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden flex items-end justify-center pointer-events-none">
            <motion.svg
              id="splash-silhouette"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 0.08 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="w-full max-w-lg h-24 fill-brand-green"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
            >
              <path d="M0 20 L20 12 L35 16 L50 8 L65 14 L80 10 L100 20 Z" />
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
