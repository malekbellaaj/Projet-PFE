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

const steps = ["Informations de l’enseignant", "Vérification"];

function getStepContent(step, formValues) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review formData={formValues} />;
    default:
      throw new Error("Étape inconnue");
  }
}

export default function MainFormulaire(props) {
  const [activeStep, setActiveStep] = React.useState(0); //activeStep : variable d’état (React state) qui contrôle quelle étape est affichée
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      teacherName: "",
      matricule: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
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