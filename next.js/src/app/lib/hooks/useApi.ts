import { useEffect, useRef, useState } from "react";

export function useApi<T>(
    fetcher: (signal: AbortSignal) => Promise<T | false>,
): [T | undefined, boolean, string | null, () => Promise<void>] {
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);
    const requestIdRef = useRef(0);

    const fetchData = async () => {
        const requestId = ++requestIdRef.current;

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);
        setError(null);

        try {
            const result = await fetcher(controller.signal);
            if (requestId !== requestIdRef.current) return;

            if (result === false) {
                setError("No data found");
            } else {
                setData(result);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.name !== "AbortError") {
                setError(err?.message ?? "Unknown error");
            }
        } finally {
            if (requestId === requestIdRef.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchData();
        return () => abortRef.current?.abort();
    }, []);

    return [data, loading, error, fetchData];
}
