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
    {
      UserData_ID: 102,
      Achternaam: "De Vries",
      PlaatsNummer: 7,
      DatumAankomst: "2025-06-05",
      DatumVertrek: "2025-06-10",
      ReserveringsDatum: "2025-04-15",
      ReservatieBewerkDatum: "2025-05-01",
    },
    {
      UserData_ID: 103,
      Achternaam: "Bakker",
      PlaatsNummer: 22,
      DatumAankomst: "2025-07-20",
      DatumVertrek: "2025-07-25",
      ReserveringsDatum: "2025-05-30",
      ReservatieBewerkDatum: "2025-06-12",
    },
    {
      UserData_ID: 104,
      Achternaam: "Mulder",
      PlaatsNummer: 3,
      DatumAankomst: "2025-08-01",
      DatumVertrek: "2025-08-15",
      ReserveringsDatum: "2025-03-22",
      ReservatieBewerkDatum: "2025-03-25",
    },
    {
      UserData_ID: 105,
      Achternaam: "Visser",
      PlaatsNummer: 19,
      DatumAankomst: "2025-12-10",
      DatumVertrek: "2025-12-20",
      ReserveringsDatum: "2025-10-01",
      ReservatieBewerkDatum: "2025-10-11",
    },
  ])

  const [overlay, setOverlay] = useState(false)

  function toggleOverlay() {
    setOverlay(!overlay)
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




  return (<>      {overlay ? <ReserveringOverlay toggle={toggleOverlay} add={addReservering} /> : null}
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
            </tr>
          </thead>
          <tbody>
            {reserveringen.map((item, index) => (
              <tr className="border-y-5 border-[#1F1F21] text-2xl " key={index}>
                <td>{item.Achternaam}</td>
                <td>{item.DatumVertrek}</td>
                <td>{item.DatumAankomst}</td>
                <td>{item.PlaatsNummer}</td>
                <td>{item.ReserveringsDatum}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => addReservering({
          ID: 105,
          Naam: "Visser",
          plaats: 19,
          start: "2025-12-10",
          eind: "2025-12-20",
          reservering: "2025-10-01",
          reserveringBewerk: "2025-10-11"
        })}>add</button>
      </div>
    </div>
  </>


  );
}
