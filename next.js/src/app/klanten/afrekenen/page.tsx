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
        <header className="shadow-xl w-full flex items-center h-auto justify-between p-4 bg-[#93DAB8] relative sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <a href="http://localhost:3000/" title="knop naar home page">
              <div
                className={`absolute top-full -translate-x-1/4 -translate-y-2/5 z-50
               transition-transform transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${shrink ? "-translate-y-[60%]" : "-translate-y-1/4"} ${
                  shrink ? "scale-60" : "scale-100"
                }`}
              >
                <div className="hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] shadow-xl/20 bg-[#007248] max-width-[300px] rounded-[50%] h-75 w-130">
                  <div className="hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] pl-40 pt-10 bg-[#FDF5D8] max-width-[200px] rounded-[50%] h-67 w-125">
                    <Image
                      alt="boerbert logo met gare ovalen enzo"
                      src={logo}
                      width={230}
                      height={230}
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </a>
            {/*big ahhhhh logo met gare ovalen enzo waar je op kan klikken om naar main page te gaan*/}
          </div>
          <div className="flex items-center pr-8 gap-6">
            <button>
              <Image
                alt="Dutch language"
                src={nl}
                width={57}
                height={57}
                className="rounded-[10] px-auto opacity-100"
              />
            </button>
            {/*knop om taal te veranderen naar nederlands */}

            <button>
              <Image
                alt="German language"
                src={de}
                width={57}
                height={57}
                className="rounded-[10] px-auto opacity-100"
              />
            </button>
            {/*knop om taal te veranderen naar duits */}

            <button>
              <Image
                alt="English language"
                src={eng}
                width={57}
                height={57}
                className="rounded-[10] px-auto opacity-100"
              />
            </button>
            {/*knop om taal te veranderen naar engels */}
          </div>{" "}
          {/*de knoppen zijn onzichtbaar omdat ze niet werken */}
        </header>{" "}
        {/*header met wat dingen er in */}
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
          <section className="bg-[#FDF5D8] text-black h-150 py-16">
            <div className="mx-auto w-full max-w-[1650px] px-6">
              <div className="gap-8 items-center justify-center flex flex-col lg:flex-row">
                <div className="-translate-y-1/2 z-40">
                  <div className=" bg-[#FFFFFF] rounded-xl shadow-xl overflow-hidden w-250 h-170">
                    <div
                      className="flex flex-col p-6 text-center text-justify text-lg font-medium my-auto mx-auto items-center"
                      style={{ fontFamily: "Roboto mono" }}
                    >
                      <div
                        className="text-xl flex flex-col"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Naam:
                        <div className="mt-3">
                          <input
                            list="Naam klant"
                            onChange={(e) => setVoornaam(e.target.value)}
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
                        Achteraam:
                        <div className="mt-3">
                          <input
                            list="achternaam klant"
                            onChange={(e) => setAchternaam(e.target.value)}
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
                        Adres:
                        <div className="mt-3">
                          <input
                            list="Adres klant"
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
                      {/*adres */}
                    </div>

                    <div className="flex flex-row justify-center text-justify gap-5 text-lg font-medium my-auto mx-auto items-center">
                      <div
                        className="text-xl"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Telefoon nummer:
                        <div className="mt-3">
                          <input
                            list="Telefoon klant"
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
                      {/*telefoon nummer */}
                      <div
                        className="text-xl mt-"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        plaats:
                        <div className="mt-3">
                          <input
                            list="Plaats klant"
                            onChange={(e) => setPlaats(e.target.value)}
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

                    <div className="flex flex-row mb-7 justify-center text-justify gap-5 text-lg font-medium my-auto mx-auto items-center">
                      <div
                        className="text-xl mt-5"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Email:
                        <div className="mt-3">
                          <input
                            list="Email klant"
                            onChange={(e) => setEmail(e.target.value)}
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
                      {/*email */}
                      <div
                        className="text-xl mt-5"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Postcode:
                        <div className="mt-3">
                          <input
                            list="Postcode klant"
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
                      {/*postcode */}
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
        <footer
          className="p-4 px-10 bg-[#93DAB8] font-bold text-[25px] justify-between flex flex-row items-center"
          style={{ fontFamily: "Roboto mono" }}
        >
          <a
            title="link naar telefoon nummer camping boer bert"
            className="hover:text-[#55876a]"
            href="tel:+31642741016"
          >
            📞 +31 123456789
          </a>
          {/*knop voor telefoon nmmer */}

          <a
            title="link naar email info@campingboerbert.nl"
            className="hover:text-[#55876a]"
            href="mailto:info@campingboerbert.nl"
          >
            📧 info@campingboerbert.nl
          </a>
          {/*knop voor email */}

          <a
            title="link naar google maps locatie camping boer bert"
            className="hover:text-[#55876a]"
            href="https://www.google.com/maps/place/UMC+Utrecht/@52.0858554,5.1795793,17z/data=!3m1!4b1!4m6!3m5!1s0x47c66885c1ad3c53:0x5778bacf22762084!8m2!3d52.0858554!4d5.1795793!16s%2Fm%2F02qkwv4?entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
            target="_blank"
            rel="noopener noreferer"
          >
            📍 Heidelberglaan 15, 3584 CS
          </a>
          {/*knop voor google maps locatie */}

          <p
            title="fax nummer camping boer bert"
            className="px-auto hover:text-[#55876a]"
          >
            Fax: 214-785-2447
          </p>
          {/*hoe de fuck ga ik een knop voor fax maken?? */}

          <a
            title="link naar w3c website"
            className="hover:text-[#55876a]"
            href="https://www.w3.org/"
            target="_blank"
            rel="noopener noreferer"
          >
            {" "}
            <Image
              alt="wcec website link"
              src={w3c}
              width={180}
              height={160}
              className="rounded-[10] px-auto"
            />{" "}
          </a>
          {/*foto waar je op kan klikken om naar w3c te gaan */}
        </footer>{" "}
        {/*dikke footer met links voor contact. zei iemand voeten??? :p */}
      </div>

      {/*idk wat hier gebeurd maar het is niet wat ik wil en ik weet niet waarom count: 9 */}
    </>
  );
}
