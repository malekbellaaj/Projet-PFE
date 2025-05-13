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
    path: "/admin-dashboard",
    icon: "ion:home-sharp",
    active: true,
    collapsible: false,
  },
  {
    title: "Utilisateurs",
    path: "/admin-dashboard/utilisateurs",
    icon: "tabler:users",
    active: false,
    collapsible: true,
    sublist: [
      {
        title: "Enseignants",
        path: "/admin-dashboard/utilisateurs/enseignants",
        active: false,
        collapsible: false,
      },
      {
        title: "Élèves",
        path: "/admin-dashboard/utilisateurs/eleves",
        active: false,
        collapsible: false,
      },
      {
        title: "Administrateurs",
        path: "/admin-dashboard/utilisateurs/admins",
        active: false,
        collapsible: false,
      },
    ],
  },
  {
    title: "Réclamations",
    path: "/admin-dashboard/reclamations",
    icon: "tabler:alert-circle",
    active: false,
    collapsible: false,
  },
];

export default navItems;
