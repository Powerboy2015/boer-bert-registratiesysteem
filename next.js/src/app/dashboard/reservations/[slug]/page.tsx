import DbPool from "@/app/connections/Database";
import DisplayFieldComponent from "@/app/ui/DisplayFieldComponent";
import ButtonComponent from "@/app/ui/ButtonComponent";
import MapTargetComponent from "@/app/ui/MapTargetComponent";
import { Roboto } from "next/font/google";

const robotoBold = Roboto({
    weight: "600",
    subsets: ["latin"],
});

const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});

interface ViewReservationProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: ViewReservationProps) {
    const { slug } = await params;
    const db: DbPool = new DbPool();
    const response = await db.GetReservation(slug);
    const reservationData = Array.isArray(response) ? response[1] : response;

    return (
        <div className="w-full flex flex-col gap-8 relative">
            <MapTargetComponent place={"1"} />
            <div className="w-full flex flex-col">
                <div
                    id="header-part"
                    className="sticky top-0 p-4 flex flex-col gap-4 bg-(--color-accent) text-(--color-text) z-10"
                >
                    <h1
                        className={`w-full text-[64px] font-semibold ${robotoBold.className} m-0`}
                    >
                        Overzicht reservering
                    </h1>
                    <p
                        className={`text-[64px] font-normal ${roboto.className} m-0`}
                    >
                        {reservationData.reservationID}
                    </p>
                </div>
                <div id="view-reservation-data" className="w-full px-2">
                    <div
                        id="inner"
                        className="w-full h-full bg-(--color-accent-2) px-8 py-12 grid grid-cols-6 grid-rows-15 gap-4 shadow-(--box-shadow-view)"
                    >
                        <ButtonComponent />
                        <ButtonComponent
                            color="#FC4545"
                            text="Verwijder Reservering"
                        />
                        <h2
                            className={`col-span-3 mt-auto mb-0 ${roboto.className} text-[40px] text-(--color-text)`}
                        >
                            Reserveringsinfo
                        </h2>
                        <section className="col-span-6 row-span-4 bg-(--color-background)">
                            <div className="w-full h-full grid grid-cols-2 grid-rows-3 p-8 gap-x-32 gap-y-4 inset-shadow-(--inset-shadow-box)">
                                <DisplayFieldComponent
                                    fieldname="ReserveringsNummer"
                                    data={reservationData.reservationID}
                                />
                                <DisplayFieldComponent
                                    fieldname="ReserveringsDatum"
                                    data={reservationData.reservationDate.toDateString()}
                                />
                                <DisplayFieldComponent
                                    fieldname="AankomstDatum"
                                    data={reservationData.startDate.toDateString()}
                                />
                                <DisplayFieldComponent
                                    fieldname="VertrekDatum"
                                    data={reservationData.endDate.toDateString()}
                                />
                                <DisplayFieldComponent
                                    fieldname="Plaats"
                                    data={reservationData.spot}
                                />
                            </div>
                        </section>

                        <div className="col-span-6"></div>
                        <h2
                            className={`col-span-3 mt-auto mb-0 ${roboto.className} text-[40px] text-(--color-text)`}
                        >
                            Reserveringsinfo
                        </h2>
                        <section className="col-span-6 row-span-7 bg-(--color-background) inset-shadow-(--inset-shadow-box)">
                            <div className="w-full h-full grid grid-cols-2 grid-rows-5 p-8 gap-x-32 gap-y-4">
                                <DisplayFieldComponent
                                    fieldname="Voornaam"
                                    data={"Jan-Jantjes"}
                                />
                                <DisplayFieldComponent
                                    fieldname="Achternaam"
                                    data={"Wietsmoker"}
                                />
                                <div>
                                    {/** Empty space in order to create the space between inputs */}
                                </div>
                                <DisplayFieldComponent
                                    fieldname="Telefoonnummer"
                                    data={"06123456789"}
                                />
                                <div className="col-span-2">
                                    {/** Empty space in order to create the space between inputs */}
                                </div>
                                <DisplayFieldComponent
                                    fieldname="Woonplaats"
                                    data={
                                        "Jansboerenbertjestraat 39, 2764AD, Utrecht"
                                    }
                                    spanSize={2}
                                />
                                <DisplayFieldComponent
                                    fieldname="Email"
                                    data={"RandomEmail@gmail.com"}
                                    spanSize={2}
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
