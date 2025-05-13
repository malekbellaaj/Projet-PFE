
   import { ThemeProvider, CssBaseline } from "@mui/material";
   import { PropsWithChildren } from "react";
   import { theme } from "./../adminDashboard/theme/theme";
   import BreakpointsProvider from "../adminDashboard/providers/BreakpointsProvider";

   const DashboardAdminWrapper = ({ children }: PropsWithChildren) => (
     <ThemeProvider theme={theme}>
       <BreakpointsProvider>
         <CssBaseline />
         {children}
       </BreakpointsProvider>
     </ThemeProvider>
   );

   export default DashboardAdminWrapper;