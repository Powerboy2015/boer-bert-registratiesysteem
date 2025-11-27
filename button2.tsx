import React from "react";
import Link from "next/link";
export default function Button2() {
  return (
    <Link href="/Testlink"> {/*link naar een andere pagina. b.v. 'reserveringen'*/}
        <button
          className="button2" /*donkerkleurige knop*/
            style={{
              backgroundColor: "#5E6C87",
              color: "#cececeff",
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
        > {/*button styling*/}
          <span 
            style={{ fontSize: "16px", margin: 0 }}>Button
          </span> {/*wat er oop de knop komt te staan*/}
        </button>
    </Link>
  );
}