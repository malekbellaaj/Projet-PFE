import React from 'react';
import Grid from '@mui/material/Grid'; // Import spécifique de Grid
import { Typography, Box, Container } from '@mui/material';
import SubjectCard from './SubjectCard';
import { Subject } from '../../types';

interface SubjectListProps {
  subjects: Subject[];
}

export default function SubjectList({ subjects }: SubjectListProps) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            position: 'relative',
            display: 'inline-block',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '60%',
              height: 4,
              backgroundColor: '#e5eef9',
              borderRadius: 2,
            },
          }}
        >
          Mes Matières
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {subjects.map((subject) => (
            <Grid
              {...({} as any)} 
              item
              xs={12}
              sm={6}
              md={4}
              key={subject.id}
            >
              <SubjectCard subject={subject} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}