import { visualiseCSV, visualiseExpiration } from "../visualise/visualise";
import { organizeStockPurchases } from "./parseStockEvents";
import { mockStockEvents, mockStockEventsDuplicateID, mockStockEventsOutOfOrder } from "./parseStockEvents.mock";
import { mockStockEventsFractional, mockStockEventsFractional2, mockStockEventsFractional3 } from "./parseStockEventsFractional.mock";



describe('parseStockEvents', () => {
    it('should have all the stocks and marked sold shares', async () => {
        // visualiseCSV(mockStockEvents);
        // expect(mockStockEvents.filter(m=>m.Action.endsWith('sell')).length).toBe(2);

        const result = await organizeStockPurchases(mockStockEvents);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
        expect(result['AAPL'].length).toBe(5);
        expect(result['AAPL'].filter(s => !s.SellDate).length).toBe(3);

    });

    it('should throw error if events are out of order', async () => {
        await expect(organizeStockPurchases(mockStockEventsOutOfOrder)).rejects.toThrow('Events are not in order');
    });
    
    it('should throw error if there are duplicate events by ID', async () => {
        await expect(organizeStockPurchases(mockStockEventsDuplicateID)).rejects.toThrow('Duplicate events by ID');
    });
});

describe('parseStockEventsFractional', () => {
    it('should handle fractional shares', async () => {
        const result = await organizeStockPurchases(mockStockEventsFractional as any);
        // Test scenario:
        // buy 0.5
        // split 2:1, we have 2x 0.5
        // buy 0.5 we have 3x 0.5
        // sell 1.5, we have 0 leftt, 3 fractional peices overall
        console.table(result['AAPL']);
        expect(result).toBeDefined();
        expect(result['AAPL']).toBeDefined();
        expect(result).toMatchSnapshot();
    });
    it('should handle fractional shares 2', async () => {
        const result = await organizeStockPurchases(mockStockEventsFractional2 as any); 
        expect(result).toBeDefined();
        expect(result['AAPL'].length).toBe(6);
        const sumAll = result['AAPL'].reduce((sum, share) => sum + share.Quantity, 0);
        expect(sumAll).toBe(1.5066);
        const sumSold = result['AAPL'].filter(s => s.SellDate).reduce((sum, share) => sum + share.Quantity, 0);
        expect(sumSold).toBe(1.346);
        console.table(result['AAPL']);
        // expect(result).toMatchSnapshot();
    });

    it('should handle fractional shares 3', async () => {
        const result = await organizeStockPurchases(mockStockEventsFractional3 as any);
        expect(result).toBeDefined();
        console.table(result['AAPL']);
        expect(result['AAPL'].length).toBe(6);
        const sumAll = result['AAPL'].reduce((sum, share) => sum + share.Quantity, 0);
        expect(sumAll).toBe(4.4);
        const sumNotSold = result['AAPL'].filter(s => !s.SellDate).reduce((sum, share) => sum + share.Quantity, 0);
        expect(sumNotSold).toBe(1.06);
    });
});
