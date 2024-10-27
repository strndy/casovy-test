const POLYGON_API_KEY = "fpzp9R_q82pFzm1nwXWFNGlBpk6G6gOB";

export const loadSplitFromPolygon = async (stockTicker: string) => {
    const url = `https://api.polygon.io/v3/reference/splits?`
    + `ticker=${stockTicker}` 
    + `&apiKey=${POLYGON_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const loadSplitsFromPolygon = async (stockTickets: string[]) => {
    const splits = [];
    for (const ticket of stockTickets) {
        
        // TODO retry in 50s if fails
        const split = await loadSplitFromPolygon(ticket);
        splits.push(split);
        console.log(`Loaded ${split.results.length} splits for ${ticket}`);
    }
    return splits;
}

import fs from 'fs/promises';
import path from 'path';

export const splitCache = async (ticker: string, start: Date, end: Date) => {
    const splitFilePath = path.join(__dirname, '../../../splitDb/splits.json');
    const splits = await fs.readFile(splitFilePath, 'utf8');
    return JSON.parse(splits);
}
