import * as path from 'path';
import { Event, Share } from './src/types';
import { readCSV } from './src/modules/csv/csv';
import { organizeStockPurchases } from './src/modules/parseStockEvents/parseStockEvents';
import { visualiseExpiration } from './src/modules/visualise/visualise';
import { loadSplits } from './src/modules/split/splitCache';




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
        // enhance the csv data for splits
        
        const csvDataWithSplits = enhanceCSVWithSplits(csvData, splits);
        // organize the stock purchases
 
        // const result = await organizeStockPurchases(csvData);
        // visualiseExpiration(result);

    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
