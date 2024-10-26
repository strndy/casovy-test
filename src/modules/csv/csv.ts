import { parse } from 'csv-parse';
import * as fs from 'fs';
import { StockEvent } from "../../types";
import { toPascalCase } from "./toPascalCase";


export const readCSV = async (filePath: string): Promise<StockEvent[]> => {
    const records: any[] = [];
    const parser = fs
        .createReadStream(filePath)
        .pipe(parse({
            columns: (headers: string[]) => headers.map(toPascalCase),
            skip_empty_lines: true,
            autoParse: true,
            cast: (value, context) => {
                if (context.column === 'Time') {
                    return new Date(value);
                }
                if (context.column === 'NoOfShares') {
                    return parseInt(value);
                }
                if (context.column === 'PriceShare') {
                    return parseFloat(value);
                }
                return value;
            }
        }));

    for await (const record of parser) {
        records.push(record);
    }


    return records;
}