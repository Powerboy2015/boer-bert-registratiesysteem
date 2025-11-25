"use client";
import React, { useState } from "react";  
import Link from "next/link";
export default function Widgetbar() {    
    return  (<>     
            <Link href="/Testlink">             
                <button
                    className="widget1"
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
                > 
                <span style={{ fontSize: "16px", margin: 0 }}>Nieuwe reserveringen</span>
                    <div>
                        <div>
                            progress bar  {/*hier moet de progressbar*/}
                        </div>
                    </div>
                </button >
            </Link>
            </>)
} /*code werkt nog niet helemaal, moet nog aangepast worden*/