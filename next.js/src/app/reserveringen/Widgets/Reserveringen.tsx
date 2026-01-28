

/* Interface voor reserveringen */
export interface Reservering {
    ReseveringsNr: string;
    AantalMensen: number;
    Voornaam: string;
    Achternaam: string;
    DatumAankomst: string;
    DatumVertrek: string;
    Email: string;
    PlekNummer: number;
    ReserveringsDatum: string;
    reserveringBewerkDatum: string;
    Telefoonnummer: string;
    Woonplaats: string;
    PlekGrootte: string;
    Prijs: string;
}