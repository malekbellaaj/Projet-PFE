
import { ReactElement } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Link,
} from '@mui/material';
import IconifyIcon from '../../../components/base/IconifyIcon';
import logo from '../../../assets/logo/altus_logo_SB.png';
import Image from '../../../components/base/Image';
import navItems from '../../../data/nav-items';
import NavButton from './NavButton';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const Sidebar = (): ReactElement => {
  const navigate = useHistory();

  const handleLogout = () => {
    MySwal.fire({
      title: 'Déconnexion',
      text: 'Voulez-vous vraiment vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, déconnexion',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        // Supprimer le token de localStorage
        localStorage.removeItem('token');
        
        // Rediriger vers la page de connexion
        navigate.push('/');
        
        MySwal.fire({
          title: 'Déconnecté !',
          text: 'Vous avez été déconnecté avec succès.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  return (
    <Stack
      justifyContent="space-between"
      bgcolor="background.paper"
      height={1}
      boxShadow={(theme) => theme.shadows[4]}
      sx={{
        overflow: 'hidden',
        margin: { xs: 0, lg: 3.75 },
        borderRadius: { xs: 0, lg: 5 },
        '&:hover': {
          overflowY: 'auto',
        },
        width: 218,
      }}
    >
      <Box
        onClick={() => window.location.reload()}
        sx={{
          position: 'fixed',
          zIndex: 5,
          mt: 6.25,
          mx: 4.0625,
          mb: 3.75,
          bgcolor: 'background.paper',
          borderRadius: 5,
          width: 160,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Image
          src={logo}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      <Stack
        justifyContent="space-between"
        mt={16.25}
        height={1}
        sx={{
          overflow: 'hidden',
          '&:hover': {
            overflowY: 'auto',
          },
          width: 218,
        }}
      >
        <List
          sx={{
            mx: 2.5,
            py: 1.25,
            flex: '1 1 auto',
            width: 178,
          }}
        >
          {navItems.map((navItem, index) => (
            <NavButton key={index} navItem={navItem} Link={Link} />
          ))}
        </List>

        <List sx={{ mx: 2.5 }}>
          <ListItem sx={{ mx: 0, my: 2.5 }}>
            <ListItemButton
              onClick={handleLogout}
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

export default Sidebar;













// // Importation du type ReactElement pour indiquer que le composant retourne un élément React
// import { ReactElement } from 'react';

// // Importation des composants Material-UI pour la mise en page et la navigation
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Stack,
//   Link,
// } from '@mui/material';

// // Importation d'un composant personnalisé pour afficher des icônes
// import IconifyIcon from '../../../components/base/IconifyIcon';

// // Importation de l'image du logo pour l'en-tête de la sidebar
// import logo from '../../../assets/logo/altus_logo_SB.png';

// // Importation d'un composant personnalisé pour afficher des images
// import Image from '../../../components/base/Image';

// // Importation des données de navigation (navItems.ts, contenant la structure du menu)
// import navItems from '../../../data/nav-items';

// // Importation d'un composant personnalisé pour rendre chaque élément de navigation
// import NavButton from './NavButton';

// // Définition du composant Sidebar, qui retourne un élément React
// const Sidebar = (): ReactElement => {
//   return (
//     // Conteneur principal de la sidebar, utilisant Stack pour organiser le contenu verticalement
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
//       {/* Logo avec rafraîchissement de la page au clic */}
//       <Box
//         onClick={() => window.location.reload()}
//         sx={{
//           position: 'fixed',
//           zIndex: 5,
//           mt: 6.25,
//           mx: 4.0625,
//           mb: 3.75,
//           bgcolor: 'background.paper',
//           borderRadius: 5,
//           width: 160,
//           height: 80,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           cursor: 'pointer',
//         }}
//       >
//         <Image
//           src={logo}
//           sx={{
//             maxWidth: '100%',
//             maxHeight: '100%',
//             objectFit: 'contain',
//           }}
//         />
//       </Box>

//       {/* Deuxième Stack pour le contenu principal de la sidebar */}
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
//         {/* Liste des éléments de navigation */}
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

//         {/* Bouton de déconnexion */}
//         <List sx={{ mx: 2.5 }}>
//           <ListItem sx={{ mx: 0, my: 2.5 }}>
//             <ListItemButton
//               LinkComponent={Link}
//               href="/authentication/logout"
//               sx={{
//                 backgroundColor: 'background.paper',
//                 color: 'primary.main',
//                 '&:hover': {
//                   backgroundColor: 'primary.main',
//                   color: 'common.white',
//                   opacity: 1,
//                 },
//               }}
//             >
//               <ListItemIcon>
//                 <IconifyIcon icon="ri:logout-circle-line" />
//               </ListItemIcon>
//               <ListItemText>Déconnexion</ListItemText>
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Stack>
//     </Stack>
//   );
// };

// // Exportation du composant
// export default Sidebar;
