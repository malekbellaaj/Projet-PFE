import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { devoirs } from "../../data/mockData";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Material UI Components
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
} from "@mui/material";

// Icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import PendingIcon from "@mui/icons-material/Pending";

const DevoirList: React.FC = () => {
  const { t } = useTranslation();

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM yyyy", { locale: fr });
  };

  // Vérifie si la date est dépassée
  const isPastDue = (dateString: string) => {
    const dueDate = new Date(dateString);
    const now = new Date();
    return dueDate < now;
  };

  // Trie les devoirs : terminés à la fin, en retard au-dessus des autres
  const sortedDevoirs = [...devoirs].sort((a, b) => {
    const statusOrder = {
      pending: 0,
      overdue: 1,
      completed: 2,
    };

    const aStatus = a.status === 'completed'
      ? 'completed'
      : isPastDue(a.dueDate)
        ? 'overdue'
        : 'pending';

    const bStatus = b.status === 'completed'
      ? 'completed'
      : isPastDue(b.dueDate)
        ? 'overdue'
        : 'pending';

    if (statusOrder[aStatus] !== statusOrder[bStatus]) {
      return statusOrder[aStatus] - statusOrder[bStatus];
    }

    // Si même statut, trier par date d’échéance
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <Container maxWidth={false} sx={{ mt: 6, mb: 10, px: { xs: 1, sm: 2 } }}>
      {/* Titre */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="bold">
          Mes devoirs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cliquez sur un devoir pour le commencer ou revoir vos réponses.
        </Typography>
      </Box>

      {/* Liste des devoirs */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {sortedDevoirs.length > 0 ? (
          sortedDevoirs.map((dv) => {
            const isCompleted = dv.status === "completed";
            const isOverdue = !isCompleted && isPastDue(dv.dueDate);

            return (
              <RouterLink
                key={dv.id}
                to={`/dashboard-student/devoirs/${dv.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 8,
                    },
                    borderLeft: isCompleted
                      ? "4px solid #4caf50"
                      : isOverdue
                        ? "4px solid #f44336"
                        : "4px solid #1976d2",
                    width: '100%',
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    {/* Titre + Matière + Statut */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", md: "center" },
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          gutterBottom
                        >
                          {dv.title}
                        </Typography>
                        <Chip
                          label={dv.subjectName}
                          color="primary"
                          size="small"
                          sx={{ bgcolor: "primary.light", color: "#fff" }}
                        />
                      </Box>

                      <Box
                        sx={{
                          mt: { xs: 2, md: 0 },
                          textAlign: { xs: "left", md: "right" },
                          minWidth: { md: "150px" },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: { xs: "flex-start", md: "flex-end" },
                            color: isCompleted
                              ? "success.main"
                              : isOverdue
                                ? "error.main"
                                : "primary.main",
                          }}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircleIcon sx={{ mr: 1, fontSize: 18 }} />
                              <Typography variant="body2">Terminé</Typography>
                            </>
                          ) : isOverdue ? (
                            <>
                              <WarningIcon sx={{ mr: 1, fontSize: 18 }} />
                              <Typography variant="body2">En retard</Typography>
                            </>
                          ) : (
                            <>
                              <PendingIcon sx={{ mr: 1, fontSize: 18 }} />
                              <Typography variant="body2">En attente</Typography>
                            </>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    {/* Échéance et Durée */}
                    <Box
                      sx={{
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "grey.200",
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        justifyContent: "space-between",
                        alignItems: { xs: "flex-start", sm: "center" },
                        gap: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <EventIcon sx={{ mr: 1, fontSize: 16 }} />
                        Échéance :{" "}
                        <strong style={{ marginLeft: 4 }}>
                          {formatDate(dv.dueDate)}
                        </strong>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: { xs: "flex-start", sm: "flex-end" },
                        }}
                      >
                        <AccessTimeIcon sx={{ mr: 1, fontSize: 16 }} />
                        Durée :{" "}
                        <strong style={{ marginLeft: 4 }}>
                          {dv.timeLimit} minutes
                        </strong>
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </RouterLink>
            );
          })
        ) : (
          <Card
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 1,
              textAlign: "center",
              width: '100%',
            }}
          >
            <EventIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" fontWeight="medium" color="text.secondary">
              Aucun devoir pour le moment
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Vous n'avez pas de devoirs assignés actuellement.
            </Typography>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default DevoirList;
// import React from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { devoirs } from "../../data/mockData";
// import { useTranslation } from "react-i18next";
// import { format } from "date-fns";
// import { fr } from "date-fns/locale";

// // Material UI Components
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";

// // Icons
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EventIcon from "@mui/icons-material/Event";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import WarningIcon from "@mui/icons-material/Warning";
// import PendingIcon from "@mui/icons-material/Pending";

// const DevoirList: React.FC = () => {
//   const { t } = useTranslation();

//   // Fonction pour formater la date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return format(date, "dd MMMM yyyy", { locale: fr });
//   };

//   // Vérifie si la date est dépassée
//   const isPastDue = (dateString: string) => {
//     const dueDate = new Date(dateString);
//     const now = new Date();
//     return dueDate < now;
//   };

//   // Trie les devoirs : terminés à la fin, en retard au-dessus des autres
//   const sortedDevoirs = [...devoirs].sort((a, b) => {
//     const statusOrder = {
//       pending: 0,
//       overdue: 1,
//       completed: 2,
//     };

//     const aStatus = a.status === 'completed'
//       ? 'completed'
//       : isPastDue(a.dueDate)
//         ? 'overdue'
//         : 'pending';

//     const bStatus = b.status === 'completed'
//       ? 'completed'
//       : isPastDue(b.dueDate)
//         ? 'overdue'
//         : 'pending';

//     if (statusOrder[aStatus] !== statusOrder[bStatus]) {
//       return statusOrder[aStatus] - statusOrder[bStatus];
//     }

//     // Si même statut, trier par date d’échéance
//     return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
//   });

//   return (
//     <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
//       {/* Titre */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h3" fontWeight="bold">
//           Mes devoirs
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Cliquez sur un devoir pour le commencer ou revoir vos réponses.
//         </Typography>
//       </Box>

//       {/* Liste des devoirs */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//         {sortedDevoirs.length > 0 ? (
//           sortedDevoirs.map((dv) => {
//             const isCompleted = dv.status === "completed";
//             const isOverdue = !isCompleted && isPastDue(dv.dueDate);

//             return (
//               <RouterLink
//                 key={dv.id}
//                 to={`/dashboard-student/devoirs/${dv.id}`}
//                 style={{ textDecoration: "none" }}
//               >
//                 <Card
//                   sx={{
//                     p: 3,
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: 8,
//                     },
//                     borderLeft: isCompleted
//                       ? "4px solid #4caf50"
//                       : isOverdue
//                         ? "4px solid #f44336"
//                         : "4px solid #1976d2",
//                   }}
//                 >
//                   <CardContent sx={{ p: 0 }}>
//                     {/* Titre + Matière + Statut */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: { xs: "column", md: "row" },
//                         justifyContent: "space-between",
//                         alignItems: { xs: "flex-start", md: "center" },
//                         mb: 2,
//                       }}
//                     >
//                       <Box>
//                         <Typography
//                           variant="h6"
//                           fontWeight="bold"
//                           gutterBottom
//                         >
//                           {dv.title}
//                         </Typography>
//                         <Chip
//                           label={dv.subjectName}
//                           color="primary"
//                           size="small"
//                           sx={{ bgcolor: "primary.light", color: "#fff" }}
//                         />
//                       </Box>

//                       <Box
//                         sx={{
//                           mt: { xs: 2, md: 0 },
//                           textAlign: { xs: "left", md: "right" },
//                           minWidth: { md: "150px" },
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: { xs: "flex-start", md: "flex-end" },
//                             color: isCompleted
//                               ? "success.main"
//                               : isOverdue
//                                 ? "error.main"
//                                 : "primary.main",
//                           }}
//                         >
//                           {isCompleted ? (
//                             <>
//                               <CheckCircleIcon sx={{ mr: 1, fontSize: 18 }} />
//                               <Typography variant="body2">Terminé</Typography>
//                             </>
//                           ) : isOverdue ? (
//                             <>
//                               <WarningIcon sx={{ mr: 1, fontSize: 18 }} />
//                               <Typography variant="body2">En retard</Typography>
//                             </>
//                           ) : (
//                             <>
//                               <PendingIcon sx={{ mr: 1, fontSize: 18 }} />
//                               <Typography variant="body2">En attente</Typography>
//                             </>
//                           )}
//                         </Box>
//                       </Box>
//                     </Box>

//                     {/* Échéance et Durée */}
//                     <Box
//                       sx={{
//                         pt: 2,
//                         borderTop: "1px solid",
//                         borderColor: "grey.200",
//                         display: "flex",
//                         flexDirection: { xs: "column", sm: "row" },
//                         justifyContent: "space-between",
//                         alignItems: { xs: "flex-start", sm: "center" },
//                         gap: 1,
//                       }}
//                     >
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ display: "flex", alignItems: "center" }}
//                       >
//                         <EventIcon sx={{ mr: 1, fontSize: 16 }} />
//                         Échéance :{" "}
//                         <strong style={{ marginLeft: 4 }}>
//                           {formatDate(dv.dueDate)}
//                         </strong>
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: { xs: "flex-start", sm: "flex-end" },
//                         }}
//                       >
//                         <AccessTimeIcon sx={{ mr: 1, fontSize: 16 }} />
//                         Durée :{" "}
//                         <strong style={{ marginLeft: 4 }}>
//                           {dv.timeLimit} minutes
//                         </strong>
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </RouterLink>
//             );
//           })
//         ) : (
//           <Card
//             sx={{
//               p: 4,
//               borderRadius: 2,
//               boxShadow: 1,
//               textAlign: "center",
//             }}
//           >
//             <EventIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
//             <Typography variant="h6" fontWeight="medium" color="text.secondary">
//               Aucun devoir pour le moment
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               Vous n'avez pas de devoirs assignés actuellement.
//             </Typography>
//           </Card>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default DevoirList;























// // import React from "react";
// // import { Link as RouterLink } from "react-router-dom";
// // import { devoirs } from "../../data/mockData";
// // import { useTranslation } from "react-i18next";
// // import { format } from "date-fns";
// // import { fr } from "date-fns/locale";

// // // Material UI Components
// // import {
// //   Container,
// //   Typography,
// //   Box,
// //   Card,
// //   CardContent,
// //   Chip,
// // } from "@mui/material";

// // // Icons
// // import AccessTimeIcon from "@mui/icons-material/AccessTime";
// // import EventIcon from "@mui/icons-material/Event";
// // import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// // import WarningIcon from "@mui/icons-material/Warning";
// // import PendingIcon from "@mui/icons-material/Pending";

// // const DevoirList: React.FC = () => {
// //   const { t } = useTranslation();

// //   // Fonction pour formater la date
// //   const formatDate = (dateString: string) => {
// //     const date = new Date(dateString);
// //     return format(date, "dd MMMM yyyy", { locale: fr });
// //   };

// //   // Vérifie si la date est dépassée
// //   const isPastDue = (dateString: string) => {
// //     const dueDate = new Date(dateString);
// //     const now = new Date();
// //     return dueDate < now ;
// //   };

// //   // Trie les devoirs : terminés à la fin, en retard au-dessus des autres
// //   const sortedDevoirs = [...devoirs].sort((a, b) => {
// //     const statusOrder = {
// //       pending: 0,
// //       overdue: 1,
// //       completed: 2,
// //     };

// //     const aStatus = a.status === 'completed'
// //       ? 'completed'
// //       : isPastDue(a.dueDate)
// //         ? 'overdue'
// //         : 'pending';

// //     const bStatus = b.status === 'completed'
// //       ? 'completed'
// //       : isPastDue(b.dueDate)
// //         ? 'overdue'
// //         : 'pending';

// //     if (statusOrder[aStatus] !== statusOrder[bStatus]) {
// //       return statusOrder[aStatus] - statusOrder[bStatus];
// //     }

// //     // Si même statut, trier par date d’échéance
// //     return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
// //   });

// //   return (
// //     <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
// //       {/* Titre */}
// //       <Box sx={{ mb: 4 }}>
// //         <Typography variant="h3" fontWeight="bold">
// //           Mes devoirs
// //         </Typography>
// //         <Typography variant="body2" color="text.secondary">
// //           Cliquez sur un devoir pour le commencer ou revoir vos réponses.
// //         </Typography>
// //       </Box>

// //       {/* Liste des devoirs */}
// //       <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
// //         {sortedDevoirs.length > 0 ? (
// //           sortedDevoirs.map((dv) => {
// //             const isCompleted = dv.status === "completed";
// //             const isOverdue = !isCompleted && isPastDue(dv.dueDate);

// //             return (
// //               <RouterLink
// //                 key={dv.id}
// //                 to={`/devoirs/${dv.id}`}
// //                 style={{ textDecoration: "none" }}
// //               >
// //                 <Card
// //                   sx={{
// //                     p: 3,
// //                     borderRadius: 3,
// //                     boxShadow: 3,
// //                     transition: "transform 0.2s ease, box-shadow 0.2s ease",
// //                     "&:hover": {
// //                       transform: "translateY(-4px)",
// //                       boxShadow: 8,
// //                     },
// //                     borderLeft: isCompleted
// //                       ? "4px solid #4caf50"
// //                       : isOverdue
// //                         ? "4px solid #f44336"
// //                         : "4px solid #1976d2",
// //                   }}
// //                 >
// //                   <CardContent sx={{ p: 0 }}>
// //                     {/* Titre + Matière + Statut */}
// //                     <Box
// //                       sx={{
// //                         display: "flex",
// //                         flexDirection: { xs: "column", md: "row" },
// //                         justifyContent: "space-between",
// //                         alignItems: { md: "center" },
// //                         mb: 2,
// //                       }}
// //                     >
// //                       <Box>
// //                         <Typography
// //                           variant="h6"
// //                           fontWeight="bold"
// //                           gutterBottom
// //                         >
// //                           {dv.title}
// //                         </Typography>
// //                         <Chip
// //                           label={dv.subjectName}
// //                           color="primary"
// //                           size="small"
// //                           sx={{ bgcolor: "primary.light", color: "#fff" }}
// //                         />
// //                       </Box>

// //                       <Box
// //                         sx={{
// //                           display: "flex",
// //                           alignItems: "center",
// //                           color: isCompleted
// //                             ? "success.main"
// //                             : isOverdue
// //                               ? "error.main"
// //                               : "primary.main",
// //                           mt: { xs: 2, md: 0 },
// //                         }}
// //                       >
// //                         {isCompleted ? (
// //                           <>
// //                             <CheckCircleIcon
// //                               sx={{ mr: 1, fontSize: 18 }}
// //                             />
// //                             <Typography variant="body2">Terminé</Typography>
// //                           </>
// //                         ) : isOverdue ? (
// //                           <>
// //                             <WarningIcon sx={{ mr: 1, fontSize: 18 }} />
// //                             <Typography variant="body2">En retard</Typography>
// //                           </>
// //                         ) : (
// //                           <>
// //                             <PendingIcon sx={{ mr: 1, fontSize: 18 }} />
// //                             <Typography variant="body2">En attente</Typography>
// //                           </>
// //                         )}
// //                       </Box>
// //                     </Box>

// //                     {/* Informations supplémentaires : Échéance & Durée */}
// //                     <Box
// //                       sx={{
// //                         display: "flex",
// //                         flexWrap: "wrap",
// //                         justifyContent: "space-between",
// //                         pt: 2,
// //                         borderTop: "1px solid",
// //                         borderColor: "grey.200",
// //                       }}
// //                     >
// //                       <Typography
// //                         variant="body2"
// //                         color="text.secondary"
// //                         sx={{ display: "flex", alignItems: "center", mb: { xs: 1, sm: 0 } }}
// //                       >
// //                         <EventIcon sx={{ mr: 1, fontSize: 16 }} />
// //                         Échéance :{" "}
// //                         <strong style={{ marginLeft: 4 }}>
// //                           {formatDate(dv.dueDate)}
// //                         </strong>
// //                       </Typography>
// //                       <Typography
// //                         variant="body2"
// //                         color="text.secondary"
// //                         sx={{ display: "flex", alignItems: "center" }}
// //                       >
// //                         <AccessTimeIcon sx={{ mr: 1, fontSize: 16 }} />
// //                         Durée :{" "}
// //                         <strong style={{ marginLeft: 4 }}>
// //                           {dv.timeLimit} minutes
// //                         </strong>
// //                       </Typography>
// //                     </Box>
// //                   </CardContent>
// //                 </Card>
// //               </RouterLink>
// //             );
// //           })
// //         ) : (
// //           <Card
// //             sx={{
// //               p: 4,
// //               borderRadius: 2,
// //               boxShadow: 1,
// //               textAlign: "center",
// //             }}
// //           >
// //             <EventIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
// //             <Typography variant="h6" fontWeight="medium" color="text.secondary">
// //               Aucun devoir pour le moment
// //             </Typography>
// //             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
// //               Vous n'avez pas de devoirs assignés actuellement.
// //             </Typography>
// //           </Card>
// //         )}
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default DevoirList;










// // code li y7el devoir 
// import React from "react";
// import { Link as RouterLink } from "react-router-dom";
// import { devoirs } from "../../data/mockData";
// import { useTranslation } from "react-i18next";
// import { format } from "date-fns";
// import { fr } from "date-fns/locale";

// // Material UI Components
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Chip,
// } from "@mui/material";

// // Icons
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EventIcon from "@mui/icons-material/Event";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import WarningIcon from "@mui/icons-material/Warning";
// import PendingIcon from "@mui/icons-material/Pending";

// const DevoirList: React.FC = () => {
//   const { t } = useTranslation();

//   // Fonction pour formater la date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return format(date, "dd MMMM yyyy", { locale: fr });
//   };

//   // Vérifie si la date est dépassée
//   const isPastDue = (dateString: string) => {
//     const dueDate = new Date(dateString);
//     const now = new Date();
//     return dueDate < now;
//   };

//   // Trie les devoirs : terminés à la fin, en retard au-dessus des autres
//   const sortedDevoirs = [...devoirs].sort((a, b) => {
//     const statusOrder = {
//       pending: 0,
//       overdue: 1,
//       completed: 2,
//     };

//     const aStatus = a.status === 'completed'
//       ? 'completed'
//       : isPastDue(a.dueDate)
//         ? 'overdue'
//         : 'pending';

//     const bStatus = b.status === 'completed'
//       ? 'completed'
//       : isPastDue(b.dueDate)
//         ? 'overdue'
//         : 'pending';

//     if (statusOrder[aStatus] !== statusOrder[bStatus]) {
//       return statusOrder[aStatus] - statusOrder[bStatus];
//     }

//     // Si même statut, trier par date d’échéance
//     return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
//   });

//   return (
//     <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
//       {/* Titre */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h3" fontWeight="bold">
//           Mes devoirs
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Cliquez sur un devoir pour le commencer ou revoir vos réponses.
//         </Typography>
//       </Box>

//       {/* Liste des devoirs */}
//       <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//         {sortedDevoirs.length > 0 ? (
//           sortedDevoirs.map((dv) => {
//             const isCompleted = dv.status === "completed";
//             const isOverdue = !isCompleted && isPastDue(dv.dueDate);

//             return (
//               <RouterLink
//                 key={dv.id}
//                 to={`/dashboard-student/devoirs/${dv.id}`}
//                 style={{ textDecoration: "none" }}
//               >
//                 <Card
//                   sx={{
//                     p: 3,
//                     borderRadius: 3,
//                     boxShadow: 3,
//                     transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: 8,
//                     },
//                     borderLeft: isCompleted
//                       ? "4px solid #4caf50"
//                       : isOverdue
//                         ? "4px solid #f44336"
//                         : "4px solid #1976d2",
//                   }}
//                 >
//                   <CardContent sx={{ p: 0 }}>
//                     {/* Titre + Matière + Statut et Durée */}
//                     <Box
//                       sx={{
//                         display: "flex",
//                         flexDirection: { xs: "column", md: "row" },
//                         justifyContent: "space-between",
//                         alignItems: { xs: "flex-start", md: "center" },
//                         mb: 2,
//                       }}
//                     >
//                       <Box>
//                         <Typography
//                           variant="h6"
//                           fontWeight="bold"
//                           gutterBottom
//                         >
//                           {dv.title}
//                         </Typography>
//                         <Chip
//                           label={dv.subjectName}
//                           color="primary"
//                           size="small"
//                           sx={{ bgcolor: "primary.light", color: "#fff" }}
//                         />
//                       </Box>

//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           gap: 1,
//                           mt: { xs: 2, md: 0 },
//                           textAlign: { xs: "left", md: "right" },
//                           minWidth: { md: "150px" },
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: { xs: "flex-start", md: "flex-end" },
//                             color: isCompleted
//                               ? "success.main"
//                               : isOverdue
//                                 ? "error.main"
//                                 : "primary.main",
//                           }}
//                         >
//                           {isCompleted ? (
//                             <>
//                               <CheckCircleIcon sx={{ mr: 1, fontSize: 18 }} />
//                               <Typography variant="body2">Terminé</Typography>
//                             </>
//                           ) : isOverdue ? (
//                             <>
//                               <WarningIcon sx={{ mr: 1, fontSize: 18 }} />
//                               <Typography variant="body2">En retard</Typography>
//                             </>
//                           ) : (
//                             <>
//                               <PendingIcon sx={{ mr: 1, fontSize: 18 }} />
//                               <Typography variant="body2">En attente</Typography>
//                             </>
//                           )}
//                         </Box>
//                         <Typography
//                           variant="body2"
//                           color="text.secondary"
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: { xs: "flex-start", md: "flex-end" },
//                           }}
//                         >
//                           <AccessTimeIcon sx={{ mr: 1, fontSize: 16 }} />
//                           Durée :{" "}
//                           <strong style={{ marginLeft: 4 }}>
//                             {dv.timeLimit} minutes
//                           </strong>
//                         </Typography>
//                       </Box>
//                     </Box>

//                     {/* Échéance */}
//                     <Box sx={{ pt: 2, borderTop: "1px solid", borderColor: "grey.200" }}>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ display: "flex", alignItems: "center" }}
//                       >
//                         <EventIcon sx={{ mr: 1, fontSize: 16 }} />
//                         Échéance :{" "}
//                         <strong style={{ marginLeft: 4 }}>
//                           {formatDate(dv.dueDate)}
//                         </strong>
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </RouterLink>
//             );
//           })
//         ) : (
//           <Card
//             sx={{
//               p: 4,
//               borderRadius: 2,
//               boxShadow: 1,
//               textAlign: "center",
//             }}
//           >
//             <EventIcon sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
//             <Typography variant="h6" fontWeight="medium" color="text.secondary">
//               Aucun devoir pour le moment
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               Vous n'avez pas de devoirs assignés actuellement.
//             </Typography>
//           </Card>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default DevoirList;
















// import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { devoirs } from '../../data/mockData'; // Assumes mockData uses 'devoirs'
// import { useTranslation } from 'react-i18next';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
// } from '@mui/material';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import EventIcon from '@mui/icons-material/Event';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import WarningIcon from '@mui/icons-material/Warning';

// const DevoirList: React.FC = () => {
//   const { t } = useTranslation();

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return format(date, 'dd MMMM yyyy', { locale: fr });
//   };

//   const isPastDue = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     return date < now;
//   };

//   const sortedDevoirs = [...devoirs].sort((a, b) => {
//     if (a.status === 'pending' && b.status === 'completed') return -1;
//     if (a.status === 'completed' && b.status === 'pending') return 1;

//     const dateA = new Date(a.dueDate);
//     const dateB = new Date(b.dueDate);
//     return dateA.getTime() - dateB.getTime();
//   });

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
//       <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
//         Mes devoirs
//       </Typography>

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//         {sortedDevoirs.map((dv) => (
//           <RouterLink
//             key={dv.id}
//             to={`/devoirs/${dv.id}`}
//             style={{ textDecoration: 'none' }}
//           >
//             <Card
//               sx={{
//                 p: 3,
//                 borderRadius: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.2s, box-shadow 0.2s',
//                 '&:hover': {
//                   transform: 'scale(1.02)',
//                   boxShadow: 6,
//                 },
//               }}
//             >
//               <CardContent sx={{ p: 0 }}>
//                 <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { md: 'center' }, mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6" color="primary" fontWeight="bold">
//                       {dv.title}
//                     </Typography>
//                     <Box sx={{ display: 'inline-flex', bgcolor: 'grey.100', px: 2, py: 0.5, borderRadius: 1, mt: 1 }}>
//                       <Typography variant="body2" color="text.secondary">
//                         {dv.subjectName}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Box sx={{ mt: { xs: 2, md: 0 }, display: 'flex', alignItems: 'center', color: dv.status === 'completed' ? 'success.main' : isPastDue(dv.dueDate) ? 'error.main' : 'primary.main' }}>
//                     {dv.status === 'completed' ? (
//                       <>
//                         <CheckCircleIcon sx={{ mr: 1, fontSize: 18 }} />
//                         <Typography variant="body2">Terminé</Typography>
//                       </>
//                     ) : isPastDue(dv.dueDate) ? (
//                       <>
//                         <WarningIcon sx={{ mr: 1, fontSize: 18 }} />
//                         <Typography variant="body2">En retard</Typography>
//                       </>
//                     ) : (
//                       <>
//                         <AccessTimeIcon sx={{ mr: 1, fontSize: 18 }} />
//                         <Typography variant="body2">En attente</Typography>
//                       </>
//                     )}
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', pt: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
//                     <EventIcon sx={{ mr: 1, fontSize: 16 }} />
//                     Échéance : <Typography component="span" sx={{ fontWeight: 'medium', ml: 0.5 }}>{formatDate(dv.dueDate)}</Typography>
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
//                     <AccessTimeIcon sx={{ mr: 1, fontSize: 16 }} />
//                     Durée : <Typography component="span" sx={{ fontWeight: 'medium', ml: 0.5 }}>{dv.timeLimit} minutes</Typography>
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </RouterLink>
//         ))}
//       </Box>

//       {devoirs.length === 0 && (
//         <Card sx={{ p: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
//           <EventIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
//           <Typography variant="h6" fontWeight="medium" color="text.secondary">
//             Aucun devoir pour le moment
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
//             Vous n'avez pas de devoirs assignés actuellement.
//           </Typography>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default DevoirList;










// import React from 'react';
// import { Link } from 'react-router-dom';
// import { homework } from '../../data/mockData';
// import { useTranslation } from 'react-i18next';
// import { CalendarClock, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';

// const HomeworkList: React.FC = () => {
//   const { t } = useTranslation();
  
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return format(date, 'dd MMMM yyyy', { locale: fr });
//   };
  
//   const isPastDue = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     return date < now;
//   };
  
//   const sortedHomework = [...homework].sort((a, b) => {
//     if (a.status === 'pending' && b.status === 'completed') return -1;
//     if (a.status === 'completed' && b.status === 'pending') return 1;
    
//     const dateA = new Date(a.dueDate);
//     const dateB = new Date(b.dueDate);
//     return dateA.getTime() - dateB.getTime();
//   });
  
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold mb-6">{t('myHomework')}</h2>
      
//       <div className="space-y-6">
//         {sortedHomework.map((hw) => (
//           <Link
//             key={hw.id}
//             to={`/homework/${hw.id}`}
//             className="block bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-102 hover:shadow-lg"
//           >
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-blue-800">{hw.title}</h3>
//                   <div className="flex items-center mt-1">
//                     <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
//                       {hw.subjectName}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className={`mt-3 md:mt-0 ${hw.status === 'completed' ? 'text-green-600' : (isPastDue(hw.dueDate) ? 'text-red-600' : 'text-blue-600')}`}>
//                   {hw.status === 'completed' ? (
//                     <div className="flex items-center">
//                       <CheckCircle2 size={18} className="mr-1" />
//                       <span>{t('completed')}</span>
//                     </div>
//                   ) : (
//                     isPastDue(hw.dueDate) ? (
//                       <div className="flex items-center">
//                         <AlertCircle size={18} className="mr-1" />
//                         <span className="text-red-600">En retard</span>
//                       </div>
//                     ) : (
//                       <div className="flex items-center">
//                         <Clock size={18} className="mr-1" />
//                         <span>{t('pending')}</span>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
              
//               <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 mt-3 pt-3 border-t">
//                 <div className="flex items-center mb-2 sm:mb-0">
//                   <CalendarClock size={16} className="mr-2" />
//                   <span>
//                     {t('dueDate')}: <span className="font-medium">{formatDate(hw.dueDate)}</span>
//                   </span>
//                 </div>
                
//                 <div className="flex items-center">
//                   <Clock size={16} className="mr-2" />
//                   <span>
//                     {t('timeLimit')}: <span className="font-medium">{hw.timeLimit} {t('minutes')}</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
      
//       {homework.length === 0 && (
//         <div className="bg-white rounded-lg shadow-md p-8 text-center">
//           <div className="text-gray-400 mb-4">
//             <CalendarClock size={48} className="mx-auto" />
//           </div>
//           <h3 className="text-xl font-medium text-gray-700">Aucun devoir pour le moment</h3>
//           <p className="text-gray-500 mt-2">Vous n'avez pas de devoirs assignés actuellement.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeworkList;