import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  Chip,
  CircularProgress,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import './AddCourse.css';

// Interface pour les données du formulaire
interface CourseFormData {
  title: string;
  description: string;
  subject: string;
  level: string;
}

const AddCourse: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configuration du formulaire avec react-hook-form
  const { control, handleSubmit, watch, formState: { errors } } = useForm<CourseFormData>({
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      level: '',
    },
    mode: 'onChange',
  });

  const steps = ['Informations Générales', 'Aperçu'];

  // Liste des matières basée sur le programme tunisien
  const subjects = [
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

  // Navigation entre les étapes
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Gestion de la soumission du formulaire
  const onSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      console.log('Course data:', data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Erreur lors de la création du cours:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Rendu du contenu des étapes
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3} role="form" aria-label="Informations générales du cours">
            <Grid {...({} as any)} item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: 'Le titre est requis',
                  minLength: { value: 5, message: 'Le titre doit contenir au moins 5 caractères' },
                  maxLength: { value: 100, message: 'Le titre ne peut pas dépasser 100 caractères' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Titre du Cours"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    aria-required="true"
                    className="custom-textfield"
                  />
                )}
              />
            </Grid>
            <Grid {...({} as any)} item xs={12}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: 'La description est requise',
                  minLength: { value: 20, message: 'La description doit contenir au moins 20 caractères' },
                  maxLength: { value: 500, message: 'La description ne peut pas dépasser 500 caractères' },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    aria-required="true"
                    className="custom-textfield"
                  />
                )}
              />
            </Grid>
            <Grid {...({} as any)} item xs={12} md={6}>
              <Controller
                name="subject"
                control={control}
                rules={{ required: 'La matière est requise' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.subject} variant="outlined">
                    <InputLabel id="subject-label">Matière</InputLabel>
                    <Select
                      {...field}
                      labelId="subject-label"
                      label="Matière"
                      aria-required="true"
                      className="custom-select"
                    >
                      {subjects.map((subject) => (
                        <MenuItem key={subject} value={subject}>
                          {subject}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid {...({} as any)} item xs={12} md={6}>
              <Controller
                name="level"
                control={control}
                rules={{ required: 'Le niveau est requis' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.level} variant="outlined">
                    <InputLabel id="level-label">Niveau</InputLabel>
                    <Select
                      {...field}
                      labelId="level-label"
                      label="Niveau"
                      aria-required="true"
                      className="custom-select"
                    >
                      {levels.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Box role="region" aria-label="Aperçu du cours">
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }} className="custom-title">
              Aperçu du Cours
            </Typography>
            <Paper className="custom-paper">
              <Typography variant="h5" component="h2" className="custom-title">
                {watch('title') || 'Titre du cours'}
              </Typography>
              <Typography variant="body1" className="custom-description">
                {watch('description') || 'Description du cours'}
              </Typography>
              <Grid container spacing={2} className="custom-chip-container">
                <Grid {...({} as any)} item>
                  <Chip
                    label={watch('subject') || 'Matière'}
                    color="primary"
                    variant="outlined"
                    aria-label={`Matière: ${watch('subject') || 'Matière'}`}
                    className="custom-chip"
                  />
                </Grid>
                <Grid {...({} as any)} item>
                  <Chip
                    label={watch('level') || 'Niveau'}
                    color="secondary"
                    variant="outlined"
                    aria-label={`Niveau: ${watch('level') || 'Niveau'}`}
                    className="custom-chip"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      default:
        return 'Étape inconnue';
    }
  };

  return (
    <Box className="custom-container" role="main" aria-label="Ajouter un nouveau cours">
      <Typography variant="h4" component="h1" className="custom-header">
        Ajouter un Nouveau Cours
      </Typography>

      <Card className="custom-card">
        <CardContent>
          <Stepper activeStep={activeStep} aria-label="Étapes de création du cours" className="custom-stepper">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      <Card className="custom-card">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {renderStepContent(activeStep)}

            <Divider className="custom-divider" />

            <Box className="custom-button-container">
              <Button
                disabled={activeStep === 0 || isSubmitting}
                onClick={handleBack}
                variant="outlined"
                color="secondary"
                aria-label="Retour à l'étape précédente"
                className="custom-button"
              >
                Précédent
              </Button>

              <Box sx={{ display: 'flex', gap: 2 }}>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    aria-label="Créer le cours"
                    className="custom-button custom-button-primary"
                  >
                    {isSubmitting ? 'Création...' : 'Créer le Cours'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                    aria-label="Passer à l'étape suivante"
                    className="custom-button custom-button-primary"
                  >
                    Suivant
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>

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
          Cours créé avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddCourse;














// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   Paper,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   Stepper,
//   Step,
//   StepLabel,
//   Snackbar,
//   Alert,
//   Chip,
// } from '@mui/material';
// import { Save as SaveIcon } from '@mui/icons-material';
// import { useForm, Controller } from 'react-hook-form';

// const AddCourse: React.FC = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const { control, handleSubmit, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       title: '',
//       description: '',
//       subject: '',
//       level: '',
//     }
//   });

//   const steps = ['Informations Générales', 'Aperçu'];

//   const subjects = [
//     'Arabe',
//     'Français',
//     'Mathématiques',
//     'Éducation Islamique',
//     'Éducation Civique',
//     'Sciences',
//     'Histoire',
//     'Géographie',
//     'Éducation Physique',
//   ];

//   const levels = [
//     '1ère Année',
//     '2ème Année',
//     '3ème Année',
//     '4ème Année',
//     '5ème Année',
//     '6ème Année',
//   ];

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const onSubmit = (data: any) => {
//     console.log('Course data:', data);
//     setOpenSnackbar(true);
//     // Handle course creation API call here
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   const renderStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return (
//           <Grid container spacing={3}>
//             <Grid {...({} as any)} item xs={12}>
//               <Controller
//                 name="title"
//                 control={control}
//                 rules={{ required: 'Le titre est requis' }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Titre du Cours"
//                     error={!!errors.title}
//                     helperText={errors.title?.message}
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12}>
//               <Controller
//                 name="description"
//                 control={control}
//                 rules={{ required: 'La description est requise' }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     multiline
//                     rows={4}
//                     label="Description"
//                     error={!!errors.description}
//                     helperText={errors.description?.message}
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <Controller
//                 name="subject"
//                 control={control}
//                 rules={{ required: 'La matière est requise' }}
//                 render={({ field }) => (
//                   <FormControl fullWidth error={!!errors.subject}>
//                     <InputLabel>Matière</InputLabel>
//                     <Select {...field} label="Matière">
//                       {subjects.map((subject) => (
//                         <MenuItem key={subject} value={subject}>
//                           {subject}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <Controller
//                 name="level"
//                 control={control}
//                 rules={{ required: 'Le niveau est requis' }}
//                 render={({ field }) => (
//                   <FormControl fullWidth error={!!errors.level}>
//                     <InputLabel>Niveau</InputLabel>
//                     <Select {...field} label="Niveau">
//                       {levels.map((level) => (
//                         <MenuItem key={level} value={level}>
//                           {level}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 )}
//               />
//             </Grid>
//           </Grid>
//         );
//       case 1:
//         return (
//           <Box>
//             <Typography variant="h6" sx={{ mb: 3 }}>
//               Aperçu du Cours
//             </Typography>
//             <Paper sx={{ p: 3 }}>
//               <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
//                 {watch('title') || 'Titre du cours'}
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//                 {watch('description') || 'Description du cours'}
//               </Typography>
//               <Grid container spacing={2} sx={{ mb: 3 }}>
//                 <Grid {...({} as any)} item>
//                   <Chip label={watch('subject') || 'Matière'} color="primary" />
//                 </Grid>
//                 <Grid {...({} as any)} item>
//                   <Chip label={watch('level') || 'Niveau'} color="secondary" />
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Box>
//         );
//       default:
//         return 'Unknown step';
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: '100%' }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
//         Ajouter un Nouveau Cours
//       </Typography>

//       <Card sx={{ mb: 4 }}>
//         <CardContent sx={{ pb: 0 }}>
//           <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {renderStepContent(activeStep)}

//             <Divider sx={{ my: 4 }} />

//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 variant="outlined"
//               >
//                 Précédent
//               </Button>
              
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 {activeStep === steps.length - 1 ? (
//                   <Button
//                     type="submit"
//                     startIcon={<SaveIcon />}
//                     variant="contained"
//                   >
//                     Créer le Cours
//                   </Button>
//                 ) : (
//                   <Button
//                     onClick={handleNext}
//                     variant="contained"
//                   >
//                     Suivant
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="success"
//           sx={{ width: '100%' }}
//         >
//           Cours créé avec succès !
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AddCourse;







// import React, { useState } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   Chip,
//   IconButton,
//   Paper,
//   Divider,
//   FormControl,
//   InputLabel,
//   Select,
//   Switch,
//   FormControlLabel,
//   Stepper,
//   Step,
//   StepLabel,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   Delete as DeleteIcon,
//   CloudUpload as UploadIcon,
//   Save as SaveIcon,
//   Visibility as PreviewIcon,
// } from '@mui/icons-material';
// import { useForm, Controller } from 'react-hook-form';

// const AddCourse: React.FC = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [tags, setTags] = useState<string[]>([]);
//   const [newTag, setNewTag] = useState('');
//   const [modules, setModules] = useState([{ title: '', description: '', duration: '' }]);
  
//   const { control, handleSubmit, watch, formState: { errors } } = useForm({
//     defaultValues: {
//       title: '',
//       description: '',
//       category: '',
//       level: '',
//       duration: '',
//       maxStudents: '',
//       isPublic: true,
//       prerequisites: '',
//     }
//   });

//   const steps = ['Informations Générales', 'Contenu du Cours', 'Configuration', 'Aperçu'];

//   const categories = [
//     'Mathématiques',
//     'Sciences',
//     'Informatique',
//     'Langues',
//     'Histoire',
//     'Géographie',
//     'Arts',
//     'Sport',
//   ];

//   const levels = ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'];

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleAddTag = () => {
//     if (newTag.trim() && !tags.includes(newTag.trim())) {
//       setTags([...tags, newTag.trim()]);
//       setNewTag('');
//     }
//   };

//   const handleDeleteTag = (tagToDelete: string) => {
//     setTags(tags.filter(tag => tag !== tagToDelete));
//   };

//   const handleAddModule = () => {
//     setModules([...modules, { title: '', description: '', duration: '' }]);
//   };

//   const handleDeleteModule = (index: number) => {
//     setModules(modules.filter((_, i) => i !== index));
//   };

//   const handleModuleChange = (index: number, field: string, value: string) => {
//     const updatedModules = modules.map((module, i) => 
//       i === index ? { ...module, [field]: value } : module
//     );
//     setModules(updatedModules);
//   };

//   const onSubmit = (data: any) => {
//     console.log('Course data:', { ...data, tags, modules });
//     // Handle form submission
//   };

//   const renderStepContent = (step: number) => {
//     switch (step) {
//       case 0:
//         return (
//           <Grid container spacing={3}>
//             <Grid {...({} as any)} item xs={12}>
//               <Controller
//                 name="title"
//                 control={control}
//                 rules={{ required: 'Le titre est requis' }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Titre du Cours"
//                     error={!!errors.title}
//                     helperText={errors.title?.message}
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12}>
//               <Controller
//                 name="description"
//                 control={control}
//                 rules={{ required: 'La description est requise' }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     multiline
//                     rows={4}
//                     label="Description"
//                     error={!!errors.description}
//                     helperText={errors.description?.message}
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <Controller
//                 name="category"
//                 control={control}
//                 rules={{ required: 'La catégorie est requise' }}
//                 render={({ field }) => (
//                   <FormControl fullWidth error={!!errors.category}>
//                     <InputLabel>Catégorie</InputLabel>
//                     <Select {...field} label="Catégorie">
//                       {categories.map((category) => (
//                         <MenuItem key={category} value={category}>
//                           {category}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <Controller
//                 name="level"
//                 control={control}
//                 rules={{ required: 'Le niveau est requis' }}
//                 render={({ field }) => (
//                   <FormControl fullWidth error={!!errors.level}>
//                     <InputLabel>Niveau</InputLabel>
//                     <Select {...field} label="Niveau">
//                       {levels.map((level) => (
//                         <MenuItem key={level} value={level}>
//                           {level}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 )}
//               />
//             </Grid>
//           </Grid>
//         );
//       case 1:
//         return (
//           <Box>
//             <Typography variant="h6" sx={{ mb: 3 }}>
//               Modules du Cours
//             </Typography>
//             {modules.map((module, index) => (
//               <Paper key={index} sx={{ p: 3, mb: 2, border: '1px solid #e0e0e0' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                     Module {index + 1}
//                   </Typography>
//                   {modules.length > 1 && (
//                     <IconButton onClick={() => handleDeleteModule(index)} color="error">
//                       <DeleteIcon />
//                     </IconButton>
//                   )}
//                 </Box>
//                 <Grid container spacing={2}>
//                   <Grid {...({} as any)} item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Titre du Module"
//                       value={module.title}
//                       onChange={(e) => handleModuleChange(index, 'title', e.target.value)}
//                     />
//                   </Grid>
//                   <Grid {...({} as any)} item xs={12} md={6}>
//                     <TextField
//                       fullWidth
//                       label="Durée (heures)"
//                       value={module.duration}
//                       onChange={(e) => handleModuleChange(index, 'duration', e.target.value)}
//                     />
//                   </Grid>
//                   <Grid {...({} as any)} item xs={12}>
//                     <TextField
//                       fullWidth
//                       multiline
//                       rows={2}
//                       label="Description du Module"
//                       value={module.description}
//                       onChange={(e) => handleModuleChange(index, 'description', e.target.value)}
//                     />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             ))}
//             <Button
//               startIcon={<AddIcon />}
//               onClick={handleAddModule}
//               variant="outlined"
//               sx={{ mt: 2 }}
//             >
//               Ajouter un Module
//             </Button>
//           </Box>
//         );
//       case 2:
//         return (
//           <Grid container spacing={3}>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <Controller
//                 name="duration"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Durée Totale (heures)"
//                     type="number"
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12} md={6}>
//               <Controller
//                 name="maxStudents"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     label="Nombre Max d'Étudiants"
//                     type="number"
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12}>
//               <Controller
//                 name="prerequisites"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     fullWidth
//                     multiline
//                     rows={3}
//                     label="Prérequis"
//                     sx={{ mb: 2 }}
//                   />
//                 )}
//               />
//             </Grid>
//             <Grid {...({} as any)} item xs={12}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                   Tags du Cours
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
//                   <TextField
//                     size="small"
//                     label="Ajouter un tag"
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
//                   />
//                   <Button onClick={handleAddTag} variant="outlined">
//                     Ajouter
//                   </Button>
//                 </Box>
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                   {tags.map((tag, index) => (
//                     <Chip
//                       key={index}
//                       label={tag}
//                       onDelete={() => handleDeleteTag(tag)}
//                       color="primary"
//                       variant="outlined"
//                     />
//                   ))}
//                 </Box>
//               </Box>
//             </Grid>
//             <Grid {...({} as any)} item xs={12}>
//               <Controller
//                 name="isPublic"
//                 control={control}
//                 render={({ field }) => (
//                   <FormControlLabel
//                     control={<Switch {...field} checked={field.value} />}
//                     label="Cours Public"
//                   />
//                 )}
//               />
//             </Grid>
//           </Grid>
//         );
//       case 3:
//         return (
//           <Box>
//             <Typography variant="h6" sx={{ mb: 3 }}>
//               Aperçu du Cours
//             </Typography>
//             <Paper sx={{ p: 3 }}>
//               <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
//                 {watch('title') || 'Titre du cours'}
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//                 {watch('description') || 'Description du cours'}
//               </Typography>
//               <Grid container spacing={2} sx={{ mb: 3 }}>
//                 <Grid {...({} as any)} item>
//                   <Chip label={watch('category') || 'Catégorie'} color="primary" />
//                 </Grid>
//                 <Grid {...({} as any)} item>
//                   <Chip label={watch('level') || 'Niveau'} color="secondary" />
//                 </Grid>
//                 {tags.map((tag, index) => (
//                   <Grid {...({} as any)} item key={index}>
//                     <Chip label={tag} variant="outlined" />
//                   </Grid>
//                 ))}
//               </Grid>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Modules ({modules.length})
//               </Typography>
//               {modules.map((module, index) => (
//                 <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
//                   <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                     {module.title || `Module ${index + 1}`}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {module.description || 'Description du module'}
//                   </Typography>
//                   {module.duration && (
//                     <Typography variant="caption" color="primary">
//                       Durée: {module.duration}h
//                     </Typography>
//                   )}
//                 </Box>
//               ))}
//             </Paper>
//           </Box>
//         );
//       default:
//         return 'Unknown step';
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: '100%' }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
//         Ajouter un Nouveau Cours
//       </Typography>

//       <Card sx={{ mb: 4 }}>
//         <CardContent sx={{ pb: 0 }}>
//           <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             {renderStepContent(activeStep)}

//             <Divider sx={{ my: 4 }} />

//             <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//               <Button
//                 disabled={activeStep === 0}
//                 onClick={handleBack}
//                 variant="outlined"
//               >
//                 Précédent
//               </Button>
              
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 {activeStep === steps.length - 1 ? (
//                   <>
//                     <Button
//                       startIcon={<PreviewIcon />}
//                       variant="outlined"
//                     >
//                       Prévisualiser
//                     </Button>
//                     <Button
//                       type="submit"
//                       startIcon={<SaveIcon />}
//                       variant="contained"
//                     >
//                       Créer le Cours
//                     </Button>
//                   </>
//                 ) : (
//                   <Button
//                     onClick={handleNext}
//                     variant="contained"
//                   >
//                     Suivant
//                   </Button>
//                 )}
//               </Box>
//             </Box>
//           </form>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default AddCourse;

