"use client";

import SideBar from "@/app/Sidebar/sidebar";
import NieuweReserveringen from "@/app/reserveringen/Widgets/NieuweReserveringen";
import OpenstaandeReserveringen from "@/app/reserveringen/Widgets/OpenstaandeReserveringen";
import Capaciteit from "@/app/reserveringen/Widgets/Capaciteit";
import Reserveringen from "@/app/reserveringen/Widgets/Reserveringen";

export default function reserveringen() {
    return (
        <div className="flex h-full w-full">
            <SideBar />
            <div className="h-full w-full flex flex-col">
                <div className="md:grid md:grid-cols-3 md:m-5">
                    <NieuweReserveringen />
                    <OpenstaandeReserveringen />
                    <Capaciteit />
                </div>
                <Reserveringen />
            </div>
        </div>
    );
}
