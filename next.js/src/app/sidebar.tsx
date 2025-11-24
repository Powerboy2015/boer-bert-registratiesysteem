import account from "./icons/person.svg";
import logout from "./icons/box-arrow-left.svg";
import calender from "./icons/calendar-date.svg";
import settings from "./icons/gear.svg";
import Image from "next/image";

export default function SideBar() {
  return (
    <div className="bg-gray-800 w-1/7 h-full min-w-35">
      <div className="h-3/6 text-center pt-5">
        <div className="text-2xl pb-5">Bert Bertson</div>
        <div className="flex justify-center">
          <div className="h-100 w-fit">
            <div className="flex">
              <Image src={settings} alt="error" className="mr-3 invert" />
              <p className="text-2xl">Overzicht</p>
            </div>
            <div className="flex">
              <Image src={settings} alt="error" className="mr-3 invert" />
              <p className="text-2xl">Reserveringen</p>
            </div>
            <div className="flex">
              <Image src={settings} alt="error" className="mr-3 invert" />
              <p className="text-2xl">Accounts</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex-col content-end h-3/6 text-center pb-5">
        <div>Instellingen</div>
        <div>Logout</div>
      </div>
    </div>
  );
}
