import React from "react";
import Link from "next/link";
export default function Button1() {
  return (
    <Link href="/Testlink">                        {/*link naar een andere pagina. b.v. 'reserveringen'*/}
        <button
            className="button1"                    /*lichtkleurige knop*/
                style={{
                    backgroundColor: "#f5f5e9",
                    color: "#4b5563",
                    padding: "20px 15px",
                    borderRadius: "1px",
                    border: "0px solid #e5e7eb",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "4px",
                    fontFamily: "Roboto mono",
                    textAlign: "left",
                    paddingLeft: "15px",
                }}
            >
            <span style={{ fontSize: "16px", margin: 0 }}>Button</span> {/*Wat er op de knop komt te staan*/}
        </button>
    </Link>
  );
}