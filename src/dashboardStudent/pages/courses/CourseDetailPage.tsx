import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Breadcrumbs, 
  Link, 
  Tabs, 
  Tab, 
  Divider 
} from '@mui/material';
import { ArrowLeft, BookOpen, BrainCircuit, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ResourceList from './ResourceList';
import QuizSection from './QuizSection';
import MemoryGame from './games/MemoryGame';
import MatchingGame from './games/MatchingGame';
import DragAndDropGame from './games/DragAndDropGame';
import { Course, Resource, Quiz, Game } from './types';

// Mock data for course details
const mockCourses: Record<string, Course> = {
  'french-1': {
    id: 'french-1',
    subjectId: 'french',
    title: 'Grammaire Française',
    description: 'Cours sur les règles de grammaire française, les articles, les noms, les adjectifs et les adverbes.',
    level: 'facile',
    thumbnail: 'https://images.pexels.com/photos/5905497/pexels-photo-5905497.jpeg'
  },
  'french-2': {
    id: 'french-2',
    subjectId: 'french',
    title: 'Conjugaison des Verbes',
    description: 'Apprendre à conjuguer les verbes en français aux différents temps.',
    level: 'moyen',
    thumbnail: 'https://images.pexels.com/photos/6238078/pexels-photo-6238078.jpeg'
  }
};

// Mock resources
const mockResources: Record<string, Resource[]> = {
  'french-1': [
    {
      id: 'resource-1',
      courseId: 'french-1',
      title: 'Les Articles en Français',
      type: 'document',
      content: 'Les articles définis : le, la, les\nLes articles indéfinis : un, une, des\nLes articles partitifs : du, de la, des'
    },
    {
      id: 'resource-2',
      courseId: 'french-1',
      title: 'Les Noms et leurs Genres',
      type: 'video',
      content: 'Cette vidéo explique les noms masculins et féminins en français, et comment déterminer le genre d\'un nom.'
    },
    {
      id: 'resource-3',
      courseId: 'french-1',
      title: 'Exercices sur les Adjectifs',
      type: 'document',
      content: 'Série d\'exercices pour pratiquer l\'utilisation des adjectifs et leur accord avec les noms.'
    }
  ],
  'french-2': [
    {
      id: 'resource-4',
      courseId: 'french-2',
      title: 'Le Présent de l\'Indicatif',
      type: 'document',
      content: 'Règles de conjugaison des verbes du premier, deuxième et troisième groupe au présent de l\'indicatif.'
    },
    {
      id: 'resource-5',
      courseId: 'french-2',
      title: 'Le Passé Composé',
      type: 'video',
      content: 'Cette vidéo explique la formation et l\'utilisation du passé composé avec les auxiliaires avoir et être.'
    }
  ]
};

// Mock quizzes
const mockQuizzes: Record<string, Quiz[]> = {
  'french-1': [
    {
      id: 'quiz-1',
      courseId: 'french-1',
      title: 'Quiz sur les Articles',
      description: 'Testez vos connaissances sur les articles en français',
      level: 'facile',
      questions: [
        {
          id: 'q1',
          question: 'Quel est l\'article défini masculin singulier?',
          options: ['Le', 'La', 'Les', 'Un'],
          correctAnswer: 'Le',
          explanation: 'L\'article défini masculin singulier est "le".'
        },
        {
          id: 'q2',
          question: 'Quel est l\'article indéfini féminin singulier?',
          options: ['Un', 'Une', 'Des', 'La'],
          correctAnswer: 'Une',
          explanation: 'L\'article indéfini féminin singulier est "une".'
        },
        {
          id: 'q3',
          question: 'Complétez la phrase: J\'ai acheté ___ pain.',
          options: ['le', 'la', 'du', 'des'],
          correctAnswer: 'du',
          explanation: 'On utilise l\'article partitif "du" pour une quantité indéterminée de pain.'
        }
      ]
    }
  ],
  'french-2': [
    {
      id: 'quiz-2',
      courseId: 'french-2',
      title: 'Quiz sur le Présent de l\'Indicatif',
      description: 'Testez vos connaissances sur la conjugaison au présent',
      level: 'moyen',
      questions: [
        {
          id: 'q4',
          question: 'Conjuguez le verbe "aller" à la première personne du singulier.',
          options: ['Je va', 'Je vais', 'J\'alle', 'J\'allons'],
          correctAnswer: 'Je vais',
          explanation: 'Le verbe "aller" se conjugue "je vais" à la première personne du singulier.'
        },
        {
          id: 'q5',
          question: 'Conjuguez le verbe "finir" à la deuxième personne du pluriel.',
          options: ['Vous finissez', 'Vous finissiez', 'Vous finites', 'Vous finés'],
          correctAnswer: 'Vous finissez',
          explanation: 'Le verbe "finir" se conjugue "vous finissez" à la deuxième personne du pluriel.'
        }
      ]
    }
  ]
};

// Mock games
const mockGames: Record<string, Game[]> = {
  'french-1': [
    {
      id: 'game-1',
      courseId: 'french-1',
      title: 'Jeu de Mémoire: Les Articles',
      type: 'memory',
      description: 'Trouvez les paires d\'articles correspondants',
      content: {},
      instructions: 'Cliquez sur les cartes pour les retourner et trouvez les paires correspondantes.',
      level: 'facile'
    },
    {
      id: 'game-2',
      courseId: 'french-1',
      title: 'Association: Noms et Articles',
      type: 'matching',
      description: 'Associez chaque nom à l\'article qui convient',
      content: {},
      instructions: 'Glissez-déposez chaque nom vers l\'article approprié.',
      level: 'moyen'
    }
  ],
  'french-2': [
    {
      id: 'game-3',
      courseId: 'french-2',
      title: 'Glisser-Déposer: Conjugaison',
      type: 'drag-and-drop',
      description: 'Placez les verbes conjugués au bon endroit',
      content: {},
      instructions: 'Glissez chaque verbe conjugué à côté du pronom personnel correspondant.',
      level: 'difficile'
    }
  ]
};

export default function CourseDetailPage() {
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useHistory();
  const [course, setCourse] = useState<Course | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (courseId && mockCourses[courseId]) {
      setCourse(mockCourses[courseId]);
      setResources(mockResources[courseId] || []);
      setQuizzes(mockQuizzes[courseId] || []);
      setGames(mockGames[courseId] || []);
    } else {
      // Handle invalid course ID
      navigate.push('/');
    }
  }, [courseId, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (!course) {
    return null; // Loading state or error handling
  }

  return (
    <Box>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button 
            startIcon={<ArrowLeft size={16} />} 
            onClick={() => navigate.push(`/subjects/${course.subjectId}`)}
            sx={{ mr: 2 }}
          >
            Retour
          </Button>
          
          <Breadcrumbs aria-label="breadcrumb">
            <Link 
              color="inherit" 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                navigate.push('/');
              }}
            >
              {t('navigation.home')}
            </Link>
            <Link
              color="inherit"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate.push(`/subjects/${course.subjectId}`);
              }}
            >
              {course.subjectId === 'french' ? 'Français' : 
               course.subjectId === 'english' ? 'Anglais' : 
               course.subjectId === 'arabic' ? 'عربية' : course.subjectId}
            </Link>
            <Typography color="text.primary">{course.title}</Typography>
          </Breadcrumbs>
        </Box>
        
        <Box 
          sx={{ 
            bgcolor: 'white', 
            p: 3, 
            borderRadius: 2,
            mb: 4,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            {course.title}
          </Typography>
          
          <Typography variant="subtitle1" paragraph>
            {course.description}
          </Typography>
          
          <Box 
            sx={{ 
              display: 'inline-block', 
              px: 2, 
              py: 0.5, 
              borderRadius: 1,
              bgcolor: 
                course.level === 'facile' ? 'success.light' : 
                course.level === 'moyen' ? 'warning.light' : 'error.light',
              color: 
                course.level === 'facile' ? 'success.dark' : 
                course.level === 'moyen' ? 'warning.dark' : 'error.dark',
              fontWeight: 'medium',
              mb: 2
            }}
          >
            Niveau: {course.level}
          </Box>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                fontWeight: 'medium',
                '&.Mui-selected': {
                  fontWeight: 'bold',
                },
              },
            }}
          >
            <Tab 
              icon={<BookOpen size={18} />} 
              iconPosition="start" 
              label="Ressources" 
            />
            <Tab 
              icon={<HelpCircle size={18} />} 
              iconPosition="start" 
              label="Quiz" 
            />
            <Tab 
              icon={<BrainCircuit size={18} />} 
              iconPosition="start" 
              label="Jeux Éducatifs" 
            />
          </Tabs>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && resources.length > 0 && (
            <ResourceList resources={resources} />
          )}
          
          {activeTab === 1 && quizzes.length > 0 && (
            <QuizSection quiz={quizzes[0]} />
          )}
          
          {activeTab === 2 && games.length > 0 && (
            <Box>
              {games[0].type === 'memory' && <MemoryGame />}
              {games[0].type === 'matching' && <MatchingGame />}
              {games[0].type === 'drag-and-drop' && <DragAndDropGame />}
            </Box>
          )}
          
          {((activeTab === 0 && resources.length === 0) ||
            (activeTab === 1 && quizzes.length === 0) ||
            (activeTab === 2 && games.length === 0)) && (
            <Box 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px dashed',
                borderColor: 'divider'
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Aucun contenu disponible pour le moment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Le contenu sera bientôt ajouté.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}