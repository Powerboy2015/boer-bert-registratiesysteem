"use client";
import map from "@/app/Images/image.png"
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/app/Images/logo.jpg"
import de from "@/app/Images/de.jpg"
import eng from "@/app/Images/eng.jpg"
import nl from "@/app/Images/nl.jpg"
import w3c from "@/app/Images/w3c.jpg"
import home from "@/app/Images/house-door-fill.svg"
import { useRouter } from "next/navigation";
import camping8 from "@/app/Images/camping8.jpg"
import Footer from "../ui/Footer";
import Header from "../ui/Header";

export default function Reservering1() {
  const [shrink, setShrink] = useState(false);
  const router = useRouter();

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
        <Header />

        <div className="bg-[#FDF5D8]">
          <div className="overflow-hidden bg-[#FDF5D8]">
            <section
              className="h-[320px] md:h-[420px] bg-fixed bg-cover bg-center relative"
              style={{ backgroundImage: `url(${camping8.src})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </section>
          </div>
        </div> {/*sectie met knopppen voor voorkeuren boekingen */}

        <div className="bg-[#FDF5D8]">

          <section className="bg-[#FDF5D8] text-[#007248]">
            <div className="max-w-6xl mx-auto px-4">
              <div className="-mt-50 md:-mt-70 relative z-40">
                <div className="flex flex-col md:flex-row justify-center items-center gap-10">

                  <Image
                    alt="map"
                    src={map}
                    className="
                      rounded-2xl
                      w-full
                      max-w-[420px] md:max-w-[520px]

                      h-auto
                      mx-auto
                      block
                      shadow-xl
                    "
                  />

                  <div className="w-full md:w-auto">

                    <div className="flex flex-row gap-6 justify-center items-center w-full mt-10">
                      <div className="bg-[#f7f0cf] w-[320px] rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-[#007248] text-[#FDF5D8] p-6 font-bold">
                          <p className="text-2xl">Kleine plaats</p>
                          <div className="flex items-end gap-2 whitespace-nowrap">
                            <p className="text-4xl font-bold">€20</p>
                            <p className="text-lg">per nacht</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#f7f0cf] w-[320px] rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-[#007248] text-[#FDF5D8] p-6 font-bold">
                          <p className="text-2xl">Grote plaats</p>
                          <div className="flex items-end gap-2 whitespace-nowrap">
                            <p className="text-4xl font-bold">€30</p>
                            <p className="text-lg">per nacht</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="justify-center flex">
                      <button
                        type="button"
                        onClick={() => router.push("/klanten/2")}
                        className="bg-[#007248] text-[#FDF5D8] px-15 py-5 mt-10 text-3xl font-bold rounded-md w-full md:w-auto"
                      >
                        Terug
                      </button>
                    </div>

                    

                  </div>
                </div>
              </div>
            </div>

            <div className="h-16 md:h-24" />
          </section>
        </div> {/*section met random info*/}

        <Footer /> {/*dikke footer met links voor contact. zei iemand voeten??? :p */}
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

