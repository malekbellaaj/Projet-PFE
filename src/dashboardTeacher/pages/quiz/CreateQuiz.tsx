import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Preview as PreviewIcon,
  Timer as TimerIcon,
  Quiz as QuizIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "short-answer" | "essay";
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}

const CreateQuiz: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [schoolLevel, setSchoolLevel] = useState(""); // New state for school level
  const [timeLimit, setTimeLimit] = useState(60);
  const [totalPoints, setTotalPoints] = useState(0);
  const [isTimedQuiz, setIsTimedQuiz] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false); // New state for success message

  const courses = [
    "Mathématiques",
    "Physique",
    "Chimie",
    "Biologie",
    "Informatique",
  ];
  const schoolLevels = [
    "1ère Année",
    "2ème Année",
    "3ème Année",
    "4ème Année",
    "5ème Année",
    "6ème Année",
  ]; 
  const steps = ["Configuration", "Questions", "Paramètres", "Aperçu"];

  const questionTypes = [
    { value: "multiple-choice", label: "Choix Multiple" },
    { value: "true-false", label: "Vrai/Faux" },
    { value: "short-answer", label: "Réponse Courte" },
    { value: "essay", label: "Dissertation" },
  ];

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: "",
      options:
        type === "multiple-choice"
          ? ["", "", "", ""]
          : type === "true-false"
          ? ["Vrai", "Faux"]
          : undefined,
      correctAnswer: "",
      points: 1,
    };
    setQuestions([...questions, newQuestion]);
    setTotalPoints(totalPoints + 1);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );

    if (field === "points") {
      const oldPoints = questions.find((q) => q.id === id)?.points || 0;
      setTotalPoints(totalPoints - oldPoints + value);
    }
  };

  const deleteQuestion = (id: string) => {
    const questionToDelete = questions.find((q) => q.id === id);
    if (questionToDelete) {
      setTotalPoints(totalPoints - questionToDelete.points);
    }
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestionOption = (
    questionId: string,
    optionIndex: number,
    value: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSaveQuiz = () => {
    const quizData = {
      title: quizTitle,
      description: quizDescription,
      course: selectedCourse,
      schoolLevel, // Include school level in quiz data
      timeLimit: isTimedQuiz ? timeLimit : null,
      totalPoints,
      questions,
    };
    console.log("Quiz saved:", quizData);
    setSuccessMessageOpen(true); // Show success message
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid {...({} as any)} item xs={12}>
              <TextField
                fullWidth
                label="Titre du Quiz"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid {...({} as any)} item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid {...({} as any)} item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Cours</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Cours"
                >
                  {courses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid {...({} as any)} item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Niveau scolaire</InputLabel>
                <Select
                  value={schoolLevel}
                  onChange={(e) => setSchoolLevel(e.target.value)}
                  label="Niveau scolaire"
                >
                  {schoolLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6">Questions du Quiz</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {questionTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => addQuestion(type.value as Question["type"])}
                  >
                    {type.label}
                  </Button>
                ))}
              </Box>
            </Box>

            {questions.length === 0 ? (
              <Paper
                sx={{ p: 4, textAlign: "center", color: "text.secondary" }}
              >
                <QuizIcon sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Aucune question ajoutée
                </Typography>
                <Typography variant="body2">
                  Cliquez sur un des boutons ci-dessus pour ajouter votre
                  première question
                </Typography>
              </Paper>
            ) : (
              questions.map((question, index) => (
                <QuestionEditor
                  key={question.id}
                  question={question}
                  index={index}
                  onUpdate={updateQuestion}
                  onDelete={deleteQuestion}
                  onUpdateOption={updateQuestionOption}
                />
              ))
            )}
          </Box>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid {...({} as any)} item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isTimedQuiz}
                    onChange={(e) => setIsTimedQuiz(e.target.checked)}
                  />
                }
                label="Quiz chronométré"
              />
            </Grid>
            {isTimedQuiz && (
              <Grid {...({} as any)} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Durée (minutes)"
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  InputProps={{
                    startAdornment: (
                      <TimerIcon sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                />
              </Grid>
            )}
            <Grid {...({} as any)} item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Statistiques du Quiz
              </Typography>
              <Grid container spacing={2}>
                <Grid {...({} as any)} item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4" color="primary">
                      {questions.length}
                    </Typography>
                    <Typography variant="body2">Questions</Typography>
                  </Paper>
                </Grid>
                <Grid {...({} as any)} item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4" color="secondary">
                      {totalPoints}
                    </Typography>
                    <Typography variant="body2">Points</Typography>
                  </Paper>
                </Grid>
                <Grid {...({} as any)} item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4" color="warning.main">
                      {isTimedQuiz ? timeLimit : "∞"}
                    </Typography>
                    <Typography variant="body2">Minutes</Typography>
                  </Paper>
                </Grid>
                <Grid {...({} as any)} item xs={6} md={3}>
                  <Paper sx={{ p: 2, textAlign: "center" }}>
                    <Typography variant="h4" color="success.main">
                      {Math.round(
                        (totalPoints / Math.max(questions.length, 1)) * 10
                      ) / 10}
                    </Typography>
                    <Typography variant="body2">Pts/Question</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Aperçu du Quiz
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                {quizTitle || "Titre du quiz"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, color: "text.secondary" }}
              >
                {quizDescription || "Description du quiz"}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <Chip label={selectedCourse || "Cours"} color="primary" />
                <Chip
                  label={schoolLevel || "Niveau scolaire"}
                  variant="outlined"
                />
                <Chip
                  label={`${questions.length} questions`}
                  variant="outlined"
                />
                <Chip label={`${totalPoints} points`} variant="outlined" />
                {isTimedQuiz && (
                  <Chip label={`${timeLimit} min`} variant="outlined" />
                )}
              </Box>

              <Typography variant="h6" sx={{ mb: 2 }}>
                Questions:
              </Typography>
              {questions.map((question, index) => (
                <Box
                  key={question.id}
                  sx={{
                    mb: 3,
                    p: 2,
                    backgroundColor: "grey.50",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {index + 1}. {question.question || "Question sans titre"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Type:{" "}
                    {
                      questionTypes.find((t) => t.value === question.type)
                        ?.label
                    }{" "}
                    • {question.points} points
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Créer un Quiz
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ pb: 0 }}>
          <Stepper activeStep={activeStep} sx={{}}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          {renderStepContent(activeStep)}

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              color="secondary"
            >
              Précédent
            </Button>

            <Box sx={{ display: "flex", gap: 2 }}>
              {activeStep === steps.length - 1 ? (
                <>
                  <Button
                    startIcon={<PreviewIcon />}
                    variant="outlined"
                    color="secondary"
                    onClick={() => setPreviewOpen(true)}
                  >
                    Prévisualiser
                  </Button>
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    onClick={handleSaveQuiz}
                  >
                    Créer le Quiz
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  color="primary"
                >
                  Suivant
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccessMessage}
          severity="success"
          sx={{ width: "100%" }}
        >
          Quiz créé avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

const QuestionEditor: React.FC<{
  question: Question;
  index: number;
  onUpdate: (id: string, field: keyof Question, value: any) => void;
  onDelete: (id: string) => void;
  onUpdateOption: (
    questionId: string,
    optionIndex: number,
    value: string
  ) => void;
}> = ({ question, index, onUpdate, onDelete, onUpdateOption }) => {
  return (
    <Paper sx={{ p: 3, mb: 2, border: "1px solid #e0e0e0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Question {index + 1}</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            label="Points"
            type="number"
            value={question.points}
            onChange={(e) =>
              onUpdate(question.id, "points", Number(e.target.value))
            }
            sx={{ width: 80 }}
          />
          <IconButton onClick={() => onDelete(question.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={2}
        label="Question"
        value={question.question}
        onChange={(e) => onUpdate(question.id, "question", e.target.value)}
        sx={{ mb: 2 }}
      />

      {question.type === "multiple-choice" && question.options && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Options de réponse:
          </Typography>
          {question.options.map((option, optionIndex) => (
            <Box
              key={optionIndex}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Radio
                checked={question.correctAnswer === option}
                onChange={() => onUpdate(question.id, "correctAnswer", option)}
              />
              <TextField
                fullWidth
                size="small"
                label={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  onUpdateOption(question.id, optionIndex, e.target.value)
                }
              />
            </Box>
          ))}
        </Box>
      )}

      {question.type === "true-false" && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Réponse correcte:
          </Typography>
          <RadioGroup
            value={question.correctAnswer}
            onChange={(e) =>
              onUpdate(question.id, "correctAnswer", e.target.value)
            }
          >
            <FormControlLabel value="Vrai" control={<Radio />} label="Vrai" />
            <FormControlLabel value="Faux" control={<Radio />} label="Faux" />
          </RadioGroup>
        </Box>
      )}

      {question.type === "short-answer" && (
        <TextField
          fullWidth
          label="Réponse correcte"
          value={question.correctAnswer || ""}
          onChange={(e) =>
            onUpdate(question.id, "correctAnswer", e.target.value)
          }
          sx={{ mt: 1 }}
        />
      )}
    </Paper>
  );
};

export default CreateQuiz;

// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   IconButton,
//   Paper,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   Switch,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   FormGroup,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Stepper,
//   Step,
//   StepLabel,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   Save as SaveIcon,
//   Preview as PreviewIcon,
//   Timer as TimerIcon,
//   Quiz as QuizIcon,
//   CheckCircle as CheckIcon,
// } from '@mui/icons-material';

// interface Question {
//   id: string;
//   type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
//   question: string;
//   options?: string[];
//   correctAnswer?: string | string[];
//   points: number;
// }

// const CreateQuiz: React.FC = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [quizTitle, setQuizTitle] = useState('');
//   const [quizDescription, setQuizDescription] = useState('');
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [timeLimit, setTimeLimit] = useState(60);
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [isTimedQuiz, setIsTimedQuiz] = useState(true);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [previewOpen, setPreviewOpen] = useState(false);

//   const courses = ['Mathématiques', 'Physique', 'Chimie', 'Biologie', 'Informatique'];
//   const steps = ['Configuration', 'Questions', 'Paramètres', 'Aperçu'];

//   const questionTypes = [
//     { value: 'multiple-choice', label: 'Choix Multiple' },
//     { value: 'true-false', label: 'Vrai/Faux' },
//     { value: 'short-answer', label: 'Réponse Courte' },
//     { value: 'essay', label: 'Dissertation' },
//   ];

//   const addQuestion = (type: Question['type']) => {
//     const newQuestion: Question = {
//       id: Date.now().toString(),
//       type,
//       question: '',
//       options: type === 'multiple-choice' ? ['', '', '', ''] : type === 'true-false' ? ['Vrai', 'Faux'] : undefined,
//       correctAnswer: '',
//       points: 1,
//     };
//     setQuestions([...questions, newQuestion]);
//     setTotalPoints(totalPoints + 1);
//   };

//   const updateQuestion = (id: string, field: keyof Question, value: any) => {
//     setQuestions(questions.map(q =>
//       q.id === id ? { ...q, [field]: value } : q
//     ));

//     if (field === 'points') {
//       const oldPoints = questions.find(q => q.id === id)?.points || 0;
//       setTotalPoints(totalPoints - oldPoints + value);
//     }
//   };

//   const deleteQuestion = (id: string) => {
//     const questionToDelete = questions.find(q => q.id === id);
//     if (questionToDelete) {
//       setTotalPoints(totalPoints - questionToDelete.points);
//     };
//     setQuestions(questions.filter(q => q.id !== id));
//   };

//   const updateQuestionOption = (questionId: string, optionIndex: number, value: string) => {
//     setQuestions(questions.map(q => {
//       if (q.id === questionId && q.options) {
//         const newOptions = [...q.options];
//         newOptions[optionIndex] = value;
//         return { ...q, options: newOptions };
//       };
//       return q;
//     }));
//   };

//   const handleNext = () => {
//     setActiveStep(prev => prev + 1);
//   };

//   const handleBack = () => {
//     setActiveStep(prev => prev - 1);
//   };

//   const handleSaveQuiz = () => {
//     const quizData = {
//       title: quizTitle,
//       description: quizDescription,
//       course: selectedCourse,
//       timeLimit: isTimedQuiz ? timeLimit : null,
//       totalPoints,
//       questions,
//     };
//     console.log('Quiz saved:', quizData);
//   };

//   const renderStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return (
//           <Grid container spacing={3}>
//             <Grid {...({} as any)} item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Titre du Quiz"
//                 value={quizTitle}
//                 onChange={(e) => setQuizTitle(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Description"
//                 value={quizDescription}
//                 onChange={(e) => setQuizDescription(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Cours</InputLabel>
//                 <Select
//                   value={selectedCourse}
//                   onChange={(e) => setSelectedCourse(e.target.value)}
//                   label="Cours"
//                 >
//                   {courses.map((course) => (
//                     <MenuItem key={course} value={course}>
//                       {course}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Points Total"
//                 value={totalPoints}
//                 disabled
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//           </Grid>
//         );

//       case 1:
//         return (
//           <Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//               <Typography variant="h6">Questions du Quiz</Typography>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 {questionTypes.map((type) => (
//                   <Button
//                     key={type.value}
//                     variant="outlined"
//                     size="small"
//                     startIcon={<AddIcon />}
//                     onClick={() => addQuestion(type.value as Question['type'])}
//                   >
//                     {type.label}
//                   </Button>
//                 ))}
//               </Box>
//             </Box>

//             {questions.length === 0 ? (
//               <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
//                 <QuizIcon sx={{ fontSize: 48, mb: 2 }} />
//                 <Typography variant="h6" sx={{ mb: 1 }}>
//                   Aucune question ajoutée
//                 </Typography>
//                 <Typography variant="body2">
//                   Cliquez sur un des boutons ci-dessus pour ajouter votre première question
//                 </Typography>
//               </Paper>
//             ) : (
//               questions.map((question, index) => (
//                 <QuestionEditor
//                   key={question.id}
//                   question={question}
//                   index={index}
//                   onUpdate={updateQuestion}
//                   onDelete={deleteQuestion}
//                   onUpdateOption={updateQuestionOption}
//                 />
//               ))
//             )}
//           </Box>
//         );

//       case 2:
//         return (
//           <Grid container spacing={3}>
//             <Grid {...({} as any)} item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={isTimedQuiz}
//                     onChange={(e) => setIsTimedQuiz(e.target.checked)}
//                   />
//                 }
//                 label="Quiz chronométré"
//               />
//             </Grid>
//             {isTimedQuiz && (
//               <Grid {...({} as any)} item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Durée (minutes)"
//                   type="number"
//                   value={timeLimit}
//                   onChange={(e) => setTimeLimit(Number(e.target.value))}
//                   InputProps={{
//                     startAdornment: <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />,
//                   }}
//                 />
//               </Grid>
//             )}
//             <Grid {...({} as any)} item xs={12}>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Statistiques du Quiz
//               </Typography>
//               <Grid container spacing={2}>
//                 <Grid {...({} as any)} item xs={6} md={3}>
//                   <Paper sx={{ p: 2, textAlign: 'center' }}>
//                     <Typography variant="h4" color="primary">
//                       {questions.length}
//                     </Typography>
//                     <Typography variant="body2">Questions</Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid {...({} as any)} item xs={6} md={3}>
//                   <Paper sx={{ p: 2, textAlign: 'center' }}>
//                     <Typography variant="h4" color="secondary">
//                       {totalPoints}
//                     </Typography>
//                     <Typography variant="body2">Points</Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid {...({} as any)} item xs={6} md={3}>
//                   <Paper sx={{ p: 2, textAlign: 'center' }}>
//                     <Typography variant="h4" color="warning.main">
//                       {isTimedQuiz ? timeLimit : '∞'}
//                     </Typography>
//                     <Typography variant="body2">Minutes</Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid {...({} as any)} item xs={6} md={3}>
//                   <Paper sx={{ p: 2, textAlign: 'center' }}>
//                     <Typography variant="h4" color="success.main">
//                       {Math.round((totalPoints / Math.max(questions.length, 1)) * 10) / 10}
//                     </Typography>
//                     <Typography variant="body2">Pts/Question</Typography>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         );

//       case 3:
//         return (
//           <Box>
//             <Typography variant="h6" sx={{ mb: 3 }}>
//               Aperçu du Quiz
//             </Typography>
//             <Paper sx={{ p: 3 }}>
//               <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
//                 {quizTitle || 'Titre du quiz'}
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//                 {quizDescription || 'Description du quiz'}
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
//                 <Chip label={selectedCourse || 'Cours'} color="primary" />
//                 <Chip label={`${questions.length} questions`} variant="outlined" />
//                 <Chip label={`${totalPoints} points`} variant="outlined" />
//                 {isTimedQuiz && <Chip label={`${timeLimit} min`} variant="outlined" />}
//               </Box>

//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Questions:
//               </Typography>
//               {questions.map((question, index) => (
//                 <Box key={question.id} sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
//                     {index + 1}. {question.question || 'Question sans titre'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Type: {questionTypes.find(t => t.value === question.type)?.label} • {question.points} points
//                   </Typography>
//                 </Box>
//               ))}
//             </Paper>
//           </Box>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: '100%' }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
//         Créer un Quiz
//       </Typography>

//       <Card sx={{ mb: 4 }}>
//         <CardContent sx={{ pb: 0 }}>
//           <Stepper activeStep={activeStep} sx={{}}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent>
//           {renderStepContent(activeStep)}

//           <Divider sx={{ my: 4 }} />

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button
//               disabled={activeStep === 0}
//               onClick={handleBack}
//               variant="outlined"
//               color="secondary"
//             >
//               Précédent
//             </Button>

//             <Box sx={{ display: 'flex', gap: 2 }}>
//               {activeStep === steps.length - 1 ? (
//                 <>
//                   <Button
//                     startIcon={<PreviewIcon />}
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => setPreviewOpen(true)}
//                   >
//                     Prévisualiser
//                   </Button>
//                   <Button
//                     startIcon={<SaveIcon />}
//                     variant="contained"
//                     color="success"
//                     onClick={handleSaveQuiz}
//                   >
//                     Créer le Quiz
//                   </Button>
//                 </>
//               ) : (
//                 <Button
//                   onClick={handleNext}
//                   variant="contained"
//                   color="primary"
//                 >
//                   Suivant
//                 </Button>
//               )}
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// const QuestionEditor: React.FC<{
//   question: Question;
//   index: number;
//   onUpdate: (id: string, field: keyof Question, value: any) => void;
//   onDelete: (id: string) => void;
//   onUpdateOption: (questionId: string, optionIndex: number, value: string) => void;
// }> = ({ question, index, onUpdate, onDelete, onUpdateOption }) => {
//   return (
//     <Paper sx={{ p: 3, mb: 2, border: '1px solid #e0e0e0' }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h6">Question {index + 1}</Typography>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <TextField
//             size="small"
//             label="Points"
//             type="number"
//             value={question.points}
//             onChange={(e) => onUpdate(question.id, 'points', Number(e.target.value))}
//             sx={{ width: 80 }}
//           />
//           <IconButton onClick={() => onDelete(question.id)} color="error">
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       <TextField
//         fullWidth
//         multiline
//         rows={2}
//         label="Question"
//         value={question.question}
//         onChange={(e) => onUpdate(question.id, 'question', e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       {question.type === 'multiple-choice' && question.options && (
//         <Box>
//           <Typography variant="subtitle2" sx={{ mb: 1 }}>
//             Options de réponse:
//           </Typography>
//           {question.options.map((option, optionIndex) => (
//             <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//               <Radio
//                 checked={question.correctAnswer === option}
//                 onChange={() => onUpdate(question.id, 'correctAnswer', option)}
//               />
//               <TextField
//                 fullWidth
//                 size="small"
//                 label={`Option ${optionIndex + 1}`}
//                 value={option}
//                 onChange={(e) => onUpdateOption(question.id, optionIndex, e.target.value)}
//               />
//             </Box>
//           ))}
//         </Box>
//       )}

//       {question.type === 'true-false' && (
//         <Box>
//           <Typography variant="subtitle2" sx={{ mb: 1 }}>
//             Réponse correcte:
//           </Typography>
//           <RadioGroup
//             value={question.correctAnswer}
//             onChange={(e) => onUpdate(question.id, 'correctAnswer', e.target.value)}
//           >
//             <FormControlLabel value="Vrai" control={<Radio />} label="Vrai" />
//             <FormControlLabel value="Faux" control={<Radio />} label="Faux" />
//           </RadioGroup>
//         </Box>
//       )}

//       {question.type === 'short-answer' && (
//         <TextField
//           fullWidth
//           label="Réponse correcte"
//           value={question.correctAnswer || ''}
//           onChange={(e) => onUpdate(question.id, 'correctAnswer', e.target.value)}
//           sx={{ mt: 1 }}
//         />
//       )}
//     </Paper>
//   );
// };

// export default CreateQuiz;
