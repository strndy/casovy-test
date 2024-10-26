import path from "path";
import { readCSV } from "../src/modules/csv/csv";
import { organizeStockPurchases } from "../src/modules/parseStockEvents/parseStockEvents";
import { visualiseExpiration } from "../src/modules/visualise/visualise";

describe('E2E', () => {
    it('should parse the real CSV ', async () => {
        const csvPath = path.join(__dirname, './testfile1.csv');
        const csvData = await readCSV(csvPath);
        const result = await organizeStockPurchases(csvData);
        visualiseExpiration(result);
    }, 10000);
});