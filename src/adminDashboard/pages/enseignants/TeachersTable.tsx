import { ChangeEvent, useMemo, useState } from "react";
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
import IconifyIcon from "./../../components/base/IconifyIcon";
import CustomPagination from "./../../components/sections/dashboard/Home/Sales/TopSellingProduct/CustomPagination";
import { debounce } from "@mui/material/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../élèves/swal-custom.css";

const MySwal = withReactContent(Swal);

// Interface pour un enseignant
interface Teacher {
  id: number;
  fullName: string;
  registrationNumber: string;
  phone: string;
  email: string;
  specialty: string; // Nouveau champ pour la spécialité
  cvUrl: string;
  isAccepted: boolean;
}

// Props pour le composant TeachersTable
interface TeachersTableProps {
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
}

const TeachersTable = ({ teachers, setTeachers }: TeachersTableProps) => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState("");

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
          sx={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => window.open(params.value, "_blank")}
        >
          Voir CV
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
            onClick={() => {
              if (!params.row.isAccepted) {
                Swal.fire({
                  title: "Voulez-vous accepter cet enseignant ?",
                  text: `Accepter l'enseignant n°${params.row.id} ?`,
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Oui, accepter",
                  cancelButtonText: "Annuler",
                }).then((result) => {
                  if (result.isConfirmed) {
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
                  }
                });
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
                      />
                      <TextField
                        id="swal-cvUrl"
                        label="URL du CV"
                        defaultValue={params?.row?.cvUrl || ""}
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
                  const fullName = (
                    document.getElementById("swal-fullName") as HTMLInputElement
                  ).value;
                  const registrationNumber = (
                    document.getElementById(
                      "swal-registrationNumber"
                    ) as HTMLInputElement
                  ).value;
                  const phone = (
                    document.getElementById("swal-phone") as HTMLInputElement
                  ).value;
                  const email = (
                    document.getElementById("swal-email") as HTMLInputElement
                  ).value;
                  const specialty = (
                    document.getElementById(
                      "swal-specialty"
                    ) as HTMLInputElement
                  ).value;
                  const cvUrl = (
                    document.getElementById("swal-cvUrl") as HTMLInputElement
                  ).value;
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
                            cvUrl,
                          }
                        : teacher
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
                text: `Supprimer l'enseignant n°${params.row.id} ?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Oui, supprimer",
                cancelButtonText: "Annuler",
              }).then((result) => {
                if (result.isConfirmed) {
                  setTeachers((prev) =>
                    prev.filter((teacher) => teacher.id !== params.row.id)
                  );
                  Swal.fire({
                    title: "Supprimé !",
                    text: "L’enseignant a été supprimé.",
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
          searchValue.split(" ").filter((word: string) => word !== "")
        );
      }
    }, 250);
  }, [apiRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearch(searchValue);
    handleGridSearch(searchValue);
  };

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
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        pageSizeOptions={[5]}
        slots={{
          loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
          pagination: CustomPagination,
          noRowsOverlay: () => <section>Aucun enseignant disponible</section>,
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

export default TeachersTable;
