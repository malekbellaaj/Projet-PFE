






import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const Hello: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="div" fontWeight="bold" color="primary">
          Bonjour !
        </Typography>
      </Box>
    </Container>
  );
};

export default Hello;











// code s7i7 
// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
//   Box,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Button,
//   LinearProgress,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Card,
//   Grid,
//   IconButton,
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';

// interface QuizModalProps {
//   onClose: () => void;
//   courseTitle: string;
// }

// const QuizModal: React.FC<QuizModalProps> = ({ onClose, courseTitle }) => {
//   const { t } = useTranslation();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<Record<number, string>>({});
//   const [showResults, setShowResults] = useState(false);
//   const [score, setScore] = useState(0);

//   // Mock quiz data
//   const questions = [
//     {
//       id: 1,
//       text: 'Quelle est la forme correcte du passé composé du verbe "aller" à la première personne du singulier?',
//       options: ["J'ai allé", 'Je suis allé', "J'allais", "J'ai été allé"],
//       correctAnswer: 1,
//     },
//     {
//       id: 2,
//       text: 'Avec quel auxiliaire conjugue-t-on le verbe "partir" au passé composé?',
//       options: ['Avoir', 'Être', 'Aller', 'Faire'],
//       correctAnswer: 1,
//     },
//     {
//       id: 3,
//       text: 'Comment forme-t-on le participe passé du verbe "finir"?',
//       options: ['fini', 'finé', 'finis', 'finu'],
//       correctAnswer: 0,
//     },
//   ];

//   const handleAnswer = (index: string) => {
//     setAnswers({ ...answers, [currentQuestion]: index });
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const handleSubmit = () => {
//     let newScore = 0;
//     questions.forEach((q, index) => {
//       if (parseInt(answers[index] || '-1') === q.correctAnswer) {
//         newScore++;
//       }
//     });
//     setScore(newScore);
//     setShowResults(true);
//   };

//   const isAnswered = (questionIndex: number) => {
//     return answers[questionIndex] !== undefined;
//   };

//   const isLastQuestion = currentQuestion === questions.length - 1;

//   if (showResults) {
//     return (
//       <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6">Résultats du Quiz</Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ textAlign: 'center', mb: 4 }}>
//             <Typography variant="h4" fontWeight="bold">
//               {score}/{questions.length}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               {(score / questions.length) * 100}% de réponses correctes
//             </Typography>
//           </Box>
//           <Grid container spacing={2}>
//             {questions.map((question, index) => {
//               const userAnswer = parseInt(answers[index] || '-1');
//               const isCorrect = userAnswer === question.correctAnswer;
//               return (
//                 <Grid
//                   item
//                   xs={12}
//                   key={question.id}
//                   component="div"
//                   {...({ item: true } as any)} // Workaround for TypeScript
//                 >
//                   <Card sx={{ p: 2, borderRadius: 1 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
//                       {isCorrect ? (
//                         <CheckCircleIcon color="success" sx={{ mr: 2 }} />
//                       ) : (
//                         <CancelIcon color="error" sx={{ mr: 2 }} />
//                       )}
//                       <Typography variant="body1" fontWeight="medium">
//                         {question.text}
//                       </Typography>
//                     </Box>
//                     <Box sx={{ ml: 4 }}>
//                       <Typography variant="body2" sx={{ mb: 1 }}>
//                         Votre réponse:{' '}
//                         <span style={{ color: isCorrect ? '#2e7d32' : '#d32f2f' }}>
//                           {question.options[userAnswer] || 'Aucune'}
//                         </span>
//                       </Typography>
//                       {!isCorrect && (
//                         <Typography variant="body2" color="success.main">
//                           Réponse correcte: {question.options[question.correctAnswer]}
//                         </Typography>
//                       )}
//                     </Box>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ bgcolor: 'grey.100', p: 2 }}>
//           <Button onClick={onClose} variant="contained" color="primary">
//             Fermer
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   }

//   return (
//     <Dialog open={true} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="h6">Quiz: {courseTitle}</Typography>
//         <IconButton onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Question {currentQuestion + 1} sur {questions.length}
//             </Typography>
//             <Typography variant="body2" color="primary">
//               {Object.keys(answers).length} / {questions.length} réponses
//             </Typography>
//           </Box>
//           <LinearProgress
//             variant="determinate"
//             value={((currentQuestion + 1) / questions.length) * 100}
//             sx={{ height: 8, borderRadius: 4 }}
//           />
//         </Box>
//         <Box>
//           <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
//             {questions[currentQuestion].text}
//           </Typography>
//           <RadioGroup
//             value={answers[currentQuestion] || ''}
//             onChange={(e) => handleAnswer(e.target.value)}
//           >
//             {questions[currentQuestion].options.map((option, index) => (
//               <FormControlLabel
//                 key={index}
//                 value={index.toString()}
//                 control={<Radio />}
//                 label={option}
//                 sx={{
//                   p: 2,
//                   mb: 1,
//                   border: 1,
//                   borderColor: 'grey.300',
//                   borderRadius: 1,
//                   bgcolor: answers[currentQuestion] === index.toString() ? 'primary.light' : 'transparent',
//                   '&:hover': { bgcolor: 'grey.100' },
//                 }}
//               />
//             ))}
//           </RadioGroup>
//         </Box>
//       </DialogContent>
//       <DialogActions sx={{ bgcolor: 'grey.100', p: 2 }}>
//         <Button
//           onClick={handlePrevious}
//           disabled={currentQuestion === 0}
//           variant="outlined"
//           color="secondary"
//         >
//           Précédent
//         </Button>
//         {isLastQuestion ? (
//           <Button
//             onClick={handleSubmit}
//             disabled={Object.keys(answers).length !== questions.length}
//             variant="contained"
//             color="primary"
//           >
//             Terminer le quiz
//           </Button>
//         ) : (
//           <Button
//             onClick={handleNext}
//             disabled={!isAnswered(currentQuestion)}
//             variant="contained"
//             color="primary"
//           >
//             Suivant
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default QuizModal;



















