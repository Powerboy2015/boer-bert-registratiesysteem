import SideBar from "../sidebar/sidebar";
import NieuweReserveringen from "./Widgets/NieuweReserveringen";
import OpenstaandeReserveringen from "./Widgets/OpenstaandeReserveringen";
import Capaciteit from "./Widgets/Capaciteit";
import Reserveringen from "./Widgets/Reserveringen";
import ReserveringOverlay from "./NieuweReservering/ReserveringOverlay";

export default function reserveringen() {
  const overlay = true
  return (
    <div className="flex h-full w-full">
      <SideBar />
      <div className="h-full w-full flex flex-col">
        <div className="grid grid-cols-3 h-1/4 w-99/100 m-5 min-h-fit">
          <NieuweReserveringen />
          <OpenstaandeReserveringen />
          <Capaciteit />
        </div>
        <Reserveringen />

        {overlay ? <ReserveringOverlay /> : null}


      </div>
    </div>
  );
}
