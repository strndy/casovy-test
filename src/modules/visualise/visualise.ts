import { Share } from "../../types";

function formatDate(date: Date): string {
    return date.toLocaleDateString('cs-CZ', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
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
                result.DaysHeld = Math.round((share.SellDate.getTime() - share.BuyDate.getTime()) / (1000 * 60 * 60 * 24));
            } else {
                result.age = Math.round((new Date().getTime() - share.BuyDate.getTime()) / (1000 * 60 * 60 * 24));
                if(result.age > 365 * 3) {
                    result.passed3Years = true;
                }
            }
            return result;
        });
        
        console.table(formattedShares);
    }
}
