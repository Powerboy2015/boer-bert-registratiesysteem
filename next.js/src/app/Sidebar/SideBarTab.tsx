"use client";
import Image from "next/image";
// prettier-ignore
export default function SideBarTab({ icon, name, route }: { icon: string, name: string, route:string }) {
  return (
    <button onClick={()=> window.location.replace(`/${route}`)} className="flex mb-5 hover:bg-[#556483] rounded-2xl p-2 items-center">
      <Image src={icon} alt="error" className="mr-3 invert w-10" />
      <p className="text-2xl ">{name}</p>
    </button>
  );
}
