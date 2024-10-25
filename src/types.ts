export type StockEvent = {
    Action: string;
    Time: Date;
    ISIN: string;
    Ticker: string;
    Name: string;
    NoOfShares: string;
    PriceShare: string;
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
}

export type Holding = {
    Ticker: string;
    NoOfShares: number;
    TestPassTime: number;
    BuyDate: string;
    BuyPrice: number;
}
