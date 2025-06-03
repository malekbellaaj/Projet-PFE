export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string; //////////////////////  tzedet jdida 
  courses: Course[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  hasQuiz: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'document' | 'image' | 'audio' | 'other';
  url: string;
  icon: string;
}

export interface Devoir {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  dueDate: string;
  status: 'pending' | 'completed';
  timeLimit: number; // in minutes
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'true-false';
  options?: string[];
  answer?: string;
}

export interface Conversation {
  id: string;
  teacherName: string;
  teacherAvatar: string;
  lastMessage: Message;
  unread: number;
}

export interface Message {
  id: string;
  sender: 'student' | 'teacher';
  content: string;
  timestamp: string;
  type: 'text' | 'voice' | 'file';
  fileUrl?: string;
  fileName?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  grade: string;
}