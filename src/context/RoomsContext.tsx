import React, { createContext, useContext, useState, useEffect } from "react";
import { Room } from "../types";
import { defaultRooms } from "../data";

interface RoomsContextType {
  rooms: Room[];
  loading: boolean;
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

export function RoomsProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRooms(data);
        } else {
          setRooms(defaultRooms);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load rooms via API, falling back to static data:", err);
        setRooms(defaultRooms);
        setLoading(false);
      });
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, loading, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  const context = useContext(RoomsContext);
  if (context === undefined) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
}
