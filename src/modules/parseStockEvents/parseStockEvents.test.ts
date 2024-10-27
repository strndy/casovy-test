import { visualiseCSV, visualiseExpiration } from "../visualise/visualise";
import { organizeStockPurchases } from "./parseStockEvents";
import { mockStockEvents, mockStockEventsDuplicateID, mockStockEventsOutOfOrder } from "./parseStockEvents.mock";
import { mockStockEventsFractional } from "./parseStockEventsFractional.mock";



describe('parseStockEvents', () => {
    return;
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
        const result = await organizeStockPurchases(mockStockEventsFractional);
        console.table(result['AAPL']);
        expect(result).toBeDefined();
        expect(result['AAPL']).toBeDefined();
        
        // Verify initial fractional shares
        expect(result['AAPL'].length).toBe(3); // 2.5 shares total
        expect(result['AAPL'][0].Quantity).toBe(1);
        expect(result['AAPL'][1].Quantity).toBe(1);
        expect(result['AAPL'][2].Quantity).toBe(0.5);

        // Verify selling partial fractional share
        const soldShares = result['AAPL'].filter(s => s.SellDate);
        expect(soldShares.length).toBe(2); // 1.3 shares sold
        expect(soldShares[0].Quantity).toBe(1);
        expect(soldShares[1].Quantity).toBe(0.3);

        // Verify remaining shares
        const remainingShares = result['AAPL'].filter(s => !s.SellDate);
        expect(remainingShares.length).toBe(2);
        expect(remainingShares[0].Quantity).toBe(1);
        expect(remainingShares[1].Quantity).toBe(0.2); // 0.5 - 0.3 = 0.2

        expect(result).toMatchSnapshot();
    });
});
