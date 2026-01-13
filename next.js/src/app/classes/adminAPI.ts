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
}
