import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import { ThemeProvider } from "@mui/material/styles";
import { useState, forwardRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { theme, boxstyle, backgroundStyle, imageBoxStyle, formContainerStyle } from "./Styles";
import ForgotPasswordForm from "./ForgotPasswordForm";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitForm = async (data, event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          TransitionComponent={TransitionLeft}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Échec ! Entrez un email valide.
          </Alert>
        </Snackbar>
        <div style={{ ...backgroundStyle, backgroundImage: 'url("/login/bg/bg2.jpg")' }}>
          <Box sx={boxstyle}>
            <Grid container sx={{ height: "100%" }}>
              <Grid
                sx={{
                  width: { xs: "100%", sm: "50%", md: "50%" },
                  backgroundColor: "#fefbf2",
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
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
                  <ForgotPasswordForm handleSubmitForm={handleSubmitForm} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </div>
      </FormProvider>
    </ThemeProvider>
  );
}