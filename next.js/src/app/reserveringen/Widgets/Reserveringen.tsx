import DeleteReservationModal from "@/app/ui/DeleteReservationModal";
import ReserveringOverlay from "../NieuweReservering/ReserveringOverlay";
import { useEffect, useState } from "react";
import { UserAndReservatieBody } from "@/app/api/reservatiesenuserdata/route";

/* Interface voor alle types van de variabelen */
export interface Reservering {
    AantalMensen: number;
    Achternaam: string;
    DatumAankomst: string;
    DatumVertrek: string;
    Email: string;
    PlekNummer: number;
    ReserveringsDatum: string;
    ReseveringsNr: string;
    Telefoonnummer: string;
    Voornaam: string;
    Woonplaats: string;
}

export default function Reserveringen() {
    /* UseState voor de array van alle reserveringen */
    const [reserveringen, setReserveringen] = useState<Reservering[]>([]);
    /*UseState voor de overlay, true = overlay showed false = hidden */
    const [overlay, setOverlay] = useState<boolean>(false);

    async function getAPI() {
        try {
            const url = "http://localhost/api/reservatiesenuserdata";

            const response = fetch(url);

            const data = await response;

            const res = await data.json();

            setReserveringen(res.Reservation);

            console.log(res.Reservation);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAPI(); //TODO Refactor to remove possible errors
    }, []);

    /* Toggle overlay */
    function toggleOverlay() {
        setOverlay(!overlay);
    }
    /* functie voor het verwijderen van reservering, verwijderd de reservering met index nr */
    function handleDeleteReservering(RemoveIndex: number) {
        console.log(RemoveIndex);
        const newReserveringen = reserveringen.filter(
            (item, index) => index !== RemoveIndex
        );
        setReserveringen(newReserveringen);
    }

    const dateSettings: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    return (
        <>
            {overlay ? (
                <ReserveringOverlay toggle={toggleOverlay} getAPI={getAPI} />
            ) : null}
            <div className="bg-[#2E3038] h-full mx-5 overflow-y-auto overflow-x-hidden ">
                <div className="h-1/15 flex w-full">
                    <div className="w-1/2 text-4xl m-3">Reserveringslijst</div>
                    <div className="flex justify-end w-full">
                        <input
                            className="bg-[#556483] my-3 w-1/3 mx-10 text-4xl p-7"
                            placeholder="Zoek reservering "
                            type="text"
                        />
                        <button
                            onClick={() => toggleOverlay()}
                            className=" bg-[#55835A] h-15 w-15 m-3"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="w-full h-full m-5">
                    <table className="w-full mt-10">
                        <thead>
                            <tr className="txt-left text-[10px] md:text-3xl">
                                <th className="text-left">Naam</th>
                                <th className="text-left">Eind datum</th>
                                <th className="text-left">Start datum</th>
                                <th className="text-left">Plaats</th>
                                <th className="text-left">Gereserveerd op </th>
                                <th className="text-left">Opties </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserveringen.map((item, index) => (
                                <tr
                                    className="border-y-5 border-[#1F1F21] text-2xl "
                                    key={index}
                                >
                                    <td>{item.Achternaam}</td>
                                    <td>
                                        {new Date(
                                            item.DatumVertrek
                                        ).toLocaleDateString(
                                            "nl-NL",
                                            dateSettings
                                        )}
                                    </td>
                                    <td>
                                        {new Date(
                                            item.DatumAankomst
                                        ).toLocaleDateString(
                                            "nl-NL",
                                            dateSettings
                                        )}
                                    </td>
                                    <td>{item.PlekNummer}</td>
                                    <td>
                                        {new Date(
                                            item.ReserveringsDatum
                                        ).toLocaleDateString(
                                            "nl-NL",
                                            dateSettings
                                        )}
                                    </td>
                                    <td>
                                        {" "}
                                        <DeleteReservationModal
                                            reservering={item}
                                            DeleteCallback={() => {
                                                handleDeleteReservering(index);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
