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
    const { active, setActive } = useContext(enableModalContext);

    useEffect(() => {
        if (active == name) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setModalState(true);
            setActive("none");
        }
    }, [active]);

    return (
        <>
            <modalEnabledContext.Provider value={{ modalState, setModalState }}>
                <span
                    className="fixed top-[0px] left-[0px] flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.55)] z-100"
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
