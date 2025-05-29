import { ReactElement } from "react";
import { Box, Stack, Typography, Container } from "@mui/material";

// Valeur par défaut de drawerWidth (tu peux aussi l'importer depuis main-layout si elle est définie ailleurs)
const drawerWidth = 240;

const Reclamations = (): ReactElement => {
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
          C'est Reclamations
        </Typography>
      </Stack>
    </Container>
  );
};

export default Reclamations;
// import { ChangeEvent, ReactElement, useMemo, useState } from "react";
// import {
//   Divider,
//   InputAdornment,
//   LinearProgress,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
// import {
//   DataGrid,
//   GridApi,
//   GridColDef,
//   GridSlots,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// import IconifyIcon from "./../../components/base/IconifyIcon";
// import CustomPagination from "./../../components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination";
// import { debounce } from "@mui/material/utils";
// import Swal from "sweetalert2";
// import { drawerWidth } from "./../../layouts/main-layout";

// interface Complaint {
//   id: number;
//   fullName: string;
//   email: string;
//   message: string;
//   isTreated: boolean;
// }

// const initialComplaints: Complaint[] = [
//   {
//     id: 1,
//     fullName: "Jean Dupont",
//     email: "jean.dupont@example.com",
//     message:
//       "A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.",
//     isTreated: false,
//   },
//   {
//     id: 2,
//     fullName: "Marie Lefèvre",
//     email: "marie.lefevre@example.com",
//     message: "Erreur dans la facturation du mois dernier.",
//     isTreated: false,
//   },
//   {
//     id: 3,
//     fullName: "Ahmed Benali",
//     email: "ahmed.benali@example.com",
//     message: "Demande de support pour réinitialiser mon mot de passe.",
//     isTreated: false,
//   },
//   {
//     id: 4,
//     fullName: "Sophie Martin",
//     email: "sophie.martin@example.com",
//     message: "Problème avec l’affichage des cours sur mobile.",
//     isTreated: false,
//   },
// ];

// const Reclamations = (): ReactElement => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState("");
//   const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

//   const columns: GridColDef[] = [
//     {
//       field: "date",
//       headerName: "Date",
//       minWidth: 110,
//       renderCell: (params) => (
//         <Typography variant="body2" color="text.secondary">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "fullName",
//       headerName: "Nom et Prénom",
//       flex: 1,
//       minWidth: 150,
//       renderCell: (params) => (
//         <Typography variant="body1" color="text.primary">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//       minWidth: 200,
//       renderCell: (params) => (
//         <Typography variant="body1" color="primary.main">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: "message",
//       headerName: "Message",
//       flex: 1,
//       minWidth: 150,
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           color="primary.main"
//           sx={{ cursor: "pointer", textDecoration: "underline" }}
//           onClick={() =>
//             Swal.fire({
//               title: "Détail de la réclamation",
//               text: params.row.message,
//               icon: "info",
//               confirmButtonColor: "#3085d6",
//             })
//           }
//         >
//           Voir détail
//         </Typography>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Action",
//       minWidth: 120,
//       filterable: false,
//       sortable: false,
//       renderCell: (params) => (
//         <Stack direction="row" spacing={1}>
//           <IconifyIcon
//             icon={
//               params.row.isTreated
//                 ? "mdi:checkbox-marked-circle"
//                 : "mdi:checkbox-blank-circle-outline"
//             }
//             width={24}
//             height={24}
//             color={params.row.isTreated ? "green" : "gray"}
//             onClick={() => {
//               if (!params.row.isTreated) {
//                 Swal.fire({
//                   icon: "success",
//                   title: "Réclamation traitée",
//                   text: `La réclamation n°${params.row.id} a été marquée comme traitée.`,
//                   confirmButtonColor: "#3085d6",
//                 });
//                 setComplaints((prev) =>
//                   prev.map((item) =>
//                     item.id === params.row.id
//                       ? { ...item, isTreated: true }
//                       : item
//                   )
//                 );
//               }
//             }}
//             sx={{ cursor: params.row.isTreated ? "default" : "pointer" }}
//           />
//           <IconifyIcon
//             icon="mdi:delete-outline"
//             width={24}
//             height={24}
//             color="red"
//             onClick={() => {
//               Swal.fire({
//                 title: "Êtes-vous sûr ?",
//                 text: `Supprimer la réclamation n°${params.row.id} ?`,
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#d33",
//                 cancelButtonColor: "#3085d6",
//                 confirmButtonText: "Oui, supprimer",
//                 cancelButtonText: "Annuler",
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setComplaints((prev) =>
//                     prev.filter((item) => item.id !== params.row.id)
//                   );
//                   Swal.fire({
//                     title: "Supprimée !",
//                     text: "La réclamation a été supprimée.",
//                     icon: "success",
//                     confirmButtonColor: "#3085d6",
//                   });
//                 }
//               });
//             }}
//             sx={{ cursor: "pointer" }}
//           />
//         </Stack>
//       ),
//     },
//   ];

//   const visibleColumns = useMemo(() => columns, []);

//   // const handleGridSearch = useMemo(() => {
//   //   return debounce((searchValue) => {
//   //     apiRef.current.setQuickFilterValues(
//   //       searchValue.split(' ').filter((word: any) => word !== ''),
//   //     );
//   //   }, 250);
//   // }, [apiRef]);
//   const handleGridSearch = useMemo(() => {
//     return debounce((searchValue: string) => {
//       if (apiRef.current) {
//         apiRef.current.setQuickFilterValues(
//           searchValue.split(" ").filter((word: string) => word !== "")
//         );
//       }
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
//             direction={{ sm: "row" }}
//             justifyContent="space-between"
//             alignItems="center"
//             padding={3.75}
//             gap={3.75}
//           >
//             <Typography variant="h5" color="text.primary">
//               Liste des Réclamations
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
//               rows={complaints}
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
//                 loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
//                 pagination: CustomPagination,
//                 noRowsOverlay: () => (
//                   <section>Aucune réclamation disponible</section>
//                 ),
//               }}
//               sx={{ height: 1, width: 1 }}
//             />
//           </Stack>
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Reclamations;






















// import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
// import {
//   Divider,
//   InputAdornment,
//   LinearProgress,
//   Stack,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
// import IconifyIcon from 'components/base/IconifyIcon';
// import CustomPagination from 'components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination';
// import { debounce } from '@mui/material/utils';
// import Swal from 'sweetalert2';

// interface Complaint {
//   id: number;
//   fullName: string;
//   email: string;
//   message: string;
//   date: string;
//   isTreated: boolean;
// }

// const initialComplaints: Complaint[] = [
//   {
//     id: 1,
//     fullName: 'Jean Dupont',
//     email: 'jean.dupont@example.com',
//     message: 'Problème de connexion à la plateforme.',
//     date: '2025-04-01',
//     isTreated: false,
//   },
//   {
//     id: 2,
//     fullName: 'Marie Lefèvre',
//     email: 'marie.lefevre@example.com',
//     message: 'Erreur dans la facturation du mois dernier.',
//     date: '2025-04-03',
//     isTreated: false,
//   },
//   {
//     id: 3,
//     fullName: 'Ahmed Benali',
//     email: 'ahmed.benali@example.com',
//     message: 'Demande de support pour réinitialiser mon mot de passe.',
//     date: '2025-04-15',
//     isTreated: false,
//   },
//   {
//     id: 4,
//     fullName: 'Sophie Martin',
//     email: 'sophie.martin@example.com',
//     message: 'Problème avec l’affichage des cours sur mobile.',
//     date: '2025-04-28',
//     isTreated: false,
//   },
// ];

// const Reclamations = (): ReactElement => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState('');
//   const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

//   const columns: GridColDef[] = [
//     {
//       field: 'date',
//       headerName: 'Date',
//       minWidth: 110,
//       renderCell: (params) => (
//         <Typography variant="body2" color="text.secondary">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: 'fullName',
//       headerName: 'Nom et Prénom',
//       flex: 1,
//       minWidth: 150,
//       renderCell: (params) => (
//         <Typography variant="body1" color="text.primary">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: 'email',
//       headerName: 'Email',
//       flex: 1,
//       minWidth: 200,
//       renderCell: (params) => (
//         <Typography variant="body1" color="primary.main">
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: 'message',
//       headerName: 'Message',
//       flex: 1,
//       minWidth: 150,
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           color="primary.main"
//           sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//           onClick={() =>
//             Swal.fire({
//               title: 'Détail de la réclamation',
//               text: params.row.message,
//               icon: 'info',
//               confirmButtonColor: '#3085d6',
//             })
//           }
//         >
//           Voir détail
//         </Typography>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Action',
//       minWidth: 120,
//       renderCell: (params) => (
//         <Stack direction="row" spacing={1}>
//           <IconifyIcon
//             icon={
//               params.row.isTreated
//                 ? 'mdi:checkbox-marked-circle'
//                 : 'mdi:checkbox-blank-circle-outline'
//             }
//             width={24}
//             height={24}
//             color={params.row.isTreated ? 'green' : 'gray'}
//             onClick={() => {
//               if (!params.row.isTreated) {
//                 Swal.fire({
//                   icon: 'success',
//                   title: 'Réclamation traitée',
//                   text: `La réclamation n°${params.row.id} a été marquée comme traitée.`,
//                   confirmButtonColor: '#3085d6',
//                 });
//                 setComplaints((prev) =>
//                   prev.map((item) =>
//                     item.id === params.row.id ? { ...item, isTreated: true } : item,
//                   ),
//                 );
//               }
//             }}
//             sx={{ cursor: params.row.isTreated ? 'default' : 'pointer' }}
//           />

//           <IconifyIcon
//             icon="mdi:delete-outline"
//             width={24}
//             height={24}
//             color="red"
//             onClick={() => {
//               Swal.fire({
//                 title: 'Êtes-vous sûr ?',
//                 text: `Supprimer la réclamation n°${params.row.id} ?`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#d33',
//                 cancelButtonColor: '#3085d6',
//                 confirmButtonText: 'Oui, supprimer',
//                 cancelButtonText: 'Annuler',
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setComplaints((prev) => prev.filter((item) => item.id !== params.row.id));
//                   Swal.fire({
//                     title: 'Supprimée !',
//                     text: 'La réclamation a été supprimée.',
//                     icon: 'success',
//                     confirmButtonColor: '#3085d6',
//                   });
//                 }
//               });
//             }}
//             sx={{ cursor: 'pointer' }}
//           />
//         </Stack>
//       ),
//     },
//   ];

//   const visibleColumns = useMemo(() => columns, []);

//   const handleGridSearch = useMemo(() => {
//     return debounce((searchValue) => {
//       apiRef.current.setQuickFilterValues(
//         searchValue.split(' ').filter((word: any) => word !== ''),
//       );
//     }, 250);
//   }, [apiRef]);

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const searchValue = event.currentTarget.value;
//     setSearch(searchValue);
//     handleGridSearch(searchValue);
//   };

//   return (
//     <Stack
//       bgcolor="background.paper"
//       borderRadius={5}
//       width={1}
//       boxShadow={(theme) => theme.shadows[4]}
//       height={1}
//     >
//       <Stack
//         direction={{ sm: 'row' }}
//         justifyContent="space-between"
//         alignItems="center"
//         padding={3.75}
//         gap={3.75}
//       >
//         <Typography variant="h5" color="text.primary">
//           Liste des Réclamations
//         </Typography>
//         <TextField
//           variant="filled"
//           placeholder="Rechercher..."
//           onChange={handleChange}
//           value={search}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
//                 <IconifyIcon icon="mdi:search" width={1} height={1} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>
//       <Divider />
//       <Stack height={1}>
//         <DataGrid
//           apiRef={apiRef}
//           columns={visibleColumns}
//           rows={complaints}
//           getRowHeight={() => 70}
//           hideFooterSelectedRowCount
//           disableColumnResize
//           disableColumnSelector
//           disableRowSelectionOnClick
//           rowSelection={false}
//           initialState={{
//             pagination: { paginationModel: { pageSize: 5, page: 0 } },
//           }}
//           pageSizeOptions={[5]}
//           slots={{
//             loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
//             pagination: CustomPagination,
//             noRowsOverlay: () => <section>Aucune réclamation disponible</section>,
//           }}
//           sx={{ height: 1, width: 1 }}
//         />
//       </Stack>
//     </Stack>
//   );
// };

// export default Reclamations;
