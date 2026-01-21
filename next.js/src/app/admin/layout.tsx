import "./whatthefuck.css";
import NavBar from "./components/NavBar";
import { Roboto } from "next/font/google";
import ViewDesktopReservation from "./components/ViewDesktopReservation";
import { ReservationOverlayProvider } from "./context/OverlayContext";

const RobotoFont = Roboto({
    variable: "--Roboto-font",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ReservationOverlayProvider>
                <div id="content" className="bg-[#EDEBDE] w-full flex flex-col lg:flex-row h-full">
                    <NavBar />
                    <main className={` ${RobotoFont.className} text-black w-full h-full`}>{children}</main>
                </div>
            </ReservationOverlayProvider>
        </>
    );
}
