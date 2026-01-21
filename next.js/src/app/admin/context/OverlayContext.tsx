"use client";
import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { createContext, useState } from "react";
import DesktopReservationModal from "../components/DesktopReservationModal";

interface OverlayContext {
    setActiveReservation: (res: Reservering | null) => void;
}

// This lets us call the context to easily set a variable later on in top level components.
export const OverlayContext = createContext<OverlayContext | null>(null);

export function ReservationOverlayProvider({ children }: { children: React.ReactNode }) {
    const [activeReservation, setActiveReservation] = useState<Reservering | null>(null);

    return (
        // Here we tell what the context should hold and by wrapping everything around it, it allows us to use it.
        <OverlayContext.Provider value={{ setActiveReservation }}>
            {children}

            {activeReservation && (
                <div id="overlays" className="fixed w-full h-full bg-black opacity-60 z-10 top-0 left-0">
                    <DesktopReservationModal res={activeReservation} />
                </div>
            )}
        </OverlayContext.Provider>
    );
}
