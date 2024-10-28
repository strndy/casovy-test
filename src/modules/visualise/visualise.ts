import { Event, Share } from "../../types";

function formatDate(date: Date): string {
    return date ? date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }) : '';
}

export const visualiseExpiration = (holding: Record<string, Share[]>) => {
    for (const [ticker, shares] of Object.entries(holding)) {
        console.log(`\nShares for ${ticker}:`);
        
        const formattedShares = shares.map(share => {
            const result : any = ({
            ...share,
            BuyDate: formatDate(new Date(share.BuyDate))
            });
            if (share.SellDate) {
                result.SellDate = formatDate(new Date(share.SellDate));

                if(share.SellDate instanceof Date) {
                    result.DaysHeld = Math.round((share.SellDate.getTime() - share.BuyDate.getTime()) / (1000 * 60 * 60 * 24));
                } else {
                    console.error(share);
                    // throw new Error('SellDate is not a Date');
            
               }
            } else {
                console.log(share);
                result.age = Math.round((new Date().getTime() - share.BuyDate.getTime()) / (1000 * 60 * 60 * 24));
                if(result.age > 365 * 3) {
                    result.passed3Years =remaining fraction true;
                }
                result.monthsTill3Years = Math.round((365 * 3 - result.age) / 30);
            }
            return result;
        });
        
        console.table(formattedShares);
    }
}

export const visualiseCSV = (csv: Event[]) => {
    const output = csv.map(row => {
        return {
            // ...row,
            Ticker: row.Ticker,
            NoOfShares: row.NoOfShares,
            ID: row.ID,
            Time: formatDate(row.Time),
            Action: row.Action,
            Notes: row.Notes,
            
        };
    });
    console.table(output);
}

