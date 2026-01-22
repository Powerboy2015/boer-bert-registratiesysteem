"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import map from "@/app/Images/map.jpg";
import logo from "@/app/Images/logo.jpg";
import de from "@/app/Images/de.jpg";
import eng from "@/app/Images/eng.jpg";
import nl from "@/app/Images/nl.jpg";
import w3c from "@/app/Images/w3c.jpg";
import applepay from "@/app/Images/applepay.png";
import ideal from "@/app/Images/ideal.png";
import mastercard from "@/app/Images/mastercard.png";
import paypal from "@/app/Images/paypal.png";
import visa from "@/app/Images/visa.png";
import camping8 from "@/app/Images/camping8.jpg";
import Footer from "../../ui/Footer";
import Header from "../../ui/Header";
{
  /*niet op letten waarom er zo veel imports zijn die niet worden gebruikt dank u */
}
export default function Reservering2() {
  type Accomodatie = {
    ID: number;
    PlekNummer: number;
    Grootte: string;
  };

  const [shrink, setShrink] = useState(false);
  const router = useRouter();
  const [Text, setText] = useState<string>("");
  const [DatumAankomst, setDatumAankomst] = useState<string>("");
  const [DatumVertrek, setDatumVertrek] = useState<string>("");
  const [Plaats, setPlaats] = useState<string>("");
  const [Personen, setPersonen] = useState<string>("");
  const [ApiResult, setApiResult] = useState<Accomodatie[]>([]);
  const [PlekNr, setPlekNr] = useState<string>("");

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

  useEffect(() => {
    async function fetchAPI() {
      const url = `http://localhost:80/api/public/beschikbaarheid?DatumAankomst=${localStorage.getItem(
        "DatumAankomst"
      )}&DatumVertrek=${localStorage.getItem("DatumVertrek")}`;

      const response = await fetch(url);
      const result = await response.json();
      setApiResult(result["Beschikbare plekken"]);
    }
    setDatumAankomst(localStorage.getItem("DatumAankomst") ?? "");
    setDatumVertrek(localStorage.getItem("DatumVertrek") ?? "");
    setPersonen(localStorage.getItem("Personen") ?? "");
    setPlaats(localStorage.getItem("Plaats") ?? "");
    fetchAPI();
  }, []);

  let date1 = new Date(DatumAankomst);
  let date2 = new Date(DatumVertrek);

  // Convert dates to UTC timestamps
  let utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  let utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  // Calculate the time difference in milliseconds
  let timeDiff = Math.abs(utc2 - utc1);

  // Convert milliseconds to days
  let daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

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
        {/*sectie met knopppen voor voorkeuren boekingen */}
        <div className="bg-[#FDF5D8]">
          <section className="bg-[#FDF5D8] text-black h-150 py-16">
            <div className="mx-auto w-full max-w-[1650px] px-6">
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start ">
                <div className="justify-self-start w-full -translate-y-2/5 z-40">
                  <div className="relative bg-[#FFFFFF] rounded-xl shadow-xl overflow-hidden w-250 min-h-[240px]">
                    <div className="bg-[#FFFFFF] text-[#007248] flex text-center p-4 mt-5 text-xl font-bold">
                      <a
                        title="link naar plattegrond camping boer bert"
                        rel="noopener noreferer"
                        href="/map"
                      >
                        <Image
                          alt="Link naar map"
                          src={map}
                          width={300}
                          height={70}
                          className="rounded-[1] px-auto opacity-100 object-contain mt-5 ml-10"
                        />
                      </a>
                      <p
                        className="text-lg p-8 mt-5 place-content-center"
                        style={{ fontFamily: "Roboto mono" }}>
                        Je kunt je gewenste ligging in het park selecteren.
                      </p>
                    </div>

                    <div className="flex flex-row mx-auto my-auto items-center justify-center">
                      <div className="p-3 mx-auto my-auto">

                        <div
                          className="text-xl text-justify m-10 mt-3"
                          style={{ fontFamily: "Roboto mono" }}
                        >
                          Accomodatienummer:
                          <div className="mt-3 h-auto">
                            <select
                              style={{
                                backgroundColor: "#FFFFFF",
                                color: "#595959ff",
                                borderRadius: "10px",
                                border: "2px solid #ccc",
                                fontSize: "22px",
                                width: "600px",
                                height: "50px",
                                boxSizing: "border-box",
                                fontFamily: "Roboto mono",
                                paddingLeft: "15px",
                                paddingRight: "15px",
                              }}
                              size={6}
                              id="accomodatie-nummers"
                              onChange={(e) => {
                                localStorage.setItem("PlekNr", e.target.value);
                              }}
                            >
                              {ApiResult.filter((item) => {
                                if (Plaats === "Groot")
                                  return item.Grootte === "G";
                                if (Plaats === "Klein")
                                  return item.Grootte === "N";
                                return false; // niks tonen als Plaats leeg of onbekend
                              }).map((item) => (
                                <option key={item.ID} value={item.ID}>
                                  {item.PlekNummer}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>{" "}
                      {/*input velden voor ligging en accomodatie nummer*/}
            
                    </div>
                  </div>
                </div>{" "}
                {/*linker box */}
                <div className="justify-self-end w-full -translate-y-3/7 z-40">
                  <div className="relative bg-[#FFFFFF] rounded-xl shadow-xl overflow-hidden w-full md:w-[460px] min-h-[680px]">
                    <div className="bg-[#FFFFFF] text-[#007248] text-center p-1 mt-2 text-xl font-bold">
                      <p
                        className="text-3xl mt-5"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Jouw boeking
                      </p>
                    </div>
                    <div className="p-1">
                      <div
                        className="text-xl text-justify my-1 mx-12 mt-6"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        <div
                          title="box met plaats en aantal personen"
                          className="grid grid-cols-3 gap-1 border-2 p-5 rounded-[15] w-full"
                        >
                          <div className="text-[18px] col-span-2 flex flex-col gap-3">
                            <div></div>
                            <div>{Personen} personen</div>
                          </div>
                        </div>

                        <div title="box met info aantal dagen en datum">
                          <p
                            className="text-[18px] text-[#909090ff] text-justify mt-3 border-l-3 border-[#ccc] p-2"
                            style={{ fontFamily: "Roboto mono" }}
                          >
                            Aankomstdatum: {DatumAankomst}
                            <br />
                            Vertrekdatum: {DatumVertrek}
                          </p>
                          <a
                            title="klik her om datum en dagen te wijzigen"
                            rel="noopener noreferer"
                            href="/klanten/1"
                          >
                            <p className="text-[18px] text-[#007248] text-right mr-3">
                              Wijzig
                            </p>
                          </a>
                        </div>

                        <div title="box met soort plaats en prijs">
                          <div title="soort plaats">
                            <p className="text-[18px] font-bold mt-5">
                              Selecteer plek nummer
                            </p>
                            <div className="flex">
                              <div className="text-[18px] text-left ml auto">
                                <p>{Plaats || "Plek nummer :"}</p>
                              </div>
                              <p className="text-[18px] text-right ml-auto font-bold">
                                <strong>{PlekNr || "—"}</strong>
                              </p>
                            </div>
                          </div>
                        </div> {/*box met soort plaats en prijs */}

                        <div title="box met soort plaats en prijs">
                          <div title="soort plaats">
                            <p className="text-[18px] font-bold mt-5">
                              {Plaats}
                            </p>
                            <div className="flex">
                              <p className="text-[18px] font-bold text-left ml auto">
                                Accomodatie
                              </p>
                              <p className="text-[18px] text-right ml-auto font-bold">
                                {Plaats === "Groot"
                                  ? "€30 per dag"
                                  : "€20 per dag"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div title="box met totaal prijs" className="flex">
                          <p className="text-[20px] text-left font-bold mt-5">
                            Totaal
                          </p>
                          <p className="text-[18px] text-right font-bold mt-5 ml-auto">
                            €
                            {Plaats === "Groot" ? 30 * daysDiff : 20 * daysDiff}
                          </p>
                        </div>

                        <div
                          title="knop om boeking te bevestigen"
                          className="mt-8 text-center"
                        >
                          <button>
                            <a
                              className="shadow-xl px-10 py-3 bg-[#007248] hover:bg-[#008f58] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-[18px] font-bold text-[#FDF5D8] rounded-md"
                              href="/klanten/afrekenen"
                              rel="noopener noreferer"
                            >
                              Boeken
                            </a>
                          </button>
                        </div>

                        <div title="box met info metaalmethodes">
                          <div className="mt-10 flex flex-row gap-3 items-center justify-between">
                            <p className="text-[18px] text-left">betaal met:</p>
                            <div
                              title="images"
                              className="right-0 flex flex-row gap-3"
                            >
                              <Image
                                alt="English language"
                                src={ideal}
                                width={30}
                                height={30}
                                className="rounded-[1] px-auto opacity-100 object-contain"
                              />
                              <Image
                                alt="English language"
                                src={paypal}
                                width={30}
                                height={30}
                                className="rounded-[1] px-auto opacity-100 object-contain"
                              />
                              <Image
                                alt="English language"
                                src={applepay}
                                width={30}
                                height={30}
                                className="rounded-[1] px-auto opacity-100 object-contain"
                              />
                              <Image
                                alt="English language"
                                src={mastercard}
                                width={30}
                                height={30}
                                className="rounded-[1] px-auto opacity-100 object-contain"
                              />
                              <Image
                                alt="English language"
                                src={visa}
                                width={30}
                                height={30}
                                className="rounded-[1] px-auto opacity-100 object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* rechter box */}
              </div>
            </div>
          </section>
        </div>{" "}
        {/*section met random info*/}
        <Footer/>
        {/*zei iemand voeten??? :p */}
      </div>

      {/*idk wat hier gebeurd maar het is niet wat ik wil en ik weet niet waarom count: 9 */}
    </>
  );
}

{
  /*The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.
The 20 meter pacer test will begin in 30 seconds. Line up at the start.
The running speed starts slowly but gets faster each minute after you hear this signal bodeboop.
A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible.
The second time you fail to complete a lap before the sound, your test is over.
The test will begin on the word start. On your mark. Get ready!… Start. ding﻿*/
}

{
  /*aantal keren dat de code niet werkte: 33 */
}
{
  /*aantal keren gescholden naar de code: 27 */
}
{
  /*aantal keren opgegeven: 9 */
}
{
  /*aantal stenen geteld in de tuin: 50~ */
}
