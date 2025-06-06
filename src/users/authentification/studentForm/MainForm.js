// frontend/src/users/authentification/studentForm/MainForm.js
import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Grid,
  Box,
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
import StudentFormLogos from "./components/StudentFormLogos";
import AppTheme from "../shared-theme/AppTheme";
import PaymentForm from "./components/PaymentForm";
import FaceDetectionForm from "./components/FaceDetectionForm";
import { useHistory } from "react-router-dom";
import axios from "axios";

const btnImage1 = require("../../assets/btnForm1.png");
const btnImage2 = require("../../assets/btnForm2.png");
const btnImage3 = require("../../assets/btnForm3.png");

const steps = [
  "Info élève",
  "Vérification",
  "Détection visage",
  "Paiement",
];

function getStepContent(step, formValues, handleFaceCapture) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review formData={formValues} />;
    case 2:
      return <FaceDetectionForm onFaceCapture={handleFaceCapture} />;
    case 3:
      return <PaymentForm />;
    default:
      throw new Error("Étape inconnue");
  }
}

export default function MainForm(props) {
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [hasCapturedFace, setHasCapturedFace] = React.useState(false);
  const [faceImage, setFaceImage] = React.useState(null);
  const [faceDescriptor, setFaceDescriptor] = React.useState(null); // Ajout pour le descripteur facial

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
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const handleNext = async () => {
    setErrorMessage(""); // Réinitialiser les erreurs
    if (activeStep === 0) {
      const valid = await methods.trigger();
      if (!valid) return;
    }

    if (activeStep === 2 && (!hasCapturedFace || !faceDescriptor)) {
      setErrorMessage("Veuillez capturer une image et un descripteur facial pour continuer.");
      return;
    }

// frontend/src/users/authentification/studentForm/MainForm.js
// Dans handleNext, avant axios.post
if (activeStep === steps.length - 1) {
  const formData = new FormData();
  const values = methods.getValues();

  // Validation des champs
  if (values.password !== values.confirmPassword) {
    setErrorMessage("Les mots de passe ne correspondent pas.");
    return;
  }

  // Ajouter les champs
  formData.append("ParentName", values.ParentName);
  formData.append("StudentName", values.StudentName);
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("studentSituation", values.studentSituation);
  formData.append("birthDate", values.birthDate);
  formData.append("schoolLevel", values.schoolLevel);
  formData.append("password", values.password);
  formData.append("acceptTerms", values.acceptTerms.toString());

  // Ajouter le faceDescriptor
  if (faceDescriptor) {
    try {
      const descriptorString = JSON.stringify(faceDescriptor);
      formData.append("faceDescriptor", descriptorString);
    } catch (error) {
      setErrorMessage("Erreur lors de la sérialisation du descripteur facial.");
      return;
    }
  } else {
    setErrorMessage("Aucun descripteur facial capturé.");
    return;
  }

  // Ajouter l'image
  if (faceImage) {
    try {
      const byteString = atob(faceImage.split(",")[1]);
      const mimeString = faceImage.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formData.append("faceImage", blob, "capture.jpg");
    } catch (error) {
      setErrorMessage("Erreur lors du traitement de l'image faciale.");
      return;
    }
  } else {
    setErrorMessage("Aucune image de visage capturée.");
    return;
  }

  // Log des données envoyées
  console.log("Données envoyées :");
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
const response = await axios.post("http://localhost:5000/api/students/register-student", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

    if (response.status === 201) {
      console.log("Inscription réussie :", response.data);
      setActiveStep(activeStep + 1);
    }
  } catch (error) {
    const message = error.response?.data?.message || "Erreur lors de l'inscription.";
    console.error("Erreur réseau :", error, error.response?.data);
    setErrorMessage(message);
  }
}
     else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleFaceCapture = ({ imageData, descriptor }) => {
    setHasCapturedFace(!!imageData && !!descriptor);
    setFaceImage(imageData);
    setFaceDescriptor(descriptor);
  };

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
            <StudentFormLogos />
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
                    onClick={() => history.push("/")}
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
                  {getStepContent(activeStep, methods.getValues(), handleFaceCapture)}
                  <Box sx={actionBoxStyle(activeStep)}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={handleBack}
                        imageSrc={btnImage3}
                        sx={{ width: "100%", display: { xs: "flex", sm: "none" } }}
                      >
                        {"< Précédent"}
                      </Button>
                    )}
                    <Button
                      onClick={handleNext}
                      imageSrc={btnImage1}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                      disabled={activeStep === 2 && !hasCapturedFace}
                    >
                      {activeStep === steps.length - 1 ? "Valider >" : "Suivant >"}
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
// import StudentFormLogos from "./components/StudentFormLogos";
// import AppTheme from "../shared-theme/AppTheme";
// import PaymentForm from "./components/PaymentForm";
// import FaceDetectionForm from "./components/FaceDetectionForm";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

// const btnImage1 = require("../../assets/btnForm1.png");
// const btnImage2 = require("../../assets/btnForm2.png");
// const btnImage3 = require("../../assets/btnForm3.png");

// const steps = [
//   "Info élève",
//   "Vérification",
//   "Détection visage",
//   "Paiement",
// ];

// function getStepContent(step, formValues, handleFaceCapture) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <Review formData={formValues} />;
//     case 2:
//       return <FaceDetectionForm onFaceCapture={handleFaceCapture} />;
//     case 3:
//       return <PaymentForm />;
//     default:
//       throw new Error("Étape inconnue");
//   }
// }

// export default function MainForm(props) {
//   const history = useHistory();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const [errorMessage, setErrorMessage] = React.useState("");
//   const [hasCapturedFace, setHasCapturedFace] = React.useState(false);
//   const [faceImage, setFaceImage] = React.useState(null);

//   const methods = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       ParentName: "",
//       StudentName: "",
//       email: "",
//       phone: "",
//       studentSituation: "",
//       birthDate: "",
//       schoolLevel: "",
//       password: "",
//       confirmPassword: "",
//       acceptTerms: false,
//     },
//   });

//   const handleNext = async () => {
//     setErrorMessage(""); // Réinitialiser les erreurs
//     if (activeStep === 0) {
//       const valid = await methods.trigger();
//       if (!valid) return;
//     }

//     if (activeStep === 2 && !hasCapturedFace) {
//       setErrorMessage("Veuillez capturer une image de votre visage pour continuer.");
//       return;
//     }

//     if (activeStep === steps.length - 1) {
//       const formData = new FormData();
//       const values = methods.getValues();

//       // Ajouter les champs au FormData
//       formData.append("ParentName", values.ParentName);
//       formData.append("StudentName", values.StudentName);
//       formData.append("email", values.email);
//       formData.append("phone", values.phone);
//       formData.append("studentSituation", values.studentSituation);
//       formData.append("birthDate", values.birthDate);
//       formData.append("schoolLevel", values.schoolLevel);
//       formData.append("password", values.password);
//       formData.append("acceptTerms", values.acceptTerms.toString());
//       // Ajouter l'image capturée
//       if (faceImage) {
//         const byteString = atob(faceImage.split(',')[1]);
//         const mimeString = faceImage.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//           ia[i] = byteString.charCodeAt(i);
//         }
//         const blob = new Blob([ab], { type: mimeString });
//         formData.append("faceImage", blob, "capture.jpg");
//       } else {
//         setErrorMessage("Aucune image de visage capturée. Veuillez revenir à l'étape Détection de visage.");
//         return;
//       }

//       try {
//         const response = await axios.post("/api/students/register-student", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         if (response.status === 201) {
//           console.log("Inscription élève réussie :", response.data);
//           setActiveStep(activeStep + 1); // Passe à l'écran de confirmation
//         }
//       } catch (error) {
//         const message =
//           error.response?.data?.message || "Erreur lors de l'inscription.";
//         setErrorMessage(message);
//         console.error("Erreur réseau ou serveur :", error);
//       }
//     } else {
//       setActiveStep((prev) => prev + 1);
//     }
//   };

//   const handleBack = () => setActiveStep((prev) => prev - 1);

//   const handleFaceCapture = (imageData) => {
//     setHasCapturedFace(!!imageData);
//     setFaceImage(imageData);
//   };

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
//             <StudentFormLogos />
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
//                 maxWidth: { sm: "100%", md: 600 },
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
//                 maxWidth: { sm: "100%", md: 800 },
//                 maxHeight: "720px",
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
//                     onClick={() => history.push("/")}
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
//                   {getStepContent(activeStep, methods.getValues(), handleFaceCapture)}
//                   <Box sx={actionBoxStyle(activeStep)}>
//                     {activeStep !== 0 && (
//                       <Button
//                         onClick={handleBack}
//                         imageSrc={btnImage3}
//                         sx={{ width: "100%", display: { xs: "flex", sm: "none" } }}
//                       >
//                         {"< Précédent"}
//                       </Button>
//                     )}
//                     <Button
//                       onClick={handleNext}
//                       imageSrc={btnImage1}
//                       sx={{ width: { xs: "100%", sm: "fit-content" } }}
//                       disabled={activeStep === 2 && !hasCapturedFace}
//                     >
//                       {activeStep === steps.length - 1 ? "Valider >" : "Suivant >"}
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
