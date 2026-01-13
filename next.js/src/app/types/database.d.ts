interface dbColumn {
    ID: number;
    created_at: string;
    updated_at: string;
}

export interface IReservering extends dbColumn {
    ReseveringsNr: string;
    DatumAankomst: string;
    DatumVertrek: string;
    ReserveringsDatum: string;
    UserData_ID: number;
    ReservatieBewerkDatum: string;
    PlekNummer: number;
    AantalMensen: number;
}

export interface IReservationUserdata extends dbColumn {
    ReseveringsNr: string;
    Voornaam: string;
    Achternaam: string;
    DatumAankomst: string;
    DatumVertrek: string;
    Email: string;
    Woonplaats: string;
    Telefoonnummer: string;
    PlekNummer: number;
    AantalMensen: number;
    ReserveringsDatum: string;
}

export interface IUserData extends dbColumn {
    Voornaam: string;
    Achternaam: string;
    Email: string;
    Telefoonnummer: string;
    Woonplaats: string;
}
