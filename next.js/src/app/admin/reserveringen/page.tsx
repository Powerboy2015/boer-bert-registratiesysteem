"use client";
import { ReservationSearch } from "../components/ReserveringSearch";

export default function adminReserveringen() {
    return (
        <>
            <div id="mobile-reservations" className="md:hidden py-8 px-4">
                <section id="filters" className="flex flex-col gap-4">
                    <ReservationSearch />
                </section>
            </div>
            <div id="desktop-reservations" className="hidden md:flex"></div>
        </>
    );
}
