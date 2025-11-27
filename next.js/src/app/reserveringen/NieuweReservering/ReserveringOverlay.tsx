import { useState } from "react"

export default function ReserveringOverlay({ toggle, add }: {
    toggle: () => void, add: (reservering: {
        ID: number;
        Naam: string;
        plaats: number;
        start: string;
        eind: string;
        reservering: string;
        reserveringBewerk: string;
    }) => void
}) {
    const [naam, setNaam] = useState("")
    const [eindDatum, setEindDatum] = useState("")
    const [startDatum, setStartDatum] = useState("")
    const [plaats, setPlaats] = useState(Number)
    const [gereserveerdDatum, setGereserveerdDatum] = useState("")


    function handleClick() {
        add({
            ID: 105,
            Naam: naam,
            plaats: plaats,
            start: startDatum,
            eind: eindDatum,
            reservering: gereserveerdDatum,
            reserveringBewerk: "2025-10-11"
        })
        toggle()
    }


    return (
        <>
            <div className="fixed flex h-full w-full left-0 justify-center items-center bg-gray-500/90">
                <div className="bg-[#2E3038] h-1/2 w-1/2 flex justify-center items-center flex-col text-5xl p-20 relative min-w-fit min-h-fit">
                    <button className="absolute top-4 right-4" onClick={() => toggle()}>X</button>
                    <div className="grid grid-cols-2 w-full">
                        <label htmlFor="Naam">Naam:</label>
                        <input onChange={(e) => setNaam(e.target.value)} type="text" className="bg-white text-black" />
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <label htmlFor="Eind datum">Eind datum:</label>
                        <input onChange={(e) => setEindDatum(e.target.value)} type="date" className="bg-white text-black" />
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <label htmlFor="Start datum">Start datum:</label>
                        <input onChange={(e) => setStartDatum(e.target.value)} type="date" className="bg-white text-black" />
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <label htmlFor="Plaats">Plaats:</label>
                        <input onChange={(e) => setPlaats(Number(e.target.value))} type="number" className="bg-white text-black" />
                    </div>
                    <div className="grid grid-cols-2 w-full">
                        <label htmlFor="Gereserveerd op">Gereserveerd op:</label>
                        <input onChange={(e) => setGereserveerdDatum(e.target.value)} type="date" className="bg-white text-black w-full" />
                    </div>
                    <button onClick={() => handleClick()} className="absolute bottom-10">send</button>
                </div>
            </div>
        </>


    )
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