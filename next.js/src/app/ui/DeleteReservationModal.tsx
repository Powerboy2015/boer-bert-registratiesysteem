"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Reservering } from "../reserveringen/Widgets/Reserveringen";
import ReservationButtonComponent from "./ReservationButtonComponent";

interface DeleteReservationProps {
    reservering: Reservering;
    DeleteCallback: () => void;
}

export default function DeleteReservationModal({
    reservering,
    DeleteCallback,
}: DeleteReservationProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    const modalCatcher =
        document.getElementById("Modal-Catcher") ?? document.body;

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button
                onClick={() => {
                    setShowModal(true);
                }}
            >
                X
            </button>
            {showModal &&
                createPortal(
                    <div
                        className="absolute w-full h-full top-0 left-0 p-[254px] bg-(--overlay-color) z-10"
                        id="DeleteReservationModal"
                    >
                        <div
                            id="inner"
                            className="w-full h-full bg-(--color-accent-2) flex flex-col px-8 py-16 gap-12"
                        >
                            <h2
                                className={`m-0 text-(--color-text) text-[24px]`}
                            >
                                Weet U zeker dat U deze reservering wilt
                                verwijderen?
                            </h2>
                            <div
                                className={`flex flex-col gap-2 text-(--color-text) text-[24px]`}
                            >
                                <div className="flex">
                                    <strong>Naam: </strong>
                                    <p className="m-0">
                                        {reservering.Voornaam +
                                            " " +
                                            reservering.Achternaam}
                                    </p>
                                </div>
                                <div className="flex">
                                    <strong>Datum: </strong>
                                    <p className="m-0">
                                        {reservering.reserveringDatum}
                                    </p>
                                </div>
                                <div className="flex">
                                    <strong>Plaats: </strong>
                                    <p className="m-0">
                                        {reservering.PlaatsNummer}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-16">
                                <ReservationButtonComponent
                                    text="Terug naar overzicht"
                                    btnCallback={() => {
                                        closeModal();
                                    }}
                                />
                                <ReservationButtonComponent
                                    text="Verwijder"
                                    color="#FC4545"
                                    btnCallback={() => {
                                        closeModal();
                                        DeleteCallback();
                                    }}
                                />
                            </div>
                        </div>
                    </div>,
                    modalCatcher
                )}
        </>
    );
}
