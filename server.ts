import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize AI SDK with system telemetries
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Data paths
const DATA_DIR = path.join(process.cwd(), "data");
const ROOMS_FILE = path.join(DATA_DIR, "rooms.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");

// Ensure data folder and default files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default rooms
const defaultRooms = [
  {
    id: "cedar-suite",
    name: "The Cedar Suite",
    price: 8500,
    capacity: 2,
    size: "450 sq ft",
    description: "A gorgeous wood-paneled corner room featuring panoramic forest views and a private cedar deck.",
    longDescription: "Built entirely of aromatic Himalayan cedar (Deodar) and natural slate stone. Features a private floating cedar wood balcony overlooking the Chamera valley mist. Equipped with an artisanal wood stove for chilly evenings, premium King size bed with organic cotton sheets, a designer copper bathtub, and dedicated high-speed fiber-optic workspace with artisanal espresso maker.",
    amenities: ["King Bed", "Private Deck", "Copper Tub", "Wood Fireplace", "High-speed Wi-Fi", "Espresso Maker", "Premium Linens", "Scenic Mountain View"],
    view: "Panoramic Snow-capped Himalayan Range & Pine Forest",
    image: "/images/cedar_suite_interior_1782394643530.webp",
    isAvailable: true,
    rating: 4.9,
    bedType: "1 Extra-Large King Bed",
    images: ["/images/cedar_suite_interior_1782394643530.webp", "/images/homestay_exterior_1782394626548.webp"]
  },
  {
    id: "mist-nest",
    name: "The Mist Nest (Penthouse Loft)",
    price: 12000,
    capacity: 4,
    size: "750 sq ft",
    description: "Elegant duplex attic loft featuring a double-height floor-to-ceiling glass wall and premium star-gazing ceilings.",
    longDescription: "Our most premium accommodation. Built high into the rafters of the chalet with dramatic sloping timber ceilings and double-height architectural glazing. Features an upper sleeping loft, a cozy lower lounge with an iron stove, a private wrap-around terrace, customized organic tea bar, and deep clay soaking tub. Perfect for families, couples seeking high-end isolation, or a premium long-term creative workcation.",
    amenities: ["Upper Loft Bed", "Wrap-around Deck", "Double-height Glass Wall", "Tea Sommelier Bar", "Deep Clay Soak Tub", "Workspace", "Marshall Bluetooth Speaker", "Private Fireplace"],
    view: "Sky-high Panoramic Views & Rising Morning Clouds",
    image: "/images/homestay_exterior_1782394626548.webp",
    isAvailable: true,
    rating: 5.0,
    bedType: "2 Queen-size Floating Beds",
    images: ["/images/homestay_exterior_1782394626548.webp", "/images/cedar_suite_interior_1782394643530.webp"]
  },
  {
    id: "pine-room",
    name: "The Pine Room",
    price: 6500,
    capacity: 2,
    size: "350 sq ft",
    description: "A cozy ground-floor sanctuary with direct French door access to the lush lawn and apple orchard gardens.",
    longDescription: "Designed for a serene, earth-grounded connection. Opens directly onto the lush private gardens and apple orchards of Nirvana. Features beautiful exposed-stone masonry, high ceilings with solid pine rafters, local Himachali woven rugs, a private patio with Adirondack chairs, modern heated flooring, and organic shower rituals with locally-crafted essential oils.",
    amenities: ["Plush Queen Bed", "Direct Garden Access", "Private Patio", "Heated Floors", "Organic Shower Essentials", "High-speed Wi-Fi", "Traditional Local Rugs", "Tea Station"],
    view: "Immersive Rose Garden & Apple Orchard Views",
    image: "/images/bonfire_evening_1782394660663.webp",
    isAvailable: true,
    rating: 4.8,
    bedType: "1 Premium Queen Bed",
    images: ["/images/bonfire_evening_1782394660663.webp", "/images/homestay_exterior_1782394626548.webp"]
  }
];

const defaultGallery = [
  {
    id: "g1",
    url: "/images/homestay_exterior_1782394626548.webp",
    category: "views",
    caption: "Chalet under the evening glow",
    description: "The exterior architecture blends natural cedar, local stone, and modern panoramic glass perfectly with Chamba's landscape."
  },
  {
    id: "g2",
    url: "/images/cedar_suite_interior_1782394643530.webp",
    category: "rooms",
    caption: "Sunrise at the Cedar Suite",
    description: "Watch the morning mist lift over the snow-covered pine peaks right from your warm bedding."
  },
  {
    id: "g3",
    url: "/images/bonfire_evening_1782394660663.webp",
    category: "bonfire",
    caption: "Whispering nights under the stars",
    description: "Gather around our artisan fire pit, exchange stories, and enjoy hot home-style meals with live acoustic tunes."
  }
];

// File checking helper
const readJSON = (filePath: string, defaultVal: any) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), "utf-8");
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultVal;
  }
};

const writeJSON = (filePath: string, data: any) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

// API Endpoints
// 1. Get Rooms
app.get("/api/rooms", (req, res) => {
  const rooms = readJSON(ROOMS_FILE, defaultRooms);
  res.json(rooms);
});

// Update Room (Admin Dashboard)
app.put("/api/rooms/:id", (req, res) => {
  const { id } = req.params;
  const rooms = readJSON(ROOMS_FILE, defaultRooms);
  const idx = rooms.findIndex((r: any) => r.id === id);
  if (idx > -1) {
    rooms[idx] = { ...rooms[idx], ...req.body };
    writeJSON(ROOMS_FILE, rooms);
    res.json(rooms[idx]);
  } else {
    res.status(404).json({ error: "Room not found" });
  }
});

// 2. Enquiries
app.get("/api/enquiries", (req, res) => {
  const enquiries = readJSON(ENQUIRIES_FILE, []);
  res.json(enquiries);
});

app.post("/api/enquiries", (req, res) => {
  const { name, phone, email, checkIn, checkOut, guests, roomId, message, preferredContact } = req.body;
  
  if (!name || !phone || !email || !checkIn || !checkOut || !roomId) {
    return res.status(400).json({ error: "Missing required booking details." });
  }

  const enquiries = readJSON(ENQUIRIES_FILE, []);
  const newEnquiry = {
    id: "enq-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    name,
    phone,
    email,
    checkIn,
    checkOut,
    guests: Number(guests) || 1,
    roomId,
    message: message || "",
    preferredContact: preferredContact || "whatsapp",
    status: "pending",
    createdAt: new Date().toISOString(),
    adminNotes: ""
  };

  enquiries.unshift(newEnquiry);
  writeJSON(ENQUIRIES_FILE, enquiries);

  // Generate mailto and WhatsApp link
  const checkInStr = new Date(checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const checkOutStr = new Date(checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const rooms = readJSON(ROOMS_FILE, defaultRooms);
  const selectedRoom = rooms.find((r: any) => r.id === roomId);
  const roomName = selectedRoom ? selectedRoom.name : roomId;

  const waText = `Hello Nirvana Homestay, I would like to enquire about booking ${roomName} from ${checkInStr} to ${checkOutStr} for ${guests} guests. My name is ${name}. Please confirm availability. Thank you!`;
  const whatsappUrl = `https://wa.me/919418485295?text=${encodeURIComponent(waText)}`; // Standard Chamba host number

  const mailSubject = `Nirvana Booking Enquiry - ${name} - ${roomName}`;
  const mailBody = `Hi Admin,\n\nI want to book the following:\n- Room: ${roomName}\n- Stay: ${checkInStr} to ${checkOutStr}\n- Guests: ${guests}\n- Preferred contact: ${preferredContact}\n- Message: ${message || "N/A"}\n\nClient Details:\n- Name: ${name}\n- Phone: ${phone}\n- Email: ${email}\n\nPlease update status on the Nirvana Dashboard!`;
  const mailtoUrl = `mailto:stay@nirvanachamba.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  res.status(201).json({
    enquiry: newEnquiry,
    whatsappUrl,
    mailtoUrl,
    message: "Your booking enquiry has been recorded successfully. Our team will contact you shortly!"
  });
});

app.put("/api/enquiries/:id", (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;
  const enquiries = readJSON(ENQUIRIES_FILE, []);
  const idx = enquiries.findIndex((e: any) => e.id === id);
  if (idx > -1) {
    enquiries[idx] = { ...enquiries[idx], status, adminNotes };
    writeJSON(ENQUIRIES_FILE, enquiries);
    res.json(enquiries[idx]);
  } else {
    res.status(404).json({ error: "Enquiry not found" });
  }
});

// Delete Enquiry
app.delete("/api/enquiries/:id", (req, res) => {
  const { id } = req.params;
  const enquiries = readJSON(ENQUIRIES_FILE, []);
  const filtered = enquiries.filter((e: any) => e.id !== id);
  writeJSON(ENQUIRIES_FILE, filtered);
  res.json({ success: true, message: "Enquiry deleted successfully." });
});

// 3. Gallery
app.get("/api/gallery", (req, res) => {
  const gallery = readJSON(GALLERY_FILE, defaultGallery);
  res.json(gallery);
});

app.post("/api/gallery", (req, res) => {
  const { url, category, caption, description } = req.body;
  if (!url || !category || !caption) {
    return res.status(400).json({ error: "Missing required gallery parameters." });
  }
  const gallery = readJSON(GALLERY_FILE, defaultGallery);
  const newItem = {
    id: "g-" + Math.random().toString(36).substr(2, 9),
    url,
    category,
    caption,
    description: description || ""
  };
  gallery.push(newItem);
  writeJSON(GALLERY_FILE, gallery);
  res.status(201).json(newItem);
});

// Delete Gallery item
app.delete("/api/gallery/:id", (req, res) => {
  const { id } = req.params;
  const gallery = readJSON(GALLERY_FILE, defaultGallery);
  const filtered = gallery.filter((item: any) => item.id !== id);
  writeJSON(GALLERY_FILE, filtered);
  res.json({ success: true });
});

// 4. Virtual AI Concierge (Powered by Gemini 3.5-flash)
app.post("/api/concierge", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request payload. 'messages' array is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Graceful fallback response when API key is unconfigured
    return res.json({
      text: "Hello! I am Devi, your virtual mountain host at Nirvana Homestay. I'd love to help you plan your getaway to Chamba! (Note: The Gemini host is currently operating in local guide mode as the API Key is in setup phase). I can tell you that our luxurious Cedar Suite (₹8,500/night) or Mist Nest Duplex (₹12,000/night) are perfect, and we are located right in pristine Chamba, very close to Chamera Lake and Khajjiar. What kind of experience are you looking to design?"
    });
  }

  try {
    const rooms = readJSON(ROOMS_FILE, defaultRooms);
    
    // Build context-rich system instructions explaining everything about the property
    const systemInstruction = `You are Devi, the friendly, highly professional, and welcoming local mountain host/concierge of "Nirvana Homestay" in Chamba, Himachal Pradesh. 
Your tone should be warm, luxury-focused, elegant, poetic yet practical, mirroring high-end hospitality brands like Aman Resorts, Six Senses, or StayVista.
You know the local landscape inside out, speak deeply of Chamba's heritage, pine-foraging paths, the mist coming off Chamera Lake, and local organic foods.

Here is deep factual knowledge about Nirvana Homestay:
1. PROPERTY & STORY:
- Built with local mountain deodar (cedar) timber and natural mountain-cut slate.
- Located in Chamba, Himachal Pradesh, overlooking pristine deodar forests and rising clouds.
- Designed as an emotional nature retreat rather than a standard commercial hotel.
- Run by local hospitality pioneers (founding team: Kaushal & Nitish) with a farm-to-table culinary focus.
- 2 PM check-in, 11 AM check-out.

2. ROOM COLLECTION & PRICES:
${rooms.map((r: any) => `- **${r.name}** (₹${r.price}/night, Capacity: ${r.capacity} guests): ${r.description} Views: ${r.view}. Amenities include: ${r.amenities.join(", ")}. Bed: ${r.bedType}. Size: ${r.size}.`).join("\n")}

3. LOCAL EXPERIENCE & MEALS:
- Organic Farm-to-Table food. Freshly prepared local Himachali "Dham" (authentic feast) or Chamba Chukh (traditional local chili paste). Fresh buttermilk, wild honey, cedar forest herbal infusions.
- Cozy evenings around our stone-lined fire pit (bonfire logs included for suite bookings).
- Pine forest walks, bird watching, and Chamera lake boating.
- Fiber Wi-Fi (high speed) makes it stellar for peaceful remote workcations.

4. TRANSLOCATION & DIRECTIONS:
- Chamba Town: 3 km (8 mins drive)
- Chamera Lake: 15 km (30 mins drive)
- Khajjiar (India's Mini Switzerland): 22 km (45 mins drive)
- Nearest transit: Pathankot Railway Station (118 km, ~3.5 hrs drive), Kangra Airport (120 km, ~4 hrs drive).

5. POLICIES:
- Cancellation: Full refund up to 7 days prior. 50% refund between 7 to 3 days. No refund within 72 hours.
- Pets: Very pet-friendly! We have a secure open lawn and play space (please inform in advance).
- Parking: Free, secure, private on-site car parking is available.

REASONING RULES:
- When guests ask about prices or bookings, recommend the room matching their capacity/needs and invite them to fill our secure booking form or press the "Book Your Stay" buttons.
- Answer questions on Chamba weather (Summers are pleasant at 15-25°C; Monsoons bring misty valleys; Winters are cold 2-10°C with snow nearby on higher hills).
- Keep responses concise, poetic, and scannable. Use Markdown highlights to retain elegance.
- Do NOT make up facts. Stick strictly to this data.`;

    // Map client messages to Gemini's expected SDK format
    const formattedContents = messages.map((m: any) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      text: response.text || "I am here to guide you on our beautiful mountain stay. How may I assist you?"
    });

  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Our virtual concierge is temporarily watching the mist. Please retry in a moment!" });
  }
});

// Serve static assets and SPA entry in production
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Development Server running on http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  
  app.get("*all", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Production Server running on port ${PORT}`);
  });
}
