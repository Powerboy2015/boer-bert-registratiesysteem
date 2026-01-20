import getDB from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader, Connection, RowDataPacket } from "mysql2/promise";

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
    "AantalMensen",
];

interface UserDataBody {
    Voornaam: string;
    Achternaam: string;
    Email: string;
    Telefoonnummer: string;
    Woonplaats: string;
}

interface ReservatieBody {
    ReseveringsNr: string;
    DatumAankomst: string;
    DatumVertrek: string;
    ReserveringsDatum: string;
    AantalMensen: number;
}

interface PlekBody {
    PlekNummer: number;
}

export interface UserAndReservatieBody {
    UserData: UserDataBody;
    Reservatie: ReservatieBody;
    Plek: PlekBody;
}

export async function POST(req: NextRequest) {
    //await getDB outside because if error occurs it can rollback changes.
    const db = await getDB();
    try {
        const body: UserAndReservatieBody = await req.json();
        const { UserData, Reservatie, Plek } = body;


        //fuck it ik kan typescript niet goed laten werken met for loops (checkt als alle velden er zijn)
        if (!UserData.Voornaam ||!UserData.Achternaam ||!UserData.Email ||!UserData.Telefoonnummer ||!UserData.Woonplaats) {
            return NextResponse.json(
            { error: "Je mist een iets in userdata body" },
            { status: 400 }
            );
        }
        if (!Reservatie.DatumAankomst ||!Reservatie.DatumVertrek ||!Reservatie.AantalMensen) {
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

        //checkt als datums in correcte formaat zijn
        const regdatum = /^\d{4}-\d{2}-\d{2}$/;
        if (!regdatum.test(Reservatie.DatumAankomst) || !regdatum.test(Reservatie.DatumVertrek)) {
            return NextResponse.json(
                { error: "Datums moeten in formaat YYYY-MM-DD zijn." },
                { status: 400 }
            );
        }
        //checkt als email @ bevat en een .
        const regemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regemail.test(UserData.Email)) {
            return NextResponse.json(
                { error: "Ongeldig email-adres." },
                { status: 400 }
            );
        }

        

        const aankomst = new Date(Reservatie.DatumAankomst);
        const vertrek = new Date(Reservatie.DatumVertrek);
        const vandaag = new Date();
        vandaag.setHours(0, 0, 0, 0);
        //checkt als aankomst groter is dan vertrek en als aankomst datum niet eerder is dan vandaag.
        if (aankomst >= vertrek) {
            return NextResponse.json(
                { error: "Aankomst datum moet voor vertrek datum zijn. Mag ook niet op zelfde dag." },
                { status: 400 }
            );
        }
        if (vandaag >= aankomst) {
            return NextResponse.json(
                { error: "Aankomst datum kan niet eerder zijn dan vandaag en mag niet vandaag zijn" },
                { status: 400 }
            );
        }

        //checkt als aantalmensen niet negatief is
        if (Reservatie.AantalMensen < 1) {
            return NextResponse.json(
                { error: "AantalMensen moet een positief getal zijn." },
                { status: 400 }
            );
        }
        
        const [plaatsbezetcheck] = await db.execute<RowDataPacket[]>(
            `
            SELECT Plekken.PlekNummer, Reservaties.DatumAankomst, Reservaties.DatumVertrek 
            FROM Reservaties 
            INNER JOIN Plekken ON Reservaties.Plekken_ID = Plekken.ID 
            WHERE Reservaties.DatumAankomst <= ? 
            AND Reservaties.DatumVertrek >= ?
            AND Plekken.PlekNummer = ?
            `, [vertrek, aankomst, Plek.PlekNummer]);
            
        if (plaatsbezetcheck.length != 0) {
            return NextResponse.json(
                { error: `Plaats is al bezet tijdens dit moment.`},
                { status: 400 }
            );
        }

        Reservatie.ReseveringsNr = await getReservationNr(db);
        Reservatie.ReserveringsDatum = new Date().toISOString().slice(0, 19).replace("T", " ");

        //gets the keys and values from the body
        const userKeys = Object.keys(UserData);
        const reservatieKeys = Object.keys(Reservatie);

        const userValues = Object.values(UserData);
        const reservatieValues = Object.values(Reservatie);

        //checks if the body key items are in the vaild columns list
        const invalidUserColumns = userKeys.filter(
            (key) => !allowedColumnsUserData.includes(key)
        );
        if (invalidUserColumns.length) {
            return NextResponse.json(
                {
                    error:
                        "Ongeldige UserData kolomm(en): " +
                        invalidUserColumns.join(", "),
                },
                { status: 400 }
            );
        }

        const invalidReservatieColumns = reservatieKeys.filter(
            (key) => !allowedColumnsReservaties.includes(key)
        );
        if (invalidReservatieColumns.length) {
            return NextResponse.json(
                {
                    error:
                        "Invalid Reservatie columns: " +
                        invalidReservatieColumns.join(", "),
                },
                { status: 400 }
            );
        }

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

        await db.beginTransaction();

        //Sql 👍
        const sqlUserData = `INSERT INTO UserData (${userKeys.join(", ")}) 
            VALUES (${userKeys.map(() => "?").join(", ")})`;

        const [resultUserData] = await db.execute<ResultSetHeader>(
            sqlUserData,
            userValues
        );

        //takes UserData.ID of the previous execute and makes it a variable
        const userId = resultUserData.insertId;

        const reservatieKeysWUserDataID = [
            "UserData_ID",
            ...reservatieKeys,
            "Plekken_ID",
        ];
        const reservatieValuesWUserDataID = [
            userId,
            ...reservatieValues,
            plekkenId,
        ];

        //Sql again 👍
        const sqlReservaties = `INSERT INTO Reservaties (${reservatieKeysWUserDataID.join(
            ", "
        )}) VALUES (${reservatieKeysWUserDataID.map(() => "?").join(", ")})`;

        const [resultReservaties] = await db.execute<ResultSetHeader>(
            sqlReservaties,
            reservatieValuesWUserDataID
        );

        //commit database changes if both executed correctly
        await db.commit();

        return NextResponse.json({
            success: true,
            message: "User en Reservatie aangemaakt",
            UserDataID: userId, //mag dit? is handig voor testen
            ReservatieID: resultReservaties.insertId,
        });
    } catch (err) {
        //gives error 500 if something went wrong
        await db.rollback();
        return NextResponse.json(
            { error: "Interne serverfout", details: String(err) },
            { status: 500 }
        );
    }
}

interface IreservationNr extends RowDataPacket {
    ID: string;
}

// simple helper query function.
async function SelectQuery<T>(db: Connection, query: string): Promise<T[]> {
    const [results] = await db.execute(query);
    return results as T[];
}

/**
 * Creates a newly generated reservation number.
 * @param db the database connection object
 * @returns the next usable reservation number.
 */
async function getReservationNr(db: Connection): Promise<string> {
    // TODO fix a less lazy way to calculate a reservationID. Currently using ids.
    const reservationID = await SelectQuery<IreservationNr>(
        db,
        "SELECT MAX(ID) as ID FROM Reservaties"
    );

    console.log(reservationID);

    const nextID = reservationID[0].ID + 1;
    // Uses the year added
    const currentYear: string = new Date().getFullYear().toString();

    return currentYear + "-" + nextID;
}
