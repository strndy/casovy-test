import { Share, StockEvent } from "../../types";

const TIME_TEST_DAYS = 365 * 3;


// Split the stock events into individual shares
export const organizeStockPurchases = async (csvData: StockEvent[]): Promise<Record<string, Share[]>> => {
    const holding: Record<string, Share[]> = {};
    // verify order of events
    let prevEvent: StockEvent | null = null;


    csvData.forEach((event) => {
        // verify order of events
        if (prevEvent && prevEvent.Time > event.Time) {
            throw new Error('Events are not in order');
        }
        prevEvent = event;
        // create collection of individual shares
        if (event.Action === 'Market buy' || event.Action === 'Limit buy') {
            addShareToHolding(event, holding);
        }
        // we are selling the oldest shares by czech law
        if (event.Action === 'Market sell' || event.Action === 'Limit sell') {
            markSold(holding, event);
        }
    });
    return holding;
}

const addShareToHolding = (event: StockEvent, holding: Record<string, Share[]>) => {
    for (let i = 0; i < event.NoOfShares; i++) {
        const share: Share = {
            Ticker: event.Ticker,
            BuyDate: event.Time,
            BuyPrice: event.PriceShare,
        }
        if (!holding[event.Ticker]) {
            holding[event.Ticker] = [];
        }
        holding[event.Ticker].push(share);
    }
}

const markSold = (holding: Record<string, Share[]>, event: StockEvent) => {
    const notSold = holding[event.Ticker].filter(s => !s.SellDate);
    for (let i = 0; i < event.NoOfShares; i++) {
        notSold[i].SellDate = event.Time;
    }
}
