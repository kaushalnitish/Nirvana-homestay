import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useRooms } from "../context/RoomsContext";
import ScrollReveal from "../components/ScrollReveal";
import DatePickerCalendar from "../components/DatePickerCalendar";
import { 
  Star, ChevronDown, Check, Trees, Award, ArrowRight 
} from "lucide-react";

export default function Rooms() {
  const { rooms, loading } = useRooms();
  const navigate = useNavigate();
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);

  // Preferred Stay Dates State
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleBookNow = (roomId: string) => {
    navigate("/contact", { state: { roomId, checkIn, checkOut } });
  };

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
            <Award className="h-4.5 w-4.5 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-[0.25em]">The Sanctuary Collection</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-7xl tracking-tight text-brand-text">
            Select Your Private Haven.
          </h1>
          <p className="text-sm sm:text-base text-brand-text-sec font-light max-w-xl mx-auto leading-relaxed">
            Every room at Nirvana is built with native Himalayan cedar framing, private view decks, organic rituals, and customized workspaces for pure serenity.
          </p>
        </div>
      </section>

      {/* Elegant Floating Stay Dates Selector */}
      <section className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white border border-brand-border rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-editorial text-2xl tracking-wide text-brand-text">Check Availability</h3>
            <p className="text-[10px] text-brand-text-sec font-light max-w-xs">
              Select your preferred stay dates below. We'll automatically carry them over to complete your inquiry.
            </p>
          </div>
          <div className="w-full sm:w-80 shrink-0">
            <DatePickerCalendar
              startDate={checkIn}
              endDate={checkOut}
              onChange={(start, end) => {
                setCheckIn(start);
                setCheckOut(end);
              }}
              minDate={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      </section>

      {/* Rooms Listing Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-[500px] rounded-3xl bg-white border border-brand-border animate-pulse" />
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 space-y-4 bg-white border border-brand-border rounded-3xl">
            <Trees className="h-12 w-12 text-brand-green/30 mx-auto" />
            <p className="text-brand-text-sec font-light">No private suites are configured on the property currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {rooms.map((room, idx) => {
              const isExpanded = expandedRoomId === room.id;
              
              return (
                <ScrollReveal key={room.id} direction="up" delay={idx * 0.1} duration={0.8}>
                  <div className="border border-brand-border rounded-3xl overflow-hidden bg-white shadow-xs hover:shadow-md flex flex-col justify-between transition-all h-full">
                    <div>
                      {/* Room Image */}
                      <div className="relative h-72 overflow-hidden bg-gray-100 group">
                        <picture className="w-full h-full block">
                          <source srcSet={room.image.replace(/\.jpg$/, '.webp')} type="image/webp" />
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                            loading="lazy"
                          />
                        </picture>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-border text-[9px] uppercase tracking-widest font-semibold text-brand-green shadow-xs">
                          {room.view}
                        </div>
                      </div>

                      {/* Room Header & Intro */}
                      <div className="p-6 pb-2 space-y-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-editorial text-2xl tracking-wide text-brand-text font-medium">{room.name}</h2>
                          <div className="flex items-center gap-1 text-brand-green bg-brand-green/5 px-2.5 py-1 rounded-full border border-brand-green/10">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span className="text-xs font-semibold">{room.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-brand-text-sec font-light leading-relaxed">
                          {room.description}
                        </p>

                        {/* Specs row */}
                        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider text-brand-text-sec py-2.5 border-y border-brand-border/60 my-3">
                          <span>{room.size}</span>
                          <span>•</span>
                          <span>Max {room.capacity} Guests</span>
                          <span>•</span>
                          <span>{room.bedType}</span>
                        </div>
                      </div>

                      {/* Expandable full details accordion */}
                      <div className="px-6">
                        <button
                          onClick={() => setExpandedRoomId(isExpanded ? null : room.id)}
                          className="text-[10px] uppercase tracking-widest font-bold text-brand-green hover:text-brand-green-hover flex items-center gap-1 pb-4 cursor-pointer"
                        >
                          <span>{isExpanded ? "Collapse Specifications" : "View Full Room Details"}</span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pb-4 space-y-4"
                            >
                              <div className="border-t border-brand-border/40 pt-4 space-y-2">
                                <h4 className="text-[10px] uppercase tracking-wider font-bold text-brand-text">Living Experience</h4>
                                <p className="text-xs text-brand-text-sec leading-relaxed font-light">
                                  {room.longDescription}
                                </p>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-[10px] uppercase tracking-wider font-bold text-brand-text">Curated Room Amenities</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {room.amenities.map((amenity, aIdx) => (
                                    <div key={aIdx} className="flex items-center gap-1.5 text-xs text-brand-text-sec font-light">
                                      <Check className="h-3 w-3 text-brand-green shrink-0" />
                                      <span>{amenity}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Footer price & book action */}
                    <div className="p-6 pt-3 border-t border-brand-border/60 bg-brand-bg/10 flex items-center justify-between mt-auto">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-brand-text-sec block">From Rate</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-mono font-semibold text-brand-green">₹{room.price.toLocaleString("en-IN")}</span>
                          <span className="text-[9px] text-brand-text-sec">/ night</span>
                        </div>
                        <span className="text-[8px] text-brand-text-sec block leading-none">+ GST & Breakfast included</span>
                      </div>

                      <button
                        onClick={() => handleBookNow(room.id)}
                        className="bg-brand-green text-white hover:bg-brand-green-hover text-[10px] uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer group"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </section>
    </motion.div>
  );
}
