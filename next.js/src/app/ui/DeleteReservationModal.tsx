"use client";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Reservering } from "../reserveringen/Widgets/Reserveringen";
import ReservationButtonComponent from "./ReservationButtonComponent";
import { useRouter } from "next/navigation";
import { Roboto, Roboto_Mono } from "next/font/google";
import DeleteIcon from "@mui/icons-material/Delete";

interface DeleteReservationProps {
    reservering: Reservering; // The reservation object that we use to add the info of which reservation you are deleting.
    DeleteCallback?: () => void; // callbacks are functions that we give as parameter and will be used after a certain event e.g. a button click
    RedirectCallback?: boolean;
    hideIcon?: boolean;
}

const roboto = Roboto({
    weight: "500",
    subsets: ["latin"],
});
const roboto_mono = Roboto_Mono({
    weight: "400",
    subsets: ["latin"],
});

export default function DeleteReservationModal({
    reservering,
    DeleteCallback,
    RedirectCallback = false,
    hideIcon = false,
}: DeleteReservationProps) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();

    const modalCatcher =
        document.getElementById("Modal-Catcher") ?? document.body;

    const closeModal = () => {
        setShowModal(false);
    };

    const DeleteFromDb = () => {
        const url = new URL("http://localhost/api/reservaties");
        url.searchParams.set("id", reservering.ReseveringsNr);
        fetch(url, {
            method: "DELETE",
        }).then((resp) => {
            console.log(resp);
            if (RedirectCallback) {
                router.push("/reserveringen");
            }
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
                {hideIcon ? "" : <DeleteIcon sx={{ color: "#fc4545" }} />}
            </button>
            {showModal &&
                //portals are used to teleport certain styling upstream, here we teleport this modal to the div with id "Modal-Catcher
                // " otherwise we send it to the body.
                // https://react.dev/reference/react-dom/createPortal#rendering-a-modal-dialog-with-a-portal
                createPortal(
                    <div
                        className="fixed w-full h-full top-0 left-0 p-[254px] bg-(--overlay-color) z-10"
                        id="DeleteReservationModal"
                    >
                        <div
                            id="inner"
                            className="w-full h-full bg-(--color-accent-2) flex flex-col px-8 py-16 gap-12"
                        >
                            <h2
                                className={`m-0 text-(--color-text) text-[24px] ${roboto.className}`}
                            >
                                Weet U zeker dat U deze reservering wilt
                                verwijderen?
                            </h2>
                            <div
                                className={`flex flex-col gap-2 text-(--color-text) text-[24px] ${roboto_mono.className}`}
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
                                        {new Date(
                                            reservering.ReserveringsDatum
                                        ).toUTCString()}
                                    </p>
                                </div>
                                <div className="flex">
                                    <strong>Plaats: </strong>
                                    <p className="m-0">
                                        {reservering.PlekNummer}
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
                                        DeleteFromDb();
                                        if (DeleteCallback) DeleteCallback();
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
