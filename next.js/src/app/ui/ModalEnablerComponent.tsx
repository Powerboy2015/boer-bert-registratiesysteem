"use client";

import { useState } from "react";
import { enableModalContext } from "../context/enableModal";

interface ModalOverlEnablernentProps {
    children: React.ReactNode;
}
export default function ModalEnablerComponent({
    children,
}: ModalOverlEnablernentProps) {
    const [active, setActive] = useState<string>("null");
    const [reservationID, setReservationID] = useState<string>("bull");
    return (
        <>
            <enableModalContext.Provider
                value={{ active, setActive, reservationID, setReservationID }}
            >
                {children}
            </enableModalContext.Provider>
        </>
    );
}
