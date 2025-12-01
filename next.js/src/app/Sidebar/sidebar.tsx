"use client";

import { useState } from "react";

export default function SideBar() {
  let name = "Bert Bertson";
  const [statusValue, setStatusValue] = useState(true);
  const status = statusValue ? "hidden" : "block";

  const test = null;

  return (
    <>
      {/* Different sidebar sizes for different screen sizes*/}
      <button
        onClick={() => setStatusValue(!statusValue)}
        className="md:hidden fixed z-50 bottom-0 bg-[#556483] rounded-4xl p-2"
      ></button>
      <div
        className={`bg-[#2E3038] min-h-screen w-full min-w-fit ${status} sm:w-1/1 md:w-1/4 md:block xl:w-1/5 2xl:w-1/10`}
      >
        <div className={"h-3/6 min-h-fit text-center pt-5"}>
          {/*Name of the logged on user */}
          <div className="text-4xl pb-5">{name}</div>
          <div className="flex justify-center">
            <div className="w-fit">{/* Sidebar tabs*/}</div>
          </div>
        </div>
        {/* Put content at the bottom of the sidebar */}
        <div className=" flex-col content-end h-3/6 text-center pb-5">
          <div className="flex justify-center content-end">
            <div className="w-fit">{/* Bottom sidebar tabs */}</div>
          </div>
        </div>
      </div>
    </>
  );
}
