// Importation du composant Stack de Material-UI pour organiser les cartes
import { Stack } from '@mui/material';

// Importation des données depuis infoBox-data.ts (contient les métriques Enseignants, Élèves, Réclamations)
import { infoData } from '../../../../../../data/infoBox-data';

// Importation du composant Info pour rendre chaque carte
import Info from './Info';

// Définition du composant InfoCards
const InfoCards = () => {
  return (
    // Stack pour organiser les cartes en ligne (sur sm et plus) ou en colonne (sur xs)
    <Stack
      direction={{ sm: 'row' }} // Disposition horizontale à partir de sm
      justifyContent={{ sm: 'space-between' }} // Espace les cartes uniformément
      gap={3.75} // Espacement de 3.75 unités entre les cartes
    >
      {/* Boucle sur infoData pour rendre une carte par métrique */}
      {infoData.map((item) => (
        <Info
          key={item.id} // Clé unique pour chaque carte
          title={item.title} // Titre (ex. : "Enseignants")
          image={item.image} // Image (ex. : teachers.png)
          count={item.count} // Nombre (ex. : 20 pour Enseignants)
          increment={item.increment} // Pourcentage d'augmentation (ex. : 10)
          date={item.date} // Date (ex. : "29 Avril 2025")
        />
      ))}
    </Stack>
  );
};

// Exportation par défaut
export default InfoCards;





// import { Stack } from '@mui/material';
// import { InfoData } from 'data/info-data';
// import SaleInfo from './SaleInfo';

// const SaleInfoCards = () => {
//   return (
//     <Stack direction={{ sm: 'row' }} justifyContent={{ sm: 'space-between' }} gap={3.75}>
//       {InfoData.map((InfoData) => (
//         <SaleInfo
//           key={saleInfoDataItem.id}
//           title={saleInfoDataItem.title}
//           image={saleInfoDataItem.image}
//           sales={saleInfoDataItem.sales}
//           increment={saleInfoDataItem.increment}
//           date={saleInfoDataItem.date}
//         />
//       ))}
//     </Stack>
//   );
// };

// export default SaleInfoCards;
