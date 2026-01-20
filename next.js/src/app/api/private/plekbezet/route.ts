import getDB from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

interface AvailablePlace extends RowDataPacket {
    ID: number;
    PlekNummer: number;
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

        const regdatum = /^\d{4}-\d{2}-\d{2}$/;
        //checkt als gegeven datum correcte formaat gebruikt
        if (!regdatum.test(datumAankomst) || !regdatum.test(datumVertrek)) {
            return NextResponse.json(
                { error: "Ongeldig datum formaat. Gebruik YYYY-MM-DD." },
                { status: 400 }
            );
        }
        
        //ik zet ze voor de veiligheid om naar datumtijd formaat
        const aankomst = new Date(datumAankomst);
        const vertrek = new Date(datumVertrek);

        //checkt als aankomst groter is dan vertrek of zelfde dag is
        if (aankomst >= vertrek) {
            return NextResponse.json(
                { error: "Aankomst datum moet voor vertrek datum zijn. Mag ook niet op zelfde dag." },
                { status: 400 }
            );
        }

        //Checkt als de aankomst datum niet dezelfde dag is en al geweest is.
        const vandaag = new Date();
        if (aankomst < vandaag) {
            return NextResponse.json(
                { error: "Je kan niet meer boeken op deze datum (datum is al geweest/ je kan niet nog voor vandaag boeken)" }, //uh idk dit leest raar
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