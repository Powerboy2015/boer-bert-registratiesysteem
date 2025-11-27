import ReserveringOverlay from "../NieuweReservering/ReserveringOverlay";
import { useState } from "react";

export default function Reserveringen() {
  const [reserveringen, setReserveringen] = useState([
    {
      UserData_ID: 101,
      Achternaam: "Jansen",
      PlaatsNummer: 14,
      DatumAankomst: "2025-04-12",
      DatumVertrek: "2025-04-18",
      ReserveringsDatum: "2025-02-20",
      ReservatieBewerkDatum: "2025-03-01",
    },
  ])

  const [overlay, setOverlay] = useState(false)

  function toggleOverlay() {
    setOverlay(!overlay)
  }

  function handleDeleteReservering(RemoveIndex: number) {
    console.log(RemoveIndex)
    const newReserveringen = reserveringen.filter((item, index) => index !== RemoveIndex)
    setReserveringen(newReserveringen)
  }

  function addReservering({ ID, Naam, plaats, start, eind, reservering, reserveringBewerk }: { ID: number, Naam: string, plaats: number, start: string, eind: string, reservering: string, reserveringBewerk: string }) {
    const nieuw = {
      UserData_ID: ID,
      Achternaam: Naam,
      PlaatsNummer: plaats,
      DatumAankomst: start,
      DatumVertrek: eind,
      ReserveringsDatum: reservering,
      ReservatieBewerkDatum: reserveringBewerk,
    }
    setReserveringen([...reserveringen, nieuw])
  }

  return (<>
    {overlay ? <ReserveringOverlay toggle={toggleOverlay} add={addReservering} /> : null}
    <div className="bg-[#2E3038] h-full mx-5">
      <div className="h-1/15 flex w-full">
        <div className="w-1/2 text-4xl m-3">Reserveringslijst</div>
        <div className="flex justify-end w-full">
          <input
            className="bg-[#556483] my-3 w-1/3 mx-10 text-4xl p-7"
            placeholder="Zoek reservering "
            type="text"
          />
          <button onClick={() => toggleOverlay()} className=" bg-[#55835A] h-15 w-15 m-3">+</button>
        </div>
      </div>
      <div className="w-full h-full m-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-3xl">Naam</th>
              <th className="text-left text-3xl">Eind datum</th>
              <th className="text-left text-3xl">Start datum</th>
              <th className="text-left text-3xl">Plaats</th>
              <th className="text-left text-3xl">Gereserveerd op </th>
              <th className="text-left text-3xl">Opties </th>
            </tr>
          </thead>
          <tbody>
            {reserveringen.map((item, index) => (
              <tr className="border-y-5 border-[#1F1F21] text-2xl bg " key={index}>
                <td>{item.Achternaam}</td>
                <td>{item.DatumVertrek}</td>
                <td>{item.DatumAankomst}</td>
                <td>{item.PlaatsNummer}</td>
                <td>{item.ReserveringsDatum}</td>
                <td> <button onClick={() => handleDeleteReservering(index)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  </>


  );
}
