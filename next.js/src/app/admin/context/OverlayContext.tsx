"use client";
import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { createContext, useState } from "react";
import DesktopReservationModal from "../components/DesktopReservationModal";

interface OverlayContext {
    setActiveReservation: (res: Reservering | null) => void;
    reloadReservations: (() => void) | null;
    setReloadReservations: (res: (() => void) | null) => void;
}

// This lets us call the context to easily set a variable later on in top level components.
export const OverlayContext = createContext<OverlayContext | null>(null);

export function ReservationOverlayProvider({ children }: { children: React.ReactNode }) {
    const [activeReservation, setActiveReservation] = useState<Reservering | null>(null);
    const [reloadReservations, setReloadReservations] = useState<(() => void) | null>(null);

    return (
        // Here we tell what the context should hold and by wrapping everything around it, it allows us to use it.
        <OverlayContext.Provider value={{ setActiveReservation, reloadReservations, setReloadReservations }}>
            {children}

            {activeReservation && (
                <div id="overlays" className="fixed w-full h-full z-10 top-0 left-0 hidden lg:flex lg:flex-row">
                    <span
                        onClick={() => {
                            setActiveReservation(null);
                        }}
                        className="block flex-1 left-0 top-0 h-full bg-[rgba(0,0,0,0.60)]"
                    />
                    <DesktopReservationModal res={activeReservation} />
                </div>
            )}
        </OverlayContext.Provider>
    );
}
