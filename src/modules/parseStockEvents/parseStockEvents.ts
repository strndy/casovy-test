import { Share, Event, Split } from "../../types";

const TIME_TEST_DAYS = 365 * 3;

// Split the stock events into individual shares
export const organizeStockPurchases = async (csvData: Event[]): Promise<Record<string, Share[]>> => {
    const holdings: Record<string, Share[]> = {};
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
            addShareToHoldings(event, holdings);
        }

        // process splits
        if (event.Action.startsWith('Split')) {
            processSplit(event, holdings);
        }

            // we are selling the oldest shares by czech law
        if (event.Action.endsWith('sell')) {
            markSold(holdings, event);
        }
    });



    return holdings;
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

const addShareToHoldings = (event: Event, holdings: Record<string, Share[]>) => {
    for (let i = 0; i < event.NoOfShares; i++) {
        const share: Share = {
            Ticker: event.Ticker,
            BuyDate: event.Time,
            BuyPrice: event.PriceShare,
            BuyEventId: event.ID,
        }
        if (!holdings[event.Ticker]) {
            holdings[event.Ticker] = [];
        }
        holdings[event.Ticker].push(share);
    }
}

const markSold = (holdings: Record<string, Share[]>, event: Event) => {
    if(!holdings[event.Ticker]) {
        console.warn(`No shares to sell for ${event.Ticker}. Fractional is not supported.`);
        return;
    }
    const notSold = holdings[event.Ticker].filter(s => !s.SellDate);
    
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

const processSplit = (event: Event, holdings: Record<string, Share[]>) => {
    holdings[event.Ticker] = holdings[event.Ticker].map(share => {
        return {
            ...share,
            SplitFrom: event.SplitFrom,
            SplitTo: event.SplitTo
        }
    });
}

