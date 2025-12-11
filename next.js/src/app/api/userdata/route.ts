import getDB from "@/app/api/lib/db"
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";

const allowedColumnsUserData = ["ID", "Created_at", "Woonplaats", "Voornaam", "Achternaam", "Telefoonnummer", "Email"];
//ID later weg halen voor veiligheid, sorteer later op created at



export async function GET(req: NextRequest) {
    // const data: POSTreq = await req.json();

    const searchParam = req.nextUrl.searchParams
    const page: number = Number(searchParam.get("page") || 1); //the page uhh that you're seeing 
    const limit: number = Number(searchParam.get("limit") || 20); // max users that get loaded at once (20 is default)
    const pagestart = (page - 1) * limit; // calculates what user it should start from

    //search options
    const searchColumn = searchParam.get("searchColumn"); 
    const searchValue = searchParam.get("searchValue");

    //sort and order options
    const sort = searchParam.get("sort") || "ID";
    const order = searchParam.get("order") === "desc" ? "DESC" : "ASC";

    //safety stuff to avoid sql injections?????????????????????????
    if (!allowedColumnsUserData.includes(sort)) {
        return NextResponse.json({error: `Foute kolkom: ${sort}`}, {status: 400});
    }
    if (searchColumn && !allowedColumnsUserData.includes(searchColumn)) {
        return NextResponse.json({error: `Foute kolkom: ${searchColumn}`}, { status: 400 });
    }

    const db = await getDB();

    let whereSQLquery = "";
    // eslint-disable-next-line prefer-const
    let likeInput: string[] = [];
    if (searchColumn && searchValue) {
        whereSQLquery = `WHERE ${searchColumn} LIKE ?`;
        likeInput.push(`%${searchValue}%`);
    }

    // const [rows] = await db.execute(`select * from UserData ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`, [...likeInput, limit, pagestart]);
    // return NextResponse.json({data: rows});

    const [rows] = await db.execute(`select * from UserData ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`, [...likeInput, limit, pagestart]);
    const UserData = (rows.map((row) => ({
        Voornaam: row.Voornaam,
        Achternaam: row.Achternaam,
        Email: row.Email,
        Telefoonnummer: row.Telefoonnummer,
        Woonplaats: row.Woonplaats,
    })));

    return NextResponse.json({ Gebruikers : UserData });
}

export async function PUT(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get("id");

        if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: "Geen geldige ID opgegeven" },
                { status: 400 }
            );
        }

        const body = await req.json();

        const invalidColumns = Object.keys(body).filter(
            key => !allowedColumnsUserData.includes(key)
        );

        if (invalidColumns.length) {
            return NextResponse.json(
                { error: "Ongeldige kolommen: " + invalidColumns.join(", ") },
                { status: 400 }
            );
        }

        const db = await getDB();

        const keys = Object.keys(body);
        const values = Object.values(body);

        const setInput = keys.map(key => `${key} = ?`).join(", ")

        const [result] = await db.execute<ResultSetHeader>(
            `UPDATE UserData SET ${setInput} WHERE ID = ?`,
            [...values, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Gebruiker niet gevonden" },
                { status: 404 }
            );
        }

        return NextResponse.json({success: true, message: "Gebruiker geüpdatet",});

    } catch (err) {
        return NextResponse.json(
            { error: "Interne serverfout", details: `${err}` },
            { status: 500 }
        );
    }
}
