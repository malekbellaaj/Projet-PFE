import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { subjects } from "../../data/mockData";
import paths from "../../routes/paths"; // Import paths for absolute URL

// Icônes MUI au lieu de Lucide
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
} from "@mui/material";

const SubjectDetail = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mt: 8,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <ErrorOutlineIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Matière non trouvée
          </Typography>
          <RouterLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Chip label="Retour à l'accueil" color="primary" />
          </RouterLink>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* En-tête de la matière */}
      <Box
        sx={{
          p: 3,
          bgcolor: "primary.light",
          color: "primary.contrastText",
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: "white",
              color: "primary.main",
              fontWeight: "bold",
              mr: 2,
              fontSize: "1.5rem",
            }}
          >
            {subject.icon}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            {subject.name}
          </Typography>
        </Box>
        <Typography variant="body1">{subject.description}</Typography>
      </Box>

      {/* Liste des cours */}
      <Grid container spacing={3}>
        {subject.courses.map((course) => (
          <Grid {...({} as any)} item xs={12} sm={6} lg={4} key={course.id}>
            <Card
              component={RouterLink}
              to={`${paths.courseDetail
                .replace(":subjectId", subject.id)
                .replace(":courseId", course.id)}`}
              onClick={() => console.log(`Navigation vers: ${paths.courseDetail.replace(":subjectId", subject.id).replace(":courseId", course.id)}`)}
              sx={{
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: 2,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  <MenuBookIcon fontSize="small" sx={{ mr: 1 }} />
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                  mb={2}
                >
                  {course.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Chip
                    icon={<MenuBookIcon fontSize="small" />}
                    label={`${course.resources.length} Ressources`}
                    size="small"
                    color="info"
                  />
                  {course.hasQuiz && (
                    <Chip
                      icon={<QuizIcon fontSize="small" />}
                      label="Quiz"
                      size="small"
                      color="error"
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SubjectDetail;














// import React from "react";
// import { useParams, Link as RouterLink } from "react-router-dom";
// import { subjects } from "../../data/mockData";

// // Icônes MUI au lieu de Lucide
// import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import QuizIcon from "@mui/icons-material/Quiz";

// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
//   Avatar,
// } from "@mui/material";

// const SubjectDetail = () => {
//   const { subjectId } = useParams<{ subjectId: string }>();

//   const subject = subjects.find((s) => s.id === subjectId);

//   if (!subject) {
//     return (
//       <Container maxWidth="sm">
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             mt: 8,
//             p: 3,
//             bgcolor: "background.paper",
//             borderRadius: 2,
//             boxShadow: 3,
//           }}
//         >
//           <ErrorOutlineIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
//           <Typography variant="h6" color="text.secondary" gutterBottom>
//             Matière non trouvée
//           </Typography>
//           <RouterLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
//             <Chip label="Retour à l'accueil" color="primary" />
//           </RouterLink>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
//       {/* En-tête de la matière */}
//       <Box
//         sx={{
//           p: 3,
//           bgcolor: "primary.light",
//           color: "primary.contrastText",
//           borderRadius: 2,
//           mb: 4,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//           <Avatar
//             sx={{
//               bgcolor: "white",
//               color: "primary.main",
//               fontWeight: "bold",
//               mr: 2,
//               fontSize: "1.5rem",
//             }}
//           >
//             {subject.icon}
//           </Avatar>
//           <Typography variant="h4" fontWeight="bold">
//             {subject.name}
//           </Typography>
//         </Box>
//         <Typography variant="body1">{subject.description}</Typography>
//       </Box>

//       {/* Liste des cours */}
//       <Grid container spacing={3}>
//         {subject.courses.map((course) => (
//           <Grid {...({} as any)} item xs={12} sm={6} lg={4} key={course.id}>
//             <Card
//               component={RouterLink}
//               to={`/subjects/${subject.id}/courses/${course.id}`}
//               sx={{
//                 textDecoration: "none",
//                 color: "inherit",
//                 transition: "transform 0.2s ease-in-out",
//                 "&:hover": {
//                   transform: "scale(1.03)",
//                   boxShadow: 6,
//                 },
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 p: 2,
//                 borderRadius: 2,
//               }}
//             >
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   color="primary"
//                   fontWeight="bold"
//                   gutterBottom
//                 >
//                   <MenuBookIcon fontSize="small" sx={{ mr: 1 }} />
//                   {course.title}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     display: "-webkit-box",
//                     WebkitLineClamp: 2,
//                   }}
//                   mb={2}
//                 >
//                   {course.description}
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mt: 2,
//                   }}
//                 >
//                   <Chip
//                     icon={<MenuBookIcon fontSize="small" />}
//                     label={`${course.resources.length} Ressources`}
//                     size="small"
//                     color="info"
//                   />
//                   {course.hasQuiz && (
//                     <Chip
//                       icon={<QuizIcon fontSize="small" />}
//                       label="Quiz"
//                       size="small"
//                       color="error"
//                     />
//                   )}
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default SubjectDetail;

// import React from 'react';

// export default function Bonjour() {
//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px' }}>
//       Bonjour
//     </div>
//   );
// }
