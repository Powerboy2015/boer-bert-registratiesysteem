"use client";
import { useContext } from "react";
import EditReservationButton from "./EditReservationButton";
import { modalEnabledContext } from "../context/modalEnabled";
import { Roboto, Roboto_Mono } from "next/font/google";
import { DeleteReservation } from "../connections/dk";
import { enableModalContext } from "../context/enableModal";

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
    const { reservationID } = useContext(enableModalContext);

    const closeModal = () => {
        setModalState(false);
    };

    const deleteFunction = () => {
        closeModal();
        DeleteReservation(reservationID);
        window.location.href = "/dashboard/reservations";
    };

    return (
        <>
            <div className="w-full h-full p-[254px]">
                <div
                    id="inner"
                    className="w-full h-full bg-(--color-accent-2) flex flex-col px-8 py-16 gap-12"
                >
                    <h2
                        className={`m-0 ${roboto.className} text-(--color-text) text-[24px]`}
                    >
                        Weet U zeker dat U deze reservering wilt verwijderen?
                    </h2>
                    <div
                        className={`flex flex-col gap-2 ${roboto_mono.className} text-(--color-text) text-[24px]`}
                    >
                        <div className="flex">
                            <strong>Naam: </strong>
                            <p className="m-0">JanJantjes</p>
                        </div>
                        <div className="flex">
                            <strong>Datum: </strong>
                            <p className="m-0">23 nov 2025</p>
                        </div>
                        <div className="flex">
                            <strong>Plaats: </strong>
                            <p className="m-0">10 (Groot)</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-16">
                        <EditReservationButton
                            text="Terug"
                            btnCallback={closeModal}
                        />
                        <EditReservationButton
                            text="Verwijder"
                            color="#FC4545"
                            btnCallback={deleteFunction}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
