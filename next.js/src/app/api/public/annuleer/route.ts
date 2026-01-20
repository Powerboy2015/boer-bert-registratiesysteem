import getDB from "@/app/api/lib/db";
import { decryptReservationToken } from "@/app/api/lib/encryption";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2/promise";

/**
 * POST endpoint to cancel a reservation using an encrypted token
 * The token should contain the reservation number
 * This ensures only the person with the link can cancel the reservation
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

        // Verify the reservation exists and get its details
        const [reservation] = await db.execute(
            `SELECT ID, ReseveringsNr, UserData_ID FROM Reservaties WHERE ReseveringsNr = ?`,
            [reservationNumber]
        );

        if (!Array.isArray(reservation) || reservation.length === 0) {
            return NextResponse.json(
                { error: "Reservatie niet gevonden" },
                { status: 404 }
            );
        }

        const reservatieId = reservation[0].ID;
        const userDataId = reservation[0].UserData_ID;

        // Begin transaction for safe deletion
        await db.beginTransaction();

        try {
            // Delete the reservation
            const [deleteReservationResult] = await db.execute<ResultSetHeader>(
                `DELETE FROM Reservaties WHERE ID = ?`,
                [reservatieId]
            );

            if (deleteReservationResult.affectedRows === 0) {
                await db.rollback();
                return NextResponse.json(
                    { error: "Fout bij verwijderen reservatie" },
                    { status: 500 }
                );
            }

            // Delete the associated user data
            const [deleteUserDataResult] = await db.execute<ResultSetHeader>(
                `DELETE FROM UserData WHERE ID = ?`,
                [userDataId]
            );

            await db.commit();

            return NextResponse.json({
                success: true,
                message: "Uw reservering is succesvol geannuleerd",
                reservationNumber,
            });
        } catch (transactionError) {
            await db.rollback();
            throw transactionError;
        }
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
