"use client";
import Image from "next/image";
import logo from "@/app/Images/logo.jpg";
import de from "@/app/Images/de.jpg";
import eng from "@/app/Images/eng.jpg";
import nl from "@/app/Images/nl.jpg";
import w3c from "@/app/Images/w3c.jpg";
import camping8 from "@/app/Images/camping8.jpg";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { send } from "process";
import { error } from "console";
import Footer from "../../ui/Footer";
import Header from "../../ui/Header";
{
  /*niet op letten waarom er zo veel imports zijn die niet worden gebruikt dank u */
}
export default function Reservering2() {
  const [shrink, setShrink] = useState(false);
  const router = useRouter();
  const [text, setText] = useState("");
  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [telNr, setTelnr] = useState("");
  const [adres, setAdres] = useState("");
  const [email, setEmail] = useState("");
  const [plaats, setPlaats] = useState("");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShrink(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function sendData() {
    const url = "http://localhost/api/public/reserveren";

    if (
      !!voornaam &&
      !!achternaam &&
      !!telNr &&
      !!adres &&
      !!email &&
      !!plaats
    ) {
      try {
        fetch(url, {
          method: "POST",
          body: JSON.stringify({
            UserData: {
              Voornaam: voornaam,
              Achternaam: achternaam,
              Email: email,
              Telefoonnummer: telNr,
              Woonplaats: plaats,
            },
            Reservatie: {
              ReseveringsNr: 2,
              DatumAankomst: localStorage.getItem("DatumAankomst"),
              DatumVertrek: localStorage.getItem("DatumVertrek"),
              AantalMensen: localStorage.getItem("Personen"),
            },
            Plek: {
              PlekNummer: localStorage.getItem("PlekNr"),
            },
          }),
        });
        if (voornaam && achternaam && telNr && email && plaats) {
          window.location.href = "https://ideal.nl/";
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div className="min-h-screen w-full text-[#2c2c2c] font-sans">
        <Header />
        <div className="bg-[#FDF5D8]">
          <div className="overflow-hidden bg-[#FDF5D8]">
            <section
              className=" gap-6 p-6 items-center w-full h-100 bg-cover bg-center bg-fixed bg-black/50 bg-blend-multiply" /*yuhh de background staat stil hehe */
              style={{ backgroundImage: `url(${camping8.src})` }}
            ></section>
          </div>
        </div>{" "}
        {/*banner met camping foto */}
        <div className="bg-[#FDF5D8]">
          <section className="bg-[#FDF5D8] text-black h-150 py-16">
            <div className="mx-auto w-full max-w-[1650px] px-6">
              <div className="gap-8 items-center justify-center flex flex-col lg:flex-row">
                <div className="-translate-y-1/2 z-40">
                  <div className=" bg-[#FFFFFF] rounded-xl shadow-xl overflow-hidden w-250 h-170">
                    <div
                      className="flex flex-col p-6 text-center text-justify text-lg font-medium my-auto mx-auto items-center"
                      style={{ fontFamily: "Roboto mono" }}
                    >

                      <div className="flex flex-row mb-7 justify-center text-justify gap-5 text-lg font-medium my-auto mx-auto items-center">
                      <div
                        className="text-xl"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Voornaam:
                        <div className="mt-3">
                          <input
                            list="Email klant"
                            onChange={(e) => setVoornaam(e.target.value)}
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#595959ff",
                              padding: "px",
                              borderRadius: "10px",
                              border: "2px solid #ccc",
                              fontSize: "22px",
                              width: "280px",
                              height: "50px",
                              boxSizing: "border-box",
                              fontFamily: "Roboto mono",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                            type="email"
                          ></input>
                          <datalist id="ligging-in-het-park">
                            <option value="in de zon" />
                            <option value="in de schaduw" />
                            <option value="bij het water" />
                            <option value="vlakbij de ingang" />
                            <option value="langs de hoodfweg" />
                          </datalist>
                        </div>
                      </div>{" "}
                      {/*Voornaam */}
                      <div
                        className="text-xl"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Achternaam:
                        <div className="mt-3">
                          <input
                            list="Postcode klant"
                            onChange={(e) => setAchternaam(e.target.value)}
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#595959ff",
                              padding: "px",
                              borderRadius: "10px",
                              border: "2px solid #ccc",
                              fontSize: "22px",
                              width: "280px",
                              height: "50px",
                              boxSizing: "border-box",
                              fontFamily: "Roboto mono",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                          ></input>
                          <datalist id="ligging-in-het-park">
                            <option value="in de zon" />
                            <option value="in de schaduw" />
                            <option value="bij het water" />
                            <option value="vlakbij de ingang" />
                            <option value="langs de hoodfweg" />
                          </datalist>
                        </div>
                      </div>{" "}
                      {/*achternaam */}
                    </div>
                    
                      <div
                        className="text-xl flex flex-col"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Email:
                        <div className="mt-3">
                          <input
                            list="Naam klant"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#595959ff",
                              padding: "px",
                              borderRadius: "10px",
                              border: "2px solid #ccc",
                              fontSize: "22px",
                              width: "580px",
                              height: "50px",
                              boxSizing: "border-box",
                              fontFamily: "Roboto mono",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                          ></input>
                          <datalist id="ligging-in-het-park">
                            <option value="in de zon" />
                            <option value="in de schaduw" />
                            <option value="bij het water" />
                            <option value="vlakbij de ingang" />
                            <option value="langs de hoodfweg" />
                          </datalist>
                        </div>
                      </div>{" "}
                      {/*naam */}
                      <div
                        className="text-xl mt-5"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Adres:
                        <div className="mt-3">
                          <input
                            list="achternaam klant"
                            onChange={(e) => setAdres(e.target.value)}
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#595959ff",
                              padding: "px",
                              borderRadius: "10px",
                              border: "2px solid #ccc",
                              fontSize: "22px",
                              width: "580px",
                              height: "50px",
                              boxSizing: "border-box",
                              fontFamily: "Roboto mono",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                          ></input>
                          <datalist id="ligging-in-het-park">
                            <option value="in de zon" />
                            <option value="in de schaduw" />
                            <option value="bij het water" />
                            <option value="vlakbij de ingang" />
                            <option value="langs de hoodfweg" />
                          </datalist>
                        </div>
                      </div>{" "}
                      {/*achternaam */}
                      <div
                        className="text-xl mt-5"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Plaats:
                        <div className="mt-3">
                          <input
                            list="Adres klant"
                            onChange={(e) => setPlaats(e.target.value)}
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#595959ff",
                              padding: "px",
                              borderRadius: "10px",
                              border: "2px solid #ccc",
                              fontSize: "22px",
                              width: "580px",
                              height: "50px",
                              boxSizing: "border-box",
                              fontFamily: "Roboto mono",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                          ></input>
                          <datalist id="ligging-in-het-park">
                            <option value="in de zon" />
                            <option value="in de schaduw" />
                            <option value="bij het water" />
                            <option value="vlakbij de ingang" />
                            <option value="langs de hoodfweg" />
                          </datalist>
                        </div>
                      </div>{" "}
                      {/*adres */}
                    </div>

                    <div className="flex flex-row justify-center text-justify gap-5 text-lg font-medium mb-5 my-auto mx-auto items-center">
                      <div
                        className="text-xl"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Postcode:
                        <div className="mt-3">
                          <input
                            list="Telefoon klant"
                            /*need postcode */
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#595959ff",
                              padding: "px",
                              borderRadius: "10px",
                              border: "2px solid #ccc",
                              fontSize: "22px",
                              width: "280px",
                              height: "50px",
                              boxSizing: "border-box",
                              fontFamily: "Roboto mono",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                          ></input>
                          <datalist id="ligging-in-het-park">
                            <option value="in de zon" />
                            <option value="in de schaduw" />
                            <option value="bij het water" />
                            <option value="vlakbij de ingang" />
                            <option value="langs de hoodfweg" />
                          </datalist>
                        </div>
                      </div>{" "}
                      {/*telefoon nummer */}
                      <div
                        className="text-xl mt-"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Telefoonnummer:
                        <div className="mt-3">
                          <input
                            list="Plaats klant"
                            onChange={(e) => setTelnr(e.target.value)}
                            style={{
                              backgroundColor: "#FFFFFF",
                              color: "#595959ff",
                              padding: "px",
                              borderRadius: "10px",
                              border: "2px solid #ccc",
                              fontSize: "22px",
                              width: "280px",
                              height: "50px",
                              boxSizing: "border-box",
                              fontFamily: "Roboto mono",
                              paddingLeft: "15px",
                              paddingRight: "15px",
                            }}
                          ></input>
                          <datalist id="ligging-in-het-park">
                            <option value="in de zon" />
                            <option value="in de schaduw" />
                            <option value="bij het water" />
                            <option value="vlakbij de ingang" />
                            <option value="langs de hoodfweg" />
                          </datalist>
                        </div>
                      </div>{" "}
                      {/*plaats */}
                    </div>

                    

                    <div className="flex mx-auto my-auto items-center">
                      <div className="my-auto mx-auto items-center text-center p-1 ">
                        <button
                          onClick={() => sendData()}
                          className="text-center px-20 py-3 bg-[#007248] hover:bg-[#008f58] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#FDF5D8] rounded-xl"
                          style={{ fontFamily: "Roboto mono" }}
                        >
                          Verder naar betalen
                        </button>
                      </div>{" "}
                      {/*knop om terug naar reservering annuleren te gaan*/}
                    </div>
                  </div>
                </div>{" "}
                {/*het witte vlak met alle info er in */}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>

      {/*idk wat hier gebeurd maar het is niet wat ik wil en ik weet niet waarom count: 9 */}
    </>
  );
}
