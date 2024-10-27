import { Split } from "../../types";
import { mockStockEvents } from "../parseStockEvents/parseStockEvents.mock";
import { visualiseCSV, visualiseExpiration } from "../visualise/visualise";
import { enhanceCSVWithSplits } from "./enhace";

const mockSplits : Split[][] = [
    [
        {
            id: '1',
            ticker: 'AAPL',
            split_from: 1,
            split_to: 3,
            execution_date: new Date('2023-01-15')
        }
    ]
    
];

describe('enhance', () => {
    it('should enhance csv with splits', () => { 
        
        const enhanced = enhanceCSVWithSplits(mockStockEvents, mockSplits);
        visualiseCSV(enhanced);
        expect(enhanced).toBeDefined();
        expect(enhanced).toMatchSnapshot();
    });
});
