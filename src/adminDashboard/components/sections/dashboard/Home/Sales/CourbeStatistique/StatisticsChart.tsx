import { SxProps, useTheme } from '@mui/material';
import ReactEchart from './../../../../../../components/base/ReactEchart';
import * as echarts from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { LineSeriesOption } from 'echarts';
import { useMemo } from 'react';
import { EChartsOption } from 'echarts-for-react';

type StatisticsChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  seriesData?: LineSeriesOption[];
  legendData?: any;
  colors?: string[];
  sx?: SxProps;
};

const StatisticsChart = ({ chartRef, seriesData, legendData, colors, ...rest }: StatisticsChartProps) => {
  const theme = useTheme();

  const option: EChartsOption = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        data: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
        ], // Mois en français
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: theme.palette.divider,
            width: 1,
            type: 'dashed',
          },
        },
        axisLabel: {
          show: true,
          padding: 30,
          color: theme.palette.text.secondary,
          formatter: (value: any) => value.slice(0, 3), // Abrège les mois (ex. : "Jan")
          fontFamily: theme.typography.body2.fontFamily,
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        max: 150, // Ajusté pour les élèves (max 105 dans les données)
        splitNumber: 5, // Plus de divisions pour plus de précision
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: theme.palette.text.secondary,
          align: 'center',
          padding: [0, 20, 0, 0],
          fontFamily: theme.typography.body2.fontFamily,
        },
        splitLine: {
          interval: 5,
          lineStyle: {
            color: theme.palette.divider,
            width: 1,
            type: 'dashed',
          },
        },
      },
      grid: {
        left: 60,
        right: 30,
        top: 30,
        bottom: 90,
      },
      legend: {
        show: false, // Légende gérée par les boutons dans Statistics.tsx
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        valueFormatter: (value: any) => value.toFixed(0), // Affiche les nombres sans devise
      },
      series: seriesData,
    }),
    [theme],
  );

  return <ReactEchart ref={chartRef} echarts={echarts} option={option} {...rest} />;
};

export default StatisticsChart;