import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Message } from './types';
import { currentUser } from './mockData';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isCurrentUser = message.senderId === currentUser.id;
  const timestamp = new Date(message.timestamp);
  const timeString = timestamp.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return <Typography variant="body2">{message.content}</Typography>;
      case 'file':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
            <InsertDriveFileIcon fontSize="small" />
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {message.fileName || message.content}
              </Typography>
              {message.fileUrl && (
                <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#e5eef9' }}>
                  Télécharger
                </a>
              )}
            </Box>
          </Box>
        );
      case 'voice':
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
            <IconButton
              onClick={() => {
                if (message.fileUrl) {
                  const audio = new Audio(message.fileUrl);
                  audio.play();
                }
              }}
              sx={{
                bgcolor: '#e5eef9',
                color: 'white',
                width: 32,
                height: 32,
                '&:hover': { bgcolor: '#d1e0f0' },
              }}
            >
              <PlayArrowIcon fontSize="small" />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              Message vocal
            </Typography>
          </Box>
        );
      default:
        return <Typography variant="body2">{message.content}</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: isCurrentUser ? 'flex-end' : 'flex-start', mb: 2 }}>
      {!isCurrentUser && (
        <Avatar
          src={message.senderAvatar}
          alt={message.senderName}
          sx={{ width: 32, height: 32, mr: 1, alignSelf: 'flex-end' }}
        />
      )}
      <Box sx={{ maxWidth: '70%' }}>
        {!isCurrentUser && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            {message.senderName}
          </Typography>
        )}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: isCurrentUser ? '#e5eef9' : 'grey.200',
            color: isCurrentUser ? 'white' : 'text.primary',
            borderBottomRightRadius: isCurrentUser ? 0 : 8,
            borderBottomLeftRadius: isCurrentUser ? 8 : 0,
          }}
        >
          {renderMessageContent()}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
          {timeString}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageItem;
















// import React from 'react';
// import { Box, Typography, Avatar, IconButton } from '@mui/material';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import { Message } from './types';
// import { currentUser } from './mockData';

// interface MessageItemProps {
//   message: Message;
// }

// const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
//   const isCurrentUser = message.senderId === currentUser.id;

//   const timestamp = new Date(message.timestamp);
//   const timeString = timestamp.toLocaleTimeString('fr-FR', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const renderMessageContent = () => {
//     switch (message.type) {
//       case 'text':
//         return (
//           <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
//             {message.content}
//           </Typography>
//         );
//       case 'file':
//         return (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1,
//               bgcolor: 'background.paper',
//               p: 1,
//               borderRadius: 1,
//             }}
//           >
//             <InsertDriveFileIcon sx={{ fontSize: 20 }} />
//             <Box>
//               <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.875rem' }}>
//                 {message.fileName || message.content}
//               </Typography>
//               {message.fileUrl && (
//                 <a
//                   href={message.fileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   style={{ textDecoration: 'none', color: '#e5eef9', fontSize: '0.75rem' }}
//                 >
//                   Télécharger
//                 </a>
//               )}
//             </Box>
//           </Box>
//         );
//       case 'voice':
//         return (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1,
//               bgcolor: 'background.paper',
//               p: 1,
//               borderRadius: 1,
//             }}
//           >
//             <IconButton
//               onClick={() => {
//                 if (message.fileUrl) {
//                   const audio = new Audio(message.fileUrl);
//                   audio.play();
//                 }
//               }}
//               sx={{
//                 bgcolor: '#e5eef9',
//                 color: 'white',
//                 width: 32,
//                 height: 32,
//                 '&:hover': { bgcolor: '#d1e0f0' },
//               }}
//             >
//               <PlayArrowIcon sx={{ fontSize: 16 }} />
//             </IconButton>
//             <Typography variant="caption" color="text.secondary">
//               Message vocal
//             </Typography>
//           </Box>
//         );
//       default:
//         return (
//           <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
//             {message.content}
//           </Typography>
//         );
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
//         mb: 2,
//       }}
//     >
//       {!isCurrentUser && (
//         <Avatar
//           src={message.senderAvatar}
//           alt={message.senderName}
//           sx={{ width: 32, height: 32, mr: 1, alignSelf: 'flex-end' }}
//         />
//       )}
//       <Box sx={{ maxWidth: '70%' }}>
//         {!isCurrentUser && (
//           <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
//             {message.senderName}
//           </Typography>
//         )}
//         <Box
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             bgcolor: isCurrentUser ? '#e5eef9' : 'grey.200',
//             color: isCurrentUser ? 'white' : 'text.primary',
//             borderBottomRightRadius: isCurrentUser ? 0 : 8,
//             borderBottomLeftRadius: isCurrentUser ? 8 : 0,
//           }}
//         >
//           {renderMessageContent()}
//         </Box>
//         <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
//           {timeString}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default MessageItem;










// import React from 'react';
// import { Box, Typography, Avatar, IconButton } from '@mui/material';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import { Message } from './types';
// import { currentUser } from './mockData';

// interface MessageItemProps {
//   message: Message;
// }

// const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
//   const isCurrentUser = message.senderId === currentUser.id;

//   const timestamp = new Date(message.timestamp);
//   const timeString = timestamp.toLocaleTimeString('fr-FR', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });

//   const renderMessageContent = () => {
//     switch (message.type) {
//       case 'text':
//         return (
//           <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
//             {message.content}
//           </Typography>
//         );
//       case 'file':
//         return (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1,
//               bgcolor: 'background.paper',
//               p: 1,
//               borderRadius: 1,
//             }}
//           >
//             <InsertDriveFileIcon sx={{ fontSize: 20 }} />
//             <Box>
//               <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.875rem' }}>
//                 {message.content}
//               </Typography>
//               <a
//                 href={message.fileUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ textDecoration: 'none', color: '#e5eef9', fontSize: '0.75rem' }} // Remplacé primary.main
//               >
//                 Télécharger
//               </a>
//             </Box>
//           </Box>
//         );
//       case 'voice':
//         return (
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: 1,
//               bgcolor: 'background.paper',
//               p: 1,
//               borderRadius: 1,
//             }}
//           >
//             <IconButton
//               sx={{
//                 bgcolor: '#e5eef9', // Remplacé primary.main
//                 color: 'white',
//                 width: 32,
//                 height: 32,
//                 '&:hover': { bgcolor: '#d1e0f0' }, // Variation pour hover
//               }}
//             >
//               <PlayArrowIcon sx={{ fontSize: 16 }} />
//             </IconButton>
//             <Typography variant="caption" color="text.secondary">
//               Message vocal
//             </Typography>
//           </Box>
//         );
//       default:
//         return (
//           <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
//             {message.content}
//           </Typography>
//         );
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
//         mb: 2,
//       }}
//     >
//       {!isCurrentUser && (
//         <Avatar
//           src={message.senderAvatar}
//           alt={message.senderName}
//           sx={{ width: 32, height: 32, mr: 1, alignSelf: 'flex-end' }}
//         />
//       )}
//       <Box sx={{ maxWidth: '70%' }}>
//         {!isCurrentUser && (
//           <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
//             {message.senderName}
//           </Typography>
//         )}
//         <Box
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             bgcolor: isCurrentUser ? '#e5eef9' : 'grey.200', // Remplacé primary.main
//             color: isCurrentUser ? 'white' : 'text.primary',
//             borderBottomRightRadius: isCurrentUser ? 0 : 8,
//             borderBottomLeftRadius: isCurrentUser ? 8 : 0,
//           }}
//         >
//           {renderMessageContent()}
//         </Box>
//         <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
//           {timeString}
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default MessageItem;