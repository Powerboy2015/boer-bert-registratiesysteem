import "./whatthefuck.css";
import NavBar from "./components/NavBar";
import { Roboto } from "next/font/google";

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
            <div id="overlays" className="fixed w-full h-full bg-black opacity-60 z-10 hidden"></div>
            <div id="content" className="bg-[#EDEBDE] w-full flex flex-col md:flex-row">
                <NavBar />
                <main className={` ${RobotoFont.className} text-black w-full h-full`}>{children}</main>
            </div>
        </>
    );
}
