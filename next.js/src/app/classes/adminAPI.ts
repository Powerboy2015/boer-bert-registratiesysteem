import { ReservationsUserdataResponse } from "../types/APIresp";
import API from "./API";

/**
 * FRONTEND USE.
 *
 * The class that wraps API calls to the backend to gather data regarding the admin API.
 * This has been constructed in a way that works REALLY well with a custom api hook.
 */
export default class adminAPI {
    /**
     * Gets all reservations made
     */
    static async getAllReservations() {
        const reservations = await API.GET<ReservationsUserdataResponse>("/api/private/reservatiesenuserdata");
        if (!reservations) {
            throw new Error("API endpoint could not gather data.");
        }
        return reservations;
    }

    static async getReservation(resID: string): Promise<ReservationsUserdataResponse> {
        const searchParams: Record<string,string> = {
            "searchColumn": "ReseveringsNr",
            "searchValue" : resID
        }
        
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

        const reservation = await API.GET<ReservationsUserdataResponse>(
        `${baseUrl}/api/private/reservatiesenuserdata`,
        searchParams
        );
        
        if (!reservation) {
            throw new Error("API endpoint could not gather data.");
        }

        return reservation;
    }
}
