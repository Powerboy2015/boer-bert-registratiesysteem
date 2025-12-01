"use client";
import Image from "next/image";

interface SideBarTabProps {
  icon: string;
  name: string;
  link: string;
}

export default function SideBarTab({ icon, name, link }: SideBarTabProps) {
  return (
    <button
      onClick={() => window.location.replace(`/${link}`)}
      className="flex mb-5 hover:bg-[#556483] rounded-2xl p-2 items-center"
      type="button"
    >
      <Image src={icon} alt="error" className="mr-3 invert w-10" />
      <p className="text-2xl ">{name}</p>
    </button>
  );
}
