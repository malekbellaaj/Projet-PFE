import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
  LinearProgress,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import {
  ArrowBack,
  Description,
  OndemandVideo,
  Link as LinkIcon,
  ExpandMore,
  ExpandLess,
  PlayCircleOutline,
  CheckCircle,
  Cancel,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  ArrowForward,
} from "@mui/icons-material";
import { subjects } from "../../data/mockData";
import paths from "../../routes/paths";
import ThemeConfig from "../../theme/ThemeConfigCours";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

const CourseDetail: React.FC = () => {
  const { subjectId, courseId } = useParams<{
    subjectId: string;
    courseId: string;
  }>();
  const { t } = useTranslation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const [startedQuiz, setStartedQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);
  const [openResource, setOpenResource] = useState<string | null>(null);

  const subject = subjects.find((s) => s.id === subjectId);
  const course = subject?.courses.find((c) => c.id === courseId);

  // Mock quiz data
  const quiz: Quiz = {
    id: "quiz-1",
    title: "Quiz sur le cours",
    questions: [
      {
        id: "1",
        question:
          'Quelle est la forme correcte du passé composé du verbe "aller" à la première personne du singulier ?',
        options: ["J'ai allé", "Je suis allé", "J'allais", "J'ai été allé"],
        correctAnswer: 1,
      },
      {
        id: "2",
        question:
          'Avec quel auxiliaire conjugue-t-on le verbe "partir" au passé composé ?',
        options: ["Avoir", "Être", "Aller", "Faire"],
        correctAnswer: 0,
      },
      {
        id: "3",
        question: 'Comment forme-t-on le participe passé du verbe "finir" ?',
        options: ["fini", "finé", "finis", "finu"],
        correctAnswer: 0,
      },
    ],
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStartQuiz = () => {
    setStartedQuiz(true);
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
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
    quiz.questions.forEach((question) => {
      if (
        parseInt(selectedAnswers[question.id] || "-1") ===
        question.correctAnswer
      ) {
        score++;
      }
    });
    return score;
  };

  const toggleResource = (id: string) => {
    setOpenResource(openResource === id ? null : id);
  };

  const handleDownload = (resource: { url: string; title: string }) => {
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = resource.url;
    link.download = resource.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (resource: { url: string }) => {
    window.open(resource.url, "_blank");
  };

  if (!subject || !course) {
    return (
      <ThemeConfig>
        <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h6" color="error" gutterBottom>
            Cours non trouvé
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push(`/subjects/${subjectId}`)}
          >
            Retour à la matière
          </Button>
        </Container>
      </ThemeConfig>
    );
  }

  const getResourceIcon = (url: string) => {
    if (url.includes(".pdf")) return <Description />;
    if (url.includes("video")) return <OndemandVideo />;
    return <LinkIcon />;
  };

  return (
    <ThemeConfig>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          {/* Navigation */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.push(`/subjects/${subject.id}`)}
              sx={{ mr: 2, color: "primary.light" }}
            >
              Retour
            </Button>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                color="inherit"
                onClick={() => history.push(paths.home)}
                sx={{ cursor: "pointer" }}
              >
                {t("Accueil")}
              </Link>
              <Link
                color="inherit"
                onClick={() => history.push(`/subjects/${subject.id}`)}
                sx={{ cursor: "pointer" }}
              >
                {subject.name}
              </Link>
              <Typography color="text.primary">{course.title}</Typography>
            </Breadcrumbs>
          </Box>

          {/* Header */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {course.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {course.description}
            </Typography>
            <Chip
              label="Niveau: Non spécifié"
              sx={{
                bgcolor: "primary.light",
                color: "primary.main",
                fontWeight: "medium",
              }}
            />
          </Paper>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTabs-indicator": {
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                  bgcolor: "primary.light",
                },
                "& .MuiTab-root": {
                  fontWeight: "medium",
                  "&.Mui-selected": {
                    color: "primary.main",
                    fontWeight: "bold",
                  },
                },
              }}
            >
              <Tab label="Ressources" />
              <Tab label="Quiz" disabled={!course.hasQuiz} />
            </Tabs>
          </Box>

          {/* Content */}
          {activeTab === 0 && (
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "40px",
                    height: "4px",
                    backgroundColor: "primary.light",
                    borderRadius: "2px",
                  },
                }}
              >
                Ressources
              </Typography>
              {course.resources.length === 0 ? (
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    border: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Aucune ressource disponible
                  </Typography>
                </Box>
              ) : (
                <List>
                  {course.resources.map((resource, index) => (
                    <Box key={resource.id}>
                      {index > 0 && <Divider sx={{ my: 1 }} />}
                      <ListItem
                        sx={{
                          px: 2,
                          py: 1.5,
                          cursor: "pointer",
                          "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                        }}
                        onClick={() => toggleResource(resource.id)}
                      >
                        <ListItemIcon>
                          {getResourceIcon(resource.url)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1">
                              {resource.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              Document
                            </Typography>
                          }
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<DownloadIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(resource);
                            }}
                            sx={{
                              bgcolor: "primary.light",
                              color: "primary.main",
                              "&:hover": {
                                bgcolor: "primary.main",
                                color: "white",
                              },
                            }}
                          >
                            Télécharger
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleView(resource);
                            }}
                            sx={{
                              borderColor: "primary.light",
                              color: "primary.main",
                            }}
                          >
                            Voir
                          </Button>
                        </Box>
                        <IconButton onClick={() => toggleResource(resource.id)}>
                          {openResource === resource.id ? (
                            <ExpandLess />
                          ) : (
                            <ExpandMore />
                          )}
                        </IconButton>
                      </ListItem>
                      <Collapse
                        in={openResource === resource.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box
                          sx={{
                            p: 3,
                            bgcolor: "rgba(0, 0, 0, 0.02)",
                            borderRadius: 1,
                            mx: 2,
                            mb: 2,
                          }}
                        >
                          <Typography variant="body1">
                            Contenu de la ressource : {resource.title}
                          </Typography>
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                </List>
              )}
            </Paper>
          )}

          {activeTab === 1 && course.hasQuiz && (
            <Paper sx={{ p: 3 }}>
              {!startedQuiz ? (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      mb: 3,
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        width: "40px",
                        height: "4px",
                        backgroundColor: "primary.light",
                        borderRadius: "2px",
                      },
                    }}
                  >
                    {quiz.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Testez vos connaissances sur ce cours.
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Chip
                      label={`Niveau: Facile`}
                      sx={{
                        mr: 1,
                        bgcolor: "primary.light",
                        color: "primary.main",
                      }}
                    />
                    <Chip
                      label={`${quiz.questions.length} questions`}
                      sx={{ bgcolor: "primary.light", color: "primary.main" }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<PlayCircleOutline />}
                    onClick={handleStartQuiz}
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.main",
                      "&:hover": { bgcolor: "primary.main", color: "white" },
                    }}
                  >
                    Commencer le quiz
                  </Button>
                </Box>
              ) : showResults ? (
                <Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      mb: 3,
                      position: "relative",
                      "&:after": {
                        content: '""',
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        width: "40px",
                        height: "4px",
                        backgroundColor: "primary.light",
                        borderRadius: "2px",
                      },
                    }}
                  >
                    Résultats du Quiz
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      mb: 4,
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                      {calculateScore()} / {quiz.questions.length}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(calculateScore() / quiz.questions.length) * 100}
                      sx={{ height: 10, borderRadius: 5, width: "100%", mt: 2 }}
                    />
                  </Box>
                  <List>
                    {quiz.questions.map((question, index) => {
                      const isCorrect =
                        parseInt(selectedAnswers[question.id] || "-1") ===
                        question.correctAnswer;
                      return (
                        <ListItem
                          key={question.id}
                          sx={{
                            mb: 2,
                            p: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                            bgcolor: isCorrect
                              ? "success.light"
                              : "error.light",
                          }}
                        >
                          <ListItemText
                            primary={
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                {isCorrect ? (
                                  <CheckCircle color="success" sx={{ mr: 2 }} />
                                ) : (
                                  <Cancel color="error" sx={{ mr: 2 }} />
                                )}
                                <Typography variant="subtitle1">
                                  {index + 1}. {question.question}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box sx={{ mt: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: "medium" }}
                                >
                                  Réponse correcte :{" "}
                                  {question.options[question.correctAnswer]}
                                </Typography>
                                {!isCorrect && (
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "error.main" }}
                                  >
                                    Votre réponse :{" "}
                                    {
                                      question.options[
                                        parseInt(selectedAnswers[question.id])
                                      ]
                                    }
                                  </Typography>
                                )}
                              </Box>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setStartedQuiz(false);
                      setShowResults(false);
                      setCurrentQuestion(0);
                      setSelectedAnswers({});
                    }}
                    sx={{
                      mt: 2,
                      borderColor: "primary.light",
                      color: "primary.main",
                    }}
                  >
                    Recommencer
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      Question {currentQuestion + 1}/{quiz.questions.length}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={
                          ((currentQuestion + 1) / quiz.questions.length) * 100
                        }
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                  </Box>
                  <Paper
                    sx={{
                      p: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      mb: 3,
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {quiz.questions[currentQuestion].question}
                    </Typography>
                    <FormControl
                      component="fieldset"
                      sx={{ width: "100%", mt: 2 }}
                    >
                      <RadioGroup
                        value={
                          selectedAnswers[quiz.questions[currentQuestion].id] ||
                          ""
                        }
                        onChange={(e) =>
                          handleAnswerSelect(
                            quiz.questions[currentQuestion].id,
                            e.target.value
                          )
                        }
                      >
                        {quiz.questions[currentQuestion].options.map(
                          (option, index) => (
                            <FormControlLabel
                              key={index}
                              value={index.toString()}
                              control={<Radio />}
                              label={option}
                              sx={{
                                py: 1,
                                px: 2,
                                my: 1,
                                border: "1px solid",
                                borderColor: "grey.300",
                                borderRadius: 1,
                                bgcolor:
                                  selectedAnswers[
                                    quiz.questions[currentQuestion].id
                                  ] === index.toString()
                                    ? "primary.light"
                                    : "transparent",
                                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
                              }}
                            />
                          )
                        )}
                      </RadioGroup>
                    </FormControl>
                  </Paper>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<ArrowBack />}
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      sx={{
                        borderColor: "primary.light",
                        color: "primary.main",
                      }}
                    >
                      Précédent
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForward />}
                      onClick={handleNext}
                      disabled={
                        !selectedAnswers[quiz.questions[currentQuestion].id]
                      }
                      sx={{
                        bgcolor: "primary.light",
                        color: "primary.main",
                        "&:hover": { bgcolor: "primary.main", color: "white" },
                      }}
                    >
                      {currentQuestion < quiz.questions.length - 1
                        ? "Suivant"
                        : "Terminer"}
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeConfig>
  );
};

export default CourseDetail;

















// code avec jeux 
// import React, { useState } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   Breadcrumbs,
//   Link,
//   Tabs,
//   Tab,
//   Paper,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
//   IconButton,
//   Divider,
//   LinearProgress,
//   Chip,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   ArrowBack,
//   Description,
//   OndemandVideo,
//   Link as LinkIcon,
//   ExpandMore,
//   ExpandLess,
//   PlayCircleOutline,
//   CheckCircle,
//   Cancel,
//   Download as DownloadIcon,
//   Visibility as VisibilityIcon,
//   ArrowForward,
//   SportsEsports,
// } from "@mui/icons-material";
// import { subjects } from "../../data/mockData";
// import paths from "../../routes/paths";
// import DragAndDropGame from "./games/DragAndDropGame";
// import MatchingGame from "./games/MatchingGame";
// import MemoryGame from "./games/MemoryGame";
// import ThemeConfig from "../../theme/ThemeConfigCours";

// interface QuizQuestion {
//   id: string;
//   question: string;
//   options: string[];
//   correctAnswer: number;
// }

// interface Quiz {
//   id: string;
//   title: string;
//   questions: QuizQuestion[];
// }

// const CourseDetail: React.FC = () => {
//   const { subjectId, courseId } = useParams<{
//     subjectId: string;
//     courseId: string;
//   }>();
//   const { t } = useTranslation();
//   const history = useHistory();
//   const [activeTab, setActiveTab] = useState(0);
//   const [startedQuiz, setStartedQuiz] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<
//     Record<string, string>
//   >({});
//   const [showResults, setShowResults] = useState(false);
//   const [openResource, setOpenResource] = useState<string | null>(null);
//   const [selectedGame, setSelectedGame] = useState("dragAndDrop");

//   const subject = subjects.find((s) => s.id === subjectId);
//   const course = subject?.courses.find((c) => c.id === courseId);

//   // Mock quiz data
//   const quiz: Quiz = {
//     id: "quiz-1",
//     title: "Quiz sur le cours",
//     questions: [
//       {
//         id: "1",
//         question:
//           'Quelle est la forme correcte du passé composé du verbe "aller" à la première personne du singulier ?',
//         options: ["J'ai allé", "Je suis allé", "J'allais", "J'ai été allé"],
//         correctAnswer: 1,
//       },
//       {
//         id: "2",
//         question:
//           'Avec quel auxiliaire conjugue-t-on le verbe "partir" au passé composé ?',
//         options: ["Avoir", "Être", "Aller", "Faire"],
//         correctAnswer: 0,
//       },
//       {
//         id: "3",
//         question: 'Comment forme-t-on le participe passé du verbe "finir" ?',
//         options: ["fini", "finé", "finis", "finu"],
//         correctAnswer: 0,
//       },
//     ],
//   };

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue);
//   };

//   const handleStartQuiz = () => {
//     setStartedQuiz(true);
//   };

//   const handleAnswerSelect = (questionId: string, answer: string) => {
//     setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
//   };

//   const handleNext = () => {
//     if (currentQuestion < quiz.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   const calculateScore = () => {
//     let score = 0;
//     quiz.questions.forEach((question) => {
//       if (
//         parseInt(selectedAnswers[question.id] || "-1") ===
//         question.correctAnswer
//       ) {
//         score++;
//       }
//     });
//     return score;
//   };

//   const toggleResource = (id: string) => {
//     setOpenResource(openResource === id ? null : id);
//   };

//   const handleDownload = (resource: { url: string; title: string }) => {
//     const link: HTMLAnchorElement = document.createElement("a");
//     link.href = resource.url;
//     link.download = resource.title;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleView = (resource: { url: string }) => {
//     window.open(resource.url, "_blank");
//   };

//   const handleGameChange = (event: any) => {
//     setSelectedGame(event.target.value);
//   };

//   if (!subject || !course) {
//     return (
//       <ThemeConfig>
//         <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
//           <Typography variant="h6" color="error" gutterBottom>
//             Cours non trouvé
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => history.push(`/subjects/${subjectId}`)}
//           >
//             Retour à la matière
//           </Button>
//         </Container>
//       </ThemeConfig>
//     );
//   }

//   const getResourceIcon = (url: string) => {
//     if (url.includes(".pdf")) return <Description />;
//     if (url.includes("video")) return <OndemandVideo />;
//     return <LinkIcon />;
//   };

//   return (
//     <ThemeConfig>
//       <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
//         <Container maxWidth="lg">
//           {/* Navigation */}
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//             <Button
//               startIcon={<ArrowBack />}
//               onClick={() => history.push(`/subjects/${subject.id}`)}
//               sx={{ mr: 2, color: "primary.light" }}
//             >
//               Retour
//             </Button>
//             <Breadcrumbs aria-label="breadcrumb">
//               <Link
//                 color="inherit"
//                 onClick={() => history.push(paths.home)}
//                 sx={{ cursor: "pointer" }}
//               >
//                 {t("Accueil")}
//               </Link>
//               <Link
//                 color="inherit"
//                 onClick={() => history.push(`/subjects/${subject.id}`)}
//                 sx={{ cursor: "pointer" }}
//               >
//                 {subject.name}
//               </Link>
//               <Typography color="text.primary">{course.title}</Typography>
//             </Breadcrumbs>
//           </Box>

//           {/* Header */}
//           <Paper
//             sx={{
//               p: 3,
//               mb: 4,
//             }}
//           >
//             <Typography
//               variant="h4"
//               gutterBottom
//               sx={{ fontWeight: "bold", color: "primary.main" }}
//             >
//               {course.title}
//             </Typography>
//             <Typography variant="subtitle1" paragraph>
//               {course.description}
//             </Typography>
//             <Chip
//               label="Niveau: Non spécifié"
//               sx={{
//                 bgcolor: "primary.light",
//                 color: "primary.main",
//                 fontWeight: "medium",
//               }}
//             />
//           </Paper>

//           {/* Tabs */}
//           <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               sx={{
//                 "& .MuiTabs-indicator": {
//                   height: 3,
//                   borderRadius: "3px 3px 0 0",
//                   bgcolor: "primary.light",
//                 },
//                 "& .MuiTab-root": {
//                   fontWeight: "medium",
//                   "&.Mui-selected": {
//                     color: "primary.main",
//                     fontWeight: "bold",
//                   },
//                 },
//               }}
//             >
//               <Tab label="Ressources" />
//               <Tab label="Quiz" disabled={!course.hasQuiz} />
//               <Tab label="Jeux éducatifs" />
//             </Tabs>
//           </Box>

//           {/* Content */}
//           {activeTab === 0 && (
//             <Paper sx={{ p: 3 }}>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 3,
//                   position: "relative",
//                   "&:after": {
//                     content: '""',
//                     position: "absolute",
//                     bottom: -8,
//                     left: 0,
//                     width: "40px",
//                     height: "4px",
//                     backgroundColor: "primary.light",
//                     borderRadius: "2px",
//                   },
//                 }}
//               >
//                 Ressources
//               </Typography>
//               {course.resources.length === 0 ? (
//                 <Box
//                   sx={{
//                     p: 3,
//                     textAlign: "center",
//                     border: "1px dashed",
//                     borderColor: "divider",
//                   }}
//                 >
//                   <Typography variant="h6" color="text.secondary">
//                     Aucune ressource disponible
//                   </Typography>
//                 </Box>
//               ) : (
//                 <List>
//                   {course.resources.map((resource, index) => (
//                     <Box key={resource.id}>
//                       {index > 0 && <Divider sx={{ my: 1 }} />}
//                       <ListItem
//                         sx={{
//                           px: 2,
//                           py: 1.5,
//                           cursor: "pointer",
//                           "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//                         }}
//                         onClick={() => toggleResource(resource.id)}
//                       >
//                         <ListItemIcon>
//                           {getResourceIcon(resource.url)}
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={
//                             <Typography variant="subtitle1">
//                               {resource.title}
//                             </Typography>
//                           }
//                           secondary={
//                             <Typography variant="body2" color="text.secondary">
//                               Document
//                             </Typography>
//                           }
//                         />
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                           <Button
//                             variant="contained"
//                             size="small"
//                             startIcon={<DownloadIcon />}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDownload(resource);
//                             }}
//                             sx={{
//                               bgcolor: "primary.light",
//                               color: "primary.main",
//                               "&:hover": {
//                                 bgcolor: "primary.main",
//                                 color: "white",
//                               },
//                             }}
//                           >
//                             Télécharger
//                           </Button>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             startIcon={<VisibilityIcon />}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleView(resource);
//                             }}
//                             sx={{
//                               borderColor: "primary.light",
//                               color: "primary.main",
//                             }}
//                           >
//                             Voir
//                           </Button>
//                         </Box>
//                         <IconButton onClick={() => toggleResource(resource.id)}>
//                           {openResource === resource.id ? (
//                             <ExpandLess />
//                           ) : (
//                             <ExpandMore />
//                           )}
//                         </IconButton>
//                       </ListItem>
//                       <Collapse
//                         in={openResource === resource.id}
//                         timeout="auto"
//                         unmountOnExit
//                       >
//                         <Box
//                           sx={{
//                             p: 3,
//                             bgcolor: "rgba(0, 0, 0, 0.02)",
//                             borderRadius: 1,
//                             mx: 2,
//                             mb: 2,
//                           }}
//                         >
//                           <Typography variant="body1">
//                             Contenu de la ressource : {resource.title}
//                           </Typography>
//                         </Box>
//                       </Collapse>
//                     </Box>
//                   ))}
//                 </List>
//               )}
//             </Paper>
//           )}

//           {activeTab === 1 && course.hasQuiz && (
//             <Paper sx={{ p: 3 }}>
//               {!startedQuiz ? (
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     gutterBottom
//                     sx={{
//                       fontWeight: "bold",
//                       mb: 3,
//                       position: "relative",
//                       "&:after": {
//                         content: '""',
//                         position: "absolute",
//                         bottom: -8,
//                         left: 0,
//                         width: "40px",
//                         height: "4px",
//                         backgroundColor: "primary.light",
//                         borderRadius: "2px",
//                       },
//                     }}
//                   >
//                     {quiz.title}
//                   </Typography>
//                   <Typography variant="body1" paragraph>
//                     Testez vos connaissances sur ce cours.
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//                     <Chip
//                       label={`Niveau: Facile`}
//                       sx={{
//                         mr: 1,
//                         bgcolor: "primary.light",
//                         color: "primary.main",
//                       }}
//                     />
//                     <Chip
//                       label={`${quiz.questions.length} questions`}
//                       sx={{ bgcolor: "primary.light", color: "primary.main" }}
//                     />
//                   </Box>
//                   <Button
//                     variant="contained"
//                     startIcon={<PlayCircleOutline />}
//                     onClick={handleStartQuiz}
//                     sx={{
//                       bgcolor: "primary.light",
//                       color: "primary.main",
//                       "&:hover": { bgcolor: "primary.main", color: "white" },
//                     }}
//                   >
//                     Commencer le quiz
//                   </Button>
//                 </Box>
//               ) : showResults ? (
//                 <Box>
//                   <Typography
//                     variant="h5"
//                     gutterBottom
//                     sx={{
//                       fontWeight: "bold",
//                       mb: 3,
//                       position: "relative",
//                       "&:after": {
//                         content: '""',
//                         position: "absolute",
//                         bottom: -8,
//                         left: 0,
//                         width: "40px",
//                         height: "4px",
//                         backgroundColor: "primary.light",
//                         borderRadius: "2px",
//                       },
//                     }}
//                   >
//                     Résultats du Quiz
//                   </Typography>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       mb: 4,
//                     }}
//                   >
//                     <Typography
//                       variant="h3"
//                       sx={{ fontWeight: "bold", color: "primary.main" }}
//                     >
//                       {calculateScore()} / {quiz.questions.length}
//                     </Typography>
//                     <LinearProgress
//                       variant="determinate"
//                       value={(calculateScore() / quiz.questions.length) * 100}
//                       sx={{ height: 10, borderRadius: 5, width: "100%", mt: 2 }}
//                     />
//                   </Box>
//                   <List>
//                     {quiz.questions.map((question, index) => {
//                       const isCorrect =
//                         parseInt(selectedAnswers[question.id] || "-1") ===
//                         question.correctAnswer;
//                       return (
//                         <ListItem
//                           key={question.id}
//                           sx={{
//                             mb: 2,
//                             p: 2,
//                             border: "1px solid",
//                             borderColor: "divider",
//                             borderRadius: 1,
//                             bgcolor: isCorrect
//                               ? "success.light"
//                               : "error.light",
//                           }}
//                         >
//                           <ListItemText
//                             primary={
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 {isCorrect ? (
//                                   <CheckCircle color="success" sx={{ mr: 2 }} />
//                                 ) : (
//                                   <Cancel color="error" sx={{ mr: 2 }} />
//                                 )}
//                                 <Typography variant="subtitle1">
//                                   {index + 1}. {question.question}
//                                 </Typography>
//                               </Box>
//                             }
//                             secondary={
//                               <Box sx={{ mt: 1 }}>
//                                 <Typography
//                                   variant="body2"
//                                   sx={{ fontWeight: "medium" }}
//                                 >
//                                   Réponse correcte :{" "}
//                                   {question.options[question.correctAnswer]}
//                                 </Typography>
//                                 {!isCorrect && (
//                                   <Typography
//                                     variant="body2"
//                                     sx={{ color: "error.main" }}
//                                   >
//                                     Votre réponse :{" "}
//                                     {
//                                       question.options[
//                                         parseInt(selectedAnswers[question.id])
//                                       ]
//                                     }
//                                   </Typography>
//                                 )}
//                               </Box>
//                             }
//                           />
//                         </ListItem>
//                       );
//                     })}
//                   </List>
//                   <Button
//                     variant="outlined"
//                     onClick={() => {
//                       setStartedQuiz(false);
//                       setShowResults(false);
//                       setCurrentQuestion(0);
//                       setSelectedAnswers({});
//                     }}
//                     sx={{
//                       mt: 2,
//                       borderColor: "primary.light",
//                       color: "primary.main",
//                     }}
//                   >
//                     Recommencer
//                   </Button>
//                 </Box>
//               ) : (
//                 <Box>
//                   <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//                     <Typography variant="body2" sx={{ mr: 2 }}>
//                       Question {currentQuestion + 1}/{quiz.questions.length}
//                     </Typography>
//                     <Box sx={{ flexGrow: 1 }}>
//                       <LinearProgress
//                         variant="determinate"
//                         value={
//                           ((currentQuestion + 1) / quiz.questions.length) * 100
//                         }
//                         sx={{ height: 10, borderRadius: 5 }}
//                       />
//                     </Box>
//                   </Box>
//                   <Paper
//                     sx={{
//                       p: 3,
//                       border: "1px solid",
//                       borderColor: "divider",
//                       mb: 3,
//                     }}
//                   >
//                     <Typography variant="h6" gutterBottom>
//                       {quiz.questions[currentQuestion].question}
//                     </Typography>
//                     <FormControl
//                       component="fieldset"
//                       sx={{ width: "100%", mt: 2 }}
//                     >
//                       <RadioGroup
//                         value={
//                           selectedAnswers[quiz.questions[currentQuestion].id] ||
//                           ""
//                         }
//                         onChange={(e) =>
//                           handleAnswerSelect(
//                             quiz.questions[currentQuestion].id,
//                             e.target.value
//                           )
//                         }
//                       >
//                         {quiz.questions[currentQuestion].options.map(
//                           (option, index) => (
//                             <FormControlLabel
//                               key={index}
//                               value={index.toString()}
//                               control={<Radio />}
//                               label={option}
//                               sx={{
//                                 py: 1,
//                                 px: 2,
//                                 my: 1,
//                                 border: "1px solid",
//                                 borderColor: "grey.300",
//                                 borderRadius: 1,
//                                 bgcolor:
//                                   selectedAnswers[
//                                     quiz.questions[currentQuestion].id
//                                   ] === index.toString()
//                                     ? "primary.light"
//                                     : "transparent",
//                                 "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" },
//                               }}
//                             />
//                           )
//                         )}
//                       </RadioGroup>
//                     </FormControl>
//                   </Paper>
//                   <Box
//                     sx={{ display: "flex", justifyContent: "space-between" }}
//                   >
//                     <Button
//                       variant="outlined"
//                       startIcon={<ArrowBack />}
//                       onClick={handlePrevious}
//                       disabled={currentQuestion === 0}
//                       sx={{
//                         borderColor: "primary.light",
//                         color: "primary.main",
//                       }}
//                     >
//                       Précédent
//                     </Button>
//                     <Button
//                       variant="contained"
//                       endIcon={<ArrowForward />}
//                       onClick={handleNext}
//                       disabled={
//                         !selectedAnswers[quiz.questions[currentQuestion].id]
//                       }
//                       sx={{
//                         bgcolor: "primary.light",
//                         color: "primary.main",
//                         "&:hover": { bgcolor: "primary.main", color: "white" },
//                       }}
//                     >
//                       {currentQuestion < quiz.questions.length - 1
//                         ? "Suivant"
//                         : "Terminer"}
//                     </Button>
//                   </Box>
//                 </Box>
//               )}
//             </Paper>
//           )}

//           {activeTab === 2 && (
//             <Paper sx={{ p: 3 }}>
//               <Typography
//                 variant="h5"
//                 gutterBottom
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 3,
//                   position: "relative",
//                   "&:after": {
//                     content: '""',
//                     position: "absolute",
//                     bottom: -8,
//                     left: 0,
//                     width: "40px",
//                     height: "4px",
//                     backgroundColor: "primary.light",
//                     borderRadius: "2px",
//                   },
//                 }}
//               >
//                 Jeux Éducatifs
//               </Typography>
//               <Box sx={{ mb: 3 }}>
//                 <FormControl sx={{ minWidth: 200 }}>
//                   <Select
//                     value={selectedGame}
//                     onChange={handleGameChange}
//                     displayEmpty
//                     sx={{ bgcolor: "primary.light", color: "primary.main" }}
//                   >
//                     <MenuItem value="dragAndDrop">
//                       {t("game.dragAndDrop")}
//                     </MenuItem>
//                     <MenuItem value="matching">{t("game.matching")}</MenuItem>
//                     <MenuItem value="memory">{t("game.memory")}</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               {selectedGame === "dragAndDrop" && <DragAndDropGame />}
//               {selectedGame === "matching" && <MatchingGame />}
//               {selectedGame === "memory" && <MemoryGame />}
//             </Paper>
//           )}
//         </Container>
//       </Box>
//     </ThemeConfig>
//   );
// };

// export default CourseDetail;

// code s7i7 mais thème 9dim 
// import React, { useState } from "react";
// import { useParams, Link as RouterLink } from "react-router-dom";
// import { subjects } from "../../data/mockData";
// import { useTranslation } from "react-i18next";
// import QuizModal from "./QuizModal";

// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Button,
//   Alert,
//   IconButton,
// } from "@mui/material";

// import DownloadIcon from "@mui/icons-material/Download";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import WarningIcon from "@mui/icons-material/Warning";
// import QuizIcon from "@mui/icons-material/Quiz";

// const CourseDetail: React.FC = () => {
//   const { subjectId, courseId } = useParams<{
//     subjectId: string;
//     courseId: string;
//   }>();
//   const { t } = useTranslation();
//   const [quizOpen, setQuizOpen] = useState(false);

//   const subject = subjects.find((s) => s.id === subjectId);
//   const course = subject?.courses.find((c) => c.id === courseId);

//   const handleDownload = (resource: { url: string; title: string }) => {
//     const link = document.createElement("a");
//     link.href = resource.url;
//     link.download = resource.title;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleView = (resource: { url: string }) => {
//     window.open(resource.url, "_blank");
//   };

//   // 🛑 Cas où le cours n'existe pas
//   if (!subject || !course) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
//         <WarningIcon color="warning" sx={{ fontSize: 48, mb: 2 }} />
//         <Typography variant="h6" gutterBottom>
//           Cours non trouvé
//         </Typography>
//         <RouterLink
//           to={`/subjects/${subjectId}`}
//           style={{ textDecoration: "none" }}
//         >
//           <Button variant="contained" color="primary">
//             Retour à la matière
//           </Button>
//         </RouterLink>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
//       {/* Lien retour */}
//       <Box sx={{ mb: 2 }}>
//         <RouterLink
//           to={`/subjects/${subject.id}`}
//           style={{ textDecoration: "none", color: "#1976d2" }}
//         >
//           <Typography
//             variant="body1"
//             sx={{ display: "flex", alignItems: "center", fontWeight: 500 }}
//           >
//             <span style={{ marginRight: 8 }}>{subject.icon}</span>
//             {subject.name}
//           </Typography>
//         </RouterLink>
//       </Box>

//       {/* Bloc cours */}
//       <Card elevation={4} sx={{ borderRadius: 3 }}>
//         <CardContent>
//           <Typography
//             variant="h3"
//             color="primary"
//             fontWeight="bold"
//             gutterBottom
//             align="center"
//           >
//             {course.title}
//           </Typography>

//           <Typography
//             variant="body1"
//             color="text.secondary"
//             align="center"
//             sx={{ mb: 4, fontSize: 16 }}
//           >
//             {course.description}
//           </Typography>

//           {/* Ressources */}
//           <Box sx={{ mb: 5 }}>
//             <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
//               📁 Ressources pédagogiques
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               {course.resources.map((resource) => (
//                 <Card
//                   key={resource.id}
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     p: 2,
//                     borderRadius: 2,
//                     bgcolor: "grey.100",
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Typography variant="body2" fontWeight="bold">
//                       {resource.icon}
//                     </Typography>
//                     <Typography variant="body1">{resource.title}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       startIcon={<DownloadIcon />}
//                       onClick={() => handleDownload(resource)}
//                     >
//                       Télécharger
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       startIcon={<VisibilityIcon />}
//                       sx={{ color: "black", borderColor: "grey.500" }}
//                       onClick={() => handleView(resource)}
//                     >
//                       Voir
//                     </Button>
//                   </Box>
//                 </Card>
//               ))}
//             </Box>
//           </Box>

//           {/* Quiz */}
//           {course.hasQuiz && (
//             <Alert
//               severity="warning"
//               iconMapping={{ warning: <QuizIcon /> }}
//               sx={{
//                 borderRadius: 2,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 2,
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Typography variant="body2" fontWeight="bold">
//                   Ce cours contient un quiz. Es-tu prêt(e) à tester tes
//                   connaissances ?
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   size="small"
//                   onClick={() => setQuizOpen(true)}
//                 >
//                   Commencer le quiz
//                 </Button>
//               </Box>
//             </Alert>
//           )}
//         </CardContent>
//       </Card>

//       {/* Modal du quiz */}
//       {quizOpen && (
//         <QuizModal
//           onClose={() => setQuizOpen(false)}
//           courseTitle={course.title}
//         />
//       )}
//     </Container>
//   );
// };

// export default CourseDetail;
