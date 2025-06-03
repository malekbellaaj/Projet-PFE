export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Course {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  level: string;
  thumbnail?: string;
}

export interface Resource {
  id: string;
  courseId: string;
  title: string;
  type: 'document' | 'video' | 'audio' | 'link';
  content: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  timeLimit?: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  level: 'facile' | 'moyen' | 'difficile';
}

export interface Game {
  id: string;
  courseId: string;
  title: string;
  type: 'puzzle' | 'matching' | 'memory' | 'quiz' | 'drag-and-drop';
  description: string;
  content: any;
  instructions: string;
  level: 'facile' | 'moyen' | 'difficile';
}

export interface UserProgress {
  userId: string;
  courseId: string;
  resourcesCompleted: string[];
  quizzesCompleted: {
    quizId: string;
    score: number;
    completed: boolean;
  }[];
  gamesCompleted: {
    gameId: string;
    score: number;
    completed: boolean;
  }[];
}