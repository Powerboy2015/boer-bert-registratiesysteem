"use server";
import DbPool, { reservationData } from "./Database";

export async function GetReservations(
    slug?: string
): Promise<reservationData[]> {
    const db = DbPool;
    const reservations = await db.GetReservation(slug);
    return Array.isArray(reservations) ? reservations : [reservations];
}

export async function DeleteReservation(
    reservationID: string
): Promise<boolean> {
    const db = DbPool;
    const response = db.DeleteReservation(reservationID);
    return response;
}

export async function UpdateReservation(args: {
    reservationID: string;
    aankomstDatum?: string;
    vertrekDatum?: string;
    plaats?: string;
}): Promise<boolean> {
    const db = DbPool;

    const updateFields: any = {};

    if (args.aankomstDatum) {
        updateFields.startDate = new Date(args.aankomstDatum);
    }
    if (args.vertrekDatum) {
        updateFields.endDate = new Date(args.vertrekDatum);
    }
    if (args.plaats) {
        updateFields.spot = args.plaats;
    }

    const response = await db.UpdateReservation(
        args.reservationID,
        updateFields
    );
    return response;
}
