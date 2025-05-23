import { ReactElement, useRef, useState } from 'react';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import StatisticsChart from './StatisticsChart'; // Renommé de RevenueChart
import { LineSeriesOption } from 'echarts';

const Statistics = (): ReactElement => {
  const theme = useTheme();
  const chartRef = useRef<EChartsReactCore | null>(null);

  // Couleurs des courbes (même palette que l'original)
  const lineChartColors = [theme.palette.secondary.main, theme.palette.primary.main];

  // Données de la légende pour identifier les courbes
  const legendData = [
    { name: 'Enseignants', icon: 'circle' },
    { name: 'Élèves', icon: 'circle' },
  ];

  // Données des séries pour les deux courbes (exemple : nombres sur 8 mois)
  const seriesData: LineSeriesOption[] = [
    {
      id: 1,
      data: [18, 19, 20, 21, 22, 20, 19, 20], // Exemple : Enseignants (petites variations)
      type: 'line',
      smooth: true,
      color: lineChartColors[0],
      name: 'Enseignants',
      legendHoverLink: true,
      showSymbol: true,
      symbolSize: 12,
      lineStyle: {
        width: 5,
      },
    },
    {
      id: 2,
      data: [90, 95, 100, 98, 102, 105, 100, 100], // Exemple : Élèves (plus grande échelle)
      type: 'line',
      smooth: true,
      color: lineChartColors[1],
      name: 'Élèves',
      legendHoverLink: true,
      showSymbol: false,
      symbolSize: 12,
      lineStyle: {
        width: 5,
      },
    },
  ];

  // Fonction pour basculer la sélection dans la légende
  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  // État pour suivre l'activation/désactivation des courbes
  const [statsType, setStatsType] = useState<any>({
    'Enseignants': false,
    'Élèves': false,
  });

  // Fonction pour basculer l'état d'une courbe
  const toggleClicked = (name: string) => {
    setStatsType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <Stack
      bgcolor="common.white"
      borderRadius={5}
      minHeight={460}
      height={1}
      mx="auto"
      boxShadow={theme.shadows[4]}
    >
      <Stack
        direction={{ sm: 'row' }}
        justifyContent={{ sm: 'space-between' }}
        alignItems={{ sm: 'center' }}
        gap={2}
        padding={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Statistiques
        </Typography>
        <Stack direction="row" gap={2}>
          {Array.isArray(seriesData) &&
            seriesData.map((dataItem, index) => (
              <Button
                key={dataItem.id}
                variant="text"
                onClick={() => {
                  toggleClicked(dataItem.name as string);
                  onChartLegendSelectChanged(dataItem.name as string);
                }}
                sx={{
                  justifyContent: 'flex-start',
                  p: 0,
                  borderRadius: 1,
                  opacity: statsType[`${dataItem.name}`] ? 0.5 : 1,
                }}
                disableRipple
              >
                <Stack direction="row" alignItems="center" gap={1} width={1}>
                  <Box
                    sx={{
                      width: 13,
                      height: 13,
                      bgcolor: statsType[`${dataItem.name}`]
                        ? 'action.disabled'
                        : lineChartColors[index],
                      borderRadius: 400,
                    }}
                  ></Box>
                  <Typography variant="body2" color="text.secondary" flex={1} textAlign={'left'}>
                    {dataItem.name}
                  </Typography>
                </Stack>
              </Button>
            ))}
        </Stack>
      </Stack>
      <Box flex={1}>
        <StatisticsChart
          chartRef={chartRef}
          sx={{ minHeight: 1 }}
          seriesData={seriesData}
          legendData={legendData}
          colors={lineChartColors}
        />
      </Box>
    </Stack>
  );
};

export default Statistics;










// import { ReactElement, useRef, useState } from 'react';
// import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
// import EChartsReactCore from 'echarts-for-react/lib/core';
// import RevenueChart from './RevenueChart';
// import { LineSeriesOption } from 'echarts';

// const Revenue = (): ReactElement => {
//   const theme = useTheme();
//   const chartRef = useRef<EChartsReactCore | null>(null);

//   const lineChartColors = [theme.palette.secondary.main, theme.palette.primary.main];

//   const legendData = [
//     { name: 'Google ads', icon: 'circle' },
//     { name: 'Facebook ads', icon: 'circle' },
//   ];

//   const seriesData: LineSeriesOption[] = [
//     {
//       id: 1,
//       data: [65, 210, 175, 140, 105, 20, 120, 20],
//       type: 'line',
//       smooth: true,
//       color: lineChartColors[0],
//       name: 'Google ads',
//       legendHoverLink: true,
//       showSymbol: true,
//       symbolSize: 12,
//       lineStyle: {
//         width: 5,
//       },
//     },
//     {
//       id: 2,
//       data: [20, 125, 100, 30, 150, 300, 90, 180],
//       type: 'line',
//       smooth: true,
//       color: lineChartColors[1],
//       name: 'Facebook ads',
//       legendHoverLink: true,
//       showSymbol: false,
//       symbolSize: 12,
//       lineStyle: {
//         width: 5,
//       },
//     },
//   ];

//   const onChartLegendSelectChanged = (name: string) => {
//     if (chartRef.current) {
//       const instance = chartRef.current.getEchartsInstance();
//       instance.dispatchAction({
//         type: 'legendToggleSelect',
//         name: name,
//       });
//     }
//   };

//   const [revenueAdType, setRevenueAdType] = useState<any>({
//     'Google ads': false,
//     'Facebook ads': false,
//   });

//   const toggleClicked = (name: string) => {
//     setRevenueAdType((prevState: any) => ({
//       ...prevState,
//       [name]: !prevState[name],
//     }));
//   };

//   return (
//     <Stack
//       bgcolor="common.white"
//       borderRadius={5}
//       minHeight={460}
//       height={1}
//       mx="auto"
//       boxShadow={theme.shadows[4]}
//     >
//       <Stack
//         direction={{ sm: 'row' }}
//         justifyContent={{ sm: 'space-between' }}
//         alignItems={{ sm: 'center' }}
//         gap={2}
//         padding={3.75}
//       >
//         <Typography variant="h5" color="text.primary">
//           Revenue
//         </Typography>
//         <Stack direction="row" gap={2}>
//           {Array.isArray(seriesData) &&
//             seriesData.map((dataItem, index) => (
//               <Button
//                 key={dataItem.id}
//                 variant="text"
//                 onClick={() => {
//                   toggleClicked(dataItem.name as string);
//                   onChartLegendSelectChanged(dataItem.name as string);
//                 }}
//                 sx={{
//                   justifyContent: 'flex-start',
//                   p: 0,
//                   borderRadius: 1,
//                   opacity: revenueAdType[`${dataItem.name}`] ? 0.5 : 1,
//                 }}
//                 disableRipple
//               >
//                 {' '}
//                 <Stack direction="row" alignItems="center" gap={1} width={1}>
//                   <Box
//                     sx={{
//                       width: 13,
//                       height: 13,
//                       bgcolor: revenueAdType[`${dataItem.name}`]
//                         ? 'action.disabled'
//                         : lineChartColors[index],
//                       borderRadius: 400,
//                     }}
//                   ></Box>
//                   <Typography variant="body2" color="text.secondary" flex={1} textAlign={'left'}>
//                     {dataItem.name}
//                   </Typography>
//                 </Stack>
//               </Button>
//             ))}
//         </Stack>
//       </Stack>
//       <Box flex={1}>
//         <RevenueChart
//           chartRef={chartRef}
//           sx={{ minHeight: 1 }}
//           seriesData={seriesData}
//           legendData={legendData}
//           colors={lineChartColors}
//         />
//       </Box>
//     </Stack>
//   );
// };

// export default Revenue;
