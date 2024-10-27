import path from "path";
import fs from 'fs';

import { fetchSplits } from "./polygonAPi";
import { loadSplits, splitCache } from "./splitCache";

describe('split', () => {
    it('should cache splits', async () => {
        const splits = await splitCache("RLGT", () => fetchSplits("RLGT"));
        expect(splits).toBeDefined();
        expect(splits.length).toBe(1);
        expect(splits).toMatchSnapshot();

        try {   
            fs.unlinkSync(path.join(__dirname, `../../../splitDb/splits_RLGT.json`));
        } catch (error) {}

        const splits2 = await splitCache("RLGT", () => fetchSplits("RLGT"));
        expect(splits2).toBeDefined();
        expect(splits2.length).toBe(1);
        expect(splits2).toMatchSnapshot();

        const splits3 = await splitCache("RLGT", () => fetchSplits("RLGT"));
        expect(splits3).toBeDefined();
        expect(splits3.length).toBe(1);
        expect(JSON.stringify(splits)).toEqual(JSON.stringify(splits3));
        expect(splits3).not.toBe(splits); // Ensure they are not the same object reference
    });

    it('should load multiple stocks splits from polygon', async () => {
        const splits = await loadSplits(["TSLA", "AAPL"]);
        expect(splits).toBeDefined();
        expect(splits.length).toBe(2);
        expect(splits).toMatchSnapshot();
    });
});
