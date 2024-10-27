import { Event, Split } from "../../types";

export const enhanceCSVWithSplits = (csvData: Event[], splits: Split[][]) : Event[] => {
    const enhancedData: Event[] = [...csvData];
    const splitEvents: Event[] = [];

    splits.forEach(stockSplits => {
        stockSplits.forEach(s => {
            const splitEvent: Event = {
                Action: 'Split',
                Time: s.execution_date,
                ISIN: '',
                Ticker: s.ticker,
                Name: `${s.ticker} Stock Split`,
                NoOfShares: 0,
                PriceShare: 0,
                CurrencyPriceShare: '',
                ExchangeRate: '',
                Result: '',
                CurrencyResult: '',
                Total: '',
                CurrencyTotal: '',
                WithholdingTax: '',
                CurrencyWithholdingTax: '',
                StampDutyReserveTax: '',
                CurrencyStampDutyReserveTax: '',
                TransactionFee: '',
                FinraFee: '',
                SplitFrom: s.split_from,
                SplitTo: s.split_to,
                Notes: `Stock split ${s.split_from}:${s.split_to} Id: ${s.id}`,
                ID: s.id,
                CurrencyTransactionFee: '',
                CurrencyFinraFee: ''
            };
            splitEvents.push(splitEvent);
        });
    });

    enhancedData.push(...splitEvents);
    enhancedData.sort((a, b) => a.Time.getTime() - b.Time.getTime());

    return enhancedData;
}

