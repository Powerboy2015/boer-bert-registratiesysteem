"use client";
import { useContext } from "react";
import EditReservationButton from "./EditReservationButton";
import { modalEnabledContext } from "../context/modalEnabled";
import { Roboto, Roboto_Mono } from "next/font/google";

const roboto = Roboto({
    weight: "500",
    subsets: ["latin"],
});
const roboto_mono = Roboto_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default function DeleteReservationModal() {
    const { setModalState } = useContext(modalEnabledContext);

    const closeModal = () => {
        setModalState(false);
    };
    return (
        <>
            <div className="w-full h-full p-[254px]">
                <div
                    id="inner"
                    className="w-full h-full bg-(--color-accent-2) flex flex-col px-[32px] py-[64px] gap-[48px]"
                >
                    <h2
                        className={`m-[0px] ${roboto.className} text-(--color-text) text-[24px]`}
                    >
                        Weet U zeker dat U deze reservering wilt verwijderen?
                    </h2>
                    <div
                        className={`flex flex-col gap-[8px] ${roboto_mono.className} text-(--color-text) text-[24px]`}
                    >
                        <div className="flex">
                            <strong>Naam: </strong>
                            <p className="m-[0px]">JanJantjes</p>
                        </div>
                        <div className="flex">
                            <strong>Datum: </strong>
                            <p className="m-[0px]">23 nov 2025</p>
                        </div>
                        <div className="flex">
                            <strong>Plaats: </strong>
                            <p className="m-[0px]">10 (Groot)</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[64px]">
                        <EditReservationButton
                            text="Terug"
                            btnCallback={closeModal}
                        />
                        <EditReservationButton
                            text="Verwijder"
                            color="#FC4545"
                            btnCallback={closeModal}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
