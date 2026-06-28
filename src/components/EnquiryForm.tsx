import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Room, Enquiry } from "../types";
import { Calendar, Users, MessageSquare, Mail, Phone, ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import DatePickerCalendar from "./DatePickerCalendar";

interface EnquiryFormProps {
  rooms: Room[];
  selectedRoomId?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  onSuccess?: (enquiry: Enquiry) => void;
}

export default function EnquiryForm({ 
  rooms, 
  selectedRoomId = "", 
  initialCheckIn = "", 
  initialCheckOut = "", 
  onSuccess 
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    checkIn: initialCheckIn,
    checkOut: initialCheckOut,
    guests: 1,
    roomId: selectedRoomId || (rooms.length > 0 ? rooms[0].id : ""),
    message: "",
    preferredContact: "whatsapp" as "whatsapp" | "email" | "call"
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successData, setSuccessData] = useState<{
    enquiry: Enquiry;
    whatsappUrl: string;
    mailtoUrl: string;
  } | null>(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      roomId: selectedRoomId || prev.roomId,
      checkIn: initialCheckIn || prev.checkIn,
      checkOut: initialCheckOut || prev.checkOut
    }));
  }, [selectedRoomId, initialCheckIn, initialCheckOut]);

  const selectedRoom = rooms.find((r) => r.id === formData.roomId);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required.";
    if (!formData.checkOut) {
      newErrors.checkOut = "Check-out date is required.";
    } else if (formData.checkIn && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = "Check-out must be after check-in.";
    }
    if (selectedRoom && formData.guests > selectedRoom.capacity) {
      newErrors.guests = `Max capacity for ${selectedRoom.name} is ${selectedRoom.capacity} guests.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Failed to send booking inquiry");
      }

      const data = await res.json();
      setSuccessData({
        enquiry: data.enquiry,
        whatsappUrl: data.whatsappUrl,
        mailtoUrl: data.mailtoUrl
      });
      if (onSuccess) onSuccess(data.enquiry);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please connect with us directly on WhatsApp or phone.");
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const getDayAfterTomorrowDate = () => {
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    return dayAfter.toISOString().split("T")[0];
  };

  return (
    <div id="enquiry-form-root" className="bg-white border border-brand-border rounded-3xl p-6 md:p-8 shadow-sm">
      <AnimatePresence mode="wait">
        {!successData ? (
          <motion.form
            id="main-enquiry-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <h3 className="font-editorial text-3xl tracking-wide text-brand-text mb-1">Plan Your Experience</h3>
              <p className="text-xs text-brand-text-sec font-light">
                Fill this enquiry. We verify the room calendar manually within minutes and ping you to confirm.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-text">Preferred Stay Dates</label>
              <DatePickerCalendar
                startDate={formData.checkIn}
                endDate={formData.checkOut}
                onChange={(start, end) => setFormData((prev) => ({ ...prev, checkIn: start, checkOut: end }))}
                minDate={getTomorrowDate()}
              />
              <div className="flex flex-col gap-1 mt-1">
                {errors.checkIn && <p className="text-[10px] text-red-500 font-medium">{errors.checkIn}</p>}
                {errors.checkOut && <p className="text-[10px] text-red-500 font-medium">{errors.checkOut}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Room Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-text">Select Suite</label>
                <select
                  value={formData.roomId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, roomId: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/30 text-sm focus:border-brand-green outline-none appearance-none"
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} (₹{room.price}/n)
                    </option>
                  ))}
                </select>
              </div>

              {/* Guests Count */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-text">Guests Count</label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sec" />
                  <input
                    type="number"
                    min={1}
                    max={selectedRoom ? selectedRoom.capacity : 4}
                    value={formData.guests}
                    onChange={(e) => setFormData((prev) => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-border bg-brand-bg/30 text-sm focus:border-brand-green outline-none"
                  />
                </div>
                {selectedRoom && (
                  <p className="text-[10px] text-brand-text-sec">
                    Maximum capacity of chosen room: {selectedRoom.capacity} guests
                  </p>
                )}
                {errors.guests && <p className="text-[10px] text-red-500 font-medium">{errors.guests}</p>}
              </div>
            </div>

            {/* Guest Basic Info */}
            <div className="space-y-4 pt-2 border-t border-brand-border">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-text">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kaushal Nitish"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/30 text-sm focus:border-brand-green outline-none placeholder:text-brand-text-sec/50"
                />
                {errors.name && <p className="text-[10px] text-red-500 font-medium">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-text">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 94184 85295"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/30 text-sm focus:border-brand-green outline-none placeholder:text-brand-text-sec/50"
                  />
                  {errors.phone && <p className="text-[10px] text-red-500 font-medium">{errors.phone}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-text">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. stay@nirvanachamba.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/30 text-sm focus:border-brand-green outline-none placeholder:text-brand-text-sec/50"
                  />
                  {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Special Request */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-text">Special Requests (Optional)</label>
              <textarea
                rows={2}
                placeholder="Let us know if you want local Dham food, pet facilities, airport transfers, etc..."
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-bg/30 text-sm focus:border-brand-green outline-none placeholder:text-brand-text-sec/50 resize-none"
              />
            </div>

            {/* Preferred Contact Method */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-text block">Preferred Contact Method</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
                  { value: "email", label: "Email", icon: Mail },
                  { value: "call", label: "Phone Call", icon: Phone }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => setFormData((prev) => ({ ...prev, preferredContact: item.value as any }))}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs gap-1.5 transition-all ${
                        formData.preferredContact === item.value
                          ? "bg-brand-green/5 border-brand-green text-brand-green font-medium"
                          : "border-brand-border text-brand-text-sec hover:bg-brand-bg/30"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-green text-white hover:bg-brand-green-hover py-4 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing Request...</span>
                </>
              ) : (
                <>
                  <span>Submit Booking Enquiry</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            id="enquiry-success-pane"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 space-y-6"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="h-16 w-16 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green animate-bounce">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="font-editorial text-3xl tracking-wide text-brand-text">Enquiry Received</h3>
              <p className="text-sm text-brand-text-sec font-light max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-medium text-brand-text">{formData.name}</span>. We have logged your request under reference <span className="font-mono bg-brand-bg px-1.5 py-0.5 rounded text-xs text-brand-green">{successData.enquiry.id}</span>.
              </p>
            </div>

            {/* Manual workflows explanation */}
            <div className="bg-brand-bg/50 border border-brand-border rounded-2xl p-4 text-left space-y-3.5 max-w-md mx-auto">
              <div className="flex gap-2.5">
                <span className="h-5 w-5 rounded-full bg-brand-green text-white text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wide">Manual Check in Progress</h4>
                  <p className="text-xs text-brand-text-sec mt-0.5 leading-relaxed font-light">
                    Our team is matching your requested dates against actual homestay calendars immediately.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2.5">
                <span className="h-5 w-5 rounded-full bg-brand-green text-white text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="text-xs font-semibold text-brand-text uppercase tracking-wide">Instant Ping</h4>
                  <p className="text-xs text-brand-text-sec mt-0.5 leading-relaxed font-light">
                    You'll receive confirmation via your preferred method ({formData.preferredContact}).
                  </p>
                </div>
              </div>
            </div>

            {/* Instant CTAs to bypass or speed up */}
            <div className="space-y-3 max-w-sm mx-auto">
              <a
                href={successData.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd57] text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all duration-300"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span>Notify via WhatsApp</span>
              </a>

              <a
                href={successData.mailtoUrl}
                className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all duration-300"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>Notify via Email</span>
              </a>

              <button
                onClick={() => {
                  setSuccessData(null);
                  setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    checkIn: "",
                    checkOut: "",
                    guests: 1,
                    roomId: rooms[0]?.id || "",
                    message: "",
                    preferredContact: "whatsapp"
                  });
                }}
                className="text-xs text-brand-text-sec hover:text-brand-green font-medium underline block mx-auto pt-2"
              >
                Submit another enquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
