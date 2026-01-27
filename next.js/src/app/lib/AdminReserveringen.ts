import { ReservatieAndPlekBody } from "../api/private/reservaties/route";
import { UserAndReservatieBody } from "../api/private/reservatiesenuserdata/route";
import { Reservering } from "../reserveringen/Widgets/Reserveringen";

interface response {
    ok: boolean;
    message: string;
}

export default class AdminReserveringen {
    static resUsrEndpoint: string = "/api/private/reservatiesenuserdata";
    static resEndpoint: string = "/api/private/reservaties";

    static defaultHeaders: HeadersInit = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
    };

    static async UpdateReservation(res: Reservering): Promise<response> {
        // sets up the correct URL.
        const url = new URL(window.location.origin);
        url.pathname = this.resEndpoint;
        url.searchParams.set("id", res.ReseveringsNr);
        console.log(url);

        // due to the inconsistent requests and responses, I have to remap the reservation Object to this thing.
        const requestBody: ReservatieAndPlekBody = {
            Reservatie: {
                ReseveringsNr: res.ReseveringsNr,
                DatumAankomst: res.DatumAankomst?.split("T")[0] || res.DatumAankomst,
                DatumVertrek: res.DatumVertrek?.split("T")[0] || res.DatumVertrek,
                ReserveringsDatum: res.ReserveringsDatum?.split("T")[0] || res.ReserveringsDatum,
                AantalMensen: res.AantalMensen,
            },
            Plek: {
                PlekNummer: res.PlekNummer,
            },
        };

        // Creates the request we sent to the backend and catches the response.
        const response = await fetch(url, {
            method: "PUT",
            headers: this.defaultHeaders,
            body: JSON.stringify(requestBody),
        });

        // handles the response
        if (response.ok) return { ok: true, message: "Reservering succesvol aangepast." };
        return {
            ok: false,
            message:
                "Er is iets fout gegaan tijdens het aanpassen van de reservering. Probeer opnieuw of contacteer een admin.",
        };
    }

    static async createReservation(res: Reservering): Promise<response> {
        const requestBody: UserAndReservatieBody = {
            Reservatie: {
                ReseveringsNr: res.ReseveringsNr,
                DatumAankomst: res.DatumAankomst,
                DatumVertrek: res.DatumVertrek,
                ReserveringsDatum: new Date().toString(),
                AantalMensen: res.AantalMensen,
                Prijs: "20,00", //random ass hardcode that gets fixed on backend.
            },
            UserData: {
                Voornaam: res.Voornaam,
                Achternaam: res.Achternaam,
                Email: res.Email,
                Telefoonnummer: res.Telefoonnummer,
                Woonplaats: res.Woonplaats,
            },
            Plek: {
                PlekNummer: res.PlekNummer,
            },
        };

        const response = await fetch(this.resUsrEndpoint, {
            method: "POST",
            headers: this.defaultHeaders,
            body: JSON.stringify(requestBody),
        });

        if (response.ok) return { ok: true, message: "Nieuwe reservering aangemaakt." };
        return { ok: false, message: "reservering aanmaken mislukt." };
    }

    static async DeleteReservation(resNr: string): Promise<response> {
        const url = new URL(window.location.origin);
        url.pathname = this.resEndpoint;
        url.searchParams.set("id", resNr);

        const response = await fetch(url, {
            method: "DELETE",
            headers: this.defaultHeaders,
        });

        if (response.ok) return { ok: true, message: "Reservering succesvol verwijderd (soft)" };
        return {
            ok: false,
            message: "reservering kon niet verwijderd worden. Probeer opnieuw of contacteer een admin.",
        };
    }
}
