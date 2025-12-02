"use client";
import { useContext, useEffect, useState } from "react";

import EditFieldComponent from "./EditFieldComponent";
import EditReservationButton from "./EditReservationButton";
import { modalEnabledContext } from "../context/modalEnabled";
import { enableModalContext } from "../context/enableModal";
import { GetReservations, UpdateReservation } from "../connections/dk";
import { reservationData } from "../connections/Database";

interface EditReservationModalProps {
    reservation: string;
}
export default function EditReservationModal({
    reservation,
}: EditReservationModalProps) {
    const [reservationData, setReservationData] = useState<reservationData>({});
    const { setModalState } = useContext(modalEnabledContext);
    const { active, reservationID } = useContext(enableModalContext);

    const closeModal = () => {
        setModalState(false);
    };

    const saveData = () => {
        // Collect data from EditFieldComponents
        const aankomstDatum = (
            document.querySelector('[name="AankomstDatum"]') as HTMLInputElement
        )?.value;
        const vertrekDatum = (
            document.querySelector('[name="VertrekDatum"]') as HTMLInputElement
        )?.value;
        const plaats = (
            document.querySelector('[name="Plaats"]') as HTMLInputElement
        )?.value;

        // Update reservation with collected data
        UpdateReservation({
            reservationID,
            aankomstDatum,
            vertrekDatum,
            plaats,
        });

        closeModal();
        window.location.href = "/dashboard/reservations";
    };

    useEffect(() => {
        GetReservations(reservationID)
            .then((data) => {
                setReservationData(Array.isArray(data) ? data[0] : data);
            })
            .catch((error) => {
                console.error("Error fetching reservation:", error);
            });
    }, [reservationID, active]);

    return (
        <>
            <div className="w-[50%] h-[50%] bg-(--color-accent-2) flex flex-col">
                <div id="title" className="w-full h-1/3 bg-[#405D98]">
                    <h2>Reservering aanpassen: {reservation}</h2>
                </div>
                <div className="w-full h-2/3 bg-(--color-accent-2) grid px-8 py-4 grid-cols-2 grid-rows-4 gap-4">
                    <EditFieldComponent
                        fieldname="ReserveringsNummer"
                        data={reservationData?.reservationID ?? "loading"}
                        fontSize={24}
                        lableFontSize={16}
                        readOnly
                    />
                    <EditFieldComponent
                        fieldname="ReserveringsDatum"
                        data={
                            reservationData?.reservationDate?.toDateString() ??
                            "loading"
                        }
                        fontSize={24}
                        lableFontSize={16}
                        readOnly
                    />
                    <EditFieldComponent
                        fieldname="AankomstDatum"
                        data={
                            reservationData?.startDate?.toDateString() ??
                            "loading"
                        }
                        fontSize={24}
                        lableFontSize={16}
                    />
                    <EditFieldComponent
                        fieldname="VertrekDatum"
                        data={
                            reservationData?.endDate?.toDateString() ??
                            "loading"
                        }
                        fontSize={24}
                        lableFontSize={16}
                    />
                    <EditFieldComponent
                        fieldname="Plaats"
                        data={"plaats 10: groot"}
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
                        btnCallback={saveData}
                        colSpan={1}
                        text={"Opslaan"}
                        color="#55835A"
                    />
                </div>
            </div>
        </>
    );
}
