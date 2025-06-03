import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, CardContent, Typography, Box, alpha } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Subject } from '../../types';
import paths from '../../routes/paths';

interface SubjectCardProps {
  subject: Subject;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: 180,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.1)',
    '& .MuiBox-root': {
      transform: 'scale(1.1)',
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
}));

export default function SubjectCard({ subject }: SubjectCardProps) {
  const history = useHistory();
  const subjectColors: { [key: string]: string } = {
    '1': '#2196f3', // Français
    '2': '#f44336', // Anglais
    '3': '#4caf50', // Arabe
  };

  const handleClick = () => {
    history.push(paths.subjectDetail.replace(':subjectId', subject.id));
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardContent sx={{ textAlign: 'center' }}>
        <IconWrapper
          sx={{
            backgroundColor: alpha(subjectColors[subject.id] || '#e5eef9', 0.2),
            color: subjectColors[subject.id] || '#e5eef9',
          }}
        >
          <MenuBookIcon sx={{ fontSize: 32 }} />
        </IconWrapper>
        <Typography variant="h6" component="div" gutterBottom>
          {subject.name}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}