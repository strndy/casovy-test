import { parse } from 'csv-parse';
import * as fs from 'fs';
import { StockEvent } from "../types";
import { toPascalCase } from "../toPascalCase";


export const readCSV = async (filePath: string): Promise<StockEvent[]> => {
    const records: any[] = [];
    const parser = fs
        .createReadStream(filePath)
        .pipe(parse({
            columns: (headers: string[]) => headers.map(toPascalCase),
            skip_empty_lines: true,
            autoParse: true
        }));

    for await (const record of parser) {
        records.push(record);
    }

    return records;
}