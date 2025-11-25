import Image from "next/image";
import SideBar from "./Sidebar/sidebar";
import CampingOverzicht from "./Widgets/CampingOverzicht";
export default function Home() {
  return (
      <>
          <SideBar/>
          <CampingOverzicht/>
      </>
    );
}
