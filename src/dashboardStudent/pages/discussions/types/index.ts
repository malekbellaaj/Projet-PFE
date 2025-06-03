export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'voice';
  fileUrl?: string;
  fileType?: string;
  fileName?: string; // Ajouté pour stocker le nom du fichier
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  notifications: number;
}







// export interface Message {
//   id: string;
//   senderId: string;
//   senderName: string;
//   senderAvatar: string;
//   content: string;
//   timestamp: string;
//   type: 'text' | 'file' | 'voice';
//   fileUrl?: string;
//   fileType?: string;
// }

// export interface Conversation {
//   id: string;
//   participantId: string;
//   participantName: string;
//   participantAvatar: string;
//   lastMessage: string;
//   timestamp: string;
//   unread: number;
//   messages: Message[];
// }

// export interface User {
//   id: string;
//   name: string;
//   avatar: string;
//   grade: string;
//   notifications: number;
// }