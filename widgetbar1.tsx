"use client";
import React from "react";
import Link from "next/link";

export default function Widgetbar1 () {

    const [progress, setProgress] = React.useState(70);

    return (
        <>
            <Link href="/Testlink"> {/*link naar een andere pagina. b.v. 'reserveringen'*/}
                    <button /*styling kan nog veranderd worden aan de hand van de grootte in het ontwerp*/
                        className="widget1"
                        style={{
                            backgroundColor: "#5E6C87",
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
                            paddingLeft: "15px"
                        }} 
                    > {/*styling knop*/}
                        <span
                            className="Nieuwe-reserveringen"
                            style={{
                                fontSize: "16px",
                                margin: 0,
                                color: '#e5e7eb'
                            }}
                        >
                            Nieuwe reserveringen
                        </span> {/*text in de knop*/}

                        <div 
                            style={{
                                width: '100%',
                                marginTop: '8px'
                            }}
                        > {/*container progressbar en percentage*/}
                            <div>
                                <span
                                    className="flex justify-end"
                                    style={{
                                        fontSize: "32px",
                                        margin: 0,
                                        color: '#e5e7eb',
                                        textAlign: 'right'
                                    }}
                                >
                                    {progress}%
                                </span> {/*count in de knop, haalt info uit db*/}
                            </div>
                            <div 
                                style={{
                                    width: '100%',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '1px',
                                    marginTop: '8px'
                                }}
                            >{/*witte achtergrond progressbar*/}
                                <div
                                    style={{
                                        width: `${progress}%`,
                                        backgroundColor: '#4b5563', 
                                        height: '10px',
                                        borderRadius: '1px',
                                        transition: 'width 0.5s ease-in-out',
                                    }}
                                /> {/*donkergrijze progressbar*/}
                            </div>
                        </div>
                    </button >
                </Link>
        </>
    );
}

/*code werkt nog niet helemaal, moet nog aangepast worden*/