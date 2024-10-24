import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import { StockEvent } from './src/Event';

const toPascalCase = (str: string): string => {
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/^./, chr => chr.toUpperCase());
}

const readCSV = async (filePath: string): Promise<StockEvent[]> => {
    const records: any[] = [];
    const parser = fs
        .createReadStream(filePath)
        .pipe(parse({
            columns: (headers: string[]) => headers.map(toPascalCase),
            skip_empty_lines: true
        }));

    for await (const record of parser) {
        records.push(record);
    }

    return records;
}

const main = async () => {
    try {
        const csvPath = path.join(__dirname, './data/from_2019-12-04_to_2020-12-03_MTcyOTY2NzkzMDk4Ng.csv');
        const csvData = await readCSV(csvPath);


    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
