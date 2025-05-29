import { ChangeEvent, ReactElement, useMemo, useState, useEffect } from "react";
import {
  Divider,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  GridProps,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridSlots,
  useGridApiRef,
} from "@mui/x-data-grid";
import IconifyIcon from "../../components/base/IconifyIcon";
import CustomPagination from "../../components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination";
import { debounce } from "@mui/material/utils";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";

// Interface pour une réclamation
interface Complaint {
  id: string; // ID MongoDB sous forme de chaîne
  fullName: string;
  email: string;
  message: string;
  date: string;
  isTreated: boolean;
}

// Interface pour les erreurs Axios avec une réponse du serveur
interface ErrorResponse {
  message?: string;
}

const Reclamations = (): ReactElement => {
  // Référence pour l'API de DataGrid
  const apiRef = useGridApiRef<GridApi>();
  // État pour la recherche
  const [search, setSearch] = useState("");
  // État pour les réclamations
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  // État pour la pagination
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  // État pour le nombre total de réclamations
  const [totalRows, setTotalRows] = useState(0);
  // État pour le chargement
  const [loading, setLoading] = useState(false);
  // État pour les erreurs
  const [error, setError] = useState<string | null>(null);

  // Colonnes du DataGrid
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      minWidth: 110,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "fullName",
      headerName: "Nom et Prénom",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body1" color="text.primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Typography variant="body1" color="primary.main">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color="primary.main"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() =>
            Swal.fire({
              title: "Détail de la réclamation",
              text: params.row.message,
              icon: "info",
              confirmButtonColor: "#3085d6",
            })
          }
        >
          Voir détail
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconifyIcon
            icon={
              params.row.isTreated
                ? "mdi:checkbox-marked-circle"
                : "mdi:checkbox-blank-circle-outline"
            }
            width={24}
            height={24}
            color={params.row.isTreated ? "green" : "gray"}
            onClick={async () => {
              if (!params.row.isTreated) {
                try {
                  // Récupérer le token
                  const token = localStorage.getItem("token");
                  console.log("Marquer comme traité - Token :", token); // Log pour débogage
                  console.log("Marquer comme traité - ID :", params.row.id); // Log pour débogage
                  if (!token) {
                    throw new Error("Aucun token d'authentification trouvé.");
                  }

                  // Marquer la réclamation comme traitée
                  const response = await axios.patch(
                    `http://localhost:5000/api/contacts/${params.row.id}/treat`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  console.log("Marquer comme traité - Réponse :", response.data); // Log pour débogage

                  // Mettre à jour l'état local
                  setComplaints((prev) =>
                    prev.map((item) =>
                      item.id === params.row.id
                        ? { ...item, isTreated: true }
                        : item
                    )
                  );

                  Swal.fire({
                    icon: "success",
                    title: "Réclamation traitée",
                    text: `La réclamation n°${params.row.id} a été marquée comme traitée.`,
                    confirmButtonColor: "#3085d6",
                  });
                } catch (err) {
                  console.error("❌ Erreur lors du marquage comme traité :", err); // Log pour débogage
                  // Typage de l'erreur comme AxiosError
                  const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
                    "Impossible de marquer la réclamation comme traitée.";
                  Swal.fire({
                    icon: "error",
                    title: "Erreur",
                    text: errorMessage,
                    confirmButtonColor: "#d33",
                  });
                }
              }
            }}
            sx={{ cursor: params.row.isTreated ? "default" : "pointer" }}
          />
          <IconifyIcon
            icon="mdi:delete-outline"
            width={24}
            height={24}
            color="red"
            onClick={() => {
              Swal.fire({
                title: "Êtes-vous sûr ?",
                text: `Supprimer la réclamation n°${params.row.id} ?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Oui, supprimer",
                cancelButtonText: "Annuler",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    // Récupérer le token
                    const token = localStorage.getItem("token");
                    console.log("Supprimer - Token :", token); // Log pour débogage
                    console.log("Supprimer - ID :", params.row.id); // Log pour débogage
                    if (!token) {
                      throw new Error("Aucun token d'authentification trouvé.");
                    }

                    // Supprimer la réclamation
                    const response = await axios.delete(
                      `http://localhost:5000/api/contacts/${params.row.id}`,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("Supprimer - Réponse :", response.data); // Log pour débogage

                    // Mettre à jour l'état local
                    setComplaints((prev) =>
                      prev.filter((item) => item.id !== params.row.id)
                    );

                    Swal.fire({
                      title: "Supprimée !",
                      text: "La réclamation a été supprimée.",
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                    });
                  } catch (err) {
                    console.error("❌ Erreur lors de la suppression :", err); // Log pour débogage
                    // Typage de l'erreur comme AxiosError
                    const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
                      "Impossible de supprimer la réclamation.";
                    Swal.fire({
                      icon: "error",
                      title: "Erreur",
                      text: errorMessage,
                      confirmButtonColor: "#d33",
                    });
                  }
                }
              });
            }}
            sx={{ cursor: "pointer" }}
          />
        </Stack>
      ),
    },
  ];

  // Colonnes visibles
  const visibleColumns = useMemo(() => columns, []);

  // Fonction de recherche avec debounce
  const handleGridSearch = useMemo(
    () =>
      debounce((searchValue) => {
        console.log("Recherche - Valeur :", searchValue); // Log pour débogage
        fetchComplaints(searchValue, paginationModel.page + 1);
      }, 500),
    [paginationModel.page]
  );

  // Gérer les changements dans le champ de recherche
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  // Récupérer les réclamations depuis le backend
  const fetchComplaints = async (searchValue: string = "", page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      // Récupérer le token
      const token = localStorage.getItem("token");
      console.log("Récupération des réclamations - Token :", token); // Log pour débogage
      if (!token) {
        throw new Error("Aucun token d'authentification trouvé.");
      }

      // Construire l'URL avec les paramètres de requête
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: paginationModel.pageSize.toString(),
        search: searchValue,
      });
      console.log("Récupération des réclamations - Paramètres :", params.toString()); // Log pour débogage

      // Requête GET vers l'endpoint
      const response = await axios.get(`http://localhost:5000/api/contacts?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Récupération des réclamations - Réponse :", response.data); // Log pour débogage

      // Mettre à jour les états
      setComplaints(response.data.contacts);
      setTotalRows(response.data.total);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des réclamations :", err); // Log pour débogage
      // Typage de l'erreur comme AxiosError
      const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
        "Erreur lors du chargement des réclamations.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Charger les réclamations au montage et lors des changements de pagination
  useEffect(() => {
    console.log("useEffect - Page :", paginationModel.page + 1); // Log pour débogage
    fetchComplaints(search, paginationModel.page + 1);
  }, [paginationModel.page, paginationModel.pageSize]);

  // Afficher l'état de chargement
  if (loading && complaints.length === 0) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <LinearProgress sx={{ width: "50%" }} />
      </Stack>
    );
  }

  // Afficher l'état d'erreur
  if (error) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <Typography color="error">{error}</Typography>
      </Stack>
    );
  }

  return (
    <Grid
      container
      component="main"
      spacing={0}
      sx={{
        width: "100%",
        pt: { xs: 2, md: 4.375 },
        pb: { xs: 1, md: 0 },
        pl: 0,
        pr: 0,
      }}
    >
      <Grid
        item
        xs={12}
        component="div"
        {...({} as GridProps)}
        sx={{ px: { xs: 2, sm: 3 }, width: "100%" }}
      >
        <Stack
          bgcolor="background.paper"
          borderRadius={5}
          boxShadow={(theme) => theme.shadows[4]}
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Stack
            direction={{ sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            padding={3.75}
            gap={3.75}
          >
            <Typography variant="h5" color="text.primary">
              Liste des Réclamations
            </Typography>
            <TextField
              variant="filled"
              placeholder="Rechercher..."
              onChange={handleChange}
              value={search}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
                    <IconifyIcon icon="mdi:search" width={1} height={1} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Divider />
          <Stack sx={{ height: "auto" }}>
            <DataGrid
              apiRef={apiRef}
              columns={visibleColumns}
              rows={complaints}
              getRowHeight={() => 70}
              hideFooterSelectedRowCount
              disableColumnResize
              disableColumnSelector
              disableRowSelectionOnClick
              rowSelection={false}
              pagination
              paginationMode="server"
              rowCount={totalRows}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5]}
              slots={{
                loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
                pagination: CustomPagination,
                noRowsOverlay: () => (
                  <section>Aucune réclamation disponible</section>
                ),
              }}
              loading={loading}
              sx={{ height: 1, width: "100%" }}
            />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
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
//   GridProps,
// } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import {
//   DataGrid,
//   GridApi,
//   GridColDef,
//   GridSlots,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// import IconifyIcon from "../../components/base/IconifyIcon";
// import CustomPagination from "../../components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination";
// import { debounce } from "@mui/material/utils";
// import Swal from "sweetalert2";

// // Valeur par défaut de drawerWidth (comme dans Students.tsx)
// // const drawerWidth = 278;

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
//     fullName: "Jean Dupont",
//     email: "jean.dupont@example.com",
//     message: "Problème de connexion à la plateforme.",
//     date: "2025-04-01",
//     isTreated: false,
//   },
//   {
//     id: 2,
//     fullName: "Marie Lefèvre",
//     email: "marie.lefevre@example.com",
//     message: " ❌ Erreur dans la facturation du mois dernier.",
//     date: "2025-04-03",
//     isTreated: false,
//   },
//   {
//     id: 3,
//     fullName: "Ahmed Benali",
//     email: "ahmed.benali@example.com",
//     message: "Demande de support pour réinitialiser mon mot de passe.",
//     date: "2025-04-15",
//     isTreated: false,
//   },
//   {
//     id: 4,
//     fullName: "Sophie Martin",
//     email: "sophie.martin@example.com",
//     message: " ❌ Problème avec l’affichage des cours sur mobile.",
//     date: "2025-04-28",
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

//   const handleGridSearch = useMemo(() => {
//     return debounce((searchValue) => {
//       if (apiRef.current) {
//         apiRef.current.setQuickFilterValues(
//           searchValue.split(" ").filter((word: any) => word !== "")
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
//       spacing={0}
//       sx={{
//         width: "100%",
//         pt: { xs: 2, md: 4.375 },
//         pb: { xs: 1, md: 0 },
//         pl: 0,
//         pr: 0,
//       }}
//     >
//       <Grid
//         item
//         xs={12}
//         component="div"
//         {...({} as GridProps)}
//         sx={{ px: { xs: 2, sm: 3 }, width: "100%" }}
//       >
//         <Stack
//           bgcolor="background.paper"
//           borderRadius={5}
//           boxShadow={(theme) => theme.shadows[4]}
//           sx={{
//             width: "100%",
//             overflow: "hidden",
//           }}
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
//           <Stack sx={{ height: "auto" }}>
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
//               sx={{ height: 1, width: "100%" }} // Simplifié pour correspondre à Students.tsx
//             />
//           </Stack>
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default Reclamations;
