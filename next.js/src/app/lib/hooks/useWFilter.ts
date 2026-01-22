import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { useState } from "react";

/* Dagen van de maand */
const DayMap: Record<string, number> = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 15,
    16: 16,
    17: 17,
    18: 18,
    19: 19,
    20: 20,
    21: 21,
    22: 22,
    23: 23,
    24: 24,
    25: 25,
    26: 26,
    27: 27,
    28: 28,
    29: 29,
    30: 30,
    31: 31,
};

/* lijst met maanden om in searchbar met maandnamen te kunnen zoeken en de juiste resultaten te krijgen. */
const DateMap: Record<string, number> = {
    jan: 1,
    januari: 1,
    feb: 2,
    februari: 2,
    mar: 3,
    maart: 3,
    apr: 4,
    april: 4,
    mei: 5,
    jun: 6,
    juni: 6,
    jul: 7,
    juli: 7,
    aug: 8,
    augustus: 8,
    sep: 9,
    september: 9,
    okt: 10,
    oktober: 10,
    nov: 11,
    november: 11,
    dec: 12,
    december: 12,
};

type SortKey = "naam" | "startDatum" | "eindDatum" | "plaats" | "gereserveerdOp" | "personen" | null;

export default function useWFilter(
    res: Reservering[],
): [Reservering[], (key: SortKey) => void, (query: string) => void] {
    const [sortDirection, setSortDirection] = useState<"ascending" | "descending">("ascending");
    const [sortKey, setSortKey] = useState<SortKey>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    function updateQuery(query: string) {
        setSearchQuery(query);
    }

    function handleSort(key: SortKey): void {
        if (sortKey === key) {
            setSortDirection((prev) => (prev === "ascending" ? "descending" : "ascending"));
        } else {
            setSortKey(key);
            setSortDirection("ascending");
        }
    }

    /* Functie voor het splitten van de datum en zo dus specifieke data op te kunnen zoeken */
    function parseDateQuery(query: string) {
        const fulldate = query.toLowerCase().trim().split(/\s+/); //https://stackoverflow.com/questions/28127794/difference-between-split-s-and-split

        /* Undefined is voor als niet een volledige datum is opgezocht. De dag is bijvoorbeeld undefined als alleen maand en jaar zijn opgezocht.*/
        let day: number | undefined;
        let month: number | undefined;
        let year: number | undefined;

        for (const partdate of fulldate) {
            if (DayMap[partdate]) {
                day = DayMap[partdate];
            } else if (DateMap[partdate]) {
                month = DateMap[partdate];
            } else if (/^\d{4}$/.test(partdate)) {
                //Het controleert of er precies 4 cijfers zijn gegeven voor het jaartal.
                year = Number(partdate);
            }
        }

        return { day, month, year };
    }

    /* Filtering van zoekresultaat */
    const filteredReserveringen = res
        .filter((reservering) => {
            const query = searchQuery.toLowerCase().trim();
            if (!query) return true;

            const { day, month, year } = parseDateQuery(query);
            const hasDateParts = day !== undefined || month !== undefined || year !== undefined;
            const isNumber = /^\d+$/.test(query); //Returns true als query een string die alleen is gemaakt van nummers

            const dates = [
                new Date(reservering.DatumAankomst),
                new Date(reservering.DatumVertrek),
                new Date(reservering.ReserveringsDatum),
            ];

            const matchesParsedDate =
                hasDateParts &&
                dates.some(
                    (date) =>
                        (day === undefined || date.getDate() === day) &&
                        (month === undefined || date.getMonth() + 1 === month) &&
                        (year === undefined || date.getFullYear() === year),
                );

            if (hasDateParts && !isNumber) {
                return matchesParsedDate;
            }
            const matchesPlekNummer = isNumber && reservering.PlekNummer === Number(query);

            return matchesParsedDate || matchesPlekNummer || reservering.Achternaam.toLowerCase().includes(query);
        })
        /* Sorteren van de resultaten in oplopende of aflopende volgorde (alfabetisch of numeriek, afhankelijk van waar je op sorteert */
        .sort((val1, val2) => {
            if (!sortKey) return 0;

            let value1: string | number | Date;
            let value2: string | number | Date;

            switch (sortKey) {
                case "naam":
                    value1 = val1.Achternaam.toLowerCase();
                    value2 = val2.Achternaam.toLowerCase();
                    break;

                case "startDatum":
                    value1 = new Date(val1.DatumAankomst);
                    value2 = new Date(val2.DatumAankomst);
                    break;

                case "eindDatum":
                    value1 = new Date(val1.DatumVertrek);
                    value2 = new Date(val2.DatumVertrek);
                    break;

                case "plaats":
                    value1 = val1.PlekNummer;
                    value2 = val2.PlekNummer;
                    break;

                case "gereserveerdOp":
                    value1 = new Date(val1.ReserveringsDatum);
                    value2 = new Date(val2.ReserveringsDatum);
                    break;

                case "personen":
                    value1 = val1.AantalMensen;
                    value2 = val2.AantalMensen; //TODO bug, only go ascending.

                default:
                    return 0;
            }

            if (value1 < value2) return sortDirection === "ascending" ? -1 : 1;
            if (value1 > value2) return sortDirection === "ascending" ? 1 : -1;
            return 0;
        });

    return [filteredReserveringen, handleSort, updateQuery];
}
