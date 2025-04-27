import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Grid,
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Card,
  CardContent,
  Stack,
  CssBaseline,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddressForm from "./components/AddressForm";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import Review from "./components/Review";
import LeftFormLogo from "./components/LeftFormLogoo";
import AppTheme from "../shared-theme/AppTheme";
import PaymentForm from './components/PaymentForm';


const steps = ["Informations de l'élève", "Vérification", 'Paiement' ];


function getStepContent(step, formValues) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review formData={formValues} />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error("Étape inconnue");
  }
}

export default function MainForm(props) {
  const [activeStep, setActiveStep] = React.useState(0); //activeStep : variable d’état (React state) qui contrôle quelle étape est affichée
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      ParentName: "",
      StudentName: "",
      email: "",
      phone: "",
      studentSituation: "",
      birthDate: "",
      schoolLevel: "",
      acceptTerms: false,
    },
  });

  const handleNext = async () => {
    if (activeStep === 0) {
      const valid = await methods.trigger();
      if (!valid) return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <AppTheme {...props}>
      <CssBaseline />
      {/* Applique le thème personnalisé et réinitialise les styles CSS */}
      <FormProvider {...methods}>
        <Grid
          container //Grille Principale
          sx={{
            height: {
              xs: "100%",
              sm: "calc(100dvh - var(--template-frame-height, 0px))",
            },
            mt: { xs: 4, sm: 0 },
          }}
        >
          {/* Colonne Gauche (Desktop) */}
          <Grid size={{ xs: 12, sm: 5, lg: 4 }} sx={leftColumnStyle}>
            <LeftFormLogo /> {/* appel du logo */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: 500,
              }}
            >
              <Info />
            </Box>
          </Grid>

          {/* Colonne Droite (Contenu Principal) */}
          <Grid size={{ sm: 12, md: 7, lg: 8 }} sx={rightColumnStyle}>
            {/* Stepper Desktop */}
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                }}
              >
                <Stepper //Affiche la progression en étapes (version desktop)
                  activeStep={activeStep}
                  sx={{ width: "100%", height: 40 }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>

            {/* Mobile Card Info : Version mobile du panneau d'information*/}
            <Card sx={{ display: { xs: "flex", md: "none" }, width: "80%" }}>
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Bienvenue sur Altus</Typography>
                <InfoMobile />
              </CardContent>
            </Card>

            {/* Form Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 800 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              {/* Stepper Mobile */}
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Contenu conditionnel */}
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">✅</Typography>
                  <Typography variant="h5">
                    Merci pour votre inscription !
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary" }}>
                    Vos informations ont été enregistrées avec succès. Un email
                    de confirmation vous sera envoyé bientôt.
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      alignSelf: "start",
                      width: { xs: "100%", sm: "auto" },
                    }}
                  >
                    Retour à l’accueil
                  </Button>
                </Stack>
              ) : (
                <>
                  {getStepContent(activeStep, methods.getValues())}
                  <Box sx={actionBoxStyle(activeStep)}>
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Précédent
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        Précédent
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                    >
                      {activeStep === steps.length - 1 ? "Valider" : "Suivant"}
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </AppTheme>
  );
}

//style du partie left
const leftColumnStyle = {
  display: { xs: "none", md: "flex" }, // caché sur mobile
  flexDirection: "column",
  backgroundColor: "background.paper",
  borderRight: { sm: "none", md: "2px solid" }, //bordure entre les deux parties
  borderColor: { sm: "none", md: "divider" },
  alignItems: "center",
  pt: 5, //espacement en haut
  px: 5, //espacement droite et gauche
  gap: 4, // espacement entre logo et ecriture
};

const rightColumnStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
  width: "100%",
  backgroundColor: { xs: "transparent", sm: "background.default" },
  alignItems: "center",
  pt: { xs: 0, sm: 10 },
  px: { xs: 2, sm: 10 },
  gap: { xs: 3, md: 5 },
};

const actionBoxStyle = (step) => [
  {
    display: "flex",
    flexDirection: { xs: "column-reverse", sm: "row" },
    alignItems: "end",
    flexGrow: 1,
    gap: 1,
    pb: { xs: 12, sm: 0 },
    mt: { xs: 2, sm: 0 },
    mb: "60px",
  },
  step !== 0
    ? { justifyContent: "space-between" }
    : { justifyContent: "flex-end" },
];

// avec bouton suivant
// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Stepper from "@mui/material/Stepper";
// import Typography from "@mui/material/Typography";
// import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import AddressForm from "./components/AddressForm";
// import Info from "./components/Info";
// import InfoMobile from "./components/InfoMobile";
// import Review from "./components/Review";
// import LeftFormLogo from "./components/LeftFormLogoo";
// import AppTheme from "..//shared-theme/AppTheme";

// const [formData, setFormData] = React.useState({
//   name: "",
//   matricule: "",
//   phone: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   acceptedTerms: false,
// });
// const validateForm = () => {
//   const { name, matricule, phone, email, password, confirmPassword, acceptedTerms } = formData;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^[0-9\s]{7,15}$/;

//   return (
//     name.trim() !== "" &&
//     matricule.trim() !== "" &&
//     phoneRegex.test(phone) &&
//     emailRegex.test(email) &&
//     password.length >= 6 &&
//     password === confirmPassword &&
//     acceptedTerms
//   );
// };

// const steps = ["Informations de l’enseignant", "Vérification"];
// function getStepContent(step, formData, setFormData) {
//   switch (step) {
//     case 0:
//       return <AddressForm formData={formData} setFormData={setFormData} />;
//     case 1:
//       return <Review />;
//     default:
//       throw new Error("Étape inconnue");
//   }
// }

// export default function Checkout(props) {
//   const [activeStep, setActiveStep] = React.useState(0); //activeStep : variable d’état (React state) qui contrôle quelle étape est affichée
//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };
//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };
//   return (
//     <AppTheme {...props}>
//       <CssBaseline />
//       {/* Applique le thème personnalisé et réinitialise les styles CSS */}

//       <Grid
//         container //Grille Principale
//         sx={{
//           height: {
//             xs: "100%",
//             sm: "calc(100dvh - var(--template-frame-height, 0px))",
//           },
//           mt: {
//             xs: 4,
//             sm: 0,
//           },
//         }}
//       >
//         <Grid //Colonne Gauche (Desktop)
//           size={{ xs: 12, sm: 5, lg: 4 }}
//           sx={{
//             display: { xs: "none", md: "flex" }, // caché sur mobile
//             flexDirection: "column",
//             backgroundColor: "background.paper",
//             borderRight: { sm: "none", md: "2px solid" }, //bordure entre les deux parties
//             borderColor: { sm: "none", md: "divider" },
//             alignItems: "center",
//             pt: 5, //espacement en haut
//             px: 5, //espacement droite et gauche
//             gap: 4, // espacement entre logo et ecriture
//           }}
//         >
//           <LeftFormLogo /> {/* appel du logo */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               flexGrow: 1,
//               width: "100%",
//               maxWidth: 500,
//             }}
//           >
//             <Info />
//           </Box>
//         </Grid>
//         <Grid //Colonne Droite (Contenu Principal)
//           size={{ sm: 12, md: 7, lg: 8 }}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             maxWidth: "100%",
//             width: "100%",
//             backgroundColor: { xs: "transparent", sm: "background.default" },
//             alignItems: "center",
//             pt: { xs: 0, sm: 10 },
//             px: { xs: 2, sm: 10 },
//             gap: { xs: 3, md: 5 },
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: { sm: "space-between", md: "flex-end" },
//               alignItems: "center",
//               width: "100%",
//               maxWidth: { sm: "100%", md: 600 },
//             }}
//           >
//             <Box
//               sx={{
//                 display: { xs: "none", md: "flex" },
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 alignItems: "flex-end",
//                 flexGrow: 1,
//               }}
//             >
//               <Stepper //Affiche la progression en étapes (version desktop)
//                 id="desktop-stepper"
//                 activeStep={activeStep}
//                 sx={{ width: "100%", height: 40 }}
//               >
//                 {steps.map((label) => (
//                   <Step
//                     sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
//                     key={label}
//                   >
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>
//           </Box>
//           {/* Version mobile du panneau d'information */}
//           <Card sx={{ display: { xs: "flex", md: "none" }, width: "80%" }}>
//             <CardContent
//               sx={{
//                 display: "flex",
//                 width: "100%",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div>
//                 <Typography>bienvenue sur Altus</Typography>
//               </div>
//               <InfoMobile />
//             </CardContent>
//           </Card>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               flexGrow: 1,
//               width: "100%",
//               maxWidth: { sm: "100%", md: 800 },
//               maxHeight: "720px",
//               gap: { xs: 5, md: "none" },
//             }}
//           >
//             <Stepper //Stepper Mobile
//               id="mobile-stepper"
//               activeStep={activeStep}
//               alternativeLabel
//               sx={{ display: { sm: "flex", md: "none" } }}
//             >
//               {steps.map((label) => (
//                 <Step
//                   sx={{
//                     ":first-child": { pl: 0 },
//                     ":last-child": { pr: 0 },
//                     "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
//                   }}
//                   key={label}
//                 >
//                   <StepLabel
//                     sx={{
//                       ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
//                     }}
//                   >
//                     {label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             {/* Affichage Conditionnel */}
//             {activeStep === steps.length ? (
//               <Stack spacing={2} useFlexGap>
//                 <Typography variant="h1">✅</Typography>
//                 <Typography variant="h5">
//                   Merci pour votre inscription !
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "text.secondary" }}>
//                   Vos informations ont été enregistrées avec succès. Un email de
//                   confirmation vous sera envoyé bientôt.
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
//                 >
//                   Retour à l’accueil
//                 </Button>
//               </Stack>
//             ) : (
//               <React.Fragment>
//                 {getStepContent(activeStep)}
//                 <Box
//                   sx={[
//                     {
//                       display: "flex",
//                       flexDirection: { xs: "column-reverse", sm: "row" },
//                       alignItems: "end",
//                       flexGrow: 1,
//                       gap: 1,
//                       pb: { xs: 12, sm: 0 },
//                       mt: { xs: 2, sm: 0 },
//                       mb: "60px",
//                     },
//                     activeStep !== 0
//                       ? { justifyContent: "space-between" }
//                       : { justifyContent: "flex-end" },
//                   ]}
//                 >
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="text"
//                       sx={{ display: { xs: "none", sm: "flex" } }}
//                     >
//                       Précédent
//                     </Button>
//                   )}
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="outlined"
//                       fullWidth
//                       sx={{ display: { xs: "flex", sm: "none" } }}
//                     >
//                       Précédent
//                     </Button>
//                   )}
//                   <Button
//                     variant="contained"
//                     endIcon={<ChevronRightRoundedIcon />}
//                     onClick={handleNext}
//                     sx={{ width: { xs: "100%", sm: "fit-content" } }}
//                   >
//                     {activeStep === steps.length - 1 ? "Valider" : "Suivant"}
//                   </Button>
//                 </Box>
//               </React.Fragment>
//             )}
//           </Box>
//         </Grid>
//       </Grid>
//     </AppTheme>
//   );
// }

// sans verif

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Stack from "@mui/material/Stack";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Stepper from "@mui/material/Stepper";
// import Typography from "@mui/material/Typography";
// import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
// import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import AddressForm from "./components/AddressForm";
// import Info from "./components/Info";
// import InfoMobile from "./components/InfoMobile";
// import Review from "./components/Review";
// import LeftFormLogo from "./components/LeftFormLogoo";
// import AppTheme from "..//shared-theme/AppTheme";

// const steps = ["Informations de l’enseignant", "Vérification"];
// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <Review />;
//     default:
//       throw new Error("Étape inconnue");
//   }
// }
// export default function Checkout(props) {
//   const [activeStep, setActiveStep] = React.useState(0); //activeStep : variable d’état (React state) qui contrôle quelle étape est affichée
//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };
//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };
//   return (
//     <AppTheme {...props}>
//       <CssBaseline />
//       {/* Applique le thème personnalisé et réinitialise les styles CSS */}

//       <Grid
//         container //Grille Principale
//         sx={{
//           height: {
//             xs: "100%",
//             sm: "calc(100dvh - var(--template-frame-height, 0px))",
//           },
//           mt: {
//             xs: 4,
//             sm: 0,
//           },
//         }}
//       >
//         <Grid //Colonne Gauche (Desktop)
//           size={{ xs: 12, sm: 5, lg: 4 }}
//           sx={{
//             display: { xs: "none", md: "flex" }, // caché sur mobile
//             flexDirection: "column",
//             backgroundColor: "background.paper",
//             borderRight: { sm: "none", md: "2px solid" }, //bordure entre les deux parties
//             borderColor: { sm: "none", md: "divider" },
//             alignItems: "center",
//             pt: 5, //espacement en haut
//             px: 5, //espacement droite et gauche
//             gap: 4, // espacement entre logo et ecriture
//           }}
//         >
//           <LeftFormLogo /> {/* appel du logo */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               flexGrow: 1,
//               width: "100%",
//               maxWidth: 500,
//             }}
//           >
//             <Info />
//           </Box>
//         </Grid>
//         <Grid //Colonne Droite (Contenu Principal)
//           size={{ sm: 12, md: 7, lg: 8 }}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             maxWidth: "100%",
//             width: "100%",
//             backgroundColor: { xs: "transparent", sm: "background.default" },
//             alignItems: "center",
//             pt: { xs: 0, sm: 10 },
//             px: { xs: 2, sm: 10 },
//             gap: { xs: 3, md: 5 },
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: { sm: "space-between", md: "flex-end" },
//               alignItems: "center",
//               width: "100%",
//               maxWidth: { sm: "100%", md: 600 },
//             }}
//           >
//             <Box
//               sx={{
//                 display: { xs: "none", md: "flex" },
//                 flexDirection: "column",
//                 justifyContent: "space-between",
//                 alignItems: "flex-end",
//                 flexGrow: 1,
//               }}
//             >
//               <Stepper //Affiche la progression en étapes (version desktop)
//                 id="desktop-stepper"
//                 activeStep={activeStep}
//                 sx={{ width: "100%", height: 40 }}
//               >
//                 {steps.map((label) => (
//                   <Step
//                     sx={{ ":first-child": { pl: 0 }, ":last-child": { pr: 0 } }}
//                     key={label}
//                   >
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>
//           </Box>
//           {/* Version mobile du panneau d'information */}
//           <Card sx={{ display: { xs: "flex", md: "none" }, width: "80%" }}>
//             <CardContent
//               sx={{
//                 display: "flex",
//                 width: "100%",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div>
//                 <Typography>bienvenue sur Altus</Typography>
//               </div>
//               <InfoMobile />
//             </CardContent>
//           </Card>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               flexGrow: 1,
//               width: "100%",
//               maxWidth: { sm: "100%", md: 800 },
//               maxHeight: "720px",
//               gap: { xs: 5, md: "none" },
//             }}
//           >
//             <Stepper //Stepper Mobile
//               id="mobile-stepper"
//               activeStep={activeStep}
//               alternativeLabel
//               sx={{ display: { sm: "flex", md: "none" } }}
//             >
//               {steps.map((label) => (
//                 <Step
//                   sx={{
//                     ":first-child": { pl: 0 },
//                     ":last-child": { pr: 0 },
//                     "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
//                   }}
//                   key={label}
//                 >
//                   <StepLabel
//                     sx={{
//                       ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
//                     }}
//                   >
//                     {label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             {/* Affichage Conditionnel */}
//             {activeStep === steps.length ? (
//               <Stack spacing={2} useFlexGap>
//                 <Typography variant="h1">✅</Typography>
//                 <Typography variant="h5">
//                   Merci pour votre inscription !
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: "text.secondary" }}>
//                   Vos informations ont été enregistrées avec succès. Un email de
//                   confirmation vous sera envoyé bientôt.
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   sx={{ alignSelf: "start", width: { xs: "100%", sm: "auto" } }}
//                 >
//                   Retour à l’accueil
//                 </Button>
//               </Stack>
//             ) : (
//               <React.Fragment>
//                 {getStepContent(activeStep)}
//                 <Box
//                   sx={[
//                     {
//                       display: "flex",
//                       flexDirection: { xs: "column-reverse", sm: "row" },
//                       alignItems: "end",
//                       flexGrow: 1,
//                       gap: 1,
//                       pb: { xs: 12, sm: 0 },
//                       mt: { xs: 2, sm: 0 },
//                       mb: "60px",
//                     },
//                     activeStep !== 0
//                       ? { justifyContent: "space-between" }
//                       : { justifyContent: "flex-end" },
//                   ]}
//                 >
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="text"
//                       sx={{ display: { xs: "none", sm: "flex" } }}
//                     >
//                       Précédent
//                     </Button>
//                   )}
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="outlined"
//                       fullWidth
//                       sx={{ display: { xs: "flex", sm: "none" } }}
//                     >
//                       Précédent
//                     </Button>
//                   )}
//                   <Button
//                     variant="contained"
//                     endIcon={<ChevronRightRoundedIcon />}
//                     onClick={handleNext}
//                     sx={{ width: { xs: "100%", sm: "fit-content" } }}
//                   >
//                     {activeStep === steps.length - 1 ? "Valider" : "Suivant"}
//                   </Button>
//                 </Box>
//               </React.Fragment>
//             )}
//           </Box>
//         </Grid>
//       </Grid>
//     </AppTheme>
//   );
// }

// page origine

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Stepper from '@mui/material/Stepper';
// import Typography from '@mui/material/Typography';
// import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
// import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import AddressForm from './components/AddressForm';
// import Info from './components/Info';
// import InfoMobile from './components/InfoMobile';
// import PaymentForm from './components/PaymentForm';
// import Review from './components/Review';
// import SitemarkIcon from './components/SitemarkIcon';
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';

// const steps = ['Shipping address', 'Payment details', 'Review your order'];
// function getStepContent(step) {   //activeStep : variable d’état (React state) qui contrôle quelle étape est affichée
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }
// export default function Checkout(props) {
//   const [activeStep, setActiveStep] = React.useState(0);
//   const handleNext = () => {
//     setActiveStep(activeStep + 1);
//   };
//   const handleBack = () => {
//     setActiveStep(activeStep - 1);
//   };
//   return (
//     <AppTheme {...props}>
//       <CssBaseline enableColorScheme />
//       <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
//         <ColorModeIconDropdown />
//       </Box>

//       <Grid
//         container
//         sx={{
//           height: {
//             xs: '100%',
//             sm: 'calc(100dvh - var(--template-frame-height, 0px))',
//           },
//           mt: {
//             xs: 4,
//             sm: 0,
//           },
//         }}
//       >
//         <Grid
//           size={{ xs: 12, sm: 5, lg: 4 }}
//           sx={{
//             display: { xs: 'none', md: 'flex' },
//             flexDirection: 'column',
//             backgroundColor: 'background.paper',
//             borderRight: { sm: 'none', md: '1px solid' },
//             borderColor: { sm: 'none', md: 'divider' },
//             alignItems: 'start',
//             pt: 16,
//             px: 10,
//             gap: 4,
//           }}
//         >
//           <SitemarkIcon />
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               flexGrow: 1,
//               width: '100%',
//               maxWidth: 500,
//             }}
//           >
//             <Info totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
//           </Box>
//         </Grid>
//         <Grid
//           size={{ sm: 12, md: 7, lg: 8 }}
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             maxWidth: '100%',
//             width: '100%',
//             backgroundColor: { xs: 'transparent', sm: 'background.default' },
//             alignItems: 'start',
//             pt: { xs: 0, sm: 16 },
//             px: { xs: 2, sm: 10 },
//             gap: { xs: 4, md: 8 },
//           }}
//         >
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: { sm: 'space-between', md: 'flex-end' },
//               alignItems: 'center',
//               width: '100%',
//               maxWidth: { sm: '100%', md: 600 },
//             }}
//           >
//             <Box
//               sx={{
//                 display: { xs: 'none', md: 'flex' },
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'flex-end',
//                 flexGrow: 1,
//               }}
//             >
//               <Stepper
//                 id="desktop-stepper"
//                 activeStep={activeStep}
//                 sx={{ width: '100%', height: 40 }}
//               >
//                 {steps.map((label) => (
//                   <Step
//                     sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
//                     key={label}
//                   >
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>
//             </Box>
//           </Box>
//           <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
//             <CardContent
//               sx={{
//                 display: 'flex',
//                 width: '100%',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//               }}
//             >
//               <div>
//                 <Typography variant="subtitle2" gutterBottom>
//                   Selected products
//                 </Typography>
//                 <Typography variant="body1">
//                   {activeStep >= 2 ? '$144.97' : '$134.98'}
//                 </Typography>
//               </div>
//               <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
//             </CardContent>
//           </Card>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               flexGrow: 1,
//               width: '100%',
//               maxWidth: { sm: '100%', md: 600 },
//               maxHeight: '720px',
//               gap: { xs: 5, md: 'none' },
//             }}
//           >
//             <Stepper
//               id="mobile-stepper"
//               activeStep={activeStep}
//               alternativeLabel
//               sx={{ display: { sm: 'flex', md: 'none' } }}
//             >
//               {steps.map((label) => (
//                 <Step
//                   sx={{
//                     ':first-child': { pl: 0 },
//                     ':last-child': { pr: 0 },
//                     '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
//                   }}
//                   key={label}
//                 >
//                   <StepLabel
//                     sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
//                   >
//                     {label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//             {activeStep === steps.length ? (
//               <Stack spacing={2} useFlexGap>
//                 <Typography variant="h1">📦</Typography>
//                 <Typography variant="h5">Thank you for your order!</Typography>
//                 <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//                   Your order number is
//                   <strong>&nbsp;#140396</strong>. We have emailed your order
//                   confirmation and will update you once its shipped.
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
//                 >
//                   Go to my orders
//                 </Button>
//               </Stack>
//             ) : (
//               <React.Fragment>
//                 {getStepContent(activeStep)}
//                 <Box
//                   sx={[
//                     {
//                       display: 'flex',
//                       flexDirection: { xs: 'column-reverse', sm: 'row' },
//                       alignItems: 'end',
//                       flexGrow: 1,
//                       gap: 1,
//                       pb: { xs: 12, sm: 0 },
//                       mt: { xs: 2, sm: 0 },
//                       mb: '60px',
//                     },
//                     activeStep !== 0
//                       ? { justifyContent: 'space-between' }
//                       : { justifyContent: 'flex-end' },
//                   ]}
//                 >
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="text"
//                       sx={{ display: { xs: 'none', sm: 'flex' } }}
//                     >
//                       Previous
//                     </Button>
//                   )}
//                   {activeStep !== 0 && (
//                     <Button
//                       startIcon={<ChevronLeftRoundedIcon />}
//                       onClick={handleBack}
//                       variant="outlined"
//                       fullWidth
//                       sx={{ display: { xs: 'flex', sm: 'none' } }}
//                     >
//                       Previous
//                     </Button>
//                   )}
//                   <Button
//                     variant="contained"
//                     endIcon={<ChevronRightRoundedIcon />}
//                     onClick={handleNext}
//                     sx={{ width: { xs: '100%', sm: 'fit-content' } }}
//                   >
//                     {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
//                   </Button>
//                 </Box>
//               </React.Fragment>
//             )}
//           </Box>
//         </Grid>
//       </Grid>
//     </AppTheme>
//   );
// }
