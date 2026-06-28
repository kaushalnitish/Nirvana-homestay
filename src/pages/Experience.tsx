import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { attractions, experiences } from "../data";
import ScrollReveal from "../components/ScrollReveal";
import { 
  Trees, Clock, Check, Sparkles, MapPin, Compass, ShieldCheck, HelpCircle, Heart, Utensils, Mountain, Moon, Coffee, ArrowRight
} from "lucide-react";

export default function Experience() {
  const adventures = [
    {
      title: "Guided Forest Trekking",
      level: "Moderate",
      duration: "4 Hours",
      description: "Explore secret foraging paths under giant cedar canopies with our local naturalist guide, including wild berry picking."
    },
    {
      title: "Chamera Lake Kayaking & Rafting",
      level: "All Levels",
      duration: "2-3 Hours",
      description: "Paddle across pristine glacial water valleys with certified local guides and premium high-performance kayaks."
    },
    {
      title: "Astro-Tourism Star Gazing",
      level: "Relaxed",
      duration: "Every Clear Night",
      description: "Gaze at deep space constellations, shooting meteors, and the bright arm of the Milky Way from our high-altitude telescope deck."
    }
  ];

  const culturalExperiences = [
    {
      title: "Chamba Handloom Weaving",
      desc: "Learn traditional wool-weaving and carpet embroidery from 3rd generation Himachali artisans using native cedarwood looms."
    },
    {
      title: "Organic Farm Cooking Lessons",
      desc: "Harvest fresh mountain herbs, local mustard greens, and construct traditional wood-fire Chamba Chukh sauce from scratch with our private chef."
    },
    {
      title: "Laxmi Narayan Temple Architectural Tour",
      desc: "An exclusive historical walk inside 10th-century temples, discovering complex stone carving and ancient copper-plate inscriptions."
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
      {/* Cinematic Header */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-brand-border bg-white">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-green filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-brand-green">
            <Compass className="h-4.5 w-4.5 animate-spin-slow" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Curated Mountain Life</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-7xl tracking-tight text-brand-text">
            Bespoke Stays & Soul Trails.
          </h1>
          <p className="text-sm sm:text-base text-brand-text-sec font-light max-w-xl mx-auto leading-relaxed">
            Slow down and immerse your senses in aromatic cedar forests, fresh glacial rivers, organic farming, and deep night silences.
          </p>
        </div>
      </section>

      {/* 1. Core Curated Experiences Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div className="max-w-xl space-y-3">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Everyday Magic</span>
          <h2 className="font-editorial text-4xl sm:text-5xl tracking-tight text-brand-text">Chalet Activities.</h2>
          <p className="text-xs sm:text-sm text-brand-text-sec font-light">
            Crafted for pure, serene, sensory-focused living. These experiences are fully included in your stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.1} duration={0.8}>
              <div className="bg-white border border-brand-border rounded-3xl overflow-hidden shadow-xs hover:shadow-sm grid grid-cols-1 sm:grid-cols-12 h-full">
                <div className="sm:col-span-5 h-56 sm:h-auto overflow-hidden bg-gray-100">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="sm:col-span-7 p-6 md:p-8 flex flex-col justify-center space-y-3">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-brand-green bg-brand-green/5 px-2.5 py-1 rounded-full border border-brand-green/10 self-start">
                    {exp.highlight}
                  </span>
                  <h3 className="font-editorial text-2xl tracking-wide text-brand-text font-medium">{exp.title}</h3>
                  <p className="text-xs text-brand-text-sec leading-relaxed font-light">{exp.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 2. Premium Organic Dining Experience Section */}
      <section className="py-24 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-brand-green">
                  <Utensils className="h-4.5 w-4.5" />
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em]">The Feast Table</span>
                </div>
                <h2 className="font-editorial text-4xl sm:text-5xl tracking-tight text-brand-text">
                  Honest Farm-to-Table Gastronomy.
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-brand-text-sec leading-relaxed font-light">
                  <p>
                    At Nirvana, food is sacred medicine. We harvest fresh ingredients directly from our surrounding valleys and organic community farms.
                  </p>
                  <p>
                    Every morning begins with warm buttermilk pancakes, wood-pressed apple juice, and mountain forest honey. For dinner, we serve our legendary <strong>Himachali Dham</strong>—a slow-cooked heritage feast prepared in brass pots over cedar coals.
                  </p>
                  <p>
                    Our kitchen is completely tailored to you. Whether you require gluten-free bread, purely organic vegan dishes, or curated child-friendly meals, our private chef has you covered.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Dining perks lists */}
            <ScrollReveal direction="up" delay={0.25}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-brand-border/60">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wide">Foraged Teas</h4>
                    <p className="text-[10px] text-brand-text-sec font-light">Wild cedar bark, pine leaf, and sweet honey infusion.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-brand-green mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wide">Brass Pot Slow Cooking</h4>
                    <p className="text-[10px] text-brand-text-sec font-light">No heavy oils. Natural smoky flavor over real pine wood logs.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="right" delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-video lg:aspect-[4/3] border border-brand-border shadow-sm">
                <img
                  src="/images/bonfire_evening_1782394660663.jpg"
                  alt="Organic authentic dining setting"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-border text-[9px] uppercase tracking-widest font-semibold text-brand-green shadow-xs">
                  Organic Culinary Ritual
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Adventure Activities (Bento cards) */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div className="max-w-xl space-y-3 text-left">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Into The Wild</span>
          <h2 className="font-editorial text-4xl sm:text-5xl tracking-tight text-brand-text">Adventure Activities.</h2>
          <p className="text-xs sm:text-sm text-brand-text-sec font-light">
            For those seeking to test their limits or glide over misty peaks, our desk organizes high-safety excursions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adventures.map((adv, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.12} duration={0.8}>
              <div className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold bg-brand-green/5 text-brand-green px-2 py-0.5 rounded-full uppercase">
                      {adv.level}
                    </span>
                    <span className="text-[10px] text-brand-text-sec flex items-center gap-1 font-mono uppercase font-bold">
                      <Clock className="h-3 w-3 text-brand-green" />
                      {adv.duration}
                    </span>
                  </div>
                  <h3 className="font-editorial text-2xl text-brand-text tracking-wide leading-tight">{adv.title}</h3>
                  <p className="text-xs text-brand-text-sec leading-relaxed font-light">{adv.description}</p>
                </div>
                <div className="pt-4 border-t border-brand-border/40">
                  <Link
                    to="/contact"
                    className="text-[10px] uppercase tracking-widest font-bold text-brand-green hover:text-brand-green-hover flex items-center gap-1.5"
                  >
                    <span>Inquire Excursion</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. Local Culture (List & Icons) */}
      <section className="py-24 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-brand-border shadow-xs bg-gray-100 hidden lg:block">
                <img
                  src="/images/cedar_suite_interior_1782394643530.jpg"
                  alt="Cultural integration design"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Heritage Preservation</span>
              <h2 className="font-editorial text-4xl sm:text-5xl tracking-tight text-brand-text">Himachali Heritage & Culture.</h2>
              <p className="text-xs sm:text-sm text-brand-text-sec font-light leading-relaxed">
                Nirvana is not a foreign bubble; we are deeply integrated into the Chamba community. We support local handlooms, historical guides, and micro-farmers.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {culturalExperiences.map((cul, idx) => (
                <ScrollReveal key={idx} direction="up" delay={idx * 0.1} duration={0.6}>
                  <div className="space-y-2.5 border-l-2 border-brand-green pl-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text leading-snug">
                      {cul.title}
                    </h4>
                    <p className="text-[11px] text-brand-text-sec font-light leading-relaxed">
                      {cul.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Nearby Attractions Day Trips */}
      <section className="max-w-7xl mx-auto px-6 py-20 space-y-16">
        <div className="max-w-xl space-y-3 text-left">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Day Excursions</span>
          <h2 className="font-editorial text-4xl sm:text-5xl tracking-tight text-brand-text">Venture Out When the Valley Calls.</h2>
          <p className="text-xs sm:text-sm text-brand-text-sec font-light">
            Nirvana's central coordinates in Chamba make day-tripping to historic temples, rolling alpine meadows, and blue water reservoirs seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {attractions.map((att, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.1} duration={0.7}>
              <div className="bg-white border border-brand-border rounded-2xl p-6 flex flex-col justify-between space-y-6 h-full transition-transform hover:scale-101">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-editorial text-2xl text-brand-text tracking-wide leading-tight">{att.name}</h4>
                    <div className="text-[9px] font-mono font-bold bg-brand-green/5 text-brand-green px-2 py-0.5 rounded-full shrink-0">
                      {att.distance}
                    </div>
                  </div>
                  <p className="text-xs text-brand-text-sec leading-relaxed font-light">{att.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-brand-border/60">
                  <div className="flex items-center gap-1.5 text-[10px] text-brand-text uppercase font-semibold">
                    <Clock className="h-3.5 w-3.5 text-brand-green" />
                    <span>Transit Time: {att.duration}</span>
                  </div>
                  <div className="space-y-1">
                    {att.tips.map((tip, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-1.5 text-[10px] text-brand-text-sec font-light">
                        <Check className="h-2.5 w-2.5 text-brand-green shrink-0" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
