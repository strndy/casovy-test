import * as path from 'path';
import { Event, Share } from './src/types';
import { readCSV } from './src/modules/csv/csv';
import { organizeStockPurchases } from './src/modules/parseStockEvents/parseStockEvents';
import { visualiseCSV, visualiseExpiration } from './src/modules/visualise/visualise';
import { loadSplits } from './src/modules/split/splitCache';
import { enhanceCSVWithSplits } from './src/modules/enhnace/enhace';




const main = async () => {
        const csvFilenames = [
            "from_2019-12-04_to_2020-12-03_MTczMDEwMTExNDIwMw.csv",
            "from_2020-12-04_to_2021-12-03_MTczMDEwNDA1MTY5Mw.csv",
            "from_2021-12-04_to_2022-12-03_MTcyOTY2ODA0OTkyOQ.csv",
            "from_2022-12-04_to_2023-12-03_MTcyOTY2ODA3OTAyMg.csv",
            "from_2023-12-04_to_2024-10-23_MTcyOTY2ODEyNTM2Mw.csv",
        ];

        let csvData = [];     
        for (const csvFilename of csvFilenames) {
            const csvPath = path.join(__dirname, `./data/${csvFilename}`);
            const content = await readCSV(csvPath);
            csvData.push(...content);
        }
        // "BA", "BM", "MA"
        csvData = csvData.filter(e => e.Ticker == "TSLA");
        // visualiseCSV(csvData);


        //  list of all the unique stock tickets   
        const allTickers = csvData
            .map(row => row.Ticker)
            .filter((value, index, self) => self.indexOf(value) === index)
            .filter(ticker => ticker.length > 1).sort();

        console.log(allTickers, allTickers.length);
        // load splits from polygon
        const splits = await loadSplits(allTickers);
        // console.log(splits, splits.length);

        const enhanced = enhanceCSVWithSplits(csvData, splits);
        // visualiseCSV(enhanced);
        // console.table(enhanced.find(e => e.Ticker === 'MA'));
        // FIXME, thes stocks are not working well, debug it
        const {holdings, errors} = await organizeStockPurchases(enhanced, ["DM"]);
        // visualiseExpiration(holdings);

        if (errors.length > 0) {
            console.error('Errors:', errors.length);
            const errorsTable = errors.map(e => { 
                const sum = e.holdings ? e.holdings.reduce((sum, h) => sum + h.Quantity, 0) : "N/A";
                const notSold = e.holdings ? e.holdings.filter(h => !h.SellDate).reduce((sum, h) => sum + h.Quantity, 0) : "N/A";
                const sold = e.holdings ? e.holdings.filter(h => h.SellDate).reduce((sum, h) => sum + h.Quantity, 0) : "N/A";
                // const holdings = e.holdings ? e.holdings.map(h => `${h.Quantity} @ ${h.BuyPrice}`).join(", ") : "N/A";
                return {ticker: e.ticker, message: e.message, count: holdings.length, sum, notSold, sold} 
            });
            console.table(errorsTable);
        }

}

main().then(console.log).catch(console.error);
