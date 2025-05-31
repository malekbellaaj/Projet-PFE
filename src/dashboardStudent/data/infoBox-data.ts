// // Importation des images pour les métriques
// import teachersIcon from '../assets/infoBox/teachers.png'; // Icône ou image pour les enseignants
// import studentsIcon from '../assets/infoBox/students.png'; // Icône ou image pour les élèves
// import complaintsIcon from '../assets/infoBox/complaints.png'; // Icône ou image pour les réclamations

// // Interface TypeScript pour définir la structure des données
// interface InfoData {
//   id: number; // Identifiant unique pour chaque métrique
//   image: string; // Chemin de l'image ou icône associée
//   title: string; // Titre de la métrique (ex. : "Enseignants", "Élèves")
//   count: number; // Nombre associé (ex. : nombre d'enseignants)
//   increment: number; // Pourcentage d'augmentation par rapport à une période précédente
//   date: string; // Date de référence (maintenant la date du jour)
// }

// // Fonction pour obtenir la date du jour au format "Jour Mois Année" (ex. : "29 Avril 2025")
// const getCurrentDate = (): string => {
//   const today = new Date();
//   const options: Intl.DateTimeFormatOptions = {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   };
//   return today.toLocaleDateString('fr-FR', options); // Format français
// };

// // Tableau contenant les données pour les métriques
// export const infoData: InfoData[] = [
//   {
//     id: 1,
//     image: teachersIcon, // Image pour les enseignants
//     title: 'Enseignants',
//     count: 20, // Mis à jour : 20 enseignants
//     increment: 10, // Conservé (modifiable si nécessaire)
//     date: getCurrentDate(), // Date du jour (ex. : "29 Avril 2025")
//   },
//   {
//     id: 2,
//     image: studentsIcon, // Image pour les élèves
//     title: 'Élèves',
//     count: 100, // Mis à jour : 100 élèves
//     increment: 15, // Conservé
//     date: getCurrentDate(), // Date du jour
//   },
//   {
//     id: 3,
//     image: complaintsIcon, // Image pour les réclamations
//     title: 'Réclamations',
//     count: 30, // Mis à jour : 30 réclamations
//     increment: 5, // Conservé
//     date: getCurrentDate(), // Date du jour
//   },
// ];



import axios from "axios";
import teachersIcon from '../assets/infoBox/teachers.png';
import studentsIcon from '../assets/infoBox/students.png';
import complaintsIcon from '../assets/infoBox/complaints.png';

export interface InfoData {
  id: number;
  image: string;
  title: string;
  count: number;
  increment: number;
  date: string;
}

const getCurrentDate = (): string => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return today.toLocaleDateString('fr-FR', options);
};

export const fetchInfoData = async (): Promise<InfoData[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Aucun token d'authentification trouvé.");
    }

    const [teachersResponse, studentsResponse, complaintsResponse] = await Promise.all([
      axios.get("http://localhost:5000/api/teachers/count", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:5000/api/students/count", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("http://localhost:5000/api/contacts/count", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    return [
      {
        id: 1,
        image: teachersIcon,
        title: 'Enseignants',
        count: teachersResponse.data.count,
        increment: 10,
        date: getCurrentDate(),
      },
      {
        id: 2,
        image: studentsIcon,
        title: 'Élèves',
        count: studentsResponse.data.count,
        increment: 15,
        date: getCurrentDate(),
      },
      {
        id: 3,
        image: complaintsIcon,
        title: 'Réclamations',
        count: complaintsResponse.data.count,
        increment: 5,
        date: getCurrentDate(),
      },
    ];
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des données :", error);
    throw error;
  }
};