import { ReactElement } from "react";
import { Box, Stack, Typography, Container } from "@mui/material";

// Valeur par défaut de drawerWidth (tu peux aussi l'importer depuis main-layout si elle est définie ailleurs)
const drawerWidth = 240;

const Admins = (): ReactElement => {
  return (
    <Container
      component="main"
      maxWidth={false}
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
        height="calc(100vh - 64px)" // Ajuste selon ton layout global
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" component="h1">
          C'est Admins
        </Typography>
      </Stack>
    </Container>
  );
};

export default Admins;







// import { ReactElement, useState } from 'react';
// import { Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { drawerWidth } from '../../layouts/main-layout';
// import AdminsTable from './AdminsTable';

// // Interface pour un administrateur
// interface Admin {
//   id: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   role: string;
//   password: string; // Ajout du champ password
// }

// // Données d'exemple pour les administrateurs
// const initialAdmins: Admin[] = [
//   {
//     id: 1,
//     fullName: 'Alice Martin',
//     email: 'alice.martin@example.com',
//     phone: '1234 5678',
//     role: 'Super Admin',
//     password: 'P@ssw0rd123', // Mot de passe fictif
//   },
//   {
//     id: 2,
//     fullName: 'Bob Dupont',
//     email: 'bob.dupont@example.com',
//     phone: '2345 6789',
//     role: 'Gestionnaire',
//     password: 'S3cur3#456', // Mot de passe fictif
//   },
//   {
//     id: 3,
//     fullName: 'Clara Benali',
//     email: 'clara.benali@example.com',
//     phone: '3456 7890',
//     role: 'Administrateur',
//     password: 'Adm!n789$', // Mot de passe fictif
//   },
// ];

// const Admins = (): ReactElement => {
//   const [admins, setAdmins] = useState<Admin[]>(initialAdmins);

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
//           <AdminsTable admins={admins} setAdmins={setAdmins} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Admins;
























// import { ReactElement, useState } from 'react';
// import { Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { drawerWidth } from 'layouts/main-layout';
// import AdminsTable from './AdminsTable';

// // Interface pour un administrateur
// interface Admin {
//   id: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   role: string;
// }

// // Données d'exemple pour les administrateurs
// const initialAdmins: Admin[] = [
//   {
//     id: 1,
//     fullName: 'Alice Martin',
//     email: 'alice.martin@example.com',
//     phone: '1234 5678',
//     role: 'Super Admin',
//   },
//   {
//     id: 2,
//     fullName: 'Bob Dupont',
//     email: 'bob.dupont@example.com',
//     phone: '2345 6789',
//     role: 'Gestionnaire',
//   },
//   {
//     id: 3,
//     fullName: 'Clara Benali',
//     email: 'clara.benali@example.com',
//     phone: '3456 7890',
//     role: 'Administrateur',
//   },
// ];

// const Admins = (): ReactElement => {
//   const [admins, setAdmins] = useState<Admin[]>(initialAdmins);

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
//           <AdminsTable admins={admins} setAdmins={setAdmins} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Admins;