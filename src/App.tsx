import { MantineProvider } from '@mantine/core';
import { agricultureData } from './data/mockData';
import {
  processTableData,
  processChartData,
  extractYear,
} from './utils/dataProcessing';
import { DataTable } from './components/DataTable';
import { YieldChart } from './components/YieldChart';
import { Sprout, BarChart2 } from 'lucide-react';

function App() {
  const tableData = processTableData(agricultureData);
  const chartData = processChartData(agricultureData);

  // Calculate the total number of unique crops and years dynamically
  const totalCrops = new Set(agricultureData.map((item) => item['Crop Name']))
    .size;
  const totalYears = new Set(
    agricultureData.map((item) => extractYear(item.Year))
  ).size;

  return (
    <MantineProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sprout className="text-emerald-600" size={36} />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Agricultural Dashboard
              </h1>
            </div>
            <p className="text-gray-600 text-base md:text-lg">
              Indian Crop Production Analysis (1950-2020)
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 text-emerald-600 mb-2">
                <Sprout size={20} />
                <h3 className="font-medium">Total Crops</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalCrops}</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <BarChart2 size={20} />
                <h3 className="font-medium">Years Analyzed</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800">{totalYears}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid gap-8">
            <div className="bg-white/80 backdrop-blur rounded-xl shadow-md p-4 md:p-6">
              <DataTable data={tableData} />
            </div>
            <div className="bg-white/80 backdrop-blur rounded-xl shadow-md  md:p-6 ">
              <YieldChart data={chartData} />
            </div>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
