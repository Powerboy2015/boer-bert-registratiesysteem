import mariadb from "mariadb";
import { NextRequest, NextResponse } from 'next/server';


const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'my-secret-pw',
    connectionLimit: 5,
    database: "mydatabase"
});


export async function GET(): Promise<Response> {
    let conn;
    try {
        conn = await pool.getConnection();
        const data = await conn.query("SELECT * FROM reserveringen ORDER BY reserveringDatum DESC limit 14");
        return Response.json(data)
    } catch (err) {
        throw err;
    }
}

export async function POST(req: NextRequest) {
    let conn;

    try {
        const body = await req.json();

        const {
            Voornaam,
            Achternaam,
            email,
            telNr,
            adres,
            PlaatsNummer,
            DatumAankomst,
            DatumVertrek
        } = body;

        conn = await pool.getConnection();

        const result = await conn.query(
            `INSERT INTO reserveringen 
            (Voornaam, Achternaam, email, telNr, adres, PlaatsNummer, DatumAankomst, DatumVertrek, reserveringDatum, reserveringBewerkDatum)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [
                Voornaam,
                Achternaam,
                email,
                telNr,
                adres,
                PlaatsNummer,
                DatumAankomst,
                DatumVertrek
            ]
        );

        return NextResponse.json(
            { status: 201 }
        );
    } catch (err) {
        console.log(err)
        return NextResponse.json(err)
    }
    finally {
        if (conn) conn.release();
    }
}
