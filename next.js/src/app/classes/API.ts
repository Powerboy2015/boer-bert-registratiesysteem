const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
};

export default class API {
    /**
     * A base class that we can reuse in order to create consistent calls and routing.
     * @param route the link to the route we use in order to call our api.
     * @returns the results of that route.
     */
    static async GET<T>(route: string,params?: Record<string,string>): Promise<T | false> {
        //adds params to the url if we have any.
        if (params) {
            const query = new URLSearchParams(params).toString()
            route = query ? `${route}?${query}` : route
        }
        
        const call = await fetch(route, {
            method: "get",
            headers: defaultHeaders,
        });
        if (call.ok) {
            return call.json() as T;
        } else {
            return false;
        }
    }
}
