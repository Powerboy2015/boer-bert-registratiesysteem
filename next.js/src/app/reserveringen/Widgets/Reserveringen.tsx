'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Searchbar from "../Widgets/searchbar";
import EditReservationModal from "@/app/ui/EditReservationModal";
import DeleteReservationModal from "@/app/ui/DeleteReservationModal";
import ReserveringOverlay from "../NieuweReservering/ReserveringOverlay";

/* Interface voor reserveringen */
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

type SortKey =
    | "naam"
    | "startDatum"
    | "eindDatum"
    | "plaats"
    | "gereserveerdOp"
    | null;


export default function Reserveringen() {
    const [reserveringen, setReserveringen] = useState<Reservering[]>([]);
    const [overlay, setOverlay] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [sortKey, setSortKey] = useState<SortKey>(null);
    const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");

    const router = useRouter();
    const goToReservation = (id: string) =>
        router.push(`/reserveringen/${id}`);

    async function getAPI() {
        try {
            const response = await fetch(
                "http://localhost/api/reservatiesenuserdata"
            );
            const data = await response.json();
            setReserveringen(data.Reservation);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getAPI();
    }, []);

    function toggleOverlay() {
        setOverlay((prev) => !prev);
    }

    function handleDeleteReservering(removeIndex: number) {
        setReserveringen((prev) =>
            prev.filter((_, index) => index !== removeIndex)
        );
    }

    function handleSort(key: SortKey) {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === "ascending" ? "descending" : "ascending"));
        } else {
            setSortKey(key);
            setSortDirection("ascending");
        }
    }

    /* Filtering */
    const filteredReserveringen = reserveringen
        .filter((r) => {
            const q = searchQuery.toLowerCase();

            return (
                r.Achternaam.toLowerCase().includes(q) ||
                r.Voornaam.toLowerCase().includes(q) ||
                r.Email.toLowerCase().includes(q) ||
                r.PlekNummer.toString().includes(q) ||
                r.ReseveringsNr.toLowerCase().includes(q)
            );
        })
        .sort((val1, val2) => {
            if (!sortKey) return 0;

            let value1: string | number | Date;
            let value2: string | number | Date;

            switch (sortKey) {
                case "naam":
                    value1 = val1.Achternaam.toLowerCase();
                    value2 = val2.Achternaam.toLowerCase();
                    break;

                case "startDatum":
                    value1 = new Date(val1.DatumAankomst);
                    value2 = new Date(val2.DatumAankomst);
                    break;

                case "eindDatum":
                    value1 = new Date(val1.DatumVertrek);
                    value2 = new Date(val2.DatumVertrek);
                    break;

                case "plaats":
                    value1 = val1.PlekNummer;
                    value2 = val2.PlekNummer;
                    break;

                case "gereserveerdOp":
                    value1 = new Date(val1.ReserveringsDatum);
                    value2 = new Date(val2.ReserveringsDatum);
                    break;

                default:
                    return 0;
            }

            if (value1 < value2) return sortDirection === "ascending" ? -1 : 1;
            if (value1 > value2) return sortDirection === "ascending" ? 1 : -1;
            return 0;
        });

    const dateSettings: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };

    return (
        <>
            {overlay && (
                <ReserveringOverlay
                    toggle={toggleOverlay}
                    getAPI={getAPI}
                />
            )}

            <div className="bg-[#2E3038] h-full mx-5 overflow-y-auto overflow-x-hidden">
                <div className="flex w-full items-center">
                    <div className="w-1/2 text-4xl m-3">
                        Reserveringslijst
                    </div>

                    <div className="flex justify-end w-full items-center gap-4">
                        <Searchbar onSearch={setSearchQuery} />

                        <button
                            onClick={toggleOverlay}
                            className="bg-[#55835A] h-14 w-14 text-4xl"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="w-full h-full m-5">
                    <table className="w-full mt-10">
                        <thead>
                        <tr className="text-[10px] md:text-3xl">
                            <th
                                className="text-left cursor-pointer select-none"
                                onClick={() => handleSort("naam")}
                            >
                                Naam {sortKey === "naam" && (sortDirection === "ascending" ? "⇧" : "⇩")}
                            </th>

                            <th
                                className="text-left cursor-pointer select-none"
                                onClick={() => handleSort("eindDatum")}
                            >
                                Eind datum {sortKey === "eindDatum" && (sortDirection === "ascending" ? "⇧" : "⇩")}
                            </th>

                            <th
                                className="text-left cursor-pointer select-none"
                                onClick={() => handleSort("startDatum")}
                            >
                                Start datum {sortKey === "startDatum" && (sortDirection === "ascending" ? "⇧" : "⇩")}
                            </th>

                            <th
                                className="text-left cursor-pointer select-none"
                                onClick={() => handleSort("plaats")}
                            >
                                Plaats {sortKey === "plaats" && (sortDirection === "ascending" ? "⇧" : "⇩")}
                            </th>

                            <th
                                className="text-left cursor-pointer select-none"
                                onClick={() => handleSort("gereserveerdOp")}
                            >
                                Gereserveerd op {sortKey === "gereserveerdOp" && (sortDirection === "ascending" ? "⇧" : "⇩")}
                            </th>

                        </tr>
                        </thead>

                        <tbody>
                        {filteredReserveringen.map((item, index) => (
                            <tr
                                key={item.ReseveringsNr}
                                className="border-y-4 border-[#1F1F21] text-2xl"
                            >
                                <td
                                    onClick={() =>
                                        goToReservation(
                                            item.ReseveringsNr
                                        )
                                    }
                                    className="underline cursor-pointer"
                                >
                                    {item.Achternaam}
                                </td>

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

                                <td className="flex gap-2">
                                    <EditReservationModal
                                        reservering={item}
                                        reservationCallback={getAPI}
                                    />

                                    <DeleteReservationModal
                                        reservering={item}
                                        DeleteCallback={() =>
                                            handleDeleteReservering(index)
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {filteredReserveringen.length === 0 && (
                        <div className="text-center text-2xl mt-10 text-gray-400">
                            Geen reserveringen gevonden
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
