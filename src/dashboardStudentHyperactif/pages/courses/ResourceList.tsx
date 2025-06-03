import { useState } from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Paper, 
  Divider,
  Collapse,
  IconButton
} from '@mui/material';
import { 
  FileText, 
  Video, 
  FileAudio, 
  Link2, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { Resource } from './types';

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  const [openResource, setOpenResource] = useState<string | null>(null);

  const toggleResource = (id: string) => {
    setOpenResource(openResource === id ? null : id);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText size={24} color="#4285F4" />;
      case 'video':
        return <Video size={24} color="#EA4335" />;
      case 'audio':
        return <FileAudio size={24} color="#FBBC05" />;
      case 'link':
        return <Link2 size={24} color="#34A853" />;
      default:
        return <FileText size={24} color="#4285F4" />;
    }
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        backgroundColor: 'white',
        border: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold',
          mb: 3,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '40px',
            height: '4px',
            backgroundColor: 'primary.main',
            borderRadius: '2px'
          }
        }}
      >
        Ressources
      </Typography>
      
      <List sx={{ width: '100%' }}>
        {resources.map((resource, index) => (
          <Box key={resource.id}>
            {index > 0 && <Divider sx={{ my: 1 }} />}
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <IconButton edge="end" onClick={() => toggleResource(resource.id)}>
                  {openResource === resource.id ? 
                    <ChevronUp size={24} /> : 
                    <ChevronDown size={24} />
                  }
                </IconButton>
              }
              sx={{ 
                px: 2, 
                py: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
              onClick={() => toggleResource(resource.id)}
            >
              <ListItemIcon>
                {getIcon(resource.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography 
                    variant="subtitle1" 
                    sx={{ fontWeight: 'medium' }}
                  >
                    {resource.title}
                  </Typography>
                }
                secondary={
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </Typography>
                }
              />
            </ListItem>
            <Collapse in={openResource === resource.id} timeout="auto" unmountOnExit>
              <Box sx={{ p: 3, backgroundColor: 'rgba(0, 0, 0, 0.02)', borderRadius: 1, mx: 2, mb: 2 }}>
                <Typography variant="body1">
                  {resource.content}
                </Typography>
              </Box>
            </Collapse>
          </Box>
        ))}
      </List>
    </Paper>
  );
}