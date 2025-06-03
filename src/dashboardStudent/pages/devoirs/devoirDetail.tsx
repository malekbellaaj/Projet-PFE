import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useHistory } from 'react-router-dom';
import { devoirs } from '../../data/mockData';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextareaAutosize,
  Alert,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LinearProgress from '@mui/material/LinearProgress';

const DevoirDetail: React.FC = () => {
  const { devoirId } = useParams<{ devoirId: string }>();
  const { t } = useTranslation();
  const history = useHistory();

  const [activeDevoir, setActiveDevoir] = useState(devoirs.find((dv) => dv.id === devoirId));
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(activeDevoir ? activeDevoir.timeLimit * 60 : 0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(activeDevoir?.status === 'completed');

  useEffect(() => {
    setActiveDevoir(devoirs.find((dv) => dv.id === devoirId));
    setIsCompleted(activeDevoir?.status === 'completed');
  }, [devoirId, activeDevoir?.status]);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      handleSubmit();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  if (!activeDevoir) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center', px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <WarningIcon color="warning" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Devoir non trouvé
          </Typography>
          <RouterLink to="/dashboard-student/devoirs" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
              Retour aux devoirs
            </Button>
          </RouterLink>
        </Box>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartDevoir = () => {
    setIsActive(true);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    setIsActive(false);
    setIsCompleted(true);
    alert('Devoir terminé avec succès !');
  };

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 8, px: { xs: 1, sm: 2 } }}>
      <Box sx={{ mb: 4 }}>
        <RouterLink to="/dashboard-student/devoirs" style={{ textDecoration: 'none', color: '#1976d2' }}>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <ArrowBackIcon sx={{ mr: 1 }} />
            Retour aux devoirs
          </Typography>
        </RouterLink>
      </Box>

      <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3, width: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 4 }}>
            <Box>
              <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                {activeDevoir.title}
              </Typography>
              <Box sx={{ display: 'inline-flex', bgcolor: 'primary.light', color: 'primary.main', px: 2, py: 0.5, borderRadius: 1 }}>
                <Typography variant="body2">{activeDevoir.subjectName}</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: { xs: 2, md: 0 }, textAlign: { xs: 'left', md: 'right' } }}>
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon sx={{ mr: 1, fontSize: 16 }} />
                Échéance : {formatDate(activeDevoir.dueDate)}
              </Typography>
              {isCompleted ? (
                <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
                  Devoir terminé
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Durée : {activeDevoir.timeLimit} minutes
                </Typography>
              )}
            </Box>
          </Box>

          {isActive ? (
            <Box>
              <Box sx={{ position: 'sticky', top: 0, bgcolor: 'white', py: 2, zIndex: 10, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" fontWeight="medium">
                    Temps restant :
                  </Typography>
                  <Typography variant="h6" color={timeRemaining < 60 ? 'error.main' : 'primary.main'}>
                    {formatTime(timeRemaining)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(timeRemaining / (activeDevoir.timeLimit * 60)) * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': { bgcolor: timeRemaining < 60 ? 'error.main' : 'primary.main' },
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {activeDevoir.questions.map((question, index) => (
                  <Card key={question.id} sx={{ p: 4, borderRadius: 2, bgcolor: 'grey.50', width: '100%' }}>
                    <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
                      {index + 1}. {question.text}
                    </Typography>
                    {question.type === 'text' ? (
                      <TextareaAutosize
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        minRows={4}
                        placeholder="Votre réponse..."
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          fontSize: '16px',
                          resize: 'vertical',
                        }}
                      />
                    ) : question.type === 'multiple-choice' && question.options ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {question.options.map((option, optIndex) => (
                          <Box
                            key={optIndex}
                            onClick={() => handleAnswerChange(question.id, optIndex.toString())}
                            sx={{
                              p: 2,
                              border: '1px solid',
                              borderColor: answers[question.id] === optIndex.toString() ? 'primary.main' : 'grey.300',
                              borderRadius: 1,
                              bgcolor: answers[question.id] === optIndex.toString() ? 'primary.light' : 'transparent',
                              cursor: 'pointer',
                              '&:hover': { bgcolor: 'grey.100' },
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: '2px solid',
                                borderColor: answers[question.id] === optIndex.toString() ? 'primary.main' : 'grey.400',
                                mr: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {answers[question.id] === optIndex.toString() && (
                                <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
                              )}
                            </Box>
                            <Typography variant="body1">{option}</Typography>
                          </Box>
                        ))}
                      </Box>
                    ) : null}
                  </Card>
                ))}
              </Box>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Soumettre
                </Button>
              </Box>
            </Box>
          ) : isCompleted ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Devoir terminé
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Vous avez déjà terminé ce devoir.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push('/dashboard-student/devoirs')}
              >
                Retour aux devoirs
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
              <Divider sx={{ my: 4, width: '100%' }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Prêt à commencer ce devoir ?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Ce devoir comporte {activeDevoir.questions.length} questions et vous aurez {activeDevoir.timeLimit} minutes pour le terminer. Une fois commencé, le chronomètre ne peut pas être mis en pause.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStartDevoir}
              >
                Commencer le devoir
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default DevoirDetail;















// import React, { useState, useEffect } from 'react';
// import { useParams, Link as RouterLink, useHistory } from 'react-router-dom';
// import { devoirs } from '../../data/mockData';
// import { useTranslation } from 'react-i18next';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Button,
//   TextareaAutosize,
//   Alert,
//   Divider,
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import WarningIcon from '@mui/icons-material/Warning';
// import LinearProgress from '@mui/material/LinearProgress';

// const DevoirDetail: React.FC = () => {
//   const { devoirId } = useParams<{ devoirId: string }>();
//   const { t } = useTranslation();
//   const history = useHistory(); // Corrigé: utiliser history

//   const [activeDevoir, setActiveDevoir] = useState(devoirs.find((dv) => dv.id === devoirId));
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [timeRemaining, setTimeRemaining] = useState(activeDevoir ? activeDevoir.timeLimit * 60 : 0);
//   const [isActive, setIsActive] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(activeDevoir?.status === 'completed');

//   useEffect(() => {
//     setActiveDevoir(devoirs.find((dv) => dv.id === devoirId));
//     setIsCompleted(activeDevoir?.status === 'completed');
//   }, [devoirId, activeDevoir?.status]);

//   useEffect(() => {
//     let interval: number | null = null;

//     if (isActive && timeRemaining > 0) {
//       interval = window.setInterval(() => {
//         setTimeRemaining((prev) => prev - 1);
//       }, 1000);
//     } else if (timeRemaining === 0 && isActive) {
//       setIsActive(false);
//       handleSubmit();
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isActive, timeRemaining]);

//   if (!activeDevoir) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//           <WarningIcon color="warning" sx={{ fontSize: 48, mb: 2 }} />
//           <Typography variant="h6" color="text.secondary" gutterBottom>
//             Devoir non trouvé
//           </Typography>
//           <RouterLink to="/dashboard-student/devoirs" style={{ textDecoration: 'none' }}>
//             <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
//               Retour aux devoirs
//             </Button>
//           </RouterLink>
//         </Box>
//       </Container>
//     );
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
//   };

//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };

//   const handleStartDevoir = () => {
//     setIsActive(true);
//   };

//   const handleAnswerChange = (questionId: string, value: string) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     setIsActive(false);
//     setIsCompleted(true);
//     alert('Devoir terminé avec succès !');
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
//       <Box sx={{ mb: 4 }}>
//         <RouterLink to="/dashboard-student/devoirs" style={{ textDecoration: 'none', color: '#1976d2' }}>
//           <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
//             <ArrowBackIcon sx={{ mr: 1 }} />
//             Retour aux devoirs
//           </Typography>
//         </RouterLink>
//       </Box>

//       <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
//         <CardContent>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', mb: 4 }}>
//             <Box>
//               <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
//                 {activeDevoir.title}
//               </Typography>
//               <Box sx={{ display: 'inline-flex', bgcolor: 'primary.light', color: 'primary.main', px: 2, py: 0.5, borderRadius: 1 }}>
//                 <Typography variant="body2">{activeDevoir.subjectName}</Typography>
//               </Box>
//             </Box>
//             <Box sx={{ mt: { xs: 2, md: 0 }, textAlign: { xs: 'left', md: 'right' } }}>
//               <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <AccessTimeIcon sx={{ mr: 1, fontSize: 16 }} />
//                 Échéance : {formatDate(activeDevoir.dueDate)}
//               </Typography>
//               {isCompleted ? (
//                 <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
//                   <CheckCircleIcon sx={{ mr: 1, fontSize: 16 }} />
//                   Devoir terminé
//                 </Typography>
//               ) : (
//                 <Typography variant="body2" color="text.secondary">
//                   Durée : {activeDevoir.timeLimit} minutes
//                 </Typography>
//               )}
//             </Box>
//           </Box>

//           {isActive ? (
//             <Box>
//               <Box sx={{ position: 'sticky', top: 0, bgcolor: 'white', py: 2, zIndex: 10, mb: 4 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                   <Typography variant="body2" fontWeight="medium">
//                     Temps restant :
//                   </Typography>
//                   <Typography variant="h6" color={timeRemaining < 60 ? 'error.main' : 'primary.main'}>
//                     {formatTime(timeRemaining)}
//                   </Typography>
//                 </Box>
//                 <LinearProgress
//                   variant="determinate"
//                   value={(timeRemaining / (activeDevoir.timeLimit * 60)) * 100}
//                   sx={{
//                     height: 8,
//                     borderRadius: 4,
//                     bgcolor: 'grey.200',
//                     '& .MuiLinearProgress-bar': { bgcolor: timeRemaining < 60 ? 'error.main' : 'primary.main' },
//                   }}
//                 />
//               </Box>

//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//                 {activeDevoir.questions.map((question, index) => (
//                   <Card key={question.id} sx={{ p: 4, borderRadius: 2, bgcolor: 'grey.50' }}>
//                     <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
//                       {index + 1}. {question.text}
//                     </Typography>
//                     {question.type === 'text' ? (
//                       <TextareaAutosize
//                         value={answers[question.id] || ''}
//                         onChange={(e) => handleAnswerChange(question.id, e.target.value)}
//                         minRows={4}
//                         placeholder="Votre réponse..."
//                         style={{
//                           width: '100%',
//                           padding: '12px',
//                           border: '1px solid #ccc',
//                           borderRadius: '8px',
//                           fontSize: '16px',
//                           resize: 'vertical',
//                         }}
//                       />
//                     ) : question.type === 'multiple-choice' && question.options ? (
//                       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//                         {question.options.map((option, optIndex) => (
//                           <Box
//                             key={optIndex}
//                             onClick={() => handleAnswerChange(question.id, optIndex.toString())}
//                             sx={{
//                               p: 2,
//                               border: '1px solid',
//                               borderColor: answers[question.id] === optIndex.toString() ? 'primary.main' : 'grey.300',
//                               borderRadius: 1,
//                               bgcolor: answers[question.id] === optIndex.toString() ? 'primary.light' : 'transparent',
//                               cursor: 'pointer',
//                               '&:hover': { bgcolor: 'grey.100' },
//                               display: 'flex',
//                               alignItems: 'center',
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: '50%',
//                                 border: '2px solid',
//                                 borderColor: answers[question.id] === optIndex.toString() ? 'primary.main' : 'grey.400',
//                                 mr: 2,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                               }}
//                             >
//                               {answers[question.id] === optIndex.toString() && (
//                                 <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: 'primary.main' }} />
//                               )}
//                             </Box>
//                             <Typography variant="body1">{option}</Typography>
//                           </Box>
//                         ))}
//                       </Box>
//                     ) : null}
//                   </Card>
//                 ))}
//               </Box>

//               <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleSubmit}
//                 >
//                   Soumettre
//                 </Button>
//               </Box>
//             </Box>
//           ) : isCompleted ? (
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
//               <CheckCircleIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
//               <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
//                 Devoir terminé
//               </Typography>
//               <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//                 Vous avez déjà terminé ce devoir.
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => history.push('/dashboard-student/devoirs')} // Corrigé: utiliser history.push
//               >
//                 Retour aux devoirs
//               </Button>
//             </Box>
//           ) : (
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
//               <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
//                 Prêt à commencer ce devoir ?
//               </Typography>
//               <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
//                 Ce devoir comporte {activeDevoir.questions.length} questions et vous aurez {activeDevoir.timeLimit} minutes pour le terminer. Une fois commencé, le chronomètre ne peut pas être mis en pause.
//               </Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleStartDevoir}
//               >
//                 Commencer le devoir
//               </Button>
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default DevoirDetail;












// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { homework } from '../../data/mockData';
// import { useTranslation } from 'react-i18next';
// import { ArrowLeft, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
// import { format } from 'date-fns';
// import { fr } from 'date-fns/locale';

// const HomeworkDetail: React.FC = () => {
//   const { homeworkId } = useParams<{ homeworkId: string }>();
//   const { t } = useTranslation();
//   const navigate = useNavigate();
  
//   const [activeHomework, setActiveHomework] = useState(homework.find((hw) => hw.id === homeworkId));
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [timeRemaining, setTimeRemaining] = useState(activeHomework ? activeHomework.timeLimit * 60 : 0);
//   const [isActive, setIsActive] = useState(false);
//   const [isCompleted, setIsCompleted] = useState(activeHomework?.status === 'completed');
  
//   useEffect(() => {
//     setActiveHomework(homework.find((hw) => hw.id === homeworkId));
//     setIsCompleted(activeHomework?.status === 'completed');
//   }, [homeworkId, activeHomework?.status]);
  
//   useEffect(() => {
//     let interval: number | null = null;
    
//     if (isActive && timeRemaining > 0) {
//       interval = window.setInterval(() => {
//         setTimeRemaining((prev) => prev - 1);
//       }, 1000);
//     } else if (timeRemaining === 0 && isActive) {
//       setIsActive(false);
//       handleSubmit();
//     }
    
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isActive, timeRemaining]);
  
//   if (!activeHomework) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64">
//         <AlertTriangle size={48} className="text-yellow-500 mb-4" />
//         <h2 className="text-xl text-gray-700">Devoir non trouvé</h2>
//         <Link to="/homework" className="mt-4 text-blue-600 hover:underline">
//           Retour aux devoirs
//         </Link>
//       </div>
//     );
//   }
  
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
//   };
  
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
//   };
  
//   const handleStartHomework = () => {
//     setIsActive(true);
//   };
  
//   const handleAnswerChange = (questionId: string, value: string) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };
  
//   const handleSubmit = () => {
//     setIsActive(false);
//     setIsCompleted(true);
    
//     // In a real app, we would submit the answers to the server
//     alert('Devoir terminé avec succès!');
//   };
  
//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="mb-6 flex items-center">
//         <Link to="/homework" className="text-blue-600 hover:underline flex items-center">
//           <ArrowLeft size={18} className="mr-1" />
//           Retour aux devoirs
//         </Link>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="p-6 border-b">
//           <div className="flex flex-col md:flex-row md:justify-between md:items-start">
//             <div>
//               <h1 className="text-2xl font-bold text-blue-800 mb-2">{activeHomework.title}</h1>
//               <div className="flex items-center">
//                 <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
//                   {activeHomework.subjectName}
//                 </span>
//               </div>
//             </div>
            
//             <div className="mt-4 md:mt-0 flex flex-col items-end">
//               <div className="text-gray-600 flex items-center mb-2">
//                 <Clock size={16} className="mr-1" />
//                 {t('dueDate')}: {formatDate(activeHomework.dueDate)}
//               </div>
              
//               {isCompleted ? (
//                 <div className="flex items-center text-green-600">
//                   <CheckCircle size={18} className="mr-1" />
//                   <span>Devoir terminé</span>
//                 </div>
//               ) : (
//                 <div className="text-gray-600">
//                   {t('timeLimit')}: {activeHomework.timeLimit} {t('minutes')}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {isActive ? (
//           <div className="p-6">
//             <div className="sticky top-0 bg-white py-2 z-10 mb-6">
//               <div className="flex justify-between items-center mb-2">
//                 <div className="text-sm font-medium text-gray-700">
//                   Temps restant:
//                 </div>
//                 <div className={`text-lg font-bold ${timeRemaining < 60 ? 'text-red-600' : 'text-blue-600'}`}>
//                   {formatTime(timeRemaining)}
//                 </div>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div 
//                   className={`h-2 rounded-full transition-all ${timeRemaining < 60 ? 'bg-red-600' : 'bg-blue-600'}`}
//                   style={{ width: `${(timeRemaining / (activeHomework.timeLimit * 60)) * 100}%` }}
//                 ></div>
//               </div>
//             </div>
            
//             <div className="space-y-8">
//               {activeHomework.questions.map((question, index) => (
//                 <div key={question.id} className="border rounded-lg p-6">
//                   <h3 className="text-lg font-medium mb-4">
//                     {index + 1}. {question.text}
//                   </h3>
                  
//                   {question.type === 'text' ? (
//                     <textarea
//                       value={answers[question.id] || ''}
//                       onChange={(e) => handleAnswerChange(question.id, e.target.value)}
//                       className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
//                       rows={4}
//                       placeholder="Votre réponse..."
//                     />
//                   ) : question.type === 'multiple-choice' && question.options ? (
//                     <div className="space-y-3">
//                       {question.options.map((option, optIndex) => (
//                         <div 
//                           key={optIndex}
//                           onClick={() => handleAnswerChange(question.id, optIndex.toString())}
//                           className={`p-3 border rounded-lg cursor-pointer transition-colors ${
//                             answers[question.id] === optIndex.toString() 
//                               ? 'bg-blue-100 border-blue-500' 
//                               : 'hover:bg-gray-50'
//                           }`}
//                         >
//                           <div className="flex items-center">
//                             <div className={`w-5 h-5 rounded-full mr-3 border flex items-center justify-center ${
//                               answers[question.id] === optIndex.toString() 
//                                 ? 'border-blue-500 bg-blue-500' 
//                                 : 'border-gray-400'
//                             }`}>
//                               {answers[question.id] === optIndex.toString() && (
//                                 <div className="w-2 h-2 rounded-full bg-white"></div>
//                               )}
//                             </div>
//                             <span>{option}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : null}
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-8 flex justify-end">
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//               >
//                 {t('submit')}
//               </button>
//             </div>
//           </div>
//         ) : isCompleted ? (
//           <div className="p-6 flex flex-col items-center justify-center py-12">
//             <div className="bg-green-100 p-4 rounded-full mb-4">
//               <CheckCircle size={48} className="text-green-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">Devoir terminé</h2>
//             <p className="text-gray-600 mb-6">Vous avez déjà terminé ce devoir.</p>
//             <button
//               onClick={() => navigate('/homework')}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//             >
//               Retour aux devoirs
//             </button>
//           </div>
//         ) : (
//           <div className="p-6 flex flex-col items-center justify-center py-12">
//             <div className="text-center max-w-md">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Prêt à commencer ce devoir?</h2>
//               <p className="text-gray-600 mb-6">
//                 Ce devoir comporte {activeHomework.questions.length} questions et vous aurez {activeHomework.timeLimit} minutes pour le terminer. Une fois commencé, le chronomètre ne peut pas être mis en pause.
//               </p>
//               <button
//                 onClick={handleStartHomework}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//               >
//                 Commencer le devoir
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeworkDetail;