import { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IconifyIcon from "../../components/base/IconifyIcon";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface AdminFormData {
  fullName: string;
  email: string;
  password: string;
}

interface AdminFormErrors {
  fullName: string;
  email: string;
  password: string;
}

interface AdminsFormProps {
  onAddAdmin: (admin: {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    role: string;
    password: string;
  }) => void;
}

const MySwal = withReactContent(Swal);

const AdminsForm = ({ onAddAdmin }: AdminsFormProps) => {
  const [formData, setFormData] = useState<AdminFormData>({
    fullName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<AdminFormErrors>({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
      MySwal.fire({
        title: "Erreur",
        text: "Veuillez corriger les erreurs dans le formulaire",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      return;
    }

    onAddAdmin({
      id: Date.now(),
      fullName: formData.fullName,
      email: formData.email,
      phone: "",
      role: "",
      password: formData.password,
    });

    setFormData({ fullName: "", email: "", password: "" });
    setFormErrors({ fullName: "", email: "", password: "" });

    MySwal.fire({
      title: "Succès",
      text: "L’administrateur a été ajouté avec succès !",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <Box
      mt={2}
      bgcolor="background.paper"
      borderRadius={5}
      p={3}
      boxShadow={(theme) => theme.shadows[5]} //shadow au contour
      sx={{ display: "flex", justifyContent: "center" }} // Centrer horizontalement le contenu
    >
      <Stack spacing={2} sx={{ width: "100%", maxWidth: 300 }}>
        {" "}
        {/* Limite la largeur pour un meilleur centrage */}
        <Typography variant="h6" color="text.primary" mb={2} textAlign="center">
          Ajouter un nouvel administrateur
        </Typography>
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
          sx={{ alignSelf: "center" }} // Centrer le bouton
        >
          Ajouter
        </Button>
      </Stack>
    </Box>
  );
};

export default AdminsForm;
