import React, { useState, useRef } from 'react';
import { Box, IconButton, TextareaAutosize, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

interface ChatInputProps {
  onSendMessage: (message: string, type: 'text' | 'file' | 'voice', file?: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
        onSendMessage('Message vocal', 'voice', audioFile);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Erreur lors de l\'accès au microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSendMessage(file.name, 'file', file);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Réinitialiser l'input
      }
    }
  };

  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'grey.200',
        p: { xs: 1.5, sm: 2 },
        bgcolor: 'background.paper',
      }}
    >
      <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        <Tooltip title="Joindre un fichier">
          <IconButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
            sx={{
              p: 1,
              color: 'grey.500',
              '&:hover': { color: '#e5eef9' },
            }}
          >
            <AttachFileIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />

        <Tooltip title={isRecording ? 'Arrêter l\'enregistrement' : 'Enregistrer un message vocal'}>
          <IconButton
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            sx={{
              p: 1,
              color: isRecording ? 'error.main' : 'grey.500',
              '&:hover': { color: isRecording ? 'error.dark' : '#e5eef9' },
            }}
          >
            {isRecording ? <StopIcon sx={{ fontSize: 20 }} /> : <MicIcon sx={{ fontSize: 20 }} />}
          </IconButton>
        </Tooltip>

        <Box sx={{ flex: 1 }}>
          <TextareaAutosize
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'none',
              minHeight: '40px',
              fontFamily: 'inherit',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
        </Box>

        <IconButton
          type="submit"
          disabled={!message.trim()}
          sx={{
            p: 1.25,
            bgcolor: message.trim() ? '#e5eef9' : 'grey.300',
            color: 'white',
            borderRadius: '50%',
            '&:hover': {
              bgcolor: message.trim() ? '#d1e0f0' : 'grey.300',
            },
          }}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatInput;
// import React, { useState } from 'react';
// import { Box, IconButton, TextareaAutosize, Tooltip } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import MicIcon from '@mui/icons-material/Mic';

// interface ChatInputProps {
//   onSendMessage: (message: string, type: 'text' | 'file' | 'voice') => void;
// }

// const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
//   const [message, setMessage] = useState('');

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim()) {
//       onSendMessage(message, 'text');
//       setMessage('');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         borderTop: '1px solid',
//         borderColor: 'grey.200',
//         p: { xs: 1.5, sm: 2 },
//         bgcolor: 'background.paper',
//       }}
//     >
//       <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
//         <Tooltip title="Joindre un fichier">
//           <IconButton
//             type="button"
//             sx={{
//               p: 1,
//               color: 'grey.500',
//               '&:hover': { color: '#e5eef9' }, // Remplacé primary.main
//             }}
//           >
//             <AttachFileIcon sx={{ fontSize: 20 }} />
//           </IconButton>
//         </Tooltip>

//         <Tooltip title="Message vocal">
//           <IconButton
//             type="button"
//             sx={{
//               p: 1,
//               color: 'grey.500',
//               '&:hover': { color: '#e5eef9' }, // Remplacé primary.main
//             }}
//           >
//             <MicIcon sx={{ fontSize: 20 }} />
//           </IconButton>
//         </Tooltip>

//         <Box sx={{ flex: 1 }}>
//           <TextareaAutosize
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Tapez votre message..."
//             style={{
//               width: '100%',
//               padding: '8px 12px',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               fontSize: '14px',
//               resize: 'none',
//               minHeight: '40px',
//               fontFamily: 'inherit',
//             }}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSendMessage(e);
//               }
//             }}
//           />
//         </Box>

//         <IconButton
//           type="submit"
//           disabled={!message.trim()}
//           sx={{
//             p: 1.25,
//             bgcolor: message.trim() ? '#e5eef9' : 'grey.300', // Remplacé primary.main
//             color: 'white',
//             borderRadius: '50%',
//             '&:hover': {
//               bgcolor: message.trim() ? '#d1e0f0' : 'grey.300', // Légère variation pour hover
//             },
//           }}
//         >
//           <SendIcon sx={{ fontSize: 20 }} />
//         </IconButton>
//       </form>
//     </Box>
//   );
// };

// export default ChatInput;