const defaultHeaders = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  "Pragma": "no-cache"
};

export default class API {
    static async GET<T>(route:string): Promise<T| false>  {
        const call = await fetch(route,{
            method: "get",
            headers: defaultHeaders
        });
        if (call.ok) {
            return call.json() as T
        } else {
            return false;
        }
    }
}