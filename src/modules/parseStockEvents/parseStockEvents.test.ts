import { organizeStockPurchases } from "./parseStockEvents";
import { mockStockEvents, mockStockEventsDuplicateID, mockStockEventsOutOfOrder } from "./parseStockEvents.mock";



describe('parseStockEvents', () => {
    it('should have all the stocks and marked sold shares', async () => {
        const result = await organizeStockPurchases(mockStockEvents);
        expect(result).toBeDefined();
        expect(result).toMatchSnapshot();
        expect(result['AAPL'].length).toBe(4);
        expect(result['AAPL'].filter(s => !s.SellDate).length).toBe(2);
    });

    it('should throw error if events are out of order', async () => {
        await expect(organizeStockPurchases(mockStockEventsOutOfOrder)).rejects.toThrow('Events are not in order');
    });
    
    it('should throw error if there are duplicate events by ID', async () => {
        await expect(organizeStockPurchases(mockStockEventsDuplicateID)).rejects.toThrow('Duplicate events by ID');
    });
});
