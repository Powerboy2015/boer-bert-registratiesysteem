"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { link } from "fs";
export default function optionField2 () {

const router = useRouter();
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  router.push("/Testlink")};{/*doe hier je actie bij filteren*/}

  return (
    <>
        <div
          onChange={handleChange}
        >
            <select
                  className="donkerOption" /*donker kleurige input veld*/
                  style={{
                    backgroundColor: "#2e3038",
                    color: "#cececeff",
                    padding: "0px",
                    borderRadius: "0px",
                    border: "0px solid #ccc",
                    fontSize: "22px",
                    width: "15%",
                    height: "50px",
                    boxSizing: "border-box",
                    fontFamily: "Roboto mono",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    }}
            > {/*styling dropdown menu*/}
                <option value="">filter</option>
                <option value="wawa">wawa</option>
                <option value="wowo">wowo</option>
                <option value="wewe">wewe</option>
                <option value="wiwi">wiwi</option>
            </select> {/*leuke opties invullen ofzo idk ;P*/}
        </div> {/*dropdown menu voor filteren*/}
    </>
  );
}