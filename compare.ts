import path from "path";
import { readCSV } from "./src/modules/csv/csv";
import { readFile } from "fs/promises";

const compare = async () => {
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
    const csvHistory = csvData.map(e => ({
        ticker: e.Ticker,
        event: e.Action.endsWith('buy') ? 'bought' : 'sold',
        amount: e.NoOfShares,
        rawDate: e.Time,
        date: new Date(new Date(e.Time).getTime() + (2 * 60 * 60 * 1000)), // Add 2 hours
        dateIso: new Date(new Date(e.Time).getTime() + (2 * 60 * 60 * 1000)).toISOString(), // Add 2 hours
        ID: e.ID,
    }));
    console.table(csvHistory);

    const jsonPath = path.join(__dirname, `./data/tsla.json`);
    const jsonData = await readFile(jsonPath, 'utf8');
    const json = JSON.parse(jsonData);
    const history = json.data.map(h => ({
        ticker: h.heading.context.instrument,
        event: h.subHeading.key.split('.')[2],
        amount: h.additionalInfo?.context?.quantity,
        rewDate: h.date,
        date: new Date(h.date),
        dateIso: new Date(h.date).toISOString(),
        detailsPath: h.detailsPath,
        // price: h.mainInfo.context.amount,
    })).reverse();
    console.table(history);

    // const paired = history.fin(c => ({
    //     // ticker: c.ticker,
    //     // event: c.event,
    //     // amount: c.amount,
    //     csv: csvData.find(h => {
    //         console.log(h.Ticker, c.ticker, h.event, c.event, h.NoOfShares, c.amount);
    //         return h.Ticker == c.ticker && h.event == c.event;
    //             //    csvDate.getTime() === jsonDate.getTime();
    //     }),
    // }));

    const paired = [];
    history.forEach(h => {
        const match = csvHistory.find(c => c.ticker == h.ticker && c.event == h.event && c.date.getTime() == h.date.getTime());
        // console.log(h, csv);
        
            paired.push({
                ...h,
                CsvId: match ? match.ID : null
            });
        
    });
    console.table(paired);


    const paired2 = [];
    csvHistory.forEach(c => {
        const match = history.find(h => h.ticker == c.ticker && h.event == c.event && h.date.getTime() == c.date.getTime());
        // console.log(h, csv);
        
            paired2.push({
                ...c,
                CsvId: match ? match.detailsPath : null
            });
        
    });
    console.table(paired2);

}

compare().then(console.log).catch(console.error);
