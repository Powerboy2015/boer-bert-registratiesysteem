import Database from "@/app/connections/Database";
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
        <div className="w-full h-full flex flex-col gap-[32px] relative">
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
                    className="w-full h-[1080px] px-[8px]"
                >
                    <div
                        id="inner"
                        className="w-full h-full bg-(--color-accent-2)"
                    ></div>
                </div>
            </div>
        </div>
    );
}
