import getDB from "@/app/api/lib/db";
import { decryptReservationToken } from "@/app/api/lib/encryption";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";

/**
 * POST endpoint to cancel a reservation using an encrypted token
 * The token should contain the reservation number
 * This ensures only the person with the link can cancel the reservation
 * Archives the reservation by setting isArchived=true instead of deleting
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { token } = body;

        if (!token) {
            return NextResponse.json(
                { error: "Token is vereist" },
                { status: 400 }
            );
        }

        // Decrypt the token to get the reservation number
        let reservationNumber: string;
        try {
            reservationNumber = decryptReservationToken(token);
        } catch (error) {
            return NextResponse.json(
                { error: "Ongeldig of verlopen token" },
                { status: 401 }
            );
        }

        const db = await getDB();

        // Verify the reservation exists and is not already archived
        const [reservation] = await db.execute(
            `SELECT ID, ReseveringsNr, isArchived FROM Reservaties WHERE ReseveringsNr = ?`,
            [reservationNumber]
        );

        if (!Array.isArray(reservation) || reservation.length === 0) {
            return NextResponse.json(
                { error: "Reservatie niet gevonden" },
                { status: 404 }
            );
        }

        // Check if already archived
        if (reservation[0].isArchived) {
            return NextResponse.json(
                { error: "Deze reservering is al geannuleerd" },
                { status: 400 }
            );
        }

        // Archive the reservation instead of deleting it
        const [archiveResult] = await db.execute<ResultSetHeader>(
            `UPDATE Reservaties SET isArchived = true WHERE ReseveringsNr = ?`,
            [reservationNumber]
        );

        if (archiveResult.affectedRows === 0) {
            return NextResponse.json(
                { error: "Fout bij annuleren reservatie" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Uw reservering is succesvol geannuleerd",
            reservationNumber,
        });
    } catch (err) {
        return NextResponse.json(
            {
                error: "Interne serverfout",
                details: String(err),
            },
            { status: 500 }
        );
    }
}
