import * as path from 'path';
import { Event, Share } from './src/types';
import { readCSV } from './src/modules/csv/csv';
import { organizeStockPurchases } from './src/modules/parseStockEvents/parseStockEvents';
import { visualiseExpiration } from './src/modules/visualise/visualise';
import { loadSplits, loadSplitsFromPolygon } from './src/modules/split/polygonAPi';




const main = async () => {
    try {
        const csvPath = path.join(__dirname, './data/from_2019-12-04_to_2020-12-03_MTcyOTY2NzkzMDk4Ng.csv');
        const csvData = await readCSV(csvPath);
        //  list of all the stock tickets   
        const stockTickets = csvData.map(row => row.Ticker);
        const startDate = new Date(csvData[1].Time);
        const endDate = new Date(csvData[csvData.length - 1].Time);
        // load splits from polygon
        const splits = await loadSplits(stockTickets, startDate, endDate);
        // enhance the csv data for splits
        // const csvDataWithSplits = enhanceCSVWithSplits(csvData, splits);
        // organize the stock purchases
        console.log(stockTickets, csvData.length);
        // const result = await organizeStockPurchases(csvData);
        // visualiseExpiration(result);

    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
