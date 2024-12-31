import { useEffect, useRef } from 'react';
import { Title } from '@mantine/core';
import * as echarts from 'echarts';
import { AverageYield } from '../types/agriculture';
import { BarChart } from 'lucide-react'; 

interface YieldChartProps {
  data: AverageYield[];
}

export function YieldChart({ data }: YieldChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Average Crop Yield (Kg/Ha)',
        textStyle: {
          color: '#2d3748',
          fontWeight: '500', 
          fontSize: 16, 
          letterSpacing: '0.5px',
          fontFamily: "Nunito"
        },
        left: 'center',
        top: '5%',
      },
      
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params: any) {
          const { name, value } = params[0];
          return `${name}: ${value.toFixed(2)} Kg/Ha`; // Display value with 2 decimals
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e5e7eb',
        textStyle: {
          color: '#2d3748',
          fontFamily: "Nunito"
        },
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '20%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.crop),
        axisLabel: {
          rotate: 45,
          color: '#4a5568',
          fontSize: 12,
          interval: 0, // To ensure all labels are visible
          fontFamily: "Nunito"
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#4a5568',
          formatter: '{value} Kg/Ha', // Removed the name label
        },
        splitLine: {
          lineStyle: {
            color: '#e5e7eb',
          },
        },
      },
      series: [
        {
          type: 'bar',
          data: data.map((item) => ({
            value: item.avgYield,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#34d399' },
                { offset: 1, color: '#10b981' },
              ]),
            },
          })),
          barWidth: '60%',
          label: {
            show: false, // Removed label from top of bars
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto h-auto">
      <Title
        order={2}
        className="text-gray-800 font-bold text-xl md:text-2xl mb-6 text-center flex items-center justify-center gap-3"
      >
        <BarChart size={28} className="text-green-500" /> {/* BarChart icon from lucide-react */}
        Crop Yield Analysis
      </Title>
      <div
        ref={chartRef}
        className="w-full h-[500px] transition-all duration-300"
      />
    </div>
  );
}
