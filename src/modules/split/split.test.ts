import { loadSplitFromPolygon, loadSplitsFromPolygon } from "./split";
import { cacheSplit } from "./splitCache";

describe('split', () => {
    it('should load splits', async () => {
        const splits = await loadSplitFromPolygon("RLGT");
        expect(splits).toBeDefined();
        expect(splits[0].results.length).toBe(1);
        expect(splits).toMatchSnapshot();
    });
    it('should cache splits', async () => {
        const splits = await cacheSplit("RLGT", () => loadSplitFromPolygon("KKT"));
        expect(splits).toBeDefined();
        console.log(splits);
    });
});
