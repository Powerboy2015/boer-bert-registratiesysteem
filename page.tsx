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
export default function Home() {

  return (
    <>
    <div className="min-h-screen w-full text-[#2c2c2c] font-sans">
      <header className="w-full flex items-center h-auto justify-between p-2 bg-[#93DAB8]">
        <div className="flex items-center gap-3">
          {/*smt can go here idk maybe feet? :p */}
        </div>
        <div className="flex items-center gap-4">

          <div title="scroll naar beneden voor contact gegevens">
          <Scrollcontact/> 
          </div> {/*fkn coole knop, je gaat naar beneden O.O T_T */}

          <button>
            <Image alt="Dutch language" src="/nl.jpg" width={20} height={50} 
            className="rounded-[10] px-auto"/>
          </button>

          <button>
          <Image alt="German language" src="/de.jpg" width={20} height={50} 
          className="rounded-[10] px-auto"/>
          </button>

          <button>
          <Image alt="English language" src="/eng.jpg" width={20} height={50} 
          className="rounded-[10] px-auto"/>
          </button>

        </div>
      </header>

      
      <div className="bg-[#007248]">
        <div className="rounded-bl-[500px] overflow-hidden bg-[#007248]">
          <section className=" gap-6 p-6 items-center w-full h-215 bg-cover bg-center bg-fixed bg-black/50 bg-blend-multiply" /*yuhh de background staat stil hehe */
              style={{ backgroundImage: "url('/campinggestolen.jpg')" }}>
            <div className=" gap-6 p-6 h-250 items-center">
              
                <h1 className="text-center font-bold pt-50 text-4xl opacity-100 p-5 text-[#fdf5d8]">Boerencamping Boer Bert</h1>
                
              
            </div>
          </section>
        </div>
      </div>

      <div className="bg-[#FDF5D8]">
        <div className="rounded-bl-[500px] rounded-bl-lg-[500px] overflow-hidden">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-280 items-center bg-[#007248] text-[#FDF5D8]">
            <div className="overflow-hidden w-200 h-200 mx-auto">
              {/*img ofzo */}
            </div>
            <div className="flex-top content-center w-160">
              <h2 className="font-bold mb-4 text-4xl items-center text-center">Wie zijn wij?</h2>
              <p className="text-2xl text-justify w-auto place-self-strech"
              style={{
              fontFamily:'Roboto mono'
              }}>
              Lorem ipsum dolor sit amet. Est voluptatem incidunt nam unde praesentium ab consectetur consectetur sit
              labore voluptate. Non nostrum adipisci aut fuga placeat quo odit voluptas et deserunt tempore in aspernatur
              quos et culpa architecto sed quia. 33 voluptatem mollitia sed maiores quia sit quasi magnam sed aperiam
              deserunt ea cupiditate deserunt.
              </p>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-[#007248]">
        <div className="rounded-tr-[500px] overflow-hidden">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-280 gap-6 p-6 items-center bg-[#FDF5D8]">
            <div className="w-80 h-80 mx-auto w-160">
              <h2 className="font-bold mb-4 text-4xl text-center"
              style={{
              fontFamily:'Roboto mono'
              }}
              >Onze geschiedenis</h2>
              <p className="text-justify text-2xl w-auto"
              style={{
              fontFamily:'Roboto mono'
              }}>
              Lorem ipsum dolor sit amet. Est voluptatem incidunt nam unde praesentium ab consectetur consectetur sit
              labore voluptate. Non nostrum adipisci aut fuga placeat quo odit voluptas et deserunt tempore in aspernatur
              quos et culpa architecto sed quia. 33 voluptatem mollitia sed maiores quia sit quasi magnam sed aperiam
              deserunt ea cupiditate deserunt.
              </p>
            </div>
            <div className="rounded-full overflow-hidden w-80 h-80 mx-auto">
              {/*image*/}
            </div>
          </section>
        </div>  
      </div>

      <div className="bg-[#FDF5D8]">
        <div className="rounded-tr-[500px] overflow-hidden">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-195 gap-6 p-6 items-center bg-cover bg-center bg-fixed bg-black/60 bg-blend-multiply"
                  style={{ backgroundImage: "url('/campinggestolen.jpg')" }}>
            
            <div className="w-80 h-80 flex gap-6 mx-auto w-160">

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
              </div>

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
              </div>

            </div>
            
            <div className="text-center flex flex-col items-center gap-10 pr-20">
              <h2 className="text-[#FDF5D8] text-3xl md:text-4xl font-bold leading-snug"
                style={{ fontFamily: "Roboto Mono" }}>
                KAMPEER OP JOUW MANIER – ALLEEN <br /> OF SAMEN</h2>

              <button className="px-8 py-3 bg-[#FDF5D8] hover:bg-[#a4debc] transition-colors duration-300 text-2xl font-semibold text-[#007248] rounded-xl">Reserveer nu</button>

            </div>
          
          </section>
        </div>  
      </div>

      <footer className="p-4 px-10 bg-[#93DAB8] font-bold text-[25px] justify-between flex flex-row items-center"
        style={{fontFamily:'Roboto mono'}}>

          <a title="link naar telefoon nummer camping boer bert"
            className="hover:text-[#55876a]"
            href="tel:+31642741016" 
            >📞 +31 123456789</a> {/*knop voor telefoon nmmer */}

          <a title="link naar email info@campingboerbert.nl"
            className="hover:text-[#55876a]"
            href="mailto:info@campingboerbert.nl"
            >📧 info@campingboerbert.nl</a> {/*knop voor email */}

          <a title="link naar google maps locatie camping boer bert"
            className="hover:text-[#55876a]"
            href="https://www.google.com/maps/place/UMC+Utrecht/@52.0858554,5.1795793,17z/data=!3m1!4b1!4m6!3m5!1s0x47c66885c1ad3c53:0x5778bacf22762084!8m2!3d52.0858554!4d5.1795793!16s%2Fm%2F02qkwv4?entry=ttu&g_ep=EgoyMDI1MTIwOC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
            target="_blank"
            rel="noopener noreferer"
            >📍 Heidelberglaan 15, 3584 CS</a> {/*knop voor google maps locatie */}

          <p title="fax nummer camping boer bert"
            className="px-auto hover:text-[#55876a]">Fax: 214-785-2447</p> {/*hoe de fuck ga ik een knop voor fax maken?? */}

          <a title="link naar w3c website"
            className="hover:text-[#55876a]"
            href="https://www.w3.org/"
            target="_blank"
            rel="noopener noreferer"
            > <Image alt="wcec website link" src="/w3c.jpg" width={180} height={160} className="rounded-[10] px-auto"/> </a>

      </footer>
    </div>

    </>
  );
}

