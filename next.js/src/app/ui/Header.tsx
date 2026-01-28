"use client";
import Image from "next/image";
import logo from "@/app/Images/logo.jpg";
import React, { useEffect, useState } from "react";

export default function Header() {
    const [shrink, setShrink] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setShrink(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="sticky top-0 z-50 relative bg-[#93DAB8] shadow-lg justify-start flex items-center sm:px-4 min-h-[70px] sm:min-h-[100px] md:min-h-[130px]">
            <div
                className={`relative transition-all duration-300
                ${shrink ? "scale-[1.4] sm:scale-[1.7] md:scale-[2.1]" : "scale-[1.6] sm:scale-[2] md:scale-[2.6]"}
                `}
            >
                <div className="bg-[#007248] rounded-[50%] w-[130px] h-[75px] items-center justify-center shadow-lg block">
                    <div className="bg-[#FDF5D8] rounded-[50%] w-[125px] h-[67px] mt-2 mr-1 flex items-center justify-center">
                        <div className="relative w-[60px] h-[60px]">
                            <Image
                                src={logo}
                                alt="Boer Bert Logo"
                                fill
                                className="object-cover rounded-full"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 sm:gap-6 pl-16 sm:pl-26 md:pl-32">
                <a href="../">
                    <button className="bg-[#FDF5D8] text-[#007248] hover:border-2 hover:border-[#007248] font-bold rounded-xl text-[11px] sm:text-sm md:text-lg lg:text-2xl md:w-[110px] lg:w-[140px] md:h-[85px] lg:h-[100px] sm:w-20 sm:h-[50px] w-[65px] h-10">
                        Home
                    </button>
                </a>
                <a href="../klanten/1">
                    <button className="bg-[#FDF5D8] text-[#007248] hover:border-2 hover:border-[#007248] font-bold rounded-xl text-[11px] sm:text-sm md:text-lg lg:text-2xl md:w-[110px] lg:w-[140px] md:h-[85px] lg:h-[100px] sm:w-20 sm:h-[50px] w-[65px] h-10">
                        Reserveren
                    </button>
                </a>
            </div>
        </header>
    );
}
