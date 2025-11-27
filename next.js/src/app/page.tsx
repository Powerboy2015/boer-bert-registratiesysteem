import Image from "next/image";
import React from 'react';
import SideBar from "./Sidebar/sidebar";
import Searchbar from "./Searchbar/searchbar";
export default function Home() {
  return (
      <>
          <SideBar/>
          <Searchbar/>
      </>
    );
}
