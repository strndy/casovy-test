export const mockStockEvents = [
  {
    Action: "Market buy",
    Time: new Date("2023-01-01T10:00:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 3,
    PriceShare: 150.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "",
    CurrencyResult: "USD",
    Total: "1500.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "111111",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  },
  {
    Action: "Market buy",
    Time: new Date("2023-02-01T10:00:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 1,
    PriceShare: 200.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "",
    CurrencyResult: "USD",
    Total: "1500.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "111112",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  },
  {
    Action: "Market sell",
    Time: new Date("2023-06-01T14:30:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 1,
    PriceShare: 175.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "875.00",
    CurrencyResult: "USD",
    Total: "875.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "111113",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  },
  {
    Action: "Limit sell",
    Time: new Date("2023-07-01T14:30:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 1,
    PriceShare: 185.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "875.00",
    CurrencyResult: "USD",
    Total: "875.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "111114",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  }
]

export const mockStockEventsOutOfOrder = [
  {
    Action: "Market buy",
    Time: new Date("2023-03-01T10:00:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 10,
    PriceShare: 150.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "",
    CurrencyResult: "USD",
    Total: "1500.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "12345",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  },
  {
    Action: "Market sell",
    Time: new Date("2023-01-01T14:30:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 5,
    PriceShare: 175.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "875.00",
    CurrencyResult: "USD",
    Total: "875.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "67890",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  }
]

export const mockStockEventsDuplicateID = [
  {
    Action: "Market buy",
    Time: new Date("2023-03-01T10:00:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 2,
    PriceShare: 150.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "",
    CurrencyResult: "USD",
    Total: "1500.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "12345",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  },
  {
    Action: "Market sell",
    Time: new Date("2023-01-01T14:30:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 1,
    PriceShare: 175.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "875.00",
    CurrencyResult: "USD",
    Total: "875.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "67890",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  },
  {
    Action: "Market sell",
    Time: new Date("2023-01-01T14:30:00Z"),
    ISIN: "US0378331005",
    Ticker: "AAPL",
    Name: "Apple Inc.",
    NoOfShares: 1,
    PriceShare: 175.00,
    CurrencyPriceShare: "USD",
    ExchangeRate: "1",
    Result: "875.00",
    CurrencyResult: "USD",
    Total: "875.00",
    CurrencyTotal: "USD",
    WithholdingTax: "",
    CurrencyWithholdingTax: "",
    StampDutyReserveTax: "",
    CurrencyStampDutyReserveTax: "",
    TransactionFee: "0.50",
    FinraFee: "0.10",
    Notes: "",
    ID: "67890",
    CurrencyTransactionFee: "USD",
    CurrencyFinraFee: "USD"
  }
]