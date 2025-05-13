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

  // eslint-disable-next-line react-hooks/exhaustive-deps
const visibleColumns = useMemo(() => columns, []);

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

  return (
    <Stack
      height={1}
      bgcolor="background.paper" // Fond appliqué à tout le tableau
      borderRadius={5} // Aligné avec Reclamations.tsx
      boxShadow={(theme) => theme.shadows[5]} // Ajout d'une ombre pour cohérence
      sx={{ overflow: "hidden" }} // Prévenir les débordements
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
    </Stack>
  );
};

export default AdminsTable;




