import DisplayFieldComponent from "@/app/ui/DisplayFieldComponent";
import ButtonComponent from "@/app/ui/ButtonComponent";
import { redirect } from "next/navigation";
import MapTargetComponent from "@/app/ui/MapTargetComponent";
import { Roboto } from "next/font/google";
import SideBar from "@/app/Sidebar/sidebar";
import { UserAndReservatieBody } from "@/app/api/private/reservatiesenuserdata/route";
import EditReservationModal from "@/app/ui/EditReservationModal";
import DeleteReservationModal from "@/app/ui/DeleteReservationModal";
import { FormEvent } from "react";

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

    const url = new URL("http://localhost:3000/api/private/reservatiesenuserdata");
    url.searchParams.set("searchColumn", "ReseveringsNr");
    url.searchParams.set("searchValue", slug);

    const resp = await fetch(url, {
        method: "GET",
    });

    if (!resp.ok) {
        return (
            <div>
                <h1>failed to load data</h1>
            </div>
        );
    }

    const response: UserAndReservatieBody = await resp.json();
    const data = response.Reservation[0];
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
                    className="p-[32px] flex w-full max-w-[1440px] relative gap-[16px] m-auto"
                >
                    <SideBar />
                    <main className="w-full h-full">
                        <div className="w-full flex flex-col gap-[32px] relative">
                            <MapTargetComponent place={"1"} />
                            <div className="w-full flex flex-col">
                                <div
                                    id="header-part"
                                    className="sticky top-[0px] p-[16px] flex flex-col gap-[16px] bg-(--color-accent) text-(--color-text) z-10"
                                >
                                    <h1
                                        className={`w-full text-[64px] font-semibold ${robotoBold.className} m-[0px]`}
                                    >
                                        Overzicht reservering
                                    </h1>
                                    <p
                                        className={`text-[64px] font-[400] ${roboto.className} m-[0px]`}
                                    >
                                        {data.ReseveringsNr}
                                    </p>
                                </div>
                                <div
                                    id="view-reservation-data"
                                    className="w-full px-[8px]"
                                >
                                    <div
                                        id="inner"
                                        className="w-full h-full bg-(--color-accent-2) px-[32px] py-[48px] grid grid-cols-6 grid-rows-15 gap-[16px] shadow-(--box-shadow-view)"
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
                                            className={`col-span-3 mt-auto mb-[0px] ${roboto.className} text-[40px] text-(--color-text)`}
                                        >
                                            Reserveringsinfo
                                        </h2>
                                        <section className="col-span-6 row-span-4 bg-(--color-background)">
                                            <div className="w-full h-full grid grid-cols-2 grid-rows-3 p-[32px] gap-x-[128px] gap-y-[16px] inset-shadow-(--inset-shadow-box)">
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
                                            className={`col-span-3 mt-auto mb-[0px] ${roboto.className} text-[40px] text-(--color-text)`}
                                        >
                                            Reserveringsinfo
                                        </h2>
                                        <section className="col-span-6 row-span-7 bg-(--color-background) inset-shadow-(--inset-shadow-box)">
                                            <div className="w-full h-full grid grid-cols-2 grid-rows-5 p-[32px] gap-x-[128px] gap-y-[16px]">
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
