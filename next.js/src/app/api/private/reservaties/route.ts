import getDB from "@/app/api/lib/db";
import { sendReservationEmail as sendMail } from "@/app/api/lib/mailer";
import { NextRequest, NextResponse} from "next/server";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

//allowed columns that can be given from the front end
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
    ReseveringsNr: string;
    DatumAankomst: string;
    DatumVertrek: string;
    ReserveringsDatum: string;
    AantalMensen: number;
}

interface PlekBody {
    PlekNummer: number;
}

export interface ReservatieAndPlekBody {
    Reservatie: ReservatieBody;
    Plek: PlekBody;
}

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

        const db = await getDB();

        let whereSQLquery = "";
        // eslint-disable-next-line prefer-const
        let likeInput: string[] = [];
        if (searchColumn && searchValue) {
            whereSQLquery = `WHERE ${searchColumn} LIKE ?`;
            likeInput.push(`%${searchValue}%`);
        }

        //ReseveringsNr, Voornaam, Achternaam, DatumAankomst, DatumVertrek, PlekNummer, ReserveringsDatum, AantalMensen

        //Sql query database execute
        const [rows] = await db.execute(
            `select * from Reservaties INNER JOIN Plekken ON Reservaties.Plekken_ID = Plekken.ID ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
            [...likeInput, limit, pagestart]
        );
        const reservaties = rows.map((row) => ({
            ReseveringsNr: row.ReseveringsNr,
            DatumAankomst: row.DatumAankomst,
            DatumVertrek: row.DatumVertrek,
            PlekNummer: row.PlekNummer,
            PlekGrootte: row.Grootte,
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

//TODO POST request werkt voor nu niet meer. ik moet dit later fixen (volgensmij gebruikt niemand dit nog) Dit is ook omdat het UserData_ID nodig had wat liever niet gedaan wordt.

// export async function POST(req: NextRequest) {
//     try {
//         const body: ReservatieBody = await req.json();

//         //checks if UserData_ID is a number and is also vaild, else give error
//         if (!body.UserData_ID || isNaN(Number(body.UserData_ID))) {
//             return NextResponse.json(
//                 { error: "UserData_ID moet gegeven worden" },
//                 { status: 400 }
//             );
//         }

//         const db = await getDB();

//         //gets the keys and values from the body
//         const keys = Object.keys(body);
//         const values = Object.values(body);

//         //checks if the body key items are in the vaild columns list
//         const invalidColumns = keys.filter(
//             (key) => !allowedColumnsReservaties.includes(key)
//         );

//         if (invalidColumns.length) {
//             return NextResponse.json(
//                 { error: "Ongeldige kolomm(en): " + invalidColumns.join(", ") },
//                 { status: 400 }
//             );
//         }

//         //Sql 👍
//         const sql = `
//             INSERT INTO Reservaties (${keys.join(", ")})
//             VALUES (${keys.map(() => "?").join(", ")})
//         `;

// const [result] = await db.execute<ResultSetHeader>(sql, values);

//EMAIL RESPONSE.

// try {
//     const [urows]: any = await db.execute(
//         "SELECT Voornaam, Achternaam, Email FROM UserData WHERE ID = ?",
//         [body.UserData_ID]
//     );
//     if (Array.isArray(urows) && urows.length > 0) {
//         const u = urows[0] as any;
//         await sendMail({
//             to: u.Email,
//             name: `${u.Voornaam} ${u.Achternaam}`.trim(),
//             spot: body.PlekNummer,
//             peopleCount: body.AantalMensen,
//             arrivalDate: body.DatumAankomst,
//             departureDate: body.DatumVertrek,
//             reservationNumber: body.ReseveringsNr,
//         });
//     }
// } catch (e) {
//     console.error("Failed to send reservation email:", e);
// }

//         return NextResponse.json({
//             success: true,
//             message: "Reservatie aangemaakt",
//             reservatieId: result.insertId,
//         });
//     } catch (err) {
//         //gives error 500 if something went wrong
//         return NextResponse.json(
//             { error: "Interne serverfout", details: String(err) },
//             { status: 500 }
//         );
//     }
// }

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
            "UPDATE Reservaties SET isArchived = true WHERE ReseveringsNr = ?",
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

        const body: ReservatieAndPlekBody = await req.json();
        const { Reservatie, Plek } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Reserverings ID ontbreekt" },
                { status: 400 }
            );
        }

        if (!Reservatie.ReseveringsNr ||!Reservatie.DatumAankomst ||!Reservatie.DatumVertrek ||!Reservatie.ReserveringsDatum) {
            return NextResponse.json(
            { error: "Je mist een iets in reservatie body" },
            { status: 400 }
            );
        }

        if (!Plek.PlekNummer) {
            return NextResponse.json(
            { error: "Je mist een iets in plek body" },
            { status: 400 }
            );
        }

        //gets the keys and values from the body
        const keys = Object.keys(Reservatie);
        const values = Object.values(Reservatie);

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

        const aankomst = new Date(Reservatie.DatumAankomst);
        const vertrek = new Date(Reservatie.DatumVertrek);

        const regdatum = /^\d{4}-\d{2}-\d{2}$/;
        if (!regdatum.test(Reservatie.DatumAankomst) || !regdatum.test(Reservatie.DatumVertrek)) {
            return NextResponse.json(
                { error: "Datums moeten in formaat YYYY-MM-DD zijn." },
                { status: 400 }
            );
        }

        if (aankomst >= vertrek) {
            return NextResponse.json(
                { error: "Aankomst datum moet voor vertrek datum zijn. Mag ook niet op zelfde dag." },
                { status: 400 }
            );
        }

        const db = await getDB();

        const plekNummer = Plek.PlekNummer;
        const [plek] = await db.execute<RowDataPacket[]>(
            `SELECT ID FROM Plekken WHERE PlekNummer = ?`,
            [plekNummer]
        );

        if (!Array.isArray(plek) || plek.length === 0) {
            return NextResponse.json(
                { error: "Ongeldig PlekNummer" },
                { status: 400 }
            );
        }

        const plekkenId = plek[0].ID; //ik weet niet hoe ik dit rode underline weg krijg T-T

        //takes the keys from the body and sets them up as "key = ?", and if body has more keys, then add ", ". this is for the sql query
        const setInput = keys.map((key) => `${key} = ?`).join(", ");

        //sql execute 👍👍👍👍👍👍👍👍👍👍👍👍👍
        const [result] = await db.execute<ResultSetHeader>(
            `UPDATE Reservaties SET ${setInput}, Plekken_ID = ? WHERE ReseveringsNr = ?`,
            [...values, plekkenId, id]
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
