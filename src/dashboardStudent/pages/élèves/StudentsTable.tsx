import { ChangeEvent, useMemo, useState, useEffect } from "react";
import {
  LinearProgress,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  Divider,
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
import axios, { AxiosError } from "axios";
import "./swal-custom.css";

const MySwal = withReactContent(Swal);

// Interface pour un élève
interface Student {
  id: string;
  parentFullName: string;
  parentPhone: string;
  parentEmail: string;
  studentFullName: string;
  birthDate: string;
  situation: string;
  level: string;
  photoUrl: string;
}

// Interface pour les erreurs Axios
interface ErrorResponse {
  message?: string;
}

// Types pour situation et level
type SituationDisplay = "Normaux" | "Hyperactif" | "Autiste" | "Aveugle" | "Sourd-muet";
type LevelDisplay =
  | "1ère année"
  | "2ème année"
  | "3ème année"
  | "4ème année"
  | "5ème année"
  | "6ème année";

// Type générique pour valueGetter params
interface GridValueGetterParams {
  row?: Student;
  value?: any;
  [key: string]: any; // Pour gérer les structures inattendues
}

// Mappages pour convertir les valeurs affichées en valeurs MongoDB
const situationMapReverse: Record<SituationDisplay, string> = {
  Normaux: "normal",
  Hyperactif: "hyperactif",
  Autiste: "autiste",
  Aveugle: "aveugle",
  "Sourd-muet": "sourdmuet",
};

const levelMapReverse: Record<LevelDisplay, string> = {
  "1ère année": "1",
  "2ème année": "2",
  "3ème année": "3",
  "4ème année": "4",
  "5ème année": "5",
  "6ème année": "6",
};

const StudentsTable = () => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Options pour les champs select
  const situationOptions: SituationDisplay[] = [
    "Normaux",
    "Hyperactif",
    "Autiste",
    "Aveugle",
    "Sourd-muet",
  ];
  const levelOptions: LevelDisplay[] = [
    "1ère année",
    "2ème année",
    "3ème année",
    "4ème année",
    "5ème année",
    "6ème année",
  ];

  const columns: GridColDef[] = [
    {
      field: "parentInfo",
      headerName: "Parent",
      flex: 1,
      minWidth: 250,
      valueGetter: (params: GridValueGetterParams) => {
        console.log("valueGetter params:", JSON.stringify(params, null, 2)); // Log détaillé
        if (!params || !params.row) {
          console.warn("valueGetter: params ou params.row est undefined", params);
          return "N/A";
        }
        return `${params.row.parentFullName || "N/A"} ${params.row.parentPhone || "N/A"} ${params.row.parentEmail || "N/A"}`;
      },
      renderCell: (params: GridRenderCellParams<Student>) => (
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body2" fontWeight="bold">
            {params.row?.parentFullName || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {params.row?.parentPhone || "N/A"}
          </Typography>
          <Typography variant="body2" color="primary.main">
            {params.row?.parentEmail || "N/A"}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "studentFullName",
      headerName: "Élève",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "birthDate",
      headerName: "Né(e) le",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "situation",
      headerName: "Situation",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "level",
      headerName: "Niveau",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "photoUrl",
      headerName: "Photo",
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<Student>) => (
        <Typography
          variant="body2"
          color="primary.main"
          sx={{ cursor: params.value ? "pointer" : "default", textDecoration: params.value ? "underline" : "none" }}
          onClick={() => params.value && window.open(params.value, "_blank")}
        >
          {params.value ? "Voir Photo" : "Aucune Photo"}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Student>) => (
        <Stack direction="row" spacing={1}>
          <IconifyIcon
            icon="mdi:account-edit"
            width={24}
            height={24}
            color="gray"
            sx={{ cursor: "pointer" }}
            onClick={() => {
              MySwal.fire({
                title: "Modifier élève",
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
                        id="swal-parent-name"
                        label="Nom du Parent"
                        defaultValue={params.row?.parentFullName || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        id="swal-parent-phone"
                        label="Téléphone du Parent"
                        defaultValue={params.row?.parentPhone || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                        helperText="Format : +216 12 345 678"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-parent-email"
                        label="Email du Parent"
                        defaultValue={params.row?.parentEmail || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        id="swal-student-name"
                        label="Nom de l'Élève"
                        defaultValue={params.row?.studentFullName || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-birth-date"
                        label="Date de Naissance"
                        defaultValue={params.row?.birthDate || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                        helperText="Format : YYYY-MM-DD"
                      />
                      <TextField
                        id="swal-situation"
                        label="Situation"
                        select
                        defaultValue={params.row?.situation || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                        SelectProps={{ native: true }}
                      >
                        {situationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </TextField>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-level"
                        label="Niveau"
                        select
                        defaultValue={params.row?.level || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                        SelectProps={{ native: true }}
                      >
                        {levelOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </TextField>
                      <TextField
                        id="swal-photo"
                        label="Nouvelle Photo"
                        type="file"
                        fullWidth
                        size="small"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: "image/jpeg,image/png" }}
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
                    const parentName = (
                      document.getElementById("swal-parent-name") as HTMLInputElement
                    ).value;
                    const parentPhone = (
                      document.getElementById("swal-parent-phone") as HTMLInputElement
                    ).value;
                    const parentEmail = (
                      document.getElementById("swal-parent-email") as HTMLInputElement
                    ).value;
                    const studentName = (
                      document.getElementById("swal-student-name") as HTMLInputElement
                    ).value;
                    const birthDate = (
                      document.getElementById("swal-birth-date") as HTMLInputElement
                    ).value;
                    const situation = (
                      document.getElementById("swal-situation") as HTMLInputElement
                    ).value as SituationDisplay;
                    const level = (
                      document.getElementById("swal-level") as HTMLInputElement
                    ).value as LevelDisplay;
                    const photoFile = (
                      document.getElementById("swal-photo") as HTMLInputElement
                    ).files?.[0];

                    const token = localStorage.getItem("token");
                    console.log("Modifier - Token :", token); // Log pour débogage
                    console.log("Modifier - ID :", params.row?.id); // Log pour débogage
                    if (!token) {
                      throw new Error("Aucun token d'authentification trouvé.");
                    }
                    if (!params.row?.id) {
                      throw new Error("ID de l'élève manquant.");
                    }

                    const formData = new FormData();
                    formData.append("ParentName", parentName);
                    formData.append("StudentName", studentName);
                    formData.append("email", parentEmail);
                    formData.append("phone", parentPhone);
                    formData.append("studentSituation", situationMapReverse[situation]);
                    formData.append("birthDate", birthDate);
                    formData.append("schoolLevel", levelMapReverse[level]);
                    if (photoFile) {
                      formData.append("faceImage", photoFile);
                    }

                    const response = await axios.patch(
                      `http://localhost:5000/api/students/${params.row.id}`,
                      formData,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("Modifier - Réponse :", response.data); // Log pour débogage

                    setStudents((prev) =>
                      prev.map((student) =>
                        student.id === params.row?.id
                          ? {
                              ...student,
                              parentFullName: parentName,
                              parentPhone,
                              parentEmail,
                              studentFullName: studentName,
                              birthDate,
                              situation,
                              level,
                              photoUrl: response.data.student.photoUrl,
                            }
                          : student
                      )
                    );

                    return true;
                  } catch (err) {
                    console.error("❌ Erreur lors de la modification :", err); // Log pour débogage
                    Swal.showValidationMessage(
                      (err as AxiosError<ErrorResponse>).response?.data?.message ||
                        "Impossible de modifier l'élève."
                    );
                    return false;
                  }
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Modifié !",
                    text: "L'élève a été mis à jour.",
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
              if (!params.row?.id) {
                Swal.fire({
                  icon: "error",
                  title: "Erreur",
                  text: "ID de l'élève manquant.",
                  confirmButtonColor: "#d33",
                });
                return;
              }
              Swal.fire({
                title: "Êtes-vous sûr ?",
                text: `Supprimer l'élève n°${params.row.id} ?`,
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
                      `http://localhost:5000/api/students/${params.row.id}`,
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                    console.log("Supprimer - Réponse :", response.data); // Log pour débogage

                    setStudents((prev) =>
                      prev.filter((student) => student.id !== params.row?.id)
                    );

                    Swal.fire({
                      title: "Supprimé !",
                      text: "L’élève a été supprimé.",
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                    });
                  } catch (err) {
                    console.error("❌ Erreur lors de la suppression :", err); // Log pour débogage
                    const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
                      "Impossible de supprimer l'élève.";
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
        fetchStudents(searchValue, paginationModel.page + 1);
      }, 500),
    [paginationModel.page]
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  // Récupérer les élèves depuis le backend
  const fetchStudents = async (searchValue: string = "", page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      console.log("Récupération des élèves - Token :", token); // Log pour débogage
      if (!token) {
        throw new Error("Aucun token d'authentification trouvé.");
      }

      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: paginationModel.pageSize.toString(),
        search: searchValue,
      });
      console.log("Récupération des élèves - Paramètres :", params.toString()); // Log pour débogage

      const response = await axios.get(`http://localhost:5000/api/students?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Récupération des élèves - Réponse :", response.data); // Log pour débogage

      // Validation des données
      if (!Array.isArray(response.data.students)) {
        console.warn("Réponse API invalide : students n'est pas un tableau", response.data);
        setStudents([]);
        setTotalRows(0);
      } else {
        setStudents(response.data.students);
        setTotalRows(response.data.total || 0);
      }
    } catch (err) {
      console.error("❌ Erreur lors de la récupération des élèves :", err); // Log pour débogage
      const errorMessage = (err as AxiosError<ErrorResponse>).response?.data?.message ||
        "Erreur lors du chargement des élèves.";
      setError(errorMessage);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger les élèves au montage et lors des changements de pagination
  useEffect(() => {
    console.log("useEffect - Page :", paginationModel.page + 1); // Log pour débogage
    fetchStudents(search, paginationModel.page + 1);
  }, [paginationModel.page, paginationModel.pageSize]);

  // Afficher l'état de chargement
  if (loading && students.length === 0) {
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

  // Ajouter une vérification pour éviter le rendu prématuré
  if (!students.length && !loading) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ py: 5 }}>
        <Typography>Aucune donnée disponible</Typography>
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
          Liste des Élèves
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
        rows={students}
        getRowId={(row) => row.id} // Explicitly specify row ID
        getRowHeight={() => 80}
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
          noRowsOverlay: () => <section>Aucun élève disponible</section>,
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

export default StudentsTable;











// import { ChangeEvent, useMemo, useState } from "react";
// import {
//   LinearProgress,
//   Stack,
//   TextField,
//   Typography,
//   InputAdornment,
//   Divider,
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
// import "./swal-custom.css";

// const MySwal = withReactContent(Swal);

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

// // Props pour le composant StudentsTable
// interface StudentsTableProps {
//   students: Student[];
//   setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
// }

// const StudentsTable = ({ students, setStudents }: StudentsTableProps) => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState("");

//   // Valider les données pour s'assurer que chaque étudiant est bien formé
//   const validStudents = students.filter(
//     (student) =>
//       student &&
//       typeof student === "object" &&
//       "id" in student &&
//       "parentFullName" in student &&
//       "parentPhone" in student &&
//       "parentEmail" in student &&
//       "studentFullName" in student &&
//       "birthDate" in student &&
//       "situation" in student &&
//       "level" in student &&
//       "photoUrl" in student
//   );

//   // Log pour diagnostiquer les données
//   console.log("Students:", students);
//   console.log("Valid Students:", validStudents);

//   const columns: GridColDef[] = [
//     {
//       field: "parentInfo",
//       headerName: "Parent",
//       flex: 1,
//       minWidth: 250,
//       valueGetter: (params: any) => {
//         console.log("valueGetter params:", params);
//         if (!params || !params.row) return "";
//         return `${params.row.parentFullName} ${params.row.parentPhone} ${params.row.parentEmail}`;
//       },
//       renderCell: (params: any) => (
//         <Stack direction="column" spacing={0.5}>
//           <Typography variant="body2" fontWeight="bold">
//             {params?.row?.parentFullName || "N/A"}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {params?.row?.parentPhone || "N/A"}
//           </Typography>
//           <Typography variant="body2" color="primary.main">
//             {params?.row?.parentEmail || "N/A"}
//           </Typography>
//         </Stack>
//       ),
//     },
//     {
//       field: "studentFullName",
//       headerName: "Élève",
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: "birthDate",
//       headerName: "Né(e) le",
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: "situation",
//       headerName: "Situation",
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: "level",
//       headerName: "Niveau",
//       flex: 1,
//       minWidth: 100,
//     },
//     {
//       field: "photoUrl",
//       headerName: "Photo",
//       flex: 1,
//       minWidth: 120,
//       renderCell: (params: any) => (
//         <Typography
//           variant="body2"
//           color="primary.main"
//           sx={{ cursor: "pointer", textDecoration: "underline" }}
//           onClick={() => params?.value && window.open(params.value, "_blank")}
//         >
//           Voir Photo
//         </Typography>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Action",
//       minWidth: 120,
//       filterable: false,
//       sortable: false,
//       renderCell: (params: any) => (
//         <Stack direction="row" spacing={1}>
//           <IconifyIcon
//             icon="mdi:account-edit"
//             width={24}
//             height={24}
//             color="gray"
//             sx={{ cursor: "pointer" }}
//             onClick={() => {
//               MySwal.fire({
//                 title: "Modifier élève",
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
//                         id="swal-parent-name"
//                         label="Nom du Parent"
//                         defaultValue={params?.row?.parentFullName || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                       <TextField
//                         id="swal-parent-phone"
//                         label="Téléphone du Parent"
//                         defaultValue={params?.row?.parentPhone || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <TextField
//                         id="swal-parent-email"
//                         label="Email du Parent"
//                         defaultValue={params?.row?.parentEmail || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                       <TextField
//                         id="swal-student-name"
//                         label="Nom de l'Élève"
//                         defaultValue={params?.row?.studentFullName || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <TextField
//                         id="swal-birth-date"
//                         label="Date de Naissance"
//                         defaultValue={params?.row?.birthDate || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                       <TextField
//                         id="swal-situation"
//                         label="Situation"
//                         defaultValue={params?.row?.situation || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <TextField
//                         id="swal-level"
//                         label="Niveau"
//                         defaultValue={params?.row?.level || ""}
//                         fullWidth
//                         size="small"
//                         variant="outlined"
//                       />
//                       <TextField
//                         id="swal-photo"
//                         label="URL de la Photo"
//                         defaultValue={params?.row?.photoUrl || ""}
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
//                   const parentName = (
//                     document.getElementById(
//                       "swal-parent-name"
//                     ) as HTMLInputElement
//                   ).value;
//                   const parentPhone = (
//                     document.getElementById(
//                       "swal-parent-phone"
//                     ) as HTMLInputElement
//                   ).value;
//                   const parentEmail = (
//                     document.getElementById(
//                       "swal-parent-email"
//                     ) as HTMLInputElement
//                   ).value;
//                   const studentName = (
//                     document.getElementById(
//                       "swal-student-name"
//                     ) as HTMLInputElement
//                   ).value;
//                   const birthDate = (
//                     document.getElementById(
//                       "swal-birth-date"
//                     ) as HTMLInputElement
//                   ).value;
//                   const situation = (
//                     document.getElementById(
//                       "swal-situation"
//                     ) as HTMLInputElement
//                   ).value;
//                   const level = (
//                     document.getElementById("swal-level") as HTMLInputElement
//                   ).value;
//                   const photoUrl = (
//                     document.getElementById("swal-photo") as HTMLInputElement
//                   ).value;
//                   setStudents((prev) =>
//                     prev.map((student) =>
//                       student.id === params.row.id
//                         ? {
//                             ...student,
//                             parentFullName: parentName,
//                             parentPhone,
//                             parentEmail,
//                             studentFullName: studentName,
//                             birthDate,
//                             situation,
//                             level,
//                             photoUrl,
//                           }
//                         : student
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
//                 text: `Supprimer l'élève n°${params.row.id} ?`,
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#d33",
//                 cancelButtonColor: "#3085d6",
//                 confirmButtonText: "Oui, supprimer",
//                 cancelButtonText: "Annuler",
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setStudents((prev) =>
//                     prev.filter((student) => student.id !== params.row.id)
//                   );
//                   Swal.fire({
//                     title: "Supprimé !",
//                     text: "L’élève a été supprimé.",
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

//   if (!validStudents.length) {
//     return (
//       <Stack height={1} justifyContent="center" alignItems="center">
//         <Typography variant="h6" color="text.secondary">
//           Aucune donnée d'élève disponible
//         </Typography>
//       </Stack>
//     );
//   }

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
//           Liste des Élèves
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
//         rows={validStudents}
//         getRowHeight={() => 80}
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
//           noRowsOverlay: () => <section>Aucun élève disponible</section>,
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

// export default StudentsTable;
