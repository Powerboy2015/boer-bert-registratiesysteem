import account from "./icons/person.svg";
import logout from "./icons/box-arrow-left.svg";
import calender from "./icons/calendar-date.svg";
import settings from "./icons/gear.svg";
import clock from "./icons/clock.svg";
import view from "./icons/view-stacked.svg";
import SideBarTab from "./SideBarTab";

export default function SideBar() {
  let name = "Bert Bertson";
  return (
    <>
      {/* Different sidebar sizes for different screen sizes*/}
      <div className="bg-[#2E3038] h-full w-full min-w-fit sm:w-1/1 md:w-1/4 xl:w-1/5 2xl:w-1/10">
        <div className="h-3/6 text-center pt-5">
          {/*Name of the logged on user */}
          <div className="text-4xl pb-5">{name}</div>
          <div className="flex justify-center">
            <div className="w-fit">
              {/* only show Dashboard if device width > 768px */}
              <div className="md:hidden">
                <SideBarTab icon={view} name="dashboard" />
              </div>
              {/* Sidebar tabs*/}
              <SideBarTab icon={calender} name="overzicht" />
              <SideBarTab icon={clock} name="reserveringen" />
              <SideBarTab icon={account} name="accounts" />
            </div>
          </div>
        </div>
        {/* Put content at the bottom of the sidebar */}
        <div className=" flex-col content-end h-3/6 text-center pb-5">
          <div className="flex justify-center content-end">
            <div className="w-fit">
              {/* Bottom sidebar tabs */}
              <SideBarTab icon={settings} name="instellingen" />
              <SideBarTab icon={logout} name="logout" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
