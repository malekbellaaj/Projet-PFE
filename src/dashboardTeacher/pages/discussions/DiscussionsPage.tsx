import React, { useState } from 'react';
import { Box, Typography, Avatar, Divider } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import ConversationItem from './ConversationItem';
import MessageItem from './MessageItem';
import ChatInput from './ChatInput';
import { conversations, currentUser } from './mockData';
import { Conversation } from './types';

const DiscussionsPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleSendMessage = (content: string, type: 'text' | 'file' | 'voice', file?: File) => {
    if (!selectedConversation) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      senderId: currentUser.id,
      senderName: 'Vous',
      senderAvatar: currentUser.avatar,
      content,
      timestamp: new Date().toISOString(),
      type,
      fileUrl: file ? URL.createObjectURL(file) : undefined,
      fileName: file?.name,
      fileType: file?.type,
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, userMessage],
      lastMessage: type === 'text' ? content : file?.name || 'Fichier envoyé',
      timestamp: new Date().toISOString(),
      unread: 0,
    };

    setSelectedConversation(updatedConversation);
  };

  return (
    <Box sx={{ width: '100%', height: 'calc(100vh - 120px)', display: 'flex', px: { xs: 2, sm: 4 }, py: 4 }}>
      {/* Sidebar */}
      <Box sx={{ width: { xs: 240, sm: 288 }, borderRight: '1px solid #e0e0e0', bgcolor: '#f9f9f9' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h6">Messages</Typography>
        </Box>
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">Élèves</Typography>
        </Box>
        <Divider />
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.id}
              conversation={conv}
              isActive={selectedConversation?.id === conv.id}
              onClick={() => setSelectedConversation(conv)}
            />
          ))}
        </Box>
      </Box>

      {/* Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
        {selectedConversation ? (
          <>
            <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'center' }}>
              <Avatar src={selectedConversation.participantAvatar} />
              <Box sx={{ ml: 2 }}>
                <Typography>{selectedConversation.participantName}</Typography>
                <Typography variant="caption" color="text.secondary">Étudiant</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              {selectedConversation.messages.map((msg) => (
                <MessageItem key={msg.id} message={msg} />
              ))}
            </Box>
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            Sélectionnez un élève pour commencer la conversation
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DiscussionsPage;





















// import React, { useState } from 'react';
// import { Box, Typography, Avatar, Tabs, Tab, Divider } from '@mui/material';
// import SmartToyIcon from '@mui/icons-material/SmartToy';
// import PeopleIcon from '@mui/icons-material/People';
// import ForumIcon from '@mui/icons-material/Forum';
// import ConversationItem from './ConversationItem';
// import MessageItem from './MessageItem';
// import ChatInput from './ChatInput';
// import { conversations } from './mockData';
// import { Conversation, Message } from './types';

// const DiscussionsPage: React.FC = () => {
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [showChatBot, setShowChatBot] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const handleSendMessage = (content: string, type: 'text' | 'file' | 'voice', file?: File) => {
//     const userMessage: Message = {
//       id: `user-${Date.now()}`,
//       senderId: '1',
//       senderName: 'Vous',
//       senderAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//       content,
//       timestamp: new Date().toISOString(),
//       type,
//       fileUrl: file ? URL.createObjectURL(file) : undefined,
//       fileType: file ? file.type : undefined,
//       fileName: file ? file.name : undefined,
//     };

//     if (showChatBot) {
//       setMessages((prev) => [...prev, userMessage]);

//       setTimeout(() => {
//         const botMessage: Message = {
//           id: `bot-${Date.now()}`,
//           senderId: 'bot',
//           senderName: 'Assistant',
//           senderAvatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//           content:
//             type === 'text'
//               ? "Je suis l'assistant virtuel. Comment puis-je vous aider avec vos études aujourd'hui?"
//               : type === 'file'
//               ? 'Merci pour le fichier ! Je vais l’analyser et vous répondre bientôt.'
//               : 'Message vocal reçu ! Je vais l’écouter et répondre rapidement.',
//           timestamp: new Date().toISOString(),
//           type: 'text',
//         };

//         setMessages((prev) => [...prev, botMessage]);
//       }, 1000);
//     } else if (selectedConversation) {
//       console.log('Sending message:', { content, type, fileName: file?.name }, 'to conversation:', selectedConversation.id);
//       // Simuler l'ajout du message à la conversation
//       const updatedConversation = {
//         ...selectedConversation,
//         messages: [...selectedConversation.messages, userMessage],
//         lastMessage: type === 'text' ? content : type === 'file' ? file?.name || 'Fichier' : 'Message vocal',
//         timestamp: new Date().toISOString(),
//         unread: 0,
//       };
//       setSelectedConversation(updatedConversation);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', height: 'calc(100vh - 120px)', display: 'flex', px: { xs: 2, sm: 4 }, py: 4 }}>
//       {/* Conversations Sidebar */}
//       <Box
//         sx={{
//           width: { xs: 240, sm: 288 },
//           borderRight: '1px solid',
//           borderColor: 'grey.200',
//           bgcolor: 'grey.50',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <Box sx={{ p: { xs: 1.5, sm: 2 }, borderBottom: '1px solid', borderColor: 'grey.200' }}>
//           <Typography variant="h6" fontWeight="medium" color="text.primary">
//             Messages
//           </Typography>
//         </Box>

//         <Tabs
//           value={showChatBot ? 1 : 0}
//           onChange={(_, value) => {
//             setShowChatBot(value === 1);
//             if (value === 1) setSelectedConversation(null);
//           }}
//           sx={{ borderBottom: '1px solid', borderColor: 'grey.200' }}
//         >
//           <Tab
//             label={
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <PeopleIcon sx={{ fontSize: 16 }} />
//                 <Typography variant="body2">Enseignants</Typography>
//               </Box>
//             }
//             sx={{ flex: 1, textTransform: 'none', fontWeight: 'medium' }}
//           />
//           <Tab
//             label={
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <SmartToyIcon sx={{ fontSize: 16 }} />
//                 <Typography variant="body2">Assistant</Typography>
//               </Box>
//             }
//             sx={{ flex: 1, textTransform: 'none', fontWeight: 'medium' }}
//           />
//         </Tabs>

//         <Box sx={{ flex: 1, overflowY: 'auto' }}>
//           {!showChatBot &&
//             conversations.map((conversation) => (
//               <ConversationItem
//                 key={conversation.id}
//                 conversation={conversation}
//                 isActive={selectedConversation?.id === conversation.id}
//                 onClick={() => {
//                   setSelectedConversation(conversation);
//                   setShowChatBot(false);
//                 }}
//               />
//             ))}
//         </Box>
//       </Box>

//       {/* Message Area */}
//       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#e5eef9' }}>
//         {selectedConversation ? (
//           <>
//             <Box
//               sx={{
//                 p: { xs: 1.5, sm: 2 },
//                 bgcolor: 'background.paper',
//                 borderBottom: '1px solid',
//                 borderColor: 'grey.200',
//                 display: 'flex',
//                 alignItems: 'center',
//               }}
//             >
//               <Avatar
//                 src={selectedConversation.participantAvatar}
//                 alt={selectedConversation.participantName}
//                 sx={{ width: 40, height: 40, mr: 2 }}
//               />
//               <Box>
//                 <Typography variant="body1" fontWeight="medium" color="text.primary">
//                   {selectedConversation.participantName}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Enseignant
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, sm: 3 } }}>
//               {selectedConversation.messages.map((message) => (
//                 <MessageItem key={message.id} message={message} />
//               ))}
//             </Box>

//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : showChatBot ? (
//           <>
//             <Box
//               sx={{
//                 p: { xs: 1.5, sm: 2 },
//                 bgcolor: 'background.paper',
//                 borderBottom: '1px solid',
//                 borderColor: 'grey.200',
//                 display: 'flex',
//                 alignItems: 'center',
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: '50%',
//                   bgcolor: '#e5eef9',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <SmartToyIcon sx={{ fontSize: 24, color: '#e5eef9' }} />
//               </Box>
//               <Box>
//                 <Typography variant="body1" fontWeight="medium" color="text.primary">
//                   Assistant AI
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Toujours disponible pour vous aider
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, sm: 3 } }}>
//               {messages.length === 0 ? (
//                 <Box
//                   sx={{
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     textAlign: 'center',
//                     p: 4,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 64,
//                       height: 64,
//                       borderRadius: '50%',
//                       bgcolor: '#e5eef9',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mb: 2,
//                     }}
//                   >
//                     <SmartToyIcon sx={{ fontSize: 32, color: '#e5eef9' }} />
//                   </Box>
//                   <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
//                     Assistant AI
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
//                     Posez-moi n'importe quelle question sur vos cours, devoirs ou matières. Je suis là pour vous aider à tout moment.
//                   </Typography>
//                 </Box>
//               ) : (
//                 messages.map((message) => <MessageItem key={message.id} message={message} />)
//               )}
//             </Box>

//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : (
//           <Box
//             sx={{
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               textAlign: 'center',
//               p: 4,
//             }}
//           >
//             <Box>
//               <Box
//                 sx={{
//                   width: 64,
//                   height: 64,
//                   borderRadius: '50%',
//                   bgcolor: 'grey.100',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mb: 2,
//                 }}
//               >
//                 <ForumIcon sx={{ fontSize: 32, color: 'grey.400' }} />
//               </Box>
//               <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
//                 Vos messages
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Sélectionnez une conversation pour voir les messages
//               </Typography>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default DiscussionsPage;










// import React, { useState } from 'react';
// import { Box, Typography, Avatar, Tabs, Tab, Divider } from '@mui/material';
// import SmartToyIcon from '@mui/icons-material/SmartToy';
// import PeopleIcon from '@mui/icons-material/People';
// import ForumIcon from '@mui/icons-material/Forum';
// import ConversationItem from './ConversationItem';
// import MessageItem from './MessageItem';
// import ChatInput from './ChatInput';
// import { conversations } from './mockData';
// import { Conversation, Message } from './types';

// const DiscussionsPage: React.FC = () => {
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [showChatBot, setShowChatBot] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const handleSendMessage = (content: string, type: 'text' | 'file' | 'voice') => {
//     if (showChatBot) {
//       const userMessage: Message = {
//         id: `user-${Date.now()}`,
//         senderId: '1',
//         senderName: 'Vous',
//         senderAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         content,
//         timestamp: new Date().toISOString(),
//         type,
//       };

//       setMessages((prev) => [...prev, userMessage]);

//       setTimeout(() => {
//         const botMessage: Message = {
//           id: `bot-${Date.now()}`,
//           senderId: 'bot',
//           senderName: 'Assistant',
//           senderAvatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//           content: "Je suis l'assistant virtuel. Comment puis-je vous aider avec vos études aujourd'hui?",
//           timestamp: new Date().toISOString(),
//           type: 'text',
//         };

//         setMessages((prev) => [...prev, botMessage]);
//       }, 1000);
//     } else if (selectedConversation) {
//       console.log('Sending message:', content, 'to conversation:', selectedConversation.id);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', height: 'calc(100vh - 120px)', display: 'flex', px: { xs: 2, sm: 4 }, py: 4 }}>
//       {/* Conversations Sidebar */}
//       <Box
//         sx={{
//           width: { xs: 240, sm: 288 },
//           borderRight: '1px solid',
//           borderColor: 'grey.200',
//           bgcolor: 'grey.50',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <Box sx={{ p: { xs: 1.5, sm: 2 }, borderBottom: '1px solid', borderColor: 'grey.200' }}>
//           <Typography variant="h6" fontWeight="medium" color="text.primary">
//             Messages
//           </Typography>
//         </Box>

//         <Tabs
//           value={showChatBot ? 1 : 0}
//           onChange={(_, value) => {
//             setShowChatBot(value === 1);
//             if (value === 1) setSelectedConversation(null);
//           }}
//           sx={{ borderBottom: '1px solid', borderColor: 'grey.200' }}
//         >
//           <Tab
//             label={
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <PeopleIcon sx={{ fontSize: 16 }} />
//                 <Typography variant="body2">Enseignants</Typography>
//               </Box>
//             }
//             sx={{ flex: 1, textTransform: 'none', fontWeight: 'medium' }}
//           />
//           <Tab
//             label={
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <SmartToyIcon sx={{ fontSize: 16 }} />
//                 <Typography variant="body2">Assistant</Typography>
//               </Box>
//             }
//             sx={{ flex: 1, textTransform: 'none', fontWeight: 'medium' }}
//           />
//         </Tabs>

//         <Box sx={{ flex: 1, overflowY: 'auto' }}>
//           {!showChatBot &&
//             conversations.map((conversation) => (
//               <ConversationItem
//                 key={conversation.id}
//                 conversation={conversation}
//                 isActive={selectedConversation?.id === conversation.id}
//                 onClick={() => {
//                   setSelectedConversation(conversation);
//                   setShowChatBot(false);
//                 }}
//               />
//             ))}
//         </Box>
//       </Box>

//       {/* Message Area */}
//       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#eff6ff' }}> {/* Remplacé primary.lighter */}
//         {selectedConversation ? (
//           <>
//             <Box
//               sx={{
//                 p: { xs: 1.5, sm: 2 },
//                 bgcolor: 'background.paper',
//                 borderBottom: '1px solid',
//                 borderColor: 'grey.200',
//                 display: 'flex',
//                 alignItems: 'center',
//               }}
//             >
//               <Avatar
//                 src={selectedConversation.participantAvatar}
//                 alt={selectedConversation.participantName}
//                 sx={{ width: 40, height: 40, mr: 2 }}
//               />
//               <Box>
//                 <Typography variant="body1" fontWeight="medium" color="text.primary">
//                   {selectedConversation.participantName}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Enseignant
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, sm: 3 } }}>
//               {selectedConversation.messages.map((message) => (
//                 <MessageItem key={message.id} message={message} />
//               ))}
//             </Box>

//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : showChatBot ? (
//           <>
//             <Box
//               sx={{
//                 p: { xs: 1.5, sm: 2 },
//                 bgcolor: 'background.paper',
//                 borderBottom: '1px solid',
//                 borderColor: 'grey.200',
//                 display: 'flex',
//                 alignItems: 'center',
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   borderRadius: '50%',
//                   bgcolor: '#eff6ff', // Remplacé primary.light
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mr: 2,
//                 }}
//               >
//                 <SmartToyIcon sx={{ fontSize: 24 }} /> {/* Remplacé primary.main */}
//               </Box>
//               <Box>
//                 <Typography variant="body1" fontWeight="medium" color="text.primary">
//                   Assistant AI
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Toujours disponible pour vous aider
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, sm: 3 } }}>
//               {messages.length === 0 ? (
//                 <Box
//                   sx={{
//                     height: '100%',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     textAlign: 'center',
//                     p: 4,
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: 64,
//                       height: 64,
//                       borderRadius: '50%',
//                       bgcolor: '#eff6ff', // Remplacé primary.light
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       mb: 2,
//                     }}
//                   >
//                     <SmartToyIcon sx={{ fontSize: 32, color: '#eff6ff' }} />
//                   </Box>
//                   <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
//                     Assistant AI
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
//                     Posez-moi n'importe quelle question sur vos cours, devoirs ou matières. Je suis là pour vous aider à tout moment.
//                   </Typography>
//                 </Box>
//               ) : (
//                 messages.map((message) => <MessageItem key={message.id} message={message} />)
//               )}
//             </Box>

//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : (
//           <Box
//             sx={{
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               textAlign: 'center',
//               p: 4,
//             }}
//           >
//             <Box>
//               <Box
//                 sx={{
//                   width: 64,
//                   height: 64,
//                   borderRadius: '50%',
//                   bgcolor: 'grey.100',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mb: 2,
//                 }}
//               >
//                 <ForumIcon sx={{ fontSize: 32, color: 'grey.400' }} />
//               </Box>
//               <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
//                 Vos messages
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Sélectionnez une conversation pour voir les messages
//               </Typography>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default DiscussionsPage;
// import React, { useState } from 'react';
// import { Box, Typography, Avatar, Button, Tabs, Tab } from '@mui/material';
// import ConversationItem from './ConversationItem';
// import MessageItem from './MessageItem';
// import ChatInput from './ChatInput';
// import AssistantIcon from '@mui/icons-material/Assistant';
// import PeopleIcon from '@mui/icons-material/People';
// import MessageIcon from '@mui/icons-material/Message';
// import { conversations } from './mockData';
// import { Conversation, Message } from './types';

// const DiscussionsPage: React.FC = () => {
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [showChatBot, setShowChatBot] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const handleSendMessage = (content: string, type: 'text' | 'file' | 'voice') => {
//     if (showChatBot) {
//       const userMessage: Message = {
//         id: `user-${Date.now()}`,
//         senderId: '1',
//         senderName: 'Vous',
//         senderAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         content,
//         timestamp: new Date().toISOString(),
//         type,
//       };

//       setMessages((prev) => [...prev, userMessage]);

//       setTimeout(() => {
//         const botMessage: Message = {
//           id: `bot-${Date.now()}`,
//           senderId: 'bot',
//           senderName: 'Assistant',
//           senderAvatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//           content: "Je suis l'assistant virtuel. Comment puis-je vous aider avec vos études aujourd'hui?",
//           timestamp: new Date().toISOString(),
//           type: 'text',
//         };

//         setMessages((prev) => [...prev, botMessage]);
//       }, 1000);
//     } else if (selectedConversation) {
//       console.log('Sending message:', content, 'to conversation:', selectedConversation.id);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', px: { xs: 2, sm: 4 }, py: 4, height: 'calc(100vh - 120px)', display: 'flex' }}>
//       {/* Conversations Sidebar */}
//       <Box sx={{ width: { xs: 240, sm: 288 }, borderRight: 1, borderColor: 'grey.200', bgcolor: 'grey.50', display: 'flex', flexDirection: 'column' }}>
//         <Box sx={{ p: 2, borderBottom: 1, borderColor: 'grey.200' }}>
//           <Typography variant="h6" fontWeight="medium" color="text.primary">
//             Messages
//           </Typography>
//         </Box>

//         <Tabs
//           value={showChatBot ? 1 : 0}
//           sx={{ borderBottom: 1, borderColor: 'grey.200' }}
//         >
//           <Tab
//             label={
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <PeopleIcon fontSize="small" />
//                 <Typography variant="body2">Enseignants</Typography>
//               </Box>
//             }
//             onClick={() => setShowChatBot(false)}
//             sx={{ flex: 1, textTransform: 'none', fontWeight: showChatBot ? 'normal' : 'medium' }}
//           />
//           <Tab
//             label={
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                 <AssistantIcon fontSize="small" />
//                 <Typography variant="body2">Assistant</Typography>
//               </Box>
//             }
//             onClick={() => {
//               setShowChatBot(true);
//               setSelectedConversation(null);
//             }}
//             sx={{ flex: 1, textTransform: 'none', fontWeight: showChatBot ? 'medium' : 'normal' }}
//           />
//         </Tabs>

//         <Box sx={{ flex: 1, overflowY: 'auto' }}>
//           {!showChatBot &&
//             conversations.map((conversation) => (
//               <ConversationItem
//                 key={conversation.id}
//                 conversation={conversation}
//                 isActive={selectedConversation?.id === conversation.id}
//                 onClick={() => {
//                   setSelectedConversation(conversation);
//                   setShowChatBot(false);
//                 }}
//               />
//             ))}
//         </Box>
//       </Box>

//       {/* Message Area */}
//       <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: 'primary.light' }}>
//         {selectedConversation ? (
//           <>
//             <Box sx={{ p: 2, bgcolor: 'white', borderBottom: 1, borderColor: 'grey.200', display: 'flex', alignItems: 'center' }}>
//               <Avatar
//                 src={selectedConversation.participantAvatar}
//                 alt={selectedConversation.participantName}
//                 sx={{ width: 40, height: 40, mr: 2 }}
//               />
//               <Box>
//                 <Typography variant="body1" fontWeight="medium" color="text.primary">
//                   {selectedConversation.participantName}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Enseignant
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
//               {selectedConversation.messages.map((message) => (
//                 <MessageItem key={message.id} message={message} />
//               ))}
//             </Box>

//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : showChatBot ? (
//           <>
//             <Box sx={{ p: 2, bgcolor: 'white', borderBottom: 1, borderColor: 'grey.200', display: 'flex', alignItems: 'center' }}>
//               <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.light', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <AssistantIcon sx={{ color: 'primary.main' }} />
//               </Avatar>
//               <Box>
//                 <Typography variant="body1" fontWeight="medium" color="text.primary">
//                   Assistant AI
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Toujours disponible pour vous aider
//                 </Typography>
//               </Box>
//             </Box>

//             <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
//               {messages.length === 0 ? (
//                 <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', p: 4 }}>
//                   <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.light', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                     <AssistantIcon sx={{ fontSize: 32, color: 'primary.main' }} />
//                   </Avatar>
//                   <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
//                     Assistant AI
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
//                     Posez-moi n'importe quelle question sur vos cours, devoirs ou matières. Je suis là pour vous aider à tout moment.
//                   </Typography>
//                 </Box>
//               ) : (
//                 messages.map((message) => (
//                   <MessageItem key={message.id} message={message} />
//                 ))
//               )}
//             </Box>

//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : (
//           <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', p: 4 }}>
//             <Box>
//               <Avatar sx={{ width: 64, height: 64, bgcolor: 'grey.100', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <MessageIcon sx={{ fontSize: 32, color: 'grey.400' }} />
//               </Avatar>
//               <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
//                 Vos messages
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Sélectionnez une conversation pour voir les messages
//               </Typography>
//             </Box>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default DiscussionsPage;












// import React, { useState } from 'react';
// import ConversationItem from './ConversationItem';
// import MessageItem from './MessageItem';
// import ChatInput from './ChatInput';
// import { Bot, Users, MessageSquare } from 'lucide-react';
// import { conversations } from './mockData';
// import { Conversation, Message } from './types';

// const DiscussionsPage: React.FC = () => {
//   const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
//   const [showChatBot, setShowChatBot] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
  
//   const handleSendMessage = (content: string, type: 'text' | 'file' | 'voice') => {
//     if (showChatBot) {
//       // Add user message
//       const userMessage: Message = {
//         id: `user-${Date.now()}`,
//         senderId: '1',
//         senderName: 'Vous',
//         senderAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//         content,
//         timestamp: new Date().toISOString(),
//         type
//       };
      
//       setMessages(prev => [...prev, userMessage]);
      
//       // Simulate bot response after a short delay
//       setTimeout(() => {
//         const botMessage: Message = {
//           id: `bot-${Date.now()}`,
//           senderId: 'bot',
//           senderName: 'Assistant',
//           senderAvatar: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//           content: "Je suis l'assistant virtuel. Comment puis-je vous aider avec vos études aujourd'hui?",
//           timestamp: new Date().toISOString(),
//           type: 'text'
//         };
        
//         setMessages(prev => [...prev, botMessage]);
//       }, 1000);
//     } else if (selectedConversation) {
//       // Handle sending message in selected conversation
//       console.log('Sending message:', content, 'to conversation:', selectedConversation.id);
//     }
//   };
  
//   return (
//     <div className="h-[calc(100vh-120px)] flex">
//       {/* Conversations Sidebar */}
//       <div className="w-72 border-r bg-gray-50 flex flex-col">
//         <div className="p-3 border-b">
//           <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
//         </div>
        
//         <div className="flex border-b">
//           <button 
//             className={`flex-1 py-2 text-center font-medium ${
//               !showChatBot ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
//             }`}
//             onClick={() => setShowChatBot(false)}
//           >
//             <div className="flex items-center justify-center">
//               <Users className="h-4 w-4 mr-1" />
//               <span>Enseignants</span>
//             </div>
//           </button>
          
//           <button 
//             className={`flex-1 py-2 text-center font-medium ${
//               showChatBot ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
//             }`}
//             onClick={() => {
//               setShowChatBot(true);
//               setSelectedConversation(null);
//             }}
//           >
//             <div className="flex items-center justify-center">
//               <Bot className="h-4 w-4 mr-1" />
//               <span>Assistant</span>
//             </div>
//           </button>
//         </div>
        
//         <div className="flex-1 overflow-y-auto">
//           {!showChatBot && conversations.map(conversation => (
//             <ConversationItem 
//               key={conversation.id}
//               conversation={conversation}
//               isActive={selectedConversation?.id === conversation.id}
//               onClick={() => {
//                 setSelectedConversation(conversation);
//                 setShowChatBot(false);
//               }}
//             />
//           ))}
//         </div>
//       </div>
      
//       {/* Message Area */}
//       <div className="flex-1 flex flex-col bg-blue-50">
//         {selectedConversation ? (
//           <>
//             <div className="p-3 bg-white border-b flex items-center">
//               <img 
//                 src={selectedConversation.participantAvatar} 
//                 alt={selectedConversation.participantName}
//                 className="w-10 h-10 rounded-full mr-3" 
//               />
//               <div>
//                 <h3 className="font-medium text-gray-900">
//                   {selectedConversation.participantName}
//                 </h3>
//                 <p className="text-xs text-gray-500">
//                   Enseignant
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-4">
//               {selectedConversation.messages.map(message => (
//                 <MessageItem key={message.id} message={message} />
//               ))}
//             </div>
            
//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : showChatBot ? (
//           <>
//             <div className="p-3 bg-white border-b flex items-center">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                 <Bot className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-medium text-gray-900">
//                   Assistant AI
//                 </h3>
//                 <p className="text-xs text-gray-500">
//                   Toujours disponible pour vous aider
//                 </p>
//               </div>
//             </div>
            
//             <div className="flex-1 overflow-y-auto p-4">
//               {messages.length === 0 ? (
//                 <div className="h-full flex flex-col items-center justify-center text-center p-6">
//                   <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
//                     <Bot className="h-8 w-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                     Assistant AI
//                   </h3>
//                   <p className="text-gray-600 max-w-md">
//                     Posez-moi n'importe quelle question sur vos cours, devoirs ou matières. Je suis là pour vous aider à tout moment.
//                   </p>
//                 </div>
//               ) : (
//                 messages.map(message => (
//                   <MessageItem key={message.id} message={message} />
//                 ))
//               )}
//             </div>
            
//             <ChatInput onSendMessage={handleSendMessage} />
//           </>
//         ) : (
//           <div className="h-full flex items-center justify-center text-center p-6">
//             <div>
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
//                 <MessageSquare className="h-8 w-8 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 Vos messages
//               </h3>
//               <p className="text-gray-600">
//                 Sélectionnez une conversation pour voir les messages
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DiscussionsPage;