import "./whatthefuck.css";
import NavBar from "./components/NavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div id="content" className="bg-[#EDEBDE] w-full h-full flex flex-col md:flex-row">
                <NavBar />
                <main className="text-black py-4">{children}</main>
            </div>
        </>
    );
}
