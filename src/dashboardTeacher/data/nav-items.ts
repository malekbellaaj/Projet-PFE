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
    path: "/dashboard-teacher",
    icon: "ion:home",
    active: true,
    collapsible: false,
  },

  {
    title: "Ajouter un cours",
    path: "/dashboard-teacher/cours",
    icon: "mdi:book-plus",
    active: false,
    collapsible: false,
  },
  {
    title: "Ressources",
    path: "/dashboard-teacher/ressources",
    icon: "mdi:file-multiple",
    active: false,
    collapsible: false,
  },
  {
    title: "Quiz",
    path: "/dashboard-teacher/quiz",
    icon: "mdi:help-circle-outline",
    active: false,
    collapsible: false,
  },
  {
    title: "Devoirs",
    path: "/dashboard-teacher/devoirs",
    icon: "mdi:clipboard-text",
    active: false,
    collapsible: false,
  },

  {
    title: "Discussions",
    path: "/dashboard-teacher/discussions",
    icon: "mdi:chat",
    active: false,
    collapsible: false,
  },
];

export default navItems;
