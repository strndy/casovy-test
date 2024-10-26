import { parse } from 'csv-parse';
import * as fs from 'fs';
import { Event } from "../../types";
import { toPascalCase } from "./toPascalCase";


export const readCSV = async (filePath: string): Promise<Event[]> => {
    const records: any[] = [];
    const parser = fs
        .createReadStream(filePath)
        .pipe(parse({
            columns: (headers: string[]) => headers.map(toPascalCase),
            skip_empty_lines: true,
            autoParse: true,
            cast: (value, context) => {
                if (context.column === 'Time') {
                    const date = new Date(value);
                    if (date.toString() === 'Invalid Date') {
                        throw new Error(`Invalid date: ${value}`);
                    }
                    return date;
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