import React, { useState } from 'react';
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Switch,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CheckCircle as CheckIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
}

interface Submission {
  studentId: string;
  studentName: string;
  answers: { questionId: string; answer: string; pointsAwarded?: number; feedback?: string }[];
  totalPoints?: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  course: string;
  schoolLevel: string;
  dueDate: string;
  duration: number;
  questions: Question[];
  totalPoints: number;
  submissions: Submission[];
}

const CreateAndEvaluateAssignments: React.FC = () => {
  const [activeView, setActiveView] = useState<'list' | 'create' | 'evaluate'>('list');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [schoolLevel, setSchoolLevel] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [duration, setDuration] = useState(60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState<string | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);

  const courses = ['Mathématiques', 'Physique', 'Chimie', 'Biologie', 'Informatique'];
  const schoolLevels = [
    "1ère Année",
    "2ème Année",
    "3ème Année",
    "4ème Année",
    "5ème Année",
    "6ème Année",
  ];
  const steps = ['Configuration', 'Questions', 'Paramètres', 'Aperçu'];
  const questionTypes = [
    { value: 'multiple-choice', label: 'Choix Multiple' },
    { value: 'true-false', label: 'Vrai/Faux' },
    { value: 'short-answer', label: 'Réponse Courte' },
    { value: 'essay', label: 'Dissertation' },
  ];

  const addQuestion = (type: Question['type']) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: '',
      options: type === 'multiple-choice' ? ['', '', '', ''] : type === 'true-false' ? ['Vrai', 'Faux'] : undefined,
      correctAnswer: '',
      points: 1,
    };
    setQuestions([...questions, newQuestion]);
    setTotalPoints(totalPoints + 1);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, [field]: value } : q)));
    if (field === 'points') {
      const oldPoints = questions.find(q => q.id === id)?.points || 0;
      setTotalPoints(totalPoints - oldPoints + value);
    }
  };

  const deleteQuestion = (id: string) => {
    const questionToDelete = questions.find(q => q.id === id);
    if (questionToDelete) {
      setTotalPoints(totalPoints - questionToDelete.points);
    }
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestionOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSaveAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: assignmentTitle,
      description: assignmentDescription,
      course: selectedCourse,
      schoolLevel,
      dueDate,
      duration,
      questions,
      totalPoints,
      submissions: [], // No submissions initially
    };
    setAssignments([...assignments, newAssignment]);
    setSuccessMessageOpen(true);
    resetCreateForm();
    setActiveView('list');
  };

  const resetCreateForm = () => {
    setActiveStep(0);
    setAssignmentTitle('');
    setAssignmentDescription('');
    setSelectedCourse('');
    setSchoolLevel('');
    setDueDate('');
    setDuration(60);
    setQuestions([]);
    setTotalPoints(0);
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const handleEvaluateAssignment = (assignmentId: string, submission: Submission) => {
    setCurrentAssignmentId(assignmentId);
    setCurrentSubmission(submission);
    setActiveView('evaluate');
  };

  const handleUpdateSubmission = (questionId: string, pointsAwarded: number, feedback: string) => {
    if (currentSubmission) {
      const updatedAnswers = currentSubmission.answers.map(answer =>
        answer.questionId === questionId ? { ...answer, pointsAwarded, feedback } : answer
      );
      const totalPoints = updatedAnswers.reduce((sum, answer) => sum + (answer.pointsAwarded || 0), 0);
      setCurrentSubmission({ ...currentSubmission, answers: updatedAnswers, totalPoints });
    }
  };

  const handleSaveEvaluation = () => {
    if (currentAssignmentId && currentSubmission) {
      setAssignments(assignments.map(a => {
        if (a.id === currentAssignmentId) {
          return {
            ...a,
            submissions: a.submissions.map(s =>
              s.studentId === currentSubmission.studentId ? currentSubmission : s
            ),
          };
        }
        return a;
      }));
      setActiveView('list');
      setCurrentAssignmentId(null);
      setCurrentSubmission(null);
    }
  };

  const renderAssignmentList = () => (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Gestion des Devoirs
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setActiveView('create')}
        >
          Créer un Devoir
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titre</TableCell>
              <TableCell>Cours</TableCell>
              <TableCell>Niveau</TableCell>
              <TableCell>Date de Soumission</TableCell>
              <TableCell>Durée (min)</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map(assignment => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>{assignment.schoolLevel}</TableCell>
                <TableCell>{assignment.dueDate}</TableCell>
                <TableCell>{assignment.duration}</TableCell>
                <TableCell>{assignment.totalPoints}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      // Simulate a submission for demo
                      const submission: Submission = {
                        studentId: 'student1',
                        studentName: 'Étudiant Exemple',
                        answers: assignment.questions.map(q => ({
                          questionId: q.id,
                          answer: '',
                        })),
                      };
                      handleEvaluateAssignment(assignment.id, submission);
                    }}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {assignments.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <AssignmentIcon sx={{ fontSize: 48, mb: 2, color: 'text.secondary' }} />
                  <Typography variant="h6" color="text.secondary">
                    Aucun devoir créé
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderCreateAssignment = () => {
    const renderStepContent = (step: number) => {
      switch (step) {
        case 0:
          return (
            <Grid container spacing={3}>
              <Grid {...({} as any)} item xs={12}>
                <TextField
                  fullWidth
                  label="Titre du Devoir"
                  value={assignmentTitle}
                  onChange={(e) => setAssignmentTitle(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid {...({} as any)} item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={assignmentDescription}
                  onChange={(e) => setAssignmentDescription(e.target.value)}
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
              <Grid {...({} as any)} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date de Soumission"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid {...({} as any)} item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Durée (minutes)"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  InputProps={{
                    startAdornment: <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              </Grid>
            </Grid>
          );

        case 1:
          return (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Questions du Devoir</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {questionTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => addQuestion(type.value as Question['type'])}
                    >
                      {type.label}
                    </Button>
                  ))}
                </Box>
              </Box>
              {questions.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                  <AssignmentIcon sx={{ fontSize: 48, mb: 2 }} />
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Aucune question ajoutée
                  </Typography>
                  <Typography variant="body2">
                    Cliquez sur un des boutons ci-dessus pour ajouter votre première question
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
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Statistiques du Devoir
                </Typography>
                <Grid container spacing={2}>
                  <Grid {...({} as any)} item xs={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        {questions.length}
                      </Typography>
                      <Typography variant="body2">Questions</Typography>
                    </Paper>
                  </Grid>
                  <Grid {...({} as any)} item xs={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="secondary">
                        {totalPoints}
                      </Typography>
                      <Typography variant="body2">Points</Typography>
                    </Paper>
                  </Grid>
                  <Grid {...({} as any)} item xs={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        {duration}
                      </Typography>
                      <Typography variant="body2">Minutes</Typography>
                    </Paper>
                  </Grid>
                  <Grid {...({} as any)} item xs={6} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        {Math.round((totalPoints / Math.max(questions.length, 1)) * 10) / 10}
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
                Aperçu du Devoir
              </Typography>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  {assignmentTitle || 'Titre du devoir'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                  {assignmentDescription || 'Description du devoir'}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                  <Chip label={selectedCourse || 'Cours'} color="primary" />
                  <Chip label={schoolLevel || 'Niveau scolaire'} variant="outlined" />
                  <Chip label={dueDate || 'Date'} variant="outlined" />
                  <Chip label={`${duration} min`} variant="outlined" />
                  <Chip label={`${questions.length} questions`} variant="outlined" />
                  <Chip label={`${totalPoints} points`} variant="outlined" />
                </Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Questions:
                </Typography>
                {questions.map((question, index) => (
                  <Box key={question.id} sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      {index + 1}. {question.question || 'Question sans titre'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {questionTypes.find(t => t.value === question.type)?.label} • {question.points} points
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
      <Box sx={{ maxWidth: '100%' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Créer un Devoir
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                color="secondary"
              >
                Précédent
              </Button>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    onClick={handleSaveAssignment}
                  >
                    Créer le Devoir
                  </Button>
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
      </Box>
    );
  };

  const renderEvaluateAssignment = () => {
    if (!currentAssignmentId || !currentSubmission) return null;
    const assignment = assignments.find(a => a.id === currentAssignmentId);
    if (!assignment) return null;

    return (
      <Box sx={{ maxWidth: '100%' }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Évaluation du Devoir: {assignment.title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Étudiant: {currentSubmission.studentName}
        </Typography>
        {assignment.questions.map((question, index) => {
          const answer = currentSubmission.answers.find(a => a.questionId === question.id);
          return (
            <Paper key={question.id} sx={{ p: 3, mb: 2, border: '1px solid #e0e0e0' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                {index + 1}. {question.question}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Type: {questionTypes.find(t => t.value === question.type)?.label} • {question.points} points
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Réponse de l’étudiant: {answer?.answer || 'Aucune réponse'}
              </Typography>
              <TextField
                fullWidth
                label="Points attribués"
                type="number"
                value={answer?.pointsAwarded || ''}
                onChange={(e) => handleUpdateSubmission(question.id, Number(e.target.value), answer?.feedback || '')}
                sx={{ mb: 2 }}
                inputProps={{ max: question.points }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Commentaires"
                value={answer?.feedback || ''}
                onChange={(e) => handleUpdateSubmission(question.id, answer?.pointsAwarded || 0, e.target.value)}
              />
            </Paper>
          );
        })}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSaveEvaluation}
          >
            Enregistrer l’évaluation
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {activeView === 'list' && renderAssignmentList()}
      {activeView === 'create' && renderCreateAssignment()}
      {activeView === 'evaluate' && renderEvaluateAssignment()}
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
          Devoir créé avec succès !
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
  onUpdateOption: (questionId: string, optionIndex: number, value: string) => void;
}> = ({ question, index, onUpdate, onDelete, onUpdateOption }) => {
  return (
    <Paper sx={{ p: 3, mb: 2, border: '1px solid #e0e0e0' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Question {index + 1}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            label="Points"
            type="number"
            value={question.points}
            onChange={(e) => onUpdate(question.id, 'points', Number(e.target.value))}
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
        onChange={(e) => onUpdate(question.id, 'question', e.target.value)}
        sx={{ mb: 2 }}
      />
      {question.type === 'multiple-choice' && question.options && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Options de réponse:
          </Typography>
          {question.options.map((option, optionIndex) => (
            <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Radio
                checked={question.correctAnswer === option}
                onChange={() => onUpdate(question.id, 'correctAnswer', option)}
              />
              <TextField
                fullWidth
                size="small"
                label={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) => onUpdateOption(question.id, optionIndex, e.target.value)}
              />
            </Box>
          ))}
        </Box>
      )}
      {question.type === 'true-false' && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Réponse correcte:
          </Typography>
          <RadioGroup
            value={question.correctAnswer}
            onChange={(e) => onUpdate(question.id, 'correctAnswer', e.target.value)}
          >
            <FormControlLabel value="Vrai" control={<Radio />} label="Vrai" />
            <FormControlLabel value="Faux" control={<Radio />} label="Faux" />
          </RadioGroup>
        </Box>
      )}
      {question.type === 'short-answer' && (
        <TextField
          fullWidth
          label="Réponse correcte"
          value={question.correctAnswer || ''}
          onChange={(e) => onUpdate(question.id, 'correctAnswer', e.target.value)}
          sx={{ mt: 1 }}
        />
      )}
    </Paper>
  );
};

export default CreateAndEvaluateAssignments;