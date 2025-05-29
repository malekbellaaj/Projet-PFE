// Importation du type ReactElement pour indiquer que le composant retourne un élément React
import { ReactElement } from 'react';

// Importation des composants Material-UI pour la mise en page et la navigation
import {
  Link, // Composant pour créer des liens (utilisé avec un routeur comme react-router-dom)
  List, // Composant pour afficher une liste d'éléments
  ListItem, // Élément individuel d'une liste
  ListItemButton, // Bouton cliquable dans une liste
  ListItemIcon, // Conteneur pour une icône dans un élément de liste
  ListItemText, // Texte affiché dans un élément de liste
  Stack, // Composant pour empiler des éléments avec un espacement contrôlé
} from '@mui/material';

// Importation d'un composant personnalisé pour afficher des icônes (probablement basé sur une bibliothèque comme Iconify)
import IconifyIcon from '../../../components/base/IconifyIcon';

// Importation de l'image du logo pour l'en-tête de la sidebar
import logo from '../../../assets/logo/altus_logo_SB.png';

// Importation d'un composant personnalisé pour afficher des images
import Image from '../../../components/base/Image';

// Importation des données de navigation (navItems.ts, contenant la structure du menu)
import navItems from '../../../data/nav-items';

// Importation d'un composant personnalisé pour rendre chaque élément de navigation
import NavButton from './NavButton';

// Définition du composant Sidebar, qui retourne un élément React
const Sidebar = (): ReactElement => {
  return (
    // Conteneur principal de la sidebar, utilisant Stack pour organiser le contenu verticalement
    <Stack
      justifyContent="space-between" // Espace les éléments (logo, liste, déconnexion) entre le haut et le bas
      bgcolor="background.paper" // Fond blanc (basé sur le thème MUI)
      height={1} // Occupe toute la hauteur disponible
      boxShadow={(theme) => theme.shadows[4]} // Applique une ombre (niveau 4 du thème)
      sx={{
        // Styles responsifs via la prop sx
        overflow: 'hidden', // Masque le contenu débordant par défaut
        margin: { xs: 0, lg: 3.75 }, // Pas de marge sur petits écrans (xs), 3.75 unités sur grands écrans (lg)
        borderRadius: { xs: 0, lg: 5 }, // Pas de coins arrondis sur xs, coins arrondis (5px) sur lg
        '&:hover': {
          overflowY: 'auto', // Affiche une barre de défilement verticale au survol
        },
        width: 218, // Largeur fixe de la sidebar (218px)
      }}
    >
      {/* // Logo affiché en haut de la sidebar */}
      <Link
        href="/"
        sx={{
          position: 'fixed',
          zIndex: 5,
          mt: 6.25,
          mx: 4.0625,
          mb: 3.75,
          bgcolor: 'background.paper',
          borderRadius: 5,
          // Ajout de contraintes de taille pour le conteneur
          width: 160, // Largeur fixe pour le logo
          height: 80, // Hauteur fixe pour le logo
          display: 'flex', // Centre l'image dans le conteneur
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* // Image du logo avec des contraintes de taille */}
        <Image
          src={logo}
          sx={{
            maxWidth: '100%', // Limite la largeur à celle du conteneur (150px)
            maxHeight: '100%', // Limite la hauteur à celle du conteneur (50px)
            objectFit: 'contain', // Préserve le rapport d'aspect sans distorsion
          }}
        />
      </Link>

      {/* // Deuxième Stack pour organiser la liste de navigation et le bouton de déconnexion */}
      <Stack
        justifyContent="space-between" // Espace la liste de navigation et le bouton de déconnexion
        mt={16.25} // Marge supérieure pour laisser de l'espace sous le logo
        height={1} // Occupe toute la hauteur disponible
        sx={{
          overflow: 'hidden', // Masque le contenu débordant
          '&:hover': {
            overflowY: 'auto', // Affiche une barre de défilement au survol
          },
          width: 218, // Largeur fixe (même que la sidebar)
        }}
      >
        {/* // Liste des éléments de navigation principaux */}
        <List
          sx={{
            mx: 2.5, // Marge horizontale de 2.5 unités
            py: 1.25, // Padding vertical de 1.25 unités
            flex: '1 1 auto', // La liste s'étend pour occuper l'espace disponible
            width: 178, // Largeur fixe pour centrer les éléments dans la sidebar
          }}
        >
          {/* // Boucle sur navItems (de navItems.ts) pour afficher chaque élément de navigation */}
          {navItems.map((navItem, index) => (
            <NavButton key={index} navItem={navItem} Link={Link} /> // Rend un bouton de navigation pour chaque élément
          ))}
        </List>

        {/* // Liste contenant le bouton de déconnexion */}
        <List sx={{ mx: 2.5 }}>
          <ListItem sx={{ mx: 0, my: 2.5 }}>
            <ListItemButton
              LinkComponent={Link}
              href="/authentication/logout" // À ajuster selon votre route de déconnexion
              sx={{
                backgroundColor: 'background.paper',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'common.white',
                  opacity: 1,
                },
              }}
            >
              <ListItemIcon>
                <IconifyIcon icon="ri:logout-circle-line" />
              </ListItemIcon>
              <ListItemText>Déconnexion</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
};

// Exportation du composant pour utilisation ailleurs
export default Sidebar;






















// import { ReactElement } from 'react';
// import {
//   Link,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Stack,
// } from '@mui/material';

// import IconifyIcon from 'components/base/IconifyIcon';
// import logo from 'assets/logo/elegant-logo.png';
// import Image from 'components/base/Image';
// import navItems from 'data/nav-items';
// import NavButton from './NavButton';

// const Sidebar = (): ReactElement => {
//   return (
//     <Stack
//       justifyContent="space-between"
//       bgcolor="background.paper"
//       height={1}
//       boxShadow={(theme) => theme.shadows[4]}
//       sx={{
//         overflow: 'hidden',
//         margin: { xs: 0, lg: 3.75 },
//         borderRadius: { xs: 0, lg: 5 },
//         '&:hover': {
//           overflowY: 'auto',
//         },
//         width: 218,
//       }}
//     >
//       <Link
//         href="/"
//         sx={{
//           position: 'fixed',
//           zIndex: 5,
//           mt: 6.25,
//           mx: 4.0625,
//           mb: 3.75,
//           bgcolor: 'background.paper',
//           borderRadius: 5,
//         }}
//       >
//         <Image src={logo} width={1} />
//       </Link>
//       <Stack
//         justifyContent="space-between"
//         mt={16.25}
//         height={1}
//         sx={{
//           overflow: 'hidden',
//           '&:hover': {
//             overflowY: 'auto',
//           },
//           width: 218,
//         }}
//       >
//         <List
//           sx={{
//             mx: 2.5,
//             py: 1.25,
//             flex: '1 1 auto',
//             width: 178,
//           }}
//         >
//           {navItems.map((navItem, index) => (
//             <NavButton key={index} navItem={navItem} Link={Link} />
//           ))}
//         </List>
//         <List
//           sx={{
//             mx: 2.5,
//           }}
//         >
//           <ListItem
//             sx={{
//               mx: 0,
//               my: 2.5,
//             }}
//           >
//             <ListItemButton
//               LinkComponent={Link}
//               href="/"
//               sx={{
//                 backgroundColor: 'background.paper',
//                 color: 'primary.main',
//                 '&:hover': {
//                   backgroundColor: 'primary.main',
//                   color: 'common.white',
//                   opacity: 1.5,
//                 },
//               }}
//             >
//               <ListItemIcon>
//                 <IconifyIcon icon="ri:logout-circle-line" />
//               </ListItemIcon>
//               <ListItemText>Log out</ListItemText>
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Stack>
//     </Stack>
//   );
// };

// export default Sidebar;
