"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Input1() {
  const [text, setText] = useState("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    router.push("/Testlink");            /*moet aangepasst worden zodat je kan opzoeken wat je intypt*/
  }
  };
  return (
    <input
      type="text"
      onChange={handleChange}
      onKeyDown={handleKeyDown}         /*wanneer je enter drukt moet die iets doen*/
      placeholder="Input field name.."
      style={{
        backgroundColor: "#5E6C87",   /*lichter kleurige input veld*/
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
    />
  );
}