// import * as React from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";
// import Grid from "@mui/material/Grid";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormHelperText from "@mui/material/FormHelperText";
// import { styled } from "@mui/material/styles";
// import { useState } from "react";
// import { InputAdornment, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import InputMask from "react-input-mask";

// const FormGrid = styled(Grid)(() => ({
//   display: "flex",
//   flexDirection: "column",
//   gap: "8px",
// }));

// export default function AddressForm() {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   const [showPassword, setShowPassword] = useState(false);
//   const toggleShowPassword = () => setShowPassword((prev) => !prev);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const toggleShowConfirmPassword = () =>
//     setShowConfirmPassword((prev) => !prev);

//   return (
//     <Grid container spacing={3}>
//       {/* NOM ET PRÉNOM */}
//       <FormGrid size={{ xs: 12 }}>
//         <FormLabel htmlFor="teacherName" required sx={labelStyle}>
//           NOM ET PRÉNOM DE L'ENSEIGNANT
//         </FormLabel>
//         <Controller
//           name="teacherName"
//           control={control}
//           rules={{ required: "Ce champ est requis" }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="teacherName"
//               size="small"
//               fullWidth
//               autoComplete="name"
//               sx={inputStyle}
//               error={!!errors.teacherName}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.teacherName?.message}</FormHelperText>
//       </FormGrid>
//       {/* MATRICULE */}
//       <FormGrid size={{ xs: 12 }}>
//         <FormLabel htmlFor="matricule" required sx={labelStyle}>
//           MATRICULE : ID UNIQUE DE CNRPS
//         </FormLabel>
//         <Controller
//           name="matricule"
//           control={control}
//           rules={{
//             required: "Le matricule est requis",
//             pattern: {
//               value: /^[0-9]+$/,
//               message: "Le matricule doit contenir uniquement des chiffres",
//             },
//           }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="matricule"
//               size="small"
//               fullWidth
//               placeholder="111 11 11 1"
//               sx={inputStyle}
//               error={!!errors.matricule}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.matricule?.message}</FormHelperText>
//       </FormGrid>
//       {/* TÉLÉPHONE */}
//       <FormGrid size={{ xs: 12 }}>
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
//       {/* EMAIL */}
//       <FormGrid size={{ xs: 12 }}>
//         <FormLabel htmlFor="email" required sx={labelStyle}>
//           EMAIL ACADÉMIQUE
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
//       {/* MOT DE PASSE */}
//       <FormGrid size={{ xs: 12, md: 6 }}>
//         <FormLabel htmlFor="password" required sx={labelStyle}>
//           MOT DE PASSE
//         </FormLabel>
//         <Controller
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
//               type={showPassword ? "text" : "password"}
//               size="small"
//               fullWidth
//               placeholder="********"
//               sx={inputStyle}
//               error={!!errors.password}
//               endAdornment={
//                 <InputAdornment position="end">
//                   <IconButton onClick={toggleShowPassword} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               }
//             />
//           )}
//         />
//         <FormHelperText error>{errors.password?.message}</FormHelperText>
//       </FormGrid>
//       {/* CONFIRMER MOT DE PASSE */}
//       <FormGrid size={{ xs: 12, md: 6 }}>
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
//       </FormGrid>
//       {/* DÉPOSER CV */}
//       <FormGrid size={{ xs: 12 }}>
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
//       </FormGrid>
//       {/* CHECKBOX */}
//       <FormGrid size={{ xs: 12 }}>
//         <Controller
//           name="acceptTerms"
//           control={control}
//           rules={{ required: "Vous devez accepter les conditions." }}
//           render={({ field }) => (
//             <FormControlLabel
//               control={<Checkbox {...field} checked={field.value} />}
//               label="Je confirme être un enseignant autorisé par mon établissement à utiliser ALTUS, et j'accepte les conditions d'utilisation."
//             />
//           )}
//         />
//         <FormHelperText error>{errors.acceptTerms?.message}</FormHelperText>
//       </FormGrid>
//     </Grid>
//   );
// }

// const labelStyle = {
//   color: "black",
//   "& .MuiFormLabel-asterisk": { color: "red" },
//   textAlign: "left",
// };

// const inputStyle = {
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
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputMask from "react-input-mask";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

// Liste des matières prédéfinies
const subjects = [
  "عربية",
  "français",
  "anglais",
  "رياضيات",
  "ايقاظ علمي",
  "مواد اجتماعية",
  "informatique",
];

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export default function AddressForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);

  return (
    <Grid container spacing={3}>
      {/* NOM ET PRÉNOM */}
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="teacherName" required sx={labelStyle}>
          NOM ET PRÉNOM DE L'ENSEIGNANT
        </FormLabel>
        <Controller
          name="teacherName"
          control={control}
          rules={{ required: "Ce champ est requis" }}
          render={({ field }) => (
            <OutlinedInput
              {...field}
              id="teacherName"
              size="small"
              fullWidth
              autoComplete="name"
              sx={inputStyle}
              error={!!errors.teacherName}
            />
          )}
        />
        <FormHelperText error>{errors.teacherName?.message}</FormHelperText>
      </FormGrid>

      {/* MATRICULE */}
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="matricule" required sx={labelStyle}>
          MATRICULE : ID UNIQUE DE CNRPS
        </FormLabel>
        <Controller
          name="matricule"
          control={control}
          rules={{
            required: "Le matricule est requis",
            pattern: {
              value: /^\d{10}$/,
              message: "Le matricule doit contenir exactement 10 chiffres",
            },
          }}
          render={({ field }) => (
            <InputMask
              mask="9999999999" // exactement 10 chiffres
              maskChar="" // pas d'espace vide
              value={field.value}
              onChange={field.onChange}
            >
              {(inputProps) => (
                <OutlinedInput
                  {...inputProps}
                  id="matricule"
                  size="small"
                  fullWidth
                  placeholder="1234567890"
                  sx={inputStyle}
                  error={!!errors.matricule}
                />
              )}
            </InputMask>
          )}
        />
        <FormHelperText error>{errors.matricule?.message}</FormHelperText>
      </FormGrid>

      {/* SPÉCIALITÉ */}
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="speciality" required sx={labelStyle}>
          SPÉCIALITÉ(S)
        </FormLabel>
        <Controller
          name="speciality"
          control={control}
          rules={{
            required: "Veuillez sélectionner au moins une spécialité",
            validate: (value) =>
              Array.isArray(value) && value.length > 0
                ? true
                : "Veuillez sélectionner au moins une spécialité",
          }}
          render={({ field }) => (
            <Select
              {...field}
              id="speciality"
              multiple
              value={field.value || []}
              onChange={(event) => field.onChange(event.target.value)}
              sx={inputStyle}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <FormHelperText error>{errors.speciality?.message}</FormHelperText>
      </FormGrid>
      {/* TÉLÉPHONE */}
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="phone" required sx={labelStyle}>
          NUMÉRO DE TÉLÉPHONE
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
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required sx={labelStyle}>
          EMAIL ACADÉMIQUE
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
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
              message:
                "Minimum 8 caractères avec une lettre, un chiffre et un symbole",
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
              value === formValues.password ||
              "Les mots de passe ne correspondent pas",
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
      {/* DÉPOSER CV */}
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="cv" required sx={labelStyle}>
          DÉPOSER VOTRE CV
        </FormLabel>
        <Controller
          name="cv"
          control={control}
          rules={{
            required: "Veuillez déposer votre CV",
            validate: (file) =>
              (file &&
                [".pdf", ".doc", ".docx", ".png"].some((ext) =>
                  file.name.endsWith(ext)
                )) ||
              "Format de fichier non pris en charge",
          }}
          render={({ field }) => (
            <input
              type="file"
              accept=".pdf,.doc,.docx,.png"
              id="cv"
              onChange={(e) => field.onChange(e.target.files[0])}
              style={{
                backgroundColor: "#deecef",
                padding: "10px",
                border: "2px solid #557d85",
                borderRadius: "5px",
              }}
            />
          )}
        />
        {errors.cv && (
          <span style={{ color: "red", fontSize: "0.875rem" }}>
            {errors.cv.message}
          </span>
        )}
      </FormGrid>
      {/* CHECKBOX */}
      <FormGrid size={{ xs: 12 }}>
        <Controller
          name="acceptTerms"
          control={control}
          rules={{ required: "Vous devez accepter les conditions." }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value} />}
              label="Je confirme être un enseignant autorisé par mon établissement à utiliser ALTUS, et j'accepte les conditions d'utilisation."
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

// import * as React from "react";
// import { useFormContext, Controller } from "react-hook-form"; //React Hook Form (RHF) est une bibliothèque légère et performante pour gérer les formulaires dans des applications React
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";
// import Grid from "@mui/material/Grid";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import FormHelperText from "@mui/material/FormHelperText";
// import { styled } from "@mui/material/styles";
// import { useState } from "react";
// import { InputAdornment, IconButton } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import InputMask from "react-input-mask";

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
//     // register,
//     formState: { errors },
//   } = useFormContext();

//   //les variables pour l'Icône pour afficher/masquer : Partie mot de passe
//   const [showPassword, setShowPassword] = useState(false);
//   const toggleShowPassword = () => setShowPassword((prev) => !prev);
//   //les variables pour l'Icône pour afficher/masquer : Partie confirmer MDP
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const toggleShowConfirmPassword = () =>
//     setShowConfirmPassword((prev) => !prev);

//   return (
//     <Grid container spacing={3}>
//       {/* NOM ET PRÉNOM */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="teacherName" required sx={labelStyle}>
//           NOM ET PRÉNOM DE L'ENSEIGNANT
//         </FormLabel>
//         <Controller
//           name="teacherName"
//           control={control}
//           rules={{ required: "Ce champ est requis" }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="teacherName"
//               size="small"
//               fullWidth // la formGrid prend tous l'espace
//               autoComplete="name"
//               sx={inputStyle}
//               error={!!errors.teacherName}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.teacherName?.message}</FormHelperText>
//       </FormGrid>
//       {/* MATRICULE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="matricule" required sx={labelStyle}>
//           MATRICULE
//         </FormLabel>
//         <Controller
//           name="matricule"
//           control={control}
//           rules={{
//             required: "Le matricule est requis",
//             pattern: {
//               value: /^[0-9]+$/,
//               message: "Le matricule doit contenir uniquement des chiffres",
//             },
//           }}
//           render={({ field }) => (
//             <OutlinedInput
//               {...field}
//               id="matricule"
//               size="small"
//               fullWidth
//               placeholder="111 11 11 1"
//               sx={inputStyle}
//               error={!!errors.matricule}
//             />
//           )}
//         />
//         <FormHelperText error>{errors.matricule?.message}</FormHelperText>
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

//        {/* PHONE SANS DESIGN */}
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

// {/* PHONE AVEC DESIGN */}
// {/* <FormGrid item xs={12}>
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
//       {/* EMAIL */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="email" required sx={labelStyle}>
//           EMAIL ACADÉMIQUE
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
//       {/* MOT DE PASSE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="password" required sx={labelStyle}>
//           MOT DE PASSE
//         </FormLabel>

//         {/* Contrôle du champ mot de passe avec validation avancée */}
//         <Controller
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
//         />
//         {/* Message d’erreur en rouge */}
//         <FormHelperText error>{errors.password?.message}</FormHelperText>
//       </FormGrid>
//       {/* CONFIRM MDP */}
//       <FormGrid item xs={12}>
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
//       </FormGrid>
//       {/* DEPOSER CV */}
//       <FormGrid item xs={12}>
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
//               label="Je confirme être un enseignant autorisé par mon établissement à utiliser ALTUS, et j'accepte les conditions d'utilisation."
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

// code aprés verif champ avec suivant

// import * as React from "react";
// import { useState } from "react";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormLabel from "@mui/material/FormLabel";
// import Grid from "@mui/material/Grid";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import FormHelperText from "@mui/material/FormHelperText";

// const FormGrid = styled(Grid)(() => ({
//   display: "flex",
//   flexDirection: "column",
//   width: "100%",
//   gap: "8px",
// }));

// export default function AddressForm({ onNext }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     matricule: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     confirmation: false,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (field) => (event) => {
//     const value = field === "confirmation" ? event.target.checked : event.target.value;
//     setFormData({ ...formData, [field]: value });
//   };

//   const validate = () => {
//     let newErrors = {};

//     if (!formData.name) newErrors.name = "Ce champ est requis.";
//     if (!formData.matricule) newErrors.matricule = "Ce champ est requis.";
//     if (!formData.phone) newErrors.phone = "Ce champ est requis.";
//     if (!formData.email || !formData.email.includes("@"))
//       newErrors.email = "Email invalide.";
//     if (!formData.password || formData.password.length < 6)
//       newErrors.password = "Minimum 6 caractères.";
//     if (formData.confirmPassword !== formData.password)
//       newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
//     if (!formData.confirmation)
//       newErrors.confirmation = "Vous devez accepter les conditions.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNext = () => {
//     if (validate()) {
//       onNext(); // Appelle la fonction pour aller à la page suivante
//     }
//   };

//   return (
//     <Grid container spacing={3}>
//       {/* NOM */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="name" required sx={labelStyle}>NOM ET PRÉNOM DE L'ENSEIGNANT</FormLabel>
//         <OutlinedInput
//           id="name"
//           name="name"
//           type="text"
//           value={formData.name}
//           onChange={handleChange("name")}
//           fullWidth
//           size="small"
//           sx={inputStyle}
//         />
//         {errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
//       </FormGrid>

//       {/* MATRICULE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="matricule" required sx={labelStyle}>MATRICULE</FormLabel>
//         <OutlinedInput
//           id="matricule"
//           value={formData.matricule}
//           onChange={handleChange("matricule")}
//           placeholder="111 11 11 1"
//           fullWidth
//           size="small"
//           sx={inputStyle}
//         />
//         {errors.matricule && <FormHelperText error>{errors.matricule}</FormHelperText>}
//       </FormGrid>

//       {/* TÉLÉPHONE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="phone" required sx={labelStyle}>NUMÉRO DE TÉLÉPHONE</FormLabel>
//         <OutlinedInput
//           id="phone"
//           value={formData.phone}
//           onChange={handleChange("phone")}
//           placeholder="21 345 678"
//           fullWidth
//           size="small"
//           sx={inputStyle}
//         />
//         {errors.phone && <FormHelperText error>{errors.phone}</FormHelperText>}
//       </FormGrid>

//       {/* EMAIL */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="email" required sx={labelStyle}>EMAIL ACADÉMIQUE</FormLabel>
//         <OutlinedInput
//           id="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange("email")}
//           placeholder="exemple@exemple.com"
//           fullWidth
//           size="small"
//           sx={inputStyle}
//         />
//         {errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
//       </FormGrid>

//       {/* MOT DE PASSE */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="password" required sx={labelStyle}>MOT DE PASSE</FormLabel>
//         <OutlinedInput
//           id="password"
//           type="password"
//           value={formData.password}
//           onChange={handleChange("password")}
//           placeholder="********"
//           fullWidth
//           size="small"
//           sx={inputStyle}
//         />
//         {errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
//       </FormGrid>

//       {/* CONFIRMATION */}
//       <FormGrid item xs={12}>
//         <FormLabel htmlFor="confirmPassword" required sx={labelStyle}>CONFIRMER LE MOT DE PASSE</FormLabel>
//         <OutlinedInput
//           id="confirmPassword"
//           type="password"
//           value={formData.confirmPassword}
//           onChange={handleChange("confirmPassword")}
//           placeholder="********"
//           fullWidth
//           size="small"
//           sx={inputStyle}
//         />
//         {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
//       </FormGrid>

//       {/* CHECKBOX */}
//       <FormGrid item xs={12}>
//         <FormControlLabel
//           control={
//             <Checkbox
//               name="confirmation"
//               checked={formData.confirmation}
//               onChange={handleChange("confirmation")}
//             />
//           }
//           label="Je confirme être un enseignant autorisé par mon établissement à utiliser ALTUS, et j'accepte les conditions d'utilisation."
//         />
//         {errors.confirmation && <FormHelperText error>{errors.confirmation}</FormHelperText>}
//       </FormGrid>

//       {/* BOUTON SUIVANT */}
//       <FormGrid item xs={12}>
//         <Button variant="contained" onClick={handleNext}>Suivant</Button>
//       </FormGrid>
//     </Grid>
//   );
// }

// // Styles communs
// const inputStyle = {
//   backgroundColor: "#deecef",
//   "& .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#557d85",
//     borderWidth: 2,
//   },
// };

// const labelStyle = {
//   color: "black",
//   "& .MuiFormLabel-asterisk": { color: "red" },
//   textAlign: "left",
// };

// code avant vérification champ

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
//   width: "100%", // prend toute la ligne
//   gap: "8px", // espace entre le label et l’input
// }));

// export default function AddressForm() {
//   return (
//     <Grid container spacing={3}>
//       <FormGrid item xs={12}>
//         <FormLabel
//           htmlFor="teacher-name"
//           required
//           sx={{
//             color: "black", // couleur de l'écriture
//             "& .MuiFormLabel-asterisk": { color: "red" }, // l'étoile rouge
//             textAlign: "left", // le label est à gauche
//           }}
//         >
//           NOM ET PRÉNOM DE L'ENSEIGNANT
//         </FormLabel>
//         <OutlinedInput
//           id="teacher-name"
//           name="teacher-name"
//           type="text"
//           autoComplete="name" //permet au navigateur de pré-remplir automatiquement les champs du formulaire avec des informations que l'utilisateur a déjà saisies
//           required
//           size="small"
//           fullWidth // la formGrid prend tous l'espace
//           sx={{
//             //mise en forme de la formGrid
//             backgroundColor: "#deecef",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#557d85",
//               borderWidth: 2,
//             },
//           }}
//         />
//       </FormGrid>

//       <FormGrid item xs={12}>
//         <FormLabel
//           htmlFor="matricule"
//           required
//           sx={{
//             color: "black",
//             "& .MuiFormLabel-asterisk": { color: "red" },
//             textAlign: "left",
//           }}
//         >
//           MATRICULE
//         </FormLabel>
//         <OutlinedInput
//           id="matricule"
//           name="matricule"
//           type="text"
//           placeholder="111 11 11 1"
//           autoComplete="off"
//           required
//           size="small"
//           fullWidth
//           sx={{
//             backgroundColor: "#deecef",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#557d85",
//               borderWidth: 2,
//             },
//           }}
//         />
//       </FormGrid>

//       <FormGrid item xs={12}>
//         <FormLabel
//           htmlFor="phone"
//           required
//           sx={{
//             color: "black",
//             "& .MuiFormLabel-asterisk": { color: "red" },
//             textAlign: "left",
//           }}
//         >
//           NUMÉRO DE TÉLÉPHONE
//         </FormLabel>
//         <OutlinedInput
//           id="phone"
//           name="phone"
//           type="tel"
//           placeholder="21 345 678"
//           autoComplete="tel"
//           required
//           size="small"
//           fullWidth
//           sx={{
//             backgroundColor: "#deecef",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#557d85",
//               borderWidth: 2,
//             },
//           }}
//         />
//       </FormGrid>

//       <FormGrid item xs={12}>
//         <FormLabel
//           htmlFor="email"
//           required
//           sx={{
//             color: "black",
//             "& .MuiFormLabel-asterisk": { color: "red" },
//             textAlign: "left",
//           }}
//         >
//           EMAIL ACADÉMIQUE
//         </FormLabel>
//         <OutlinedInput
//           id="email"
//           name="email"
//           type="email"
//           placeholder="exemple@exemple.com"
//           autoComplete="email"
//           required
//           size="small"
//           fullWidth
//           sx={{
//             backgroundColor: "#deecef",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#557d85",
//               borderWidth: 2,
//             },
//           }}
//         />
//       </FormGrid>

//       <FormGrid item xs={12}>
//         <FormLabel
//           htmlFor="MDP"
//           required
//           sx={{
//             color: "black",
//             "& .MuiFormLabel-asterisk": { color: "red" },
//             textAlign: "left",
//           }}
//         >
//           MOT DE PASSE
//         </FormLabel>
//         <OutlinedInput
//           id="MDP"
//           name="MDP"
//           type="password"
//           placeholder="********"
//           autoComplete="new-password"
//           required
//           size="small"
//           fullWidth
//           sx={{
//             backgroundColor: "#deecef",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#557d85",
//               borderWidth: 2,
//             },
//           }}
//         />
//       </FormGrid>

//       <FormGrid item xs={12}>
//         <FormLabel
//           htmlFor="ConfMDP"
//           required
//           sx={{
//             color: "black",
//             "& .MuiFormLabel-asterisk": { color: "red" },
//             textAlign: "left",
//           }}
//         >
//           CONFIRMER LE MOT DE PASSE
//         </FormLabel>
//         <OutlinedInput
//           id="ConfMDP"
//           name="ConfMDP"
//           type="password"
//           placeholder="********"
//           autoComplete="off"
//           required
//           size="small"
//           fullWidth
//           sx={{
//             backgroundColor: "#deecef",
//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: "#557d85",
//               borderWidth: 2,
//             },
//           }}
//         />
//       </FormGrid>

//       <FormGrid item xs={12}>
//         <FormControlLabel
//           sx={{ textAlign: "left" }}
//           control={<Checkbox name="confirmation" required />}
//           label="Je confirme être un enseignant autorisé par mon établissement à utiliser ALTUS, et j'accepte les conditions d'utilisation."
//         />
//       </FormGrid>
//     </Grid>
//   );
// }

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
