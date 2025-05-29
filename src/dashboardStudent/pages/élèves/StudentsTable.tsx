import { ChangeEvent, useMemo, useState } from "react";
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
} from "@mui/x-data-grid";
import IconifyIcon from "./../../components/base/IconifyIcon";
import CustomPagination from "./../../components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination";
import { debounce } from "@mui/material/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./swal-custom.css";

const MySwal = withReactContent(Swal);

// Interface pour un élève
interface Student {
  id: number;
  parentFullName: string; // Nom du parent
  parentPhone: string; // Téléphone du parent
  parentEmail: string; // Email du parent
  studentFullName: string;
  birthDate: string;
  situation: string;
  level: string;
  photoUrl: string;
}

// Props pour le composant StudentsTable
interface StudentsTableProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const StudentsTable = ({ students, setStudents }: StudentsTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState("");

  // Valider les données pour s'assurer que chaque étudiant est bien formé
  const validStudents = students.filter(
    (student) =>
      student &&
      typeof student === "object" &&
      "id" in student &&
      "parentFullName" in student &&
      "parentPhone" in student &&
      "parentEmail" in student &&
      "studentFullName" in student &&
      "birthDate" in student &&
      "situation" in student &&
      "level" in student &&
      "photoUrl" in student
  );

  // Log pour diagnostiquer les données
  console.log("Students:", students);
  console.log("Valid Students:", validStudents);

  const columns: GridColDef[] = [
    {
      field: "parentInfo",
      headerName: "Parent",
      flex: 1,
      minWidth: 250,
      valueGetter: (params: any) => {
        console.log("valueGetter params:", params);
        if (!params || !params.row) return "";
        return `${params.row.parentFullName} ${params.row.parentPhone} ${params.row.parentEmail}`;
      },
      renderCell: (params: any) => (
        <Stack direction="column" spacing={0.5}>
          <Typography variant="body2" fontWeight="bold">
            {params?.row?.parentFullName || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {params?.row?.parentPhone || "N/A"}
          </Typography>
          <Typography variant="body2" color="primary.main">
            {params?.row?.parentEmail || "N/A"}
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
      renderCell: (params: any) => (
        <Typography
          variant="body2"
          color="primary.main"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => params?.value && window.open(params.value, "_blank")}
        >
          Voir Photo
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 120,
      filterable: false,
      sortable: false,
      renderCell: (params: any) => (
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
                        defaultValue={params?.row?.parentFullName || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        id="swal-parent-phone"
                        label="Téléphone du Parent"
                        defaultValue={params?.row?.parentPhone || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-parent-email"
                        label="Email du Parent"
                        defaultValue={params?.row?.parentEmail || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        id="swal-student-name"
                        label="Nom de l'Élève"
                        defaultValue={params?.row?.studentFullName || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-birth-date"
                        label="Date de Naissance"
                        defaultValue={params?.row?.birthDate || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        id="swal-situation"
                        label="Situation"
                        defaultValue={params?.row?.situation || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <TextField
                        id="swal-level"
                        label="Niveau"
                        defaultValue={params?.row?.level || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
                      />
                      <TextField
                        id="swal-photo"
                        label="URL de la Photo"
                        defaultValue={params?.row?.photoUrl || ""}
                        fullWidth
                        size="small"
                        variant="outlined"
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
                preConfirm: () => {
                  const parentName = (
                    document.getElementById(
                      "swal-parent-name"
                    ) as HTMLInputElement
                  ).value;
                  const parentPhone = (
                    document.getElementById(
                      "swal-parent-phone"
                    ) as HTMLInputElement
                  ).value;
                  const parentEmail = (
                    document.getElementById(
                      "swal-parent-email"
                    ) as HTMLInputElement
                  ).value;
                  const studentName = (
                    document.getElementById(
                      "swal-student-name"
                    ) as HTMLInputElement
                  ).value;
                  const birthDate = (
                    document.getElementById(
                      "swal-birth-date"
                    ) as HTMLInputElement
                  ).value;
                  const situation = (
                    document.getElementById(
                      "swal-situation"
                    ) as HTMLInputElement
                  ).value;
                  const level = (
                    document.getElementById("swal-level") as HTMLInputElement
                  ).value;
                  const photoUrl = (
                    document.getElementById("swal-photo") as HTMLInputElement
                  ).value;
                  setStudents((prev) =>
                    prev.map((student) =>
                      student.id === params.row.id
                        ? {
                            ...student,
                            parentFullName: parentName,
                            parentPhone,
                            parentEmail,
                            studentFullName: studentName,
                            birthDate,
                            situation,
                            level,
                            photoUrl,
                          }
                        : student
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
                text: `Supprimer l'élève n°${params.row.id} ?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Oui, supprimer",
                cancelButtonText: "Annuler",
              }).then((result) => {
                if (result.isConfirmed) {
                  setStudents((prev) =>
                    prev.filter((student) => student.id !== params.row.id)
                  );
                  Swal.fire({
                    title: "Supprimé !",
                    text: "L’élève a été supprimé.",
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

  // const handleGridSearch = useMemo(() => {
  //   return debounce((searchValue) => {
  //     apiRef.current.setQuickFilterValues(
  //       searchValue.split(' ').filter((word: string) => word !== ''),
  //     );
  //   }, 250);
  // }, [apiRef]);
  const handleGridSearch = useMemo(() => {
  return debounce((searchValue: string) => {
    if (apiRef.current) {
      apiRef.current.setQuickFilterValues(
        searchValue.split(' ').filter((word: string) => word !== '')
      );
    }
  }, 250);
}, [apiRef]);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

  if (!validStudents.length) {
    return (
      <Stack height={1} justifyContent="center" alignItems="center">
        <Typography variant="h6" color="text.secondary">
          Aucune donnée d'élève disponible
        </Typography>
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
        rows={validStudents}
        getRowHeight={() => 80}
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
          noRowsOverlay: () => <section>Aucun élève disponible</section>,
        }}
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

// import { ChangeEvent, useMemo, useState } from 'react';
// import { LinearProgress, Stack, TextField, Typography, InputAdornment, Divider } from '@mui/material';
// import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
// import IconifyIcon from 'components/base/IconifyIcon';
// import CustomPagination from 'components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination';
// import { debounce } from '@mui/material/utils';
// import Swal from 'sweetalert2';

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
//   const [search, setSearch] = useState('');

//   // Valider les données pour s'assurer que chaque étudiant est bien formé
//   const validStudents = students.filter(
//     (student) =>
//       student &&
//       typeof student === 'object' &&
//       'id' in student &&
//       'parentFullName' in student &&
//       'parentPhone' in student &&
//       'parentEmail' in student &&
//       'studentFullName' in student &&
//       'birthDate' in student &&
//       'situation' in student &&
//       'level' in student &&
//       'photoUrl' in student
//   );

//   // Log pour diagnostiquer les données
//   console.log('Students:', students);
//   console.log('Valid Students:', validStudents);

//   const columns: GridColDef[] = [
//     {
//       field: 'parentInfo',
//       headerName: 'Parent',
//       flex: 1,
//       minWidth: 250,
//       valueGetter: (params: any) => {
//         // params.row est attendu comme étant de type Student
//         console.log('valueGetter params:', params); // Log pour diagnostiquer params
//         if (!params || !params.row) return '';
//         return `${params.row.parentFullName} ${params.row.parentPhone} ${params.row.parentEmail}`;
//       },
//       renderCell: (params: any) => (
//         // params.row est attendu comme étant de type Student
//         <Stack direction="column" spacing={0.5}>
//           <Typography variant="body2" fontWeight="bold">
//             {params?.row?.parentFullName || 'N/A'}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {params?.row?.parentPhone || 'N/A'}
//           </Typography>
//           <Typography variant="body2" color="primary.main">
//             {params?.row?.parentEmail || 'N/A'}
//           </Typography>
//         </Stack>
//       ),
//     },
//     {
//       field: 'studentFullName',
//       headerName: "Nom et Prénom de l'Élève",
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: 'birthDate',
//       headerName: 'Date de Naissance',
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: 'situation',
//       headerName: 'Situation',
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: 'level',
//       headerName: 'Niveau',
//       flex: 1,
//       minWidth: 100,
//     },
//     {
//       field: 'photoUrl',
//       headerName: 'Photo',
//       flex: 1,
//       minWidth: 120,
//       renderCell: (params: any) => (
//         // params.row est attendu comme étant de type Student
//         <Typography
//           variant="body2"
//           color="primary.main"
//           sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//           onClick={() => params?.value && window.open(params.value, '_blank')}
//         >
//           Voir Photo
//         </Typography>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Action',
//       minWidth: 120, // Réduit car il n'y a plus que 2 icônes
//       filterable: false,
//       sortable: false,
//       renderCell: (params: any) => (
//         // params.row est attendu comme étant de type Student
//         <Stack direction="row" spacing={1}>
//           <IconifyIcon
//             icon="mdi:account-edit"
//             width={24}
//             height={24}
//             color="gray"
//             sx={{ cursor: 'pointer' }}
//             onClick={() => {
//               Swal.fire({
//                 title: 'Modifier élève',
//                 html: `
//                   <input id="swal-parent-name" class="swal2-input" placeholder="Nom du Parent" value="${params?.row?.parentFullName || ''}">
//                   <input id="swal-parent-phone" class="swal2-input" placeholder="Téléphone du Parent" value="${params?.row?.parentPhone || ''}">
//                   <input id="swal-parent-email" class="swal2-input" placeholder="Email du Parent" value="${params?.row?.parentEmail || ''}">
//                   <input id="swal-student-name" class="swal2-input" placeholder="Nom de l'Élève" value="${params?.row?.studentFullName || ''}">
//                   <input id="swal-birth-date" class="swal2-input" placeholder="Date de Naissance (DD/MM/YYYY)" value="${params?.row?.birthDate || ''}">
//                   <input id="swal-situation" class="swal2-input" placeholder="Situation" value="${params?.row?.situation || ''}">
//                   <input id="swal-level" class="swal2-input" placeholder="Niveau" value="${params?.row?.level || ''}">
//                   <input id="swal-photo" class="swal2-input" placeholder="URL de la Photo" value="${params?.row?.photoUrl || ''}">
//                 `,
//                 confirmButtonText: 'Enregistrer',
//                 cancelButtonText: 'Annuler',
//                 showCancelButton: true,
//                 focusConfirm: false,
//                 customClass: {
//                   popup: 'swal-custom-popup',
//                   title: 'swal-custom-title',
//                   htmlContainer: 'swal-custom-html',
//                   input: 'swal-custom-input',
//                   confirmButton: 'swal-custom-button',
//                   cancelButton: 'swal-custom-button',
//                 },
//                 preConfirm: () => {
//                   const parentName = (document.getElementById('swal-parent-name') as HTMLInputElement).value;
//                   const parentPhone = (document.getElementById('swal-parent-phone') as HTMLInputElement).value;
//                   const parentEmail = (document.getElementById('swal-parent-email') as HTMLInputElement).value;
//                   const studentName = (document.getElementById('swal-student-name') as HTMLInputElement).value;
//                   const birthDate = (document.getElementById('swal-birth-date') as HTMLInputElement).value;
//                   const situation = (document.getElementById('swal-situation') as HTMLInputElement).value;
//                   const level = (document.getElementById('swal-level') as HTMLInputElement).value;
//                   const photoUrl = (document.getElementById('swal-photo') as HTMLInputElement).value;
//                   setStudents((prev) =>
//                     prev.map((student) =>
//                       student.id === params.row.id
//                         ? { ...student, parentFullName: parentName, parentPhone, parentEmail, studentFullName: studentName, birthDate, situation, level, photoUrl }
//                         : student,
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
//                 text: `Supprimer l'élève n°${params.row.id} ?`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#d33',
//                 cancelButtonColor: '#3085d6',
//                 confirmButtonText: 'Oui, supprimer',
//                 cancelButtonText: 'Annuler',
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setStudents((prev) => prev.filter((student) => student.id !== params.row.id));
//                   Swal.fire({
//                     title: 'Supprimé !',
//                     text: 'L’élève a été supprimé.',
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

//   // Afficher un message si aucune donnée valide n'est disponible
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
//     <>
//       <style>
//         {`
//           .swal-custom-popup {
//             width: 400px !important;
//             padding: 16px !important;
//           }
//           .swal-custom-title {
//             font-size: 18px !important;
//             margin-bottom: 12px !important;
//           }
//           .swal-custom-html {
//             padding: 0 16px !important;
//           }
//           .swal-custom-input {
//             width: 100% !important;
//             font-size: 14px !important;
//             margin: 4px 0 !important;
//             padding: 8px !important;
//           }
//           .swal-custom-button {
//             font-size: 14px !important;
//             padding: 8px 16px !important;
//           }
//         `}
//       </style>
//       <Stack height={1}>
//         <Stack
//           direction={{ sm: 'row' }}
//           justifyContent="space-between"
//           alignItems="center"
//           padding={3.75}
//           gap={3.75}
//         >
//           <Typography variant="h5" color="text.primary">
//             Liste des Élèves
//           </Typography>
//           <TextField
//             variant="filled"
//             placeholder="Rechercher..."
//             onChange={handleChange}
//             value={search}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end" sx={{ width: 24, height: 24 }}>
//                   <IconifyIcon icon="mdi:search" width={1} height={1} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Stack>
//         <Divider />
//         <DataGrid
//           apiRef={apiRef}
//           columns={visibleColumns}
//           rows={validStudents}
//           getRowHeight={() => 80}
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
//             noRowsOverlay: () => <section>Aucun élève disponible</section>,
//           }}
//           sx={{
//             height: 1,
//             width: 1,
//             borderRadius: 2,
//             '& .MuiDataGrid-main': {
//               borderRadius: 2,
//             },
//           }}
//         />
//       </Stack>
//     </>
//   );
// };

// export default StudentsTable;

// table avec cocher dans action
// import { ChangeEvent, useMemo, useState } from 'react';
// import { Divider, LinearProgress, Stack, TextField, Typography, InputAdornment } from '@mui/material';
// import { DataGrid, GridApi, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
// import IconifyIcon from 'components/base/IconifyIcon';
// import CustomPagination from 'components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination';
// import { debounce } from '@mui/material/utils';
// import Swal from 'sweetalert2';

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

// // Props pour le composant StudentsTable
// interface StudentsTableProps {
//   students: Student[];
//   setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
// }

// const StudentsTable = ({ students, setStudents }: StudentsTableProps) => {
//   const apiRef = useGridApiRef<GridApi>();
//   const [search, setSearch] = useState('');

//   // Valider les données pour s'assurer que chaque étudiant est bien formé
//   const validStudents = students.filter(
//     (student) =>
//       student &&
//       typeof student === 'object' &&
//       'id' in student &&
//       'parentFullName' in student &&
//       'parentPhone' in student &&
//       'parentEmail' in student &&
//       'studentFullName' in student &&
//       'birthDate' in student &&
//       'situation' in student &&
//       'level' in student &&
//       'photoUrl' in student &&
//       'isAccepted' in student
//   );

//   // Log pour diagnostiquer les données
//   console.log('Students:', students);
//   console.log('Valid Students:', validStudents);

//   const columns: GridColDef[] = [
//     {
//       field: 'parentInfo',
//       headerName: 'Parent',
//       flex: 1,
//       minWidth: 250,
//       valueGetter: (params: any) => {
//         // params.row est attendu comme étant de type Student
//         console.log('valueGetter params:', params); // Log pour diagnostiquer params
//         if (!params || !params.row) return '';
//         return `${params.row.parentFullName} ${params.row.parentPhone} ${params.row.parentEmail}`;
//       },
//       renderCell: (params: any) => (
//         // params.row est attendu comme étant de type Student
//         <Stack direction="column" spacing={0.5}>
//           <Typography variant="body2" fontWeight="bold">
//             {params?.row?.parentFullName || 'N/A'}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {params?.row?.parentPhone || 'N/A'}
//           </Typography>
//           <Typography variant="body2" color="primary.main">
//             {params?.row?.parentEmail || 'N/A'}
//           </Typography>
//         </Stack>
//       ),
//     },
//     {
//       field: 'studentFullName',
//       headerName: 'Nom et Prénom de l\'Élève',
//       flex: 1,
//       minWidth: 150,
//     },
//     {
//       field: 'birthDate',
//       headerName: 'Date de Naissance',
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: 'situation',
//       headerName: 'Situation',
//       flex: 1,
//       minWidth: 120,
//     },
//     {
//       field: 'level',
//       headerName: 'Niveau',
//       flex: 1,
//       minWidth: 100,
//     },
//     {
//       field: 'photoUrl',
//       headerName: 'Photo',
//       flex: 1,
//       minWidth: 120,
//       renderCell: (params: any) => (
//         // params.row est attendu comme étant de type Student
//         <Typography
//           variant="body2"
//           color="primary.main"
//           sx={{ cursor: 'pointer', textDecoration: 'underline' }}
//           onClick={() => params?.value && window.open(params.value, '_blank')}
//         >
//           Voir Photo
//         </Typography>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Action',
//       minWidth: 180,
//       filterable: false,
//       sortable: false,
//       renderCell: (params: any) => (
//         // params.row est attendu comme étant de type Student
//         <Stack direction="row" spacing={1}>
//           <IconifyIcon
//             icon={
//               params?.row?.isAccepted
//                 ? 'mdi:checkbox-marked-circle'
//                 : 'mdi:checkbox-blank-circle-outline'
//             }
//             width={24}
//             height={24}
//             color={params?.row?.isAccepted ? 'green' : 'gray'}
//             onClick={() => {
//               if (!params?.row?.isAccepted) {
//                 Swal.fire({
//                   title: 'Voulez-vous accepter cet élève ?',
//                   text: `Accepter l'élève n°${params.row.id} ?`,
//                   icon: 'question',
//                   showCancelButton: true,
//                   confirmButtonColor: '#3085d6',
//                   cancelButtonColor: '#d33',
//                   confirmButtonText: 'Oui, accepter',
//                   cancelButtonText: 'Annuler',
//                 }).then((result) => {
//                   if (result.isConfirmed) {
//                     setStudents((prev) =>
//                       prev.map((student) =>
//                         student.id === params.row.id ? { ...student, isAccepted: true } : student,
//                       ),
//                     );
//                     Swal.fire({
//                       title: 'Élève accepté !',
//                       text: `L'élève n°${params.row.id} a été accepté avec succès.`,
//                       icon: 'success',
//                       confirmButtonColor: '#3085d6',
//                     });
//                   }
//                 });
//               }
//             }}
//             sx={{ cursor: params?.row?.isAccepted ? 'default' : 'pointer' }}
//           />
//           <IconifyIcon
//             icon="mdi:account-edit"
//             width={24}
//             height={24}
//             color="gray"
//             sx={{ cursor: 'pointer' }}
//             onClick={() => {
//               Swal.fire({
//                 title: 'Modifier élève',
//                 html: `
//                   <input id="swal-parent-name" class="swal2-input" placeholder="Nom du Parent" value="${params?.row?.parentFullName || ''}">
//                   <input id="swal-parent-phone" class="swal2-input" placeholder="Téléphone du Parent" value="${params?.row?.parentPhone || ''}">
//                   <input id="swal-parent-email" class="swal2-input" placeholder="Email du Parent" value="${params?.row?.parentEmail || ''}">
//                   <input id="swal-student-name" class="swal2-input" placeholder="Nom de l'Élève" value="${params?.row?.studentFullName || ''}">
//                   <input id="swal-birth-date" class="swal2-input" placeholder="Date de Naissance (DD/MM/YYYY)" value="${params?.row?.birthDate || ''}">
//                   <input id="swal-situation" class="swal2-input" placeholder="Situation" value="${params?.row?.situation || ''}">
//                   <input id="swal-level" class="swal2-input" placeholder="Niveau" value="${params?.row?.level || ''}">
//                   <input id="swal-photo" class="swal2-input" placeholder="URL de la Photo" value="${params?.row?.photoUrl || ''}">
//                 `,
//                 confirmButtonText: 'Enregistrer',
//                 focusConfirm: false,
//                 preConfirm: () => {
//                   const parentName = (document.getElementById('swal-parent-name') as HTMLInputElement).value;
//                   const parentPhone = (document.getElementById('swal-parent-phone') as HTMLInputElement).value;
//                   const parentEmail = (document.getElementById('swal-parent-email') as HTMLInputElement).value;
//                   const studentName = (document.getElementById('swal-student-name') as HTMLInputElement).value;
//                   const birthDate = (document.getElementById('swal-birth-date') as HTMLInputElement).value;
//                   const situation = (document.getElementById('swal-situation') as HTMLInputElement).value;
//                   const level = (document.getElementById('swal-level') as HTMLInputElement).value;
//                   const photoUrl = (document.getElementById('swal-photo') as HTMLInputElement).value;
//                   setStudents((prev) =>
//                     prev.map((student) =>
//                       student.id === params.row.id
//                         ? { ...student, parentFullName: parentName, parentPhone, parentEmail, studentFullName: studentName, birthDate, situation, level, photoUrl }
//                         : student,
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
//                 text: `Supprimer l'élève n°${params.row.id} ?`,
//                 icon: 'warning',
//                 showCancelButton: true,
//                 confirmButtonColor: '#d33',
//                 cancelButtonColor: '#3085d6',
//                 confirmButtonText: 'Oui, supprimer',
//                 cancelButtonText: 'Annuler',
//               }).then((result) => {
//                 if (result.isConfirmed) {
//                   setStudents((prev) => prev.filter((student) => student.id !== params.row.id));
//                   Swal.fire({
//                     title: 'Supprimé !',
//                     text: 'L’élève a été supprimé.',
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

//   // Afficher un message si aucune donnée valide n'est disponible
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
//         direction={{ sm: 'row' }}
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
//         rows={validStudents} // Utiliser validStudents au lieu de students
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
//           loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
//           pagination: CustomPagination,
//           noRowsOverlay: () => <section>Aucun élève disponible</section>,
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

// export default StudentsTable;
