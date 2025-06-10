import { Conversation, User } from './types';

export const currentUser: User = {
  id: 'teacher1',
  name: 'Prof. Ahmed',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  grade: 'Enseignant',
  notifications: 2
};

export const conversations: Conversation[] = [
  {
    id: '1',
    participantId: 'student1',
    participantName: 'Youssef Youssef',
    participantAvatar: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    lastMessage: 'Bonjour Prof, j\'ai un problème avec mon devoir.',
    timestamp: '2023-10-10T15:30:00',
    unread: 1,
    messages: [
      {
        id: '1-1',
        senderId: 'student1',
        senderName: 'Youssef Youssef',
        senderAvatar: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: 'Bonjour Prof, pouvez-vous m\'aider avec le devoir ?',
        timestamp: '2023-10-10T15:25:00',
        type: 'text'
      },
      {
        id: '1-2',
        senderId: 'student1',
        senderName: 'Youssef Youssef',
        senderAvatar: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: 'J\'ai envoyé le fichier ci-joint.',
        timestamp: '2023-10-10T15:30:00',
        type: 'file',
        fileUrl: '/resources/homework.pdf',
        fileType: 'pdf'
      },
      {
        id: '1-3',
        senderId: 'teacher1',
        senderName: 'Vous',
        senderAvatar: currentUser.avatar,
        content: 'Je regarde ça tout de suite, merci de l’avoir envoyé !',
        timestamp: '2023-10-10T15:32:00',
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    participantId: 'student2',
    participantName: 'Sara Karim',
    participantAvatar: 'https://images.pexels.com/photos/1185268/pexels-photo-1185268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    lastMessage: 'Merci pour votre réponse rapide !',
    timestamp: '2023-10-09T10:15:00',
    unread: 0,
    messages: [
      {
        id: '2-1',
        senderId: 'student2',
        senderName: 'Sara Karim',
        senderAvatar: 'https://images.pexels.com/photos/1185268/pexels-photo-1185268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: 'Prof, pouvez-vous m\'expliquer cette question encore une fois ?',
        timestamp: '2023-10-09T10:10:00',
        type: 'text'
      },
      {
        id: '2-2',
        senderId: 'teacher1',
        senderName: 'Vous',
        senderAvatar: currentUser.avatar,
        content: 'Bien sûr Sara, voici une explication détaillée.',
        timestamp: '2023-10-09T10:12:00',
        type: 'text'
      },
      {
        id: '2-3',
        senderId: 'student2',
        senderName: 'Sara Karim',
        senderAvatar: 'https://images.pexels.com/photos/1185268/pexels-photo-1185268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        content: 'Merci pour votre réponse rapide !',
        timestamp: '2023-10-09T10:15:00',
        type: 'text'
      }
    ]
  }
];













// import { Conversation, User } from './types';

// export const currentUser: User = {
//   id: '1',
//   name: 'Ahmed Ahmed',
//   avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//   grade: '4ème année',
//   notifications: 1
// };

// export const conversations: Conversation[] = [
//   {
//     id: '1',
//     participantId: 'teacher1',
//     participantName: 'Prof. Mohammed',
//     participantAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     lastMessage: 'N\'oubliez pas de rendre votre devoir de mathématiques demain.',
//     timestamp: '2023-10-10T15:30:00',
//     unread: 1,
//     messages: [
//       {
//         id: '1-1',
//         senderId: 'teacher1',
//         senderName: 'Prof. Mohammed',
//         senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         content: 'Bonjour Ahmed, j\'espère que vous allez bien.',
//         timestamp: '2023-10-10T15:25:00',
//         type: 'text'
//       },
//       {
//         id: '1-2',
//         senderId: 'teacher1',
//         senderName: 'Prof. Mohammed',
//         senderAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         content: 'N\'oubliez pas de rendre votre devoir de mathématiques demain.',
//         timestamp: '2023-10-10T15:30:00',
//         type: 'text'
//       }
//     ]
//   },
//   {
//     id: '2',
//     participantId: 'teacher2',
//     participantName: 'Prof. Fatima',
//     participantAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     lastMessage: 'Voici le document pour le cours de français.',
//     timestamp: '2023-10-09T10:15:00',
//     unread: 0,
//     messages: [
//       {
//         id: '2-1',
//         senderId: 'teacher2',
//         senderName: 'Prof. Fatima',
//         senderAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         content: 'Bonjour tout le monde, j\'ai une annonce pour le cours de français.',
//         timestamp: '2023-10-09T10:10:00',
//         type: 'text'
//       },
//       {
//         id: '2-2',
//         senderId: 'teacher2',
//         senderName: 'Prof. Fatima',
//         senderAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         content: 'Voici le document pour le cours de français.',
//         timestamp: '2023-10-09T10:15:00',
//         type: 'file',
//         fileUrl: '/resources/french/document.pdf',
//         fileType: 'pdf'
//       }
//     ]
//   }
// ];