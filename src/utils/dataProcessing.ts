import { CropData, AggregatedData, AverageYield } from '../types/agriculture';

const extractYear = (yearString: string): string => {
  return yearString.match(/\d{4}/)?.[0] || yearString;
};

export { extractYear };

const parseNumericValue = (value: string | number): number => {
  if (value === '') return 0;
  return typeof value === 'string' ? parseFloat(value) || 0 : value;
};

export const processTableData = (data: CropData[]): AggregatedData[] => {
  const yearGroups = data.reduce((acc, curr) => {
    const year = extractYear(curr.Year);
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(curr);
    return acc;
  }, {} as Record<string, CropData[]>);

  return Object.entries(yearGroups).map(([year, crops]) => {
    const validCrops = crops.filter(
      (crop) => crop['Crop Production (UOM:t(Tonnes))'] !== ''
    );

    const maxCrop = validCrops.reduce((max, curr) =>
      parseNumericValue(curr['Crop Production (UOM:t(Tonnes))']) >
      parseNumericValue(max['Crop Production (UOM:t(Tonnes))'])
        ? curr
        : max
    );

    const minCrop = validCrops.reduce((min, curr) =>
      parseNumericValue(curr['Crop Production (UOM:t(Tonnes))']) <
      parseNumericValue(min['Crop Production (UOM:t(Tonnes))'])
        ? curr
        : min
    );

    return {
      year,
      maxCrop: maxCrop['Crop Name'],
      minCrop: minCrop['Crop Name'],
    };
  });
};

export const processChartData = (data: CropData[]): AverageYield[] => {
  const cropGroups = data.reduce((acc, curr) => {
    const yield_value = curr['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'];
    if (yield_value !== '') {
      if (!acc[curr['Crop Name']]) {
        acc[curr['Crop Name']] = [];
      }
      acc[curr['Crop Name']].push(parseNumericValue(yield_value));
    }
    return acc;
  }, {} as Record<string, number[]>);

  return Object.entries(cropGroups).map(([crop, yields]) => ({
    crop,
    avgYield: yields.reduce((sum, curr) => sum + curr, 0) / yields.length,
  }));
};
