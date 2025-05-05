import logo1 from "./../../shared-theme/assets/enfant1.png";
import logo2 from "./../../shared-theme/assets/enfant2.png";
import { Box } from "@mui/material";

export default function StudentFormLogos() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 7, // Espace entre les images
        alignItems: "center", // Alignement vertical
        justifyContent: "center", // Centrer horizontalement
      }}
    >
      <Box
        component="img"
        src={logo1}
        alt="Logo 1"
        sx={{ height: 200, width: 100 }}
      />
      <Box
        component="img"
        src={logo2}
        alt="Logo 2"
        sx={{ height: 200, width: 100 }}
      />
    </Box>
  );
}
