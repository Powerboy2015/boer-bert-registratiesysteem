"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
{/*niet op letten waarom er zo veel imports zijn die niet worden gebruikt dank u */}
export default function Reservering2() {
  const [shrink, setShrink] = useState(false);
  const router = useRouter();
  const [text, setText] = useState("");

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


  return (
    <>
    <div className="min-h-screen w-full text-[#2c2c2c] font-sans">
      <header className="shadow-xl w-full flex items-center h-auto justify-between p-4 bg-[#93DAB8] relative sticky top-0 z-50">
        <div className="flex items-center gap-3">
          
          <a href="http://localhost:3000/" title="knop naar home page">
            <div className={`absolute top-full -translate-x-1/4 -translate-y-2/5 z-50
               transition-transform transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${shrink ? "-translate-y-[60%]" : "-translate-y-1/4"} ${shrink ? "scale-60" : "scale-100"}`}>
              <div className="hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] shadow-xl/20 bg-[#007248] max-width-[300px] rounded-[50%] h-75 w-130">
                <div className="hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] pl-40 pt-10 bg-[#FDF5D8] max-width-[200px] rounded-[50%] h-67 w-125">
                  <Image alt="boerbert logo met gare ovalen enzo" src="/logo.jpg" width={230} height={230} className="rounded-full object-cover"/>
                </div>
              </div>
            </div>
          </a>
          {/*big ahhhhh logo met gare ovalen enzo waar je op kan klikken om naar main page te gaan*/}

        </div>
        <div className="flex items-center pr-8 gap-6">

          <div className="pr-8">
            <div title="scroll naar beneden voor contact gegevens">
            {/*<Scrollcontact/>*/} 
            </div>
          </div>
          {/*fkn coole knop, je gaat naar beneden O.O T_T */}

          <button>
            <Image alt="Dutch language" src="/nl.jpg" width={57} height={57} 
            className="rounded-[10] px-auto opacity-100"/>
          </button>
          {/*knop om taal te veranderen naar nederlands */}

          <button>
          <Image alt="German language" src="/de.jpg" width={57} height={57} 
          className="rounded-[10] px-auto opacity-100"/>
          </button>
          {/*knop om taal te veranderen naar duits */}

          <button>
          <Image alt="English language" src="/eng.jpg" width={57} height={57} 
          className="rounded-[10] px-auto opacity-100"/>
          </button>
          {/*knop om taal te veranderen naar engels */}

        </div>  {/*de knoppen zijn onzichtbaar omdat ze niet werken */}
      </header> {/*header met wat dingen er in */}

      
      <div className="bg-[#FDF5D8]">
        <div className="overflow-hidden bg-[#FDF5D8]">
          <section className=" gap-6 p-6 items-center w-full h-100 bg-cover bg-center bg-fixed bg-black/50 bg-blend-multiply" /*yuhh de background staat stil hehe */
              style={{ backgroundImage: "url('/camping8.jpg')" }}>
          </section>
        </div>
      </div> {/*banner met camping foto */}

      <div className="bg-[#FDF5D8]">
        
          <section className="bg-[#FDF5D8] text-black h-150 py-16">
            <div className="mx-auto w-full max-w-[1650px] px-6">
              <div className="gap-8 items-center justify-center flex flex-col lg:flex-row">

                <div className="-translate-y-1/2 z-40">
                  <div className=" bg-[#FFFFFF] rounded-xl shadow-xl overflow-hidden w-250 h-170">

                    <div className="bg-[#FFFFFF] text-[#007248] p-4 mt-5 text-xl font-bold">
                      <p className="text-5xl mt-5 text-center place-content-center" style={{ fontFamily: "Roboto mono" }}>Boeking annuleren</p>
                    </div> {/*titel van de pagina */}

                    <div className="p-6 text-center text-justify text-lg font-medium mt-5 mx-50" style={{ fontFamily: "Roboto mono" }}>
                      <p className="text-[24px] mt-5 text-center place-content-center">Er kunnen eventuele kosten worden verrekend als u korter dan 24 uur op uw boeking annuleert.</p>
                    </div> {/*uitleg over annuleren */}

                    <div className="text-center mt-30 mb-20">
                        <input type="checkbox" id="voorwaarden" name="voorwaarden" value="voorwaarden" className="mx-6 w-6 h-6 border-2 border-[#007248]"
                          />
                        <label htmlFor="voorwaarden" className="text-lg font-medium" style={{ fontFamily: "Roboto mono" }}>
                           Ik ga akkoord met de{" "}
                            <a href="/voorwaarden"
                                className="underline text-[#007248] hover:opacity-80"
                                rel="noopener noreferrer">
                                voorwaarden
                            </a>
                            .
                        </label>
                    </div>  {/*checkbox voor voorwaarden */}

                    <div className="flex mx-auto my-auto items-center mb">

                      <div className="my-auto mx-auto items-center text-center p-3 ">
                        <a href="/reservering1"
                          title="knop naar reserverings pagina">
                          <button className="text-center px-20 py-4 bg-[#007248] hover:bg-[#008f58] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-2xl font-semibold text-[#FDF5D8] rounded-xl"
                            style={{ fontFamily: "Roboto mono" }}>
                            Ik wil annuleren
                          </button>
                        </a>
                      </div> {/*knop om terug naar reservering bewerken te gaan*/}

                    </div>
                  </div>
                </div> {/*het witte vlak met alle info er in */}

              </div>
            </div>
          </section>
      </div>

      <footer className="p-4 px-10 bg-[#93DAB8] font-bold text-[25px] justify-between flex flex-row items-center"
        style={{fontFamily:'Roboto mono'}}>

        <div className="p-4 px-10 my-4 gap-40 bg-[#93DAB8] font-bold text-[25px] justify-between flex flex-row items-center">
          <a title="link naar telefoon nummer camping boer bert"
            className="hover:text-[#55876a]"
            href="tel:+31642741016" 
            >📞 +31 123456789</a>
            {/*knop voor telefoon nmmer */}

          <a title="link naar email info@campingboerbert.nl"
            className="hover:text-[#55876a]"
            href="mailto:info@campingboerbert.nl"
            >📧 info@campingboerbert.nl</a>
            {/*knop voor email */}

          <a title="link naar google maps locatie camping boer bert"
            className="hover:text-[#55876a]"
            href="https://www.google.com/maps/place/UMC+Utrecht/@52.0858554,5.1795793,17z/data=!3m1!4b1!4m6!3m5!1s0x47c66885c1ad3c53:0x5778bacf22762084!8m2!3d52.0858554!4d5.1795793!16s%2Fm%2F02qkwv4?entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
            target="_blank"
            rel="noopener noreferer"
            >📍 Heidelberglaan 15, 3584 CS</a>
            {/*knop voor google maps locatie */}

          <p title="fax nummer camping boer bert"
            className="px-auto hover:text-[#55876a]">Fax: 214-785-2447</p>
            {/*hoe de fuck ga ik een knop voor fax maken?? */}
        </div>

      </footer> {/*dikke footer met links voor contact. zei iemand voeten??? :p */}
    </div>

            {/*idk wat hier gebeurd maar het is niet wat ik wil en ik weet niet waarom count: 9 */}

    </>
  );
}
