import { Subject, Devoir, Conversation, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Ahmed Ahmed',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  grade: '4ème année'
};

export const subjects: Subject[] = [
  {
    id: '1',
    name: 'Français',
    description: 'La matière de Français en 4ème année permet aux élèves de développer leurs compétences en lecture, écriture, expression orale et compréhension grammaticale. Les cours sont adaptés au programme officiel et enrichis de ressources interactives et d\'exercices variés.',
    icon: '📘',
    courses: [
      {
        id: '101',
        title: 'Le passé composé',
        description: 'Apprenez à utiliser le passé composé en français',
        hasQuiz: true,
        resources: [
          {
            id: '1001',
            title: 'Fiche PDF',
            type: 'pdf',
            url: '/resources/passe-compose.pdf',
            icon: '📄'
          },
          {
            id: '1002',
            title: 'Vidéo explicative',
            type: 'video',
            url: '/resources/passe-compose-video.mp4',
            icon: '🎬'
          },
          {
            id: '1003',
            title: 'Exercices d\'application',
            type: 'document',
            url: '/resources/passe-compose-exercises.pdf',
            icon: '📝'
          }
        ]
      },
      {
        id: '102',
        title: 'La description d\'un lieu',
        description: 'Techniques pour décrire un lieu avec précision',
        hasQuiz: true,
        resources: [
          {
            id: '1004',
            title: 'Fiche de vocabulaire',
            type: 'pdf',
            url: '/resources/description-lieu-vocab.pdf',
            icon: '📄'
          },
          {
            id: '1005',
            title: 'Exemples d\'expressions',
            type: 'document',
            url: '/resources/description-lieu-examples.pdf',
            icon: '📋'
          }
        ]
      },
      {
        id: '103',
        title: 'Les types de phrases',
        description: 'Les différents types de phrases en français',
        hasQuiz: true,
        resources: [
          {
            id: '1006',
            title: 'Fiche de révision',
            type: 'pdf',
            url: '/resources/types-phrases-revision.pdf',
            icon: '📄'
          },
          {
            id: '1007',
            title: 'Tableau des types de phrases',
            type: 'document',
            url: '/resources/types-phrases-table.pdf',
            icon: '📊'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Anglais',
    description: 'Le cours d\'anglais en 4ème année vise à développer les compétences de communication écrite et orale. Les élèves apprennent du vocabulaire courant, des structures grammaticales de base et s\'initient à la culture anglophone.',
    icon: '🇬🇧',
    courses: [
      {
        id: '201',
        title: 'Present Continuous',
        description: 'Learn how to use the present continuous tense',
        hasQuiz: true,
        resources: [
          {
            id: '2001',
            title: 'Grammar Sheet',
            type: 'pdf',
            url: '/resources/present-continuous.pdf',
            icon: '📄'
          },
          {
            id: '2002',
            title: 'Practice Exercises',
            type: 'document',
            url: '/resources/present-continuous-exercises.pdf',
            icon: '📝'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'عربية',
    description: 'تهدف مادة اللغة العربية في السنة الرابعة إلى تعزيز مهارات القراءة والكتابة وفهم النصوص. يتعلم الطلاب قواعد النحو والصرف الأساسية ويتعرفون على الأدب العربي.',
    icon: '📗',
    courses: [
      {
        id: '301',
        title: 'الفعل والفاعل',
        description: 'دراسة الفعل والفاعل في اللغة العربية',
        hasQuiz: false,
        resources: [
          {
            id: '3001',
            title: 'ملخص القواعد',
            type: 'pdf',
            url: '/resources/arabic-grammar.pdf',
            icon: '📄'
          }
        ]
      }
    ]
  }
];

export const devoirs: Devoir[] = [
  {
    id: '1',
    title: 'Évaluation sur le passé composé',
    subjectId: '1',
    subjectName: 'Français',
    dueDate: '2025-06-15T23:59:59',
    status: 'pending',
    timeLimit: 30,
    questions: [
      {
        id: '1',
        text: 'Conjuguez le verbe "aller" au passé composé avec le pronom "je".',
        type: 'text'
      },
      {
        id: '2',
        text: 'Quel auxiliaire utilise-t-on avec le verbe "courir" au passé composé?',
        type: 'multiple-choice',
        options: ['Être', 'Avoir', 'Aller', 'Faire']
      }
    ]
  },
  {
    id: '2',
    title: 'English Vocabulary Test',
    subjectId: '2',
    subjectName: 'Anglais',
    dueDate: '2025-06-20T23:59:59',
    status: 'completed',
    timeLimit: 20,
    questions: [
      {
        id: '1',
        text: 'Translate "book" to French.',
        type: 'text'
      }
    ]
  }
];

export const conversations: Conversation[] = [
  {
    id: '1',
    teacherName: 'Mme Dupont',
    teacherAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: {
      id: '1001',
      sender: 'teacher',
      content: 'N\'oubliez pas de rendre votre devoir de français pour lundi prochain.',
      timestamp: '2025-06-10T14:30:00',
      type: 'text'
    },
    unread: 1
  },
  {
    id: '2',
    teacherName: 'M. Martin',
    teacherAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    lastMessage: {
      id: '2001',
      sender: 'student',
      content: 'Merci pour vos explications sur les exercices d\'anglais.',
      timestamp: '2025-06-09T16:45:00',
      type: 'text'
    },
    unread: 0
  }
];