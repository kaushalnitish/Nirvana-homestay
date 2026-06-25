export interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  size: string;
  description: string;
  longDescription: string;
  amenities: string[];
  view: string;
  image: string;
  isAvailable: boolean;
  rating: number;
  bedType: string;
  images: string[];
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  message?: string;
  preferredContact: "whatsapp" | "email" | "call";
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  adminNotes?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  authorImage?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  category: "rooms" | "views" | "food" | "bonfire" | "interiors" | "garden";
  caption: string;
  description?: string;
}

export interface NearbyAttraction {
  id: string;
  name: string;
  distance: string;
  duration: string;
  description: string;
  travelTips: string[];
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: "booking" | "cancellation" | "food" | "parking" | "pets" | "checkin" | "weather";
}

export interface Message {
  role: "user" | "model";
  text: string;
  timestamp: string;
}
