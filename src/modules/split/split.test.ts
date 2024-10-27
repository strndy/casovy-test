import path from "path";
import fs from 'fs';

import { fetchSplits } from "./polygonAPi";
import { loadSplits, splitCache } from "./splitCache";

describe('split', () => {
    it('should cache splits', async () => {
        fs.unlinkSync(path.join(__dirname, `../../../splitDb/splits_RLGT.json`));
        
        const splits = await splitCache("RLGT", () => fetchSplits("RLGT"));
        expect(splits).toBeDefined();
        expect(splits.length).toBe(1);
        expect(splits).toMatchSnapshot();

        const splits2 = await splitCache("RLGT", () => fetchSplits("RLGT"));
        expect(splits2).toBeDefined();
        expect(splits2.length).toBe(1);
        expect(splits2).toMatchSnapshot();
    });

    it('should load multiple stocks splits from polygon', async () => {
        const splits = await loadSplits(["TSLA", "AAPL"]);
        expect(splits).toBeDefined();
        expect(splits.length).toBe(2);
        expect(splits).toMatchSnapshot();
    });
});
