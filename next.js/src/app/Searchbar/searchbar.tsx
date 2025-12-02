'use client'

import React, {Dispatch, SetStateAction, useEffect, useReducer, useState} from "react";
import {mockReservations} from "@/app/Searchbar/mockDatabase";

{/*I followed a dev tutorial for this component: https://dev.to/ma7moud3bas/build-a-live-search-bar-in-react-a-step-by-step-guide-2ibh*/}

//types, gaat over wat er in de reserveringstabel staat. Dit moet dus nog worden afgestemd met backend database.
type SearchResult = {
    reservationID: string,
    spot: string,
    amount: number
    name: string
}

type SortKey = keyof SearchResult;

    //states, gaat over in wat voor staat bepaalde functies zich bevinden.
type State = {
    results: SearchResult[];
    isLoading: boolean;
    error?: string;
    query: string;
    sortKey: SortKey | undefined;
    sortDirection: "ascending" | "descending" | undefined;
};

//set aan acties.
type Action =
    | { type: 'request', }
    | { type: 'success', results: SearchResult[] }
    | { type: 'failure', error: string }
    | { type: 'setQuery', query: string }
    | { type: "sort"; key: SortKey };

//Resultaat als je zou sorteren. In dit geval dus alleen op oplopende of aflopende volgorde van de lijst die op dat moment zichtbaar is.
function sortResults(
    array: SearchResult[],
    key?: SortKey,
    direction?: "ascending" | "descending"
): SearchResult[] {
    if (!key || !direction) return array.slice();

    return array.slice().sort((a, b) => {
        const value1 = a[key];
        const value2 = b[key];

        if (typeof value1 === "number" && typeof value2 === "number") {
            return direction === "ascending" ? value2 - value1 : value1 - value2;
        }

        const string1 = String(value1).toLowerCase();
        const string2 = String(value2).toLowerCase();
        return direction === "ascending" ? string1.localeCompare(string2) : string2.localeCompare(string1);
    });
}

//Reducer, zorgt ervoor welke acties er plaats moeten vinden bij welke staat van functies.
function Reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'request': {
            return {...state, isLoading: true}
        }

        case 'success': {
            return {...state, isLoading: false, results: action.results}
        }

        case 'failure': {
            return {...state, isLoading: false, error: action.error}
        }

        case 'setQuery': {
            return {...state, query: action.query}
        }

        case "sort": {
            const nextDirection =
                state.sortKey === action.key && state.sortDirection === "ascending" ? "descending" : "ascending";
            const sorted = sortResults(state.results, action.key, nextDirection);
            return {
                ...state,
                results: sorted,
                sortKey: action.key,
                sortDirection: nextDirection,
            }
        }

        default:
            throw new Error("Unknown action");
    }
}

//De staat van de lijst wanneer we de webpagina voor het eerst openen.
const initialState: State = {isLoading: false, results: mockReservations, query: "", sortKey: undefined, sortDirection: undefined,};

{/* for later use when database is actually working and we need to search results in the database*/}
{/*const getCharacters = async (query: string, signal: AbortSignal): Promise<SearchResult[]> => {
    return await fetch('path to database or api', {
        method: 'FETCH',
        signal,
        body: JSON.stringify({keyword: query})
    })
        .then(res => res.json())
        .then(data => data.data)
        .catch(err => {
            if (err.name === "AbortError") return null;
            throw err;
        })
}*/}

//functie voor het verkrijgen van de data uit de mock database.
const mockGetCharacters = async (query: string): Promise<SearchResult[]> => {
    return new Promise(async (resolve) => {
        const results = mockReservations.filter(r =>
            r.reservationID.includes(query) ||
            r.spot.toLowerCase().includes(query.toLowerCase()) ||
            r.amount.toString().includes(query) ||
            r.name.toLowerCase().includes(query)
        );
        resolve(results);
    })
}

{/* for later use when database is actually working and we need to search results in the database*/}
{/*const useLiveSearch = (dispatch: Dispatch<Action>, query: string) => {
    useEffect(() => {
        if (query.length < 3) return;
        const controller = new AbortController();
        (async function () {
            dispatch({type: "request"})
            try {
                // Helper methode die de data voor ons fetched
                const data = await getCharacters(query, controller.signal)
                if (data) {
                    dispatch({type: 'success', results: data})
                }
            } catch (err) {
                // Handle errors
                console.error(err)
                dispatch({type: 'failure', error: "Er is iets misgegaan"})
            }
        })()
        return () => controller.abort()
    }, [query, dispatch])
}*/}

//mock zoek functie die de data van de mock retrieve "mockGetCharacters" haalt.
const useLiveSearch = (dispatch: Dispatch<Action>, query: string) => {
    useEffect(() => {
        dispatch({ type: "request" });

        (async function () {
            try {
                const data = await mockGetCharacters(query);
                dispatch({ type: "success", results: data });
            } catch (err) {
                dispatch({ type: "failure", error: "Demo search failed" });
            }
        })();
    }, [query, dispatch]);
};

//Zoekbalk component.
export default function Searchbar() {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const { query, sortKey, sortDirection } = state;

    const [debounceValue, setDebounceValue] = useState<string>('')

    useLiveSearch(dispatch, query)

    //het handelen van de verandering in het input field.
    function handleChange(event: { target: { value: SetStateAction<string>; }; }) {
        setDebounceValue(event.target.value)
    }

    //het handelen van wanneer iemand op enter drukt, nadat hij/zij een zoekwoord heeft ingevuld
    const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            dispatch({type: "setQuery", query: debounceValue.toLowerCase()})
        }
    }

    //wanneer iemand op het zoekglas icoontje klikt wordt er ook gezocht, net zoals wanneer er op enter gedrukt wordt zoals hierboven.
    const buttonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch({type: "setQuery", query: debounceValue.toLowerCase()})
    };

    //Het tonen van een pijltje wanneer je filtert.
    const sortArrow = (key: SortKey) =>
        sortKey === key ? (sortDirection === "ascending" ? "↑" : "↓") : "";

    return (
        <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="bg-gray-800 text-white w-full min-w-fit sm:w-1/1 md:w-1/4 xl:w-1/5 2xl:w-1/10">
                <div className="start-0 flex items-center ps-5 relative">
                    <input onChange={handleChange} onKeyDown={handleKeypress} value={debounceValue} type="search"
                           className="block w-full ps-5 pt-3 pb-3 bg-neutral-secondary-medium text-heading text-sm rounded-base shadow-xs placeholder:text-body form-control"
                           placeholder="Type hier om te zoeken..."/>
                    <button type="button" onClick={buttonClicked}
                            className="flex text-white bg-brand hover:bg-brand-strong focus:ring-2 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-3.5 focus:outline-none">
                        <svg className="w-4 h-12 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="gap-4 text-white font-bold px-4 bg-gray-800 flex-col md:flex-row ">
                <button className={"pt-5 gap-4 text-white font-bold px-4"} onClick={() => dispatch({ type: "sort", key: "reservationID" })}>
                    ID {sortArrow("reservationID")}
                </button>

                <button className={"pt-5 gap-4 text-white font-bold px-4"} onClick={() => dispatch({ type: "sort", key: "name" })}>
                    Naam {sortArrow("name")}
                </button>

                <button className={"pt-5 gap-4 text-white font-bold px-4"} onClick={() => dispatch({ type: "sort", key: "spot" })}>
                    Plaats {sortArrow("spot")}
                </button>

                <button className={"pt-5 gap-4 text-white font-bold px-4"} onClick={() => dispatch({ type: "sort", key: "amount" })}>
                    Personen {sortArrow("amount")}
                </button>
                <div className="pb-5 mt-2 space-y-1 px-4">
                    {state.results.map(item => (
                        <div
                            key={item.reservationID}
                            className="p-3 bg-gray-700 rounded text-white"
                        >
                            {item.reservationID} — {item.name}, Plaats {item.spot}, Personen: {item.amount}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}