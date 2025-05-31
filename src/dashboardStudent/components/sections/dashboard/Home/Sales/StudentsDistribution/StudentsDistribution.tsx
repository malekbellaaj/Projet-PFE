import { ReactElement, useMemo, useRef, useState, useEffect } from 'react';
import { Box, Button, Divider, Stack, Typography, useTheme, CircularProgress } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
// import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
import StudentsDistributionChart from './StudentsDistributionChart';
import axios from 'axios';

// Interface for the distribution data
interface DistributionData {
  name: string;
  value: number;
}

const StudentsDistribution = (): ReactElement => {
  // Hook to access MUI theme
  const theme = useTheme();

  // State for the distribution data
  const [seriesData, setSeriesData] = useState<DistributionData[]>([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for errors
  const [error, setError] = useState<string | null>(null);

  // Legend data for the chart
  const legendData = [
    { name: 'Normaux', icon: 'circle' },
    { name: 'Hyperactif', icon: 'circle' },
    { name: 'Autiste', icon: 'circle' },
    { name: 'Aveugle', icon: 'circle' },
    { name: 'Sourd-muet', icon: 'circle' },
  ];

  // Colors for each category
  const pieChartColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.warning.main, // Added for Autiste
  ];

  // Reference for the ECharts instance
  const chartRef = useRef<EChartsReactCore | null>(null);

  // Fetch distribution data from the backend
  useEffect(() => {
    const fetchDistribution = async () => {
      try {
        // Retrieve authentication token
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Aucun token d'authentification trouvé.");
        }

        // Make GET request to the distribution endpoint
        const response = await axios.get("http://localhost:5000/api/students/distribution", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Update series data with response
        setSeriesData(response.data);
        setLoading(false);
      } catch (err) {
        // Handle errors
        const errorMessage = err instanceof Error ? err.message : "Erreur lors du chargement de la répartition.";
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchDistribution();
  }, []);

  // Function to toggle legend selection
  const onChartLegendSelectChanged = (name: string) => {
    if (chartRef.current) {
      const instance = chartRef.current.getEchartsInstance();
      instance.dispatchAction({
        type: 'legendToggleSelect',
        name: name,
      });
    }
  };

  // State to track enabled/disabled categories
  const [studentType, setStudentType] = useState<any>({
    Normaux: false,
    Hyperactif: false,
    Autiste: false,
    Aveugle: false,
    'Sourd-muet': false,
  });

  // Function to toggle a category’s state
  const toggleClicked = (name: string) => {
    setStudentType((prevState: any) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // Calculate total number of students
  const totalStudents = useMemo(
    () => seriesData.reduce((acc: number, next: any) => acc + next.value, 0),
    [seriesData],
  );

  // Display loading state
  if (loading) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <CircularProgress />
      </Stack>
    );
  }

  // Display error state
  if (error) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <Typography color="error">{error}</Typography>
      </Stack>
    );
  }

  // Main render
  return (
    <Box
      sx={{
        bgcolor: 'common.white',
        borderRadius: 5,
        height: 'min-content',
        boxShadow: theme.shadows[4],
      }}
    >
      <Typography variant="subtitle1" color="text.primary" p={2.5}>
        Répartition des Élèves
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
        <Stack direction="row" justifyContent="center" flex={'1 1 0%'}>
          <StudentsDistributionChart
            chartRef={chartRef}
            seriesData={seriesData}
            colors={pieChartColors}
            legendData={legendData}
            sx={{
              width: 222,
              maxHeight: 222,
              mx: 'auto',
            }}
          />
        </Stack>
        <Stack
          spacing={1}
          divider={<Divider />}
          sx={{ px: 2.5, py: 2.5 }}
          justifyContent="center"
          alignItems="stretch"
          flex={'1 1 0%'}
        >
          {Array.isArray(seriesData) &&
            seriesData.map((dataItem, index) => (
              <Button
                key={dataItem.name}
                variant="text"
                fullWidth
                onClick={() => {
                  toggleClicked(dataItem.name as string);
                  onChartLegendSelectChanged(dataItem.name as string);
                }}
                sx={{
                  justifyContent: 'flex-start',
                  p: 0,
                  borderRadius: 1,
                  opacity: studentType[`${dataItem.name}`] ? 0.5 : 1,
                }}
                disableRipple
              >
                <Stack direction="row" alignItems="center" gap={1} width={1}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      bgcolor: studentType[`${dataItem.name}`]
                        ? 'action.disabled'
                        : pieChartColors[index],
                      borderRadius: 400,
                    }}
                  ></Box>
                  <Typography variant="body1" color="text.secondary" flex={1} textAlign={'left'}>
                    {dataItem.name}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {totalStudents > 0
                      ? ((parseInt(`${dataItem.value}`) / totalStudents) * 100).toFixed(0)
                      : 0}%
                  </Typography>
                </Stack>
              </Button>
            ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default StudentsDistribution;





















// import { ReactElement, useMemo, useRef, useState } from 'react';
// import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
// import EChartsReactCore from 'echarts-for-react/lib/core';
// import { PieDataItemOption } from 'echarts/types/src/chart/pie/PieSeries.js';
// import StudentsDistributionChart from './StudentsDistributionChart';

// const StudentsDistribution = (): ReactElement => {
//   const theme = useTheme();

//   // Données d'exemple : répartition des 100 élèves
//   const seriesData: PieDataItemOption[] = [
//     { value: 60, name: 'Normaux' }, // 60%
//     { value: 15, name: 'Sourd-muet' }, // 15%
//     { value: 10, name: 'Aveugle' }, // 10%
//     { value: 15, name: 'Hyperactif' }, // 15%
//   ];

//   // Données de la légende
//   const legendData = [
//     { name: 'Normaux', icon: 'circle' },
//     { name: 'Sourd-muet', icon: 'circle' },
//     { name: 'Aveugle', icon: 'circle' },
//     { name: 'Hyperactif', icon: 'circle' },
//   ];

//   // Couleurs pour chaque catégorie
//   const pieChartColors = [
//     theme.palette.primary.main,
//     theme.palette.secondary.main,
//     theme.palette.info.main,
//     theme.palette.error.main,
//   ];

//   const chartRef = useRef<EChartsReactCore | null>(null);

//   // Fonction pour basculer la sélection dans la légende
//   const onChartLegendSelectChanged = (name: string) => {
//     if (chartRef.current) {
//       const instance = chartRef.current.getEchartsInstance();
//       instance.dispatchAction({
//         type: 'legendToggleSelect',
//         name: name,
//       });
//     }
//   };

//   // État pour activer/désactiver les catégories
//   const [studentType, setStudentType] = useState<any>({
//     Normaux: false,
//     'Sourd-muet': false,
//     Aveugle: false,
//     Hyperactif: false,
//   });

//   // Fonction pour basculer l'état d'une catégorie
//   const toggleClicked = (name: string) => {
//     setStudentType((prevState: any) => ({
//       ...prevState,
//       [name]: !prevState[name],
//     }));
//   };

//   // Calcul du total des élèves
//   const totalStudents = useMemo(
//     () => seriesData.reduce((acc: number, next: any) => acc + next.value, 0),
//     [],
//   );

//   return (
//     <Box
//       sx={{
//         bgcolor: 'common.white',
//         borderRadius: 5,
//         height: 'min-content',
//         boxShadow: theme.shadows[4],
//       }}
//     >
//       <Typography variant="subtitle1" color="text.primary" p={2.5}>
//         Répartition des Élèves
//       </Typography>
//       <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
//         <Stack direction="row" justifyContent="center" flex={'1 1 0%'}>
//           <StudentsDistributionChart
//             chartRef={chartRef}
//             seriesData={seriesData}
//             colors={pieChartColors}
//             legendData={legendData}
//             sx={{
//               width: 222,
//               maxHeight: 222,
//               mx: 'auto',
//             }}
//           />
//         </Stack>
//         <Stack
//           spacing={1}
//           divider={<Divider />}
//           sx={{ px: 2.5, py: 2.5 }}
//           justifyContent="center"
//           alignItems="stretch"
//           flex={'1 1 0%'}
//         >
//           {Array.isArray(seriesData) &&
//             seriesData.map((dataItem, index) => (
//               <Button
//                 key={dataItem.name}
//                 variant="text"
//                 fullWidth
//                 onClick={() => {
//                   toggleClicked(dataItem.name as string);
//                   onChartLegendSelectChanged(dataItem.name as string);
//                 }}
//                 sx={{
//                   justifyContent: 'flex-start',
//                   p: 0,
//                   borderRadius: 1,
//                   opacity: studentType[`${dataItem.name}`] ? 0.5 : 1,
//                 }}
//                 disableRipple
//               >
//                 <Stack direction="row" alignItems="center" gap={1} width={1}>
//                   <Box
//                     sx={{
//                       width: 10,
//                       height: 10,
//                       bgcolor: studentType[`${dataItem.name}`]
//                         ? 'action.disabled'
//                         : pieChartColors[index],
//                       borderRadius: 400,
//                     }}
//                   ></Box>
//                   <Typography variant="body1" color="text.secondary" flex={1} textAlign={'left'}>
//                     {dataItem.name}
//                   </Typography>
//                   <Typography variant="body1" color="text.primary">
//                     {((parseInt(`${dataItem.value}`) / totalStudents) * 100).toFixed(0)}%
//                   </Typography>
//                 </Stack>
//               </Button>
//             ))}
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default StudentsDistribution;








