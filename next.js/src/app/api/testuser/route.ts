import getDB from "@/app/api/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Voornaam, Achternaam, Email, Telefoonnummer, Woonplaats } = body || {};
    if (!Email) {
      return NextResponse.json({ error: "Email is vereist" }, { status: 400 });
    }

    const db = await getDB();
    const sql = `INSERT INTO UserData (Voornaam, Achternaam, Email, Telefoonnummer, Woonplaats) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.execute<ResultSetHeader>(sql, [
      Voornaam || null,
      Achternaam || null,
      Email,
      Telefoonnummer || null,
      Woonplaats || null,
    ]);

    return NextResponse.json({ success: true, userId: result.insertId });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Interne serverfout", details: String(err?.message || err) },
      { status: 500 }
    );
  }
}
