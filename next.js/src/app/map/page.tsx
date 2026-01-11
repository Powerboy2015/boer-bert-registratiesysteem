"use client";
import map from "@/app/Images/image.png"
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/app/Images/logo.jpg"
import de from "@/app/Images/de.jpg"
import eng from "@/app/Images/eng.jpg"
import nl from "@/app/Images/nl.jpg"
import w3c from "@/app/Images/w3c.jpg"
import campinggestolen from "@/app/Images/campinggestolen.jpg"

export default function Reservering1() {
  const [shrink, setShrink] = useState(false);

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
                    <Image alt="boerbert logo met gare ovalen enzo" src={logo} width={230} height={230} className="rounded-full object-cover" />
                  </div>
                </div>
              </div>
            </a>
            {/*big ahhhhh logo met gare ovalen enzo waar je op kan klikken om naar main page te gaan*/}

          </div>
          <div className="flex items-center pr-8 gap-6">



            <button>
              <Image alt="Dutch language" src={nl} width={57} height={57}
                className="rounded-[10] px-auto opacity-100" />
            </button>
            {/*knop om taal te veranderen naar nederlands */}

            <button>
              <Image alt="German language" src={de} width={57} height={57}
                className="rounded-[10] px-auto opacity-100" />
            </button>
            {/*knop om taal te veranderen naar duits */}

            <button>
              <Image alt="English language" src={eng} width={57} height={57}
                className="rounded-[10] px-auto opacity-100" />
            </button>
            {/*knop om taal te veranderen naar engels */}

          </div>  {/*de knoppen zijn onzichtbaar omdat ze niet werken */}
        </header> {/*header met wat dingen er in */}




        <div className="w-full absolute">
          <div className="flex justify-center items-center pt-10">
            <a href="/klanten/2">            <button className="bg-[#007248] text-[#FDF5D8] px-20 py-5 text-2xl rounded-md self-end mb-30  mr-40">Terug</button>
            </a>

            <Image alt="map" src={map} className="rounded-2xl" />
          </div>
        </div>
        <div className="bg-[#FDF5D8]">
          <div className="rounded-bl-[125px] overflow-hidden bg-[#FDF5D8]">
            <section className=" gap-6 p-6 items-center w-full h-100 bg-fixed bg-black/50 bg-blend-multiply bg-cover bg-center   " /*yuhh de background staat stil hehe */
              style={{ backgroundImage: `url(${campinggestolen.src})` }}>

              <div>
                <div className="mt-50 flex flex-row justify-center">

                </div>
              </div>
            </section>
          </div>
        </div> {/*sectie met knopppen voor voorkeuren boekingen */}

        <div className="bg-[#FDF5D8]">

          <section className="gap-6 p-2 h-130 items-center bg-[#FDF5D8] text-[#007248]">

            <div className="justify-items-stretch gap-4 items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-1 mt-20">


              </div> {/*div voor random info */}
            </div> {/*geen idee meer waarvoor de div. heb een copypasta van de home pagina gebruikt :p */}

          </section>
        </div> {/*section met random info*/}

        <footer className="p-4 px-10 bg-[#93DAB8] font-bold text-[25px] justify-between flex flex-row items-center"
          style={{ fontFamily: 'Roboto mono' }}>

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

          <a title="link naar w3c website"
            className="hover:text-[#55876a]"
            href="https://www.w3.org/"
            target="_blank"
            rel="noopener noreferer"
          > <Image alt="wcec website link" src={w3c} width={180} height={160} className="rounded-[10] px-auto" /> </a>
          {/*foto waar je op kan klikken om naar w3c te gaan */}

        </footer> {/*dikke footer met links voor contact. zei iemand voeten??? :p */}
      </div >

    </>
  );
}


{/*The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.
The 20 meter pacer test will begin in 30 seconds. Line up at the start.
The running speed starts slowly but gets faster each minute after you hear this signal bodeboop.
A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible.
The second time you fail to complete a lap before the sound, your test is over.
The test will begin on the word start. On your mark. Get ready!… Start. ding﻿*/}

{/*aantal keren dat de code niet werkte: 26 */ }
{/*aantal keren gescholden naar de code: 25 */ }
{/*aantal keren opgegeven: 8 */ }
{/*aantal stenen geteld in de tuin: 50~ */ }

