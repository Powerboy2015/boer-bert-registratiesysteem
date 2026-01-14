import { useState } from "react";

export default function ReserveringOverlay({ toggle, getAPI }: { toggle: () => void; getAPI: () => void }) {
    /* useStates voor de verschillende input velden */
    const [voornaam, setVoornaam] = useState("");
    const [achternaam, setAchternaam] = useState("");
    const [telNr, setTelnr] = useState("");
    const [adres, setAdres] = useState("");
    const [email, setEmail] = useState("");

    const [DatumVertrek, setDatumVertrek] = useState("");
    const [DatumAankomst, setDatumAankomst] = useState("");
    const [plaats, setPlaats] = useState(0);
    const [errorMessage, setErrorMessage] = useState(false);

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
                        ReseveringsNr: "2025-1", //FIXME dynamic reserverings nummer
                        DatumAankomst: DatumAankomst,
                        DatumVertrek: DatumVertrek,
                        ReserveringsDatum: "2025-12-14",
                        AantalMensen: 0,
                    },
                    Plek: {
                        PlekNummer: plaats,
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
                })
                .then(() => {
                    toggle();
                })
                .then(() => {
                    getAPI();
                });
        } else setErrorMessage(true);
    }

    return (
        <>
            <div className="fixed flex h-full w-full left-0 justify-center items-center bg-gray-500/90">
                <div className="bg-[#2E3038] h-1/2 w-1/2 grid relative min-w-fit min-h-fit p-10">
                    <button className="absolute top-4 right-4 cursor-pointer" onClick={() => toggle()}>
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
                                onChange={(e) => setDatumAankomst(e.target.value)}
                                type="date"
                                className="bg-[#556483] "
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]" htmlFor="Plaats">
                                Plaats
                            </label>
                            <input
                                onChange={(e) => setPlaats(Number(e.target.value))}
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
                                onChange={(e) => setDatumVertrek(e.target.value)}
                                type="date"
                                className="bg-[#556483]"
                            />
                        </div>
                    </div>
                    <div className="grid justify-center grid-cols-2 text-white">
                        <div className="flex flex-col m-2 ">
                            <label className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]" htmlFor="Naam">
                                Voornaam:
                            </label>
                            <input
                                onChange={(e) => setVoornaam(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]" htmlFor="Naam">
                                Achternaam:
                            </label>
                            <input
                                onChange={(e) => setAchternaam(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>

                        <div className="flex flex-col m-2 ">
                            <label className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]" htmlFor="Naam">
                                TelNr:
                            </label>
                            <input
                                onChange={(e) => setTelnr(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]" htmlFor="Naam">
                                Adres:
                            </label>
                            <input
                                onChange={(e) => setAdres(e.target.value)}
                                type="text"
                                className="bg-[#556483]"
                            />
                        </div>
                        <div className="flex flex-col m-2 ">
                            <label className="bg-[#1F1F21] p-1 w-fit mx-2 -my-1 z-1 text-[10px]" htmlFor="Naam">
                                email:
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
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
            <button
                onClick={() => {
                    sendReservering();
                }}
                className="bg-[#55835A] p-2 absolute bottom-3 left-2/5"
            >
                Opslaan
            </button>
            <p className="text-red-400">
                {errorMessage ? "Er is iets fout gegaan, controleer alle velden" : null}
            </p>
        </>
    );
}
