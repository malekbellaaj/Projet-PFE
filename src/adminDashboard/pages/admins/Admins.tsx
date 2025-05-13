import { ReactElement, useState } from "react";
import { Grid, GridProps } from "@mui/material"; // Plus besoin de Stack ni Divider
// import { drawerWidth } from '../../layouts/main-layout';
import AdminsTable from "./AdminsTable";
import AdminsForm from "./AdminsForm";

// Interface pour un administrateur
interface Admin {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  password: string;
}

// Données d'exemple pour les administrateurs
const initialAdmins: Admin[] = [
  {
    id: 1,
    fullName: "Alice Martin",
    email: "alice.martin@example.com",
    phone: "1234 5678",
    role: "Super Admin",
    password: "P@ssw0rd123",
  },
  {
    id: 2,
    fullName: "Bob Dupont",
    email: "bob.dupont@example.com",
    phone: "2345 6789",
    role: "Gestionnaire",
    password: "S3cur3#456",
  },
  {
    id: 3,
    fullName: "Clara Benali",
    email: "clara.benali@example.com",
    phone: "3456 7890",
    role: "Administrateur",
    password: "Adm!n789$",
  },
];

const Admins = (): ReactElement => {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);

  const handleAddAdmin = (newAdmin: Admin) => {
    setAdmins((prev) => [...prev, newAdmin]);
  };

  return (
    <Grid
      container
      component="main"
      spacing={4} // Espacement entre les Grid items
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
        <AdminsTable admins={admins} setAdmins={setAdmins} />
      </Grid>
      <Grid
        item
        xs={12}
        component="div"
        {...({} as GridProps)}
        sx={{ px: { xs: 2, sm: 3 }, width: "100%" }}
      >
        <AdminsForm onAddAdmin={handleAddAdmin} />
      </Grid>
    </Grid>
  );
};

export default Admins;







