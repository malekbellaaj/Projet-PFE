

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
    path: "/dashboard-admin",
    icon: "ion:home-sharp",
    active: true,
    collapsible: false,
  },
  {
    title: "Utilisateurs",
    path: "/dashboard-admin/utilisateurs",
    icon: "tabler:users",
    active: false,
    collapsible: true,
    sublist: [
      {
        title: "Enseignants",
        path: "/dashboard-admin/utilisateurs/enseignants",
        active: false,
        collapsible: false,
      },
      {
        title: "Élèves",
        path: "/dashboard-admin/utilisateurs/eleves",
        active: false,
        collapsible: false,
      },
      {
        title: "Administrateurs",
        path: "/dashboard-admin/utilisateurs/admins",
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: "Réclamations",
    path: "/dashboard-admin/reclamations",
    icon: "tabler:alert-circle",
    active: false,
    collapsible: false,
  },
];

export default navItems;
