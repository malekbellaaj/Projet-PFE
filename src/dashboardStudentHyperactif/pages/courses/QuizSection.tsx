import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  LinearProgress,
  Alert,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PlayCircle, CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Quiz, QuizQuestion } from './types';
import { useTranslation } from 'react-i18next';

interface QuizSectionProps {
  quiz: Quiz;
}

const ProgressWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const QuestionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: theme.shape.borderRadius,
}));

export default function QuizSection({ quiz }: QuizSectionProps) {
  const { t } = useTranslation();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const handleStart = () => {
    setStarted(true);
    // Start timer logic would go here
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / quiz.questions.length) * 100;
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = quiz.questions.find(q => q.id === questionId);
    return question && selectedAnswers[questionId] === question.correctAnswer;
  };

  if (!started) {
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          backgroundColor: 'white',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          my: 3
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            mb: 3,
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '40px',
              height: '4px',
              backgroundColor: 'secondary.main',
              borderRadius: '2px'
            }
          }}
        >
          {quiz.title}
        </Typography>
        
        <Typography variant="body1" paragraph>
          {quiz.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip 
            label={`Niveau: ${quiz.level}`} 
            sx={{ 
              mr: 1,
              backgroundColor: 
                quiz.level === 'facile' ? 'success.main' : 
                quiz.level === 'moyen' ? 'warning.main' : 'error.main',
              color: 'white',
              fontWeight: 'bold'
            }} 
          />
          <Chip 
            label={`${quiz.questions.length} questions`} 
            color="primary" 
          />
        </Box>
        
        <Button 
          variant="contained" 
          color="secondary" 
          startIcon={<PlayCircle size={20} />}
          onClick={handleStart}
          sx={{ mt: 2 }}
        >
          {t('quiz.start')}
        </Button>
      </Paper>
    );
  }

  if (showResults) {
    const score = calculateScore();
    
    return (
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          borderRadius: 2,
          backgroundColor: 'white',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          my: 3
        }}
      >
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          Résultats du Quiz
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mb: 4
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {score} / {quiz.questions.length}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(score / quiz.questions.length) * 100} 
            sx={{ height: 10, borderRadius: 5, width: '100%', mt: 2 }}
          />
        </Box>
        
        <List>
          {quiz.questions.map((question, index) => (
            <ListItem 
              key={question.id} 
              sx={{ 
                mb: 2, 
                p: 2, 
                border: '1px solid rgba(0, 0, 0, 0.12)', 
                borderRadius: 1,
                backgroundColor: isAnswerCorrect(question.id) ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isAnswerCorrect(question.id) ? 
                      <CheckCircle size={20} color="#4caf50" style={{ marginRight: 8 }} /> : 
                      <XCircle size={20} color="#f44336" style={{ marginRight: 8 }} />
                    }
                    <Typography variant="subtitle1">
                      {index + 1}. {question.question}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'text.primary' }}>
                      {t('quiz.correct')}: {question.correctAnswer}
                    </Typography>
                    {!isAnswerCorrect(question.id) && (
                      <Typography variant="body2" sx={{ color: 'error.main' }}>
                        {t('quiz.incorrect')}: {selectedAnswers[question.id]}
                      </Typography>
                    )}
                    {question.explanation && (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                        {t('quiz.explanation', { text: question.explanation })}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
        
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => {
            setStarted(false);
            setShowResults(false);
            setCurrentQuestion(0);
            setSelectedAnswers({});
          }}
          sx={{ mt: 2 }}
        >
          Recommencer
        </Button>
      </Paper>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        my: 3
      }}
    >
      <ProgressWrapper>
        <Typography variant="body2" sx={{ mr: 2 }}>
          Question {currentQuestion + 1}/{quiz.questions.length}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={getProgressPercentage()} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
      </ProgressWrapper>
      
      <Typography 
        variant="body2" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          mb: 2,
          color: timeLeft < 10 ? 'error.main' : 'text.secondary'
        }}
      >
        ⏱️ {t('quiz.timeLeft', { time: `${timeLeft}s` })}
      </Typography>
      
      <QuestionCard elevation={0}>
        <Typography variant="h6" gutterBottom>
          {currentQuestionData.question}
        </Typography>
        
        <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
          <RadioGroup
            aria-label="quiz"
            name="quiz"
            value={selectedAnswers[currentQuestionData.id] || ''}
            onChange={(e) => handleAnswerSelect(currentQuestionData.id, e.target.value)}
          >
            {currentQuestionData.options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                sx={{
                  py: 1,
                  px: 2,
                  my: 1,
                  border: '1px solid rgba(0, 0, 0, 0.12)',
                  borderRadius: 1,
                  width: '100%',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(33, 150, 243, 0.08)',
                  },
                  ...(selectedAnswers[currentQuestionData.id] === option && {
                    backgroundColor: 'rgba(33, 150, 243, 0.12)',
                    borderColor: 'primary.main',
                  }),
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </QuestionCard>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowLeft size={16} />}
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          {t('quiz.previous')}
        </Button>
        
        <Button 
          variant="contained" 
          endIcon={<ArrowRight size={16} />}
          onClick={handleNext}
          color="primary"
          disabled={!selectedAnswers[currentQuestionData.id]}
        >
          {currentQuestion < quiz.questions.length - 1 ? t('quiz.next') : t('quiz.submit')}
        </Button>
      </Box>
    </Paper>
  );
}