import fs from 'fs/promises';
import path from 'path';

import { Split } from '../../types';
import { fetchSplits } from './polygonAPi';

export const splitCache = async (ticker: string, loadsplit: () => Promise<Split[]>) => {
    const splitFilePath = path.join(__dirname, `../../../splitDb/splits_${ticker}.json`);
    try {
        const stats = await fs.stat(splitFilePath);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        if (stats.mtime < oneWeekAgo) {
            console.log(`Cache is older than a week for ${ticker}, reloading`);
            throw new Error('Cache is older than a week');
        }

        const cached = await fs.readFile(splitFilePath, 'utf8');
        const parsed = JSON.parse(cached);
        console.log(`Loaded ${parsed.length} splits for ${ticker} from cache`);
        return parsed;

    } catch (error) {
        const splits = await loadsplit();
        await fs.writeFile(splitFilePath, JSON.stringify(splits, null, 2));
        console.log(`Cached ${splits.length} splits for ${ticker}`);
        return splits;
    }
}

export const loadSplits = async (tickers: string[]) => {
    const splits = [];
    for (const t of tickers) {
        // TODO retry in 50s if fails
        const singleStockSplits = await splitCache(t, () => fetchSplits(t));
        splits.push(singleStockSplits);
    }
    return splits;
}