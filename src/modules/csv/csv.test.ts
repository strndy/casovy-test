import { readCSV } from "./csv";

describe('readCSV', () => {
  it('should read the CSV file', async () => {
    const result = await readCSV('./test/testfile1.csv');
    expect(result).toBeDefined();
    expect(result[0].Time).toBeInstanceOf(Date);
    expect(result[0].Action).toBe('Deposit');
    expect(result[1].Action).toBe('Market buy');
    // checks snapshot
    expect(result).toMatchSnapshot();
  }); 
});
