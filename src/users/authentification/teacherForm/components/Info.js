import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";

export default function Info() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Bienvenue sur ALTUS 🎓
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 3, // ecpacement entre la paragraphe et le titre pourquoi s'inscrire
          lineHeight: 1.5, //espacement entre les lignes
          fontSize: "1.1rem", //taille d'écriture
        }}
      >
        Notre objectif est d’aider chaque enseignant à accompagner ses élèves
        dans leur apprentissage de la lecture, à leur propre rythme.
      </Typography>

      <Typography variant="subtitle1" sx={{ fontWeight: "medium", mt: 2 }}>
        Pourquoi s’inscrire ?
      </Typography>
      <List dense>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Des outils pédagogiques avancés" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Créez et gérez vos classes facilement" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Suivi personnalisé des élèves" />
        </ListItem>
      </List>

      <List dense>
        <Box
          sx={{
            backgroundColor: "action.hover",
            borderRadius: 1,
            p: 1,
            mb: 1,
          }}
        >
          <List dense sx={{ pl: 1 }}>
            <ListItem sx={{ py: 0.5, alignItems: "flex-start" }}>
              <ListItemIcon sx={{ minWidth: 36, pt: "4px" }}>
                <InfoIcon color="info" />
              </ListItemIcon>
              <ListItemText
                primary="Cette inscription est préliminaire et sera approuvée ou rejetée par l'administrateur par courrier électronique."
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
          </List>
        </Box>
      </List>
    </Box>
  );
}
