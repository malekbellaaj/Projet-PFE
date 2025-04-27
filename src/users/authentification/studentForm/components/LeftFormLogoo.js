import * as React from "react";
import logo from "./../../shared-theme/assets/logoFormTeacher.png";
import { Box } from "@mui/material";

export default function LeftFormLogo() {
  return (
    <Box
      component="img"
      src={logo}
      alt="leftFormLogo"
      sx={{ height: 100, width: 200  }}
    />
  );
}
