import { Share, Event } from "../../types";

const TIME_TEST_DAYS = 365 * 3;

// Split the stock events into individual shares
export const organizeStockPurchases = async (csvData: Event[]): Promise<Record<string, Share[]>> => {
    const holding: Record<string, Share[]> = {};
    // verify order of events
    let prevEvent: Event | null = null;

    // verify there are no duplicate events by ID
    verifyNoDuplicateEvents(csvData);

    csvData.forEach((event) => {
        // verify order of events
        if (prevEvent && prevEvent.Time > event.Time) {
            throw new Error('Events are not in order');
        }
        prevEvent = event;
        // create collection of individual shares
        if (event.Action.endsWith('buy')) {
            addShareToHolding(event, holding);
        }
        // we are selling the oldest shares by czech law
        if (event.Action.endsWith('sell')) {
            markSold(holding, event);
        }
    });
    return holding;
}

const verifyNoDuplicateEvents = (events: Event[]) => {
    const ids = events
        .filter(e => e.Action.startsWith('Market') || e.Action.startsWith('Limit'))
        .map(e => e.ID);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
        throw new Error('Duplicate events by ID');
    }
}

const addShareToHolding = (event: Event, holding: Record<string, Share[]>) => {
    for (let i = 0; i < event.NoOfShares; i++) {
        const share: Share = {
            Ticker: event.Ticker,
            BuyDate: event.Time,
            BuyPrice: event.PriceShare,
            BuyEventId: event.ID,
        }
        if (!holding[event.Ticker]) {
            holding[event.Ticker] = [];
        }
        holding[event.Ticker].push(share);
    }
}

const markSold = (holding: Record<string, Share[]>, event: Event) => {
    if(!holding[event.Ticker]) {
        console.warn(`No shares to sell for ${event.Ticker}. Fractional is not supported.`);
        return;
    }
    const notSold = holding[event.Ticker].filter(s => !s.SellDate);
    
    for (let i = 0; i < event.NoOfShares; i++) {
        if(!notSold[i]) {
            console.warn(`No shares to sell for ${event.Ticker}. Fractional is not supported.`);
            return;
        }
        notSold[i].SellDate = event.Time;
        notSold[i].SellPrice = event.PriceShare;
        notSold[i].SellEventId = event.ID;
    }
}
