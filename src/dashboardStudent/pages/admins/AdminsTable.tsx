import { ChangeEvent, useMemo, useState, useEffect } from "react";
import {
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Box,
} from "@mui/material";
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridSlots,
  useGridApiRef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import IconifyIcon from "../../components/base/IconifyIcon";
import CustomPagination from "./CustomPagination";
import { debounce } from "@mui/material/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import "./../élèves/swal-custom.css";

interface Admin {
  id: string;
  fullName: string;
  email: string;
  createdAt?: string;
}

interface AdminsTableProps {
  admins: Admin[];
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
}

const MySwal = withReactContent(Swal);

const AdminsTable = ({ admins, setAdmins }: AdminsTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Nom et Prénom", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    {
      field: "createdAt",
      headerName: "Date de création",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) =>
        params.value ? new Date(params.value).toLocaleDateString("fr-FR") : "N/A",
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Admin>) => (
        <Stack direction="row" spacing={1}>
          <IconifyIcon
            icon="mdi:account-edit"
            width={24}
            height={24}
            color="gray"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              MySwal.fire({
                title: "Modifier administrateur",
                html: (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      padding: 2,
                    }}
                  >
                    <TextField
                      id="swal-fullName"
                      label="Nom et Prénom"
                      defaultValue={params.row?.fullName || ""}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                    <TextField
                      id="swal-email"
                      label="Email"
                      defaultValue={params.row?.email || ""}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                    <TextField
                      id="swal-password"
                      label="Nouveau mot de passe (optionnel)"
                      type="password"
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                ),
                showCancelButton: true,
                confirmButtonText: "Enregistrer",
                cancelButtonText: "Annuler",
                customClass: {
                  popup: "swal-custom-popup",
                  title: "swal-custom-title",
                  confirmButton: "swal-custom-button",
                  cancelButton: "swal-custom-button",
                },
                preConfirm: async () => {
                  try {
                    const fullName = (
                      document.getElementById("swal-fullName") as HTMLInputElement
                    ).value;
                    const email = (
                      document.getElementById("swal-email") as HTMLInputElement
                    ).value;
                    const password = (
                      document.getElementById("swal-password") as HTMLInputElement
                    ).value;

                    if (!fullName || !email) {
                      Swal.showValidationMessage("Le nom et l'email sont requis.");
                      return false;
                    }
                    if (email && !/\S+@\S+\.\S+/.test(email)) {
                      Swal.showValidationMessage("Veuillez entrer un email valide.");
                      return false;
                    }
                    if (password && password.length < 8) {
                      Swal.showValidationMessage(
                        "Le mot de passe doit contenir au moins 8 caractères."
                      );
                      return false;
                    }

                    const token = localStorage.getItem("token");
                    if (!token) {
                      throw new Error("Aucun token d'authentification trouvé.");
                    }

                    // Définir explicitement le type de updateData
                    const updateData: { name: string; email: string; password?: string } = {
                      name: fullName,
                      email,
                    };
                    if (password) {
                      updateData.password = password;
                    }

                    const response = await axios.patch(
                      `http://localhost:5000/api/admins/${params.row.id}`,
                      updateData,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );

                    setAdmins((prev) =>
                      prev.map((admin) =>
                        admin.id === params.row.id
                          ? { ...admin, fullName, email }
                          : admin
                      )
                    );

                    return response.data;
                  } catch (error: any) {
                    console.error("Erreur lors de la mise à jour :", error);
                    Swal.showValidationMessage(
                      error.response?.data?.message || "Erreur lors de la mise à jour."
                    );
                    return false;
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Modifié !",
                    text: "L’administrateur a été mis à jour.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                  });
                }
              });
            }}
          />
          <IconifyIcon
            icon="mdi:delete-outline"
            width={24}
            height={24}
            color="red"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              Swal.fire({
                title: "Êtes-vous sûr ?",
                text: `Supprimer l'administrateur n°${params.row.id} ?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Oui, supprimer",
                cancelButtonText: "Annuler",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    const token = localStorage.getItem("token");
                    if (!token) {
                      throw new Error("Aucun token d'authentification trouvé.");
                    }

                    await axios.delete(
                      `http://localhost:5000/api/admins/${params.row.id}`,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );

                    setAdmins((prev) =>
                      prev.filter((admin) => admin.id !== params.row.id)
                    );

                    Swal.fire({
                      title: "Supprimé !",
                      text: "L’administrateur a été supprimé.",
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                    });
                  } catch (error: any) {
                    console.error("Erreur lors de la suppression :", error);
                    Swal.fire({
                      title: "Erreur",
                      text:
                        error.response?.data?.message ||
                        "Impossible de supprimer l'administrateur.",
                      icon: "error",
                      confirmButtonColor: "#d33",
                    });
                  }
                }
              });
            }}
          />
        </Stack>
      ),
    },
  ];

  const visibleColumns = useMemo(() => columns, []);

  // Recherche avec debounce
  const handleGridSearch = useMemo(
    () =>
      debounce((searchValue: string) => {
        console.log("Recherche - Valeur :", searchValue);
        fetchAdmins(searchValue, paginationModel.page + 1);
      }, 500),
    [paginationModel.page]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  // Récupérer les administrateurs depuis le backend
  const fetchAdmins = async (searchValue: string = "", page: number = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Aucun token d'authentification trouvé.");
      }

      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: paginationModel.pageSize.toString(),
        search: searchValue,
      });

      const response = await axios.get(`http://localhost:5000/api/admins?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAdmins(response.data.admins || []);
      setTotalRows(response.data.total || 0);
    } catch (error: any) {
      console.error("Erreur lors de la récupération des administrateurs :", error);
      Swal.fire({
        title: "Erreur",
        text: error.response?.data?.message || "Erreur lors du chargement des administrateurs.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger les administrateurs au montage et lors des changements de pagination
  useEffect(() => {
    fetchAdmins(search, paginationModel.page + 1);
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <Stack
      height={1}
      bgcolor="background.paper"
      borderRadius={5}
      boxShadow={(theme) => theme.shadows[5]}
      sx={{ overflow: "hidden" }}
    >
      <Stack
        direction={{ sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        padding={3.75}
        gap={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Liste des administrateurs
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
      <DataGrid
        apiRef={apiRef}
        columns={visibleColumns}
        rows={admins}
        getRowId={(row) => row.id}
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
            <section>Aucun administrateur disponible</section>
          ),
        }}
        loading={loading}
        sx={{
          height: "auto",
          width: 1,
          borderRadius: 2,
          "& .MuiDataGrid-main": { borderRadius: 2 },
        }}
      />
    </Stack>
  );
};

export default AdminsTable;





















// import { ChangeEvent, useMemo, useState } from "react";
// import {
//   Divider,
//   LinearProgress,
//   Stack,
//   TextField,
//   Typography,
//   InputAdornment,
//   Box,
// } from "@mui/material";
// import {
//   DataGrid,
//   GridApi,
//   GridColDef,
//   GridSlots,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// import IconifyIcon from "./../../components/base/IconifyIcon";
// import CustomPagination from "./CustomPagination";
// import { debounce } from "@mui/material/utils";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
// import "./../élèves/swal-custom.css";

// interface Admin {
//   id: number;
//   fullName: string;
//   email: string;
//   // phone: string;
//   // role: string;
//   password: string;
// }

// interface AdminsTableProps {
//   admins: Admin[];
//   setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
// }

// const MySwal = withReactContent(Swal);

// const AdminsTable = ({ admins, setAdmins }: AdminsTableProps) => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState("");

//   const columns: GridColDef[] = [
//     { field: "fullName", headerName: "Nom et Prénom", flex: 1, minWidth: 150 },
//     { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
//     {
//       field: "actions",
//       headerName: "Action",
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
//             sx={{ cursor: "pointer" }}
//             onClick={() => {
//               MySwal.fire({
//                 title: "Modifier administrateur",
//                 html: (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 2,
//                       padding: 2,
//                     }}
//                   >
//                     <TextField
//                       id="swal-fullName"
//                       label="Nom et Prénom"
//                       defaultValue={params?.row?.fullName || ""}
//                       fullWidth
//                       size="small"
//                       variant="outlined"
//                     />
//                     <TextField
//                       id="swal-email"
//                       label="Email"
//                       defaultValue={params?.row?.email || ""}
//                       fullWidth
//                       size="small"
//                       variant="outlined"
//                     />
//                   </Box>
//                 ),
//                 showCancelButton: true,
//                 confirmButtonText: "Enregistrer",
//                 cancelButtonText: "Annuler",
//                 customClass: {
//                   popup: "swal-custom-popup",
//                   title: "swal-custom-title",
//                   confirmButton: "swal-custom-button",
//                   cancelButton: "swal-custom-button",
//                 },
//                 preConfirm: () => {
//                   const fullName = (
//                     document.getElementById("swal-fullName") as HTMLInputElement
//                   ).value;
//                   const email = (
//                     document.getElementById("swal-email") as HTMLInputElement
//                   ).value;
//                   setAdmins((prev) =>
//                     prev.map((admin) =>
//                       admin.id === params.row.id
//                         ? { ...admin, fullName, email }
//                         : admin
//                     )
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
//             sx={{ cursor: "pointer" }}
//             onClick={() => {
//               Swal.fire({
//                 title: "Êtes-vous sûr ?",
//                 text: `Supprimer l'administrateur n°${params.row.id} ?`,
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#d33",
//                 cancelButtonColor: "#3085d6",
//                 confirmButtonText: "Oui, supprimer",
//                 cancelButtonText: "Annuler",
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setAdmins((prev) =>
//                     prev.filter((admin) => admin.id !== params.row.id)
//                   );
//                   Swal.fire({
//                     title: "Supprimé !",
//                     text: "L’administrateur a été supprimé.",
//                     icon: "success",
//                   });
//                 }
//               });
//             }}
//           />
//         </Stack>
//       ),
//     },
//   ];

//   // eslint-disable-next-line react-hooks/exhaustive-deps
// const visibleColumns = useMemo(() => columns, []);

//   const handleGridSearch = useMemo(
//     () =>
//       debounce((searchValue: string) => {
//         if (apiRef.current) {
//           apiRef.current.setQuickFilterValues(
//             searchValue.split(" ").filter((word: string) => word !== "")
//           );
//         }
//       }, 250),
//     [apiRef]
//   );

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const searchValue = event.currentTarget.value;
//     setSearch(searchValue);
//     handleGridSearch(searchValue);
//   };

//   return (
//     <Stack
//       height={1}
//       bgcolor="background.paper" // Fond appliqué à tout le tableau
//       borderRadius={5} // Aligné avec Reclamations.tsx
//       boxShadow={(theme) => theme.shadows[5]} // Ajout d'une ombre pour cohérence
//       sx={{ overflow: "hidden" }} // Prévenir les débordements
//     >
//       <Stack
//         direction={{ sm: "row" }}
//         justifyContent="space-between"
//         alignItems="center"
//         padding={3.75}
//         gap={3.75}
//       >
//         <Typography variant="h5" color="text.primary">
//           Liste des administrateurs
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
//       <DataGrid
//         apiRef={apiRef}
//         columns={visibleColumns}
//         rows={admins}
//         getRowHeight={() => 70}
//         hideFooterSelectedRowCount
//         disableColumnResize
//         disableColumnSelector
//         disableRowSelectionOnClick
//         rowSelection={false}
//         initialState={{
//           pagination: { paginationModel: { pageSize: 5, page: 0 } },
//         }}
//         pageSizeOptions={[5]}
//         slots={{
//           loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
//           pagination: CustomPagination,
//           noRowsOverlay: () => (
//             <section>Aucun administrateur disponible</section>
//           ),
//         }}
//         sx={{
//           height: "auto",
//           width: 1,
//           borderRadius: 2,
//           "& .MuiDataGrid-main": { borderRadius: 2 },
//         }}
//       />
//     </Stack>
//   );
// };

// export default AdminsTable;




