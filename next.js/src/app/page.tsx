"use client";
import Image from "next/image";
import campinggestolen from "@/app/Images/campinggestolen.jpg";
import boerbert2 from "@/app/Images/boerbert2.jpg";
import camping6 from "@/app/Images/camping6.jpg";
import camping5 from "@/app/Images/camping5.jpg";
import boerderij from "@/app/Images/boerderij.jpeg";
import React from 'react';
import Header from "@/app/ui/Header"
import Footer from "@/app/ui/Footer"
{/*niet op letten waarom er zo veel imports zijn die niet worden gebruikt dank u */}
export default function Home() {
  return (
    <>
    <div className="font-sans text-[#2c2c2c]">
        <Header/>
    <section className="bg-[#007248]">
        <div
            className="min-h-screen flex flex-col justify-center items-center text-center
             bg-black/60 bg-blend-multiply bg-cover bg-center
             rounded-bl-[180px] xl:rounded-bl-[240px] 2xl:rounded-bl-[500px] overflow-hidden max-w-full"
            style={{ backgroundImage: `url(${campinggestolen.src})` }}
        >
                <h1 className="text-4xl lg:text-6xl font-bold text-[#FDF5D8] mb-6">
                    Boerencamping Boer Bert
                </h1>
                <a href="/reservering1">
                    <button className="px-8 py-4 text-xl bg-[#FDF5D8] text-[#007248] font-bold rounded-xl hover:bg-[#a4debc] transition">
                        Reserveer nu
                    </button>
                </a>
                {/*button om naar de pagina reserveringen te gaan */}
          </div>
    </section>

    <section className="bg-[#FDF5D8]">
            <div className="bg-[#007248] text-[#FDF5D8] py-20 px-6 rounded-bl-[180px] xl:rounded-bl-[240px] 2xl:rounded-bl-[500px] overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
                    <div className="hidden lg:flex justify-center shrink-0">
                        <div className="bg-[#FDF5D8] rounded-[50%] w-[420px] h-[260px] flex items-center justify-center"> {/*Beige Ovaal, is nu even groot als de foto*/}
                            <div className="relative w-[420px] h-[260px] rounded-[50%] overflow-hidden">
                                <Image
                                    src={boerbert2}
                                    alt="Boer Bert"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="max-w-xl text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Wie zijn wij?
                        </h2>
                        <p className="lg:text-xl leading-relaxed">
                            Wij hebben onze boerderij omgetoverd tot een camping.
                            Op dit moment is dit een groot grasveld met allen plaatsen
                            voor het opzetten van tenten. In de toekomst willen we de
                            camping misschien ook toegankelijk maken voor campers en caravans.
                        </p>
                    </div>
                </div>
        </div>
    </section>
        {/*stukje text met simpele info over de camping */}
        {/*section met leuk verhaal van boer bert over de camping */}
<section className="bg-[#007248]">
    <div style={{ backgroundImage: `url(${campinggestolen.src})` }} className="bg-cover bg-center bg-fixed bg-black/60 bg-blend-multiply rounded-tr-[180px] xl:rounded-tr-[240px] 2xl:rounded-tr-[500px] overflow-hidden">
        <div className="bg-[#FDF5D8] py-20 px-6 rounded-bl-[180px] xl:rounded-bl-[240px] 2xl:rounded-bl-[500px] overflow-hidden rounded-tr-[180px] xl:rounded-tr-[240px] 2xl:rounded-tr-[500px]">
            <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
                <div className="max-w-xl text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#007248]">
                        Onze geschiedenis
                    </h2>
                <p className="md:text-xl leading-relaxed">
                De camping van boer Bert is gebouwd in het jaar 1815 en word al sinds het begin van generatie tot generatie beheert en onderhouden door de familie van boer Bert.
                Ooit was het een groothandelaar in koeienmelk, maar nu is het doeleind van de boerderij dus veranderd naar een camping vanwege de strenge stikstof wetgevingen.
                </p>
                </div>
                    <div className="hidden lg:flex justify-center">
                        <div className="bg-[#007248] rounded-[50%] w-[460px] h-[280px] flex items-center justify-center"> {/*Groene Ovaal, is nu even grooy als de foto*/}
                            <div className="relative w-[460px] h-[280px] rounded-[50%] overflow-hidden">
                                <Image
                                src={boerderij}
                                alt="Boerderij"
                                fill
                                className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</section>
        {/*section met informatie over de geschiedenis van de camping */}

        <div className="bg-[#FDF5D8]">
            <div className="rounded-bl-[180px] xl:rounded-bl-[240px] 2xl:rounded-bl-[500px] rounded-tr-[180px] xl:rounded-tr-[240px] 2xl:rounded-tr-[500px] overflow-hidden">
                <section
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-16 py-20 items-center bg-cover bg-center bg-fixed bg-black/60 bg-blend-multiply"
                    style={{ backgroundImage: `url(${campinggestolen.src})` }}
                >
                    <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
                        <div className="bg-[#f7f0cf] max-w-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-[#0A6A3B] text-[#FDF5D8] p-4 font-bold">
                                <p className="text-2xl md:text-3xl">Kleine plaats</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-3xl md:text-4xl font-bold">€30</p>
                                    <p className="text-lg">per nacht</p>
                                </div>
                            </div>
                            <div className="p-6" />
                        </div>
                {/*box voor reservering info voor kleine plaatsen */}

                        <div className="bg-[#f7f0cf] max-w-sm rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-[#0A6A3B] text-[#FDF5D8] p-4 font-bold">
                                <p className="text-2xl md:text-3xl">Grote plaats</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-3xl md:text-4xl font-bold">€45</p>
                                    <p className="text-lg">per nacht</p>
                                </div>
                            </div>
                            <div className="p-6" />
                        </div>
                    </div>
                {/*box voor reservering info voor grote plaatsen */}

                    <div className="text-center flex flex-col items-center gap-8">
                        <h2 className="text-[#FDF5D8] text-3xl md:text-4xl font-bold leading-snug">
                            KAMPEER OP JOUW MANIER – ALLEEN <br className="hidden md:block" /> OF SAMEN
                        </h2>
                        <a href="/reservering1">
                            <button className="px-10 py-5 bg-[#FDF5D8] hover:bg-[#a4debc] transition text-2xl md:text-3xl font-semibold text-[#007248] rounded-xl">
                                Reserveer nu
                            </button>
                        </a>
              {/*button om naar de pagina reserveringen te gaan */}
            </div>
          </section>
        </div>
      </div> {/*section voor reservering info en knop naar reservering */}

        <div className="bg-[#FDF5D8]">
            <div
                className="bg-cover bg-center bg-fixed bg-black/60 bg-blend-multiply"
                style={{ backgroundImage: `url(${campinggestolen.src})` }}
            >
                <div className="rounded-tr-[180px] xl:rounded-tr-[240px] 2xl:rounded-tr-[500px] overflow-hidden bg-[#FDF5D8]">
                    <section className="px-6 py-20 max-w-7xl mx-auto">

                        <h2 className="text-center text-4xl md:text-6xl text-[#007248] font-bold mb-16">
                            Nieuws
                        </h2>
                        {/*text: 'Nieuws'.... woah */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">


                            <div className="bg-[#007248] text-[#FDF5D8] rounded-xl shadow-xl p-10 flex flex-col justify-center text-center">
                                <p className="text-2xl md:text-3xl mb-6">
                                    “Ons ultieme doel is om iedereen het boerenleven te laten proeven”
                                </p>
                                <p className="text-3xl md:text-4xl font-bold">– Boer Bert</p>
                            </div> {/*groene box met text */}

                            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                                <div
                                    className="h-48 bg-cover bg-center bg-black/30 bg-blend-multiply p-6 text-[#FDF5D8] font-bold"
                                    style={{ backgroundImage: `url(${camping6.src})` }}
                                >
                                    <p className="text-3xl">Evenementen</p>
                                </div>
                                <div className="p-6">
                                    <p className="text-lg">
                                        Evenementen op onze boeren camping
                                    </p>
                                </div>
                                <button className="flex mx-6 my-6 px-6 py-2 bg-[#007248] hover:bg-[#008f58] text-xl font-semibold text-[#FDF5D8] rounded-xl">
                                    Lees meer
                                </button>
                            </div> {/*middelste mox met evenementen */}

                            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
                                <div
                                    className="h-48 bg-cover bg-center bg-black/30 bg-blend-multiply p-6 text-[#FDF5D8] font-bold"
                                    style={{ backgroundImage: `url(${camping5.src})` }}
                                >
                                    <p className="text-3xl">Ervaringen</p>
                                </div>
                                <div className="p-6">
                                    <p className="text-lg">
                                        Ervaringen op onze boeren camping
                                    </p>
                                </div>
                                <button className="flex mx-6 my-6 px-6 py-2 bg-[#007248] hover:bg-[#008f58] text-xl font-semibold text-[#FDF5D8] rounded-xl">
                                    Lees meer
                                </button>
                            </div> {/*box met ervaringen */}

                </div> {/*div voor alle boxen met info in een column */}
            </section> 
          </div> 
        </div>
      </div> {/*section met nieuws en andere onzin */}
        <Footer/>
    </div>
    </>
  );
}


{/*The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues.
The 20 meter pacer test will begin in 30 seconds. Line up at the start.
The running speed starts slowly but gets faster each minute after you hear this signal bodeboop.
A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible.
The second time you fail to complete a lap before the sound, your test is over.
The test will begin on the word start. On your mark. Get ready!… Start. ding﻿*/}

{/*aantal keren dat de code niet werkte: 17 */}
{/*aantal keren gescholden naar de code: 23 */}
{/*aantal keren opgegeven: 8 */}
{/*aantal stenen geteld in de tuin: 50~ */}

