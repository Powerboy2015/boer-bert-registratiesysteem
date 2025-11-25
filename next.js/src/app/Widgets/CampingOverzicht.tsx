

export default function CampingOverzicht() {
    let title = "Camping Overzicht";
    return (
        <>
            <div className="bg-[#556483] h-[12%] w-full min-w-fit sm:w-1/1 md:w-1/4 xl:w-1/5 2xl:w-1/10 flex flex-col">
                <div className="h-3/6 text-center pt-5">
                    <div className="text-3xl pb-5">{title}</div>
                    <div className="flex justify-center"></div>
                    <div className="w-fit"></div>
                </div>
            </div>
        </>
    );
}