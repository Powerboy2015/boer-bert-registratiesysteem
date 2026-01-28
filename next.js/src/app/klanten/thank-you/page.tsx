"use client";
import { UserAndReservatieBody } from "@/app/api/private/reservatiesenuserdata/route";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import { ArrowRightAltSharp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

let latestReservation: UserAndReservatieBody | null = null;
if (typeof window !== "undefined") {
    const raw = localStorage.getItem("latestReservation");
    if (raw) {
        const parsed: UserAndReservatieBody = JSON.parse(raw);
        latestReservation = parsed;
    }
}

export default function ThankYouPage() {
    const router = useRouter();

    if (latestReservation === null) return router.push("/");

    return (
        <div className="min-h-screen w-full text-[#2c2c2c] font-sans flex flex-col">
            <Header />
            <main className="flex-1 bg-[#FDF5D8] py-12 flex justify-center items-center flex-col w-full h-full px-6">
                <div id="title-text" className=" mb-4">
                    <h1 className="text-4xl font-bold">Bedankt voor je reservering!</h1>
                    <h2 className="text-2xl font-medium">
                        Je hebt een email ontvangen met de informatie hieronder:
                    </h2>
                </div>
                <div className="reservation-information bg-white w-full max-w-[333px] min-h-[50dvh] rounded-2xl flex flex-col justify-between py-8 px-4 text-[#666666] font-medium">
                    <div id="user-info">
                        <h3 id="full-name" className="text-2xl font-bold">
                            {latestReservation?.UserData.Voornaam} {latestReservation?.UserData.Achternaam}
                        </h3>
                        <p id="email">{latestReservation?.UserData.Email}</p>
                        <p id="phone-number">{latestReservation?.UserData.Telefoonnummer}</p>
                        <p id="location">{latestReservation?.UserData.Woonplaats}</p>
                    </div>
                    <div id="reservation-info">
                        <h3 className="text-2xl font-bold">Reserverings info</h3>
                        <div className="inner">
                            <div id="start-end-field" className="flex flex-row justify-around">
                                <p id="start-date">{latestReservation.Reservatie.DatumAankomst}</p>
                                <ArrowRightAltSharp style={{ color: "#666666" }} />
                                <p id="end-date">{latestReservation.Reservatie.DatumVertrek}</p>
                            </div>
                            <div id="plaats-nummer" className="flex flex-row justify-between">
                                <p>Plaats</p>
                                <p className="text-black">
                                    {latestReservation.Plek.PlekNummer} ({latestReservation.Plek.Grootte})
                                </p>
                            </div>
                            <div id="aantal-personen" className="flex flex-row justify-between">
                                <p>Aantal personen: </p>
                                <p className="text-black">{latestReservation.Reservatie.AantalMensen}</p>
                            </div>
                            <div id="Kosten" className="flex flex-row justify-between">
                                <p>Kosten: </p>
                                <p className="text-black">€{latestReservation.Reservatie.Prijs}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
