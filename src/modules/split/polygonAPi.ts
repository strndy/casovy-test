import { Split } from "../../types";

const POLYGON_API_KEY = "fpzp9R_q82pFzm1nwXWFNGlBpk6G6gOB";

export const fetchSplits = async (stockTicker: string) : Promise<Split[]> => {
    const url = `https://api.polygon.io/v3/reference/splits?`
    + `ticker=${stockTicker}` 
    + `&apiKey=${POLYGON_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.status != "OK") {
        console.error(data);
        throw new Error(`Failed to load splits for ${stockTicker}`);
    }
    return data.results as Split [];
}
