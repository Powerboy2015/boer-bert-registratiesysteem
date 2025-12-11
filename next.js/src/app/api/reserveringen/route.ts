import getDB from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";
import { Connection } from "mysql2/promise";

const allowedColumnsUserData = [
  "Woonplaats",
  "Voornaam",
  "Achternaam",
  "Telefoonnummer",
  "Email",
];
const allowedColumnsReservaties = [
  "ReseveringsNr",
  "DatumAankomst",
  "DatumVertrek",
  "ReserveringsDatum",
  "PlekNummer",
  "AantalMensen",
];
const allowedColumnsUserandRes = [
  ...allowedColumnsUserData,
  ...allowedColumnsReservaties,
];

interface ReservatieBody {
  UserData_ID: number;
  ReseveringsNr?: string;
  DatumAankomst?: string;
  DatumVertrek?: string;
  ReserveringsDatum?: string;
  PlekNummer?: number;
  AantalMensen?: number;
}

export async function GET(req: NextRequest) {
  // const data: POSTreq = await req.json();

  const searchParam = req.nextUrl.searchParams;
  const page = Number(searchParam.get("page") || 1); //the page uhh that you're seeing
  const limit = Number(searchParam.get("limit") || 20); // max users that get loaded at once (20 is default)
  const pagestart = (page - 1) * limit; // calculates what user it should start from

  //search options
  const searchColumn = searchParam.get("searchColumn");
  const searchValue = searchParam.get("searchValue");

  //sort and order options
  const sort = searchParam.get("sort") || "ReseveringsNr";
  const order = searchParam.get("order") === "desc" ? "DESC" : "ASC";

  //safety stuff to avoid sql injections?????????????????????????
  if (!allowedColumnsUserandRes.includes(sort)) {
    return NextResponse.json(
      { error: `Foute kolkom: ${sort}` },
      { status: 400 }
    );
  }
  if (searchColumn && !allowedColumnsUserandRes.includes(searchColumn)) {
    return NextResponse.json(
      { error: `Foute kolkom: ${searchColumn}` },
      { status: 400 }
    );
  }

  const db: Connection = await getDB();

  let whereSQLquery = "";
  // eslint-disable-next-line prefer-const
  let likeInput: string[] = [];
  if (searchColumn && searchValue) {
    whereSQLquery = `WHERE ${searchColumn} LIKE ?`;
    likeInput.push(`%${searchValue}%`);
  }

  //ReseveringsNr, Voornaam, Achternaam, DatumAankomst, DatumVertrek, PlekNummer, ReserveringsDatum, AantalMensen
  const [rows] = await db.execute(
    `select * from Reservaties INNER JOIN UserData ON Reservaties.UserData_ID = UserData.ID ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
    [...likeInput, limit, pagestart]
  );
  const reservaties = rows.map((row) => ({
    ReseveringsNr: row.ReseveringsNr,
    Voornaam: row.Voornaam,
    Achternaam: row.Achternaam,
    DatumAankomst: row.DatumAankomst,
    DatumVertrek: row.DatumVertrek,
    PlekNummer: row.PlekNummer,
    ReserveringsDatum: row.ReserveringsDatum,
    AantalMensen: row.AantalMensen,
  }));

  return NextResponse.json({ Reservation: reservaties });
  // return NextResponse.json({data: rows});
}

export async function DELETE(req: NextRequest) {
  try {
    //kijk naar json body. search params zijn niet de standard
    const id = req.nextUrl.searchParams.get("id");

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Geen geldige ID opgegeven" },
        { status: 400 }
      );
    }

    const db = await getDB();
    //proper types
    const [result] = await db.execute<ResultSetHeader>(
      "DELETE FROM Reservaties WHERE ID = ?",
      [Number(id)]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Reservatie niet gevonden" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reservatie verwijderd",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Interne serverfout", details: `${err}` },
      { status: 500 }
    );
  }
}
