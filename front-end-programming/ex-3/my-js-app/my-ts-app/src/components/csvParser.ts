import Papa from 'papaparse';

export const parseCSV = (csvString: string): any[] => {
  const result = Papa.parse(csvString, { header: true });
  return result.data;
};
