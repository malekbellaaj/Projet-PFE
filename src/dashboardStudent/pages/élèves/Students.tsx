// import { ReactElement, useState } from 'react';
// import { Stack, Grid } from '@mui/material';
// import { drawerWidth } from './../../layouts/main-layout';
// import StudentsTable from './StudentsTable';

// // Interface pour un élève
// interface Student {
//   id: number;
//   parentFullName: string;
//   parentPhone: string;
//   parentEmail: string;
//   studentFullName: string;
//   birthDate: string;
//   situation: string;
//   level: string;
//   photoUrl: string;
// }

// // Données d'exemple pour les élèves
// const initialStudents: Student[] = [
//   {
//     id: 1,
//     parentFullName: 'Marie Martin',
//     parentPhone: '2020 1010',
//     parentEmail: 'marie.martin@example.com',
//     studentFullName: 'Luc Martin',
//     birthDate: '15/03/2010',
//     situation: 'Normaux',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/luc.jpg',
//   },
//   {
//     id: 2,
//     parentFullName: 'Jean Garnier',
//     parentPhone: '3030 2020',
//     parentEmail: 'jean.garnier@example.com',
//     studentFullName: 'Sophie Garnier',
//     birthDate: '22/07/2009',
//     situation: 'Sourd-muet',
//     level: '5e',
//     photoUrl: 'https://example.com/photos/sophie.jpg',
//   },
//   {
//     id: 3,
//     parentFullName: 'Fatima Khadir',
//     parentPhone: '4040 3030',
//     parentEmail: 'fatima.khadir@example.com',
//     studentFullName: 'Omar Khadir',
//     birthDate: '10/11/2011',
//     situation: 'Aveugle',
//     level: '3e',
//     photoUrl: 'https://example.com/photos/omar.jpg',
//   },
//   {
//     id: 4,
//     parentFullName: 'Claire Dubois',
//     parentPhone: '5050 4040',
//     parentEmail: 'claire.dubois@example.com',
//     studentFullName: 'Clara Dubois',
//     birthDate: '05/05/2010',
//     situation: 'Hyperactif',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/clara.jpg',
//   },
// ];

// const Students = (): ReactElement => {
//   const [students, setStudents] = useState<Student[]>(initialStudents);

//   return (
//     <Grid
//       container
//       component="main"
//       columns={12}
//       spacing={3.75}
//       flexGrow={1}
//       pt={4.375}
//       pr={1.875}
//       pb={0}
//       sx={{
//         width: { md: `calc(100% - ${drawerWidth}px)` },
//         pl: { xs: 3.75, lg: 0 },
//         borderRadius: 5,
//       }}
//     >
//       <Grid item xs={12}>
//         <Stack
//           bgcolor="background.paper"
//           borderRadius={5}
//           width={1}
//           boxShadow={(theme) => theme.shadows[4]}
//           height={1}
//           sx={{ overflow: 'hidden' }}
//         >
//           <StudentsTable students={students} setStudents={setStudents} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Students;



import { ReactElement } from 'react';
import { Box, Stack, Typography, Container } from '@mui/material';

// Valeur par défaut de drawerWidth (tu peux aussi l'importer depuis main-layout si elle est définie ailleurs)
const drawerWidth = 240;

const Students = (): ReactElement => {
  return (
    <Container
      component="main"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        marginLeft: { xs: 3.75, lg: 0 },
        marginTop: 4.375,
        padding: 0,
      }}
    >
      <Stack
        bgcolor="background.paper"
        borderRadius={5}
        boxShadow={(theme) => theme.shadows[4]}
        height="calc(100vh - 64px)" // Ajuste selon la hauteur de ton header
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" component="h1">
          C'est Students
        </Typography>
      </Stack>
    </Container>
  );
};

export default Students;
// import { ReactElement, useState } from 'react';
// import { Stack, Grid } from '@mui/material'; // Utilisation correcte de Grid (sans Unstable_Grid2)
// import StudentsTable from './StudentsTable';

// // Définir l'interface pour un élève
// interface Student {
//   id: number;
//   parentFullName: string; // Nom du parent
//   parentPhone: string; // Téléphone du parent
//   parentEmail: string; // Email du parent
//   studentFullName: string;
//   birthDate: string;
//   situation: string;
//   level: string;
//   photoUrl: string;
// }

// // Données d'exemple pour les élèves
// const initialStudents: Student[] = [
//   {
//     id: 1,
//     parentFullName: 'Marie Martin',
//     parentPhone: '2020 1010',
//     parentEmail: 'marie.martin@example.com',
//     studentFullName: 'Luc Martin',
//     birthDate: '15/03/2010',
//     situation: 'Normaux',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/luc.jpg ',
//   },
//   {
//     id: 2,
//     parentFullName: 'Jean Garnier',
//     parentPhone: '3030 2020',
//     parentEmail: 'jean.garnier@example.com',
//     studentFullName: 'Sophie Garnier',
//     birthDate: '22/07/2009',
//     situation: 'Sourd-muet',
//     level: '5e',
//     photoUrl: 'https://example.com/photos/sophie.jpg ',
//   },
//   {
//     id: 3,
//     parentFullName: 'Fatima Khadir',
//     parentPhone: '4040 3030',
//     parentEmail: 'fatima.khadir@example.com',
//     studentFullName: 'Omar Khadir',
//     birthDate: '10/11/2011',
//     situation: 'Aveugle',
//     level: '3e',
//     photoUrl: 'https://example.com/photos/omar.jpg ',
//   },
//   {
//     id: 4,
//     parentFullName: 'Claire Dubois',
//     parentPhone: '5050 4040',
//     parentEmail: 'claire.dubois@example.com',
//     studentFullName: 'Clara Dubois',
//     birthDate: '05/05/2010',
//     situation: 'Hyperactif',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/clara.jpg ',
//   },
// ];

// // Valeur par défaut de drawerWidth (tu peux aussi l'importer depuis main-layout si elle est définie ailleurs)
// const drawerWidth = 240;

// const Students = (): ReactElement => {
//   const [students, setStudents] = useState<Student[]>(initialStudents);

//   return (
//     <Grid
//       container
//       component="main"
//       spacing={3.75}
//       flexGrow={1}
//       pt={4.375}
//       pr={1.875}
//       pb={0}
//       sx={{
//         width: { md: `calc(100% - ${drawerWidth}px)` },
//         pl: { xs: 3.75, lg: 0 },
//       }}
//     >
//       <Grid xs={12}>
//         <Stack
//           bgcolor="background.paper"
//           borderRadius={5}
//           width={1}
//           boxShadow={(theme) => theme.shadows[4]}
//           height={1}
//           sx={{ overflow: 'hidden' }}
//         >
//           <StudentsTable students={students} setStudents={setStudents} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Students;






// import { ReactElement, useState } from 'react';
// import { Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { drawerWidth } from './../../layouts/main-layout';
// import StudentsTable from './StudentsTable';

// // Interface pour un élève
// interface Student {
//   id: number;
//   parentFullName: string; // Nom du parent
//   parentPhone: string; // Téléphone du parent
//   parentEmail: string; // Email du parent
//   studentFullName: string;
//   birthDate: string;
//   situation: string;
//   level: string;
//   photoUrl: string;
// }

// // Données d'exemple pour les élèves
// const initialStudents: Student[] = [
//   {
//     id: 1,
//     parentFullName: 'Marie Martin',
//     parentPhone: '2020 1010',
//     parentEmail: 'marie.martin@example.com',
//     studentFullName: 'Luc Martin',
//     birthDate: '15/03/2010',
//     situation: 'Normaux',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/luc.jpg',
//   },
//   {
//     id: 2,
//     parentFullName: 'Jean Garnier',
//     parentPhone: '3030 2020',
//     parentEmail: 'jean.garnier@example.com',
//     studentFullName: 'Sophie Garnier',
//     birthDate: '22/07/2009',
//     situation: 'Sourd-muet',
//     level: '5e',
//     photoUrl: 'https://example.com/photos/sophie.jpg',
//   },
//   {
//     id: 3,
//     parentFullName: 'Fatima Khadir',
//     parentPhone: '4040 3030',
//     parentEmail: 'fatima.khadir@example.com',
//     studentFullName: 'Omar Khadir',
//     birthDate: '10/11/2011',
//     situation: 'Aveugle',
//     level: '3e',
//     photoUrl: 'https://example.com/photos/omar.jpg',
//   },
//   {
//     id: 4,
//     parentFullName: 'Claire Dubois',
//     parentPhone: '5050 4040',
//     parentEmail: 'claire.dubois@example.com',
//     studentFullName: 'Clara Dubois',
//     birthDate: '05/05/2010',
//     situation: 'Hyperactif',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/clara.jpg',
//   },
// ];

// const Students = (): ReactElement => {
//   const [students, setStudents] = useState<Student[]>(initialStudents);

//   // Log pour vérifier les données passées à StudentsTable
//   console.log('Students in Students.tsx:', students);

//   return (
//     <Grid
//       container
//       component="main"
//       columns={12}
//       spacing={3.75}
//       flexGrow={1}
//       pt={4.375}
//       pr={1.875}
//       pb={0}
//       sx={{
//         width: { md: `calc(100% - ${drawerWidth}px)` },
//         pl: { xs: 3.75, lg: 0 },
//       }}
//     >
//       <Grid xs={12}>
//         <Stack
//           bgcolor="background.paper"
//           borderRadius={5}
//           width={1}
//           boxShadow={(theme) => theme.shadows[4]}
//           height={1}
//           sx={{ overflow: 'hidden' }}
//         >
//           <StudentsTable students={students} setStudents={setStudents} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Students;

































// import { ReactElement, useState } from 'react';
// import { Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { drawerWidth } from 'layouts/main-layout';
// import StudentsTable from './StudentsTable';

// // Interface pour un élève
// interface Student {
//   id: number;
//   parentFullName: string; // Nom du parent
//   parentPhone: string; // Téléphone du parent
//   parentEmail: string; // Email du parent
//   studentFullName: string;
//   birthDate: string;
//   situation: string;
//   level: string;
//   photoUrl: string;
//   isAccepted: boolean;
// }

// // Données d'exemple pour les élèves
// const initialStudents: Student[] = [
//   {
//     id: 1,
//     parentFullName: 'Marie Martin',
//     parentPhone: '2020 1010',
//     parentEmail: 'marie.martin@example.com',
//     studentFullName: 'Luc Martin',
//     birthDate: '15/03/2010',
//     situation: 'Normaux',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/luc.jpg',
//     isAccepted: false,
//   },
//   {
//     id: 2,
//     parentFullName: 'Jean Garnier',
//     parentPhone: '3030 2020',
//     parentEmail: 'jean.garnier@example.com',
//     studentFullName: 'Sophie Garnier',
//     birthDate: '22/07/2009',
//     situation: 'Sourd-muet',
//     level: '5e',
//     photoUrl: 'https://example.com/photos/sophie.jpg',
//     isAccepted: false,
//   },
//   {
//     id: 3,
//     parentFullName: 'Fatima Khadir',
//     parentPhone: '4040 3030',
//     parentEmail: 'fatima.khadir@example.com',
//     studentFullName: 'Omar Khadir',
//     birthDate: '10/11/2011',
//     situation: 'Aveugle',
//     level: '3e',
//     photoUrl: 'https://example.com/photos/omar.jpg',
//     isAccepted: false,
//   },
//   {
//     id: 4,
//     parentFullName: 'Claire Dubois',
//     parentPhone: '5050 4040',
//     parentEmail: 'claire.dubois@example.com',
//     studentFullName: 'Clara Dubois',
//     birthDate: '05/05/2010',
//     situation: 'Hyperactif',
//     level: '4e',
//     photoUrl: 'https://example.com/photos/clara.jpg',
//     isAccepted: false,
//   },
// ];

// const Students = (): ReactElement => {
//   const [students, setStudents] = useState<Student[]>(initialStudents);

//   return (
//     <Grid
//       container
//       component="main"
//       columns={12}
//       spacing={3.75}
//       flexGrow={1}
//       pt={4.375}
//       pr={1.875}
//       pb={0}
//       sx={{
//         width: { md: `calc(100% - ${drawerWidth}px)` },
//         pl: { xs: 3.75, lg: 0 },
//       }}
//     >
//       <Grid xs={12}>
//         <Stack
//           bgcolor="background.paper"
//           borderRadius={5}
//           width={1}
//           boxShadow={(theme) => theme.shadows[4]}
//           height={1}
//           sx={{ overflow: 'hidden' }}
//         >
//           <StudentsTable students={students} setStudents={setStudents} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Students;
