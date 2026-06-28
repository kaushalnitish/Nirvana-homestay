import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { useRooms } from "../context/RoomsContext";
import { testimonials, experiences } from "../data";
import ScrollReveal from "../components/ScrollReveal";
import { 
  Trees, ArrowRight, Award, Star, ShieldCheck, ChevronLeft, ChevronRight, Sparkles 
} from "lucide-react";

export default function Home() {
  const { rooms, loading } = useRooms();
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-end pb-24 overflow-hidden">
        {/* Parallax Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/homestay_exterior_1782394626548.jpg"
            alt="Nirvana Homestay exterior mountain landscape"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-105 select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-brand-text/25" />
        </div>

        {/* Floating Particles in Hero */}
        <div className="absolute inset-0 pointer-events-none z-1 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-brand-beige opacity-25 particle"
              style={{
                left: `${15 + i * 15}%`,
                bottom: `${10 + i * 12}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${12 + i * 4}s`
              }}
            />
          ))}
        </div>

        {/* Hero Editorial Content */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            
            {/* Left side: Main Headline */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up" delay={0.15}>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-brand-green bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-border/60 shadow-xs">
                    <Trees className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Chamba, Himachal Pradesh</span>
                  </div>
                  
                  <h1 className="font-editorial text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] text-brand-text">
                    NIRVANA <br />
                    <span className="text-3xl sm:text-4xl md:text-[44px] md:leading-[46px] font-sans tracking-wide block font-normal mt-4 text-brand-beige">by kunwar mahajan</span>
                  </h1>
                </div>
              </ScrollReveal>
            </div>

            {/* Right side: Refined Editorial Intro & CTA Actions */}
            <div className="lg:col-span-5 lg:pl-4">
              <ScrollReveal direction="up" delay={0.3}>
                <div className="space-y-6">
                  <p className="text-sm sm:text-base text-brand-text/80 font-light leading-relaxed">
                    Built with native Himalayan cedar and mountain stone, Nirvana offers a luxury refuge to breathe, wander pine forests, and star-gaze in extreme quiet.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Link
                      to="/contact"
                      className="bg-brand-green text-white hover:bg-brand-green-hover text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group shrink-0 text-center"
                    >
                      <span>Book Your Stay</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/rooms"
                      className="border border-brand-text/35 text-brand-text hover:bg-white/60 bg-white/25 backdrop-blur-xs text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full transition-all flex items-center justify-center cursor-pointer text-center"
                    >
                      Explore Rooms
                    </Link>
                  </div>

                  {/* Elegant divider and small telemetry-free ambient meta information */}
                  <div className="pt-5 border-t border-brand-border/40 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-brand-text-sec block">Altitude</span>
                      <span className="font-mono text-xs font-semibold text-brand-text">996 m (3,268 ft)</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-brand-text-sec block">Atmosphere</span>
                      <span className="font-mono text-xs font-semibold text-brand-text">Aromatic Pine & Mist</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* About Nirvana Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/4] border border-brand-border shadow-sm">
              <img
                src="/images/homestay_exterior_1782394626548.jpg"
                alt="Rustic modern deodar timber chalet design"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-brand-border">
                <span className="text-[9px] uppercase tracking-widest text-brand-green font-bold">The Material Story</span>
                <h4 className="font-editorial text-xl tracking-wide text-brand-text mt-1">Native Cedarwood & Stone</h4>
                <p className="text-xs text-brand-text-sec font-light leading-relaxed mt-1">
                  We hand-sourced fallen aromatic deodar timber and local river rocks to construct a breathing mountain chalet.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-6">
          <ScrollReveal direction="up" delay={0.25}>
            <div className="space-y-6">
              <div className="flex items-center gap-1 text-brand-green">
                <Award className="h-4.5 w-4.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Heritage & Sanctuary</span>
              </div>
              
              <h2 className="font-editorial text-5xl tracking-tight leading-tight text-brand-text">
                The Heritage Story behind Nirvana.
              </h2>

              <div className="space-y-4 text-sm text-brand-text-sec font-light leading-relaxed">
                <p>
                  Nirvana didn’t start as a commercial venture. It was envisioned as an emotional mountain sanctuary—a place where writers, creators, families, and weary wanderers could retreat to seek silence.
                </p>
                <p>
                  Tucked away 3 kilometers from Chamba's historical center, the homestay overlooks dense cedar and pine forests. In the morning, clouds sweep over your balconies; in the evening, we warm our souls around open logs.
                </p>
                <p>
                  Our kitchen focuses strictly on organic agriculture, bringing fresh forest honey, hand-churned dairy, and local himachali dham meals directly to your plate.
                </p>
              </div>

              {/* Founder Note Quote */}
              <div className="border-l-2 border-brand-beige pl-6 py-1 italic text-sm text-brand-text-sec font-light">
                "We wanted to build a stay that breathes local warmth. From handwoven Himachal blankets to native copper bathing basins, we invite you to design memories, not just check into a hotel room."
                <div className="mt-3.5 not-italic text-xs font-semibold text-brand-text uppercase tracking-wider">
                  — Kaushal & Nitish, Founders
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">The Collection</span>
                <h2 className="font-editorial text-5xl tracking-tight text-brand-text">Featured Havens.</h2>
                <p className="text-sm text-brand-text-sec font-light">
                  Handcrafted private sanctuaries designed with aromatic deodar timber, floating beds, and dramatic valley views.
                </p>
              </div>
              <Link
                to="/rooms"
                className="self-start md:self-auto border border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                View All Rooms
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              [...Array(3)].map((_, idx) => (
                <div key={idx} className="h-96 rounded-3xl bg-gray-100 animate-pulse border border-brand-border" />
              ))
            ) : (
              rooms.slice(0, 3).map((room, idx) => (
                <ScrollReveal key={room.id} direction="up" delay={idx * 0.15} duration={0.8}>
                  <div className="border border-brand-border rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md flex flex-col justify-between transition-all h-full">
                    <div>
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        <img
                          src={room.image}
                          alt={room.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-border text-[9px] uppercase tracking-widest font-semibold text-brand-green">
                          {room.view}
                        </div>
                      </div>

                      <div className="p-6 pb-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-editorial text-2xl tracking-wide text-brand-text font-medium">{room.name}</h4>
                          <div className="flex items-center gap-1 text-brand-green">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-xs font-semibold">{room.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-brand-text-sec font-light leading-relaxed line-clamp-2">
                          {room.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-2 border-t border-brand-border/60 bg-brand-bg/10 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-brand-text-sec block">From Rate</span>
                        <span className="text-lg font-mono font-semibold text-brand-green">₹{room.price.toLocaleString("en-IN")}</span>
                        <span className="text-[9px] text-brand-text-sec block">per night</span>
                      </div>
                      <Link
                        to="/contact"
                        state={{ roomId: room.id }}
                        className="bg-brand-green text-white hover:bg-brand-green-hover text-[10px] uppercase tracking-wider font-bold py-3 px-5 rounded-xl shadow-sm transition-all"
                      >
                        Reserve
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Curated Experiences / Amenities */}
      <section className="py-24 max-w-7xl mx-auto px-6 space-y-16">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Curated Experiences</span>
            <h2 className="font-editorial text-5xl tracking-tight text-brand-text">Designed to feel like home, not a hotel.</h2>
            <p className="text-sm text-brand-text-sec font-light leading-relaxed">
              We replace heavy commercial hotel services with custom, organic experiences designed to cultivate deep, peaceful presence.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={idx} direction="up" delay={idx * 0.12} duration={0.6}>
              <div className="flex flex-col space-y-4 group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-brand-border relative bg-gray-100">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-[9px] uppercase font-semibold text-brand-green px-2.5 py-1 rounded-full border border-brand-border shadow-sm">
                    {exp.highlight}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-editorial text-xl text-brand-text tracking-wide group-hover:text-brand-green transition-colors font-medium">
                    {exp.title}
                  </h4>
                  <p className="text-xs text-brand-text-sec leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Testimonials Block */}
      <section className="py-24 bg-brand-green/5 border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative">
          <div className="text-brand-green flex justify-center">
            <Sparkles className="h-8 w-8 animate-pulse" />
          </div>

          <div className="min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="font-editorial text-xl sm:text-2xl md:text-3xl tracking-wide leading-relaxed text-brand-text italic font-light max-w-3xl">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-brand-text">
                    {testimonials[currentTestimonial].author}
                  </h4>
                  <p className="text-[10px] text-brand-text-sec font-light mt-0.5">
                    {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial slider indicators */}
          <div className="flex justify-center items-center gap-2 pt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentTestimonial(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentTestimonial === idx ? "w-6 bg-brand-green" : "w-1.5 bg-brand-border"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Booking CTA */}
      <section className="py-24 bg-white border-y border-brand-border text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-green block">Experience Mountain Serenity</span>
              <h2 className="font-editorial text-5xl sm:text-6xl tracking-tight text-brand-text">Are you ready to unplug?</h2>
              <p className="text-sm text-brand-text-sec font-light max-w-xl mx-auto leading-relaxed">
                Submit an elegant inquiry. We verify the room calendar manually and contact you back within minutes to lock your private haven.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/contact"
                className="bg-brand-green text-white hover:bg-brand-green-hover text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Inquire Custom Booking</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/experience"
                className="border border-brand-border hover:bg-brand-bg/50 text-brand-text text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full transition-all"
              >
                Explore Experience
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
