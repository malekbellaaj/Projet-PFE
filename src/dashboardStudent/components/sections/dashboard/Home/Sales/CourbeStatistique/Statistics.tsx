import { ReactElement, useRef, useState, useEffect } from 'react';
import { Box, Button, Stack, Typography, useTheme, CircularProgress } from '@mui/material';
import EChartsReactCore from 'echarts-for-react/lib/core';
import StatisticsChart from './StatisticsChart';
import { LineSeriesOption } from 'echarts';
import axios from 'axios';

// Interface pour les données des statistiques
interface StatsData {
  teachers: number[];
  students: number[];
}

const Statistics = (): ReactElement => {
  // Hook pour accéder au thème MUI
  const theme = useTheme();
  // Référence pour l'instance du graphique ECharts
  const chartRef = useRef<EChartsReactCore | null>(null);
  // État pour les données des statistiques
  const [statsData, setStatsData] = useState<StatsData>({ teachers: [], students: [] });
  // État pour le chargement
  const [loading, setLoading] = useState(true);
  // État pour les erreurs
  const [error, setError] = useState<string | null>(null);

  // Couleurs des courbes pour enseignants et élèves
  const lineChartColors = [theme.palette.secondary.main, theme.palette.primary.main];

  // Données de la légende pour identifier les courbes
  const legendData = [
    { name: 'Enseignants', icon: 'circle' },
    { name: 'Élèves', icon: 'circle' },
  ];

  // Chargement des données depuis le backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer le token d'authentification
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Aucun token d'authentification trouvé.");
        }

        // Requête vers l'endpoint /api/stats/monthly
        const response = await axios.get("http://localhost:5000/api/stats/monthly", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Mettre à jour les données
        setStatsData(response.data);
        setLoading(false);
      } catch (err) {
        // Gestion des erreurs
        const errorMessage = err instanceof Error ? err.message : "Erreur lors du chargement des statistiques.";
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Données des séries pour les courbes
  const seriesData: LineSeriesOption[] = [
    {
      id: 1,
      data: statsData.teachers, // Données dynamiques pour les enseignants
      type: 'line',
      smooth: true, // Lissage de la courbe
      color: lineChartColors[0], // Couleur secondaire
      name: 'Enseignants',
      legendHoverLink: true, // Interaction avec la légende
      showSymbol: true, // Afficher les points
      symbolSize: 12,
      lineStyle: {
        width: 5, // Épaisseur de la ligne
      },
    },
    {
      id: 2,
      data: statsData.students, // Données dynamiques pour les élèves
      type: 'line',
      smooth: true,
      color: lineChartColors[1], // Couleur principale
      name: 'Élèves',
      legendHoverLink: true,
      showSymbol: false, // Pas de points pour les élèves
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

  // Affichage pendant le chargement
  if (loading) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <CircularProgress />
      </Stack>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <Typography color="error">{error}</Typography>
      </Stack>
    );
  }

  // Rendu principal du composant
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
// import StatisticsChart from './StatisticsChart'; 
// import { LineSeriesOption } from 'echarts';

// const Statistics = (): ReactElement => {
//   const theme = useTheme();
//   const chartRef = useRef<EChartsReactCore | null>(null);

//   // Couleurs des courbes (même palette que l'original)
//   const lineChartColors = [theme.palette.secondary.main, theme.palette.primary.main];

//   // Données de la légende pour identifier les courbes
//   const legendData = [
//     { name: 'Enseignants', icon: 'circle' },
//     { name: 'Élèves', icon: 'circle' },
//   ];

//   // Données des séries pour les deux courbes (exemple : nombres sur 8 mois)
//   const seriesData: LineSeriesOption[] = [
//     {
//       id: 1,
//       data: [18, 19, 20, 21, 22, 20, 19, 20], // Exemple : Enseignants (petites variations)
//       type: 'line',
//       smooth: true,
//       color: lineChartColors[0],
//       name: 'Enseignants',
//       legendHoverLink: true,
//       showSymbol: true,
//       symbolSize: 12,
//       lineStyle: {
//         width: 5,
//       },
//     },
//     {
//       id: 2,
//       data: [90, 95, 100, 98, 102, 105, 100, 100], // Exemple : Élèves (plus grande échelle)
//       type: 'line',
//       smooth: true,
//       color: lineChartColors[1],
//       name: 'Élèves',
//       legendHoverLink: true,
//       showSymbol: false,
//       symbolSize: 12,
//       lineStyle: {
//         width: 5,
//       },
//     },
//   ];

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

//   // État pour suivre l'activation/désactivation des courbes
//   const [statsType, setStatsType] = useState<any>({
//     'Enseignants': false,
//     'Élèves': false,
//   });

//   // Fonction pour basculer l'état d'une courbe
//   const toggleClicked = (name: string) => {
//     setStatsType((prevState: any) => ({
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
//           Statistiques
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
//                   opacity: statsType[`${dataItem.name}`] ? 0.5 : 1,
//                 }}
//                 disableRipple
//               >
//                 <Stack direction="row" alignItems="center" gap={1} width={1}>
//                   <Box
//                     sx={{
//                       width: 13,
//                       height: 13,
//                       bgcolor: statsType[`${dataItem.name}`]
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
//         <StatisticsChart
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

// export default Statistics;






