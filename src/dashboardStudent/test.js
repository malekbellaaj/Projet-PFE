import React from "react";
import { Box, Typography } from "@mui/material";

export default function StudentDashboard() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Bienvenue sur le tableau de bord étudiant !</Typography>
      <Typography variant="body1">Vous êtes authentifié avec succès.</Typography>
    </Box>
  );
}