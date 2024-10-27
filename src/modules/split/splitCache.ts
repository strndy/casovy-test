import fs from 'fs/promises';
import path from 'path';

export const cacheSplit = async (ticker: string, loadsplit: () => Promise<any>) => {
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
        console.log(`Loaded ${parsed.results.length} splits for ${ticker} from cache`);
        return parsed.split;
    } catch (error) {
        const splits = await loadsplit();
        await fs.writeFile(splitFilePath, JSON.stringify(splits, null, 2));
        console.log(`Cached ${splits.results.length} splits for ${ticker}`);
        return splits;
    }
}