import React from "react";
import { motion } from "motion/react";
import ScrollReveal from "../components/ScrollReveal";
import { 
  MapPin, Clock, Compass, Phone, Mail, Award, Navigation, Map, ShieldCheck 
} from "lucide-react";

export default function Location() {
  const transits = [
    {
      title: "Pathankot Railway Station",
      distance: "118 km",
      duration: "Approx. 3.5 hours",
      desc: "This is the nearest major broad-gauge rail terminus. From here, you can book a scenic mountain cab or enjoy a local government bus trip directly to Chamba."
    },
    {
      title: "Kangra Airport (Gaggal / DHM)",
      distance: "120 km",
      duration: "Approx. 4 hours",
      desc: "Connects via daily commercial flights from Delhi. We can pre-arrange high-comfort mountain private cabs to pick you up directly from the terminal."
    },
    {
      title: "Chamba Local Bus Terminus",
      distance: "3.5 km",
      duration: "Approx. 8 minutes",
      desc: "Local public transport coaches connect Chamba with major cities like Dharamshala, Shimla, Chandigarh, and Delhi. Taxis are instantly available on arrival, or you can request us for a pickup!"
    }
  ];

  const highlights = [
    {
      title: "Secluded, yet Accessible",
      desc: "Nirvana is positioned in a serene mountain fold, completely escaping Chamba town's concrete noise, but remains just a quick 8-minute drive from the town market."
    },
    {
      title: "Surrounded by Forest Walks",
      desc: "Step directly out of our garden into community-protected deodar and pine forest paths, perfect for quiet sunrise walks and local bird watching."
    },
    {
      title: "Panoramic Mountain Views",
      desc: "The property faces the snow-capped mountains directly. On misty mornings, clouds float around the decks, giving a feeling of pure elevation."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-brand-bg min-h-screen pb-24"
    >
      {/* Premium Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-brand-border bg-white">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-green filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-brand-green">
            <MapPin className="h-4.5 w-4.5 animate-bounce" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Coordinates & Sanctuary</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-7xl tracking-tight text-brand-text">
            Find Your Way to Peace.
          </h1>
          <p className="text-sm sm:text-base text-brand-text-sec font-light max-w-xl mx-auto leading-relaxed">
            Nestled inside a quiet mountain pocket of Chamba, Nirvana remains easily reachable via spectacular mountain highways, commercial rail, or flights.
          </p>
        </div>
      </section>

      {/* Main Location Content with Map */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Transport list */}
        <div className="lg:col-span-5 space-y-8">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Transit Guides</span>
                <h2 className="font-editorial text-4xl tracking-tight text-brand-text leading-tight">Wandering the Scenic Paths.</h2>
                <p className="text-xs text-brand-text-sec font-light leading-relaxed">
                  The journey to Nirvana is part of the retreat experience itself—passing through rising mist, mountain bridges, and deep river gorges.
                </p>
              </div>

              {/* Transit list */}
              <div className="space-y-6">
                {transits.map((trans, idx) => (
                  <div key={idx} className="border-l-2 border-brand-green pl-5 py-0.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text leading-none">
                        {trans.title}
                      </h4>
                      <span className="text-[9px] font-mono font-bold bg-brand-green/5 text-brand-green px-2 py-0.5 rounded-full shrink-0">
                        {trans.distance}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-text-sec font-light flex items-center gap-1">
                      <Clock className="h-3 w-3 text-brand-green" />
                      <span>Est. Duration: {trans.duration}</span>
                    </p>
                    <p className="text-xs text-brand-text-sec font-light leading-relaxed">
                      {trans.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column: Interactive Map & Highlights */}
        <div className="lg:col-span-7 space-y-8">
          <ScrollReveal direction="right" delay={0.15}>
            <div className="space-y-6">
              {/* Interactive Embedded Google Map Container */}
              <div className="rounded-3xl overflow-hidden border border-brand-border h-96 sm:h-[450px] bg-white shadow-xs relative">
                <iframe
                  title="Nirvana Homestay Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13485.493010775836!2d76.12513411782223!3d32.5562215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391c953500000001%3A0xc48c90be6b38c64d!2sChamba%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1719234900000!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Coordinates block */}
              <div className="bg-white border border-brand-border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-brand-text-sec block">Physical Address</span>
                  <span className="text-xs font-semibold text-brand-text">Hardaspura, Chamba, Himachal Pradesh, 176310</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Chamba,+Himachal+Pradesh"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-brand-green hover:bg-brand-green-hover text-white text-[10px] uppercase tracking-widest font-bold py-3 px-5 rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Open in Navigation</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Location Highlights Section */}
      <section className="py-20 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="max-w-xl space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Local Environment</span>
              <h2 className="font-editorial text-4xl tracking-tight text-brand-text">Location Highlights.</h2>
              <p className="text-xs sm:text-sm text-brand-text-sec font-light">
                Why our specific coordinates provide the ultimate, pristine mountain escape experience.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((high, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.12} duration={0.8}>
                <div className="border border-brand-border rounded-2xl p-6 bg-brand-bg/25 space-y-3">
                  <span className="h-8 w-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center font-mono text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <h3 className="font-editorial text-2xl text-brand-text tracking-wide leading-tight mt-1">{high.title}</h3>
                  <p className="text-xs text-brand-text-sec leading-relaxed font-light">{high.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
