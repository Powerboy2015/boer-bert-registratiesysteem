"use client";
import Separator from "./Separator";
import { CalendarMonth, Logout } from "@mui/icons-material";

export default function NavBar() {
    return (
        <div id="navbar" className="w-full md:w-20 md:h-full h-16 bg-[#262626] p-4 md:p-2">
            {/* Mobile banner */}
            <div id="mobile-banner" className="md:hidden w-full h-full flex justify-between items-center">
                <span id="randicon" className="h-12 w-9 bg-[#007248]"></span>
                <p id="page-title" className="text-2xl">
                    Reserveringen
                </p>
                <span id="randicon2" className="h-12 w-9 opacity-0"></span>
            </div>

            {/* Desktop sidebar */}
            <div
                id="desktop-sidebar"
                className="hidden md:flex flex-col gap-4 items-center justify-start w-full h-full"
            >
                <span id="icon" className="w-12 h-12 bg-[#007248]"></span>
                <Separator />
                <div id="routes" className="h-full">
                    <NavBarRoute route="/admin/reserveringen">
                        <CalendarMonth style={{ width: 48, height: 48 }} />
                    </NavBarRoute>
                </div>
                <Separator />
                <div id="logout">
                    <NavBarRoute route="/admin/logout">
                        <Logout style={{ width: 48, height: 48 }} />
                    </NavBarRoute>
                </div>
            </div>
        </div>
    );
}

interface NavBarRouteProps {
    route: string;
    children: React.ReactNode;
}

//Added here because it's only used in here like that.
function NavBarRoute({ route, children }: NavBarRouteProps) {
    const Currentroute = window.location.pathname;

    const showSelected = Currentroute == route;
    return (
        <span id="Reservation-Icon" className="w-full flex justify-center relative">
            <span
                className={`SelectedBar h-full w-1 bg-[#007248] absolute -left-2 ${showSelected ? "" : "hidden"}`}
            ></span>
            <a href={route} className={`${showSelected ? "text-[#007248]" : "text-[#808080]"}`}>
                {children}
            </a>
        </span>
    );
}
