import getDB from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

interface AvailablePlace extends RowDataPacket {
    ID: number;
    Pleknummer: number;
    Grootte: string;
}

interface AvailablePlacesResponse {
    "Beschikbare plekken": AvailablePlace[];
}

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;

        //deze gegevens meoten meegegeven worden (let op hoofdletters)
        const datumAankomst = searchParams.get("DatumAankomst");
        const datumVertrek = searchParams.get("DatumVertrek");

        //checkt als je wel datums hebt ingevoerd
        if (!datumAankomst || !datumVertrek) {
            return NextResponse.json(
                { error: "Aankomst datum en vertrek datum zijn verplicht" },
                { status: 400 }
            );
        }

        const db = await getDB();

        //sql 👍👍👍👍👍👍👍👍👍👍👍👍👍❤️❤️❤️❤️❤️❤️😁
        const [rows] = await db.execute<RowDataPacket[]>(
            `
            SELECT *
            FROM Plekken
            WHERE NOT EXISTS (
                SELECT 1
                FROM Reservaties
                WHERE Reservaties.Plekken_ID = Plekken.ID
                AND Reservaties.DatumAankomst <= ?
                AND Reservaties.DatumVertrek >= ?)
            `, [datumVertrek, datumAankomst]);
        
        //Dit is voor typescript, zodat er geen rode underlining is
        const availablePlaces = rows as AvailablePlace[];
        //dit ook
        const response: AvailablePlacesResponse = {
            "Beschikbare plekken": availablePlaces,
        };

        return NextResponse.json(response);

    } catch (err) {
        return NextResponse.json(
            { error: "Interne serverfout", details: String(err) },
            { status: 500 }
        );
    }
}