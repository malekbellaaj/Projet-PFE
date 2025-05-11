// import * as React from "react";
// import { useFormContext, Controller } from "react-hook-form"; //React Hook Form (RHF) est une bibliothèque légère et performante pour gérer les formulaires dans des applications React
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";
// import Grid from "@mui/material/Grid";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormHelperText from "@mui/material/FormHelperText";
// import { styled } from "@mui/material/styles";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import InputMask from "react-input-mask";

// // import { useState } from "react";

// // import PhoneInput from "react-phone-input-2";
// // import "react-phone-input-2/lib/material.css"; // ou .css ou .style.css selon le thème que tu veux

// const FormGrid = styled(Grid)(() => ({
//   display: "flex",
//   flexDirection: "column",
//   width: "100%", // prend toute la ligne
//   gap: "8px", // espace entre le label et l’input
// }));

// export default function AddressForm() {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   // //les variables pour l'Icône pour afficher/masquer : Partie mot de passe
//   // const [showPassword, setShowPassword] = useState(false);
//   // const toggleShowPassword = () => setShowPassword((prev) => !prev);
//   // //les variables pour l'Icône pour afficher/masquer : Partie confirmer MDP
//   // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   // const toggleShowConfirmPassword = () =>
//   //   setShowConfirmPassword((prev) => !prev);

//   return (
//     <Grid container spacing={3}>
//       {/* NOM ET PRÉNOM PARENT */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="ParentName" required sx={labelStyle}>
//           NOM ET PRÉNOM DU PARENT
//         </FormLabel>
//         <Controller
//           name="ParentName"
//           control={control}
//           rules={{ required: "Ce champ est requis" }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="ParentName"
//               size="small"
//               fullWidth // la formGrid prend tous l'espace
//               autoComplete="name"
//               sx={inputStyle}
//               error={!!errors.ParentName}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.ParentName?.message}</FormHelperText>
//       </FormGrid>
//       {/* NOM ET PRÉNOM DE L'ELEVE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="StudentName" required sx={labelStyle}>
//           NOM ET PRÉNOM DE L'ÉLÈVE
//         </FormLabel>
//         <Controller
//           name="StudentName"
//           control={control}
//           rules={{ required: "Ce champ est requis" }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="StudentName"
//               size="small"
//               fullWidth // la formGrid prend tous l'espace
//               autoComplete="name"
//               sx={inputStyle}
//               error={!!errors.StudentName}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.StudentName?.message}</FormHelperText>
//       </FormGrid>
//       {/* EMAIL */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="email" required sx={labelStyle}>
//           EMAIL DE PARENT
//         </FormLabel>
//         <Controller
//           name="email"
//           control={control}
//           rules={{
//             required: "Ce champ est requis",
//             pattern: {
//               value: /^\S+@\S+\.\S+$/,
//               message: "Email invalide",
//             },
//           }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="email"
//               type="email"
//               size="small"
//               fullWidth
//               placeholder="exemple@exemple.com"
//               sx={inputStyle}
//               error={!!errors.email}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.email?.message}</FormHelperText>
//       </FormGrid>
//       {/* TÉLÉPHONE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="phone" required sx={labelStyle}>
//           NUMÉRO DE TÉLÉPHONE DE PARENT
//         </FormLabel>

//         <Controller
//           name="phone"
//           control={control}
//           rules={{
//             required: "Ce champ est requis",
//             pattern: {
//               value: /^\+216 \d{2} \d{3} \d{3}$/,
//               message: "Le format doit être +216 21 345 678",
//             },
//           }}
//           render={({ field }) => (
//             <InputMask
//               mask="+216 99 999 999"
//               maskChar=" "
//               value={field.value}
//               onChange={field.onChange}
//             >
//               {(inputProps) => (
//                 <OutlinedInput
//                   {...inputProps}
//                   id="phone"
//                   size="small"
//                   fullWidth
//                   placeholder="+216 21 345 678"
//                   sx={inputStyle}
//                   error={!!errors.phone}
//                 />
//               )}
//             </InputMask>
//           )}
//         />
//         <FormHelperText error>{errors.phone?.message}</FormHelperText>
//       </FormGrid>

//       {/* SITUATION DE L'ÉLÈVE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="birthDate" required sx={labelStyle}>
//           SITUATION DE L'ÉLÈVE{" "}
//         </FormLabel>
//         <Controller
//           name="studentSituation"
//           control={control}
//           rules={{ required: "Ce champ est requis" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               id="studentSituation"
//               select
//               size="small"
//               fullWidth
//               sx={inputStyle}
//               error={!!errors.studentSituation}
//               helperText={errors.studentSituation?.message}
//             >
//               <MenuItem value="">-- Choisir une situation --</MenuItem>
//               <MenuItem value="normal">Élève normal</MenuItem>
//               <MenuItem value="hyperactif">Hyperactif</MenuItem>
//               <MenuItem value="autiste">Autiste</MenuItem>
//               <MenuItem value="aveugle">Aveugle</MenuItem>
//               <MenuItem value="sourdmuet">Sourd-muet</MenuItem>
//             </TextField>
//           )}
//         />
//       </FormGrid>

//       {/* DATE DE NAISSANCE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="birthDate" required sx={labelStyle}>
//           DATE DE NAISSANCE DE L'ÉLÈVE
//         </FormLabel>
//         <Controller
//           name="birthDate"
//           control={control}
//           rules={{ required: "Ce champ est requis" }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="birthDate"
//               type="date"
//               size="small"
//               fullWidth
//               sx={inputStyle}
//               error={!!errors.birthDate}
//               inputProps={{
//                 min: "2011-01-01",
//                 max: "2019-12-31",
//               }}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.birthDate?.message}</FormHelperText>
//       </FormGrid>

//       {/* NIVEAU SCOLAIRE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="schoolLevel" required sx={labelStyle}>
//           NIVEAU SCOLAIRE
//         </FormLabel>
//         <Controller
//           name="schoolLevel"
//           control={control}
//           rules={{ required: "Ce champ est requis" }}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               id="schoolLevel"
//               select
//               size="small"
//               fullWidth
//               sx={inputStyle}
//               error={!!errors.schoolLevel}
//               helperText={errors.schoolLevel?.message}
//             >
//               <MenuItem value="">-- Choisir un niveau --</MenuItem>
//               <MenuItem value="1">1ère année</MenuItem>
//               <MenuItem value="2">2ème année</MenuItem>
//               <MenuItem value="3">3ème année</MenuItem>
//               <MenuItem value="5">5ème année</MenuItem>
//               <MenuItem value="6">6ème année</MenuItem>
//             </TextField>
//           )}
//         />
//       </FormGrid>

//       {/* CHECKBOX */}
//       <FormGrid item xs={12}>
//         <Controller
//           name="acceptTerms"
//           control={control}
//           rules={{ required: "Vous devez accepter les conditions." }}
//           render={({ field }) => (
//             <FormControlLabel
//               control={<Checkbox {...field} checked={field.value} />}
//               label="J'accepte les conditions d'utilisation."
//             />
//           )}
//         />
//         <FormHelperText error>{errors.acceptTerms?.message}</FormHelperText>
//       </FormGrid>
//     </Grid>
//   );
// }

// const labelStyle = {
//   color: "black", // couleur de l'écriture
//   "& .MuiFormLabel-asterisk": { color: "red" }, // l'étoile rouge
//   textAlign: "left", // le label est à gauche
// };

// const inputStyle = {
//   //mise en forme de la formGrid (les champs du formulaire)
//   backgroundColor: "#deecef",
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#557d85",
//     borderWidth: 2,
//   },
// };





import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputMask from "react-input-mask";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "8px",
}));

export default function AddressForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Variables pour afficher/masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <Grid container spacing={3}>
      {/* NOM ET PRÉNOM PARENT */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="ParentName" required sx={labelStyle}>
          NOM ET PRÉNOM DU PARENT
        </FormLabel>
        <Controller
          name="ParentName"
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="ParentName"
              size="small"
              fullWidth
              autoComplete="name"
              sx={inputStyle}
              error={!!errors.ParentName}
            />
          )}
        />
        <FormHelperText error>{errors.ParentName?.message}</FormHelperText>
      </FormGrid>
      {/* NOM ET PRÉNOM DE L'ÉLÈVE */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="StudentName" required sx={labelStyle}>
          NOM ET PRÉNOM DE L'ÉLÈVE
        </FormLabel>
        <Controller
          name="StudentName"
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="StudentName"
              size="small"
              fullWidth
              autoComplete="name"
              sx={inputStyle}
              error={!!errors.StudentName}
            />
          )}
        />
        <FormHelperText error>{errors.StudentName?.message}</FormHelperText>
      </FormGrid>

      {/* TÉLÉPHONE */}
      <FormGrid item xs={12}>
        <FormLabel htmlFor="phone" required sx={labelStyle}>
          NUMÉRO DE TÉLÉPHONE DE PARENT
        </FormLabel>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Ce champ est requis",
            pattern: {
              value: /^\+216 \d{2} \d{3} \d{3}$/,
              message: "Le format doit être +216 21 345 678",
            },
          }}
          render={({ field }) => (
            <InputMask
              mask="+216 99 999 999"
              maskChar=" "
              value={field.value}
              onChange={field.onChange}
            >
              {(inputProps) => (
                <OutlinedInput
                  {...inputProps}
                  id="phone"
                  size="small"
                  fullWidth
                  placeholder="+216 21 345 678"
                  sx={inputStyle}
                  error={!!errors.phone}
                />
              )}
            </InputMask>
          )}
        />
        <FormHelperText error>{errors.phone?.message}</FormHelperText>
      </FormGrid>
      {/* EMAIL */}
      <FormGrid item xs={12}>
        <FormLabel htmlFor="email" required sx={labelStyle}>
          EMAIL DE PARENT
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
              sx={inputStyle}
              error={!!errors.email}
            />
          )}
        />
        <FormHelperText error>{errors.email?.message}</FormHelperText>
      </FormGrid>
  
      {/* MOT DE PASSE */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="password" required sx={labelStyle}>
          MOT DE PASSE
        </FormLabel>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Ce champ est requis",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
              message: "Minimum 8 caractères avec une lettre, un chiffre et un symbole",
            },
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="password"
              type={showPassword ? "text" : "password"}
              size="small"
              fullWidth
              placeholder="********"
              sx={inputStyle}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <FormHelperText error>{errors.password?.message}</FormHelperText>
      </FormGrid>
      {/* CONFIRMER MOT DE PASSE */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="confirmPassword" required sx={labelStyle}>
          CONFIRMER LE MOT DE PASSE
        </FormLabel>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Ce champ est requis",
            validate: (value, formValues) =>
              value === formValues.password || "Les mots de passe ne correspondent pas",
          }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              size="small"
              fullWidth
              placeholder="********"
              sx={inputStyle}
              error={!!errors.confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          )}
        />
        <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>
      </FormGrid>

      {/* DATE DE NAISSANCE */}
      <FormGrid item xs={12}>
        <FormLabel htmlFor="birthDate" required sx={labelStyle}>
          DATE DE NAISSANCE DE L'ÉLÈVE
        </FormLabel>
        <Controller
          name="birthDate"
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="birthDate"
              type="date"
              size="small"
              fullWidth
              sx={inputStyle}
              error={!!errors.birthDate}
              inputProps={{
                min: "2011-01-01",
                max: "2019-12-31",
              }}
            />
          )}
        />
        <FormHelperText error>{errors.birthDate?.message}</FormHelperText>
      </FormGrid>

      {/* SITUATION DE L'ÉLÈVE */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="studentSituation" required sx={labelStyle}>
          SITUATION DE L'ÉLÈVE
        </FormLabel>
        <Controller
          name="studentSituation"
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field }) => (
            <TextField
              {...field}
              id="studentSituation"
              select
              size="small"
              fullWidth
              sx={inputStyle}
              error={!!errors.studentSituation}
              helperText={errors.studentSituation?.message}
            >
              <MenuItem value="">-- Choisir une situation --</MenuItem>
              <MenuItem value="normal">Élève normal</MenuItem>
              <MenuItem value="hyperactif">Hyperactif</MenuItem>
              <MenuItem value="autiste">Autiste</MenuItem>
              <MenuItem value="aveugle">Aveugle</MenuItem>
              <MenuItem value="sourdmuet">Sourd-muet</MenuItem>
            </TextField>
          )}
        />
      </FormGrid>
      
      {/* NIVEAU SCOLAIRE */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="schoolLevel" required sx={labelStyle}>
          NIVEAU SCOLAIRE
        </FormLabel>
        <Controller
          name="schoolLevel"
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field }) => (
            <TextField
              {...field}
              id="schoolLevel"
              select
              size="small"
              fullWidth
              sx={inputStyle}
              error={!!errors.schoolLevel}
              helperText={errors.schoolLevel?.message}
            >
              <MenuItem value="">-- Choisir un niveau --</MenuItem>
              <MenuItem value="1">1ère année</MenuItem>
              <MenuItem value="2">2ème année</MenuItem>
              <MenuItem value="3">3ème année</MenuItem>
              <MenuItem value="4">4ème année</MenuItem>
              <MenuItem value="5">5ème année</MenuItem>
              <MenuItem value="6">6ème année</MenuItem>
            </TextField>
          )}
        />
      </FormGrid>
      {/* CHECKBOX */}
      <FormGrid item xs={12}>
        <Controller
          name="acceptTerms"
          control={control}
          rules={{ required: "Vous devez accepter les conditions." }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="J'accepte les conditions d'utilisation."
            />
          )}
        />
        <FormHelperText error>{errors.acceptTerms?.message}</FormHelperText>
      </FormGrid>
    </Grid>
  );
}

const labelStyle = {
  color: "black",
  "& .MuiFormLabel-asterisk": { color: "red" },
  textAlign: "left",
};

const inputStyle = {
  backgroundColor: "#deecef",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#557d85",
    borderWidth: 2,
  },
};






// presque origine

// import * as React from "react";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";
// import Grid from "@mui/material/Grid";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import { styled } from "@mui/material/styles";

// const FormGrid = styled(Grid)(() => ({
//   display: "flex",
//   flexDirection: "column",
// }));

// export default function AddressForm() {
//   return (
//     <Grid container spacing={3}>
//       <FormGrid size={{ xs: 12, md: 6 }}>
//         <FormLabel htmlFor="teacher-name" required>
//           NOM ET PRÉNOM DE L'ENSEIGNANT
//         </FormLabel>
//         <OutlinedInput
//           id="teacher-name"
//           name="teacher-name"
//           type="name"
//           // placeholder="John"   //la mot qui affiche en gris
//           autoComplete="teacher name"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 12, md: 6 }}>
//         <FormLabel htmlFor="student-name" required>
//           MATRICULE
//         </FormLabel>
//         <OutlinedInput
//           id="matricule"
//           name="matricule"
//           type="matricule"
//           placeholder="111 11 11 1" //la mot qui affiche en gris
//           autoComplete="matricule"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 12, md: 6 }}>
//         <FormLabel htmlFor="phone" required>
//           Numéro de téléphone du parent
//         </FormLabel>
//         <OutlinedInput
//           id="phone"
//           name="phone"
//           type="tel"
//           placeholder="21 345 678"
//           autoComplete="tel"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 12 }}>
//         <FormLabel htmlFor="email" required>
//           EMAIL ACADÉMIQUE
//         </FormLabel>
//         <OutlinedInput
//           id="email"
//           name="email"
//           type="email"
//           placeholder="exemple@exemple.com"
//           autoComplete="shipping address-line1"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 12 }}>
//         <FormLabel htmlFor="MDP">MOT DE PASSE</FormLabel>
//         <OutlinedInput
//           id="MDP"
//           name="MDP"
//           type="MDP"
//           placeholder="*********"
//           autoComplete="shipping address-line2"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 6 }}>
//         <FormLabel htmlFor="ConfMDP" required>
//           CONFIRMER MOT DE PASSE
//         </FormLabel>
//         <OutlinedInput
//           id="ConfMDP"
//           name="ConfMDP"
//           type="ConfMDP"
//           placeholder="*********"
//           autoComplete="ConfMDP"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 6 }}>
//         <FormLabel htmlFor="state" required>
//           State
//         </FormLabel>
//         <OutlinedInput
//           id="state"
//           name="state"
//           type="state"
//           placeholder="NY"
//           autoComplete="State"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 6 }}>
//         <FormLabel htmlFor="zip" required>
//           Zip / Postal code
//         </FormLabel>
//         <OutlinedInput
//           id="zip"
//           name="zip"
//           type="zip"
//           placeholder="12345"
//           autoComplete="shipping postal-code"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 6 }}>
//         <FormLabel htmlFor="country" required>
//           Country
//         </FormLabel>
//         <OutlinedInput
//           id="country"
//           name="country"
//           type="country"
//           placeholder="United States"
//           autoComplete="shipping country"
//           required
//           size="small"
//         />
//       </FormGrid>
//       <FormGrid size={{ xs: 12 }}>
//         <FormControlLabel
//           control={<Checkbox name="saveAddress" value="yes" />}
//           label="Use this address for payment details"
//         />
//       </FormGrid>
//     </Grid>
//   );
// }

//code dans code

//       {/* PHONE SANS DESIGN */}
//       {/* <FormGrid item xs={12}>
//         <FormLabel htmlFor="phone" required sx={labelStyle}>
//           NUMÉRO DE TÉLÉPHONE
//         </FormLabel>
//         <Controller
//           name="phone"
//           control={control}
//           rules={{
//             required: "Ce champ est requis",
//             validate: (value) =>
//               value.replace(/\D/g, "").length >= 8 ||
//               "Le numéro doit contenir au moins 8 chiffres",
//           }}
//           render={({ field }) => (
//             <PhoneInput
//               {...field}
//               country={"tn"} // Par défaut Tunisie
//               onlyCountries={["tn", "fr", "dz", "ma"]}
//               countryCodeEditable={false}
//               enableSearch
//               inputStyle={{
//                 width: "100%",
//                 padding: "12px",
//                 borderRadius: "4px",
//                 borderColor: errors.phone ? "red" : "#ccc",
//               }}
//               inputProps={{
//                 name: "phone",
//                 required: true,
//               }}
//               onChange={(value) => field.onChange(value)} // important pour react-hook-form
//             />
//           )}
//         />
//         {errors.phone && (
//           <span style={{ color: "red", fontSize: "0.875rem" }}>
//             {errors.phone.message}
//           </span>
//         )}
//       </FormGrid> */}

//       {/* PHONE AVEC DESIGN */}
//       {/* <FormGrid item xs={12}>
//   <FormLabel htmlFor="phone" required sx={labelStyle}>
//     NUMÉRO DE TÉLÉPHONE
//   </FormLabel>
//   <Controller
//     name="phone"
//     control={control}
//     rules={{
//       required: "Ce champ est requis",
//       validate: (value) =>
//         value.replace(/\D/g, "").length >= 8 ||
//         "Le numéro doit contenir au moins 8 chiffres",
//     }}
//     render={({ field }) => (
//       <PhoneInput
//         {...field}
//         country={"tn"} // par défaut Tunisie
//         enableSearch
//         inputProps={{
//           name: "phone",
//           required: true,
//         }}
//         containerStyle={{
//           width: "100%",
//         }}
//         inputStyle={{
//           width: "100%",
//           height: "40px",
//           paddingLeft: "48px", // pour espace entre drapeau et texte
//           borderRadius: "8px",
//           border: `1.5px solid ${errors.phone ? "#d32f2f" : "#bdbdbd"}`,
//           fontSize: "16px",
//           backgroundColor: "#f7f9fc", // proche de ton fond
//         }}
//         buttonStyle={{
//           border: "none",
//           backgroundColor: "#f7f9fc",
//           borderRight: "1px solid #ccc",
//         }}
//         dropdownStyle={{
//           zIndex: 1000,
//         }}
//         onChange={(value) => field.onChange(value)}
//       />
//     )}
//   />
//   {errors.phone && (
//     <span style={{ color: "#d32f2f", fontSize: "0.875rem" }}>
//       {errors.phone.message}
//     </span>
//   )}
// </FormGrid> */}

//       {/* MOT DE PASSE */}
//       {/* <FormGrid item xs={12}>
//         <FormLabel htmlFor="password" required sx={labelStyle}>
//           MOT DE PASSE
//         </FormLabel> */}

//         {/* Contrôle du champ mot de passe avec validation avancée */}
//         {/* <Controller
//           name="password"
//           control={control}
//           rules={{
//             required: "Ce champ est requis",
//             pattern: {
//               value:
//                 /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
//               message:
//                 "Minimum 8 caractères avec une lettre, un chiffre et un symbole",
//             },
//           }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="password"
//               type={showPassword ? "text" : "password"} // Affiche ou masque selon l’état
//               size="small"
//               fullWidth
//               placeholder="********"
//               sx={inputStyle}
//               error={!!errors.password}
//               //l’icône œil pour afficher/masquer le mot de passe
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton onClick={toggleShowPassword} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//           )}
//         /> */}
//         {/* Message d’erreur en rouge */}
//         {/* <FormHelperText error>{errors.password?.message}</FormHelperText>
//       </FormGrid> */}
//       {/* CONFIRM MDP */}
//       {/* <FormGrid item xs={12}>
//         <FormLabel htmlFor="confirmPassword" required sx={labelStyle}>
//           CONFIRMER LE MOT DE PASSE
//         </FormLabel>
//         <Controller
//           name="confirmPassword"
//           control={control}
//           rules={{
//             required: "Ce champ est requis",
//             validate: (value, formValues) =>
//               value === formValues.password ||
//               "Les mots de passe ne correspondent pas",
//           }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               size="small"
//               fullWidth
//               placeholder="********"
//               sx={inputStyle}
//               error={!!errors.confirmPassword}
//               //l’icône œil pour afficher/masquer le mot de passe
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton onClick={toggleShowConfirmPassword} edge="end">
//                     {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//           )}
//         />
//         <FormHelperText error>{errors.confirmPassword?.message}</FormHelperText>
//       </FormGrid> */}
//       {/* DEPOSER CV */}
//       {/* <FormGrid item xs={12}>
//         <FormLabel htmlFor="cv" required sx={labelStyle}>
//           DÉPOSER VOTRE CV
//         </FormLabel>

//         <Controller
//           name="cv"
//           control={control}
//           rules={{
//             required: "Veuillez déposer votre CV",
//             validate: (file) =>
//               (file &&
//                 [".pdf", ".doc", ".docx", ".png"].some((ext) =>
//                   file.name.endsWith(ext)
//                 )) ||
//               "Format de fichier non pris en charge",
//           }}
//           render={({ field }) => (
//             <input
//               type="file"
//               accept=".pdf,.doc,.docx,.png"
//               id="cv"
//               onChange={(e) => field.onChange(e.target.files[0])}
//               style={{
//                 backgroundColor: "#deecef",
//                 padding: "10px",
//                 border: "2px solid #557d85",
//                 borderRadius: "5px",
//               }}
//             />
//           )}
//         />

//         {errors.cv && (
//           <span style={{ color: "red", fontSize: "0.875rem" }}>
//             {errors.cv.message}
//           </span>
//         )}
//       </FormGrid> */}
