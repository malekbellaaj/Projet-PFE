export const rootPaths = {
  homeRoot: '/dashboard-student',
  pagesRoot: 'pages',
  applicationsRoot: 'applications',
  ecommerceRoot: 'ecommerce',
  authRoot: 'authentication',
  notificationsRoot: 'notifications',
  calendarRoot: 'calendar',
  messageRoot: 'messages',
  errorRoot: 'error',
  usersRoot: 'utilisateurs',
  complaintsRoot: 'reclamations',
};

interface Paths {
  home: string;
  login: string;
  signup: string;
  resetPassword: string;
  forgotPassword: string;
  404: string;
  teachers: string;
  students: string;
  admins: string;
  complaints: string;
}

const paths: Paths = {
  home: `${rootPaths.homeRoot}`,
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  resetPassword: `/${rootPaths.authRoot}/reset-password`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `${rootPaths.homeRoot}/${rootPaths.errorRoot}/404`,
  teachers: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/enseignants`,
  students: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/eleves`,
  admins: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/admins`,
  complaints: `${rootPaths.homeRoot}/${rootPaths.complaintsRoot}`,
};

export default paths;



