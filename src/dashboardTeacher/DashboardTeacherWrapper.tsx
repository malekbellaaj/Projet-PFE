
   import { ThemeProvider, CssBaseline } from "@mui/material";
   import { PropsWithChildren } from "react";
   import { theme } from "./theme/theme";
   import BreakpointsProvider from "./providers/BreakpointsProvider";

   const DashboardTeacherWrapper = ({ children }: PropsWithChildren) => (
     <ThemeProvider theme={theme}>
       <BreakpointsProvider>
         <CssBaseline />
         {children}
       </BreakpointsProvider>
     </ThemeProvider>
   );

   export default DashboardTeacherWrapper;