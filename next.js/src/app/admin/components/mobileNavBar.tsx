import Separator from "./Separator";
import { Schedule } from "@mui/icons-material";

export default function MobileNavBar() {
    return (
        <div id="navbar" className="w-full md:w-20 md:h-full h-16 bg-[#262626] p-4 md:p-2">
            
            {/* Mobile banner */}
            <div id="mobile-banner" className="md:hidden w-full h-full flex justify-between items-center">
            <span id="randicon" className="h-12 w-9 bg-[#007248]"></span>
            <p id="page-title" className="text-2xl">Reserveringen</p>
            <span id="randicon2" className="h-12 w-9 opacity-0"></span>
            </div>

            {/* Desktop sidebar */}
            <div id="desktop-sidebar" className="hidden md:flex flex-col gap-4 items-center justify-start w-full h-full">
                <span id="icon" className="w-12 h-12 bg-[#007248]"></span>
                <Separator/>
                <span>
                    
                </span>
            </div>
        </div>

    );
}