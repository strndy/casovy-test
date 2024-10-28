import fs from 'fs/promises';
import path from 'path';

import { Split } from '../../types';
import { fetchSplits } from './polygonAPi';

function l(message: string) {
    process.stdout.write(message + " ");
}

export const splitCache = async (ticker: string, loadsplit: () => Promise<Split[]>) : Promise<Split[]> => {
    const splitFilePath = path.join(__dirname, `../../../splitDb/splits_${ticker}.json`);
    try {
        const stats = await fs.stat(splitFilePath);
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        if (stats.mtime < oneWeekAgo) {
            l(`${ticker} exppired,`);
            throw new Error('Cache is older than a week');
        }

        const cached = await fs.readFile(splitFilePath, 'utf8');
        const parsed = JSON.parse(cached);
        const typed = parsed.map((s: Split) => ({...s, execution_date: new Date(s.execution_date)}));
        l(`${ticker} ${typed.length} hit`);
        return typed;

    } catch (error) {
        const splits = await loadsplit();
        await fs.writeFile(splitFilePath, JSON.stringify(splits, null, 2));

        l(`${ticker} ${splits.length} miss`);
        return splits;
    }
}

export const loadSplits = async (tickers: string[]) => {
    l(`Loading ${tickers.length} splits: `);
    const splits = [];
    for (const t of tickers) {
        //  retry in 50s if fails
        try {   
            const singleStockSplits = await splitCache(t, async () => {
                await new Promise(resolve => setTimeout(resolve, 500));
                return fetchSplits(t)
            });
            splits.push(singleStockSplits);
        } catch (error) {
            l(`Failed ${t} retrying in 65s....`);
            await new Promise(resolve => setTimeout(resolve, 65000));
            const singleStockSplits = await splitCache(t, () => fetchSplits(t));
            splits.push(singleStockSplits);
        }
    }
    // console.log(`Loaded all ${splits.length} splits`);
    return splits;
}
