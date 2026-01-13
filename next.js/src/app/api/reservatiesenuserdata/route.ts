import getDB from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";
import db from "@/app/classes/database";
import { IReservationUserdata } from "@/app/types/database";
import { start } from "repl";
import { abort } from "process";

const allowedColumnsUserData = ["Woonplaats", "Voornaam", "Achternaam", "Telefoonnummer", "Email"];
const allowedColumnsReservaties = [
    "ReseveringsNr",
    "DatumAankomst",
    "DatumVertrek",
    "ReserveringsDatum",
    "PlekNummer",
    "AantalMensen",
];
const allowedColumnsUserandRes = [...allowedColumnsUserData, ...allowedColumnsReservaties];

export async function GET(req: NextRequest) {
    try {
        // const data: POSTreq = await req.json();

        const searchParam = req.nextUrl.searchParams;

        //limits the amount of reservation being displayed at once, also the page select thing
        const page: number = Number(searchParam.get("page") || 1); //the page uhh that you're seeing
        const limit: number = Number(searchParam.get("limit") || 20); // max users that get loaded at once (20 is default)
        const pagestart: number = (page - 1) * limit; // calculates what user it should start from

        //search options
        const searchColumn = searchParam.get("searchColumn");
        const searchValue = searchParam.get("searchValue");

        //sort and order options
        const sort = searchParam.get("sort") || "ReseveringsNr";
        const order = searchParam.get("order") === "desc" ? "DESC" : "ASC";

        //checks if column and search prompt are valid
        if (!allowedColumnsUserandRes.includes(sort)) {
            return NextResponse.json({ error: `Foute kolkom: ${sort}` }, { status: 400 });
        }
        if (searchColumn && !allowedColumnsUserandRes.includes(searchColumn)) {
            return NextResponse.json({ error: `Foute kolkom: ${searchColumn}` }, { status: 400 });
        }

        let whereSQLquery = "";
        // eslint-disable-next-line prefer-const
        let likeInput: string[] = [];
        if (searchColumn && searchValue) {
            whereSQLquery = `WHERE ${searchColumn} LIKE ?`;
            likeInput.push(`%${searchValue}%`);
        }

        //ReseveringsNr, Voornaam, Achternaam, DatumAankomst, DatumVertrek, PlekNummer, ReserveringsDatum, AantalMensen

        //Sql query database execute
        const rows = await db.instance.selectQuery<IReservationUserdata>(
            `select * from Reservaties INNER JOIN UserData ON Reservaties.UserData_ID = UserData.ID ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
            [...likeInput, limit, pagestart]
        );
        const reservaties = rows.map((row) => ({
            ReseveringsNr: row.ReseveringsNr,
            Voornaam: row.Voornaam,
            Achternaam: row.Achternaam,
            Email: row.Email,
            Telefoonnummer: row.Telefoonnummer,
            Woonplaats: row.Woonplaats,
            DatumAankomst: row.DatumAankomst,
            DatumVertrek: row.DatumVertrek,
            PlekNummer: row.PlekNummer,
            ReserveringsDatum: row.ReserveringsDatum,
            AantalMensen: row.AantalMensen,
        }));

        return NextResponse.json({ Reservation: reservaties });
        // return NextResponse.json({data: rows});
    } catch (err) {
        return NextResponse.json(
            //gives error 500 if something went wrong
            { error: "Interne serverfout", details: `${err}` },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    //big try to catch any issues that show up.
    try {
        const body: reservationUserdataRequest = await req.json();
        const { UserData, Reservatie } = body;

        //gets the keys and values from the body
        const userKeys = Object.keys(UserData);
        const reservatieKeys = Object.keys(Reservatie);
        const userValues = Object.values(UserData);
        const reservatieValues = Object.values(Reservatie);

        //returns an error if any invalid columns are requested to be changed for userdata
        const invalidUserColumns = userKeys.filter((key) => !allowedColumnsUserData.includes(key));
        if (invalidUserColumns.length) {
            return NextResponse.json(
                {
                    error: "Ongeldige UserData kolomm(en): " + invalidUserColumns.join(", "),
                },
                { status: 400 }
            );
        }

        //returns an error if any invalid columns are requested to be changed for reservations
        const invalidReservatieColumns = reservatieKeys.filter((key) => !allowedColumnsReservaties.includes(key));
        if (invalidReservatieColumns.length) {
            return NextResponse.json(
                {
                    error: "Invalid Reservatie columns: " + invalidReservatieColumns.join(", "),
                },
                { status: 400 }
            );
        }

        // starts the rollback checkpoint.
        // when rolling back, it will return to here, before any changes were made.
        const started = await db.instance.startTransaction();
        if (!started) {
            throw new Error("failed to start database inserts while creating new reservation.");
        }

        //Sql 👍
        //Creates the insert query for userdata by adding the keys and adds ? for all the values in order to later add them in.
        const sqlUserData = `INSERT INTO UserData (${userKeys.join(", ")}) 
            VALUES (${userKeys.map(() => "?").join(", ")})`;

        // inserts query into the database.
        const resultUserData = await db.instance.insertQuery(sqlUserData, userValues);

        //adds userId to be added with the reservation (to create connection between user and reservation)
        const userId = resultUserData.insertId;
        const reservatieKeysWUserDataID = ["UserData_ID", ...reservatieKeys];
        const reservatieValuesWUserDataID = [userId, ...reservatieValues];

        //Sql again 👍
        //Creates the insert query for reservations by adding the keys and adds ? for all the values in order to later add them in.

        const sqlReservaties = `INSERT INTO Reservaties (${reservatieKeysWUserDataID.join(", ")}) 
            VALUES (${reservatieKeysWUserDataID.map(() => "?").join(", ")})`;

        //inserts query into the database.
        const resultReservaties = await db.instance.insertQuery(sqlReservaties, reservatieValuesWUserDataID);

        //commit database changes if both executed correctly
        const stopped = await db.instance.saveTransaction();
        if (!stopped) {
            throw new Error("could not save transaction while creating reservation.");
        }

        return NextResponse.json({
            success: true,
            message: "User en Reservatie aangemaakt",
            UserDataID: userId, //mag dit? is handig voor testen
            ReservatieID: resultReservaties.insertId,
        });
    } catch (err) {
        //gives error 500 if something went wrong
        const aborted = await db.instance.abortTransaction();
        if (!aborted) {
            throw new Error(
                "could not roll back database changes when something went wrong. Please look into the shit code."
            );
        }
        return NextResponse.json({ error: "Interne serverfout", details: String(err) }, { status: 500 });
    }
}
