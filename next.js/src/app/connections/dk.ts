"use server";
import DbPool, { reservationData } from "./Database";

export async function GetReservations(
    slug?: string
): Promise<reservationData[]> {
    const db = new DbPool();
    const reservations = await db.GetReservation(slug);
    return Array.isArray(reservations) ? reservations : [reservations];
}
