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
  formContainerStyle,
} from "../Styles";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";
import FaceDetectionBox from "./FaceDetectionBox";

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
          {errorMessage ||
            "Échec ! Entrez un nom d'utilisateur et un mot de passe corrects."}
        </Alert>
      </Snackbar>
      <div style={backgroundStyle}>
        <Box sx={boxstyle}>
          <Grid container sx={{ height: "100%" }}>
            <Grid
              sx={{
                width: { xs: "100%", sm: "50%", md: "50%" },
                backgroundColor: "#000000",
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                justifyContent: "center",
                borderTopLeftRadius: "16px",
                borderBottomLeftRadius: "16px",
                overflow: "hidden",
              }}
            >
              <FaceDetectionBox
                setErrorMessage={setErrorMessage}
                setOpen={setOpen}
              />
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
