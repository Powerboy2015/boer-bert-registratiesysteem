import ReserveringOverlay from "../NieuweReservering/ReserveringOverlay";
import { useEffect, useState } from "react";
import DbPool, { reservationData } from "@/app/connections/Database";
import { GetReservations } from "@/app/connections/dk";

/* Interface voor alle types van de variabelen */
export interface Reservering {
    UserData_ID: number;
    Voornaam: string;
    Achternaam: string;
    telNr: string;
    adres: string;
    email: string;
    PlaatsNummer: number;
    DatumAankomst: string;
    DatumVertrek: string;
    reserveringDatum: string;
    reserveringBewerkDatum: string;
}

export default function Reserveringen() {
    /* UseState voor de array van alle reserveringen */
    const [reserveringen, setReserveringen] = useState<reservationData[]>([]);
    /*UseState voor de overlay, true = overlay showed false = hidden */
    const [overlay, setOverlay] = useState<boolean>(false);

    useEffect(() => {
        GetReservations().then((data) => {
            setReserveringen(data.slice(0, 20));
        });
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
    /*Pak de date van vandaag */
    const d = new Date(Date.now());

    /*Functie om een reservering toe te voegen */
    function addReservering({
        UserData_ID,
        Voornaam,
        Achternaam,
        telNr,
        adres,
        email,
        PlaatsNummer,
        DatumAankomst,
        DatumVertrek,
        reserveringBewerkDatum,
    }: Reservering) {
        const nieuw = {
            UserData_ID: UserData_ID,
            Voornaam: Voornaam,
            Achternaam: Achternaam,
            telNr: telNr,
            adres: adres,
            email: email,
            PlaatsNummer: PlaatsNummer,
            DatumAankomst: DatumAankomst,
            DatumVertrek: DatumVertrek,
            reserveringDatum: d.toDateString(),
            reserveringBewerkDatum: d.toDateString(),
        };
        /*Set reserveringen op wat er nu staat in reserveringen + de nieuwe reserverign */
        setReserveringen([...reserveringen, nieuw]);
    }

    return (
        <>
            {overlay ? (
                <ReserveringOverlay
                    toggle={toggleOverlay}
                    add={addReservering}
                />
            ) : null}
            <div className="bg-[#2E3038] h-full mx-5">
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
                            <tr className="txt-left text-[10px] md:text-xl">
                                <th>Naam</th>
                                <th>Eind datum</th>
                                <th>Start datum</th>
                                <th>Plaats</th>
                                <th>Gereserveerd op </th>
                                <th>Opties </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserveringen.map((item, index) => (
                                <tr
                                    className="border-y-5 border-[#1F1F21] text-2xl "
                                    key={index}
                                    onClick={() => {
                                        window.location.href = `/dashboard/reservations/${item.reservationID}`;
                                    }}
                                >
                                    <td>{item.Achternaam}</td>
                                    <td>{item.endDate.toDateString()}</td>
                                    <td>{item.startDate.toDateString()}</td>
                                    <td>{item.spot}</td>
                                    <td>
                                        {item.reservationDate.toDateString()}
                                    </td>
                                    <td>
                                        {" "}
                                        <button
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleDeleteReservering(index)
                                            }
                                        >
                                            X
                                        </button>
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
