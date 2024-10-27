import * as path from 'path';
import { Event, Share } from './src/types';
import { readCSV } from './src/modules/csv/csv';
import { organizeStockPurchases } from './src/modules/parseStockEvents/parseStockEvents';
import { visualiseCSV, visualiseExpiration } from './src/modules/visualise/visualise';
import { loadSplits } from './src/modules/split/splitCache';
import { enhanceCSVWithSplits } from './src/modules/enhnace/enhace';




const main = async () => {
    try {
        const csvPath = path.join(__dirname, './data/from_2019-12-04_to_2020-12-03_MTcyOTY2NzkzMDk4Ng.csv');
        const csvData = await readCSV(csvPath);

        //  list of all the unique stock tickets   
        const allTickers = csvData
            .map(row => row.Ticker)
            .filter((value, index, self) => self.indexOf(value) === index)
            .filter(ticker => ticker.length > 1);
    
        console.log(allTickers, allTickers.length);
        // load splits from polygon
        const splits = await loadSplits(allTickers);
        console.log(splits, splits.length);

        const enhanced = enhanceCSVWithSplits(csvData, splits);
        visualiseCSV(enhanced);
 
        const result = await organizeStockPurchases(enhanced);
        visualiseExpiration(result);

    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
