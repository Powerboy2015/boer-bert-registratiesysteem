import { Search } from "@mui/icons-material";
import { KeyboardEvent, useState } from "react";
import { StylingProps } from "../stylingprops/props";
import { Roboto } from "next/font/google";

const RobotoFont = Roboto({
    variable: "--Roboto-font",
    subsets: ["latin"],
});

interface ReservationSearchProps {
    searchFunction?: (query: string) => void;
}

export function ReservationSearch({ searchFunction }: ReservationSearchProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleReservationSearch = () => {
        if (searchFunction) searchFunction(searchQuery);
        return console.log("TODO", `Searchquery: ${searchQuery}`);
    };

    const handleKeyPress = (keyPress: KeyboardEvent<HTMLInputElement>) => {
        if (keyPress.key == "Enter") {
            handleReservationSearch();
        }
    };

    return (
        <div
            id="SearchReservations"
            className="flex flex-row h-12 w-full lg:w-fit items-center rounded-2xl bg-white px-3 relative border border-[#B3B3B3]"
            style={{ boxShadow: StylingProps.BoxShadowSearch }}
        >
            <input
                type="text"
                name="searchReservation"
                id="input-reservation-search"
                placeholder="Zoek een reservering...."
                className={`flex-1 h-full ${RobotoFont.className} focus:outline-0`}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                onKeyUp={handleKeyPress}
            />
            <div
                className="w-8 h-8"
                onClick={() => {
                    handleReservationSearch();
                }}
            >
                <Search style={{ width: 32, height: 32, position: "absolute", right: 12 }} />
            </div>
        </div>
    );
}
