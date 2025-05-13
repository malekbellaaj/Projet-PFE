// import { BrowserRouter } from "react-router-dom";
// import { createRoot } from "react-dom/client";
// import { I18nextProvider } from "react-i18next";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import "antd/dist/antd.css";

// import Router from "./router";
// import i18n from "./translation";
// import { theme } from "./dashboardAdmin/theme/theme"; // Importez le thème du template
// import BreakpointsProvider from "./dashboardAdmin/providers/BreakpointsProvider"; // Importez si nécessaire

// const App = () => (
//   <BrowserRouter>
//     <I18nextProvider i18n={i18n}>
//       <ThemeProvider theme={theme}>
//         <BreakpointsProvider>
//           <CssBaseline />
//           <Router />
//         </BreakpointsProvider>
//       </ThemeProvider>
//     </I18nextProvider>
//   </BrowserRouter>
// );

// const container = document.getElementById("root");
// if (container) {
//   const root = createRoot(container);
//   root.render(<App />);
// }













// avant dashboard admin

import { BrowserRouter } from "react-router-dom";
   import { createRoot } from "react-dom/client";
   import { I18nextProvider } from "react-i18next";
   import "antd/dist/antd.css";

   import Router from "./router";
   import i18n from "./translation";

   const App = () => (
     <BrowserRouter>
       <I18nextProvider i18n={i18n}>
         <Router />
       </I18nextProvider>
     </BrowserRouter>
   );

   const container = document.getElementById("root");
   if (container) {
     const root = createRoot(container);
     root.render(<App />);
   }