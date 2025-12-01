import getDB from "@/app/api/lib/db"
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const allowedColumns = ["ID", "Voornaam", "Achternaam", "Email", "Woonplaats", "Telefoonnummer"];

// interface POSTreq {
//     column: string;
// }

export async function GET(req: NextRequest) {
    // const data: POSTreq = await req.json();

    const page = Number(req.nextUrl.searchParams.get("page") || 1); //the page uhh that you're seeing 
    const limit = Number(req.nextUrl.searchParams.get("limit") || 20); // max users that get loaded at once (20 is default)
    const pagestart = (page - 1) * limit; // caklculates what user it should start from

    //search options
    const searchColumn = req.nextUrl.searchParams.get("searchColumn"); 
    const searchValue = req.nextUrl.searchParams.get("searchValue");

    //sort and order options
    const sort = req.nextUrl.searchParams.get("sort") || "ID";
    const order = req.nextUrl.searchParams.get("order") === "desc" ? "DESC" : "ASC";

    //safety stuff to avoid sql injections?????????????????????????
    if (!allowedColumns.includes(sort)) {
        return NextResponse.json({error: "Foute kolkom"}, {status: 400});
    }
    if (searchColumn && !allowedColumns.includes(searchColumn)) {
        return NextResponse.json({ error: "Foute kolkom" }, { status: 400 });
    }

    const db = await getDB();

    let whereSQLquery = "";
    let likeInput: any[] = [];
    if (searchColumn && searchValue) {
        whereSQLquery = `WHERE ${searchColumn} LIKE ?`;
        likeInput.push(`%${searchValue}%`);
    }

    const [rows] = await db.execute(`select * from UserData ${whereSQLquery} ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`, [...likeInput, limit, pagestart]);
    return NextResponse.json({data: rows});
}

// export async function POST() {
//     const pool = await getDB();
//     const result = await pool.execute("select * from UserData");

//     console.log(result);

//     return Response.json(result[0]);
// }
