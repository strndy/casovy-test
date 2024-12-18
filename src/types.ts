export type Event = {
    Action: string;
    Time: Date;
    ISIN: string;
    Ticker: string;
    Name: string;
    NoOfShares: number;
    PriceShare: number;
    CurrencyPriceShare: string;
    ExchangeRate: string;
    Result: string;
    CurrencyResult: string;
    Total: string;
    CurrencyTotal: string;
    WithholdingTax: string;
    CurrencyWithholdingTax: string;
    StampDutyReserveTax: string;
    CurrencyStampDutyReserveTax: string;
    TransactionFee: string;
    FinraFee:string;
    Notes: string;
    ID: string;
    CurrencyTransactionFee: string;
    CurrencyFinraFee: string;
    SplitFrom?: number;
    SplitTo?: number;
}

// A single share of a stock
export type Share = {
    Ticker: string;
    Quantity: number;
    BuyDate: Date;
    BuyPrice: number;
    BuyEventId: string;
    SellPrice?: number;
    SellDate?: Date;
    SellEventId?: string;
    Notes?: string;
}

export type Split = {
    execution_date: Date;
    id: string;
    split_from: number;
    split_to: number;
    ticker: string;
}

export class StockError extends Error {
    constructor(
        message: string,
        public ticker: string,
        public event: Event,
        public holdings: Share[]
    ) {
        super(message);
        this.name = 'StockError';
    }
}
