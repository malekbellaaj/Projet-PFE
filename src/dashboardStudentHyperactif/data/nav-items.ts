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
    title: "Accueil",
    path: "/dashboard-student-hyperactif",
    icon: "ion:home",
    active: true,
    collapsible: false,
  },
  {
    title: "Mes matières",
    path: "/dashboard-student-hyperactif/subjects",
    icon: "ic:outline-menu-book",
    active: false,
    collapsible: true,
    sublist: [
      {
        title: "عربية",
        path: "/dashboard-student-hyperactif/subjects/3", // Utilise l'ID de mockData.ts
        icon: "icon-park-outline:translate",
        active: false,
        collapsible: false,
      },
      {
        title: "Français",
        path: "/dashboard-student-hyperactif/subjects/1", // Utilise l'ID de mockData.ts
        icon: "tabler:language",
        active: false,
        collapsible: false,
      },
      {
        title: "English",
        path: "/dashboard-student-hyperactif/subjects/2", // Utilise l'ID de mockData.ts
        icon: "fa6-solid:language",
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: "Mes devoirs",
    path: "/dashboard-student-hyperactif/devoirs",
    icon: "mdi:clipboard-text",
    active: false,
    collapsible: false,
  },
  {
    title: "Discussions",
    path: "/dashboard-student-hyperactif/discussions",
    icon: "mdi:chat",
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
//     title: "Accueil",
//     path: "/dashboard-student",
//     icon: "ion:home",
//     active: true,
//     collapsible: false,
//   },
//   {
//     title: "Mes matières",
//     path: "/dashboard-student/subjects",
//     icon: "ic:outline-menu-book",
//     active: false,
//     collapsible: true,
//     sublist: [
//       {
//         title: "عربية",
//         path: "/dashboard-student/subjects/arabe",
//         icon: "icon-park-outline:translate",
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: "Français",
//         path: "/dashboard-student/subjects/francais",
//         icon: "tabler:language",
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: "English",
//         path: "/dashboard-student/subjects/english",
//         icon: "fa6-solid:language",
//         active: false,
//         collapsible: false,
//       },
//     ],
//   },
//   {
//     title: "Mes devoirs",
//     path: "/dashboard-student/devoirs",
//     icon: "mdi:clipboard-text",
//     active: false,
//     collapsible: false,
//   },
//   {
//     title: "Discussions",
//     path: "/dashboard-student/discussions",
//     icon: "mdi:chat-outline",
//     active: false,
//     collapsible: false,
//   },
// ];

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
//     title: "Accueil",
//     path: "/dashboard-student",
//     icon: "ion:home", // Icône maison
//     active: true,
//     collapsible: false,
//   },
//   {
//     title: "Mes matières",
//     path: "/dashboard-student/utilisateurs",
//     icon: "ic:outline-menu-book", // Icône livre
//     active: false,
//     collapsible: true,
//     sublist: [
//       {
//         title: "عربية",
//         path: "/dashboard-student/utilisateurs/enseignants",
//         icon: "icon-park-outline:translate", // Icône traduction ou arabe
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: "Français",
//         path: "/dashboard-student/utilisateurs/eleves",
//         icon: "tabler:language", // Icône langue
//         active: false,
//         collapsible: false,
//       },
//       {
//         title: "English",
//         path: "/dashboard-student/utilisateurs/students",
//         icon: "fa6-solid:language", // Autre icône langue
//         active: false,
//         collapsible: false,
//       },
//     ],
//   },
//   {
//     title: "Mes devoirs",
//     path: "/dashboard-student/reclamations",
//     icon: "mdi:clipboard-text", // Icône devoirs ou tâches
//     active: false,
//     collapsible: false,
//   },
//   {
//     title: "Discussions",
//     path: "/dashboard-student/reclamations",
//     icon: "mdi:chat-outline", // Icône discussions
//     active: false,
//     collapsible: false,
//   },
// ];

// export default navItems;




