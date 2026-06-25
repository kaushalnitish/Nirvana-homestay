import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Room, Enquiry, GalleryItem } from "../types";
import { ShieldAlert, Trash2, Check, X, Edit, DollarSign, Calendar, Sliders, ChevronDown, Plus, LayoutGrid, Layers, RefreshCw, Star } from "lucide-react";

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"enquiries" | "rooms" | "gallery">("enquiries");
  
  // Gallery upload state
  const [newPhoto, setNewPhoto] = useState({
    url: "",
    category: "rooms" as any,
    caption: "",
    description: ""
  });

  // Fetch all state
  const fetchData = () => {
    fetch("/api/enquiries").then(r => r.json()).then(setEnquiries);
    fetch("/api/rooms").then(r => r.json()).then(setRooms);
    fetch("/api/gallery").then(r => r.json()).then(setGallery);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update Enquiry status
  const handleUpdateEnquiry = async (id: string, status: "pending" | "approved" | "rejected", notes?: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNotes: notes || "" })
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Enquiry
  const handleDeleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking request?")) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Room Availability
  const handleToggleRoom = async (room: Room) => {
    try {
      const res = await fetch(`/api/rooms/${room.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !room.isAvailable })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Room Price
  const handleUpdatePrice = async (id: string, currentPrice: number) => {
    const val = prompt("Enter new price per night (₹):", currentPrice.toString());
    if (val === null) return;
    const price = parseInt(val);
    if (isNaN(price)) return alert("Please enter a valid number");
    
    try {
      const res = await fetch(`/api/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price })
      });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add Photo to Gallery
  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.url || !newPhoto.caption) return alert("Please provide photo URL and caption.");

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPhoto)
      });
      if (res.ok) {
        fetchData();
        setNewPhoto({ url: "", category: "rooms", caption: "", description: "" });
        alert("Photo uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Gallery photo
  const handleDeletePhoto = async (id: string) => {
    if (!confirm("Are you sure you want to remove this photo?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="admin-dashboard-container" className="bg-white border border-brand-border rounded-3xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-editorial text-2xl tracking-wide text-brand-text">Admin Control Panel</h3>
            <p className="text-xs text-brand-text-sec font-light">Real-time properties, reservation queues and content logs</p>
          </div>
        </div>

        {/* Tab Badges */}
        <div className="flex bg-brand-bg rounded-xl p-1 shrink-0 self-start sm:self-auto">
          {[
            { id: "enquiries", label: "Booking Requests", count: enquiries.length },
            { id: "rooms", label: "Rooms & Pricing", count: rooms.length },
            { id: "gallery", label: "Gallery Store", count: gallery.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase transition-all whitespace-nowrap font-medium ${
                activeTab === tab.id
                  ? "bg-white text-brand-green shadow-sm"
                  : "text-brand-text-sec hover:text-brand-text"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Panels */}
      <div id="admin-panel-content">
        <AnimatePresence mode="wait">
          {activeTab === "enquiries" && (
            <motion.div
              key="enquiries"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {enquiries.length === 0 ? (
                <div className="text-center py-12 text-brand-text-sec">
                  <Calendar className="h-10 w-10 stroke-[1.25] mx-auto mb-2 text-brand-text-sec/40" />
                  <p className="text-sm font-light">No booking enquiries received yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-brand-border text-brand-text-sec uppercase tracking-widest pb-3 font-semibold">
                        <th className="py-3 px-2">Enquiry ID / Date</th>
                        <th className="py-3 px-2">Guest / Contact</th>
                        <th className="py-3 px-2">Dates / Room</th>
                        <th className="py-3 px-2 text-center">Status</th>
                        <th className="py-3 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map((e) => {
                        const checkInStr = new Date(e.checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
                        const checkOutStr = new Date(e.checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
                        const dateString = new Date(e.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
                        
                        return (
                          <tr key={e.id} className="border-b border-brand-border hover:bg-brand-bg/20 transition-all">
                            <td className="py-4 px-2">
                              <span className="font-mono bg-brand-bg px-1.5 py-0.5 rounded text-brand-green font-medium">{e.id}</span>
                              <p className="text-[10px] text-brand-text-sec mt-1">{dateString}</p>
                            </td>
                            <td className="py-4 px-2">
                              <p className="font-semibold text-brand-text">{e.name}</p>
                              <p className="text-brand-text-sec font-light mt-0.5">{e.phone} | {e.email}</p>
                              <span className="text-[10px] bg-brand-green/5 text-brand-green px-1.5 py-0.5 rounded-full inline-block mt-1">
                                Prefers: {e.preferredContact}
                              </span>
                            </td>
                            <td className="py-4 px-2">
                              <p className="font-medium">{checkInStr} to {checkOutStr}</p>
                              <p className="text-brand-text-sec font-light mt-0.5">{e.guests} guests • Room ID: {e.roomId}</p>
                              {e.message && <p className="text-[10px] italic text-brand-text-sec mt-1 max-w-xs truncate">"{e.message}"</p>}
                            </td>
                            <td className="py-4 px-2 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                                e.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : e.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {e.status}
                              </span>
                            </td>
                            <td className="py-4 px-2 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {e.status === "pending" && (
                                  <>
                                    <button
                                      onClick={() => handleUpdateEnquiry(e.id, "approved")}
                                      className="h-7 w-7 rounded-lg bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-all"
                                      title="Approve Booking"
                                    >
                                      <Check className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleUpdateEnquiry(e.id, "rejected")}
                                      className="h-7 w-7 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all"
                                      title="Reject Request"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </>
                                )}
                                <button
                                  onClick={() => handleDeleteEnquiry(e.id)}
                                  className="h-7 w-7 rounded-lg bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 flex items-center justify-center transition-all"
                                  title="Delete Enquiry"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "rooms" && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {rooms.map((room) => (
                <div key={room.id} className="border border-brand-border rounded-2xl overflow-hidden bg-brand-bg/10 flex flex-col">
                  <div className="relative h-40 overflow-hidden bg-gray-200">
                    <img
                      src={room.image}
                      alt={room.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-semibold text-brand-green">
                      {room.size}
                    </div>
                  </div>
                  
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-editorial text-xl tracking-wide text-brand-text font-medium">{room.name}</h4>
                        <span className={`h-2.5 w-2.5 rounded-full ${room.isAvailable ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                      </div>
                      <p className="text-xs text-brand-text-sec font-light mt-1.5 leading-relaxed">{room.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-brand-border">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-brand-text-sec uppercase tracking-widest font-semibold block">Price Per Night</span>
                          <span className="font-mono text-base font-semibold text-brand-green">₹{room.price.toLocaleString("en-IN")}</span>
                        </div>
                        <button
                          onClick={() => handleUpdatePrice(room.id, room.price)}
                          className="px-2.5 py-1.5 text-[10px] uppercase font-bold border border-brand-border rounded-lg bg-white text-brand-text hover:bg-brand-bg transition-all flex items-center gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-brand-text-sec uppercase tracking-widest font-semibold">Listing Status</span>
                        <button
                          onClick={() => handleToggleRoom(room)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all ${
                            room.isAvailable
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {room.isAvailable ? "Active" : "Disabled"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Form to add photos */}
              <form onSubmit={handleAddPhoto} className="bg-brand-bg/50 border border-brand-border p-4 rounded-2xl space-y-4">
                <h4 className="font-editorial text-lg text-brand-text font-medium flex items-center gap-1.5">
                  <Plus className="h-4 w-4" />
                  <span>Upload New Experience Photo</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-brand-text-sec">Photo URL</label>
                    <input
                      type="text"
                      placeholder="e.g. /src/assets/images/..."
                      value={newPhoto.url}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, url: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-brand-border bg-white text-xs outline-none focus:border-brand-green"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-brand-text-sec">Category</label>
                    <select
                      value={newPhoto.category}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 rounded-lg border border-brand-border bg-white text-xs outline-none focus:border-brand-green"
                    >
                      <option value="rooms">Rooms</option>
                      <option value="views">Views</option>
                      <option value="food">Organic Food</option>
                      <option value="bonfire">Bonfire</option>
                      <option value="interiors">Interiors</option>
                      <option value="garden">Garden</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-brand-text-sec">Caption</label>
                    <input
                      type="text"
                      placeholder="e.g. Cedar suite afternoon sun"
                      value={newPhoto.caption}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-brand-border bg-white text-xs outline-none focus:border-brand-green"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div className="md:col-span-3 space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-brand-text-sec">Long Description (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. A gorgeous view of the snow-peaks in June afternoon..."
                      value={newPhoto.description}
                      onChange={(e) => setNewPhoto(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-brand-border bg-white text-xs outline-none focus:border-brand-green"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-green text-white hover:bg-brand-green-hover py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
                  >
                    Add Photo
                  </button>
                </div>
              </form>

              {/* Grid of existing items to delete */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="relative group rounded-xl overflow-hidden border border-brand-border h-28 bg-gray-100">
                    <img
                      src={item.url}
                      alt={item.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-brand-text/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleDeletePhoto(item.id)}
                        className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 shadow transition-colors"
                        title="Delete Image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-semibold text-brand-text truncate max-w-[calc(100%-1.5rem)]">
                      {item.caption}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
