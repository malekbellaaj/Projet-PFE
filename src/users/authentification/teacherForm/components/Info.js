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

      {/* <Typography variant="subtitle1" sx={{ fontWeight: "medium", mt: 2 }}>
        Informations importantes
      </Typography> */}
      <List dense>
        {/* <ListItem>
          <ListItemIcon>
            <InfoIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="Une adresse email académique est requise" />
        </ListItem> */}
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
        {/* <ListItem>
          <ListItemIcon>
            <InfoIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="En vous inscrivant, vous acceptez les Conditions d’utilisation" />
        </ListItem> */}
      </List>
    </Box>
  );
}





























// import * as React from "react";
// import Typography from "@mui/material/Typography";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// function Info() {
//   return (
//     <React.Fragment>
//       <Typography variant="h5" gutterBottom>
//         Bienvenue sur Altus
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         Notre objectif est d’aider chaque enseignant à accompagner ses élèves
//         dans leur apprentissage de la lecture, à leur propre rythme.
//       </Typography>

//       <List>
//         <ListItem>
//           <ListItemIcon>
//             <CheckCircleIcon color="success" />
//           </ListItemIcon>
//           <ListItemText primary="Suivi personnalisé des élèves" />
//         </ListItem>
//         <ListItem>
//           <ListItemIcon>
//             <CheckCircleIcon color="success" />
//           </ListItemIcon>
//           <ListItemText primary="Ressources pédagogiques interactives" />
//         </ListItem>
//         <ListItem>
//           <ListItemIcon>
//             <CheckCircleIcon color="success" />
//           </ListItemIcon>
//           <ListItemText primary="Statistiques de progression" />
//         </ListItem>
//       </List>
//       <List>
//         <Typography variant="body2" sx={{ fontStyle: "italic", mt: 2 }}>
//           “Grâce à Altus, mes élèves ont fait des progrès incroyables en
//           lecture.” — Mme Gorbel, enseignante 5ème année
//         </Typography>
//       </List>

//       <Typography variant="body2" sx={{ mt: 2 }}>
//         ⚠️ Cette inscription est préliminaire et sera approuvée ou rejetée par
//         l'administrateur par courrier électronique.
//       </Typography>
//     </React.Fragment>
//   );
// }

// export default Info;

// import * as React from 'react';
// import PropTypes from 'prop-types';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';

// const products = [
//   {
//     name: 'Professional plan',
//     desc: 'Monthly subscription',
//     price: '$15.00',
//   },
//   {
//     name: 'Dedicated support',
//     desc: 'Included in the Professional plan',
//     price: 'Free',
//   },
//   {
//     name: 'Hardware',
//     desc: 'Devices needed for development',
//     price: '$69.99',
//   },
//   {
//     name: 'Landing page template',
//     desc: 'License',
//     price: '$49.99',
//   },
// ];

// function Info({ totalPrice }) {
//   return (
//     <React.Fragment>
//       <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
//         Total
//       </Typography>
//       <Typography variant="h4" gutterBottom>
//         {totalPrice}
//       </Typography>
//       <List disablePadding>
//         {products.map((product) => (
//           <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
//             <ListItemText
//               sx={{ mr: 2 }}
//               primary={product.name}
//               secondary={product.desc}
//             />
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               {product.price}
//             </Typography>
//           </ListItem>
//         ))}
//       </List>
//     </React.Fragment>
//   );
// }

// Info.propTypes = {
//   totalPrice: PropTypes.string.isRequired,
// };

// export default Info;
