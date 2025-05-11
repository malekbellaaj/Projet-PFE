import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { ThemeProvider } from "@mui/material/styles";
import { useState, forwardRef } from "react";
import {
  theme,
  boxstyle,
  backgroundStyle,
  imageBoxStyle,
  formContainerStyle,
} from "./Styles";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const vertical = "top";
  const horizontal = "right";
  const location = useLocation();
  const role = location.state?.role || "unknown";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage || "Échec ! Entrez un nom d'utilisateur et un mot de passe corrects."}
        </Alert>
      </Snackbar>
      <div style={backgroundStyle}>
        <Box sx={boxstyle}>
          <Grid container sx={{ height: "100%" }}>
            <Grid
              sx={{
                width: { xs: "100%", sm: "50%", md: "50%" },
                backgroundColor: "#fefbf2",
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: "16px",
                borderBottomLeftRadius: "16px",
                overflow: "hidden",
              }}
              aria-hidden="true"
            >
              <Box style={imageBoxStyle} />
            </Grid>
            <Grid
              sx={{
                width: { xs: "100%", sm: "50%", md: "50%" },
                height: "100%",
              }}
            >
              <Box style={formContainerStyle}>
                <LoginForm
                  role={role}
                  setErrorMessage={setErrorMessage}
                  setOpen={setOpen}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}





















// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";
// import { ThemeProvider } from "@mui/material/styles";
// import { useState, forwardRef } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import {
//   theme,
//   boxstyle,
//   backgroundStyle,
//   imageBoxStyle,
//   formContainerStyle,
// } from "./Styles";
// import LoginForm from "./LoginForm";
// import { useLocation } from "react-router-dom";

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function Login() {
//   const [open, setOpen] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const vertical = "top";
//   const horizontal = "right";
//   const location = useLocation();
//   const role = location.state?.role || "unknown";

//   const methods = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const handleSubmitForm = async (data, event) => {
//     event.preventDefault();
//     setOpen(true);
//     setErrorMessage(""); // Réinitialiser le message d'erreur
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setOpen(false);
//   };

//   function TransitionLeft(props) {
//     return <Slide {...props} direction="left" />;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <FormProvider {...methods}>
//         <Snackbar
//           open={open}
//           autoHideDuration={3000}
//           onClose={handleClose}
//           TransitionComponent={TransitionLeft}
//           anchorOrigin={{ vertical, horizontal }}
//         >
//           <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
//             {errorMessage || "Échec ! Entrez un nom d'utilisateur et un mot de passe corrects."}
//           </Alert>
//         </Snackbar>
//         <div style={backgroundStyle}>
//           <Box sx={boxstyle}>
//             <Grid container sx={{ height: "100%" }}>
//               <Grid
//                 sx={{
//                   width: { xs: "100%", sm: "50%", md: "50%" },
//                   backgroundColor: "#fefbf2",
//                   display: { xs: "none", sm: "flex" },
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderTopLeftRadius: "16px",
//                   borderBottomLeftRadius: "16px",
//                   overflow: "hidden",
//                 }}
//                 aria-hidden="true"
//               >
//                 <Box style={imageBoxStyle} />
//               </Grid>
//               <Grid
//                 sx={{
//                   width: { xs: "100%", sm: "50%", md: "50%" },
//                   height: "100%",
//                 }}
//               >
//                 <Box style={formContainerStyle}>
//                   <LoginForm handleSubmitForm={handleSubmitForm} role={role} setErrorMessage={setErrorMessage} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </div>
//       </FormProvider>
//     </ThemeProvider>
//   );
// }










//avant backend


// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Snackbar from "@mui/material/Snackbar";
// import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";
// import { ThemeProvider } from "@mui/material/styles";
// import { useState, forwardRef } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import {
//   theme,
//   boxstyle,
//   backgroundStyle,
//   imageBoxStyle,
//   formContainerStyle,
// } from "./Styles";
// import LoginForm from "./LoginForm";

// const Alert = forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// export default function Login() {
//   const [open, setOpen] = useState(false);
//   const vertical = "top";
//   const horizontal = "right";

//   const methods = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const handleSubmitForm = async (data, event) => {
//     event.preventDefault();
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setOpen(false);
//   };

//   function TransitionLeft(props) {
//     return <Slide {...props} direction="left" />;
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <FormProvider {...methods}>
//         <Snackbar
//           open={open}
//           autoHideDuration={3000}
//           onClose={handleClose}
//           TransitionComponent={TransitionLeft}
//           anchorOrigin={{ vertical, horizontal }}
//         >
//           <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
//             Échec ! Entrez un nom d'utilisateur et un mot de passe corrects.
//           </Alert>
//         </Snackbar>
//         <div style={backgroundStyle}>
//           <Box sx={boxstyle}>
//             <Grid container sx={{ height: "100%" }}>
//               <Grid
//                 sx={{
//                   width: { xs: "100%", sm: "50%", md: "50%" },
//                   backgroundColor: "#fefbf2",
//                   display: { xs: "none", sm: "flex" },
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderTopLeftRadius: "16px",
//                   borderBottomLeftRadius: "16px",
//                   overflow: "hidden", // pour que l'image respecte les coins
//                 }}
//                 aria-hidden="true" // Accessibilité : indiquer que cette section est décorative
//               >
//                 <Box style={imageBoxStyle} />
//               </Grid>
//               <Grid
//                 sx={{
//                   width: { xs: "100%", sm: "50%", md: "50%" },
//                   height: "100%",
//                 }}
//               >
//                 <Box style={formContainerStyle}>
//                   <LoginForm handleSubmitForm={handleSubmitForm} />
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         </div>
//       </FormProvider>
//     </ThemeProvider>
//   );
// }
