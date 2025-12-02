"use client";

import { useContext, useEffect, useState } from "react";
import { modalEnabledContext } from "../context/modalEnabled";
import { enableModalContext } from "../context/enableModal";

interface ModalOverlayComponentProps {
    children: React.ReactNode;
    name: string;
}
export default function ModalOverlayComponent({
    name,
    children,
}: ModalOverlayComponentProps) {
    const [modalState, setModalState] = useState<boolean>(false);
    const { active, setActive, reservationID } = useContext(enableModalContext);

    useEffect(() => {
        if (active == name) {
            console.log(reservationID);
            setModalState(true);
            setActive("none");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <>
            <modalEnabledContext.Provider value={{ modalState, setModalState }}>
                <span
                    className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.55)] z-100"
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
