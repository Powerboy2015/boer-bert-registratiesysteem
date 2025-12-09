"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Reservering } from "../reserveringen/Widgets/Reserveringen";
import { Roboto, Roboto_Mono } from "next/font/google";
import EditFieldComponent from "./EditFieldComponent";
import EditReservationButton from "./EditReservationButton";

interface EditReservationProps {
    reservering: Reservering; // The reservation object that we use to add the info of which reservation you are deleting.
    EditCallback?: () => void; // callbacks are functions that we give as parameter and will be used after a certain event e.g. a button click
}

const roboto = Roboto({
    weight: "500",
    subsets: ["latin"],
});
const roboto_mono = Roboto_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default function EditReservationModal({
    reservering,
    EditCallback,
}: EditReservationProps) {
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
                //portals are used to teleport certain styling upstream, here we teleport this modal to the div with id "Modal-Catcher
                // " otherwise we send it to the body.
                // https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal
                createPortal(
                    <div
                        className="absolute w-full h-full top-0 left-0 bg-(--overlay-color) z-10 flex items-center justify-center"
                        id="DeleteReservationModal"
                    >
                    <div className="w-[50%] h-[50%] min-h-[500px] bg-(--color-accent-2) flex flex-col">
                <div id="title" className="w-full h-1/3 bg-[#405D98]">
                    <h2>Reservering aanpassen: {reservering.Voornaam}</h2>
                </div>
                <div className="w-full h-2/3 bg-(--color-accent-2) grid px-8 py-[16px] grid-cols-2 grid-rows-4 gap-[16px]">
                    <EditFieldComponent
                        fieldname="ReserveringsNummer"
                        data={reservering.Voornaam}
                        fontSize={24}
                        lableFontSize={16}
                        readOnly
                    />
                    <EditFieldComponent
                        fieldname="ReserveringsDatum"
                        data={reservering.reserveringDatum}
                        fontSize={24}
                        lableFontSize={16}
                        readOnly
                    />
                    <EditFieldComponent
                        fieldname="AankomstDatum"
                        data={reservering.DatumAankomst}
                        fontSize={24}
                        lableFontSize={16}
                    />
                    <EditFieldComponent
                        fieldname="VertrekDatum"
                        data={reservering.DatumVertrek}
                        fontSize={24}
                        lableFontSize={16}
                    />
                    <EditFieldComponent
                        fieldname="Plaats"
                        data={reservering.PlaatsNummer}
                        fontSize={24}
                        lableFontSize={16}
                        spanSize={2}
                    />
                    <EditReservationButton
                        colSpan={1}
                        text={"Terug"}
                        btnCallback={closeModal}
                    />

                    {/* TODO add code that helps save the data. Only then close modal */}
                    <EditReservationButton
                        btnCallback={closeModal}
                        colSpan={1}
                        text={"Opslaan"}
                        color="#55835A"
                    />
                </div>
            </div>
            </div>,
                    modalCatcher
                )}
        </>
    );
}