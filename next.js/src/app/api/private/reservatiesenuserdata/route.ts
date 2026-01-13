import getDB from "@/app/api/lib/db";
import { sendReservationEmail as sendMail } from "@/app/api/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import { IPlekken, IReservationUserdata } from "@/app/types/database";
import db from "@/app/classes/database";
import { RowDataPacket } from "mysql2";
const allowedColumnsUserData = ["Woonplaats", "Voornaam", "Achternaam", "Telefoonnummer", "Email"];
const allowedColumnsReservaties = [
    "ReseveringsNr",
    "DatumAankomst",
    "DatumVertrek",
    "ReserveringsDatum",
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
            `select * from Reservaties 
            INNER JOIN UserData ON Reservaties.UserData_ID = UserData.ID
            INNER JOIN Plekken ON Reservaties.Plekken_ID = Plekken.ID 
            ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
            [...likeInput, limit, pagestart]
        );

        const reservaties = rows.map((row) => ({
            ReseveringsNr: row.ReseveringsNr,
            Voornaam: row.Voornaam,
            Achternaam: row.Achternaam,
            Email: row.Email,
            Telefoonnummer: row.Telefoonnummer,
            Woonplaats: row.Woonplaats,
            AantalMensen: row.AantalMensen,
            PlekNummer: row.PlekNummer,
            PlekGrootte: row.Grootte,
            ReserveringsDatum: row.ReserveringsDatum,
            DatumAankomst: row.DatumAankomst,
            DatumVertrek: row.DatumVertrek,
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
        const { UserData, Reservatie, Plek } = body;

        Reservatie.ReseveringsNr = await getReservationNr();
        Reservatie.ReserveringsDatum = new Date().toJSON().split("T")[0];

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

        const plekNummer = Plek.PlekNummer;
        const plek = await db.instance.selectQuery<IPlekken>(`SELECT ID FROM Plekken WHERE PlekNummer = ?`, [
            plekNummer,
        ]);

        if (!Array.isArray(plek) || plek.length === 0) {
            return NextResponse.json({ error: "Ongeldig PlekNummer" }, { status: 400 });
        }

        const plekkenId = plek[0].ID; //ik weet niet hoe ik dit rode underline weg krijg T-T
        console.log(plekkenId);

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

        try {
            await sendMail({
                //type script but we remove type. It will be -script.
                to: UserData.Email,
                name: `${UserData.Voornaam} ${UserData.Achternaam}`.trim(),
                spot: Reservatie.PlekNummer,
                peopleCount: Reservatie.AantalMensen,
                arrivalDate: Reservatie.DatumAankomst,
                departureDate: Reservatie.DatumVertrek,
                reservationNumber: Reservatie.ReseveringsNr,
            });
        } catch (e) {
            console.error("Failed to send reservation email:", e);
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

interface IreservationNr extends RowDataPacket {
    ID: string;
}
/**
 * Creates a newly generated reservation number.
 * @param db the database connection object
 * @returns the next usable reservation number.
 */
async function getReservationNr(): Promise<string> {
    // TODO fix a less lazy way to calculate a reservationID. Currently using ids.
    const reservationID = await db.instance.selectQuery<IreservationNr>("SELECT MAX(ID) as ID FROM Reservaties");

    console.log(reservationID);

    const nextID = Number(reservationID[0]?.ID ?? 0) + 1;
    // Uses the year added
    const currentYear: string = new Date().getFullYear().toString();

    return currentYear + "-" + nextID;
}
