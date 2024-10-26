import * as path from 'path';
import { Event, Share } from './src/types';
import { readCSV } from './src/modules/csv/csv';
import { organizeStockPurchases } from './src/modules/parseStockEvents/parseStockEvents';
import { visualiseExpiration } from './src/modules/visualise/visualise';




const main = async () => {
    try {
        const csvPath = path.join(__dirname, './data/from_2019-12-04_to_2020-12-03_MTcyOTY2NzkzMDk4Ng.csv');
        const csvData = await readCSV(csvPath);
        console.log(csvData.length);
        const result = await organizeStockPurchases(csvData);
        visualiseExpiration(result);

    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
