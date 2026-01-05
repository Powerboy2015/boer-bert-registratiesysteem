import nl from "./Img/Flag_of_the_Netherlands.svg"
import du from "./Img/Flag_of_Germany_(3-2).svg.webp"
import en from "./Img/1280px-Flag_of_the_United_Kingdom.svg_.png"
import logo from "./Img/Logo (1).png"
import Image from "next/image";

export default function Topbar() {
    return (
        <div className="h-1/10 bg-[#93DAB8] flex">
            <Image className="h-20/10 w-2/10" src={logo}></Image>
            <div className=" flex items-center justify-end min-h-fit w-full" >
                <button className="bg-[#007248] text-white text-2xl py-1 px-7 rounded-md ">Contact</button>
                <div className="flex items-center px-10">
                    <button className="w-10 h-10 mx-1 rounded-2xl "><Image src={nl} alt="nedederlands" className="object-cover h-full w-full rounded-sm "></Image></button>
                    <button className="w-10 h-10 mx-1 rounded-2xl"><Image src={du} alt="nedederlands" className="object-cover h-full w-full rounded-sm"></Image></button>
                    <button className="w-10 h-10 mx-1 rounded-2xl"><Image src={en} alt="nedederlands" className="object-cover h-full w-full rounded-sm"></Image></button>

                </div>


            </div>
        </div>



    )

}