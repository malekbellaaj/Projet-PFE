import React, { useState, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  VideoLibrary as VideoIcon,
  AudioFile as AudioIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import './Resources.css';

interface Resource {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  course: string;
  level: string;
}

const Resources: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      name: 'Cours_Mathematiques_Chapitre1.pdf',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: '2024-01-15',
      course: 'Mathématiques',
      level: '1ère Année',
    },
    {
      id: '2',
      name: 'Exercices_Physique.docx',
      type: 'Document',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      course: 'Physique',
      level: '2ème Année',
    },
    {
      id: '3',
      name: 'Video_Chimie_Reactions.mp4',
      type: 'Vidéo',
      size: '45.2 MB',
      uploadDate: '2024-01-13',
      course: 'Chimie',
      level: '3ème Année',
    },
  ]);

  const courses = [
    'Arabe',
    'Français',
    'Mathématiques',
    'Éducation Islamique',
    'Éducation Civique',
    'Sciences',
    'Histoire',
    'Géographie',
    'Éducation Physique',
  ];
  const levels = [
    '1ère Année',
    '2ème Année',
    '3ème Année',
    '4ème Année',
    '5ème Année',
    '6ème Année',
  ];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <PdfIcon color="error" />;
      case 'vidéo':
      case 'video':
        return <VideoIcon color="primary" />;
      case 'image':
        return <ImageIcon color="success" />;
      case 'audio':
        return <AudioIcon color="warning" />;
      default:
        return <FileIcon color="action" />;
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUpload = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCourse('');
    setSelectedLevel('');
    setDescription('');
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddResource = () => {
    if (!selectedFile || !selectedCourse || !selectedLevel) {
      setSnackbarMessage('Veuillez sélectionner un fichier, un cours et un niveau.');
      setOpenSnackbar(true);
      return;
    }

    const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
    let resourceType = 'Document';
    if (fileType === 'pdf') resourceType = 'PDF';
    else if (['mp4', 'avi', 'mov'].includes(fileType || '')) resourceType = 'Vidéo';
    else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileType || '')) resourceType = 'Image';
    else if (['mp3', 'wav'].includes(fileType || '')) resourceType = 'Audio';

    const newResource: Resource = {
      id: Date.now().toString(),
      name: selectedFile.name,
      type: resourceType,
      size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      course: selectedCourse,
      level: selectedLevel,
    };

    setResources([...resources, newResource]);
    setSnackbarMessage('Ressource ajoutée avec succès !');
    setOpenSnackbar(true);
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
    setSnackbarMessage('Ressource supprimée avec succès !');
    setOpenSnackbar(true);
  };

  const handleView = (resource: Resource) => {
    setSnackbarMessage(`Prévisualisation de ${resource.name} (fonctionnalité simulée).`);
    setOpenSnackbar(true);
  };

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setSelectedCourse(resource.course);
    setSelectedLevel(resource.level);
    setDescription('');
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedResource(null);
    setSelectedCourse('');
    setSelectedLevel('');
    setDescription('');
  };

  const handleUpdateResource = () => {
    if (!selectedResource || !selectedCourse || !selectedLevel) {
      setSnackbarMessage('Veuillez sélectionner un cours et un niveau.');
      setOpenSnackbar(true);
      return;
    }

    setResources(
      resources.map(resource =>
        resource.id === selectedResource.id
          ? { ...resource, course: selectedCourse, level: selectedLevel }
          : resource
      )
    );
    setSnackbarMessage('Ressource modifiée avec succès !');
    setOpenSnackbar(true);
    handleCloseEditDialog();
  };

  const handleDownload = (resource: Resource) => {
    setSnackbarMessage(`Téléchargement de ${resource.name} (fonctionnalité simulée).`);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const filteredResources = resources.filter(resource => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return resource.type === 'PDF' || resource.type === 'Document';
    if (tabValue === 2) return resource.type === 'Vidéo' || resource.type === 'Audio';
    if (tabValue === 3) return resource.type === 'Image';
    return true;
  });

  const TabPanel: React.FC<{ children?: React.ReactNode; index: number; value: number }> = ({
    children,
    value,
    index,
  }) => (
    <div hidden={value !== index} role="tabpanel" aria-labelledby={`tab-${index}`}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box className="custom-container" sx={{ width: '100%', px: 2, py: 4 }} role="main" aria-label="Gestion des ressources">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" className="custom-header">
          Gestion des Ressources
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleUpload}
          className="custom-button custom-button-primary"
          aria-label="Ajouter une ressource"
        >
          Ajouter une Ressource
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
        <Grid {...({} as any)} item xs={12} sm={6} md={3}>
          <Card className="custom-card">
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {resources.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Ressources
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid {...({} as any)} item xs={12} sm={6} md={3}>
          <Card className="custom-card">
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                {resources.filter(r => r.type === 'PDF' || r.type === 'Document').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Documents
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid {...({} as any)} item xs={12} sm={6} md={3}>
          <Card className="custom-card">
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                {resources.filter(r => r.type === 'Vidéo' || r.type === 'Audio').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Multimédia
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid {...({} as any)} item xs={12} sm={6} md={3}>
          <Card className="custom-card">
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <Typography variant="h4" color="error.main" sx={{ fontWeight: 700 }}>
                {courses.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Cours Actifs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card className="custom-card">
        <CardContent>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="Filtres des ressources">
              <Tab label="Toutes" id="tab-0" />
              <Tab label="Documents" id="tab-1" />
              <Tab label="Multimédia" id="tab-2" />
              <Tab label="Images" id="tab-3" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <ResourceList resources={filteredResources} onDelete={handleDelete} onView={handleView} onEdit={handleEdit} onDownload={handleDownload} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ResourceList resources={filteredResources} onDelete={handleDelete} onView={handleView} onEdit={handleEdit} onDownload={handleDownload} />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <ResourceList resources={filteredResources} onDelete={handleDelete} onView={handleView} onEdit={handleEdit} onDownload={handleDownload} />
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <ResourceList resources={filteredResources} onDelete={handleDelete} onView={handleView} onEdit={handleEdit} onDownload={handleDownload} />
          </TabPanel>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter une Nouvelle Ressource</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                border: '2px dashed #ccc',
                mb: 3,
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'grey.50' },
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Glissez vos fichiers ici
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ou cliquez pour parcourir
              </Typography>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp4,.avi,.mov,.mp3,.wav"
              />
              {selectedFile && (
                <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
                  Fichier sélectionné : {selectedFile.name}
                </Typography>
              )}
            </Paper>

            <Grid container spacing={2} justifyContent="center">
              <Grid {...({} as any)} item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="course-label">Cours</InputLabel>
                  <Select
                    labelId="course-label"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    label="Cours"
                    className="custom-select"
                  >
                    {courses.map((course) => (
                      <MenuItem key={course} value={course}>
                        {course}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid {...({} as any)} item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="level-label">Niveau Scolaire</InputLabel>
                  <Select
                    labelId="level-label"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    label="Niveau Scolaire"
                    className="custom-select"
                  >
                    {levels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid {...({} as any)} item xs={12}>
                <TextField
                  fullWidth
                  label="Description (optionnelle)"
                  multiline
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="custom-textfield"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className="custom-button">Annuler</Button>
          <Button variant="contained" onClick={handleAddResource} className="custom-button custom-button-primary">
            Télécharger
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier la Ressource</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Nom de la ressource : {selectedResource?.name}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid {...({} as any)} item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="edit-course-label">Cours</InputLabel>
                  <Select
                    labelId="edit-course-label"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    label="Cours"
                    className="custom-select"
                  >
                    {courses.map((course) => (
                      <MenuItem key={course} value={course}>
                        {course}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid {...({} as any)} item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="edit-level-label">Niveau Scolaire</InputLabel>
                  <Select
                    labelId="edit-level-label"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    label="Niveau Scolaire"
                    className="custom-select"
                  >
                    {levels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} className="custom-button">Annuler</Button>
          <Button variant="contained" onClick={handleUpdateResource} className="custom-button custom-button-primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        aria-live="polite"
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          className="custom-alert"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const ResourceList: React.FC<{
  resources: Resource[];
  onDelete: (id: string) => void;
  onView: (resource: Resource) => void;
  onEdit: (resource: Resource) => void;
  onDownload: (resource: Resource) => void;
}> = ({ resources, onDelete, onView, onEdit, onDownload }) => {
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <PdfIcon color="error" />;
      case 'vidéo':
      case 'video':
        return <VideoIcon color="primary" />;
      case 'image':
        return <ImageIcon color="success" />;
      case 'audio':
        return <AudioIcon color="warning" />;
      default:
        return <FileIcon color="action" />;
    }
  };

  return (
    <List>
      {resources.map((resource) => (
        <ListItem
          key={resource.id}
          className="custom-list-item"
          sx={{
            border: '1px solid #e0e6ed',
            borderRadius: 2,
            mb: 1,
            '&:hover': { backgroundColor: 'grey.50' },
          }}
        >
          <ListItemIcon>{getFileIcon(resource.type)}</ListItemIcon>
          <ListItemText
            primary={resource.name}
            secondary={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Chip label={resource.course} size="small" color="primary" variant="outlined" className="custom-chip" />
                <Chip label={resource.level} size="small" color="secondary" variant="outlined" className="custom-chip" />
                <Typography variant="caption" color="textSecondary">
                  {resource.size} • {resource.uploadDate}
                </Typography>
              </Box>
            }
          />
          <ListItemSecondaryAction>
            <IconButton size="small" onClick={() => onView(resource)} aria-label="Visualiser la ressource" className="custom-icon-button">
              <ViewIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDownload(resource)} aria-label="Télécharger la ressource" className="custom-icon-button">
              <DownloadIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onEdit(resource)} aria-label="Modifier la ressource" className="custom-icon-button">
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(resource.id)} color="error" aria-label="Supprimer la ressource" className="custom-icon-button">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default Resources;