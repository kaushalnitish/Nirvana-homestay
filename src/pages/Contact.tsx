import React from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { useRooms } from "../context/RoomsContext";
import EnquiryForm from "../components/EnquiryForm";
import ScrollReveal from "../components/ScrollReveal";
import { 
  Phone, Mail, MapPin, MessageSquare, Instagram, ShieldCheck, Compass, HelpCircle, Star 
} from "lucide-react";

export default function Contact() {
  const { rooms, loading } = useRooms();
  const location = useLocation();

  // Handle passed room selection state (from "Book Now" on /rooms)
  const selectedRoomId = (location.state as any)?.roomId || "";
  const initialCheckIn = (location.state as any)?.checkIn || "";
  const initialCheckOut = (location.state as any)?.checkOut || "";

  const contactInfos = [
    {
      icon: Phone,
      title: "Direct Calling desk",
      desc: "+91 94184 85295",
      subDesc: "For instant booking assistance and direct queries.",
      cta: "tel:+919418485295",
      ctaText: "Call Now"
    },
    {
      icon: MessageSquare,
      title: "Instant WhatsApp Concierge",
      desc: "+91 94184 85295",
      subDesc: "Say hello! We respond within 15 minutes with calendar openings.",
      cta: "https://wa.me/919418485295?text=Hi%20Nirvana%20Homestay!%20I'd%20love%20to%20enquire%20about%20a%20luxury%20stay.",
      ctaText: "Chat on WhatsApp"
    },
    {
      icon: Mail,
      title: "Inquiries & Cooperations",
      desc: "stay@nirvanachamba.com",
      subDesc: "For group stays, photo shoots, and organic retreat partnerships.",
      cta: "mailto:stay@nirvanachamba.com",
      ctaText: "Send Email"
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
            <Mail className="h-4.5 w-4.5 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Direct Reservations</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-7xl tracking-tight text-brand-text">
            Reserve Your Serenity.
          </h1>
          <p className="text-sm sm:text-base text-brand-text-sec font-light max-w-xl mx-auto leading-relaxed">
            Connect directly with our hospitality pioneers to design your personalized, authentic Himachali getaway.
          </p>
        </div>
      </section>

      {/* Main Grid Contact Container */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left side: Contact Cards & Coordinates */}
        <div className="lg:col-span-5 space-y-8">
          <ScrollReveal direction="left" delay={0.1}>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">The Coordinates</span>
                <h2 className="font-editorial text-4xl tracking-tight text-brand-text">Get in Touch.</h2>
                <p className="text-xs text-brand-text-sec font-light leading-relaxed">
                  Have questions about transport, local weather, custom dining menus, or pet spaces? We are here to support your travel journey completely.
                </p>
              </div>

              {/* Physical Location Detail card */}
              <div className="bg-white border border-brand-border rounded-2xl p-6 space-y-3.5 shadow-2xs">
                <div className="flex gap-3 items-start">
                  <MapPin className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">The Sanctuary Address</h4>
                    <p className="text-xs text-brand-text-sec leading-relaxed font-light mt-1">
                      Hardaspura, Chamba, Himachal Pradesh, 176310, India
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start pt-3 border-t border-brand-border/40">
                  <Instagram className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">Social Presences</h4>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs text-brand-green hover:underline block mt-1 font-medium"
                    >
                      @nirvana.chamba on Instagram
                    </a>
                  </div>
                </div>
              </div>

              {/* Grid of micro-contacts */}
              <div className="space-y-4">
                {contactInfos.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <div key={idx} className="bg-white/60 border border-brand-border/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-3xs">
                      <div className="flex gap-3 items-start">
                        <div className="h-10 w-10 rounded-xl bg-brand-green/5 text-brand-green flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text leading-tight">{info.title}</h4>
                          <p className="text-sm font-mono font-bold text-brand-green mt-1 leading-none">{info.desc}</p>
                          <p className="text-[10px] text-brand-text-sec font-light mt-1.5 leading-relaxed">{info.subDesc}</p>
                        </div>
                      </div>
                      
                      <a 
                        href={info.cta}
                        target={info.cta.startsWith("http") ? "_blank" : undefined}
                        rel={info.cta.startsWith("http") ? "noreferrer" : undefined}
                        className="w-full sm:w-auto text-center border border-brand-green/40 hover:bg-brand-green hover:text-white text-brand-green text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors shrink-0"
                      >
                        {info.ctaText}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right side: Enquiry form */}
        <div className="lg:col-span-7">
          <ScrollReveal direction="right" delay={0.15}>
            {loading ? (
              <div className="h-[600px] bg-white border border-brand-border rounded-3xl animate-pulse" />
            ) : (
              <EnquiryForm 
                rooms={rooms} 
                selectedRoomId={selectedRoomId} 
                initialCheckIn={initialCheckIn}
                initialCheckOut={initialCheckOut}
                onSuccess={(enq) => {
                  console.log("Recorded enq on Contact page:", enq);
                }}
              />
            )}
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
