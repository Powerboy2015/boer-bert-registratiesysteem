import account from "./icons/person.svg";
import logout from "./icons/box-arrow-left.svg";
import calender from "./icons/calendar-date.svg";
import settings from "./icons/gear.svg";
import clock from "./icons/clock.svg";
import view from "./icons/view-stacked.svg";
import SideBarTab from "./SideBarTab";

export default function SideBar() {
  return (
    <div className="bg-gray-800 h-full w-full min-w-fit sm:w-1/1 md:w-1/4 xl:w-1/5 2xl:w-1/10">
      <div className="h-3/6 text-center pt-5">
        <div className="text-4xl pb-5">Bert Bertson</div>
        <div className="flex justify-center">
          <div className="w-fit">
            <div className="md:hidden">
              <SideBarTab icon={view} name="Dashboard" />
            </div>
            <SideBarTab icon={calender} name="Overzicht" />
            <SideBarTab icon={clock} name="Reserveringen" />
            <SideBarTab icon={account} name="Accounts" />
          </div>
        </div>
      </div>
      <div className=" flex-col content-end h-3/6 text-center pb-5">
        <div className="flex justify-center content-end">
          <div className="w-fit">
            <SideBarTab icon={settings} name="Instellingen" />
            <SideBarTab icon={logout} name="Logout" />
          </div>
        </div>
      </div>
    </div>
  );
}
