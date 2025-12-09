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
import Huh from "./components/huh"
export default function Home() {
  return (
    <>
    <div className="min-h-screen w-full text-[#2c2c2c] font-sans">
      <header className="w-full flex items-center h-30 justify-between p-4 bg-[#93DAB8]">
        <div className="flex items-center gap-3">
          <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-semibold">Camping Boer Bert</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-[#1a8f7a] text-white rounded-md">Contact</button>
        </div>
      </header>

      
      <div className="bg-[#007248]">
        <div className="rounded-bl-[500px] overflow-hidden bg-[#007248]">
          <section className=" gap-6 p-6 items-center w-full h-250 bg-cover bg-center"
              style={{ backgroundImage: "url('/campinggestolen.jpg')" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-250 items-center">
              <div className="rounded-full overflow-hidden w-80 h-80 mx-auto">
                {/*image*/}
              </div>
              <div className="bg-[#007248] h-150 rounded-[20] w-180 opacity-90 place-content-center place-items-stretch items-center">
                <h1 className="text-center font-bold text-4xl opacity-100 p-5 text-[#fdf5d8]">Boerencamping boer Bert</h1>
                <p className="text-2xl text-justify p-8 mb-4 opacity-100 text-[#fdf5d8] w-auto"
                style={{
                  fontFamily:'Roboto mono'
                }}>
                Lorem ipsum dolor sit amet. Est voluptatem incidunt nam unde praesentium ab consectetur consectetur sit
                labore voluptate. Non nostrum adipisci aut fuga placeat quo odit voluptas et deserunt tempore in aspernatur
                quos et culpa architecto sed quia. 33 voluptatem mollitia sed maiores quia sit quasi magnam sed aperiam
                deserunt ea cupiditate deserunt.
                </p>
                <div className="px-12 ">
                  <button className="px-8 py-3 bg-[#FDF5D8] text-2xl font-semibold text-[#007248] rounded-md">Reserveer nu</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="bg-[#FDF5D8]">
        <div className="rounded-bl-[500px] rounded-bl-lg-[500px] overflow-hidden">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-250 items-center bg-[#007248] text-[#FDF5D8]">
            <div className="rounded-full overflow-hidden w-80 h-80 mx-auto">
              {/*image*/}
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
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 h-250 gap-6 p-6 items-center bg-[#FDF5D8]">
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

      <footer className="p-6 bg-[#93DAB8] text-sm h-30">
        <p>📞 +31 123456789</p>
        <p>📧 info@campingboerbert.nl</p>
        <p>📍 Heidelberglann 15, 3584 CS</p>
        <p>Fax: 214-785-2447</p>
      </footer>
    </div>

    </> /*renders alle componenten op de homepage*/
  );
}

