import { readCSV } from "./csv";

describe('readCSV', () => {
  it('should read the CSV file', async () => {
    const result = await readCSV('./test/testfile1.csv');
    console.log(result);
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    // Add more specific assertions based on the expected structure of your CSV data
  });
});
