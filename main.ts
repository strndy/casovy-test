import * as path from 'path';
import { Holding, StockEvent } from './src/types';
import { readCSV } from './src/modules/csv';
import { parseStockEvents } from './src/parseStockEvents';




const main = async () => {
    try {
        const csvPath = path.join(__dirname, './data/from_2019-12-04_to_2020-12-03_MTcyOTY2NzkzMDk4Ng.csv');
        const csvData: StockEvent[] = await readCSV(csvPath);
        const result = await parseStockEvents(csvData);
        console.log(result);

    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
