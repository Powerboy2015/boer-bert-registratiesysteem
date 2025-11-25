'use client'

import account from "./icons/person.svg";
import logout from "./icons/box-arrow-left.svg";
import calender from "./icons/calendar-date.svg";
import settings from "./icons/gear.svg";
import clock from "./icons/clock.svg";
import view from "./icons/view-stacked.svg";
import SideBarTab from "./SideBarTab";
import { useState } from "react";
import Image from "next/image";
import list from "./icons/list.svg"

export default function SideBar() {
  let name = "Bert Bertson";
  const [statusValue, setStatusValue] = useState(true)
  const status = statusValue ? "hidden" : "block"

  return (
    <>
      {/* Different sidebar sizes for different screen sizes*/}
      <button onClick={() => setStatusValue(!statusValue)} className="md:hidden absolute"><Image src={list} alt="error" className="invert w-10" /></button>
      <div className={`bg-gray-800 h-full w-full min-w-fit ${status} sm:w-1/1 md:w-1/4 md:block xl:w-1/5 2xl:w-1/10`}>
        <div className={"h-3/6 min-h-fit text-center pt-5"} >
          {/*Name of the logged on user */}
          <div className="text-4xl pb-5">{name}</div>
          <div className="flex justify-center">
            <div className="w-fit">
              {/* Sidebar tabs*/}
              <SideBarTab icon={calender} name="Overzicht" />
              <SideBarTab icon={clock} name="Reserveringen" />
              <SideBarTab icon={account} name="Accounts" />
            </div>
          </div>
        </div>
        {/* Put content at the bottom of the sidebar */}
        <div className=" flex-col content-end h-3/6 text-center pb-5">
          <div className="flex justify-center content-end">
            <div className="w-fit">
              {/* Bottom sidebar tabs */}
              <SideBarTab icon={settings} name="Instellingen" />
              <SideBarTab icon={logout} name="Logout" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
