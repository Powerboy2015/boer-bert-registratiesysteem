"use client";
import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { createContext, useState } from "react";
import DesktopReservationModal from "../components/DesktopReservationModal";

interface OverlayContext {
    setActiveReservation: (res: Reservering | null) => void;
}

export const OverlayContext = createContext<OverlayContext | null>(null);

export function ReservationOverlayProvider({ children }: { children: React.ReactNode }) {
    const [activeReservation, setActiveReservation] = useState<Reservering | null>(null);

    return (
        <OverlayContext.Provider value={{ setActiveReservation }}>
            {children}
            <div id="overlays" className="fixed w-full h-full bg-black opacity-60 z-10">
                {activeReservation && <DesktopReservationModal res={activeReservation} />}
            </div>
        </OverlayContext.Provider>
    );
}
