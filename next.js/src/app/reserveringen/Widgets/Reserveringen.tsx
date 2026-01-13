import ReserveringOverlay from "../NieuweReservering/ReserveringOverlay";
import { useState } from "react";
import { useApi } from "@/app/hooks/useApi";
import adminAPI from "@/app/classes/adminAPI";
import { ReservationsUserdataResponse } from "@/app/types/APIresp";

export default function Reserveringen() {
    // /* UseState voor de array van alle reserveringen */
    // const [reserveringen, setReserveringen] = useState<Reservering[]>([]);
    /*UseState voor de overlay, true = overlay showed false = hidden */
    const [overlay, setOverlay] = useState<boolean>(false);

    const [reserveringen, loading, error, getAPI] = useApi<ReservationsUserdataResponse>(() => {
        return adminAPI.getAllReservations();
    });

    /* Toggle overlay */
    function toggleOverlay() {
        setOverlay(!overlay);
    }
    // /* functie voor het verwijderen van reservering, verwijderd de reservering met index nr */
    // function handleDeleteReservering(RemoveIndex: number) {
    //   console.log(RemoveIndex);
    //   const newReserveringen = reserveringen.filter(
    //     (item, index) => index !== RemoveIndex
    //   );
    //   setReserveringen(newReserveringen);
    // }

    const dateSettings: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    if (loading && error == null && reserveringen == null) return <h1>Loading....</h1>;

    return (
        <>
            {overlay ? <ReserveringOverlay toggle={toggleOverlay} getAPI={getAPI} /> : null}
            <div className="bg-[#2E3038] h-full mx-5 overflow-y-auto overflow-x-hidden ">
                <div className="h-1/15 flex w-full">
                    <div className="w-1/2 text-4xl m-3">Reserveringslijst</div>
                    <div className="flex justify-end w-full">
                        <input
                            className="bg-[#556483] my-3 w-1/3 mx-10 text-4xl p-7"
                            placeholder="Zoek reservering "
                            type="text"
                        />
                        <button onClick={() => toggleOverlay()} className=" bg-[#55835A] h-15 w-15 m-3">
                            +
                        </button>
                    </div>
                </div>
                <div className="w-full h-full m-5">
                    <table className="w-full mt-10">
                        <thead>
                            <tr className="txt-left text-[10px] md:text-3xl">
                                <th className="text-left">Naam</th>
                                <th className="text-left">Start datum</th>
                                <th className="text-left">Eind datum</th>
                                <th className="text-left">Plaats</th>
                                <th className="text-left">Gereserveerd op </th>
                                <th className="text-left">Opties </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reserveringen?.Reservation.map((item, index) => (
                                <tr className="border-y-5 border-[#1F1F21] text-2xl " key={index}>
                                    <td>{item.Achternaam}</td>
                                    <td>
                                        {new Date(item.DatumAankomst).toLocaleDateString("nl-NL", dateSettings)}
                                    </td>
                                    <td>
                                        {new Date(item.DatumVertrek).toLocaleDateString("nl-NL", dateSettings)}
                                    </td>
                                    <td>{item.PlekNummer}</td>
                                    <td>
                                        {new Date(item.ReserveringsDatum).toLocaleDateString(
                                            "nl-NL",
                                            dateSettings
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteReservering(index)}>X</button>
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
