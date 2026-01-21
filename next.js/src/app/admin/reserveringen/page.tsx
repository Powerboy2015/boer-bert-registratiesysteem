"use client";
import { useEffect, useState } from "react";
import { ReservationSearch } from "../components/ReserveringSearch";
import { StylingProps } from "../stylingprops/props";
import { ArrowRightAlt, Create, PlusOne, Schedule, SentimentSatisfied } from "@mui/icons-material";
import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";

type inOutFilterType = "incoming" | "outgoing";
type timeFilterType = "today" | "week" | "month";

export default function AdminReserveringen() {
    const [timeFilter, setTimeFilter] = useState<timeFilterType>("today");
    const [inOutFilter, setInOutFilter] = useState<inOutFilterType>("incoming");
    const [resevationList, setReservationList] = useState<Reservering[]>([]);
    const [filterResList, setFilterResList] = useState<Reservering[]>([]);

    useEffect(() => {
        const isToday = (date1: string) => {
            const date = Date.parse(date1);
            const today = Date.parse(new Date().toJSON());

            console.log("comparing");
            console.log(today);
            console.log(date);

            return date === today;
        };

        switch (timeFilter) {
            case "today":
                const filtered = resevationList.filter((reservering) => isToday(reservering.DatumAankomst));
                console.log(filtered);
            case "week":
            case "month":
        }
    }, [timeFilter, inOutFilter, resevationList]);

    useEffect(() => {
        const fetchData = async () => {
            const url = new URL(window.location.origin);
            url.pathname = "/api/private/reservatiesenuserdata";

            const resp = await fetch(url);
            if (resp.ok) {
                const reserveringen = await resp.json();
                setReservationList(reserveringen.Reservation);
            }
        };

        fetchData();
    }, []);

    // TODO add useEffect that fires when any of these usestates change.

    return (
        <>
            <div id="mobile-reservations" className="lg:hidden py-8 px-4 w-full h-full">
                <section id="filters" className="flex flex-col gap-4">
                    <ReservationSearch />
                    <div
                        id="time-filters"
                        className="flex flex-row gap-2 text-[14px] justify-between w-full h-12 items-center py-2"
                    >
                        <button
                            style={{ boxShadow: StylingProps.BoxShadowTime }}
                            className={`${timeFilter == "today" ? "bg-[#00A367] border-[#00A367] text-[#EDEBDE]" : "border-[#999999]"} px-1 rounded-3xl  h-full w-full flex items-center justify-center border`}
                            id="time-filter-today"
                            onClick={() => {
                                setTimeFilter("today");
                            }}
                        >
                            <p>Vandaag</p>
                        </button>

                        <button
                            style={{ boxShadow: StylingProps.BoxShadowTime }}
                            className={`${timeFilter == "week" ? "bg-[#00A367] border-[#00A367] text-[#EDEBDE]" : "border-[#999999]"} px-1 rounded-3xl  h-full w-full flex items-center justify-center border`}
                            id="time-filter-week"
                            onClick={() => {
                                setTimeFilter("week");
                            }}
                        >
                            <p>Deze week</p>
                        </button>

                        <button
                            style={{ boxShadow: StylingProps.BoxShadowTime }}
                            className={`${timeFilter == "month" ? "bg-[#00A367] border-[#00A367] text-[#EDEBDE]" : "border-[#999999]"} px-1 rounded-3xl  h-full w-full flex items-center justify-center border`}
                            id="time-filter-month"
                            onClick={() => {
                                setTimeFilter("month");
                            }}
                        >
                            <p>Deze maand</p>
                        </button>
                    </div>
                    <div id="in-out-filters" className="w-full flex flex-row justify-around text-2xl pb-2">
                        <button
                            className="relative"
                            onClick={() => {
                                setInOutFilter("incoming");
                            }}
                        >
                            <p>Inkomend</p>
                            <span
                                className={`w-full h-1 ${inOutFilter == "incoming" ? "bg-[#007248]" : ""} absolute right-0 -bottom-1`}
                            ></span>
                        </button>

                        <button
                            className="relative"
                            onClick={() => {
                                setInOutFilter("outgoing");
                            }}
                        >
                            <p>Weggaand</p>
                            <span
                                className={`w-full h-1 ${inOutFilter == "outgoing" ? "bg-[#007248]" : ""} absolute right-0 -bottom-1`}
                            ></span>
                        </button>
                    </div>
                </section>
                <section id="reservations" className="w-full h-full pt-4">
                    {resevationList.map((reservering) => (
                        <Reservation key={reservering.reserveringsNr} res={reservering} />
                    ))}
                </section>
            </div>

            {/* Desktop version of the dashboard */}
            <div id="desktop-reservations" className="hidden lg:flex py-4 w-full">
                <div id="desktop-filtering" className="flex flex-col gap-4 px-4 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-5xl">Reserveringen</h1>
                        <button className="py-2 px-4 rounded-2xl bg-[#00B874] text-[#EDEBDE]">
                            + Nieuwe Reservering
                        </button>
                    </div>
                    <section id="desktop-filters" className="flex flex-row items-center gap-4 py-4">
                        <ReservationSearch
                            searchFunction={(query) => {
                                console.log(query);
                            }}
                        />
                        <div
                            id="desktop-filter-startdatum"
                            className="flex flex-row items-center px-4 py-2 gap-4 bg-[#F6F5EE] rounded-2xl outline outline-[#B3B3B3] text-[#808080] text-[16px]"
                        >
                            <Schedule />
                            <input type="date" name="desktop-filter-startdatum" id="" />
                        </div>
                        <div
                            id="desktop-filter-einddatum"
                            className="flex flex-row items-center px-4 py-2 gap-4 bg-[#F6F5EE] rounded-2xl outline outline-[#B3B3B3] text-[#808080] text-[16px]"
                        >
                            <Schedule />
                            <input type="date" name="desktop-filter-einddatum" id="" />
                        </div>
                        <div
                            id="desktop-filter-status"
                            className="flex flex-row items-center px-4 py-2 gap-4 bg-[#F6F5EE] rounded-2xl outline outline-[#B3B3B3] text-[#808080] text-[16px]"
                        >
                            <SentimentSatisfied />
                            <select name="desktop-fitler-status" id="" defaultValue={"none"}>
                                <option value="none" disabled hidden>
                                    Status
                                </option>
                                <option value="0">Alles</option>
                                <option value="1">Aangekomen</option>
                                <option value="2">Onderweg</option>
                                <option value="3">Niet aangekomen</option>
                            </select>
                        </div>
                        {/* <div id="new-reservation" className="flex flex-row items-center gap-4 px-4 px-2">
                            <Create />
                            <p>Nieuw</p>
                        </div> */}
                    </section>
                    <section id="desktop-in-out-filters"></section>
                </div>
                <div id="desktop-reservations"></div>
            </div>
        </>
    );
}

interface ReservationProps {
    res: Reservering;
    key: string;
}
function Reservation({ res, key }: ReservationProps) {
    return (
        <div
            key={key}
            id="reservation"
            className="flex flex-col gap-2 py-2 border border-l-0 border-r-0 border-[#CCCCCC]"
        >
            <div id="col1" className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-4xl"></span>
                    <p>
                        {res.Voornaam} {res.Achternaam}
                    </p>
                </div>
                <p>Plaats {res.PlekNummer}</p>
            </div>
            <div id="col2" className="flex flex-row justify-between text-[#808080]">
                <p>
                    {new Date(res.DatumAankomst).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
                <ArrowRightAlt />
                <p>
                    {new Date(res.DatumVertrek).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </p>
            </div>
        </div>
    );
}
