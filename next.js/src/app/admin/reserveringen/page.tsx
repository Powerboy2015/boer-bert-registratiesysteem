"use client";
import { useEffect, useState } from "react";
import { ReservationSearch } from "../components/ReserveringSearch";
import { StylingProps } from "../stylingprops/props";

export default function AdminReserveringen() {
    const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">("today");

    return (
        <>
            <div id="mobile-reservations" className="md:hidden py-8 px-4 w-full h-full">
                <section id="filters" className="flex flex-col gap-4">
                    <ReservationSearch />
                    <div
                        id="time-filters"
                        className="flex flex-row gap-2 text-[14px] justify-between w-full h-12 items-center py-2"
                    >
                        <div
                            style={{ boxShadow: StylingProps.BoxShadowTime }}
                            className={`${timeFilter == "today" ? "bg-[#00A367] border-[#00A367]" : "border-[#999999]"} px-1 rounded-3xl  h-full w-full flex items-center justify-center border`}
                            id="time-filter-today"
                            onClick={() => {
                                setTimeFilter("today");
                            }}
                        >
                            <p>Vandaag</p>
                        </div>
                        <div
                            style={{ boxShadow: StylingProps.BoxShadowTime }}
                            className={`${timeFilter == "week" ? "bg-[#00A367] border-[#00A367]" : "border-[#999999]"} px-1 rounded-3xl  h-full w-full flex items-center justify-center border`}
                            id="time-filter-week"
                            onClick={() => {
                                setTimeFilter("week");
                            }}
                        >
                            <p>Deze week</p>
                        </div>
                        <div
                            style={{ boxShadow: StylingProps.BoxShadowTime }}
                            className={`${timeFilter == "month" ? "bg-[#00A367] border-[#00A367]" : "border-[#999999]"} px-1 rounded-3xl  h-full w-full flex items-center justify-center border`}
                            id="time-filter-month"
                            onClick={() => {
                                setTimeFilter("month");
                            }}
                        >
                            <p>Deze maand</p>
                        </div>
                    </div>
                </section>
            </div>
            <div id="desktop-reservations" className="hidden md:flex"></div>
        </>
    );
}
