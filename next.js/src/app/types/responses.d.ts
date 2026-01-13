
/**
 * The default response for api's
 * Keeps it streamlined and clear what is happening in each request.
 */
interface ApiReponse {
    status: "success" | "failed"
    message: string;
    data?;
    timestamp: string;
}