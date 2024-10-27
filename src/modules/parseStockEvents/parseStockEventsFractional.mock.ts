

export const mockStockEventsFractional = [
    {
      Action: "Market buy",
      Time: new Date("2023-01-01T10:00:00Z"),
      ISIN: "US0378331005", 
      Ticker: "AAPL",
      Name: "Apple Inc.",
      NoOfShares: 0.5,
      PriceShare: 150.00,
      CurrencyPriceShare: "USD",
      Notes: "before split",
      ID: "111111"
    },
    {
      Action: "Split",
      Time: new Date("2023-04-01T00:00:00Z"),
      ISIN: "US0378331005",
      Ticker: "AAPL", 
      Name: "Apple Inc.",
      NoOfShares: undefined,
      PriceShare: undefined,
      CurrencyPriceShare: "USD",
      Notes: "2x stock split",
      ID: "111113",
      SplitFrom: 1,
      SplitTo: 2
    },
    {
      Action: "Market buy",
      Time: new Date("2023-05-01T14:30:00Z"),
      ISIN: "US0378331005",
      Ticker: "AAPL",
      Name: "Apple Inc.",
      NoOfShares: 0.5,
      PriceShare: 200.00,
      CurrencyPriceShare: "USD",
      Notes: "bought after split",
      ID: "111114"
    },
    {
      Action: "Market sell",
      Time: new Date("2023-06-01T14:30:00Z"),
      ISIN: "US0378331005",
      Ticker: "AAPL",
      Name: "Apple Inc.",
      NoOfShares: 1.5,
      PriceShare: 175.00,
      CurrencyPriceShare: "USD",
      Result: "875.00",
      CurrencyResult: "USD",
      Notes: "sell after split",
      ID: "111115"
    },
  ];

  export const mockStockEventsFractional2 = [
    {
      Action: "Market buy", 
      Time: new Date("2023-01-01T10:00:00Z"),
      ISIN: "US0378331005",
      Ticker: "AAPL",
      Name: "Apple Inc.",
      NoOfShares: 0.3,
      PriceShare: 150.00,
      CurrencyPriceShare: "USD",
      Notes: "before split",
      ID: "111111"
    },
    {
        Action: "Market buy", 
        Time: new Date("2023-01-01T10:00:00Z"),
        ISIN: "US0378331005",
        Ticker: "AAPL",
        Name: "Apple Inc.",
        NoOfShares: 0.24,
        PriceShare: 150.00,
        CurrencyPriceShare: "USD",
        Notes: "before split",
        ID: "111112"
      },
      {
        Action: "Market buy", 
        Time: new Date("2023-01-01T10:00:00Z"),
        ISIN: "US0378331005",
        Ticker: "AAPL",
        Name: "Apple Inc.",
        NoOfShares: 0.18,
        PriceShare: 150.00,
        CurrencyPriceShare: "USD",
        Notes: "before split",
        ID: "111113"
      },
      {
        Action: "Market buy", 
        Time: new Date("2023-01-01T10:00:00Z"),
        ISIN: "US0378331005",
        Ticker: "AAPL",
        Name: "Apple Inc.",
        NoOfShares: 0.12,
        PriceShare: 150.00,
        CurrencyPriceShare: "USD",
        Notes: "before split",
        ID: "111114"
    },
    {
      Action: "Market buy",
      Time: new Date("2023-05-01T14:30:00Z"),
      ISIN: "US0378331005",
      Ticker: "AAPL",
      Name: "Apple Inc.",
      NoOfShares: 0.6666,
      PriceShare: 200.00,
      CurrencyPriceShare: "USD",
      Notes: "bought after split",
      ID: "111115"
    },
    {
      Action: "Market sell",
      Time: new Date("2023-06-01T14:30:00Z"),
      ISIN: "US0378331005",
      Ticker: "AAPL",
      Name: "Apple Inc.",
      NoOfShares: 1.346,
      PriceShare: 175.00,
      CurrencyPriceShare: "USD",
      Result: "875.00",
      CurrencyResult: "USD",
      Notes: "sell after split",
      ID: "111116"
    },
  ]

  export const mockStockEventsFractional3 = [
    {
      Action: "Market buy", 
      Time: new Date("2023-01-01T10:00:00Z"),
      ISIN: "US0378331005",
      Ticker: "AAPL",
      Name: "Apple Inc.",
      NoOfShares: 0.4,
      PriceShare: 150.00,
      CurrencyPriceShare: "USD",
      Notes: "before split",
      ID: "111111"
    },
    {
        Action: "Market buy", 
        Time: new Date("2023-01-01T10:00:00Z"),
        ISIN: "US0378331005",
        Ticker: "AAPL",
        Name: "Apple Inc.",
        NoOfShares: 4,
        PriceShare: 150.00,
        CurrencyPriceShare: "USD",
        Notes: "before split",
        ID: "111112"
      },    
      {
        Action: "Market sell",
        Time: new Date("2023-06-01T14:30:00Z"),
        ISIN: "US0378331005",
        Ticker: "AAPL",
        Name: "Apple Inc.",
        NoOfShares: 3.34,
        PriceShare: 175.00,
        CurrencyPriceShare: "USD",
        Result: "875.00",
        CurrencyResult: "USD",
        Notes: "sell after split",
        ID: "111116"
    },
  ]