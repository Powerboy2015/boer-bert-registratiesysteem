"use client";

import { useState } from "react";
import { modalEnabledContext } from "../context/modalEnabled";

interface ModalOverlayComponentProps {
    children: React.ReactNode;
}
export default function ModalOverlayComponent({
    children,
}: ModalOverlayComponentProps) {
    const [modalState, setModalState] = useState<boolean>(true);
    return (
        <>
            <modalEnabledContext.Provider value={{ modalState, setModalState }}>
                <span
                    className="absolute flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.55)] z-100"
                    style={{
                        display: modalState ? "flex" : "none",
                    }}
                >
                    {children}
                </span>
            </modalEnabledContext.Provider>
        </>
    );
}
