// import { SxProps, useTheme } from '@mui/material';
// import ReactEchart from '../../../../../../components/base/ReactEchart';
// import * as echarts from 'echarts';
// import EChartsReactCore from 'echarts-for-react/lib/core';
// import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
// import { useMemo } from 'react';
// import { EChartsOption } from 'echarts-for-react';

// type StudentsDistributionChartProps = {
//   chartRef: React.MutableRefObject<EChartsReactCore | null>;
//   seriesData?: PieDataItemOption[];
//   legendData?: any;
//   colors?: string[];
//   sx?: SxProps;
// };

// const StudentsDistributionChart = ({
//   chartRef,
//   seriesData,
//   legendData,
//   colors,
//   ...rest
// }: StudentsDistributionChartProps) => {
//   const theme = useTheme();
//   const option: EChartsOption = useMemo(
//     () => ({
//       tooltip: {
//         trigger: 'item',
//         formatter: '{b}: {c} ({d}%)', 
//       },
//       legend: {
//         show: false,
//         data: legendData,
//       },
//       series: [
//         {
//           name: 'Répartition des Élèves',
//           type: 'pie',
//           radius: ['65%', '80%'],
//           avoidLabelOverlap: true,
//           startAngle: 0,
//           itemStyle: {
//             borderRadius: 10,
//             borderColor: theme.palette.common.white,
//             borderWidth: 2,
//           },
//           color: colors,
//           label: {
//             show: false,
//             position: 'center',
//           },
//           emphasis: {
//             label: {
//               show: true,
//               fontSize: 30,
//               fontWeight: 'bold',
//               formatter: '{b}',
//             },
//           },
//           labelLine: {
//             show: false,
//           },
//           data: seriesData,
//         },
//       ],
//     }),
//     [theme],
//   );

//   return <ReactEchart ref={chartRef} option={option} echarts={echarts} {...rest} />;
// };

// export default StudentsDistributionChart;




import { SxProps, useTheme } from '@mui/material';
import ReactEchart from '../../../../../../components/base/ReactEchart';
import * as echarts from 'echarts';
import EChartsReactCore from 'echarts-for-react/lib/core';
import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import { useMemo } from 'react';
import { EChartsOption } from 'echarts-for-react';

// Interface for component props
type StudentsDistributionChartProps = {
  chartRef: React.MutableRefObject<EChartsReactCore | null>;
  seriesData?: PieDataItemOption[];
  legendData?: any;
  colors?: string[];
  sx?: SxProps;
};

const StudentsDistributionChart = ({
  chartRef,
  seriesData,
  legendData,
  colors,
  ...rest
}: StudentsDistributionChartProps) => {
  // Hook to access MUI theme
  const theme = useTheme();

  // ECharts configuration options
  const option: EChartsOption = useMemo(
    () => ({
      // Tooltip configuration
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)', // Show name, value, and percentage
      },
      // Legend configuration (hidden, managed by StudentsDistribution.tsx)
      legend: {
        show: false,
        data: legendData,
      },
      // Pie chart series
      series: [
        {
          name: 'Répartition des Élèves',
          type: 'pie',
          radius: ['65%', '80%'], // Donut chart style
          avoidLabelOverlap: true,
          startAngle: 0,
          itemStyle: {
            borderRadius: 10,
            borderColor: theme.palette.common.white,
            borderWidth: 2,
          },
          color: colors, // Apply custom colors
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 30,
              fontWeight: 'bold',
              formatter: '{b}', // Show category name on hover
            },
          },
          labelLine: {
            show: false,
          },
          data: seriesData, // Dynamic data
        },
      ],
    }),
    [theme, colors, legendData, seriesData], // Dependencies for recalculation
  );

  // Render ECharts component
  return <ReactEchart ref={chartRef} option={option} echarts={echarts} {...rest} />;
};

export default StudentsDistributionChart;