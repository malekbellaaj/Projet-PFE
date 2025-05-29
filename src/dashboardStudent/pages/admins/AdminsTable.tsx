import { ChangeEvent, useMemo, useState } from "react";
import {
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridApi,
  GridColDef,
  GridSlots,
  useGridApiRef,
} from "@mui/x-data-grid";
import IconifyIcon from "./../../components/base/IconifyIcon";
import CustomPagination from "./../../components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination";
import { debounce } from "@mui/material/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./../élèves/swal-custom.css";

interface Admin {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

interface AdminsTableProps {
  admins: Admin[];
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
}

const MySwal = withReactContent(Swal);

const AdminsTable = ({ admins, setAdmins }: AdminsTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const columns: GridColDef[] = [
    { field: "fullName", headerName: "Nom et Prénom", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 120,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
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
                      defaultValue={params?.row?.fullName || ""}
                      fullWidth
                      size="small"
                      variant="outlined"
                    />
                    <TextField
                      id="swal-email"
                      label="Email"
                      defaultValue={params?.row?.email || ""}
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
                preConfirm: () => {
                  const fullName = (
                    document.getElementById("swal-fullName") as HTMLInputElement
                  ).value;
                  const email = (
                    document.getElementById("swal-email") as HTMLInputElement
                  ).value;
                  setAdmins((prev) =>
                    prev.map((admin) =>
                      admin.id === params.row.id
                        ? { ...admin, fullName, email }
                        : admin
                    )
                  );
                },
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
              }).then((result) => {
                if (result.isConfirmed) {
                  setAdmins((prev) =>
                    prev.filter((admin) => admin.id !== params.row.id)
                  );
                  Swal.fire({
                    title: "Supprimé !",
                    text: "L’administrateur a été supprimé.",
                    icon: "success",
                  });
                }
              });
            }}
          />
        </Stack>
      ),
    },
  ];

  const visibleColumns = useMemo(() => columns, []);

  // const handleGridSearch = useMemo(
  //   () =>
  //     debounce((searchValue) => {
  //       apiRef.current.setQuickFilterValues(
  //         searchValue.split(' ').filter((word: string) => word !== ''),
  //       );
  //     }, 250),
  //   [apiRef],
  // );
  const handleGridSearch = useMemo(
    () =>
      debounce((searchValue: string) => {
        if (apiRef.current) {
          apiRef.current.setQuickFilterValues(
            searchValue.split(" ").filter((word: string) => word !== "")
          );
        }
      }, 250),
    [apiRef]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFormSubmit = () => {
    let errors = { fullName: "", email: "", password: "" };
    let hasError = false;

    if (!formData.fullName.trim()) {
      errors.fullName = "Le nom et prénom sont requis";
      hasError = true;
    }
    if (!formData.email.trim()) {
      errors.email = "L’email est requis";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Veuillez entrer un email valide";
      hasError = true;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (!formData.password) {
      errors.password = "Le mot de passe est requis";
      hasError = true;
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Le mot de passe doit contenir au moins 8 caractères, un chiffre et un symbole";
      hasError = true;
    }

    setFormErrors(errors);

    if (hasError) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez corriger les erreurs dans le formulaire",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setAdmins((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        fullName: formData.fullName,
        email: formData.email,
        phone: "",
        role: "",
        password: formData.password,
      },
    ]);

    setFormData({ fullName: "", email: "", password: "" });
    setFormErrors({ fullName: "", email: "", password: "" });

    Swal.fire({
      title: "Succès",
      text: "L’administrateur a été ajouté avec succès !",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <Stack minHeight={1} spacing={2}>
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
        getRowHeight={() => 70}
        hideFooterSelectedRowCount
        disableColumnResize
        disableColumnSelector
        disableRowSelectionOnClick
        rowSelection={false}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        pageSizeOptions={[5]}
        slots={{
          loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
          pagination: CustomPagination,
          noRowsOverlay: () => (
            <section>Aucun administrateur disponible</section>
          ),
        }}
        sx={{
          height: "auto",
          width: 1,
          borderRadius: 2,
          "& .MuiDataGrid-main": { borderRadius: 2 },
        }}
      />
      <Divider sx={{ my: 2 }} />
      <Box
        mt={2}
        bgcolor="background.paper"
        borderRadius={5}
        p={3}
        boxShadow={(theme) => theme.shadows[2]}
      >
        <Typography variant="h6" color="text.primary" mb={2}>
          Ajouter un nouvel administrateur
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Nom et Prénom"
            name="fullName"
            value={formData.fullName}
            onChange={handleFormChange}
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleFormChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Mot de passe"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleFormChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <IconifyIcon
                      icon={showPassword ? "mdi:eye-off" : "mdi:eye"}
                      color="black"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
            sx={{ alignSelf: "flex-end" }}
          >
            Ajouter
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AdminsTable;

// import { ChangeEvent, useMemo, useState } from 'react';
// import { Divider, LinearProgress, Stack, TextField, Typography, InputAdornment, Box } from '@mui/material';
// import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
// import IconifyIcon from 'components/base/IconifyIcon';
// import CustomPagination from 'components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination';
// import { debounce } from '@mui/material/utils';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import './../élèves/swal-custom.css';

// // Interface pour un administrateur
// interface Admin {
//   id: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   role: string;
// }

// // Props pour le composant AdminsTable
// interface AdminsTableProps {
//   admins: Admin[];
//   setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>;
// }

// const MySwal = withReactContent(Swal);

// const AdminsTable = ({ admins, setAdmins }: AdminsTableProps) => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState('');

//   const columns: GridColDef[] = [
//     {
//       field: 'fullName',
//       headerName: 'Nom et Prénom',
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
//               MySwal.fire({
//                 title: 'Modifier administrateur',
//                 html: (
//                   <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
//                     <TextField
//                       id="swal-fullName"
//                       label="Nom et Prénom"
//                       defaultValue={params?.row?.fullName || ''}
//                       fullWidth
//                       size="small"
//                       variant="outlined"
//                     />
//                     <TextField
//                       id="swal-email"
//                       label="Email"
//                       defaultValue={params?.row?.email || ''}
//                       fullWidth
//                       size="small"
//                       variant="outlined"
//                     />
//                   </Box>
//                 ),
//                 showCancelButton: true,
//                 confirmButtonText: 'Enregistrer',
//                 cancelButtonText: 'Annuler',
//                 customClass: {
//                   popup: 'swal-custom-popup',
//                   title: 'swal-custom-title',
//                   confirmButton: 'swal-custom-button',
//                   cancelButton: 'swal-custom-button',
//                 },
//                 preConfirm: () => {
//                   const fullName = (document.getElementById('swal-fullName') as HTMLInputElement).value;
//                   const email = (document.getElementById('swal-email') as HTMLInputElement).value;
//                   setAdmins((prev) =>
//                     prev.map((admin) =>
//                       admin.id === params.row.id
//                         ? { ...admin, fullName, email }
//                         : admin,
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
//                 text: `Supprimer l'administrateur n°${params.row.id} ?`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#d33',
//                 cancelButtonColor: '#3085d6',
//                 confirmButtonText: 'Oui, supprimer',
//                 cancelButtonText: 'Annuler',
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setAdmins((prev) => prev.filter((admin) => admin.id !== params.row.id));
//                   Swal.fire({
//                     title: 'Supprimé !',
//                     text: 'L’administrateur a été supprimé.',
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
//     <Stack height={1}>
//       <Stack
//         direction={{ sm: 'row' }}
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
//           loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
//           pagination: CustomPagination,
//           noRowsOverlay: () => <section>Aucun administrateur disponible</section>,
//         }}
//         sx={{
//           height: 1,
//           width: 1,
//           borderRadius: 2,
//           '& .MuiDataGrid-main': {
//             borderRadius: 2,
//           },
//         }}
//       />
//     </Stack>
//   );
// };

// export default AdminsTable;
