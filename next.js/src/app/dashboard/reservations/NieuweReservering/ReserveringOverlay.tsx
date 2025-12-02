import { useState } from "react";
import { Reservering } from "../Widgets/Reserveringen";
import { CreateReservation } from "@/app/connections/dk";

export default function ReserveringOverlay({
    toggle,
    add,
}: {
    toggle: () => void;
    add: (reservering: Reservering) => void;
}) {
    /* useStates voor de verschillende input velden */
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [telNr, setTelnr] = useState("");
    const [adres, setAdres] = useState("");
    const [email, setEmail] = useState("");

    const [DatumVertrek, setDatumVertrek] = useState("");
    const [DatumAankomst, setDatumAankomst] = useState("");
    const [plaats, setPlaats] = useState(Number);
    const [gereserveerdDatum, setGereserveerdDatum] = useState("");

    /*Functie voor het versturen van de data */
    async function handleClick() {
        try {
            const reservationID = await CreateReservation({
                aankomstDatum: DatumAankomst,
                vertrekDatum: DatumVertrek,
                plaats: plaats.toString(),
                aantal: 1,
            });
            toggle();
        } catch (error) {
            console.error("Failed to create reservation:", error);
        }
    }

    return (
        <>
            <div className="fixed flex h-full w-full left-0 justify-center items-center bg-gray-500/90">
                <div className="bg-[#2E3038] h-1/2 w-1/2 grid relative min-w-fit min-h-fit p-10">
                    <button
                        className="absolute top-4 right-4"
                        onClick={() => toggle()}
                    >
                        X
                    </button>
                    <div className="grid justify-center grid-cols-2 text-white">
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Start datum"
                            >
                                Aankomst datum
                            </label>
                            <input
                                onChange={(e) =>
                                    setDatumAankomst(e.target.value)
                                }
                                type="date"
                                className="bg-[#556483] "
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Plaats"
                            >
                                Plaats
                            </label>
                            <input
                                onChange={(e) =>
                                    setPlaats(Number(e.target.value))
                                }
                                type="number"
                                className="bg-[#556483]"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Eind datum"
                            >
                                Vertrek datum
                            </label>
                            <input
                                onChange={(e) =>
                                    setDatumVertrek(e.target.value)
                                }
                                type="date"
                                className="bg-[#556483]"
                            />
                        </div>
                    </div>
                    <div className="grid justify-center grid-cols-2 text-white">
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Naam"
                            >
                                Voornaam:
                            </label>
                            <input
                                onChange={(e) => setVoornaam(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Naam"
                            >
                                Achternaam:
                            </label>
                            <input
                                onChange={(e) => setAchternaam(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>

                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Naam"
                            >
                                TelNr:
                            </label>
                            <input
                                onChange={(e) => setTelnr(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Naam"
                            >
                                Adres:
                            </label>
                            <input
                                onChange={(e) => setAdres(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Naam"
                            >
                                email:
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>
                        <button
                            onClick={() => handleClick()}
                            className="bg-[#55835A] p-2 absolute bottom-3 left-2/5"
                        >
                            Opslaan
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

/*          

                <button onClick={() => toggle()}>X</button>

<div>Naam:</div>
                        <div>Eind datum:</div>
                        <div>Start datum:</div>
                        <div>Plaats:</div>
                        <div>Gereserveerd op:</div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <input type="text" className="border " />
                        <input type="date" className="border " />
                        <input type="date" className="border " />
                        <input type="number" className="border " />
                        <input type="date" className="border " />
                        */
