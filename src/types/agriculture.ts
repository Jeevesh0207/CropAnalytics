// Core data types
export interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

// Processed data types
export interface AggregatedData {
  year: string;
  maxCrop: string;
  minCrop: string;
}

export interface AverageYield {
  crop: string;
  avgYield: number;
}