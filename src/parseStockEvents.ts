import { readCSV } from "./modules/csv";
import { Holding, StockEvent } from "./types";

const TIME_TEST_DAYS = 365 * 3;

const holding: Record<string, Record<string, Holding[]>> = {};

export const parseStockEvents = async (csvData: StockEvent[]) => {
    const queue: Record<string, StockEvent[]> = {};

    // group by ticker
    csvData.forEach((event) => {
        if (!queue[event.Ticker]) {
            queue[event.Ticker] = [];
        }
        queue[event.Ticker].push(event);
    });

    console.log(queue);

}

