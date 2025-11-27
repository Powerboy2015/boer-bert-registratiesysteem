"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Input2() {
  const [text, setText] = useState("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value); /*zegt zovan yuh, de waarde van het input veld in de text variable moet dit zijn nzo :P*/
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") { /*als je op enter dukt moet de knop iets doen*/
    router.push("/Testlink"); /*moet aangepasst worden zodat je kan opzoeken wat je intypt*/
  }
  };
  return (
    <input
      className="donkerInput" /*donker kleurige input veld*/
      type="text"
      onChange={handleChange}
      onKeyDown={handleKeyDown} /*wanneer je enter drukt moet die iets doen*/
      placeholder="Input field name.."
      style={{
        backgroundColor: "#2e3038",   
        color: "#cececeff",
        padding: "px",
        borderRadius: "1px",
        border: "0px solid #ccc",
        fontSize: "22px",
        width: "15%",
        height: "50px",
        boxSizing: "border-box",
        fontFamily: "Roboto mono",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    /> /*styling van het input veld*/
  );
}