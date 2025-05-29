import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#16206d",
    },
    secondary: {
      main: "#FECDDC",
    },
    background: {
      default: "#C4EAF0",
    },
    error: {
      main: "#d32f2f", // Rouge plus foncé pour meilleur contraste
    },
  },
  typography: {
    fontFamily: '"Comic Sans MS", cursive, sans-serif',
    h5: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
  },
});

export const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "70%", lg: "70%" },
  maxWidth: "1200px",
  height: { xs: "auto", sm: "600px" },
  bgcolor: "transparent",
  borderRadius: "16px",
  boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)", // Ombre plus douce
  transition: "all 0.3s ease-in-out", // Animation pour le chargement
};

export const backgroundStyle = {
  backgroundImage: 'url("/login/bg/bg1.jpg")',
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const imageBoxStyle = {
  backgroundImage: 'url("/login/bg/Altus.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  margin: { xs: "10px", sm: "15px" },
  width: "80%",
  height: "45%",
  opacity: 0,
  animation: "fadeIn 1s ease-in-out forwards", // Animation de fondu
};

export const formContainerStyle = {
  height: "100%",
  minHeight: { xs: "400px", sm: "500px" }, // Hauteur minimale ajustée
  backgroundColor: "#C4EAF0",
  position: "relative",
  borderTopRightRadius: "16px",
  borderBottomRightRadius: "16px",
  padding: { xs: "16px", sm: "24px" }, // Marge intérieure pour petits écrans
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Ombre légère
  opacity: 0,
  animation: "fadeIn 1s ease-in-out 0.2s forwards", // Animation avec léger décalage
};

// Animation CSS
const keyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Injecter les keyframes dans le DOM
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

export const labelStyle = {
  color: "#16206d",
  fontWeight: "bold",
  mb: 1,
  "& .MuiFormLabel-asterisk": { color: "red" },
  textAlign: "left",
};

export const inputStyle = {
  backgroundColor: "#deecef",
  borderRadius: "20px", // Coins arrondis PARTIE BLANC
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#557d85",
    borderWidth: 2,
    borderRadius: "20px", // Coins arrondis aussi sur la bordure PARTIE CADRE
    transition: "all 0.2s ease-in-out", // Transition pour survol et focus
  },
};
