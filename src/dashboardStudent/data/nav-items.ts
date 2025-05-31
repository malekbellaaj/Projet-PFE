

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
    path: "/dashboard-student",
    icon: "ion:home-sharp",
    active: true,
    collapsible: false,
  },
  {
    title: "Utilisateurs",
    path: "/dashboard-student/utilisateurs",
    icon: "tabler:users",
    active: false,
    collapsible: true,
    sublist: [
      {
        title: "Enseignants",
        path: "/dashboard-student/utilisateurs/enseignants",
        active: false,
        collapsible: false,
      },
      {
        title: "Élèves",
        path: "/dashboard-student/utilisateurs/eleves",
        active: false,
        collapsible: false,
      },
      {
        title: "administrateurs",
        path: "/dashboard-student/utilisateurs/students",
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: "Réclamations",
    path: "/dashboard-student/reclamations",
    icon: "tabler:alert-circle",
    active: false,
    collapsible: false,
  },
];

export default navItems;
