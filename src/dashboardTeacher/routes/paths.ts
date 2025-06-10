export const rootPaths = {
  homeRoot: "/dashboard-teacher",
  pagesRoot: "pages",
  applicationsRoot: "applications",
  authRoot: "authentication",
  notificationsRoot: "notifications",
  calendarRoot: "calendar",
  messageRoot: "messages",
  errorRoot: "error",
  subjectsRoot: "subjects",
  




  coursesRoot: "cours",
  ressourcesRoot: "ressources",
  quizRoot: "quiz",
  devoirsRoot: "devoirs",

  discussionsRoot: "discussions",
};

interface Paths {
  home: string;
  404: string;
  subjectDetail: string;
  courseDetail: string;
  // devoirDetail: string;


  cours: string;
  ressources: string;
  quiz: string;
  devoirs: string;

  discussions: string;
  
}

const paths: Paths = {
  home: `${rootPaths.homeRoot}`,
  404: `${rootPaths.homeRoot}/${rootPaths.errorRoot}/404`,
  subjectDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId`,
  courseDetail: `${rootPaths.homeRoot}/${rootPaths.subjectsRoot}/:subjectId/courses/:courseId`,
  // devoirDetail: `${rootPaths.homeRoot}/${rootPaths.devoirsRoot}/:devoirId`,
  


  cours: `${rootPaths.homeRoot}/${rootPaths.coursesRoot}`,
  ressources: `${rootPaths.homeRoot}/${rootPaths.ressourcesRoot}`,
  quiz: `${rootPaths.homeRoot}/${rootPaths.quizRoot}`,
  devoirs: `${rootPaths.homeRoot}/${rootPaths.devoirsRoot}`,
  discussions: `${rootPaths.homeRoot}/${rootPaths.discussionsRoot}`,
   // Chemin pour CoursList
};

export default paths;