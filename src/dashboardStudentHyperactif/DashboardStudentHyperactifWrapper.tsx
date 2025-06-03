import { ThemeProvider, CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";
import { theme } from "../dashboardStudentHyperactif/theme/theme"; 
import BreakpointsProvider from "./providers/BreakpointsProvider"; 

const DashboardStudentWrapper = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={theme}>
    <BreakpointsProvider>
      <CssBaseline />
      {children}
    </BreakpointsProvider>
  </ThemeProvider>
);

export default DashboardStudentWrapper;
