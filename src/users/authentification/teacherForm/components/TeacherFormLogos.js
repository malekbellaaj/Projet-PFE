import logo1 from "./../../shared-theme/assets/FontLeft.png";
import logo2 from "./../../shared-theme/assets/FontRight.png";
import { Box } from "@mui/material";

export default function TeacherFormLogos() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1, // Espace entre les images
        alignItems: "center", // Alignement vertical
        justifyContent: "center", // Centrer horizontalement
      }}
    >
      <Box
        component="img"
        src={logo1}
        alt="Logo 1"
        sx={{ height: 200, width: 180 }}
      />
      <Box
        component="img"
        src={logo2}
        alt="Logo 2"
        sx={{ height: 200, width: 170 }}
      />
    </Box>
  );
}
