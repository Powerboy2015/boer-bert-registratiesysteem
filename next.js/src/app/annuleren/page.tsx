"use client";
import Image from "next/image";
import logo from "@/app/Images/logo.jpg";
import de from "@/app/Images/de.jpg";
import eng from "@/app/Images/eng.jpg";
import nl from "@/app/Images/nl.jpg";
import camping8 from "@/app/Images/camping8.jpg";
import home from "@/app/Images/house-door-fill.svg"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../ui/Footer";
import Header from "../ui/Header";
import { Suspense } from "react";
{/*niet op letten waarom er zo veel imports zijn die niet worden gebruikt dank u */ }


export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <Reservering2 />
    </Suspense>
  );
}

function Reservering2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCancelReservation = async () => {
    if (!token) {
      setError("Geen geldige annuleringslink. Controleer uw e-mail.");
      return;
    }

    if (!agreedToTerms) {
      setError("U moet akkoord gaan met de voorwaarden.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/public/annuleer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Er is een fout opgetreden bij het annuleren.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setError("Fout bij het verwerken van uw aanvraag.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


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
        </div>{" "}{/*banner met camping foto */}

        <div className="bg-[#FDF5D8]">

          <section className="bg-[#FDF5D8] text-black max-h-150 py-16">
            <div className="mx-auto h-auto w-auto max-w-[1650px] px-6">
              <div className="gap-8 items-center justify-center flex flex-col lg:flex-row">

                <div className="-translate-y-1/2 z-40">
                  <div className="md:w-auto md:h-auto max-w-[1000px] bg-[#FFFFFF] rounded-xl shadow-xl overflow-hidden w-auto h-auto">

                    <div className="bg-[#FFFFFF] text-[#007248] mt-10 mx-[10%] text-xl font-bold">
                      <p className="text-5xl mt-5 text-center place-content-center" style={{ fontFamily: "Roboto mono" }}>Boeking annuleren</p>
                    </div> {/*titel van de pagina */}

                    <div
                      className="p-6 mt-5 text-lg font-medium text-center max-w-3xl mx-[10%]"
                      style={{ fontFamily: "Roboto mono" }}
                    >
                      <p className="text-[24px]">
                        Er kunnen eventuele kosten worden verrekend als u korter dan 24 uur op uw boeking annuleert.
                      </p>
                    </div> {/*uitleg over annuleren */}

                    {success && (
                      <div className="p-4 m-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        <p className="font-semibold">Succes!</p>
                        <p>Uw reservering is succesvol geannuleerd. U wordt doorgestuurd naar de homepagina...</p>
                      </div>
                    )}

                    {error && (
                      <div className="p-4 m-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p className="font-semibold">Fout</p>
                        <p>{error}</p>
                      </div>
                    )}

                    {!success && (
                      <>
                        <div className="text-center mt-30 mb-20">
                          <input
                            type="checkbox"
                            id="voorwaarden"
                            name="voorwaarden"
                            value="voorwaarden"
                            className="mx-6 w-6 h-6 border-2 border-[#007248]"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                          />
                          <label htmlFor="voorwaarden" className="text-lg font-medium" style={{ fontFamily: "Roboto mono" }}>
                            Ik ga akkoord met de{" "}
                            <a href="https://www.juridische-supermarkt.nl/algemene-voorwaarden-en-annuleringskosten/"
                              className="underline text-[#007248] hover:opacity-80"
                              rel="noopener noreferrer">
                              voorwaarden
                            </a>
                            .
                          </label>
                        </div>  {/*checkbox voor voorwaarden */}

                        <div className="flex mx-auto my-auto items-center mb-5">
                          <div className="my-auto mx-auto items-center text-center p-3 ">
                            <button
                              onClick={handleCancelReservation}
                              disabled={isLoading || !token}
                              className="text-center px-20 py-4 bg-[#007248] hover:bg-[#008f58] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] transition-colors duration-100 text-2xl font-semibold text-[#FDF5D8] rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{ fontFamily: "Roboto mono" }}
                              title={token ? "Klik om uw reservering te annuleren" : "Geen geldige annuleringslink"}>
                              {isLoading ? "Bezig..." : "Ik wil annuleren"}
                            </button>
                          </div>
                        </div> {/*knop om reservering te annuleren*/}
                      </>
                    )}
                  </div>
                </div> {/*het witte vlak met alle info er in */}

              </div>
            </div>
          </section>
        </div>
        <Footer />
        {/*zei iemand voeten??? :p */}
      </div>

      {/*idk wat hier gebeurd maar het is niet wat ik wil en ik weet niet waarom count: 9 */}

    </>
  );
}