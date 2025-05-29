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
} from "@mui/x-data-grid";
import IconifyIcon from "../../components/base/IconifyIcon";
import CustomPagination from "./CustomPagination";
import { debounce } from "@mui/material/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios, { AxiosError } from "axios";
import "../élèves/swal-custom.css";

const MySwal = withReactContent(Swal);

// Interface pour un enseignant
interface Teacher {
  id: string; // Changé en string pour MongoDB _id
  fullName: string;
  registrationNumber: string;
  phone: string;
  email: string;
  specialty: string; // Chaîne des spécialités séparées par des virgules
  cvUrl: string;
  isAccepted: boolean;
}

// Interface pour les erreurs Axios
interface ErrorResponse {
  message?: string;
}

const TeachersTable = () => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Nom et Prénom",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "registrationNumber",
      headerName: "Matricule",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "phone",
      headerName: "N° de tél",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "specialty",
      headerName: "Spécialité",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "cvUrl",
      headerName: "CV",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color="primary.main"
          sx={{ cursor: params.value ? "pointer" : "default", textDecoration: params.value ? "underline" : "none" }}
          onClick={() => params.value && window.open(params.value, "_blank")}
        >
          {params.value ? "Voir CV" : "Aucun CV"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 180,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconifyIcon
            icon={
              params.row.isAccepted
                ? "mdi:checkbox-marked-circle"
                : "mdi:checkbox-blank-circle-outline"
            }
            width={24}
            height={24}
            color={params.row.isAccepted ? "green" : "gray"}
            onClick={async () => {
              if (!params.row.isAccepted) {
                try {
                  const token = localStorage.getItem("token");
                  console.log("Accepter - Token :", token); // Log pour débogage
                  console.log("Accepter - ID :", params.row.id); // Log pour débogage
                  if (!token) {
                    throw new Error("Aucun token d'authentification trouvé.");
                  }

                  const response = await axios.patch(
                    `http://localhost:5000/api/teachers/${params.row.id}/accept`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  console.log("Accepter - Réponse :", response.data); // Log pour débogage

                  setTeachers((prev) =>
                    prev.map((teacher) =>
                      teacher.id === params.row.id
                        ? { ...teacher, isAccepted: true }
                        : teacher
                    )
                  );

                  Swal.fire({
                    title: "Enseignant accepté !",
                    text: `L'enseignant n°${params.row.id} a été accepté avec succès.`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                  });
                } catch (err) {
                  console.error("❌ Erreur lors de l'acceptation :", err); // Log pour débogage
                  const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
                    "Impossible d'accepter l'enseignant.";
                  Swal.fire({
                    icon: "error",
                    title: "Erreur",
                    text: errorMessage,
                    confirmButtonColor: "#d33",
                  });
                }
              }
            }}
            sx={{ cursor: params.row.isAccepted ? "default" : "pointer" }}
          />
          <IconifyIcon
            icon="mdi:account-edit"
            width={24}
            height={24}
            color="gray"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              MySwal.fire({
                title: "Modifier enseignant",
                html: (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      padding: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-fullName"
                        label="Nom et Prénom"
                        defaultValue={params?.row?.fullName || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        id="swal-registrationNumber"
                        label="Matricule"
                        defaultValue={params?.row?.registrationNumber || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-phone"
                        label="N° de tél"
                        defaultValue={params?.row?.phone || ""}
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
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-specialty"
                        label="Spécialité"
                        defaultValue={params?.row?.specialty || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                        helperText="Entrez les spécialités séparées par des virgules"
                      />
                      <TextField
                        id="swal-cv"
                        label="Nouveau CV"
                        type="file"
                        fullWidth
                        size="small"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
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
                    const registrationNumber = (
                      document.getElementById("swal-registrationNumber") as HTMLInputElement
                    ).value;
                    const phone = (
                      document.getElementById("swal-phone") as HTMLInputElement
                    ).value;
                    const email = (
                      document.getElementById("swal-email") as HTMLInputElement
                    ).value;
                    const specialty = (
                      document.getElementById("swal-specialty") as HTMLInputElement
                    ).value;
                    const cvFile = (
                      document.getElementById("swal-cv") as HTMLInputElement
                    ).files?.[0];

                    const token = localStorage.getItem("token");
                    console.log("Modifier - Token :", token); // Log pour débogage
                    console.log("Modifier - ID :", params.row.id); // Log pour débogage
                    if (!token) {
                      throw new Error("Aucun token d'authentification trouvé.");
                    }

                    const formData = new FormData();
                    formData.append("teacherName", fullName);
                    formData.append("matricule", registrationNumber);
                    formData.append("phone", phone);
                    formData.append("email", email);
                    formData.append("speciality", JSON.stringify(specialty.split(",").map((s: string) => s.trim())));
                    if (cvFile) {
                      formData.append("cv", cvFile);
                    }

                    const response = await axios.patch(
                      `http://localhost:5000/api/teachers/${params.row.id}`,
                      formData,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("Modifier - Réponse :", response.data); // Log pour débogage

                    setTeachers((prev) =>
                      prev.map((teacher) =>
                        teacher.id === params.row.id
                          ? {
                              ...teacher,
                              fullName,
                              registrationNumber,
                              phone,
                              email,
                              specialty,
                              cvUrl: response.data.teacher.cvUrl,
                            }
                          : teacher
                      )
                    );

                    return true;
                  } catch (err) {
                    console.error("❌ Erreur lors de la modification :", err); // Log pour débogage
                    Swal.showValidationMessage(
                      (err as AxiosError<ErrorResponse>).response?.data?.message ||
                      "Impossible de modifier l'enseignant."
                    );
                    return false;
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Modifié !",
                    text: "L'enseignant a été mis à jour.",
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
                text: `Supprimer l'enseignant n°${params.row.id} ?`,
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
                    console.log("Supprimer - Token :", token); // Log pour débogage
                    console.log("Supprimer - ID :", params.row.id); // Log pour débogage
                    if (!token) {
                      throw new Error("Aucun token d'authentification trouvé.");
                    }

                    const response = await axios.delete(
                      `http://localhost:5000/api/teachers/${params.row.id}`,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("Supprimer - Réponse :", response.data); // Log pour débogage

                    setTeachers((prev) =>
                      prev.filter((teacher) => teacher.id !== params.row.id)
                    );

                    Swal.fire({
                      title: "Supprimé !",
                      text: "L’enseignant a été supprimé.",
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                    });
                  } catch (err) {
                    console.error("❌ Erreur lors de la suppression :", err); // Log pour débogage
                    const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
                      "Impossible de supprimer l'enseignant.";
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
        console.log("Recherche - Valeur :", searchValue); // Log pour débogage
        fetchTeachers(searchValue, paginationModel.page + 1);
      }, 500),
    [paginationModel.page]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  // Récupérer les enseignants depuis le backend
  const fetchTeachers = async (searchValue: string = "", page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      console.log("Récupération des enseignants - Token :", token); // Log pour débogage
      if (!token) {
        throw new Error("Aucun token d'authentification trouvé.");
      }

      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: paginationModel.pageSize.toString(),
        search: searchValue,
      });
      console.log("Récupération des enseignants - Paramètres :", params.toString()); // Log pour débogage

      const response = await axios.get(`http://localhost:5000/api/teachers?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Récupération des enseignants - Réponse :", response.data); // Log pour débogage

      setTeachers(response.data.teachers);
      setTotalRows(response.data.total);
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des enseignants :", err); // Log pour débogage
      const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
        "Erreur lors du chargement des enseignants.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Charger les enseignants au montage et lors des changements de pagination
  useEffect(() => {
    console.log("useEffect - Page :", paginationModel.page + 1); // Log pour débogage
    fetchTeachers(search, paginationModel.page + 1);
  }, [paginationModel.page, paginationModel.pageSize]);

  // Afficher l'état de chargement
  if (loading && teachers.length === 0) {
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
    <Stack height={1}>
      <Stack
        direction={{ sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        padding={3.75}
        gap={3.75}
      >
        <Typography variant="h5" color="text.primary">
          Liste des enseignants
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
        rows={teachers}
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
          noRowsOverlay: () => <section>Aucun enseignant disponible</section>,
        }}
        loading={loading}
        sx={{
          height: 1,
          width: 1,
          borderRadius: 2,
          "& .MuiDataGrid-main": {
            borderRadius: 2,
          },
        }}
      />
    </Stack>
  );
};

export default TeachersTable;




















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
// import "../élèves/swal-custom.css";

// const MySwal = withReactContent(Swal);

// // Interface pour un enseignant
// interface Teacher {
//   id: number;
//   fullName: string;
//   registrationNumber: string;
//   phone: string;
//   email: string;
//   specialty: string; // Nouveau champ pour la spécialité
//   cvUrl: string;
//   isAccepted: boolean;
// }

// // Props pour le composant TeachersTable
// interface TeachersTableProps {
//   teachers: Teacher[];
//   setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
// }

// const TeachersTable = ({ teachers, setTeachers }: TeachersTableProps) => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState("");

//   const columns: GridColDef[] = [
//     {
//       field: "fullName",
//       headerName: "Nom et Prénom",
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: "registrationNumber",
//       headerName: "Matricule",
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: "phone",
//       headerName: "N° de tél",
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1,
//       minWidth: 200,
//     },
//     {
//       field: "specialty",
//       headerName: "Spécialité",
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: "cvUrl",
//       headerName: "CV",
//       flex: 1,
//       minWidth: 120,
//       renderCell: (params) => (
//         <Typography
//           variant="body2"
//           color="primary.main"
//           sx={{ cursor: "pointer", textDecoration: "underline" }}
//           onClick={() => window.open(params.value, "_blank")}
//         >
//           Voir CV
//         </Typography>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Action",
//       minWidth: 180,
//       filterable: false,
//       sortable: false,
//       renderCell: (params) => (
//         <Stack direction="row" spacing={1}>
//           <IconifyIcon
//             icon={
//               params.row.isAccepted
//                 ? "mdi:checkbox-marked-circle"
//                 : "mdi:checkbox-blank-circle-outline"
//             }
//             width={24}
//             height={24}
//             color={params.row.isAccepted ? "green" : "gray"}
//             onClick={() => {
//               if (!params.row.isAccepted) {
//                 Swal.fire({
//                   title: "Voulez-vous accepter cet enseignant ?",
//                   text: `Accepter l'enseignant n°${params.row.id} ?`,
//                   icon: "question",
//                   showCancelButton: true,
//                   confirmButtonColor: "#3085d6",
//                   cancelButtonColor: "#d33",
//                   confirmButtonText: "Oui, accepter",
//                   cancelButtonText: "Annuler",
//                 }).then((result) => {
//                   if (result.isConfirmed) {
//                     setTeachers((prev) =>
//                       prev.map((teacher) =>
//                         teacher.id === params.row.id
//                           ? { ...teacher, isAccepted: true }
//                           : teacher
//                       )
//                     );
//                     Swal.fire({
//                       title: "Enseignant accepté !",
//                       text: `L'enseignant n°${params.row.id} a été accepté avec succès.`,
//                       icon: "success",
//                       confirmButtonColor: "#3085d6",
//                     });
//                   }
//                 });
//               }
//             }}
//             sx={{ cursor: params.row.isAccepted ? "default" : "pointer" }}
//           />
//           <IconifyIcon
//             icon="mdi:account-edit"
//             width={24}
//             height={24}
//             color="gray"
//             sx={{ cursor: "pointer" }}
//             onClick={() => {
//               MySwal.fire({
//                 title: "Modifier enseignant",
//                 html: (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 2,
//                       padding: 2,
//                     }}
//                   >
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <TextField
//                         id="swal-fullName"
//                         label="Nom et Prénom"
//                         defaultValue={params?.row?.fullName || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                       <TextField
//                         id="swal-registrationNumber"
//                         label="Matricule"
//                         defaultValue={params?.row?.registrationNumber || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <TextField
//                         id="swal-phone"
//                         label="N° de tél"
//                         defaultValue={params?.row?.phone || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                       <TextField
//                         id="swal-email"
//                         label="Email"
//                         defaultValue={params?.row?.email || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <TextField
//                         id="swal-specialty"
//                         label="Spécialité"
//                         defaultValue={params?.row?.specialty || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                       <TextField
//                         id="swal-cvUrl"
//                         label="URL du CV"
//                         defaultValue={params?.row?.cvUrl || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                     </Box>
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
//                   const registrationNumber = (
//                     document.getElementById(
//                       "swal-registrationNumber"
//                     ) as HTMLInputElement
//                   ).value;
//                   const phone = (
//                     document.getElementById("swal-phone") as HTMLInputElement
//                   ).value;
//                   const email = (
//                     document.getElementById("swal-email") as HTMLInputElement
//                   ).value;
//                   const specialty = (
//                     document.getElementById(
//                       "swal-specialty"
//                     ) as HTMLInputElement
//                   ).value;
//                   const cvUrl = (
//                     document.getElementById("swal-cvUrl") as HTMLInputElement
//                   ).value;
//                   setTeachers((prev) =>
//                     prev.map((teacher) =>
//                       teacher.id === params.row.id
//                         ? {
//                             ...teacher,
//                             fullName,
//                             registrationNumber,
//                             phone,
//                             email,
//                             specialty,
//                             cvUrl,
//                           }
//                         : teacher
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
//                 text: `Supprimer l'enseignant n°${params.row.id} ?`,
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#d33",
//                 cancelButtonColor: "#3085d6",
//                 confirmButtonText: "Oui, supprimer",
//                 cancelButtonText: "Annuler",
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setTeachers((prev) =>
//                     prev.filter((teacher) => teacher.id !== params.row.id)
//                   );
//                   Swal.fire({
//                     title: "Supprimé !",
//                     text: "L’enseignant a été supprimé.",
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

//   const visibleColumns = useMemo(() => columns, []);

//   // const handleGridSearch = useMemo(() => {
//   //   return debounce((searchValue) => {
//   //     apiRef.current.setQuickFilterValues(
//   //       searchValue.split(' ').filter((word: string) => word !== ''),
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
//     <Stack height={1}>
//       <Stack
//         direction={{ sm: "row" }}
//         justifyContent="space-between"
//         alignItems="center"
//         padding={3.75}
//         gap={3.75}
//       >
//         <Typography variant="h5" color="text.primary">
//           Liste des enseignants
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
//         rows={teachers}
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
//           noRowsOverlay: () => <section>Aucun enseignant disponible</section>,
//         }}
//         sx={{
//           height: 1,
//           width: 1,
//           borderRadius: 2,
//           "& .MuiDataGrid-main": {
//             borderRadius: 2,
//           },
//         }}
//       />
//     </Stack>
//   );
// };

// export default TeachersTable;
