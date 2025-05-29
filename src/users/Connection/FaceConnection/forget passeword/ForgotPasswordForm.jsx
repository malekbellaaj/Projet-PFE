import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useHistory } from "react-router-dom";
import { Controller, useFormContext } from "react-hook-form";
import { labelStyle, inputStyle } from "../Styles";

export default function ForgotPasswordForm({ handleSubmitForm }) {
  const history = useHistory();
  const { control, handleSubmit, formState: { errors } } = useFormContext();

  return (
    <Container maxWidth="sm">
      <Box height={35} />
      <Box textAlign="center" mb={3}>
        <Avatar sx={{ bgcolor: "#fefbf2", margin: "0 auto", mb: 1 }}>
          <LockOutlinedIcon sx={{ color: "#FECDDC" }} />
        </Avatar>
        <Typography variant="h5" component="h1" sx={{ color: "#16206d" }}>
          Mot de passe oublié
        </Typography>
      </Box>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSubmitForm)}
        sx={{ mt: 2, px: { xs: 2, sm: 6 } }}
      >
        <Grid container spacing={3}>
          <Grid sx={{ width: "100%" }}>
            <FormLabel htmlFor="email" required sx={labelStyle}>
              Adresse email
            </FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Ce champ est requis",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email invalide",
                },
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="email"
                  type="email"
                  size="small"
                  fullWidth
                  placeholder="exemple@exemple.com"
                  autoComplete="email"
                  sx={{ ...inputStyle, mb: 1 }}
                  error={!!errors.email}
                  aria-describedby="email-error"
                />
              )}
            />
            <FormHelperText id="email-error" error>
              {errors.email?.message}
            </FormHelperText>
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#FECDDC",
                color: "#16206d",
                borderRadius: "40px",
                fontWeight: "bold",
                fontSize: "16px",
                boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                textTransform: "none",
                mb: 3,
                "&:hover": {
                  backgroundColor: "#fdb2c8",
                  boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                },
                "&:focus": {
                  outline: "2px solid #16206d",
                  outlineOffset: "2px",
                },
              }}
              aria-label="Envoyer le lien de réinitialisation"
            >
              Envoyer le lien de réinitialisation
            </Button>
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Typography
              align="center"
              sx={{
                color: "#16206d",
                display: "flex",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>Se connecter à votre compte</span>
              <span
                style={{
                  color: "#16206d",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => history.push("/")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && history.push("/")}
              >
                Connexion
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}