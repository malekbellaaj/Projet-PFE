import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import GamesIcon from "@mui/icons-material/Games";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SubjectList from "./SubjectList";
import { subjects } from "../../data/mockData";
import paths from "../../routes/paths";

const featureCards = [
  {
    icon: <SchoolIcon sx={{ fontSize: 30 }} />,
    title: "Cours Interactifs",
    description: "Des cours engageants adaptés au programme scolaire.",
    color: "#2196f3", // Bleu
  },
  // {
  //   icon: <GamesIcon sx={{ fontSize: 30 }} />,
  //   title: "Jeux Éducatifs",
  //   description: "Apprenez en vous amusant avec des jeux éducatifs.",
  //   color: "#e5eef9",
  // },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 30 }} />,
    title: "Suivi de Progrès",
    description: "Suivez vos progrès et identifiez vos points forts.",
    color: "#4caf50", // Vert
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 30 }} />,
    title: "Récompenses",
    description: "Gagnez des récompenses pour vos réussites.",
    color: "#f44336", // Rouge
  },
];

export default function SubjectsPage() {
  const history = useHistory();

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 6,
          borderRadius: 2,
          mb: 4,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url(https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              position: "relative",
              zIndex: 1,
            }}
          >
            Bienvenue sur votre plateforme éducative
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              maxWidth: 600,
              position: "relative",
              zIndex: 1,
            }}
          >
            Découvrez des cours, des devoirs et des discussions pour exceller
            dans vos études.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#e5eef9",
              color: "primary.main",
              fontWeight: "bold",
              position: "relative",
              zIndex: 1,
              "&:hover": {
                bgcolor: "#d1e0f0",
                transform: "translateY(-3px)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={() => history.push(paths.home)}
          >
            Commencer à Apprendre
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {featureCards.map((feature, index) => (
            <Grid
              {...({} as any)}
              component="div"
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >
              {" "}
              <Box
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: "white",
                  height: "100%",
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Box
                  sx={{
                    backgroundColor: alpha(feature.color, 0.2),
                    color: feature.color,
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                    mx: "auto",
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <SubjectList subjects={subjects} />
      </Container>
    </Box>
  );
}

// import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
// import paths from "../../routes/paths";
// import { subjects } from "../../data/mockData";

// const SubjectsPage = () => {
//   const history = useHistory();

//   return (
//     <main>
//       <Typography
//         variant="h1"
//         fontWeight="bold"
//         align="center"
//         gutterBottom
//         sx={{ mt: 4, mb: 10, color: "primary.main" }}
//       >
//         Mes matières
//       </Typography>

//       <Grid
//         container
//         spacing={4}
//         sx={{
//           flexGrow: 1,
//           width: "100%",
//           pb: { xs: 2, md: 6 },
//           px: { xs: 2, md: 3 },
//         }}
//         justifyContent="center"
//       >
//         {/* Liste des matières */}
//         <Grid container spacing={3} justifyContent="center">
//           {subjects.map((subject) => (
//             <Grid
//               key={subject.id}
//               {...({} as any)}
//               item
//               xs={12}
//               sm={6}
//               md={4}
//               lg={3}
//             >
//               <Card
//                 onClick={() =>
//                   history.push(
//                     `${paths.subjectDetail.replace(":subjectId", subject.id)}`
//                   )
//                 }
//                 sx={{
//                   height: "100%",
//                   textAlign: "center",
//                   boxShadow: 3,
//                   borderRadius: 3,
//                   transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                   "&:hover": {
//                     transform: "scale(1.05)",
//                     boxShadow: 8,
//                     cursor: "pointer",
//                   },
//                   p: 2,
//                 }}
//               >
//                 <CardContent>
//                   {/* Icône centrée */}
//                   <Box mb={2} display="flex" justifyContent="center">
//                     <Typography variant="h3">{subject.icon}</Typography>
//                   </Box>

//                   {/* Nom centré */}
//                   <Typography variant="h6" fontWeight="bold" color="primary">
//                     {subject.name}
//                   </Typography>

//                   {/* Nombre de cours */}
//                   <Box
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     mt={2}
//                   >
//                     <MenuBookOutlinedIcon fontSize="small" color="primary" />
//                     <Typography variant="caption" ml={1} color="primary">
//                       {subject.courses.length} cours
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </main>
//   );
// };

// export default SubjectsPage;

// import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
// import paths from "../../routes/paths";
// import { subjects } from "../../data/mockData";

// const SubjectsPage = () => {
//   const history = useHistory();

//   return (
//     <main>
//       <Grid
//         container
//         spacing={4}
//         sx={{
//           flexGrow: 1,
//           width: "100%",
//           pt: { xs: 2, md: 4 },
//           pb: { xs: 2, md: 6 },
//           px: { xs: 2, md: 3 },
//         }}
//       >
//         {/* Titre */}
//         <Grid {...({} as any)} item xs={12}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             Mes matières
//           </Typography>
//         </Grid>

//         {/* Liste des matières */}
//         <Grid container spacing={3}>
//           {subjects.map((subject) => (
//             <Grid
//               key={subject.id}
//               {...({} as any)}
//               item
//               xs={12}
//               sm={6}
//               lg={6} // ← Modifié ici
//             >
//               <Card
//                 onClick={() => history.push(`${paths.subjectDetail.replace(':subjectId', subject.id)}`)}
//                 sx={{
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   boxShadow: 3,
//                   borderRadius: 2,
//                   transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: 8,
//                     cursor: "pointer",
//                   },
//                   padding: 2,
//                 }}
//               >
//                 <CardContent>
//                   <Box display="flex" alignItems="center" mb={2}>
//                     <Typography variant="h4" sx={{ mr: 1 }}>
//                       {subject.icon}
//                     </Typography>
//                     <Typography variant="h6" fontWeight="bold" color="primary">
//                       {subject.name}
//                     </Typography>
//                   </Box>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       display: "-webkit-box",
//                       WebkitLineClamp: 3,
//                     }}
//                     mb={2}
//                   >
//                     {subject.description}
//                   </Typography>
//                   <Box display="flex" alignItems="center" mt={2}>
//                     <MenuBookOutlinedIcon fontSize="small" color="primary" />
//                     <Typography variant="caption" ml={1} color="primary">
//                       {subject.courses.length} cours disponibles
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </main>
//   );
// };

// export default SubjectsPage;

// import { Grid, Stack } from "@mui/material";
// import React from "react";
// import { useHistory } from "react-router-dom";
// import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

// import { subjects } from "../../data/mockData";

// const SubjectsPage = () => {
//   const history = useHistory();

//   return (
//     <main>
//       <Grid
//         container
//         spacing={4}
//         sx={{
//           flexGrow: 1,
//           width: "100%",
//           pt: { xs: 2, md: 4 },
//           pb: { xs: 2, md: 6 },
//           px: { xs: 2, md: 3 },
//         }}
//       >
//         {/* Titre */}
//         <Grid {...({} as any)} item xs={12}>
//           <h2 className="text-2xl font-semibold mb-6">Mes matières</h2>
//         </Grid>

//         {/* Liste des matières */}
//         <Grid container spacing={3}>
//           {subjects.map((subject) => (
//             <Grid
//               key={subject.id}
//               {...({} as any)}
//               item
//               xs={12}
//               sm={6}
//               lg={4}
//             >
//               <div
//                 onClick={() => history.push(`/subjects/${subject.id}`)}
//                 style={{ cursor: "pointer" }}
//               >
//                 <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg">
//                   <div className="flex items-center mb-4">
//                     <span className="text-3xl mr-3">{subject.icon}</span>
//                     <h3 className="text-xl font-semibold text-blue-800">
//                       {subject.name}
//                     </h3>
//                   </div>
//                   <p className="text-gray-600 line-clamp-3">
//                     {subject.description}
//                   </p>
//                   <div className="mt-4 flex items-center text-blue-600">
//                     <MenuBookOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
//                     <span>{subject.courses.length} cours disponibles</span>
//                   </div>
//                 </div>
//               </div>
//             </Grid>
//           ))}
//         </Grid>
//       </Grid>
//     </main>
//   );
// };

// export default SubjectsPage;

// import { Grid, Stack } from "@mui/material";
// import { ReactElement } from "react";

// // Importation des types pour une meilleure compatibilité
// import { GridProps } from "@mui/material/Grid";

// // Importation des composants personnalisés du tableau de bord
// import TopSellingProduct from "../../components/sections/dashboard/Home/Sales/TopSellingProduct/TopSellingProduct";
// import StudentsDistribution from "../../components/sections/dashboard/Home/Sales/StudentsDistribution/StudentsDistribution";
// import InfoBoxCards from "../../components/sections/dashboard/Home/Sales/InfoBoxSection/InfoBoxCards";
// import BuyersProfile from "../../components/sections/dashboard/Home/Sales/BuyersProfile/BuyersProfile";
// import NewCustomers from "../../components/sections/dashboard/Home/Sales/NewCustomers/NewCustomers";
// import StatisticsChart from "../../components/sections/dashboard/Home/Sales/CourbeStatistique/Statistics";
// // import matt from "../../components/sections/dashboard/Home/Matières/matièresImages";

// // import { drawerWidth } from "./../../layouts/main-layout";

// const Sales = (): ReactElement => {
//   return (
//     <main>
//       <Grid
//         container
//         spacing={4} //espacement etre les infoBoxCards et (courbe et studentdistribution)
//         sx={{
//           flexGrow: 1,
//           height: "100%",
//           width: "100%",
//           pt: { xs: 2, md: 4.375 },
//           pb: { xs: 1, md: 0 },
//           pl: 0,
//           pr: 0,
//         }}
//       >
//         <Grid
//           item
//           component="div"
//           xs={12}
//           {...({} as GridProps)}
//           sx={{ width: "100%", padding: 0 }}
//         >
//           <InfoBoxCards />
//         </Grid>
//         <Grid
//           container
//           component="div"
//           spacing={4}
//           sx={{
//             width: "100%",
//             padding: 0,
//             flexWrap: { xs: "wrap", md: "nowrap" }, // nowrap sur md pour rester sur la même ligne
//             alignItems: "stretch", // Alignement vertical
//           }}
//         >
//           <Grid
//             item
//             component="div"
//             xs={12}
//             md={8}
//             {...({} as GridProps)}
//             sx={{ width: { xs: "100%", md: "66.66%" }, padding: 0 }}
//           >
//             <StatisticsChart />
//           </Grid>
//           <Grid
//             item
//             component="div"
//             xs={12}
//             md={4}
//             {...({} as GridProps)}
//             sx={{ width: { xs: "100%", md: "33.33%" }, padding: 0 }}
//           >
//             <StudentsDistribution />
//           </Grid>
//         </Grid>
//         <Grid item component="div" xs={12} md={8} {...({} as GridProps)}>
//           <TopSellingProduct />
//         </Grid>
//         <Grid item component="div" xs={12} md={4} {...({} as GridProps)}>
//           <Stack
//             direction={{ xs: "column", sm: "row", md: "column" }}
//             spacing={3}
//             sx={{ height: "100%", width: "100%" }}
//           >
//             <NewCustomers />
//             <BuyersProfile />
//           </Stack>
//         </Grid>
//       </Grid>
//     </main>
//   );
// };

// export default Sales;
