
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { labelStyle, inputStyle } from "./Styles";

export default function LoginForm({ role, setErrorMessage, setOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const history = useHistory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data) => {
    try {
      if (role !== "admin") {
        setErrorMessage("Rôle non supporté pour la connexion.");
        setOpen(true);
        return;
      }

      const response = await axios.post("http://localhost:5000/api/login-admin", {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("role", "admin");

        if (remember) {
          localStorage.setItem("persistentToken", response.data.token);
        } else {
          localStorage.removeItem("persistentToken");
        }

        history.push("/admin-dashboard"); 
      }
    } catch (error) {
      const message = error.response?.data?.message || "Erreur lors de la connexion.";
      setErrorMessage(message);
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box height={35} />
      <Box textAlign="center" mb={3}>
        <Avatar sx={{ bgcolor: "#fefbf2", margin: "0 auto", mb: 1 }}>
          <LockOutlinedIcon sx={{ color: "#FECDDC" }} />
        </Avatar>
        <Typography variant="h5" component="h1" sx={{ color: "#16206d" }}>
          Connexion
        </Typography>
      </Box>
      <Box
        component="form"
        action="/api/login-admin"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 2, px: { xs: 2, sm: 6 } }}
        autoComplete={remember ? "on" : "off"}
        data-form-type="login"
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
                  name="email"
                  type="email"
                  size="small"
                  fullWidth
                  placeholder="exemple@exemple.com"
                  autoComplete={remember ? "email" : "off"}
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
            <FormLabel htmlFor="password" required sx={labelStyle}>
              Mot de passe
            </FormLabel>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Ce champ est requis",
              }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  size="small"
                  fullWidth
                  placeholder="********"
                  autoComplete={remember ? "current-password" : "off"}
                  sx={{ ...inputStyle, mb: 1 }}
                  error={!!errors.password}
                  aria-describedby="password-error"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleShowPassword}
                        edge="end"
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              )}
            />
            <FormHelperText id="password-error" error>
              {errors.password?.message}
            </FormHelperText>
          </Grid>
          <Grid sx={{ width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    aria-label="Se souvenir de moi"
                  />
                }
                label="Se souvenir de moi"
                sx={{ color: "#16206d" }}
              />
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  mt: "10px",
                  color: "#16206d",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => history.push("/reset-password")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && history.push("/reset-password")}
              >
                Mot de passe oublié ?
              </Typography>
            </Stack>
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
              aria-label="Se connecter"
            >
              Se connecter
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
              <span>Pas encore inscrit ?</span>
              <span
                style={{
                  color: "#16206d",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => history.push("/register")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && history.push("/register")}
              >
                Créer un compte
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
// code mrigel avant dash
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Stack from "@mui/material/Stack";
// import FormLabel from "@mui/material/FormLabel";
// import FormHelperText from "@mui/material/FormHelperText";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import { labelStyle, inputStyle } from "./Styles";

// export default function LoginForm({ role, setErrorMessage, setOpen }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const history = useHistory();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const toggleShowPassword = () => setShowPassword((prev) => !prev);

//   const onSubmit = async (data) => {
//     try {
//       if (role !== "admin") {
//         setErrorMessage("Rôle non supporté pour la connexion.");
//         setOpen(true);
//         return;
//       }

//       const response = await axios.post("http://localhost:5000/api/login-admin", {
//         email: data.email,
//         password: data.password,
//       });

//       if (response.status === 200) {
//         // Stocker le token et les informations de l'utilisateur
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         localStorage.setItem("role", "admin");

//         // Si "Se souvenir de moi" est coché, stocker pour persistance
//         if (remember) {
//           localStorage.setItem("persistentToken", response.data.token);
//         } else {
//           localStorage.removeItem("persistentToken");
//         }

//         // Rediriger vers le tableau de bord admin
//         history.push("/dashboard"); // Changé de /admin-dashboard à /dashboard
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || "Erreur lors de la connexion.";
//       setErrorMessage(message);
//       setOpen(true);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box height={35} />
//       <Box textAlign="center" mb={3}>
//         <Avatar sx={{ bgcolor: "#fefbf2", margin: "0 auto", mb: 1 }}>
//           <LockOutlinedIcon sx={{ color: "#FECDDC" }} />
//         </Avatar>
//         <Typography variant="h5" component="h1" sx={{ color: "#16206d" }}>
//           Connexion
//         </Typography>
//       </Box>
//       <Box
//         component="form"
//         action="/api/login-admin"
//         method="POST"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ mt: 2, px: { xs: 2, sm: 6 } }}
//         autoComplete={remember ? "on" : "off"}
//         data-form-type="login"
//       >
//         <Grid container spacing={3}>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="email" required sx={labelStyle}>
//               Adresse email
//             </FormLabel>
//             <Controller
//               name="email"
//              過程中
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//                 pattern: {
//                   value: /^\S+@\S+\.\S+$/,
//                   message: "Email invalide",
//                 },
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="email"
//                   name="email"
//                   type="email"
//                   size="small"
//                   fullWidth
//                   placeholder="exemple@exemple.com"
//                   autoComplete={remember ? "email" : "off"}
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.email}
//                   aria-describedby="email-error"
//                 />
//               )}
//             />
//             <FormHelperText id="email-error" error>
//               {errors.email?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="password" required sx={labelStyle}>
//               Mot de passe
//             </FormLabel>
//             <Controller
//               name="password"
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   size="small"
//                   fullWidth
//                   placeholder="********"
//                   autoComplete={remember ? "current-password" : "off"}
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.password}
//                   aria-describedby="password-error"
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={toggleShowPassword}
//                         edge="end"
//                         aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               )}
//             />
//             <FormHelperText id="password-error" error>
//               {errors.password?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Stack direction="row" justifyContent="space-between" mb={2}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={remember}
//                     onChange={() => setRemember(!remember)}
//                     aria-label="Se souvenir de moi"
//                   />
//                 }
//                 label="Se souvenir de moi"
//                 sx={{ color: "#16206d" }}
//               />
//               <Typography
//                 variant="body2"
//                 sx={{
//                   cursor: "pointer",
//                   mt: "10px",
//                   color: "#16206d",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/reset-password")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/reset-password")}
//               >
//                 Mot de passe oublié ?
//               </Typography>
//             </Stack>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "#FECDDC",
//                 color: "#16206d",
//                 borderRadius: "40px",
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
//                 textTransform: "none",
//                 mb: 3,
//                 "&:hover": {
//                   backgroundColor: "#fdb2c8",
//                   boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
//                 },
//                 "&:focus": {
//                   outline: "2px solid #16206d",
//                   outlineOffset: "2px",
//                 },
//               }}
//               aria-label="Se connecter"
//             >
//               Se connecter
//             </Button>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Typography
//               align="center"
//               sx={{
//                 color: "#16206d",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//               }}
//             >
//               <span>Pas encore inscrit ?</span>
//               <span
//                 style={{
//                   color: "#16206d",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/register")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/register")}
//               >
//                 Créer un compte
//               </span>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }


















// code mrigel mais avant dashboard admin 

// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Stack from "@mui/material/Stack";
// import FormLabel from "@mui/material/FormLabel";
// import FormHelperText from "@mui/material/FormHelperText";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import { labelStyle, inputStyle } from "./Styles";

// export default function LoginForm({ role, setErrorMessage, setOpen }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);
//   const history = useHistory();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const toggleShowPassword = () => setShowPassword((prev) => !prev);

//   const onSubmit = async (data) => {
//     try {
//       if (role !== "admin") {
//         setErrorMessage("Rôle non supporté pour la connexion.");
//         setOpen(true);
//         return;
//       }

//       const response = await axios.post("http://localhost:5000/api/login-admin", {
//         email: data.email,
//         password: data.password,
//       });

//       if (response.status === 200) {
//         // Stocker le token et les informations de l'utilisateur
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         localStorage.setItem("role", "admin");

//         // Si "Se souvenir de moi" est coché, stocker pour persistance
//         if (remember) {
//           localStorage.setItem("persistentToken", response.data.token);
//         } else {
//           localStorage.removeItem("persistentToken");
//         }

//         // Rediriger vers le tableau de bord admin
//         history.push("/admin-dashboard");
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || "Erreur lors de la connexion.";
//       setErrorMessage(message);
//       setOpen(true);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box height={35} />
//       <Box textAlign="center" mb={3}>
//         <Avatar sx={{ bgcolor: "#fefbf2", margin: "0 auto", mb: 1 }}>
//           <LockOutlinedIcon sx={{ color: "#FECDDC" }} />
//         </Avatar>
//         <Typography variant="h5" component="h1" sx={{ color: "#16206d" }}>
//           Connexion
//         </Typography>
//       </Box>
//       <Box
//         component="form"
//         action="/api/login-admin"
//         method="POST"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ mt: 2, px: { xs: 2, sm: 6 } }}
//         autoComplete={remember ? "on" : "off"}
//         data-form-type="login"
//       >
//         <Grid container spacing={3}>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="email" required sx={labelStyle}>
//               Adresse email
//             </FormLabel>
//             <Controller
//               name="email"
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//                 pattern: {
//                   value: /^\S+@\S+\.\S+$/,
//                   message: "Email invalide",
//                 },
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="email"
//                   name="email"
//                   type="email"
//                   size="small"
//                   fullWidth
//                   placeholder="exemple@exemple.com"
//                   autoComplete={remember ? "email" : "off"}
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.email}
//                   aria-describedby="email-error"
//                 />
//               )}
//             />
//             <FormHelperText id="email-error" error>
//               {errors.email?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="password" required sx={labelStyle}>
//               Mot de passe
//             </FormLabel>
//             <Controller
//               name="password"
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   size="small"
//                   fullWidth
//                   placeholder="********"
//                   autoComplete={remember ? "current-password" : "off"}
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.password}
//                   aria-describedby="password-error"
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={toggleShowPassword}
//                         edge="end"
//                          aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
// >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               )}
//             />
//             <FormHelperText id="password-error" error>
//               {errors.password?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Stack direction="row" justifyContent="space-between" mb={2}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={remember}
//                     onChange={() => setRemember(!remember)}
//                     aria-label="Se souvenir de moi"
//                   />
//                 }
//                 label="Se souvenir de moi"
//                 sx={{ color: "#16206d" }}
//               />
//               <Typography
//                 variant="body2"
//                 sx={{
//                   cursor: "pointer",
//                   mt: "10px",
//                   color: "#16206d",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/reset-password")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/reset-password")}
//               >
//                 Mot de passe oublié ?
//               </Typography>
//             </Stack>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "#FECDDC",
//                 color: "#16206d",
//                 borderRadius: "40px",
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
//                 textTransform: "none",
//                 mb: 3,
//                 "&:hover": {
//                   backgroundColor: "#fdb2c8",
//                   boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
//                 },
//                 "&:focus": {
//                   outline: "2px solid #16206d",
//                   outlineOffset: "2px",
//                 },
//               }}
//               aria-label="Se connecter"
//             >
//               Se connecter
//             </Button>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Typography
//               align="center"
//               sx={{
//                 color: "#16206d",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//               }}
//             >
//               <span>Pas encore inscrit ?</span>
//               <span
//                 style={{
//                   color: "#16206d",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/register")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/register")}
//               >
//                 Créer un compte
//               </span>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }















//aprés backend et avant souvenir moi 

// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Stack from "@mui/material/Stack";
// import FormLabel from "@mui/material/FormLabel";
// import FormHelperText from "@mui/material/FormHelperText";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { Controller, useFormContext } from "react-hook-form";
// import axios from "axios";
// import { labelStyle, inputStyle } from "./Styles";

// export default function LoginForm({ handleSubmitForm, role, setErrorMessage }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const history = useHistory();
//   const [remember, setRemember] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useFormContext();

//   const toggleShowPassword = () => setShowPassword((prev) => !prev);

//   const onSubmit = async (data) => {
//     try {
//       if (role !== "admin") {
//         setErrorMessage("Rôle non supporté pour la connexion.");
//         handleSubmitForm(data, { preventDefault: () => {} });
//         return;
//       }

//       const response = await axios.post("http://localhost:5000/api/login-admin", {
//         email: data.email,
//         password: data.password,
//       });

//       if (response.status === 200) {
//         // Stocker le token et les informations de l'utilisateur
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         localStorage.setItem("role", "admin");

//         // Rediriger vers le tableau de bord admin
//         history.push("/admin-dashboard");
//       }
//     } catch (error) {
//       const message = error.response?.data?.message || "Erreur lors de la connexion.";
//       setErrorMessage(message);
//       handleSubmitForm(data, { preventDefault: () => {} });
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box height={35} />
//       <Box textAlign="center" mb={3}>
//         <Avatar sx={{ bgcolor: "#fefbf2", margin: "0 auto", mb: 1 }}>
//           <LockOutlinedIcon sx={{ color: "#FECDDC" }} />
//         </Avatar>
//         <Typography variant="h5" component="h1" sx={{ color: "#16206d" }}>
//           Connexion
//         </Typography>
//       </Box>
//       <Box
//         component="form"
//         noValidate
//         autoComplete="off"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ mt: 2, px: { xs: 2, sm: 6 } }}
//       >
//         <Grid container spacing={3}>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="email" required sx={labelStyle}>
//               Adresse email
//             </FormLabel>
//             <Controller
//               name="email"
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//                 pattern: {
//                   value: /^\S+@\S+\.\S+$/,
//                   message: "Email invalide",
//                 },
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="email"
//                   type="email"
//                   size="small"
//                   fullWidth
//                   placeholder="exemple@exemple.com"
//                   autoComplete="email"
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.email}
//                   aria-describedby="email-error"
//                 />
//               )}
//             />
//             <FormHelperText id="email-error" error>
//               {errors.email?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="password" required sx={labelStyle}>
//               Mot de passe
//             </FormLabel>
//             <Controller
//               name="password"
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   size="small"
//                   fullWidth
//                   placeholder="********"
//                   autoComplete="current-password"
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.password}
//                   aria-describedby="password-error"
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={toggleShowPassword}
//                         edge="end"
//                         aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               )}
//             />
//             <FormHelperText id="password-error" error>
//               {errors.password?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Stack direction="row" justifyContent="space-between" mb={2}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={remember}
//                     onChange={() => setRemember(!remember)}
//                     aria-label="Se souvenir de moi"
//                   />
//                 }
//                 label="Se souvenir de moi"
//                 sx={{ color: "#16206d" }}
//               />
//               <Typography
//                 variant="body2"
//                 sx={{
//                   cursor: "pointer",
//                   mt: "10px",
//                   color: "#16206d",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/reset-password")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/reset-password")}
//               >
//                 Mot de passe oublié ?
//               </Typography>
//             </Stack>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "#FECDDC",
//                 color: "#16206d",
//                 borderRadius: "40px",
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
//                 textTransform: "none",
//                 mb: 3,
//                 "&:hover": {
//                   backgroundColor: "#fdb2c8",
//                   boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
//                 },
//                 "&:focus": {
//                   outline: "2px solid #16206d",
//                   outlineOffset: "2px",
//                 },
//               }}
//               aria-label="Se connecter"
//             >
//               Se connecter
//             </Button>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Typography
//               align="center"
//               sx={{
//                 color: "#16206d",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//               }}
//             >
//               <span>Pas encore inscrit ?</span>
//               <span
//                 style={{
//                   color: "#16206d",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/register")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/register")}
//               >
//                 Créer un compte
//               </span>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }

















//avant backend

// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Stack from "@mui/material/Stack";
// import FormLabel from "@mui/material/FormLabel";
// import FormHelperText from "@mui/material/FormHelperText";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { Controller, useFormContext } from "react-hook-form";
// import { labelStyle, inputStyle } from "./Styles";

// export default function LoginForm({ handleSubmitForm }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const history = useHistory();
//   const [remember, setRemember] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useFormContext();

//   const toggleShowPassword = () => setShowPassword((prev) => !prev);

//   return (
//     <Container maxWidth="sm">
//       <Box height={35} />
//       <Box textAlign="center" mb={3}>
//         <Avatar sx={{ bgcolor: "#fefbf2", margin: "0 auto", mb: 1 }}>
//           <LockOutlinedIcon sx={{ color: "#FECDDC" }} />
//         </Avatar>
//         <Typography variant="h5" component="h1" sx={{ color: "#16206d" }}>
//           Connexion
//         </Typography>
//       </Box>
//       <Box
//         component="form"
//         noValidate
//         autoComplete="off"
//         onSubmit={handleSubmit(handleSubmitForm)}
//         sx={{ mt: 2, px: { xs: 2, sm: 6 } }}
//       >
//         <Grid container spacing={3}>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="email" required sx={labelStyle}>
//               Adresse email
//             </FormLabel>
//             <Controller
//               name="email"
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//                 pattern: {
//                   value: /^\S+@\S+\.\S+$/,
//                   message: "Email invalide",
//                 },
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="email"
//                   type="email"
//                   size="small"
//                   fullWidth
//                   placeholder="exemple@exemple.com"
//                   autoComplete="email"
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.email}
//                   aria-describedby="email-error"
//                 />
//               )}
//             />
//             <FormHelperText id="email-error" error>
//               {errors.email?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <FormLabel htmlFor="password" required sx={labelStyle}>
//               Mot de passe
//             </FormLabel>
//             <Controller
//               name="password"
//               control={control}
//               rules={{
//                 required: "Ce champ est requis",
//               }}
//               render={({ field }) => (
//                 <OutlinedInput
//                   {...field}
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   size="small"
//                   fullWidth
//                   placeholder="********"
//                   autoComplete="current-password"
//                   sx={{ ...inputStyle, mb: 1 }}
//                   error={!!errors.password}
//                   aria-describedby="password-error"
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={toggleShowPassword}
//                         edge="end"
//                         aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               )}
//             />
//             <FormHelperText id="password-error" error>
//               {errors.password?.message}
//             </FormHelperText>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Stack direction="row" justifyContent="space-between" mb={2}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={remember}
//                     onChange={() => setRemember(!remember)}
//                     aria-label="Se souvenir de moi"
//                   />
//                 }
//                 label="Se souvenir de moi"
//                 sx={{ color: "#16206d" }}
//               />
//               <Typography
//                 variant="body2"
//                 sx={{
//                   cursor: "pointer",
//                   mt: "10px",
//                   color: "#16206d",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/reset-password")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/reset-password")}
//               >
//                 Mot de passe oublié ?
//               </Typography>
//             </Stack>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "#FECDDC",
//                 color: "#16206d",
//                 borderRadius: "40px",
//                 fontWeight: "bold",
//                 fontSize: "16px",
//                 boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
//                 textTransform: "none",
//                 mb: 3,
//                 "&:hover": {
//                   backgroundColor: "#fdb2c8",
//                   boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
//                 },
//                 "&:focus": {
//                   outline: "2px solid #16206d",
//                   outlineOffset: "2px",
//                 },
//               }}
//               aria-label="Se connecter"
//             >
//               Se connecter
//             </Button>
//           </Grid>
//           <Grid sx={{ width: "100%" }}>
//             <Typography
//               align="center"
//               sx={{
//                 color: "#16206d",
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//               }}
//             >
//               <span>Pas encore inscrit ?</span>
//               <span
//                 style={{
//                   color: "#16206d",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   "&:hover": { textDecoration: "underline" },
//                 }}
//                 onClick={() => history.push("/register")}
//                 role="link"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && history.push("/register")}
//               >
//                 Créer un compte
//               </span>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// }