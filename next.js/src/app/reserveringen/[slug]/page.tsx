import DisplayFieldComponent from "@/app/ui/DisplayFieldComponent";
import ButtonComponent from "@/app/ui/ButtonComponent";
import MapTargetComponent from "@/app/ui/MapTargetComponent";
import { Roboto } from "next/font/google";
import SideBar from "@/app/Sidebar/sidebar";
import EditReservationModal from "@/app/ui/EditReservationModal";
import DeleteReservationModal from "@/app/ui/DeleteReservationModal";
import adminAPI from "@/app/classes/adminAPI";
import { IReservationUserdata } from "@/app/types/database";

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

    const data: IReservationUserdata = (await adminAPI.getReservation(slug)).Reservation[0];
    console.log(data);

    return (
        <>
            <div id="reservation-layout" className="w-full h-full">
                <div
                    id="background"
                    className=" w-full h-full fixed bg-(--color-background)"
                ></div>
                <div
                    id="content"
                    className="p-8 flex w-full max-w-[1440px] relative gap-4 m-auto"
                >
                    <SideBar />
                    <main className="w-full h-full">
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
                                        {data.ReseveringsNr}
                                    </p>
                                </div>
                                <div
                                    id="view-reservation-data"
                                    className="w-full px-2"
                                >
                                    <div
                                        id="inner"
                                        className="w-full h-full bg-(--color-accent-2) px-8 py-12 grid grid-cols-6 grid-rows-15 gap-4 shadow-(--box-shadow-view)"
                                    >
                                        <ButtonComponent>
                                            <EditReservationModal
                                                reservering={data}
                                                hideIcon
                                            />
                                        </ButtonComponent>

                                        <ButtonComponent
                                            color="#FC4545"
                                            text="Verwijder Reservering"
                                        >
                                            <DeleteReservationModal
                                                reservering={data}
                                                RedirectCallback
                                                hideIcon
                                            />
                                        </ButtonComponent>

                                        <h2
                                            className={`col-span-3 mt-auto mb-0 ${roboto.className} text-[40px] text-(--color-text)`}
                                        >
                                            Reserveringsinfo
                                        </h2>
                                        <section className="col-span-6 row-span-4 bg-(--color-background)">
                                            <div className="w-full h-full grid grid-cols-2 grid-rows-3 p-8 gap-x-32 gap-y-4 inset-shadow-(--inset-shadow-box)">
                                                <DisplayFieldComponent
                                                    fieldname="ReserveringsNummer"
                                                    data={data.ReseveringsNr}
                                                />
                                                <DisplayFieldComponent
                                                    fieldname="ReserveringsDatum"
                                                    data={
                                                        data.ReserveringsDatum.split(
                                                            "T"
                                                        )[0]
                                                    }
                                                />
                                                <DisplayFieldComponent
                                                    fieldname="AankomstDatum"
                                                    data={
                                                        data.DatumAankomst.split(
                                                            "T"
                                                        )[0]
                                                    }
                                                />
                                                <DisplayFieldComponent
                                                    fieldname="VertrekDatum"
                                                    data={
                                                        data.DatumVertrek.split(
                                                            "T"
                                                        )[0]
                                                    }
                                                />
                                                <DisplayFieldComponent
                                                    fieldname="Plaats"
                                                    data={data.PlekNummer}
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
                                                    data={data.Voornaam}
                                                />
                                                <DisplayFieldComponent
                                                    fieldname="Achternaam"
                                                    data={data.Achternaam}
                                                />
                                                <div>
                                                    {/** Empty space in order to create the space between inputs */}
                                                </div>
                                                <DisplayFieldComponent
                                                    fieldname="Telefoonnummer"
                                                    data={data.Telefoonnummer}
                                                />
                                                <div className="col-span-2">
                                                    {/** Empty space in order to create the space between inputs */}
                                                </div>
                                                <DisplayFieldComponent
                                                    fieldname="Woonplaats"
                                                    data={data.Woonplaats}
                                                    spanSize={2}
                                                />
                                                <DisplayFieldComponent
                                                    fieldname="Email"
                                                    data={data.Email}
                                                    spanSize={2}
                                                />
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
