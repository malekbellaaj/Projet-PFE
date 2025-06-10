import React from 'react';
import { Box, Typography, Avatar, Badge } from '@mui/material';
import { Conversation } from './types';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  onClick,
}) => {
  const timestamp = new Date(conversation.timestamp);
  const today = new Date();

  let timeDisplay = '';
  if (timestamp.toDateString() === today.toDateString()) {
    timeDisplay = timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    timeDisplay = timestamp.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        p: { xs: 1.5, sm: 2 },
        cursor: 'pointer',
        bgcolor: isActive ? '#e5eef9' : 'transparent', // Remplacé primary.light
        borderLeft: isActive ? '4px solid' : '4px solid transparent',
        borderColor: isActive ? '#e5eef9' : 'transparent', // Remplacé primary.main
        '&:hover': { bgcolor: 'grey.50' },
        transition: 'background-color 0.2s, border-color 0.2s',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={conversation.participantAvatar}
            alt={conversation.participantName}
            sx={{ width: 40, height: 40 }}
          />
          {conversation.unread > 0 && (
            <Badge
              badgeContent={conversation.unread}
              color="error"
              sx={{
                position: 'absolute',
                top: -4,
                right: -4,
                '& .MuiBadge-badge': {
                  fontSize: '0.65rem',
                  height: 20,
                  minWidth: 20,
                },
              }}
            />
          )}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Typography
              variant="body2"
              fontWeight="medium"
              color="text.primary"
              sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {conversation.participantName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {timeDisplay}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {conversation.lastMessage}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationItem;