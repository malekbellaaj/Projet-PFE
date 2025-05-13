import { ChangeEvent, ReactElement, useMemo, useState } from "react";
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

// Valeur par défaut de drawerWidth (comme dans Students.tsx)
// const drawerWidth = 278;

interface Complaint {
  id: number;
  fullName: string;
  email: string;
  message: string;
  date: string;
  isTreated: boolean;
}

const initialComplaints: Complaint[] = [
  {
    id: 1,
    fullName: "Jean Dupont",
    email: "jean.dupont@example.com",
    message: "Problème de connexion à la plateforme.",
    date: "2025-04-01",
    isTreated: false,
  },
  {
    id: 2,
    fullName: "Marie Lefèvre",
    email: "marie.lefevre@example.com",
    message: "Erreur dans la facturation du mois dernier.",
    date: "2025-04-03",
    isTreated: false,
  },
  {
    id: 3,
    fullName: "Ahmed Benali",
    email: "ahmed.benali@example.com",
    message: "Demande de support pour réinitialiser mon mot de passe.",
    date: "2025-04-15",
    isTreated: false,
  },
  {
    id: 4,
    fullName: "Sophie Martin",
    email: "sophie.martin@example.com",
    message: "Problème avec l’affichage des cours sur mobile.",
    date: "2025-04-28",
    isTreated: false,
  },
];

const Reclamations = (): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [search, setSearch] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

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
            onClick={() => {
              if (!params.row.isTreated) {
                Swal.fire({
                  icon: "success",
                  title: "Réclamation traitée",
                  text: `La réclamation n°${params.row.id} a été marquée comme traitée.`,
                  confirmButtonColor: "#3085d6",
                });
                setComplaints((prev) =>
                  prev.map((item) =>
                    item.id === params.row.id
                      ? { ...item, isTreated: true }
                      : item
                  )
                );
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
              }).then((result) => {
                if (result.isConfirmed) {
                  setComplaints((prev) =>
                    prev.filter((item) => item.id !== params.row.id)
                  );
                  Swal.fire({
                    title: "Supprimée !",
                    text: "La réclamation a été supprimée.",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                  });
                }
              });
            }}
            sx={{ cursor: "pointer" }}
          />
        </Stack>
      ),
    },
  ];

  const visibleColumns = useMemo(() => columns, []);

  const handleGridSearch = useMemo(() => {
    return debounce((searchValue) => {
      if (apiRef.current) {
        apiRef.current.setQuickFilterValues(
          searchValue.split(" ").filter((word: any) => word !== "")
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
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              pageSizeOptions={[5]}
              slots={{
                loadingOverlay: LinearProgress as GridSlots["loadingOverlay"],
                pagination: CustomPagination,
                noRowsOverlay: () => (
                  <section>Aucune réclamation disponible</section>
                ),
              }}
              sx={{ height: 1, width: "100%" }} // Simplifié pour correspondre à Students.tsx
            />
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Reclamations;
