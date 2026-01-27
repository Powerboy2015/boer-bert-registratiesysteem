import { Reservering } from "@/app/reserveringen/Widgets/Reserveringen";
import { useEffect, useMemo, useState } from "react";

export default function useTimeSort(
    res: Reservering[],
): [Reservering[], (date: string) => void, (date: string) => void] {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const setStart = (date: string) => {
        const d = new Date(date);
        setStartDate(Number.isNaN(d.getTime()) ? null : d);
    };

    const setEnd = (date: string) => {
        const d = new Date(date);
        setEndDate(Number.isNaN(d.getTime()) ? null : d);
    };

    const reserveringen = useMemo(() => {
        if (!startDate || !endDate) return res;

        return res.filter((r) => {
            const date = new Date(r.DatumAankomst);
            return date > startDate && date < endDate;
        });
    }, [res, startDate, endDate]);

    return [reserveringen, setStart, setEnd];
}
