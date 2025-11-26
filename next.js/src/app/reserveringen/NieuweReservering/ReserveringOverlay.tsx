export default function ReserveringOverlay() {
    return (
        <div className="fixed flex h-full w-full left-0 justify-center items-center bg-gray-500/90">
            <div className="bg-[#2E3038] h-1/2 w-1/2 flex items-center justify-center">
                <div className="w-fit mr-10 gap-5 flex flex-col">
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
                </div>



            </div>
        </div>

    )
}
