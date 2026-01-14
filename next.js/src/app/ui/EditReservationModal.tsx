"use client";
import { FormEvent, useState } from "react";
import { createPortal } from "react-dom";
import { Roboto } from "next/font/google";
import EditFieldComponent from "./EditFieldComponent";
import EditReservationButton from "./EditReservationButton";
import EditIcon from "@mui/icons-material/Edit";
import { IReservationUserdata } from "../types/database";

interface EditReservationProps {
    reservering: IReservationUserdata; // The reservation object that we use to add the info of which reservation you are deleting.
    hideIcon?: boolean;
    reservationCallback?: () => void;
}

const roboto = Roboto({
    weight: "500",
    subsets: ["latin"],
});

export default function EditReservationModal({
    reservering,
    hideIcon = false,
    reservationCallback,
}: EditReservationProps) {
    const [showModal, setShowModal] = useState<boolean>(false);

    const modalCatcher =
        document.getElementById("Modal-Catcher") ?? document.body;

    const closeModal = () => {
        setShowModal(false);
    };

    const EditReservation = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const payload = {
            Reservatie: {
                ReseveringsNr: data.get("ReserveringsNummer") as string,
                ReserveringsDatum: (data.get("ReserveringsDatum") as string).split("T")[0],
                DatumAankomst: (data.get("AankomstDatum") as string).split("T")[0],
                DatumVertrek: (data.get("VertrekDatum") as string).split("T")[0],
            },
            Plek: {
                PlekNummer: Number(data.get("Plaats")),
            }
        };

        const url = new URL("http://localhost/api/private/reservaties");
        url.searchParams.set("id", payload.Reservatie.ReseveringsNr);

        fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }).then((resp) => {
            console.log(resp);
            if (reservationCallback) reservationCallback();
            closeModal();
        });
    };

    return (
        <>
            <button
                className="w-full h-full cursor-pointer"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                {hideIcon ? "" : <EditIcon />}
            </button>
            {showModal &&
                //portals are used to teleport certain styling upstream, here we teleport this modal to the div with id "Modal-Catcher
                // " otherwise we send it to the body.
                // https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal
                createPortal(
                    <div
                        className="fixed w-full h-full top-0 left-0 bg-(--overlay-color) z-10 flex items-center justify-center"
                        id="DeleteReservationModal"
                    >
                        <div className="w-[50%] h-[50%] min-h-[500px] bg-(--color-accent-2) flex flex-col">
                            <div
                                id="title"
                                className="w-full h-1/3 bg-[#405D98]"
                            >
                                <h2 className={`text-6xl ${roboto.className}`}>
                                    Reservering aanpassen: <br />
                                    {reservering.ReseveringsNr}
                                </h2>
                            </div>
                            <form
                                className="w-full h-2/3 bg-(--color-accent-2) grid px-8 py-4 grid-cols-2 grid-rows-4 gap-4"
                                onSubmit={EditReservation}
                                method="PUT"
                            >
                                <EditFieldComponent
                                    fieldname="ReserveringsNummer"
                                    data={reservering.ReseveringsNr}
                                    fontSize={24}
                                    lableFontSize={16}
                                    type="text"
                                    readOnly
                                />
                                <EditFieldComponent
                                    fieldname="ReserveringsDatum"
                                    data={reservering.ReserveringsDatum}
                                    fontSize={24}
                                    lableFontSize={16}
                                    type="text"
                                    readOnly
                                />
                                <EditFieldComponent
                                    fieldname="AankomstDatum"
                                    data={
                                        reservering.DatumAankomst.split("T")[0]
                                    }
                                    fontSize={24}
                                    lableFontSize={16}
                                    type="date"
                                />
                                <EditFieldComponent
                                    fieldname="VertrekDatum"
                                    data={
                                        reservering.DatumVertrek.split("T")[0]
                                    }
                                    fontSize={24}
                                    lableFontSize={16}
                                    type="date"
                                />
                                <EditFieldComponent
                                    fieldname="Plaats"
                                    data={reservering.PlekNummer}
                                    fontSize={24}
                                    lableFontSize={16}
                                    spanSize={2}
                                    type="number"
                                    max={60}
                                    min={1}
                                />
                                <EditReservationButton
                                    colSpan={1}
                                    text={"Terug"}
                                    btnCallback={closeModal}
                                />

                                <EditReservationButton
                                    colSpan={1}
                                    text={"Opslaan"}
                                    color="#55835A"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </div>,
                    modalCatcher
                )}
        </>
    );
}
