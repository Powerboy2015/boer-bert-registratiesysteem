import db from "@/app/classes/database";
import { IReservering } from "@/app/types/database";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await db.instance.selectQuery<IReservering>("SELECT * FROM Reservaties");
    return NextResponse.json({
        data: response,
        ok: true,
        message: "test successful"
    });
}