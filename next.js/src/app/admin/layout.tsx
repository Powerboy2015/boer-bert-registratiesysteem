import "./whatthefuck.css";
import MobileNavBar from "./components/mobileNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div id="content" className="bg-[#EDEBDE] w-full h-full flex flex-col md:flex-row">
    <MobileNavBar/>
    <main className="text-black">
    {children}
    </main>
    </div>
    </>
  );
}