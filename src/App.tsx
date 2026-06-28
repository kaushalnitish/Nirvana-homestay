import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { 
  MapPin, Phone, Mail, Instagram, Lock, Menu, X, ShieldCheck, HelpCircle, Trees, Sun, Moon 
} from "lucide-react";

// Context & Pages
import { RoomsProvider, useRooms } from "./context/RoomsContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Gallery from "./pages/Gallery";
import Experience from "./pages/Experience";
import Location from "./pages/Location";
import Contact from "./pages/Contact";

// Custom Sub-components
import SplashLoader from "./components/SplashLoader";
import VirtualConcierge from "./components/VirtualConcierge";
import AdminDashboard from "./components/AdminDashboard";

// Helper component to auto-scroll page to top on path changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState("");
  const [adminError, setAdminError] = useState("");
  const [showPasscodeField, setShowPasscodeField] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const handleAdminAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPasscode === "admin123") {
      setShowAdmin(true);
      setShowPasscodeField(false);
      setAdminError("");
      setTimeout(() => {
        document.getElementById("admin-section")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      setAdminError("Invalid passcode. Please try again.");
    }
  };

  const navItems = [
    { name: "Rooms", path: "/rooms" },
    { name: "Gallery", path: "/gallery" },
    { name: "Experience", path: "/experience" },
    { name: "Location", path: "/location" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <div id="nirvana-app-shell" className="min-h-screen bg-brand-bg text-brand-text flex flex-col relative selection:bg-brand-green/20 selection:text-brand-green">
      
      {/* 1. Splash Loading Screen */}
      <SplashLoader onComplete={() => setLoading(false)} />

      {!loading && (
        <>
          <ScrollToTop />

          {/* 2. Sticky Premium Navbar */}
          <header id="sticky-header" className="sticky top-0 z-30 bg-brand-bg/85 backdrop-blur-md border-b border-brand-border transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              
              {/* Logo */}
              <Link 
                to="/" 
                className="font-editorial text-2xl tracking-widest text-brand-text font-normal cursor-pointer flex items-center gap-2"
              >
                N I R V A N A
              </Link>

              {/* Desktop Navigation with active highlighting */}
              <nav className="hidden md:flex items-center gap-8 h-full">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`text-xs uppercase tracking-widest font-medium transition-all cursor-pointer h-full flex items-center border-b-2 py-1 ${
                        isActive
                          ? "text-brand-green border-brand-green font-semibold"
                          : "text-brand-text-sec border-transparent hover:text-brand-green hover:border-brand-green/40"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Book Now Button Desktop */}
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-full hover:bg-brand-border/40 text-brand-text transition-all duration-300 cursor-pointer flex items-center justify-center border border-brand-border/40"
                  title={theme === "light" ? "Switch to Midnight Forest Theme" : "Switch to Light Theme"}
                  aria-label="Toggle Theme"
                >
                  {theme === "light" ? (
                    <Moon className="h-4.5 w-4.5 text-brand-green" />
                  ) : (
                    <Sun className="h-4.5 w-4.5 text-brand-beige" />
                  )}
                </button>
                <Link
                  to="/contact"
                  className="bg-brand-green text-white hover:bg-brand-green-hover text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer shadow-xs"
                >
                  Book Your Stay
                </Link>
              </div>

              {/* Mobile Right Controls */}
              <div className="md:hidden flex items-center gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-brand-border/40 text-brand-text transition-all duration-300 cursor-pointer flex items-center justify-center border border-brand-border/40"
                  title={theme === "light" ? "Switch to Midnight Forest Theme" : "Switch to Light Theme"}
                  aria-label="Toggle Theme"
                >
                  {theme === "light" ? (
                    <Moon className="h-4 w-4 text-brand-green" />
                  ) : (
                    <Sun className="h-4 w-4 text-brand-beige" />
                  )}
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-brand-border transition-colors text-brand-text"
                  aria-label="Toggle Mobile Menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
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
                    {navItems.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`text-sm uppercase tracking-wider font-semibold text-left transition-all ${
                            isActive ? "text-brand-green" : "text-brand-text hover:text-brand-green"
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full bg-brand-green text-white text-xs uppercase tracking-widest font-semibold py-3.5 rounded-xl text-center shadow-xs block"
                    >
                      Book Your Stay
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </header>

          {/* 3. Main Page Transition Container */}
          <main className="flex-1 flex flex-col items-center w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.21, 1.02, 0.43, 1.01] }}
                className="w-full flex flex-col items-center"
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 4. Live Admin Toggle Area (Unified at bottom of page viewport for seamless developer verification) */}
          <section id="admin-section" className="py-12 bg-brand-bg/40 max-w-7xl mx-auto px-6 w-full">
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
                <div className="w-full md:w-auto shrink-0 text-right">
                  {!showPasscodeField ? (
                    <button
                      onClick={() => setShowPasscodeField(true)}
                      className="px-5 py-2.5 rounded-lg border border-brand-green text-brand-green text-xs uppercase tracking-wider font-semibold hover:bg-brand-green hover:text-white transition-all cursor-pointer"
                    >
                      Enter Admin Dashboard
                    </button>
                  ) : (
                    <form onSubmit={handleAdminAccess} className="flex items-center gap-2 justify-end">
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

          {/* 5. Consistent Footers */}
          <footer className="bg-brand-footer text-white/90 pt-20 pb-10 border-t border-brand-border w-full">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
              
              <div className="space-y-4">
                <Link to="/" className="font-editorial text-3xl tracking-widest text-white block">NIRVANA</Link>
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
                  <Link to="/rooms" className="hover:text-white text-left">The Cedar Suite</Link>
                  <Link to="/rooms" className="hover:text-white text-left">The Mist Nest Loft</Link>
                  <Link to="/rooms" className="hover:text-white text-left">The Pine Garden Room</Link>
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
                <Link
                  to="/contact"
                  className="bg-brand-beige text-stone-950 hover:bg-white text-xs uppercase tracking-widest font-bold px-5 py-2.5 rounded-lg transition-colors shadow-xs inline-block text-center"
                >
                  Reserve Now
                </Link>
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

          {/* 6. Virtual AI Concierge Floating Button */}
          <VirtualConcierge />

          {/* 7. Mobile Sticky Bottom CTA */}
          {pathname !== "/contact" && (
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-border px-6 py-4 z-20 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-brand-text-sec block leading-none font-medium">Starting from</span>
                <span className="font-mono text-base font-semibold text-brand-green leading-none">₹6,500<span className="text-[10px] text-brand-text-sec font-sans font-light">/n</span></span>
              </div>
              
              <Link
                to="/contact"
                className="bg-brand-green text-white hover:bg-brand-green-hover text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded-xl shadow-xs block text-center"
              >
                Book Now
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RoomsProvider>
        <Router>
          <AppContent />
        </Router>
      </RoomsProvider>
    </ThemeProvider>
  );
}
