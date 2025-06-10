import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Quiz as QuizIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Composants principaux du tableau de bord
const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Cours Actifs', value: '12', icon: SchoolIcon, color: '#1976d2', growth: '+8%' },
    { title: 'Étudiants Inscrits', value: '284', icon: PeopleIcon, color: '#4caf50', growth: '+12%' },
    { title: 'Devoirs en Attente', value: '18', icon: AssignmentIcon, color: '#ff9800', growth: '-5%' },
    { title: 'Quiz Créés', value: '36', icon: QuizIcon, color: '#9c27b0', growth: '+20%' },
  ];

  const courseData = [
    { name: 'Mathématiques', students: 45 },
    { name: 'Physique', students: 38 },
    { name: 'Chimie', students: 42 },
    { name: 'Biologie', students: 35 },
    { name: 'Informatique', students: 52 },
  ];

  const pieData = [
    { name: 'Complétés', value: 68, color: '#4caf50' },
    { name: 'En cours', value: 25, color: '#ff9800' },
    { name: 'En retard', value: 7, color: '#f44336' },
  ];

  const recentActivities = [
    { text: 'Nouveau devoir soumis en Mathématiques', time: 'Il y a 2h', type: 'assignment' },
    { text: 'Quiz de Physique complété par 15 étudiants', time: 'Il y a 4h', type: 'quiz' },
    { text: 'Nouvelle ressource ajoutée au cours de Chimie', time: 'Il y a 1 jour', type: 'resource' },
    { text: 'Évaluation terminée pour le projet de Biologie', time: 'Il y a 2 jours', type: 'evaluation' },
  ];

  // Matières primaires tunisiennes
  const tunisianPrimarySubjects = [
    { name: 'Français', icon: SchoolIcon, color: '#1976d2' },
    { name: 'Mathématiques', icon: TrendingUpIcon, color: '#4caf50' },
    { name: 'Arabe', icon: QuizIcon, color: '#9c27b0' },
    { name: 'Éducation civique', icon: PeopleIcon, color: '#ff9800' },
    { name: 'Sciences', icon: AssignmentIcon, color: '#f44336' },
    { name: 'Histoire & Géographie', icon: NotificationsIcon, color: '#673ab7' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
        Tableau de Bord Enseignant
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid {...({} as any)} item xs={12} sm={6} lg={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                  border: `1px solid ${stat.color}30`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom variant="body2">
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                        {stat.value}
                      </Typography>
                      <Chip
                        label={stat.growth}
                        size="small"
                        color={stat.growth.startsWith("+") ? "success" : "error"}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Icon sx={{ fontSize: 40, color: stat.color, opacity: 0.7 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3}>
        {/* Graphiques */}
        <Grid {...({} as any)} item xs={12} lg={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Étudiants par Cours
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={courseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="students" fill="#1976d2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Activités Récentes
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <NotificationsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid {...({} as any)} item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Statut des Devoirs
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                {pieData.map((item, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        backgroundColor: item.color,
                        borderRadius: "50%",
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Progression du Mois
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Cours complétés
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{ height: 8, borderRadius: 4, mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                  75%
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Quiz évalués
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={60}
                  color="secondary"
                  sx={{ height: 8, borderRadius: 4, mt: 1 }}
                />
                <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                  60%
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Ressources ajoutées
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={90}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    mt: 1,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#ff9800",
                    },
                  }}
                />
                <Typography variant="body2" sx={{ mt: 1, textAlign: "right" }}>
                  90%
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Section Matières - Programme Primaire Tunisien */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Mes Matières (Primaire)
              </Typography>
              <List>
                {tunisianPrimarySubjects.map((subject, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <subject.icon sx={{ color: subject.color }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={subject.name}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;












// import React from 'react';
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Chip,
//   LinearProgress,
// } from '@mui/material';
// import {
//   School as SchoolIcon,
//   People as PeopleIcon,
//   Assignment as AssignmentIcon,
//   Quiz as QuizIcon,
//   TrendingUp as TrendingUpIcon,
//   Notifications as NotificationsIcon,
// } from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// const Dashboard: React.FC = () => {
//   const stats = [
//     { title: 'Cours Actifs', value: '12', icon: SchoolIcon, color: '#1976d2', growth: '+8%' },
//     { title: 'Étudiants Inscrits', value: '284', icon: PeopleIcon, color: '#4caf50', growth: '+12%' },
//     { title: 'Devoirs en Attente', value: '18', icon: AssignmentIcon, color: '#ff9800', growth: '-5%' },
//     { title: 'Quiz Créés', value: '36', icon: QuizIcon, color: '#9c27b0', growth: '+20%' },
//   ];

//   const courseData = [
//     { name: 'Mathématiques', students: 45 },
//     { name: 'Physique', students: 38 },
//     { name: 'Chimie', students: 42 },
//     { name: 'Biologie', students: 35 },
//     { name: 'Informatique', students: 52 },
//   ];

//   const pieData = [
//     { name: 'Complétés', value: 68, color: '#4caf50' },
//     { name: 'En cours', value: 25, color: '#ff9800' },
//     { name: 'En retard', value: 7, color: '#f44336' },
//   ];

//   const recentActivities = [
//     { text: 'Nouveau devoir soumis en Mathématiques', time: 'Il y a 2h', type: 'assignment' },
//     { text: 'Quiz de Physique complété par 15 étudiants', time: 'Il y a 4h', type: 'quiz' },
//     { text: 'Nouvelle ressource ajoutée au cours de Chimie', time: 'Il y a 1 jour', type: 'resource' },
//     { text: 'Évaluation terminée pour le projet de Biologie', time: 'Il y a 2 jours', type: 'evaluation' },
//   ];

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#fff4ea' }}>
//         .
//       </Typography>

//       {/* Stats Cards */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;
//           return (
//             <Grid {...({} as any)} item xs={12} sm={6} lg={3} key={index}>
//               <Card sx={{ 
//                 height: '100%',
//                 background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
//                 border: `1px solid ${stat.color}30`,
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 '&:hover': {
//                   transform: 'translateY(-4px)',
//                   boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
//                 },
//               }}>
//                 <CardContent>
//                   <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                     <Box>
//                       <Typography color="textSecondary" gutterBottom variant="body2">
//                         {stat.title}
//                       </Typography>
//                       <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
//                         {stat.value}
//                       </Typography>
//                       <Chip 
//                         label={stat.growth} 
//                         size="small" 
//                         color={stat.growth.startsWith('+') ? 'success' : 'error'}
//                         sx={{ mt: 1 }}
//                       />
//                     </Box>
//                     <Icon sx={{ fontSize: 40, color: stat.color, opacity: 0.7 }} />
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       <Grid container spacing={3}>
//         {/* Chart Section */}
//         <Grid {...({} as any)} item xs={12} lg={8}>
//           <Card sx={{ mb: 3 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
//                 Étudiants par Cours
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={courseData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="students" fill="#1976d2" radius={[4, 4, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
//                 Activités Récentes
//               </Typography>
//               <List>
//                 {recentActivities.map((activity, index) => (
//                   <ListItem key={index} sx={{ px: 0 }}>
//                     <ListItemIcon>
//                       <NotificationsIcon color="primary" />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={activity.text}
//                       secondary={activity.time}
//                       primaryTypographyProps={{ fontWeight: 500 }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Sidebar */}
//         <Grid {...({} as any)} item xs={12} lg={4}>
//           <Card sx={{ mb: 3 }}>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
//                 Statut des Devoirs
//               </Typography>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={40}
//                     outerRadius={80}
//                     dataKey="value"
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//               <Box sx={{ mt: 2 }}>
//                 {pieData.map((item, index) => (
//                   <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                     <Box
//                       sx={{
//                         width: 12,
//                         height: 12,
//                         backgroundColor: item.color,
//                         borderRadius: '50%',
//                         mr: 1,
//                       }}
//                     />
//                     <Typography variant="body2" sx={{ flexGrow: 1 }}>
//                       {item.name}
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                       {item.value}%
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent>
//               <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
//                 Progression du Mois
//               </Typography>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="body2" color="textSecondary">
//                   Cours complétés
//                 </Typography>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={75} 
//                   sx={{ height: 8, borderRadius: 4, mt: 1 }}
//                 />
//                 <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
//                   75%
//                 </Typography>
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="body2" color="textSecondary">
//                   Quiz évalués
//                 </Typography>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={60} 
//                   color="secondary"
//                   sx={{ height: 8, borderRadius: 4, mt: 1 }}
//                 />
//                 <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
//                   60%
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography variant="body2" color="textSecondary">
//                   Ressources ajoutées
//                 </Typography>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={90} 
//                   sx={{ 
//                     height: 8, 
//                     borderRadius: 4, 
//                     mt: 1,
//                     '& .MuiLinearProgress-bar': {
//                       backgroundColor: '#ff9800',
//                     },
//                   }}
//                 />
//                 <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
//                   90%
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;