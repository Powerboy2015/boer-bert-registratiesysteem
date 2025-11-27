'use client'

import {SetStateAction, useReducer} from "react";
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
    return await fetch('path to database or API', {
        method: 'FETCH',
        signal,
        body: JSON.stringify({
            keyword: query
        })
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
                const data = await getSearchWords(query, controller.signal)
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
    }, [query])
}

const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault();
        console.log("Enter");
        {/* It's a work in progress*/}
        const getSearchWords = async (query: string, signal: AbortSignal): Promise<SearchResult[]> => {
            return await fetch('path to database or api', {
                method: 'FETCH',
                signal,
                body: JSON.stringify({ keyword: query})
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
                        const data = await getSearchWords(query, controller.signal)
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
            }, [query])
        }
    }
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

    useEffect(() => {
        if (debounceValue.length < 3) {
            return
        }
        const timeOut = setTimeout(() => {
            dispatch({type: "setQuery", query: debounceValue})
        }, 400);
        return () => clearTimeout(timeOut)
    }, [debounceValue])


    return (
        <div className="bg-gray-800 w-full min-w-fit sm:w-1/1 md:w-1/4 xl:w-1/5 2xl:w-1/10 flex flex-col">
            <input onChange={handleChange} onKeyDown={handleKeypress} value={debounceValue} type="search" className="w-full form-control" placeholder="Type hier om te zoeken..." />
        </div>
    );
}