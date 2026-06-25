import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MapPin, Wifi, Flame, Star, Menu, X, Utensils, 
  ChevronDown, Calendar, ArrowRight, Heart, Award, 
  Trees, Sparkles, Check, Lock, Settings, Eye, Clock, Phone, Mail, Instagram, ShieldCheck, HelpCircle
} from "lucide-react";
import { Room, GalleryItem } from "./types";

// Import our custom sub-components
import SplashLoader from "./components/SplashLoader";
import VirtualConcierge from "./components/VirtualConcierge";
import GalleryLightbox from "./components/GalleryLightbox";
import EnquiryForm from "./components/EnquiryForm";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");
  const [showPasscodeField, setShowPasscodeField] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auto sliding testimonials state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch rooms list from our server
  useEffect(() => {
    if (loading) return; // Wait until splash finishes
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        if (data.length > 0) setSelectedRoomId(data[0].id);
      })
      .catch((err) => {
        console.error("Failed to load rooms:", err);
      });
  }, [loading]);

  const testimonials = [
    {
      id: "t1",
      author: "Aditi Sharma",
      location: "New Delhi",
      rating: 5,
      text: "Nirvana is indeed a paradise. Waking up to the mountain mist through the Cedar Suite floor-to-ceiling glass panel and drinking cedar-infused tea on the private deck was magical. The farm-to-table food was outstanding! A must visit.",
      date: "June 2026"
    },
    {
      id: "t2",
      author: "Vikram Malhotra",
      location: "Mumbai",
      rating: 5,
      text: "Best remote work retreat I have ever seen. High-speed fiber-optic Wi-Fi in the middle of Chamba pines. We had quiet work sessions, followed by amazing bonfire evenings and authentic Himachali Dham food. Kaushal and Nitish are super hosts!",
      date: "May 2026"
    },
    {
      id: "t3",
      author: "Rohan & Prianka",
      location: "Chandigarh",
      rating: 5,
      text: "We stayed in the Mist Nest Penthouse Loft. The glass roof for star-gazing was spectacular! The host Devi (virtual) suggested beautiful trails nearby. The serenity and hospitality are unmatched. 10/10 stay.",
      date: "April 2026"
    }
  ];

  // Auto slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const experiences = [
    {
      title: "Wake Up to Mountain Mist",
      description: "Step onto private panoramic decks to watch the morning clouds rise through the deodar pine forests.",
      highlight: "Cedar wood architecture",
      image: "/src/assets/images/cedar_suite_interior_1782394643530.jpg"
    },
    {
      title: "Authentic Farm-to-Table Feast",
      description: "Savor fresh, hand-churned meals including organic mountain honey, freshly-baked bread, and traditional Himachali Dham.",
      highlight: "Native local recipes",
      image: "/src/assets/images/bonfire_evening_1782394660663.jpg"
    },
    {
      title: "Warm Starry Bonfires",
      description: "Gather around a stone-carved fire pit with acoustic guitar notes and premium locally crafted herbal spirits.",
      highlight: "Perfect under-stars gathering",
      image: "/src/assets/images/bonfire_evening_1782394660663.jpg"
    },
    {
      title: "Creative Mountain Workcation",
      description: "Deep, soundproof workstations equipped with high-speed fiber internet and custom-roasted espresso machines.",
      highlight: "Uninterrupted connectivity",
      image: "/src/assets/images/homestay_exterior_1782394626548.jpg"
    }
  ];

  const attractions = [
    {
      name: "Khajjiar (Mini Switzerland)",
      distance: "22 km",
      duration: "45 mins",
      description: "A breathtaking saucer-shaped pine meadow with a floating lake in the center, encircled by heavy pine forests.",
      tips: ["Perfect for afternoon picnics", "Try zorbing or horse riding"]
    },
    {
      name: "Chamera Lake",
      distance: "15 km",
      duration: "30 mins",
      description: "A majestic crystal-blue water reservoir in Chamba valley, renowned for speed-boating, kayaking, and serene reflections.",
      tips: ["Boat ride during golden hour", "Excellent landscape photography spots"]
    },
    {
      name: "Kalatop Wildlife Sanctuary",
      distance: "28 km",
      duration: "50 mins",
      description: "Thick coniferous forest paths supporting wild leopards, black bears, and beautiful mountain deer.",
      tips: ["Ideal for guided forest walks", "Stunning panoramic vistas of snow peaks"]
    },
    {
      name: "Chamba Ancient Temples",
      distance: "3.5 km",
      duration: "8 mins",
      description: "The famous 10th-century Laxmi Narayan Temple complex, exhibiting elegant shikara architecture.",
      tips: ["Visit during morning prayers", "Strictly respect historic heritage rules"]
    }
  ];

  const faqs = [
    {
      category: "booking",
      question: "How does the booking enquiry workflow operate?",
      answer: "Since we are a luxury, highly personalized boutique homestay, we manually check room calendars to prevent double bookings. Once you submit our elegant enquiry form, we verify availability and ping you back on WhatsApp or Email within 15 minutes to confirm details and lock your stay."
    },
    {
      category: "cancellation",
      question: "What is your cancellation policy?",
      answer: "We offer a full 100% refund for cancellations made up to 7 days prior to check-in. Cancellations between 7 to 3 days prior will receive a 50% refund, and cancellations within 72 hours are non-refundable."
    },
    {
      category: "food",
      question: "Are meals included, and can you accommodate food restrictions?",
      answer: "Yes, our stays come with fresh organic home-cooked breakfast included! Lunch and dinner can be pre-ordered from our farm-to-table kitchen. Our private organic chef prepares authentic local Chamba cuisines and can accommodate vegan, gluten-free, or child-friendly meals upon request."
    },
    {
      category: "parking",
      question: "Is secure parking available on-site?",
      answer: "Absolutely. Nirvana Homestay provides private, gated, and secure parking on-site for up to 6 vehicles completely free of charge."
    },
    {
      category: "pets",
      question: "Are pets allowed at the property?",
      answer: "Yes, we are highly pet-friendly! We have spacious secure gardens and play lawns. We only request that you inform us in advance so we can prepare pet beds and dedicated bowls."
    },
    {
      category: "weather",
      question: "What is the best season to visit Chamba?",
      answer: "Chamba is beautiful year-round! March to June offers pleasant mountain breezes (15-25°C). July to September brings misty cloud formations across the valley, and November to February is ideal for crisp winters with snow on higher peaks."
    }
  ];

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === "admin123") { // Simple mock admin passcode
      setShowAdmin(true);
      setShowPasscodeField(false);
      setAdminError("");
      // Scroll to admin section
      setTimeout(() => {
        document.getElementById("admin-section")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      setAdminError("Invalid passcode. Please try again.");
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div id="nirvana-app-shell" className="min-h-screen bg-brand-bg text-brand-text flex flex-col relative selection:bg-brand-green/20 selection:text-brand-green">
      
      {/* 1. Splash Loading Screen */}
      <SplashLoader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          {/* 2. Sticky Premium Navbar */}
          <header id="sticky-header" className="sticky top-0 z-30 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              {/* Logo */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className="font-editorial text-2xl tracking-widest text-brand-text font-normal cursor-pointer flex items-center gap-2"
              >
                N I R V A N A
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {["Rooms", "Gallery", "Experience", "Location", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase() + "-section")}
                    className="text-xs uppercase tracking-widest font-medium text-brand-text-sec hover:text-brand-green transition-colors cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </nav>

              {/* Book Now Button Desktop */}
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => scrollToSection("booking-section")}
                  className="bg-brand-green text-white hover:bg-brand-green-hover text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
                >
                  Book Your Stay
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden h-10 w-10 flex items-center justify-center rounded-full hover:bg-brand-border transition-colors text-brand-text"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  id="mobile-drawer-menu"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-white border-b border-brand-border overflow-hidden"
                >
                  <div className="px-6 py-8 space-y-5 flex flex-col">
                    {["Rooms", "Gallery", "Experience", "Location", "Contact"].map((item) => (
                      <button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase() + "-section")}
                        className="text-sm uppercase tracking-wider font-semibold text-brand-text text-left"
                      >
                        {item}
                      </button>
                    ))}
                    <button
                      onClick={() => scrollToSection("booking-section")}
                      className="w-full bg-brand-green text-white text-xs uppercase tracking-widest font-semibold py-3.5 rounded-xl text-center shadow-sm"
                    >
                      Book Your Stay
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* 3. Hero Section (Cinematic Visual & Editorial Copy) */}
          <section id="hero-section" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden">
            
            {/* Parallax Image Container */}
            <div className="absolute inset-0 z-0">
              <img
                src="/src/assets/images/homestay_exterior_1782394626548.jpg"
                alt="Nirvana Homestay exterior mountain landscape"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-105 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-brand-text/30" />
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
                    animationDelay: `${i * 1.2}s`,
                    animationDuration: `${7 + i * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Spacer top */}
            <div />

            {/* Primary Hero Typography */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-left pt-24 pb-16 md:pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
                
                {/* Left side: Main Headline */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 text-brand-green bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-brand-border/60 shadow-xs">
                    <Trees className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.25em]">Chamba, Himachal Pradesh</span>
                  </div>
                  
                  <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[0.95] text-brand-text">
                    Where the <br />
                    Mountains <br />
                    Whisper.
                  </h2>
                </div>

                {/* Right side: Refined Editorial Intro & CTA Actions */}
                <div className="lg:col-span-5 space-y-6 lg:pl-4">
                  <p className="text-sm sm:text-base text-brand-text/80 font-light leading-relaxed">
                    Built with native Himalayan cedar and mountain stone, Nirvana offers a luxury refuge to breathe, wander pine forests, and star-gaze in extreme quiet.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <button
                      onClick={() => scrollToSection("booking-section")}
                      className="bg-brand-green text-white hover:bg-brand-green-hover text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group shrink-0"
                    >
                      <span>Book Your Stay</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      onClick={() => scrollToSection("rooms-section")}
                      className="border border-brand-text/35 text-brand-text hover:bg-white/60 bg-white/25 backdrop-blur-xs text-xs uppercase tracking-widest font-semibold py-4 px-8 rounded-full transition-all flex items-center justify-center cursor-pointer"
                    >
                      Explore Rooms
                    </button>
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

              </div>
            </div>

            {/* 4. Trust Bar */}
            <div id="trust-bar" className="relative z-10 w-full bg-white border-t border-brand-border py-6">
              <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-text">5.0 Google Reviews</span>
                  <span className="text-[9px] text-brand-text-sec">120+ verified guests</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1 border-l border-brand-border/60">
                  <ShieldCheck className="h-5 w-5 text-brand-green" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-text">Direct Booking</span>
                  <span className="text-[9px] text-brand-text-sec">Best rate guaranteed</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1 border-l border-brand-border/60">
                  <Wifi className="h-5 w-5 text-brand-green" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-text">High-speed Fiber</span>
                  <span className="text-[9px] text-brand-text-sec">Workcation ready</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1 border-l border-brand-border/60 col-span-1">
                  <Check className="h-5 w-5 text-brand-green" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-text">Free Parking</span>
                  <span className="text-[9px] text-brand-text-sec">On-site secure slots</span>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1 border-l border-brand-border/60 col-span-2 md:col-span-1">
                  <Heart className="h-5 w-5 text-brand-green" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-text">Family Friendly</span>
                  <span className="text-[9px] text-brand-text-sec">Pet-friendly lawns</span>
                </div>

              </div>
            </div>
          </section>

          {/* 5. About Nirvana Section */}
          <section id="about-section" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            <div className="md:col-span-6 relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[3/4] border border-brand-border shadow-sm">
              <img
                src="/src/assets/images/homestay_exterior_1782394626548.jpg"
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

            <div className="md:col-span-6 space-y-6">
              <div className="flex items-center gap-1 text-brand-green">
                <Award className="h-4.5 w-4.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Heritage & Sanctuary</span>
              </div>
              
              <h3 className="font-editorial text-5xl tracking-tight leading-tight text-brand-text">
                The Heritage Story behind Nirvana.
              </h3>

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
          </section>

          {/* 6. Stay Experiences (Emotional Narrative Cards) */}
          <section id="experience-section" className="py-24 bg-white border-y border-brand-border">
            <div className="max-w-7xl mx-auto px-6 space-y-16">
              
              <div className="max-w-2xl space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Curated Experiences</span>
                <h3 className="font-editorial text-5xl tracking-tight text-brand-text">Designed to feel like home, not a hotel room.</h3>
                <p className="text-sm text-brand-text-sec font-light leading-relaxed">
                  We replace heavy hotel services with sensory-focused, organic experiences crafted to cultivate deep peace.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="flex flex-col space-y-4 group">
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
                ))}
              </div>
            </div>
          </section>

          {/* 7. Room Collection */}
          <section id="rooms-section" className="py-24 max-w-7xl mx-auto px-6 space-y-16">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-xl space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">The Collection</span>
                <h3 className="font-editorial text-5xl tracking-tight text-brand-text">Select your private haven.</h3>
                <p className="text-sm text-brand-text-sec font-light">
                  Each room features native timber framing, private mountain view decks, luxury cotton sheets, and organic bathroom rituals.
                </p>
              </div>
              
              <button
                onClick={() => scrollToSection("booking-section")}
                className="self-start md:self-auto border border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Inquire availability
              </button>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {rooms.map((room) => {
                const isExpanded = expandedRoomId === room.id;
                
                return (
                  <motion.div
                    key={room.id}
                    layout
                    className="border border-brand-border rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Room Image */}
                      <div className="relative h-64 overflow-hidden bg-gray-100">
                        <img
                          src={room.image}
                          alt={room.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-brand-border text-[9px] uppercase tracking-widest font-semibold text-brand-green">
                          {room.view}
                        </div>
                      </div>

                      {/* Room Header */}
                      <div className="p-6 pb-2 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-editorial text-2xl tracking-wide text-brand-text font-medium">{room.name}</h4>
                          <div className="flex items-center gap-1 text-brand-green">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-xs font-semibold">{room.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-brand-text-sec font-light leading-relaxed">
                          {room.description}
                        </p>

                        {/* Capacity/Specs details list */}
                        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider text-brand-text-sec py-2 border-y border-brand-border/60 my-2">
                          <span>{room.size}</span>
                          <span>•</span>
                          <span>Max {room.capacity} Guests</span>
                          <span>•</span>
                          <span>{room.bedType}</span>
                        </div>
                      </div>

                      {/* Expandable Details Accordion */}
                      <div className="px-6">
                        <button
                          onClick={() => setExpandedRoomId(isExpanded ? null : room.id)}
                          className="text-[10px] uppercase tracking-wider font-semibold text-brand-green hover:text-brand-green-hover flex items-center gap-1 pb-3 cursor-pointer"
                        >
                          <span>{isExpanded ? "Collapse Specs" : "View Full Room Details"}</span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden pb-4 space-y-3"
                            >
                              <p className="text-xs text-brand-text-sec leading-relaxed font-light">
                                {room.longDescription}
                              </p>
                              <div>
                                <h5 className="text-[10px] uppercase tracking-wider font-bold text-brand-text mb-1.5">Curated Amenities</h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {room.amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 text-xs text-brand-text-sec font-light">
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

                    {/* Room Footer CTA */}
                    <div className="p-6 pt-2 border-t border-brand-border/60 bg-brand-bg/10 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-brand-text-sec block">From Rate</span>
                        <span className="text-lg font-mono font-semibold text-brand-green">₹{room.price.toLocaleString("en-IN")}</span>
                        <span className="text-[9px] text-brand-text-sec block">per night + GST</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedRoomId(room.id);
                          scrollToSection("booking-section");
                        }}
                        className="bg-brand-green text-white hover:bg-brand-green-hover text-[10px] uppercase tracking-wider font-bold py-3 px-5 rounded-xl shadow-sm transition-all cursor-pointer"
                      >
                        Reserve Suite
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 8. Fullscreen Gallery Section */}
          <section id="gallery-section" className="py-24 bg-white border-y border-brand-border">
            <div className="max-w-7xl mx-auto px-6 space-y-12">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-green">Visual Diary</span>
                <h3 className="font-editorial text-5xl tracking-tight text-brand-text">Capturing the Mist & Warmth.</h3>
                <p className="text-sm text-brand-text-sec font-light">
                  A visual journal of cozy fireplaces, misty valley views, organic delicacies, and peaceful forest trials.
                </p>
              </div>

              <GalleryLightbox />
            </div>
          </section>

          {/* 9. Amenities Section */}
          <section id="amenities-section" className="py-24 max-w-7xl mx-auto px-6 space-y-16">
            
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Bespoke Comfort</span>
              <h3 className="font-editorial text-5xl tracking-tight text-brand-text">Amenities with Intent.</h3>
              <p className="text-sm text-brand-text-sec font-light">
                No noisy hotel corridors. Every detail is crafted to encourage serenity, organic nutrition, and peaceful focus.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { title: "High-speed Wi-Fi", text: "Fiber-optic internet for remote workspace connectivity.", icon: Wifi },
                { title: "Organic Meals", text: "Breakfast made with fresh farm-harvested dairy.", icon: Utensils },
                { title: "Dedicated Fireplace", text: "Cozy wood-stoves in premium Cedar suites.", icon: Flame },
                { title: "Secure Parking", text: "Free private parking safe within homestay compound.", icon: ShieldCheck },
                { title: "Local Guides", text: "Curated forest foraging trails and valley trips.", icon: Trees },
                { title: "Coffee Sommelier", text: "Espresso capsules and local tea infusions.", icon: Sparkles },
                { title: "Transit Transfers", text: "Airport or Pathankot pick-up can be arranged.", icon: Clock },
                { title: "Pet Garden", text: "Extremely welcoming lawns for pet companions.", icon: Heart }
              ].map((am, idx) => {
                const IconComp = am.icon;
                return (
                  <div key={idx} className="space-y-2 border-l border-brand-border pl-5">
                    <div className="h-8 w-8 bg-brand-green/10 rounded-lg flex items-center justify-center text-brand-green">
                      <IconComp className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text mt-2">{am.title}</h4>
                    <p className="text-xs text-brand-text-sec font-light leading-relaxed">{am.text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 10. Nearby Attractions */}
          <section id="attractions-section" className="py-24 bg-white border-y border-brand-border">
            <div className="max-w-7xl mx-auto px-6 space-y-16">
              
              <div className="max-w-xl space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Exploring Chamba</span>
                <h3 className="font-editorial text-5xl tracking-tight text-brand-text">Venture out when the valley calls.</h3>
                <p className="text-sm text-brand-text-sec font-light">
                  Nirvana's central location in Chamba makes exploring the historic temples, pristine lakes, and alpine meadows painless.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {attractions.map((att, idx) => (
                  <div key={idx} className="bg-brand-bg/50 border border-brand-border rounded-2xl p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-editorial text-2xl text-brand-text tracking-wide leading-tight">{att.name}</h4>
                        <div className="text-[10px] font-mono font-bold bg-brand-green/5 text-brand-green px-2 py-0.5 rounded-full shrink-0">
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
                ))}
              </div>
            </div>
          </section>

          {/* 11. Testimonials */}
          <section id="testimonials-section" className="py-24 bg-brand-green text-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
              
              <div className="flex justify-center text-brand-beige">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>

              <div className="h-44 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <p className="font-editorial text-2xl sm:text-3xl tracking-wide leading-relaxed font-light italic max-w-2xl mx-auto">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    
                    <div className="space-y-1">
                      <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-beige">
                        {testimonials[currentTestimonial].author}
                      </h4>
                      <p className="text-[10px] text-white/60">
                        {testimonials[currentTestimonial].location} • Verified Guest ({testimonials[currentTestimonial].date})
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide indicators */}
              <div className="flex items-center justify-center gap-2 pt-4">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentTestimonial === idx ? "w-6 bg-brand-beige" : "w-2 bg-white/30"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Faint mountain background vector */}
            <div className="absolute inset-0 opacity-5 pointer-events-none flex items-end">
              <svg className="w-full h-32 fill-white" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 20 L25 10 L50 15 L75 8 L100 20 Z" />
              </svg>
            </div>
          </section>

          {/* 12 & 13. Location Details & Interactive Form */}
          <section id="location-section" className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Interactive Map details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">The Location</span>
                <h3 className="font-editorial text-5xl tracking-tight text-brand-text">How to reach our sanctuary.</h3>
                <p className="text-sm text-brand-text-sec font-light leading-relaxed">
                  Located in a serene pocket of Chamba, Nirvana is easily accessible via road, railway networks, or flights.
                </p>
              </div>

              {/* Coordinates / Transits list */}
              <div className="space-y-5">
                <div className="border-l-2 border-brand-green pl-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">Pathankot Railway Station</h4>
                  <p className="text-xs text-brand-text-sec font-light mt-1">
                    118 km (approx. 3.5 hours scenic drive). This is the nearest major broad-gauge rail terminus.
                  </p>
                </div>

                <div className="border-l-2 border-brand-green pl-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">Kangra Airport (Gaggal)</h4>
                  <p className="text-xs text-brand-text-sec font-light mt-1">
                    120 km (approx. 4 hours mountain taxi drive). Connects via regular commercial flights from Delhi.
                  </p>
                </div>

                <div className="border-l-2 border-brand-green pl-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">Chamba Local Bus Terminus</h4>
                  <p className="text-xs text-brand-text-sec font-light mt-1">
                    3.5 km (8 minutes car transit). Local cabs are instantly available. We provide pickup assistance on demand!
                  </p>
                </div>
              </div>

              {/* Simple Embedded Google Map */}
              <div className="rounded-2xl overflow-hidden border border-brand-border h-64 bg-gray-100 relative">
                <iframe
                  title="Nirvana Homestay Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13485.493010775836!2d76.12513411782223!3d32.5562215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391c953500000001%3A0xc48c90be6b38c64d!2sChamba%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1719234900000!5m2!1sen!2sin"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right side: Inquire widget */}
            <div id="booking-section" className="lg:col-span-7">
              {rooms.length > 0 && (
                <EnquiryForm
                  rooms={rooms}
                  selectedRoomId={selectedRoomId}
                  onSuccess={(enq) => {
                    console.log("Recorded enq:", enq);
                  }}
                />
              )}
            </div>
          </section>

          {/* 14. FAQ Section */}
          <section id="faq-section" className="py-24 bg-white border-y border-brand-border">
            <div className="max-w-4xl mx-auto px-6 space-y-12">
              <div className="text-center space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-green">Curious Guests</span>
                <h3 className="font-editorial text-5xl tracking-tight text-brand-text">Frequently Asked Questions.</h3>
                <p className="text-sm text-brand-text-sec font-light">
                  Everything you need to know about the weather, transit routes, cancellation rules, and pet stays.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-brand-border rounded-2xl overflow-hidden bg-brand-bg/10"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full text-left p-5 flex items-center justify-between text-brand-text hover:text-brand-green transition-colors cursor-pointer"
                      >
                        <span className="text-sm font-semibold">{faq.question}</span>
                        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 pt-0 text-xs text-brand-text-sec font-light leading-relaxed border-t border-brand-border/40">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 15. Live Admin Toggle Area */}
          <section id="admin-section" className="py-12 bg-brand-bg/40 max-w-7xl mx-auto px-6">
            <div className="border border-brand-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/70 backdrop-blur-sm">
              <div className="space-y-1 text-left">
                <h4 className="text-xs uppercase tracking-wider font-bold text-brand-text flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-brand-green" />
                  <span>Homestay Admin Entry</span>
                </h4>
                <p className="text-xs text-brand-text-sec font-light">
                  Simulate property administration: manage customer reservations, edit prices, and upload gallery photography (Passcode: <span className="font-mono font-semibold">admin123</span>)
                </p>
              </div>

              {!showAdmin ? (
                <div className="w-full md:w-auto shrink-0">
                  {!showPasscodeField ? (
                    <button
                      onClick={() => setShowPasscodeField(true)}
                      className="px-5 py-2.5 rounded-lg border border-brand-green text-brand-green text-xs uppercase tracking-wider font-semibold hover:bg-brand-green hover:text-white transition-all cursor-pointer"
                    >
                      Enter Admin Dashboard
                    </button>
                  ) : (
                    <form onSubmit={handleAdminAccess} className="flex items-center gap-2">
                      <input
                        type="password"
                        placeholder="Passcode..."
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        className="px-3 py-2 border border-brand-border rounded-lg text-xs bg-white focus:border-brand-green outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-brand-green text-white rounded-lg text-xs font-semibold cursor-pointer"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowPasscodeField(false)}
                        className="text-brand-text-sec hover:text-brand-text text-xs ml-1"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                  {adminError && <p className="text-[10px] text-red-500 mt-1">{adminError}</p>}
                </div>
              ) : (
                <button
                  onClick={() => setShowAdmin(false)}
                  className="px-5 py-2.5 rounded-lg bg-brand-green text-white text-xs uppercase tracking-wider font-semibold hover:bg-brand-green-hover transition-all cursor-pointer shrink-0"
                >
                  Close Admin View
                </button>
              )}
            </div>

            {/* Render Dashboard panel if unlocked */}
            <AnimatePresence>
              {showAdmin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-6"
                >
                  <AdminDashboard />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* 16. Footer */}
          <footer id="contact-section" className="bg-brand-text text-white/90 pt-20 pb-10 border-t border-brand-border">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
              
              <div className="space-y-4">
                <h3 className="font-editorial text-3xl tracking-widest text-white">NIRVANA</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  A high-end luxury mountain homestay chalet nestled inside the cloudy cedar forests of Chamba, Himachal Pradesh.
                </p>
                <div className="flex items-center gap-3.5 pt-2">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-brand-beige" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="mailto:stay@nirvanachamba.com" className="text-white/60 hover:text-brand-beige" aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-beige">Stay Experiences</h4>
                <div className="flex flex-col gap-2 text-xs text-white/60 font-light">
                  <button onClick={() => scrollToSection("rooms-section")} className="hover:text-white text-left">The Cedar Suite</button>
                  <button onClick={() => scrollToSection("rooms-section")} className="hover:text-white text-left">The Mist Nest Loft</button>
                  <button onClick={() => scrollToSection("rooms-section")} className="hover:text-white text-left">The Pine Garden Room</button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-beige">Contact Us</h4>
                <div className="flex flex-col gap-2 text-xs text-white/60 font-light">
                  <p className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-brand-beige" />
                    <span>+91 94184 85295</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-brand-beige" />
                    <span>stay@nirvanachamba.com</span>
                  </p>
                  <p className="flex items-center gap-1.5 leading-relaxed">
                    <MapPin className="h-3.5 w-3.5 text-brand-beige shrink-0" />
                    <span>Hardaspura, Chamba, Himachal Pradesh, 176310</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-beige">Direct Reservations</h4>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  We verify calendar openings manually to design customized visits. Connect directly with our reservation desks.
                </p>
                <button
                  onClick={() => scrollToSection("booking-section")}
                  className="bg-brand-beige text-brand-text hover:bg-white text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Reserve Now
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-light gap-4">
              <p>© 2026 Nirvana Homestay Chamba. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#privacy" className="hover:text-white">Privacy Policy</a>
                <span>|</span>
                <a href="#terms" className="hover:text-white">Terms of Stay</a>
              </div>
            </div>
          </footer>

          {/* 17. Virtual AI Concierge Floating Button */}
          <VirtualConcierge />

          {/* 18. Mobile Sticky Bottom CTA */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-border px-6 py-4 z-20 flex items-center justify-between shadow-lg">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-brand-text-sec block leading-none">Starting from</span>
              <span className="font-mono text-base font-semibold text-brand-green leading-none">₹6,500<span className="text-[10px] text-brand-text-sec font-sans font-light">/n</span></span>
            </div>
            
            <button
              onClick={() => scrollToSection("booking-section")}
              className="bg-brand-green text-white hover:bg-brand-green-hover text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl shadow-sm cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}
