import React, { createContext, useContext, useState, useEffect } from "react";
import { Room } from "../types";

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
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load rooms in provider:", err);
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
