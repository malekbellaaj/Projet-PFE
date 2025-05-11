import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function AdminDashboard() {
  const history = useHistory();

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const token = localStorage.getItem("token") || localStorage.getItem("persistentToken");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      history.push("/login");
    } else if (localStorage.getItem("persistentToken") && !localStorage.getItem("token")) {
      // Restaurer la session à partir de persistentToken
      localStorage.setItem("token", localStorage.getItem("persistentToken"));
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("persistentToken");
    history.push("/");
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#16206d" }}>
        Bienvenue, {user.name || "Administrateur"} !
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: "#16206d" }}>
        Vous êtes connecté en tant qu'administrateur. Ici, vous pouvez gérer les utilisateurs, les cours, et plus encore.
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FECDDC",
          color: "#16206d",
          "&:hover": { backgroundColor: "#fdb2c8" },
        }}
        onClick={handleLogout}
      >
        Déconnexion
      </Button>
    </Box>
  );
}