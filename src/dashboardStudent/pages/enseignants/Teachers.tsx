// code table s7i7
// import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
// import {
//   Divider,
//   InputAdornment,
//   LinearProgress,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
// import IconifyIcon from 'components/base/IconifyIcon';
// import CustomPagination from 'components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination';
// import { debounce } from '@mui/material/utils';
// import { drawerWidth } from 'layouts/main-layout';
// import Swal from 'sweetalert2';

// interface Teacher {
//   id: number;
//   fullName: string;
//   registrationNumber: string;
//   phone: string;
//   email: string;
//   cvUrl: string;
// }

// const initialTeachers: Teacher[] = [
//   {
//     id: 1,
//     fullName: 'Ali Ben Salah',
//     registrationNumber: 'TCH12345',
//     phone: '2020 3030',
//     email: 'ali.bensalah@example.com',
//     cvUrl: 'https://example.com/cv/ali.pdf',
//   },
//   {
//     id: 2,
//     fullName: 'Nadia Ferchichi',
//     registrationNumber: 'TCH67890',
//     phone: '5050 6060',
//     email: 'nadia.ferchichi@example.com',
//     cvUrl: 'https://example.com/cv/nadia.pdf',
//   },
// ];

// const Teachers = (): ReactElement => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState('');
//   const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

//   const columns: GridColDef[] = [
//     {
//       field: 'fullName',
//       headerName: 'Nom et Prénom',
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: 'registrationNumber',
//       headerName: 'Matricule',
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: 'phone',
//       headerName: 'N° de tél',
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: 'email',
//       headerName: 'Email',
//       flex: 1,
//       minWidth: 200,
//     },
//     {
//       field: 'cvUrl',
//       headerName: 'CV',
//       flex: 1,
//       minWidth: 120,
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           color="primary.main"
//           sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//           onClick={() => window.open(params.value, '_blank')}
//         >
//           Voir CV
//         </Typography>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Action',
//       minWidth: 120,
//       filterable: false,
//       sortable: false,
//       renderCell: (params) => (
//         <Stack direction="row" spacing={1}>
//           <IconifyIcon
//             icon="mdi:account-edit"
//             width={24}
//             height={24}
//             color="gray"
//             sx={{ cursor: 'pointer' }}
//             onClick={() => {
//               Swal.fire({
//                 title: 'Modifier enseignant',
//                 html: `
//                   <input id="swal-name" class="swal2-input" placeholder="Nom" value="${params.row.fullName}">
//                   <input id="swal-email" class="swal2-input" placeholder="Email" value="${params.row.email}">
//                 `,
//                 confirmButtonText: 'Enregistrer',
//                 focusConfirm: false,
//                 preConfirm: () => {
//                   const name = (document.getElementById('swal-name') as HTMLInputElement).value;
//                   const email = (document.getElementById('swal-email') as HTMLInputElement).value;
//                   setTeachers((prev) =>
//                     prev.map((teacher) =>
//                       teacher.id === params.row.id
//                         ? { ...teacher, fullName: name, email }
//                         : teacher,
//                     ),
//                   );
//                 },
//               });
//             }}
//           />
//           <IconifyIcon
//             icon="mdi:delete-outline"
//             width={24}
//             height={24}
//             color="red"
//             sx={{ cursor: 'pointer' }}
//             onClick={() => {
//               Swal.fire({
//                 title: 'Êtes-vous sûr ?',
//                 text: `Supprimer l'enseignant n°${params.row.id} ?`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#d33',
//                 cancelButtonColor: '#3085d6',
//                 confirmButtonText: 'Oui, supprimer',
//                 cancelButtonText: 'Annuler',
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setTeachers((prev) => prev.filter((teacher) => teacher.id !== params.row.id));
//                   Swal.fire({
//                     title: 'Supprimé !',
//                     text: 'L’enseignant a été supprimé.',
//                     icon: 'success',
//                   });
//                 }
//               });
//             }}
//           />
//         </Stack>
//       ),
//     },
//   ];

//   const visibleColumns = useMemo(() => columns, []);

//   const handleGridSearch = useMemo(() => {
//     return debounce((searchValue) => {
//       apiRef.current.setQuickFilterValues(
//         searchValue.split(' ').filter((word: string) => word !== ''),
//       );
//     }, 250);
//   }, [apiRef]);

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const searchValue = event.currentTarget.value;
//     setSearch(searchValue);
//     handleGridSearch(searchValue);
//   };

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
//         >
//           <Stack
//             direction={{ sm: 'row' }}
//             justifyContent="space-between"
//             alignItems="center"
//             padding={3.75}
//             gap={3.75}
//           >
//             <Typography variant="h5" color="text.primary">
//               Liste des enseignants
//             </Typography>
//             <TextField
//               variant="filled"
//               placeholder="Rechercher..."
//               onChange={handleChange}
//               value={search}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
//                     <IconifyIcon icon="mdi:search" width={1} height={1} />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Stack>
//           <Divider />
//           <Stack height={1}>
//             <DataGrid
//               apiRef={apiRef}
//               columns={visibleColumns}
//               rows={teachers}
//               getRowHeight={() => 70}
//               hideFooterSelectedRowCount
//               disableColumnResize
//               disableColumnSelector
//               disableRowSelectionOnClick
//               rowSelection={false}
//               initialState={{
//                 pagination: { paginationModel: { pageSize: 5, page: 0 } },
//               }}
//               pageSizeOptions={[5]}
//               slots={{
//                 loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
//                 pagination: CustomPagination,
//                 noRowsOverlay: () => <section>Aucun enseignant disponible</section>,
//               }}
//               sx={{ height: 1, width: 1 }}
//             />
//           </Stack>
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Teachers;

// import { ReactElement, useState } from 'react';
// import { Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { drawerWidth } from 'layouts/main-layout';
// import TeachersTable from './TeachersTable';

// // Interface pour un enseignant
// interface Teacher {
//   id: number;
//   fullName: string;
//   registrationNumber: string;
//   phone: string;
//   email: string;
//   cvUrl: string;
// }

// // Données d'exemple pour les enseignants
// const initialTeachers: Teacher[] = [
//   {
//     id: 1,
//     fullName: 'Ali Ben Salah',
//     registrationNumber: 'TCH12345',
//     phone: '2020 3030',
//     email: 'ali.bensalah@example.com',
//     cvUrl: 'https://example.com/cv/ali.pdf',
//   },
//   {
//     id: 2,
//     fullName: 'Nadia Ferchichi',
//     registrationNumber: 'TCH67890',
//     phone: '5050 6060',
//     email: 'nadia.ferchichi@example.com',
//     cvUrl: 'https://example.com/cv/nadia.pdf',
//   },
// ];

// const Teachers = (): ReactElement => {
//   const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

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
//           <TeachersTable teachers={teachers} setTeachers={setTeachers} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Teachers;

// import { ReactElement, useState } from 'react';
// import { Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { drawerWidth } from 'layouts/main-layout';
// import TeachersTable from './TeachersTable';

// // Interface pour un enseignant
// interface Teacher {
//   id: number;
//   fullName: string;
//   registrationNumber: string;
//   phone: string;
//   email: string;
//   cvUrl: string;
//   isAccepted: boolean; // Ajout pour suivre l'état d'acceptation
// }

// // Données d'exemple pour les enseignants
// const initialTeachers: Teacher[] = [
//   {
//     id: 1,
//     fullName: 'Ali Ben Salah',
//     registrationNumber: 'TCH12345',
//     phone: '2020 3030',
//     email: 'ali.bensalah@example.com',
//     cvUrl: 'https://example.com/cv/ali.pdf',
//     isAccepted: false,
//   },
//   {
//     id: 2,
//     fullName: 'Nadia Ferchichi',
//     registrationNumber: 'TCH67890',
//     phone: '5050 6060',
//     email: 'nadia.ferchichi@example.com',
//     cvUrl: 'https://example.com/cv/nadia.pdf',
//     isAccepted: false,
//   },
// ];

// const Teachers = (): ReactElement => {
//   const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

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
//           <TeachersTable teachers={teachers} setTeachers={setTeachers} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Teachers;














import { ReactElement } from 'react';
import { Box, Stack, Typography, Container } from '@mui/material';

// Valeur par défaut de drawerWidth (tu peux aussi l'importer depuis main-layout si elle est définie ailleurs)
const drawerWidth = 240;

const Teachers = (): ReactElement => {
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
          C'est Teachers
        </Typography>
      </Stack>
    </Container>
  );
};

export default Teachers;



// import { ReactElement, useState } from 'react';
// import { Stack } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
// import { drawerWidth } from './../../layouts/main-layout';
// import TeachersTable from './TeachersTable';

// // Interface pour un enseignant
// interface Teacher {
//   id: number;
//   fullName: string;
//   registrationNumber: string;
//   phone: string;
//   email: string;
//   specialty: string; // Nouveau champ
//   cvUrl: string;
//   isAccepted: boolean;
// }

// // Données d'exemple pour les enseignants
// const initialTeachers: Teacher[] = [
//   {
//     id: 1,
//     fullName: 'Jean Dupont',
//     registrationNumber: 'T12345',
//     phone: '1234 5678',
//     email: 'jean.dupont@example.com',
//     specialty: 'Mathématiques',
//     cvUrl: 'https://example.com/cvs/jean.pdf',
//     isAccepted: true,
//   },
//   {
//     id: 2,
//     fullName: 'Marie Curie',
//     registrationNumber: 'T67890',
//     phone: '2345 6789',
//     email: 'marie.curie@example.com',
//     specialty: 'Physique',
//     cvUrl: 'https://example.com/cvs/marie.pdf',
//     isAccepted: false,
//   },
//   {
//     id: 3,
//     fullName: 'Ahmed Benali',
//     registrationNumber: 'T11223',
//     phone: '3456 7890',
//     email: 'ahmed.benali@example.com',
//     specialty: 'Français',
//     cvUrl: 'https://example.com/cvs/ahmed.pdf',
//     isAccepted: true,
//   },
// ];

// const Teachers = (): ReactElement => {
//   const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);

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
//           <TeachersTable teachers={teachers} setTeachers={setTeachers} />
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Teachers;
