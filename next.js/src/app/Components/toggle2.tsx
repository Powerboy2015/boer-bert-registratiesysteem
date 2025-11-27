"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export default function Toggle2() {
  const [isToggled, setIsToggled] = React.useState(false);
  const handleToggle = () => {
    setIsToggled(!isToggled); /*toggle state is standaard 'false'*/
  };
  const router = useRouter();
    if (isToggled) {
      router.push("/Testlink"); /*link naar Testlink*/
  }
  
  return (
    <>
      <button
        onClick={handleToggle}
        style={{
          backgroundColor: "#2e3038",
          color: "#dce0e6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "222px",
          padding: "10px 12px",
          border: "0px solid #2e3038",
          borderRadius: "1px",
          cursor: "pointer",
          fontFamily: "Roboto Mono, monospace",
          fontSize: "20px",
        }}
      > {/*styling toggle knop*/}
        <span>This option!</span> {/*text in de toggle knop*/}
        <div
          style={{                             
            width: "26px",
            height: "26px",
            backgroundColor: isToggled ? "#2e3038" : "#d6d6c9",
            border: "1px solid #d6d6c9",
          }}
        /> {/*de toggle knop zelf*/}
      </button>
    </>
  );
};