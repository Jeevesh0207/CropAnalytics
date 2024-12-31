# Agriculture Data Visualization

This project visualizes Indian Agriculture data using TypeScript, React, Mantine, and Apache ECharts.

## Features

- Table showing yearly crop production extremes
- Bar chart displaying average crop yields (1950-2020)

## Tech Stack

- TypeScript
- React
- Vite
- Mantine v7
- Apache ECharts

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── DataTable.tsx    # Mantine table component
│   └── YieldChart.tsx   # ECharts visualization
├── data/
│   └── mockData.ts      # Sample agriculture data
├── types/
│   └── agriculture.ts   # TypeScript interfaces
├── utils/
│   └── dataProcessing.ts # Data transformation utilities
└── App.tsx              # Main application component
```

## Screenshots

[Screenshots will be added after deployment]

## Notes

- Missing values in the dataset are treated as 0
- The table shows the crops with maximum and minimum production for each year
- The bar chart displays the average yield of crops from 1950 to 2020