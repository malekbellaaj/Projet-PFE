export const rootPaths = {
  homeRoot: "/dashboard-student-hyperactif",
  pagesRoot: "pages",
  applicationsRoot: "applications",
  authRoot: "authentication",
  notificationsRoot: "notifications",
  calendarRoot: "calendar",
  messageRoot: "messages",
  errorRoot: "error",
  subjectsRoot: "subjects",
  coursesRoot: "courses",
  devoirsRoot: "devoirs",
  discussionsRoot: "discussions",
};

interface Paths {
  home: string;
  404: string;
  subjectDetail: string;
  courseDetail: string;
  devoirDetail: string;
  discussions: string;
  devoirs: string;
}

const paths: Paths = {
  home: `${rootPaths.homeRoot}`,
  404: `${rootPaths.homeRoot}/${rootPaths.errorRoot}/404`,
  subjectDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId`,
  courseDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId/courses/:courseId`,
  devoirDetail: `${rootPaths.homeRoot}/${rootPaths.devoirsRoot}/:devoirId`,
  discussions: `${rootPaths.homeRoot}/${rootPaths.discussionsRoot}`,
  devoirs: `${rootPaths.homeRoot}/${rootPaths.devoirsRoot}`, // Chemin pour DevoirList
};

export default paths;













// export const rootPaths = {
//   homeRoot: "/dashboard-student",
//   pagesRoot: "pages",
//   applicationsRoot: "applications",
//   ecommerceRoot: "ecommerce",
//   authRoot: "authentication",
//   notificationsRoot: "notifications",
//   calendarRoot: "calendar",
//   messageRoot: "messages",
//   errorRoot: "error",
//   usersRoot: "utilisateurs",
//   complaintsRoot: "reclamations",
//   subjectsRoot: "subjects",
//   coursesRoot: "courses",
//   devoirsRoot: "devoirs", // Ajout pour les devoirs
//   chatbotRoot: "chatbot", // Ajout pour le chatbot
// };

// interface Paths {
//   home: string;
//   login: string;
//   signup: string;
//   resetPassword: string;
//   forgotPassword: string;
//   404: string;
//   teachers: string;
//   students: string;
//   admins: string;
//   complaints: string;
//   subjectDetail: string;
//   courseDetail: string;
//   devoirDetail: string; // Ajout pour DevoirDetail
//   chatbot: string; // Ajout pour Chatbot
// }

// const paths: Paths = {
//   home: `${rootPaths.homeRoot}`,
//   login: `/${rootPaths.authRoot}/login`,
//   signup: `/${rootPaths.authRoot}/sign-up`,
//   resetPassword: `/${rootPaths.authRoot}/reset-password`,
//   forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
//   404: `${rootPaths.homeRoot}/${rootPaths.errorRoot}/404`,
//   teachers: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/enseignants`,
//   students: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/eleves`,
//   admins: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/admins`,
//   complaints: `${rootPaths.homeRoot}/${rootPaths.complaintsRoot}`,
//   subjectDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId`,
//   courseDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId/courses/:courseId`,
//   devoirDetail: `${rootPaths.homeRoot}/${rootPaths.devoirsRoot}/:devoirId`, // Chemin pour DevoirDetail
//   chatbot: `${rootPaths.homeRoot}/${rootPaths.chatbotRoot}`, // Chemin pour Chatbot
// };

// export default paths;













// export const rootPaths = {
//   homeRoot: "/dashboard-student",
//   pagesRoot: "pages",
//   applicationsRoot: "applications",
//   ecommerceRoot: "ecommerce",
//   authRoot: "authentication",
//   notificationsRoot: "notifications",
//   calendarRoot: "calendar",
//   messageRoot: "messages",
//   errorRoot: "error",
//   usersRoot: "utilisateurs",
//   complaintsRoot: "reclamations",
//   subjectsRoot: "subjects", // ← Ajout ici
//   coursesRoot: "courses",
// };

// interface Paths {
//   home: string;
//   login: string;
//   signup: string;
//   resetPassword: string;
//   forgotPassword: string;
//   404: string;
//   teachers: string;
//   students: string;
//   admins: string;
//   complaints: string;
//   subjectDetail: string;
//   courseDetail: string; 
 

// }

// const paths: Paths = {
//   home: `${rootPaths.homeRoot}`,
//   login: `/${rootPaths.authRoot}/login`,
//   signup: `/${rootPaths.authRoot}/sign-up`,
//   resetPassword: `/${rootPaths.authRoot}/reset-password`,
//   forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
//   404: `${rootPaths.homeRoot}/${rootPaths.errorRoot}/404`,
//   teachers: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/enseignants`,
//   students: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/eleves`,
//   admins: `${rootPaths.homeRoot}/${rootPaths.usersRoot}/admins`,
//   complaints: `${rootPaths.homeRoot}/${rootPaths.complaintsRoot}`,
//   subjectDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId`, // ← Nouvelle route
//   // CourseDetail: `${rootPaths.homeRoot}/${rootPaths.coursesRoot}/:courseId/${rootPaths.coursesRoot}/:courseId`, 
//   courseDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId/courses/:courseId`,

// };

// export default paths;
