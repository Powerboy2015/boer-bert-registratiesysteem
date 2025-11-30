import Database from "@/app/connections/Database";
import EditReservationButton from "@/app/ui/EditReservationButton";
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
    const db: Database = new Database();
    const reservationData = db.getReservation(slug);

    return (
        <div className="w-full flex flex-col gap-[32px] relative">
            <MapTargetComponent place={"1"} />
            <div className="w-full flex flex-col">
                <div
                    id="header-part"
                    className="sticky top-[0px] p-[16px] flex flex-col gap-[16px] bg-(--color-accent) text-(--color-text)"
                >
                    <h1
                        className={`w-full text-[64px] font-semibold ${robotoBold.className} m-[0px]`}
                    >
                        Overzicht reservering
                    </h1>
                    <p
                        className={`text-[64px] font-[400] ${roboto.className} m-[0px]`}
                    >
                        {reservationData.reservationID}
                    </p>
                </div>
                <div
                    id="view-reservation-data"
                    className="w-full min-h-[1355px] px-[8px]"
                >
                    <div
                        id="inner"
                        className="w-full h-full bg-(--color-accent-2) px-[32px] py-[48px] grid grid-cols-6 grid-rows-15 gap-[16px]"
                    >
                        <EditReservationButton />
                        <EditReservationButton
                            color="#FC4545"
                            text="Verwijder Reservering"
                        />
                        <h2 className="col-span-3">Reserveringsinfo</h2>
                        <div className="col-span-6 row-span-4 bg-(--color-background)">
                            <div className="w-full h-full grid grid-cols-2 grid-rows-3 p-[32px] gap-x-[128px] gap-y-[16px]"></div>
                        </div>

                        <div className="col-span-6"></div>
                        <h2 className="col-span-3">Reserveringsinfo</h2>
                        <div className="col-span-6 row-span-7 bg-(--color-background)">
                            <div className="w-full h-full grid grid-cols-2 grid-rows-6 p-[32px] gap-x-[128px] gap-y-[16px]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
