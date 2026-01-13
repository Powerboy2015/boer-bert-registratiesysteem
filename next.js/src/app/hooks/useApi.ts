import { useEffect, useRef, useState } from "react";

type Fetcher<T> = () => Promise<T | false>;

/**
 * Custom hook to standardize api requests and remove overhead in other components.
 * @param _fetcher any requests that fetches data
 * @returns data - which holds the response data
 * @returns loading - if the current request is still loading
 * @returns error - any errors that were found if the request failed.
 */
export function useApi<T>(_fetcher: Fetcher<T>): [T | undefined, boolean, string | null, () => void] {
    const [data, setData] = useState<T | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // in order to prevent infinite reloads, we are only using a reference of the fetch.
    const fetcherRef = useRef(_fetcher);
    fetcherRef.current = _fetcher;

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await fetcherRef.current();
            if (result === false) {
                setError("No data found");
            } else {
                setData(result);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err?.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            if (!cancelled) await fetchData();
        };

        run();

        return () => {
            cancelled = true;
        };
    }, []);

    return [data, loading, error, fetchData];
}
