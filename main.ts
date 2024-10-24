import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import { StockEvent } from './src/Event';

function toPascalCase(str: string): string {
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/[^a-zA-Z0-9]/g, '')
        .replace(/^./, chr => chr.toUpperCase());
}

async function readCSV(filePath: string): Promise<StockEvent[]> {
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

async function main() {
    try {
        const csvPath = path.join(__dirname, './data/from_2019-12-04_to_2020-12-03_MTcyOTY2NzkzMDk4Ng.csv');
        const csvData = await readCSV(csvPath);

        console.log('CSV Data:', csvData);

        // Example: Access specific data
        if (csvData.length > 0) {
            console.log('First row:', csvData[0]);
            console.log('Second row:', csvData[1]);
        }
    } catch (error) {
        console.error('Error reading CSV:', error);
    }
}

main();
