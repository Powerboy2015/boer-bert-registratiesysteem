"use client";
import Image from "next/image";
import logo from "@/app/Images/logo.jpg";
import de from "@/app/Images/de.jpg";
import eng from "@/app/Images/eng.jpg";
import nl from "@/app/Images/nl.jpg";
import w3c from "@/app/Images/w3c.jpg";
import campinggestolen from "@/app/Images/campinggestolen.jpg";
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
              DatumAankomst: localStorage.getItem("DatumAankomst"),
              DatumVertrek: localStorage.getItem("DatumVertrek"),
              AantalMensen: localStorage.getItem("Personen"),
              Prijs: localStorage.getItem("Prijs"),
            },
            Plek: {
              PlekNummer: localStorage.getItem("PlekNr"),
              Grootte: localStorage.getItem("Plaats")
            },
          }),
        });
        if (voornaam && achternaam && telNr && email && plaats) {
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
              style={{ backgroundImage: `url(${campinggestolen.src})` }}
            ></section>
          </div>
        </div>{" "}
        {/*banner met camping foto */}
        <div className="bg-[#FDF5D8]">
          <section className="bg-[#FDF5D8] text-black md:h-150 py-16">
            <div className="mx-auto w-full max-w-[1650px] px-6">
              <div className="gap-8 items-center justify-center flex flex-col lg:flex-row">
                <div className="-translate-y-1/2 z-40">
                  <div className=" bg-[#FFFFFF] rounded-xl shadow-xl md:overflow-hidden md:w-250 md:h-170 mt-20 md:mt-0">
                    <form action="https://ideal.com">
                      <div
                        className="flex flex-col p-6 text-center text-justify text-lg font-medium my-auto mx-auto items-center"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        <div
                          className="text-xl flex flex-col"
                          style={{ fontFamily: "Roboto mono" }}
                        >
                          Voornaam:
                          <div className="mt-3">
                            <input
                              list="Naam klant"
                              onChange={(e) => setVoornaam(e.target.value)}
                              className="bg-[#FFFFFF] text-[#595959ff]-2xl rounded-md border-2 border-[#ccc] md:w-[580px] h-[50px] px-[15px]"
                              pattern="[A-Za-zÀ-ÖØ-öø-ÿ]+"
                              required
                            ></input>
                          </div>
                        </div>{" "}
                        {/*naam */}
                        <div
                          className="text-xl mt-5"
                          style={{ fontFamily: "Roboto mono" }}
                        >
                          Achteraam:
                          <div className="mt-3">
                            <input
                              list="achternaam klant"
                              onChange={(e) => setAchternaam(e.target.value)}
                              className="bg-[#FFFFFF] text-[#595959ff]-2xl rounded-md border-2 border-[#ccc] md:w-[580px] h-[50px] px-[15px]"
                              pattern="[A-Za-zÀ-ÖØ-öø-ÿ]+"
                              required
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
                        <div className="flex md:flex-row flex-col mb-7 justify-center text-justify gap-5 text-lg font-medium my-auto mx-auto items-center">
                          <div
                            className="text-xl mt-5"
                            style={{ fontFamily: "Roboto mono" }}
                          >
                            Email:
                            <div className="mt-3">
                              <input
                                list="Email klant"
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#FFFFFF] text-[#595959ff]-2xl rounded-md border-2 border-[#ccc] md:w-[280px] h-[50px] px-[15px]"
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
                          {/*email */}
                          <div
                            className="text-xl mt-5"
                            style={{ fontFamily: "Roboto mono" }}
                          >
                            Telefoon nummer:
                            <div className="mt-3">
                              <input
                                list="Telefoon klant"
                                required
                                onChange={(e) => setTelnr(e.target.value)}
                                className="bg-[#FFFFFF] text-[#595959ff]-2xl rounded-md border-2 border-[#ccc] md:w-[280px] h-[50px] px-[15px]"
                                pattern="^06-\d{8}$"
                                title="Formaat: 06-12345678"
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
                        </div>
                        <div
                          className="text-xl mt-5"
                          style={{ fontFamily: "Roboto mono" }}
                        >
                          Adres:
                          <div className="mt-3">
                            <input
                              list="Adres klant"
                              onChange={(e) => setAdres(e.target.value)}
                              pattern="^[A-Za-zÀ-ÿ\s.'-]+ \d+[A-Za-z]?$"
                              required
                              className="bg-[#FFFFFF] text-[#595959ff]-2xl rounded-md border-2 border-[#ccc] md:w-[580px] h-[50px] px-[15px]"
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

                      <div className="flex flex-col md:flex-row justify-center text-justify gap-5 text-lg font-medium my-auto mx-auto items-center">
                        <div
                          className="text-xl"
                          style={{ fontFamily: "Roboto mono" }}
                        >
                          Postcode:
                          <div className="mt-3">
                            <input
                              list="Postcode klant"
                              className="bg-[#FFFFFF] text-[#595959ff]-2xl rounded-md border-2 border-[#ccc] w-[280] h-[50px] px-[15px]"
                              pattern="[0-9]{4}[A-Z]{2}"
                              required
                              onChange={(e) => setTelnr(e.target.value)}
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
                        {/*postcode */}
                        <div
                          className="text-xl mt-"
                          style={{ fontFamily: "Roboto mono" }}
                        >
                          plaats:
                          <div className="mt-3">
                            <input
                              list="Plaats klant"
                              required
                              pattern="[A-Za-z]+"
                              onChange={(e) => setPlaats(e.target.value)}
                              className="bg-[#FFFFFF] text-[#595959ff]-2xl rounded-md border-2 border-[#ccc] w-[280px] h-[50px] px-[15px]"
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
                    </form>
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
