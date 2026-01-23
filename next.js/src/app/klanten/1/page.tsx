"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/app/Images/logo.jpg";
import de from "@/app/Images/de.jpg";
import eng from "@/app/Images/eng.jpg";
import nl from "@/app/Images/nl.jpg";
import w3c from "@/app/Images/w3c.jpg";
import home from "@/app/Images/house-door-fill.svg";
import campinggestolen from "@/app/Images/campinggestolen.jpg";
import toast from "react-hot-toast";

{
  /*niet op letten waarom er zo veel imports zijn die niet worden gebruikt dank u */
}
export default function Reservering1() {
  const [shrink, setShrink] = useState(false);
  const [DatumAankomst, setDatumAankomst] = useState<string>("");
  const [DatumVertrek, setDatumVertrek] = useState<string>("");
  const [Plaats, setPlaats] = useState<string>("");
  const [Personen, setPersonen] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string>("");

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
    setPlaats(localStorage.getItem("Plaats") ?? "");
    setPersonen(localStorage.getItem("Personen") ?? "");
    setDatumAankomst(localStorage.getItem("DatumAankomst") ?? "");
    setDatumVertrek(localStorage.getItem("DatumVertrek") ?? "");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const alleVelden = Boolean(Plaats && Personen && DatumAankomst && DatumVertrek);

  const vertrekNaAankomst = DatumAankomst && DatumVertrek && new Date(DatumVertrek) > new Date(DatumAankomst);
  const aankomstNaNu = DatumAankomst && new Date(DatumAankomst) > new Date();



  return (
    <>
      <div className="min-h-screen w-full text-[#2c2c2c] font-sans bg-[#FDF5D8]">
        <header className="shadow-xl w-full flex items-center h-auto justify-between p-4 bg-[#93DAB8] relative sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <a href="http://localhost:3000/" title="knop naar home page">
              <div
                className={`absolute top-full -translate-x-1/4 -translate-y-2/5 z-50 md:block hidden
               transition-transform transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${shrink ? "-translate-y-[60%]" : "-translate-y-1/4"} ${shrink ? "scale-60" : "scale-100"
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
            <a className="md:hidden" href="/">
              <button>
                <Image width={65} height={65} src={home} alt="home" />
              </button>
            </a>
            <button>
              <Image
                alt="Nederlandse taal"
                src={nl}
                width={57}
                height={57}
                className="rounded-[10] px-auto opacity-100"
              />
            </button>
            {/*knop om taal te veranderen naar nederlands */}

            <button>
              <Image
                alt="deutsche sprache"
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
              className=" gap-6 p-6 items-center w-full h-full bg-cover bg-center bg-fixed bg-black/50 bg-blend-multiply " /*yuhh de background staat stil hehe */
              style={{ backgroundImage: `url(${campinggestolen.src})` }}
            >
              <div>
                <div className="md:mt-50 flex md:flex-row flex-col justify-center ">
                  <select
                    value={Plaats}
                    onChange={(e) => {
                      localStorage.setItem("Plaats", e.target.value),
                        setPlaats(e.currentTarget.value);
                    }}
                    className="text-center px-10 py-7 my-auto  bg-[#FFFFFF] hover:bg-[#a4debc] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#007248] border md:rounded-l-[50] block md:inline-block"
                  >
                    <option value="">Kies een plek</option>
                    <option value="Groot">Groot</option>
                    <option value="Klein">Klein</option>
                  </select>

                  <select
                    value={Personen}
                    onChange={(e) => {
                      localStorage.setItem("Personen", e.target.value),
                        setPersonen(e.currentTarget.value);
                    }}
                    className="text-center px-10 py-7 md:my-auto my-5 bg-[#FFFFFF] hover:bg-[#a4debc] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#007248] border"
                  >
                    <option value="">Aantal personen</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>

                  <div className="md:flex md:flex-row text-center px-10 py-7 bg-[#FFFFFF] hover:bg-[#a4debc] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#007248] border my-auto">
                    <input
                      value={DatumAankomst}
                      onChange={(e) => {
                        localStorage.setItem(
                          "DatumAankomst",
                          e.currentTarget.value
                        ),
                          setDatumAankomst(e.currentTarget.value);
                      }}
                      type="date"
                    ></input>
                    <p className="mx-7 font-bold">tot</p>
                    <input
                      value={DatumVertrek}
                      onChange={(e) => {
                        localStorage.setItem(
                          "DatumVertrek",
                          e.currentTarget.value
                        ),
                          setDatumVertrek(e.currentTarget.value);
                      }}
                      type="date"
                    ></input>
                  </div>


                  {alleVelden && vertrekNaAankomst && aankomstNaNu ?
                    (
                      <a
                        title="klik her om datum en dagen te wijzigen"
                        rel="noopener noreferer"
                        href="/klanten/2"
                      >
                        <button className="text-center px-15 mt-5 md:mt-auto py-[30px] my-auto bg-[#007248] hover:bg-[#a4debc] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#FFFFFF] md:rounded-r-[50]">
                          Boeken
                        </button>
                      </a>
                    ) : (
                      <button onClick={() => toast.error(!alleVelden ? "Vul alle velden in!" : !vertrekNaAankomst ? "De vertrekdatum moet na de aankomstdatum liggen!" : !aankomstNaNu ? "De aankomstdatum moet in de toekomst liggen!" : "")} className="text-center px-15 mt-5 md:mt-auto py-[30px] my-auto bg-[#007248] hover:bg-[#a4debc] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#FFFFFF] md:rounded-r-[50]">
                        Boeken
                      </button>

                    )}


                  {/*knoppen om je voorkeuren te aan te passen. ze doen nog niks. moet nog zorgen dat je een list krijgt waar je uit kunt kiezen van aantal personen en plekken. ook een kalender die je kan kiezen voor aankomst en vertrek*/}
                </div>

                <div className="text-red-600 text-2xl w-full flex justify-center">
                  {ErrorMessage}
                </div>
              </div>
            </section>
          </div>
        </div>{" "}
        {/*sectie met knopppen voor voorkeuren boekingen */}
        <div className="bg-[#FDF5D8] md:block hidden">
          <section className="gap-6 p-2 h-130 items-center bg-[#FDF5D8] text-[#007248]">
            <div className="justify-items-stretch gap-4 items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-1 mt-20">
                <div className="">
                  <div className="relative bg-[#FFFFFF] h-90 w-120 rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-[#FFFFFF] h-10 text-[#007248] text-center p-4 mt-5 text-xl font-bold">
                      <p className="text-3xl mt-5">Accomodaties</p>
                    </div>
                    <div className="p-6">
                      <div className="p-1">
                        <p className="text-2xl m-12 mt-" style={{ fontFamily: 'Roboto mono' }}>Op de camping boer Bert zijn alleen tent plekken te boeken.</p>
                        <p className="text-2xl mx-12 mt-" style={{ fontFamily: 'Roboto mono' }}>Grote plek: <b>125m2</b></p>
                        <p className="text-2xl mx-12 mt-" style={{ fontFamily: 'Roboto mono' }}>Kleine plek: <b>60m2</b></p>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/*box accomodaties */}
                <div className="">
                  <div className="relative bg-[#FFFFFF] h-90 w-120 rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-[#FFFFFF] h-10 text-[#007248] text-center p-4 mt-5 text-xl font-bold">
                      <p className="text-3xl mt-5">Evenementen</p>
                    </div>
                    <div className="p-6">
                      <p
                        className="text-2xl m-12 mt-6"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Er worden verschillende evenementen zoals boogschieten
                        georganiseerd op de camping.
                      </p>
                    </div>
                  </div>
                </div>{" "}
                {/*box evenementen */}
                <div className="">
                  <div className="relative bg-[#FFFFFF] h-90 w-120 rounded-xl shadow-xl overflow-hidden">
                    <div className="bg-[#FFFFFF] h-10 text-[#007248] text-center p-4 mt-5 text-xl font-bold">
                      <p className="text-3xl mt-5">Voorzieningen</p>
                    </div>
                    <div className="p-6">
                      <p
                        className="text-2xl m-12 mt-6"
                        style={{ fontFamily: "Roboto mono" }}
                      >
                        Op de camping zijn er toiletten en douches. Daarnaast is
                        er bij de ingang een parkeerplaats.
                      </p>
                    </div>
                  </div>
                </div>{" "}
                {/*box voorzieningen */}
              </div>{" "}
              {/*div voor random info */}
            </div>{" "}
            {/*geen idee meer waarvoor de div. heb een copypasta van de home pagina gebruikt :p */}
          </section>
        </div>{" "}

        {/*section met random info*/}
        <footer
          className="p-4 px-10 bg-[#93DAB8] font-bold text-[25px] justify-between flex-row items-center md:flex hidden"
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
    </>
  );
}

{
  /*The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.
The 20 meter pacer test will begin in 30 seconds. Line up at the start.
The running speed starts slowly but gets faster each minute after you hear this signal bodeboop.
A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible.
The second time you fail to complete a lap before the sound, your test is over.
The test will begin on the word start. On your mark. Get ready!… Start. ding�*/
}

{
  /*aantal keren dat de code niet werkte: 26 */
}
{
  /*aantal keren gescholden naar de code: 25 */
}
{
  /*aantal keren opgegeven: 8 */
}
{
  /*aantal stenen geteld in de tuin: 50~ */
}
