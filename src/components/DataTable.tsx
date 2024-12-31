import { Table, Title, Paper, Text } from '@mantine/core';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { AggregatedData } from '../types/agriculture';

interface DataTableProps {
  data: AggregatedData[];
}

export function DataTable({ data }: DataTableProps) {
  return (
    <Paper shadow="xl" radius="lg" className="p-0">
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <Title order={2} className="text-gray-800 font-bold">
            Yearly Crop Production Analysis
          </Title>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-400"></div>
              <Text size="sm" className="text-gray-700">
                Maximum
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-400"></div>
              <Text size="sm" className="text-gray-700">
                Minimum
              </Text>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[400px] overflow-y-auto scrollbar-hidden">
          <Table
            className="w-full"
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
          >
            <Table.Thead className='sticky top-0'>
              <Table.Tr className="bg-gradient-to-r from-purple-100 to-pink-100 text-left">
                <Table.Th className="text-gray-800 font-semibold py-4 px-6">
                  Financial Year
                </Table.Th>
                <Table.Th className="text-gray-800 font-semibold py-4 px-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-600" />
                    Maximum Production
                  </div>
                </Table.Th>
                <Table.Th className="text-gray-800 font-semibold py-4 px-6">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={16} className="text-red-600" />
                    Minimum Production
                  </div>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.map((row) => (
                <Table.Tr
                  key={row.year}
                  className="hover:bg-blue-50 transition-colors"
                  style={{ padding: '12px 0' }}
                >
                  <Table.Td className="font-medium text-gray-900 px-6 py-4">
                    {row.year}
                  </Table.Td>
                  <Table.Td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-400"></span>
                      <span className="text-gray-800">{row.maxCrop}</span>
                    </div>
                  </Table.Td>
                  <Table.Td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-400"></span>
                      <span className="text-gray-800">{row.minCrop}</span>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </Paper>
  );
}
