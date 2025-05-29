
   import { ThemeProvider, CssBaseline } from "@mui/material";
   import { PropsWithChildren } from "react";
   import { theme } from "./../dashboardAdmin/theme/theme";
   import BreakpointsProvider from "../dashboardAdmin/providers/BreakpointsProvider";

   const DashboardAdminWrapper = ({ children }: PropsWithChildren) => (
     <ThemeProvider theme={theme}>
       <BreakpointsProvider>
         <CssBaseline />
         {children}
       </BreakpointsProvider>
     </ThemeProvider>
   );

   export default DashboardAdminWrapper;