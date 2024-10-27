import { ExitStatus } from "typescript";
import { Share, Event, Split } from "../../types";

const TIME_TEST_DAYS = 365 * 3;

// Split the stock events into individual shares
export const organizeStockPurchases = async (csvData: Event[], ignoreStocks: string[] = []): Promise<Record<string, Share[]>> => {
    const holdings: Record<string, Share[]> = {};
    // verify order of events
    let prevEvent: Event | null = null;

    // verify there are no duplicate events by ID
    verifyNoDuplicateEvents(csvData);

    csvData.forEach((event) => {
        if(ignoreStocks.includes(event.Ticker)) {
            return;
        }
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

        console.table(holdings[event.Ticker]);
        console.log('Total shares:', holdings[event.Ticker].reduce((sum, share) => sum + share.Quantity, 0));
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
    // Handle full shares
    const fullShares = Math.floor(event.NoOfShares);
    const fraction = event.NoOfShares - fullShares;

    // Add full shares individually
    for (let i = 0; i < fullShares; i++) {
        const share: Share = {
            Ticker: event.Ticker,
            Quantity: 1,
            BuyDate: new Date(event.Time),
            BuyPrice: event.PriceShare,
            BuyEventId: event.ID,
            Notes: event.Notes
        }
        if (!holdings[event.Ticker]) {
            holdings[event.Ticker] = [];
        }
        holdings[event.Ticker].push(share);
    }

    // Add fractional share if exists
    if (fraction > 0) {
        const fractionalShare: Share = {
            Ticker: event.Ticker,
            Quantity: fraction,
            BuyDate: new Date(event.Time),
            BuyPrice: event.PriceShare,
            BuyEventId: event.ID,
            Notes: `${event.Notes} (fractional)`
        }
        if (!holdings[event.Ticker]) {
            holdings[event.Ticker] = [];
        }
        holdings[event.Ticker].push(fractionalShare);
    }
}

const markSold = (holdings: Record<string, Share[]>, event: Event) => {
    if(!holdings[event.Ticker]) {
        console.warn(`No shares to sell for ${event.Ticker}. Fractional is not supported.`);
        return;
    }
    const notSold = holdings[event.Ticker].filter(s => !s.SellDate);
    
    let remainingToSell = event.NoOfShares;
    let index = 0;
    
    while (remainingToSell > 0 && index < notSold.length) {
        const selling = notSold[index];
        if (!selling) {
            throw new Error(`No shares to sell for ${event.Ticker}`);
        }
        if (selling.SellDate) {
            throw new Error(`Share ${index} already sold`);
        }
        // Handle fractional shares
        if (selling.Quantity < 1) {
            if (remainingToSell < selling.Quantity) {
                // Split the fractional share
                const remainingShare = {
                    ...selling,
                    Quantity: selling.Quantity - remainingToSell
                };
                
                selling.Quantity = remainingToSell;
                selling.SellDate = new Date(event.Time);
                selling.SellPrice = event.PriceShare;
                selling.SellEventId = event.ID;
                
                notSold.splice(index + 1, 0, remainingShare);
                remainingToSell = 0;
            } else {
                // Sell entire fractional share
                selling.SellDate = new Date(event.Time);
                selling.SellPrice = event.PriceShare;
                selling.SellEventId = event.ID;
                remainingToSell -= selling.Quantity;
                index++;
            }
            continue;
        }

        // Handle case where we need to partially sell a share
        if (remainingToSell < selling.Quantity) {
            // Split the share into sold and remaining portions
            const remainingShare = {
                ...selling,
                Quantity: selling.Quantity - remainingToSell
            };
            
            selling.Quantity = remainingToSell;
            selling.SellDate = new Date(event.Time);
            selling.SellPrice = event.PriceShare;
            selling.SellEventId = event.ID;
            
            // Insert the remaining unsold portion
            notSold.splice(index + 1, 0, remainingShare);
            remainingToSell = 0;
        } else {
            // Sell entire share
            selling.SellDate = new Date(event.Time);
            selling.SellPrice = event.PriceShare;
            selling.SellEventId = event.ID;
            remainingToSell -= selling.Quantity;
            index++;
        }
    }

    if (remainingToSell > 0) {
        console.warn(`Could not sell all requested shares for ${event.Ticker}. Remaining: ${remainingToSell}`);
    }
}

const processSplit = (e: Event, holdings: Record<string, Share[]>) => {

    if(!holdings[e.Ticker]) {
        // no shares to split, ignore
        return;
    }
    if (e.SplitFrom > 1){
        console.error(e);
        throw new Error('Split from is greater than 1, not implemented');
    }
    // console.log(`Splitting ${e.Ticker} ${e.SplitTo}x on ${e.Time} from ${holdings[e.Ticker].length} shares`);
    const newHolding : Share[] = [];
    const sold = holdings[e.Ticker].filter(s => s.SellDate);
    const notSold = holdings[e.Ticker].filter(s => !s.SellDate);

    for (let i = 0; i < notSold.length; i++) {
        const oldShare = holdings[e.Ticker][i];
        const share = {
            // deep cloning to break references
            ...JSON.parse(JSON.stringify(oldShare)),
            BuyPrice: oldShare.BuyPrice / e.SplitTo,
            Notes: `Split ${e.SplitTo}x on ${e.Time.toISOString().split('T')[0]}, ${oldShare.Notes}`
        }
        for (let j = 0; j < e.SplitTo; j++) {
            newHolding.push(share);
        }
    }
    holdings[e.Ticker] = [
        // deep cloning to break references
        ...JSON.parse(JSON.stringify(sold)),
        ...JSON.parse(JSON.stringify(newHolding))
    ];
    
    // console.log(`Splitting to ${e.Ticker} ${e.SplitTo}x on ${e.Time.toISOString().split('T')[0]} to ${holdings[e.Ticker].length} shares`);
}

