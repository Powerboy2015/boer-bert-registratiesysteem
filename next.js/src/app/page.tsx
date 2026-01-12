"use client";
import Image from "next/image";
import Widget1 from "./components/widget1";
import Widget2 from "./components/widget2";
import Widgetbar1 from "./components/widgetbar1";
import Button1 from "./components/button1";
import Button2 from "./components/button2";
import Input1 from "./components/input1";
import Input2 from "./components/input2";
import Toggle1 from "./components/toggle1";
import Toggle2 from "./components/toggle2";
import Optionfield1 from "./components/optionfield1"
import Optionfield2 from "./components/optionfield2"
import React from 'react';
import Scrollcontact from "./components/contact";
import { useState, useEffect } from "react";
{/*niet op letten waarom er zo veel imports zijn die niet worden gebruikt dank u */}
export default function Home() {
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
            <Scrollcontact/> 
            </div>
          </div>
          {/*fkn coole knop, je gaat naar beneden O.O T_T */}

          <button>
            <Image alt="Dutch language" src="/nl.jpg" width={57} height={57} 
            className="rounded-[10] px-auto opacity-0"/>
          </button>
          {/*knop om taal te veranderen naar nederlands */}

          <button>
          <Image alt="German language" src="/de.jpg" width={57} height={57} 
          className="rounded-[10] px-auto opacity-0"/>
          </button>
          {/*knop om taal te veranderen naar duits */}

          <button>
          <Image alt="English language" src="/eng.jpg" width={57} height={57} 
          className="rounded-[10] px-auto opacity-0"/>
          </button>
          {/*knop om taal te veranderen naar engels */}

        </div>  {/*de knoppen zijn onzichtbaar omdat ze niet werken */}
      </header> {/*header met wat dingen er in */}

      
      <div className="bg-[#007248]">
        <div className="rounded-bl-[500px] overflow-hidden bg-[#007248]">
          <section className=" gap-6 p-6 items-center w-full h-230 bg-cover bg-center bg-fixed bg-black/50 bg-blend-multiply" /*yuhh de background staat stil hehe */
              style={{ backgroundImage: "url('/camping8.jpg')" }}>
            <div className=" gap-20 p-6 h-230 flex flex-col items-center m-auto">
              
                <h1 className="text-center font-bold pt-50 text-6xl opacity-100 p-5 text-[#fdf5d8]">Boerencamping Boer Bert</h1>
                <a href="/reservering1"
                  title="knop naar reserverings pagina">
                <button className="text-center px-15 py-7 bg-[#FDF5D8] hover:bg-[#a4debc] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#007248] rounded-xl">Reserveer nu</button>
                </a>
                {/*button om naar de pagina reserveringen te gaan */}

            </div>
          </section>
        </div>
      </div> {/*sectie die je ziet als je op de pagina komt */}

      <div className="bg-[#FDF5D8]">
        <div className="rounded-bl-[500px] rounded-bl-lg-[500px] overflow-hidden">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 h-150  bg-[#007248] text-[#FDF5D8]">
            <div className="overflow-hidden w-200 h-200 mx-auto flex-top mt-15 w-160">

              <div className="bg-[#FDF5D8] ml-10 max-width-[600px] rounded-[50%] h-108 w-180">
                <div>
                  <Image alt='boerbert' className="shadow-xl/30 max-width-[700px] pt-8 rounded-[50%]" src={'/boerbert2.jpg'} width={700} height={700}/>
                </div>
              </div>
              {/*leuk plaatje van een random boer */}
              
            </div>
            <div className="mt-42 w-160">
              <h2 className="font-bold mb-4 text-4xl items-center text-center">Wie zijn wij?</h2>
              <p className="text-2xl text-justify w-auto place-self-strech"
              style={{
              fontFamily:'Roboto mono'
              }}>
              Wij hebben onze boerderij omgetoverd tot een camping.
              Op dit moment is dit een groot grasveld met allen plaatsen voor het opzetten van tenten.
              In de toekomst willen we de camping misschien ook toegankelijk maken voor campers en caravans.
              </p>
            </div>
            {/*stukje text met simpele info over de camping */}

          </section>
        </div>
      </div> {/*section met leuk verhaal van boer bert over de camping */}

      <div className="bg-[#007248]">
        <div className="rounded-tr-[500px] h-150 bg-cover bg-center bg-fixed bg-black/60 bg-blend-multiply"
            style={{ backgroundImage: "url('/camping8.jpg')" }}>
          <div className=" rounded-tr-[500px] rounded-bl-[500px] overflow-hidden">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-150 gap-6 p-6 bg-[#FDF5D8]">

              <div className="w-80 h-80 mx-auto w-160 mt-20">
                <h2 className="font-bold mb-4 text-4xl text-center"
                style={{
                fontFamily:'Roboto mono'
                }}
                >Onze geschiedenis</h2>
                <p className="text-justify text-2xl w-auto"
                style={{
                fontFamily:'Roboto mono'
                }}>
                De camping van boer Bert is gebouwd in het jaar 1815 en word al sinds het begin van generatie tot generatie beheert en onderhouden door de familie van boer Bert.
                Ooit was het een groothandelaar in koeienmelk, maar nu is het doeleind van de boerderij dus veranderd naar een camping vanwege de strenge stikstof wetgevingen.
                </p>
              </div>
              <div className="overflow-hidden ml-2 w-200 h-200 mx-auto flex-top w-160">
              {/*stukje text van de geschiedenis van de camping/boerderij */}
                
                <div className="bg-[#007248] max-width-[600px] mt-15 rounded-[50%] h-108 w-190">
                  <div>
                    <Image alt='boerbert' className="shadow-xl/30 max-width-[700px] ml-6 pt-8 rounded-[50%]" src={'/boerderij.jpeg'} width={750} height={750}/>
                  </div>
                </div>
                {/*leuk plaatje van oude boerderij in zwart wit (zo lijkt het oud enzo) */}

              </div>
            </section>
          </div>  
        </div>
      </div> {/*section met informatie over de geschiedenis van de camping */}



      <div className="bg-[#FDF5D8]">
        <div className="rounded-tr-[500px] rounded-bl-[500px] overflow-hidden">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-160 gap-6 p-6 items-center bg-cover bg-center bg-fixed bg-black/60 bg-blend-multiply"
                  style={{ backgroundImage: "url('/camping8.jpg')" }}>
            <div className="w-80 h-80 flex gap-5 mt-10 ml-auto w-160">

              <div className="bg-[#f7f0cf] w-90 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[#0A6A3B] text-[#FDF5D8] p-4 text-xl font-bold">
                  <p className="text-3xl">Kleine plaats</p>
                  <div className="flex gap-3">
                    <p className="text-4xl font-bold">€30</p>
                    <p className="text-lg">Per nacht</p>
                  </div>
                </div>
                <div className="p-6">
                  {/*leeg :p */}
                </div>
              </div> {/*box voor reservering info voor kleine plaatsen */}

              <div className="bg-[#f7f0cf] w-90 rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[#0A6A3B] text-[#FDF5D8] p-4 text-xl font-bold">
                  <p className="text-3xl">Grote plaats</p>
                  <div className="flex gap-3">
                    <p className="text-4xl font-bold">€45</p>
                    <p className="text-lg" >Per nacht</p>
                  </div>
                </div>
                <div className="p-6">
                  {/*emptyyyyyy */}
                </div>
              </div> {/*box voor reservering info voor grote plaatsen */}

            </div> {/*div voor de info boxen */}
            
            <div className="text-center flex flex-col items-center gap-10 mr-auto">
              <h2 className="text-[#FDF5D8] text-3xl md:text-4xl font-bold leading-snug"
                style={{ fontFamily: "Roboto Mono" }}>
                KAMPEER OP JOUW MANIER – ALLEEN <br /> OF SAMEN</h2>
              <a href="/reservering1"
                title="knop naar reserverings pagina">
              <button className="px-10 py-5 bg-[#FDF5D8] hover:bg-[#a4debc] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-3xl font-semibold text-[#007248] rounded-xl">Reserveer nu</button>
              </a>
              {/*button om naar de pagina reserveringen te gaan */}
            </div>
  
          </section>
        </div>  
      </div> {/*section voor reservering info en knop naar reservering */}

      <div className="bg-[#FDF5D8]">
        <div className="h-250 items-center bg-cover bg-center bg-fixed bg-black/60 bg-blend-multiply"
            style={{ backgroundImage: "url('/camping8.jpg')" }}>
          <div className="rounded-tr-[500px] overflow-hidden">
            <section className=" gap-6 p-6 h-270 gap-6 p-6 items-center bg-[#FDF5D8]">
              <div className="justify-items-stretch gap-4 items-center">

                <div className=" text-center h-50 text-6xl text-[#007248] font-bold mt-20 mr-25">Nieuws</div>
                {/*text: 'Nieuws'.... woah */}

                <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-0 mr-25">

                  <div className="bg-[#007248] w-115 h-100 text-center rounded-xl shadow-xl overflow-hidden flex flex-col items-center justify-center">
                    <p className="text-3xl text-[#FDF5D8] w-auto m-10" style={{fontFamily:'Roboto mono'}}>“Ons ultieme doel is om iedereen het boerenleven te laten proeven”</p>
                    <p className="text-4xl text-[#FDF5D8] font-bold w-auto m-5">- Boer bert</p>
                  </div> {/*groene box met text */}

                  <div className="">
                    <div className="relative bg-white h-150 w-120 rounded-xl shadow-xl overflow-hidden">
                      <div className="bg-[#0A6A3B] h-50 text-[#FDF5D8] p-4 text-xl font-bold bg-black/30 bg-blend-multiply"
                        style={{ backgroundImage: "url('/camping6.jpg')" }}>
                        <p className="text-3xl mt-5">Evenementen</p>
                      </div>
                      <div className="p-6">
                        <p className="text-xl text-justify m-2" style={{fontFamily:'Roboto mono'}}>Evenementen op onze boeren camping</p>
                      </div>
                      <a href="https://tailwindcss.com/docs/top-right-bottom-left"
                        target="_blank"
                        title="knop om meer te lezen over evenemnten">
                        <button className="absolute left-4 bottom-4 px-6 py-2 bg-[#007248] hover:bg-[#008f58] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-2xl font-semibold text-[#FDF5D8] rounded-xl">Lees meer</button>
                      </a>
                    </div>
                  </div> {/*middelste mox met evenementen */}

                  <div className="">
                    <div className="relative bg-white h-150 w-120 rounded-xl shadow-xl overflow-hidden">
                      <div className=" bg-[#0A6A3B] h-50 text-[#FDF5D8] p-4 text-xl font-bold bg-black/30 bg-blend-multiply"
                        style={{ backgroundImage: "url('/camping5.jpg')" }}>
                        <p className="text-3xl mt-5">Ervaringen</p>
                      </div>
                      <div className="p-6">
                        <p className="text-xl text-justify m-2" style={{fontFamily:'Roboto mono'}}>Ervaringen op onze boeren camping</p>
                      </div>
                      <a href="https://tailwindcss.com/docs/top-right-bottom-left"
                        target="_blank"
                        title='knop meer lezen over ervaringen'>
                        <button className="absolute left-4 bottom-4 px-6 py-2 bg-[#007248] hover:bg-[#008f58] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-2xl font-semibold text-[#FDF5D8] rounded-xl">Lees meer</button>
                      </a>
                    </div>
                  </div> {/*box met ervaringen */}

                </div> {/*div voor alle boxen met info in een column */}
              </div>
            </section> 
          </div> 
        </div>
      </div> {/*section met nieuws en andere onzin */}

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

