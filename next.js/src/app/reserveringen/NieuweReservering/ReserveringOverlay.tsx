import { Cossette_Texte } from "next/font/google";
import { useState, useEffect } from "react";

export default function ReserveringOverlay({
    toggle,
    getAPI,
}: {
    toggle: () => void;
    getAPI: () => void;
}) {
    /* useStates voor de verschillende input velden */
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [telNr, setTelnr] = useState("");
    const [adres, setAdres] = useState("");
    const [email, setEmail] = useState("");
    const [aantalPers, setAantalPers] = useState(0);

    const [DatumVertrek, setDatumVertrek] = useState("");
    const [DatumAankomst, setDatumAankomst] = useState("");
    const [plaats, setPlaats] = useState(0);
    const [gereserveerdDatum, setGereserveerdDatum] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [prijs, setPrijs] = useState("");
    const [grootte, setGrootte] = useState("");

    let date1 = new Date(DatumAankomst);
    let date2 = new Date(DatumVertrek);

    // Convert dates to UTC timestamps
    let utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    let utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    // Calculate the time difference in milliseconds
    let timeDiff = Math.abs(utc2 - utc1);

    // Convert milliseconds to days
    let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    function sendPrice() {
        const Groot =
            (plaats >= 1 && plaats <= 19) ||
            (plaats >= 21 && plaats <= 23) ||
            (plaats >= 25 && plaats <= 30) ||
            plaats === 32 ||
            plaats === 34;

        if (Groot) {
            setGrootte("G")
            let price = 30 * daysDiff;
            setPrijs(`${price},00`);
            console.log(price)
        } else {
            setGrootte("K")
            let price = 20 * daysDiff;
            setPrijs(`${price},00`);
            console.log(price)
        }
    }

    function sendReservering() {
        const url = "http://localhost/api/private/reservatiesenuserdata";
        if (
            voornaam &&
            achternaam &&
            telNr &&
            adres &&
            email &&
            DatumAankomst &&
            DatumVertrek &&
            plaats &&
            aantalPers &&
            grootte &&
            new Date(DatumAankomst) < new Date(DatumVertrek)
        ) {
            setErrorMessage(false);
            fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    UserData: {
                        Voornaam: voornaam,
                        Achternaam: achternaam,
                        Email: email,
                        Telefoonnummer: telNr,
                        Woonplaats: adres,
                    },
                    Reservatie: {
                        ReseveringsNr: "2025-1",
                        DatumAankomst: DatumAankomst,
                        DatumVertrek: DatumVertrek,
                        ReserveringsDatum: "2025-12-14",
                        AantalMensen: aantalPers,
                        Prijs: prijs
                    },
                    Plek: {
                        PlekNummer: plaats,
                        Grootte: grootte
                    },
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .then(() => {
                    setVoornaam("");
                    setAchternaam("");
                    setVoornaam("");
                    setAchternaam("");
                    setTelnr("");
                    setAdres("");
                    setEmail("");
                    setDatumVertrek("");
                    setDatumAankomst("");
                    setPlaats(0);
                    setGereserveerdDatum("");
                    setAantalPers(0)
                    setGrootte("")
                })
                .then(() => {
                    toggle();
                })
                .then(() => {
                    getAPI();
                });
        } else setErrorMessage(true);
    }

    useEffect(() => {
        if (DatumAankomst && DatumVertrek && plaats) {
            sendPrice();
        }
    }, [DatumAankomst, DatumVertrek, plaats]);


    return (
        <>
            <div className="fixed flex h-full w-full left-0 justify-center items-center bg-gray-500/90">
                <div className="bg-[#2E3038] h-3/4 w-3/4 grid relative min-w-fit min-h-fit p-10">
                    <button
                        className="absolute top-4 right-4"
                        onClick={() => toggle()}
                    >
                        X
                    </button>
                    <div className="grid justify-center grid-cols-2 text-white">
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Start datum"
                            >
                                Aankomst datum
                            </label>
                            <input
                                onChange={(e) =>
                                    setDatumAankomst(e.target.value)
                                }
                                type="date"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Plaats"
                            >
                                Plaats
                            </label>
                            <input
                                onChange={(e) =>
                                    setPlaats(Number(e.target.value))
                                }
                                type="number"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Eind datum"
                            >
                                Vertrek datum
                            </label>
                            <input
                                onChange={(e) =>
                                    setDatumVertrek(e.target.value)
                                }
                                type="date"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="prijs"
                            >
                                Prijs
                            </label>
                            <div>{prijs}</div>
                        </div>
                    </div>
                    <div className="grid justify-center grid-cols-2 text-white">
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Naam"
                            >
                                Voornaam:
                            </label>
                            <input
                                onChange={(e) => setVoornaam(e.target.value)}
                                type="text"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Naam"
                            >
                                Achternaam:
                            </label>
                            <input
                                onChange={(e) => setAchternaam(e.target.value)}
                                type="text"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>

                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Naam"
                            >
                                TelNr:
                            </label>
                            <input
                                onChange={(e) => setTelnr(e.target.value)}
                                type="text"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Naam"
                            >
                                Adres:
                            </label>
                            <input
                                onChange={(e) => setAdres(e.target.value)}
                                type="text"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[16px]"
                                htmlFor="Naam"
                            >
                                email:
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                className="bg-[#556483] text-2xl"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label
                                className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]"
                                htmlFor="Naam"
                            >
                                Aanral personen:
                            </label>
                            <input
                                onChange={(e) => setAantalPers(Number(e.target.value))}
                                type="number"
                                min={1}
                                max={8}
                                className="bg-[#556483]"
                            />
                        </div>
                        <button
                            onClick={() => {
                                sendReservering();
                            }}
                            className="bg-[#55835A] p-2 absolute bottom-3 left-2/5 cursor-pointer"
                        >
                            Opslaan
                        </button>
                    </div>
                    {errorMessage ? "Voer alle velden in" : null}
                </div>
            </div>
            <p className="text-red-400">
                {errorMessage
                    ? "Er is iets fout gegaan, controleer alle velden"
                    : null}
            </p>
        </>
    );
}
