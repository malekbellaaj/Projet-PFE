// Importation des images pour les métriques
import teachersIcon from '../assets/infoBox/teachers.png'; // Icône ou image pour les enseignants
import studentsIcon from '../assets/infoBox/students.png'; // Icône ou image pour les élèves
import complaintsIcon from '../assets/infoBox/complaints.png'; // Icône ou image pour les réclamations

// Interface TypeScript pour définir la structure des données
interface InfoData {
  id: number; // Identifiant unique pour chaque métrique
  image: string; // Chemin de l'image ou icône associée
  title: string; // Titre de la métrique (ex. : "Enseignants", "Élèves")
  count: number; // Nombre associé (ex. : nombre d'enseignants)
  increment: number; // Pourcentage d'augmentation par rapport à une période précédente
  date: string; // Date de référence (maintenant la date du jour)
}

// Fonction pour obtenir la date du jour au format "Jour Mois Année" (ex. : "29 Avril 2025")
const getCurrentDate = (): string => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return today.toLocaleDateString('fr-FR', options); // Format français
};

// Tableau contenant les données pour les métriques
export const infoData: InfoData[] = [
  {
    id: 1,
    image: teachersIcon, // Image pour les enseignants
    title: 'Enseignants',
    count: 20, // Mis à jour : 20 enseignants
    increment: 10, // Conservé (modifiable si nécessaire)
    date: getCurrentDate(), // Date du jour (ex. : "29 Avril 2025")
  },
  {
    id: 2,
    image: studentsIcon, // Image pour les élèves
    title: 'Élèves',
    count: 100, // Mis à jour : 100 élèves
    increment: 15, // Conservé
    date: getCurrentDate(), // Date du jour
  },
  {
    id: 3,
    image: complaintsIcon, // Image pour les réclamations
    title: 'Réclamations',
    count: 30, // Mis à jour : 30 réclamations
    increment: 5, // Conservé
    date: getCurrentDate(), // Date du jour
  },
];

























// import avgRevenue from 'assets/sale-info/avg-revenue.png';
// import customers from 'assets/sale-info/customers.png';
// import sales from 'assets/sale-info/sales.png';

// interface SaleInfoData {
//   id: number;
//   image: string;
//   title: string;
//   sales: number;
//   increment: number;
//   date: string;
// }

// export const saleInfoData: SaleInfoData[] = [
//   {
//     id: 1,
//     image: sales,
//     title: 'Sales',
//     sales: 230220,
//     increment: 55,
//     date: 'May 2022',
//   },
//   {
//     id: 2,
//     image: customers,
//     title: 'Customers',
//     sales: 3200,
//     increment: 12,
//     date: 'May 2022',
//   },
//   {
//     id: 3,
//     image: avgRevenue,
//     title: 'Avg Revenue',
//     sales: 2300,
//     increment: 210,
//     date: 'May 2022',
//   },
// ];
