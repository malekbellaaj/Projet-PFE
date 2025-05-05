import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Grid,
  Box,
  // Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Card,
  CardContent,
  Stack,
  CssBaseline,
  Alert,
} from "@mui/material";
import { Button } from "../../../common/Button";
import AddressForm from "./components/AddressForm";
import Info from "./components/Info";
import InfoMobile from "./components/InfoMobile";
import Review from "./components/Review";
import TeacherFormLogos from "./components/TeacherFormLogos";
import AppTheme from "../shared-theme/AppTheme";
import axios from "axios";
import { useHistory } from "react-router-dom";

const btnImage1 = require("../../assets/btnForm1.png");
const btnImage2 = require("../../assets/btnForm2.png");
const btnImage3 = require("../../assets/btnForm3.png");

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

export default function AllAboutForm(props) {
  const navigate = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      teacherName: "",
      matricule: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      cv: null,
      acceptTerms: false,
      speciality: [], // Initialisé comme tableau vide
    },
  });

  const handleNext = async () => {
    setErrorMessage(""); // Réinitialiser les erreurs
    if (activeStep === 0) {
      const valid = await methods.trigger();
      if (!valid) return;
    }

    if (activeStep === steps.length - 1) {
      const formData = new FormData();
      const values = methods.getValues();

      // Ajouter les champs au FormData
      formData.append("teacherName", values.teacherName);
      formData.append("matricule", values.matricule);
      formData.append("speciality", JSON.stringify(values.speciality));
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("acceptTerms", values.acceptTerms.toString());
      if (values.cv) {
        formData.append("cv", values.cv);
      }

      try {
        const response = await axios.post("/api/register-teacher", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          console.log("Inscription réussie :", response.data);
          setActiveStep(activeStep + 1); // Passe à l'écran de confirmation
        }
      } catch (error) {
        const message =
          error.response?.data?.message || "Erreur lors de l'inscription.";
        setErrorMessage(message);
        console.error("Erreur réseau ou serveur :", error);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <AppTheme {...props}>
      <CssBaseline />
      <FormProvider {...methods}>
        <Grid
          container
          sx={{
            height: {
              xs: "100%",
              sm: "calc(100dvh - var(--template-frame-height, 0px))",
            },
            mt: { xs: 4, sm: 0 },
          }}
        >
          <Grid size={{ xs: 12, sm: 5, lg: 4 }} sx={leftColumnStyle}>
            <TeacherFormLogos />
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

          <Grid size={{ sm: 12, md: 7, lg: 8 }} sx={rightColumnStyle}>
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
                <Stepper
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
                    onClick={() => navigate.push("/")}
                    imageSrc={btnImage2}
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
                  {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {errorMessage}
                    </Alert>
                  )}
                  {getStepContent(activeStep, methods.getValues())}
                  <Box sx={actionBoxStyle(activeStep)}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        imageSrc={btnImage3}
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        {"< Précédent"}
                      </Button>
                    )}

                    <Button
                      onClick={handleNext}
                      imageSrc={btnImage1}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                    >
                      {activeStep === steps.length - 1
                        ? "Valider >"
                        : "Suivant >"}
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

const leftColumnStyle = {
  display: { xs: "none", md: "flex" },
  flexDirection: "column",
  backgroundColor: "background.paper",
  borderRight: { sm: "none", md: "2px solid" },
  borderColor: { sm: "none", md: "divider" },
  alignItems: "center",
  pt: 5,
  px: 5,
  gap: 4,
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

// import * as React from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import {
//   Grid,
//   Box,
//   Stepper,
//   Step,
//   StepLabel,
//   Typography,
//   Card,
//   CardContent,
//   Stack,
//   CssBaseline,
//   Alert,
// } from "@mui/material";
// import { Button } from "../../../common/Button";
// import AddressForm from "./components/AddressForm";
// import Info from "./components/Info";
// import InfoMobile from "./components/InfoMobile";
// import Review from "./components/Review";
// import TeacherFormLogos from "./components/TeacherFormLogos";
// import AppTheme from "../shared-theme/AppTheme";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const btnImage1 = require("../../assets/btnForm1.png");
// const btnImage2 = require("../../assets/btnForm2.png");
// const btnImage3 = require("../../assets/btnForm3.png");

// const steps = ["Informations de l’enseignant", "Vérification"];

// function getStepContent(step, formValues) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <Review formData={formValues} />;
//     default:
//       throw new Error("Étape inconnue");
//   }
// }

// export default function AllAboutForm(props) {
//   const navigate = useHistory();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [errorMessage, setErrorMessage] = React.useState("");
//   const methods = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       teacherName: "",
//       matricule: "",
//       phone: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       cv: null,
//       acceptTerms: false,
//     },
//   });

//   const handleNext = async () => {
//     setErrorMessage("");
//     if (activeStep === 0) {
//       const valid = await methods.trigger();
//       if (!valid) return;
//     }

//     if (activeStep === steps.length - 1) {
//       const formData = new FormData();
//       const values = methods.getValues();

//       formData.append("teacherName", values.teacherName);
//       formData.append("matricule", values.matricule);
//       formData.append("phone", values.phone);
//       formData.append("email", values.email);
//       formData.append("password", values.password);
//       formData.append("acceptTerms", values.acceptTerms.toString());
//       if (values.cv) {
//         formData.append("cv", values.cv);
//       }

//       try {
//         const response = await axios.post("/api/register-teacher", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         if (response.status === 201) {
//           console.log("Inscription réussie :", response.data);
//           setActiveStep(activeStep + 1);
//         }
//       } catch (error) {
//         const message =
//           error.response?.data?.message || "Erreur lors de l'inscription.";
//         setErrorMessage(message);
//         console.error("Erreur réseau ou serveur :", error);
//       }
//     } else {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   const handleBack = () => setActiveStep((prev) => prev - 1);

//   return (
//     <AppTheme {...props}>
//       <CssBaseline />
//       <FormProvider {...methods}>
//         <Grid
//           container
//           sx={{
//             height: {
//               xs: "100%",
//               sm: "calc(100dvh - var(--template-frame-height, 0px))",
//             },
//             mt: { xs: 4, sm: 0 },
//           }}
//         >
//           <Grid size={{ xs: 12, sm: 5, lg: 4 }} sx={leftColumnStyle}>
//             <TeacherFormLogos />
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 flexGrow: 1,
//                 width: "100%",
//                 maxWidth: 500,
//               }}
//             >
//               <Info />
//             </Box>
//           </Grid>

//           <Grid size={{ sm: 12, md: 7, lg: 8 }} sx={rightColumnStyle}>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: { sm: "space-between", md: "flex-end" },
//                 alignItems: "center",
//                 width: "100%",
//                 maxWidth: { sm: "100%", md: 900 }, // Increased maxWidth
//               }}
//             >
//               <Box
//                 sx={{
//                   display: { xs: "none", md: "flex" },
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   alignItems: "flex-end",
//                   flexGrow: 1,
//                 }}
//               >
//                 <Stepper
//                   activeStep={activeStep}
//                   sx={{ width: "100%", height: 40 }}
//                 >
//                   {steps.map((label) => (
//                     <Step key={label}>
//                       <StepLabel>{label}</StepLabel>
//                     </Step>
//                   ))}
//                 </Stepper>
//               </Box>
//             </Box>

//             <Card sx={{ display: { xs: "flex", md: "none" }, width: "80%" }}>
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   width: "100%",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Typography>Bienvenue sur Altus</Typography>
//                 <InfoMobile />
//               </CardContent>
//             </Card>

//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 flexGrow: 1,
//                 width: "100%",
//                 maxWidth: { sm: "100%", md: 900 }, // Increased maxWidth
//                 overflow: "auto", // Allow scrolling if content overflows
//                 gap: { xs: 5, md: "none" },
//               }}
//             >
//               <Stepper
//                 alternativeLabel
//                 activeStep={activeStep}
//                 sx={{ display: { sm: "flex", md: "none" } }}
//               >
//                 {steps.map((label) => (
//                   <Step key={label}>
//                     <StepLabel>{label}</StepLabel>
//                   </Step>
//                 ))}
//               </Stepper>

//               {activeStep === steps.length ? (
//                 <Stack spacing={2} useFlexGap>
//                   <Typography variant="h1">✅</Typography>
//                   <Typography variant="h5">
//                     Merci pour votre inscription !
//                   </Typography>
//                   <Typography variant="body1" sx={{ color: "text.secondary" }}>
//                     Vos informations ont été enregistrées avec succès. Un email
//                     de confirmation vous sera envoyé bientôt.
//                   </Typography>
//                   <Button
//                     onClick={() => navigate.push("/")}
//                     imageSrc={btnImage2}
//                     sx={{
//                       alignSelf: "start",
//                       width: { xs: "100%", sm: "auto" },
//                     }}
//                   >
//                     Retour à l’accueil
//                   </Button>
//                 </Stack>
//               ) : (
//                 <>
//                   {errorMessage && (
//                     <Alert severity="error" sx={{ mb: 2 }}>
//                       {errorMessage}
//                     </Alert>
//                   )}
//                   {getStepContent(activeStep, methods.getValues())}
//                   <Box sx={actionBoxStyle(activeStep)}>
//                     {activeStep !== 0 && (
//                       <Button
//                         onClick={handleBack}
//                         imageSrc={btnImage3}
//                         sx={{ display: { xs: "none", sm: "flex" } }}
//                       >
//                         Précédent
//                       </Button>
//                     )}

//                     <Button
//                       onClick={handleNext}
//                       imageSrc={btnImage1}
//                       sx={{ width: { xs: "100%", sm: "fit-content" } }}
//                     >
//                       {activeStep === steps.length - 1 ? "Valider" : "Suivant"}
//                     </Button>
//                   </Box>
//                 </>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </FormProvider>
//     </AppTheme>
//   );
// }

// const leftColumnStyle = {
//   display: { xs: "none", md: "flex" },
//   flexDirection: "column",
//   backgroundColor: "background.paper",
//   borderRight: { sm: "none", md: "2px solid" },
//   borderColor: { sm: "none", md: "divider" },
//   alignItems: "center",
//   pt: 5,
//   px: 5,
//   gap: 4,
// };

// const rightColumnStyle = {
//   display: "flex",
//   flexDirection: "column",
//   maxWidth: "100%",
//   width: "100%",
//   backgroundColor: { xs: "transparent", sm: "background.default" },
//   alignItems: "center",
//   pt: { xs: 0, sm: 10 },
//   px: { xs: 2, sm: 10 },
//   gap: { xs: 3, md: 5 },
// };

// const actionBoxStyle = (step) => [
//   {
//     display: "flex",
//     flexDirection: { xs: "column-reverse", sm: "row" },
//     alignItems: "end",
//     flexGrow: 1,
//     gap: 1,
//     pb: { xs: 12, sm: 0 },
//     mt: { xs: 2, sm: 0 },
//     mb: "60px",
//   },
//   step !== 0
//     ? { justifyContent: "space-between" }
//     : { justifyContent: "flex-end" },
// ];
