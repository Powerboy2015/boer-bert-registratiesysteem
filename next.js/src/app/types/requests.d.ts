interface reservationUserdataRequest {
    UserData: {
        Voornaam: string;
        Achternaam: string;
        Email: string;
        Telefoonnummer: string;
        Woonplaats: string;
    };
    Reservatie: {
        ReseveringsNr: string;
        DatumAankomst: string;
        DatumVertrek: string;
        ReserveringsDatum: string;
        PlekNummer: number;
        AantalMensen: number;
    };
    Plek: {
        PlekNummer: number;
    };
}
