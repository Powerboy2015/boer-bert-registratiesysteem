import React from "react";  
import Link from "next/link";
export default function Widget2({count= 0 }: {count?: number}) { /*moet nog db aanroepen om count te krijgen*/
    return  (<>
            <Link href="/Testlink"> {/*link naar een andere pagina. b.v. 'reserveringen'*/}
                <button /*styling kan nog veranderd worden aan de hand van de grootte in het ontwerp*/
                    className="widget2"/*donkerkleurige knop*/
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
                        paddingLeft: "15px"
                    }} 
                > {/*styling knop*/}
                    <span
                        style={{ fontSize: "16px", margin: 0 }}>Nieuwe reserveringen
                    </span> {/*aparte styling voor de text in de knop*/}
                    <span
                        style={{ fontSize: "32px", margin: 0 }}>{count}
                    </span>{/*count in de knop, haalt info uit db*/}
                </button >
            </Link>
            </>)
}