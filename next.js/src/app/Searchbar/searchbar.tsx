'use client'

import React, {SetStateAction, useReducer} from "react";
import {useEffect, useState} from "react";
import {Dispatch} from "react";

{/*I followed a dev tutorial for this component: https://dev.to/ma7moud3bas/build-a-live-search-bar-in-react-a-step-by-step-guide-2ibh*/
}
//types
type SearchResult = {
    id: string,
    name: string,
    Reservationnumber: number
}

type State = {
    results: SearchResult[]
    isLoading: boolean
    error?: string,
    query: string
}

type Action =
    | { type: 'request', }
    | { type: 'success', results: SearchResult[] }
    | { type: 'failure', error: string }
    | { type: 'setQuery', query: string }

// Reducer
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

        default: {
            throw Error("Onbekende actie");
        }
    }
}

const initialState: State = {isLoading: false, results: [], query: ""};

const getCharacters = async (query: string, signal: AbortSignal): Promise<SearchResult[]> => {
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
}

const useLiveSearch = (dispatch: Dispatch<Action>, query: string) => {
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
}


export default function Searchbar() {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const {query} = state;

    const [debounceValue, setDebounceValue] = useState<string>('')

    useLiveSearch(dispatch, query)

    // handle input change
    function handleChange(event: { target: { value: SetStateAction<string>; }; }) {
        setDebounceValue(event.target.value)
    }

    const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Enter");
            dispatch({type: "setQuery", query: debounceValue})
        }
    }


    return (
        <div className="bg-gray-800 text-white w-full min-w-fit sm:w-1/1 md:w-1/4 xl:w-1/5 2xl:w-1/10 flex mx-auto">
            <div className="start-0 flex items-center ps-3 relative">
                <svg className="w-4 h-12 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                          d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                </svg>
                <input onChange={handleChange} onKeyDown={handleKeypress} value={debounceValue} type="search"
                       className="block w-full p-3 ps-9 bg-neutral-secondary-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body form-control"
                       placeholder="Type hier om te zoeken..."/>
            </div>
            <button type="button"
                    className="flex text-white bg-brand hover:bg-brand-strong focus:ring-2 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-3.5 focus:outline-none">Zoeken
            </button>
        </div>
    );
}