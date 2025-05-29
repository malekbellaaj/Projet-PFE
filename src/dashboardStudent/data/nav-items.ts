export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Accueil',
    path: '/',
    icon: 'material-symbols:home',
    active: true,
    collapsible: false,
  },
  {
    title: 'Mes matières',
    path: '/utilisateurs',
    icon: 'mdi:book-open-page-variant',
    active: false,
    collapsible: true,
    sublist: [
      {
        title: 'françcais',
        path: '/utilisateurs/enseignants',
        active: false,
        collapsible: false,
      },
      {
        title: 'English',
        path: '/utilisateurs/eleves',
        active: false,
        collapsible: false,
      },
      {
        title: 'عربية',
        path: '/utilisateurs/admins',
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Mes devoirs',
    path: '/reclamations',
    icon: 'mdi:clipboard-text-check',
    active: false,
    collapsible: false,
  },
  {
    title: 'Message de discution',
    path: '/reclamations',
    icon: 'mdi:chat-outline',
    active: false,
    collapsible: false,
  },
];

export default navItems;






















// export interface NavItem {
//   title: string;
//   path: string;
//   icon?: string;
//   active: boolean;
//   collapsible: boolean;
//   sublist?: NavItem[];
// }

// const navItems: NavItem[] = [
//   {
//     title: 'Accueil',
//     path: '/',
//     icon: 'ion:home-sharp',
//     active: true,
//     collapsible: false,
//   },
//   {
//     title: 'Mes matières',
//     path: '/utilisateurs',
//     icon: 'tabler:users',
//     active: false,
//     collapsible: true,
//     sublist: [
//       {
//         title: 'françcais',
//         path: '/utilisateurs/enseignants',
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'English',
//         path: '/utilisateurs/eleves',
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'عربية',
//         path: '/utilisateurs/admins',
//         active: false,
//         collapsible: false,
//       },
//     ],
//   },
//   // {
//   //   title: 'English',
//   //   path: '/utilisateurs',
//   //   icon: 'tabler:users',
//   //   active: false,
//   //   collapsible: true,
//   //   sublist: [
//   //     {
//   //       title: 'Mes cours',
//   //       path: '/utilisateurs/enseignants',
//   //       active: false,
//   //       collapsible: false,
//   //     },
//   //     {
//   //       title: 'Message de discution',
//   //       path: '/utilisateurs/admins',
//   //       active: false,
//   //       collapsible: false,
//   //     },
//   //     {
//   //       title: 'Mes devoirs',
//   //       path: '/utilisateurs/admins',
//   //       active: false,
//   //       collapsible: false,
//   //     },
//   //   ],
//   // },
//   {
//     title: 'Mes devoirs',
//     path: '/reclamations',
//     icon: 'tabler:alert-circle',
//     active: false,
//     collapsible: false,
//   },
//   {
//     title: 'Message de discution',
//     path: '/reclamations',
//     icon: 'tabler:alert-circle',
//     active: false,
//     collapsible: false,
//   },
// ];

// export default navItems;

















// // Définition de l'interface TypeScript pour un élément de navigation
// export interface NavItem {
//   title: string; // Titre de l'élément affiché dans l'interface (ex. : "Accueil", "Utilisateurs")
//   path: string; // Chemin URL ou ancre vers lequel l'élément dirige (ex. : "/", "/enseignants")
//   icon?: string; // Icône optionnelle associée (ex. : "ion:home-sharp")
//   active: boolean; // Indique si l'élément est actif (surligné dans la navigation)
//   collapsible: boolean; // Indique si l'élément peut être réduit/déplié
//   sublist?: NavItem[]; // Liste optionnelle de sous-éléments pour menus imbriqués
// }

// // Tableau des éléments de navigation pour le tableau de bord
// const navItems: NavItem[] = [
//   // Élément "Accueil" (anciennement "Home")
//   {
//     title: 'Accueil', // Titre modifié en français
//     path: '/', // Pointe vers la page d'accueil
//     icon: 'ion:home-sharp', // Icône conservée pour la maison
//     active: true, // Marqué comme actif par défaut (page d'accueil)
//     collapsible: false, // Pas de comportement réductible
//     // ces sous menu n'existe pas :
//     // sublist: [ // Sous-menu conservé, adapté pour cohérence
//     //   {
//     //     title: 'Tableau de bord', // Traduction de "Dashboard"
//     //     path: '/', // Pointe vers la page d'accueil
//     //     active: false,
//     //     collapsible: false,
//     //   },
//     //   {
//     //     title: 'Ventes', // Traduction de "Sales", lié au composant hom.tsx
//     //     path: '/', // Pointe vers la page d'accueil (modifiable si nécessaire)
//     //     active: false,
//     //     collapsible: false,
//     //   },
//     // ],
//   },
//   // Élément "Utilisateurs" (anciennement "Pages")
//   {
//     title: 'Utilisateurs', 
//     path: '/utilisateurs', // Chemin racine pour la section utilisateurs
//     icon: 'tabler:users', // Icône plus adaptée
//     active: false, // Non actif par défaut
//     collapsible: true, // Réductible pour permettre de plier/déplier le sous-menu
//     sublist: [ // Sous-menu limité à "Enseignant" et "Élève"
//       {
//         title: 'Enseignant', // Sous-élément pour les enseignants
//         path: '/utilisateurs/enseignants', // Chemin spécifique
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'Élève', // Sous-élément pour les élèves
//         path: '/utilisateurs/eleves', // Chemin spécifique
//         active: false,
//         collapsible: false,
//       },
//     ],
//   },
//   // Élément "Réclamations" (anciennement "Applications")
//   {
//     title: 'Réclamations', // Titre modifié en français
//     path: '/reclamations', // Chemin pour la section réclamations
//     icon: 'tabler:alert-circle', // Icône plus adaptée
//     active: false, // Non actif par défaut
//     collapsible: false, // Non réductible (pas de sous-menu pour l'instant)
//     // Pas de sublist car aucun sous-élément spécifié
//   },
// ];

// // Exportation du tableau pour utilisation dans d'autres composants
// export default navItems;





// export interface NavItem {
//   title: string;
//   path: string;
//   icon?: string;
//   active: boolean;
//   collapsible: boolean;
//   sublist?: NavItem[];
// }

// const navItems: NavItem[] = [
//   {
//     title: 'Accueil',
//     path: '/',
//     icon: 'ion:home-sharp',
//     active: true,
//     collapsible: false,
//   },
//   {
//     title: 'Utilisateurs',
//     path: '/utilisateurs',
//     icon: 'tabler:users',
//     active: false,
//     collapsible: true,
//     sublist: [
//       {
//         title: 'Enseignants',
//         path: '/utilisateurs/enseignants',
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'Élèves',
//         path: '/utilisateurs/eleves',
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'administrateurs',
//         path: '/utilisateurs/administrateurs',
//         active: false,
//         collapsible: false,
//       },
//     ],
//   },
//   {
//     title: 'Réclamations',
//     path: '/reclamations',
//     icon: 'tabler:alert-circle',
//     active: false,
//     collapsible: false,
//   },
// ];

// export default navItems;







// // Définition de l'interface TypeScript pour un élément de navigation
// export interface NavItem {
//   title: string; // Titre de l'élément de navigation affiché dans l'interface (ex. : "Home", "Pages")
//   path: string; // Chemin URL ou ancre vers lequel l'élément dirige (ex. : "/", "login")
//   icon?: string; // Icône optionnelle associée à l'élément (ex. : "ion:home-sharp"). Le type string fait référence à un identifiant d'icône (probablement d'une bibliothèque comme IonIcons)
//   active: boolean; // Indique si l'élément est actuellement actif (ex. : surligné dans la barre de navigation)
//   collapsible: boolean; // Indique si l'élément peut être réduit/déplié (utile pour les menus avec sous-éléments)
//   sublist?: NavItem[]; // Liste optionnelle de sous-éléments de navigation (permet des menus imbriqués)
// }

// // Tableau contenant tous les éléments de navigation pour le tableau de bord
// const navItems: NavItem[] = [
//   // Élément "Home" avec sous-menu
//   {
//     title: 'Accueil', // Titre affiché : "Home"
//     path: '/', // Redirige vers la page d'accueil
//     icon: 'ion:home-sharp', // Icône pour l'élément (de la bibliothèque IonIcons)
//     active: true, // Cet élément est marqué comme actif (peut-être la page par défaut)
//     collapsible: false, // Pas de comportement réductible (pas de flèche pour plier/déplier)
//     sublist: [
//       // Sous-menu avec deux éléments
//       {
//         title: 'Dashboard', // Sous-élément : "Dashboard"
//         path: '/', // Pointe vers la page d'accueil
//         active: false, // Non actif par défaut
//         collapsible: false, // Pas de sous-menu imbriqué
//       },
//       {
//         title: 'Sales', // Sous-élément : "Sales" (lié au composant hom.tsx partagé précédemment)
//         path: '/', // Pointe vers la page d'accueil (peut-être à modifier pour une URL spécifique)
//         active: false, // Non actif par défaut
//         collapsible: false, // Pas de sous-menu imbriqué
//       },
//     ],
//   },
//   // Élément "Pages" avec sous-menus imbriqués
//   {
//     title: 'Pages', // Titre : "Pages"
//     path: '#!', // Ancre temporaire (pas de page réelle, peut-être un placeholder)
//     icon: 'icomoon-free:drawer', // Icône de la bibliothèque Icomoon
//     active: false, // Non actif
//     collapsible: false, // Non réductible
//     sublist: [
//       // Sous-menu avec plusieurs sections
//       {
//         title: 'Profile', // Sous-élément : "Profile"
//         path: '#!', // Placeholder
//         active: false,
//         collapsible: false,
//         sublist: [
//           // Sous-sous-menu pour "Profile"
//           {
//             title: 'Overview', // "Overview" du profil
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//           {
//             title: 'All Projects', // Liste de tous les projets
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//         ],
//       },
//       {
//         title: 'Users', // Sous-élément : "Users"
//         path: '#!',
//         active: false,
//         collapsible: false,
//         sublist: [
//           // Sous-sous-menu pour "Users"
//           {
//             title: 'All Users', // Liste des utilisateurs
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//           {
//             title: 'Add user', // Formulaire pour ajouter un utilisateur
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//         ],
//       },
//       {
//         title: 'Account', // Sous-élément : "Account"
//         path: '#!',
//         active: false,
//         collapsible: false,
//         sublist: [
//           // Sous-sous-menu pour "Account"
//           {
//             title: 'Setting', // Paramètres du compte
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//           {
//             title: 'Billing', // Facturation
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//           {
//             title: 'Invoice', // Factures
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//         ],
//       },
//       {
//         title: 'Projects', // Sous-élément : "Projects"
//         path: '#!',
//         active: false,
//         collapsible: false,
//         sublist: [
//           // Sous-sous-menu pour "Projects"
//           {
//             title: 'Timeline', // Chronologie des projets
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//         ],
//       },
//     ],
//   },
//   // Élément "Applications" avec sous-menu
//   {
//     title: 'Applications', // Titre : "Applications"
//     path: '#!', // Placeholder
//     icon: 'mingcute:grid-fill', // Icône de la bibliothèque Mingcute
//     active: false,
//     collapsible: false,
//     sublist: [
//       // Sous-menu pour les applications
//       {
//         title: 'Kanban', // Tableau Kanban
//         path: '#!',
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'Wizard', // Assistant de configuration
//         path: '#!',
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'Data Tables', // Tables de données
//         path: '#!',
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: 'Schedule', // Planning
//         path: '#!',
//         active: false,
//         collapsible: false,
//       },
//     ],
//   },
//   // Élément "Ecommerce" avec sous-menus imbriqués
//   {
//     title: 'Ecommerce', // Titre : "Ecommerce"
//     path: '#!', // Placeholder
//     icon: 'tabler:shopping-bag', // Icône de la bibliothèque Tabler
//     active: false,
//     collapsible: false,
//     sublist: [
//       // Sous-menu pour le commerce électronique
//       {
//         title: 'Products', // Sous-élément : "Products"
//         path: '#!',
//         active: false,
//         collapsible: false,
//         sublist: [
//           // Sous-sous-menu pour "Products"
//           {
//             title: 'All Products', // Liste de tous les produits
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//           {
//             title: 'Edit Product', // Modifier un produit
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//           {
//             title: 'New Product', // Ajouter un nouveau produit
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//         ],
//       },
//       {
//         title: 'Orders', // Sous-élément : "Orders"
//         path: 'orders', // Chemin spécifique (page des commandes)
//         active: false,
//         collapsible: false,
//         sublist: [
//           // Sous-sous-menu pour "Orders"
//           {
//             title: 'Order List', // Liste des commandes
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//           {
//             title: 'Order Detail', // Détails d'une commande
//             path: '#!',
//             active: false,
//             collapsible: false,
//           },
//         ],
//       },
//     ],
//   },
//   // Élément "Authentication" avec sous-menu
//   {
//     title: 'Authentication', // Titre : "Authentication"
//     path: 'authentication', // Chemin racine pour les pages d'authentification
//     icon: 'f7:exclamationmark-shield-fill', // Icône de la bibliothèque Framework7
//     active: true, // Marqué comme actif (peut-être pour indiquer une section importante)
//     collapsible: true, // Élément réductible (peut être plié/déplié dans la navigation)
//     sublist: [
//       // Sous-menu pour les pages d'authentification
//       {
//         title: 'Sign In', // Page de connexion
//         path: 'login', // Chemin relatif à /authentication/login
//         active: true, // Actif par défaut
//         collapsible: false,
//       },
//       {
//         title: 'Sign Up', // Page d'inscription
//         path: 'sign-up', // Chemin relatif à /authentication/sign-up
//         active: true,
//         collapsible: false,
//       },
//       {
//         title: 'Forgot password', // Page pour mot de passe oublié
//         path: 'forgot-password', // Chemin relatif à /authentication/forgot-password
//         active: true,
//         collapsible: false,
//       },
//       {
//         title: 'Reset password', // Page pour réinitialiser le mot de passe
//         path: 'reset-password', // Chemin relatif à /authentication/reset-password
//         active: true,
//         collapsible: false,
//       },
//     ],
//   },
//   // Élément "Notification" sans sous-menu
//   {
//     title: 'Notification', // Titre : "Notification"
//     path: '#!', // Placeholder
//     icon: 'zondicons:notifications', // Icône de la bibliothèque Zondicons
//     active: false,
//     collapsible: false, // Non réductible, pas de sous-menu
//   },
//   // Élément "Calendar" sans sous-menu
//   {
//     title: 'Calendar', // Titre : "Calendar"
//     path: '#!', // Placeholder
//     icon: 'ph:calendar', // Icône de la bibliothèque Phosphor
//     active: false,
//     collapsible: false, // Non réductible, pas de sous-menu
//   },
//   // Élément "Message" sans sous-menu
//   {
//     title: 'Message', // Titre : "Message"
//     path: '#!', // Placeholder
//     icon: 'ph:chat-circle-dots-fill', // Icône de la bibliothèque Phosphor
//     active: false,
//     collapsible: false, // Non réductible, pas de sous-menu
//   },
// ];

// // Exportation du tableau navItems pour utilisation dans d'autres composants
// export default navItems;
