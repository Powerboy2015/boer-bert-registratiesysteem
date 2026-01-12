'use client';

import { useState } from "react";

type SearchbarProps = {
    onSearch: (query: string) => void;
};

export default function Searchbar({ onSearch }: SearchbarProps) {
    const [value, setValue] = useState("");

    const handleSearch = () => {
        onSearch(value);
    };

    return (
        <div className="flex items-center bg-[#556483] px-4 py-3 rounded">
            <input
                type="search"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Zoek reservering..."
                className="bg-transparent text-white outline-none text-xl w-72 search-cancel-button:color-white"
            />


        </div>
    );
}
