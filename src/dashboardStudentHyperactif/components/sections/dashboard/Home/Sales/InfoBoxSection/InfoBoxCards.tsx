// // Importation du composant Stack de Material-UI pour organiser les cartes
// import { Stack } from '@mui/material';

// // Importation des données depuis infoBox-data.ts (contient les métriques Enseignants, Élèves, Réclamations)
// import { infoData } from '../../../../../../data/infoBox-data';

// // Importation du composant Info pour rendre chaque carte
// import Info from './Info';

// // Définition du composant InfoCards
// const InfoCards = () => {
//   return (
//     // Stack pour organiser les cartes en ligne (sur sm et plus) ou en colonne (sur xs)
//     <Stack
//       direction={{ sm: 'row' }} // Disposition horizontale à partir de sm
//       justifyContent={{ sm: 'space-between' }} // Espace les cartes uniformément
//       gap={3.75} // Espacement de 3.75 unités entre les cartes
//     >
//       {/* Boucle sur infoData pour rendre une carte par métrique */}
//       {infoData.map((item) => (
//         <Info
//           key={item.id} // Clé unique pour chaque carte
//           title={item.title} // Titre (ex. : "Enseignants")
//           image={item.image} // Image (ex. : teachers.png)
//           count={item.count} // Nombre (ex. : 20 pour Enseignants)
//           increment={item.increment} // Pourcentage d'augmentation (ex. : 10)
//           date={item.date} // Date (ex. : "29 Avril 2025")
//         />
//       ))}
//     </Stack>
//   );
// };

// // Exportation par défaut
// export default InfoCards;

import { useEffect, useState } from 'react';
import { Stack, CircularProgress, Typography } from '@mui/material';
import { fetchInfoData, InfoData } from '../../../../../../data/infoBox-data';
import Info from './Info';

const InfoCards = () => {
  const [infoData, setInfoData] = useState<InfoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchInfoData();
        setInfoData(data);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "❌ Erreur lors du chargement des données.";
        setError(errorMessage);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <Typography color="error">{error}</Typography>
      </Stack>
    );
  }

  return (
    <Stack
      direction={{ sm: 'row' }}
      justifyContent={{ sm: 'space-between' }}
      gap={3.75}
    >
      {infoData.map((item) => (
        <Info
          key={item.id}
          title={item.title}
          image={item.image}
          count={item.count}
          increment={item.increment}
          date={item.date}
        />
      ))}
    </Stack>
  );
};

export default InfoCards;