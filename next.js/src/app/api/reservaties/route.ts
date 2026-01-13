import getDB from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";
import db from "@/app/classes/database";
import { IReservering } from "@/app/types/database";

//allowed columns that can be given from the front end
const allowedColumnsUserData = [
    "Woonplaats",
    "Voornaam",
    "Achternaam",
    "Telefoonnummer",
    "Email",
];
const allowedColumnsReservaties = [
    "UserData_ID",
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

        // const db = await getDB();

        let whereSQLquery = "";
        // eslint-disable-next-line prefer-const
        let likeInput: string[] = [];
        if (searchColumn && searchValue) {
            whereSQLquery = `WHERE ${searchColumn} LIKE ?`;
            likeInput.push(`%${searchValue}%`);
        }

        //ReseveringsNr, Voornaam, Achternaam, DatumAankomst, DatumVertrek, PlekNummer, ReserveringsDatum, AantalMensen

        // dev comment
        // I've decided using singletons for database is easier, 
        // it keeps connections minimal and reusable. 
        // Not causing any issues with too many connections.
        // Thus in the refactor we are using this db class (custom made) that has a selectQuery option.
        const rows = await db.instance.selectQuery<IReservering>(`select * from Reservaties ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
            [...likeInput, limit, pagestart])

        // //Sql query database execute
        // const [rows] = await db.execute(
        //     `select * from Reservaties ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
        //     [...likeInput, limit, pagestart]
        // );


        const reservaties = rows.map((row) => ({
            ReseveringsNr: row.ReseveringsNr,
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
    try {
        const body: IReservering = await req.json();

        //checks if UserData_ID is a number and is also vaild, else give error
        if (!body.UserData_ID || isNaN(Number(body.UserData_ID))) {
            return NextResponse.json(
                { error: "UserData_ID moet gegeven worden" },
                { status: 400 }
            );
        }

        // const db = await getDB();

        //gets the keys and values from the body
        const keys = Object.keys(body);
        const values = Object.values(body);

        //checks if the body key items are in the vaild columns list
        const invalidColumns = keys.filter(
            (key) => !allowedColumnsReservaties.includes(key)
        );

        if (invalidColumns.length) {
            return NextResponse.json(
                { error: "Ongeldige kolomm(en): " + invalidColumns.join(", ") },
                { status: 400 }
            );
        }

        //Sql 👍
        const sql = `
            INSERT INTO Reservaties (${keys.join(", ")})
            VALUES (${keys.map(() => "?").join(", ")})      
        `;

        const result = await db.instance.createQuery(sql,values);

        // const [result] = await db.execute<ResultSetHeader>(sql, values);

        return NextResponse.json({
            success: true,
            message: "Reservatie aangemaakt",
            reservatieId: result.insertId,
        });
    } catch (err) {
        //gives error 500 if something went wrong
        return NextResponse.json(
            { error: "Interne serverfout", details: String(err) },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        //kijk naar json body. search params zijn niet de standard
        const id = req.nextUrl.searchParams.get("id");

        //checks if ID is a number and is also vaild, else give error
        // if (!id || isNaN(Number(id))) {
        //     return NextResponse.json(
        //         { error: "Geen geldige ID opgegeven" },
        //         { status: 400 }
        //     );
        // }

        const db = await getDB();
        //proper types
        const [result] = await db.execute<ResultSetHeader>(
            "DELETE FROM Reservaties WHERE ReseveringsNr = ?",
            [id]
        );

        //if the db.execute didn't make any changes it will respond with a not found error
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
            //gives error 500 if something went wrong
            { error: "Interne serverfout", details: `${err}` },
            { status: 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");

        //checks if ID is a number and is also vaild, else give error
        // if (!id || isNaN(Number(id))) {
        //     return NextResponse.json(
        //         { error: "Geen geldige ID opgegeven" },
        //         { status: 400 }
        //     );
        // }

        const body = await req.json();

        //gets the keys and values from the body
        const keys = Object.keys(body);
        const values = Object.values(body);

        //checks if the body key items are in the vaild columns list
        const invalidColumns = keys.filter(
            (key) => !allowedColumnsReservaties.includes(key)
        );

        if (invalidColumns.length) {
            return NextResponse.json(
                { error: "Ongeldige kolomm(en): " + invalidColumns.join(", ") },
                { status: 400 }
            );
        }

        const db = await getDB();

        //takes the keys from the body and sets them up as "key = ?", and if body has more keys, then add ", ". this is for the sql query
        const setInput = keys.map((key) => `${key} = ?`).join(", ");

        //sql execute 👍👍👍👍👍👍👍👍👍👍👍👍👍
        const [result] = await db.execute<ResultSetHeader>(
            `UPDATE Reservaties SET ${setInput} WHERE ReseveringsNr = ?`,
            [...values, id]
        );

        //if the db.execute didn't make any changes it will respond with a not found error
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Reservatie niet gevonden" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Reservatie geüpdatet",
        });
    } catch (err) {
        return NextResponse.json(
            //gives error 500 if something went wrong
            { error: "Interne serverfout", details: `${err}` },
            { status: 500 }
        );
    }
}
