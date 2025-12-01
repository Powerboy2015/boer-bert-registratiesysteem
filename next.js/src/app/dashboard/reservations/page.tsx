"use client";

import NieuweReserveringen from "./Widgets/NieuweReserveringen";
import OpenstaandeReserveringen from "./Widgets/OpenstaandeReserveringen";
import Capaciteit from "./Widgets/Capaciteit";
import Reserveringen from "./Widgets/Reserveringen";

export default function reserveringen() {
    return (
        <div className="flex h-full w-full">
            <div className="h-full w-full flex flex-col">
                <div className="grid grid-cols-3 m-5">
                    <NieuweReserveringen />
                    <OpenstaandeReserveringen />
                    <Capaciteit />
                </div>
                <Reserveringen />
            </div>
        </div>
    );
}
