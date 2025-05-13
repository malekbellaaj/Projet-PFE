import { PropsWithChildren, ReactElement, useState } from "react";
import { Box, Drawer, Toolbar, useTheme, CssBaseline } from "@mui/material";

import Sidebar from "../../layouts/main-layout/Sidebar/Sidebar";
import Topbar from "../../layouts/main-layout/Topbar/Topbar";
import Footer from "./Footer";

export const drawerWidth = 278;

const MainLayout = ({ children }: PropsWithChildren): ReactElement => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <>
      {/* CssBaseline pour normalisation de base, sans styles personnalisés incorrects */}
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          fontFamily: '"Pacifico", cursive !important', // Forcer la police sur la racine
          "& *": {
            // Tentative de propagation à tous les enfants
            fontFamily: '"Pacifico", cursive !important',
          },
          "& *:before": {
            fontFamily: '"Pacifico", cursive !important',
          },
          "& *:after": {
            fontFamily: '"Pacifico", cursive !important',
          },
        }}
      >
        {/* Topbar fixe en haut */}
        <Topbar handleDrawerToggle={handleDrawerToggle} />

        {/* Conteneur principal avec Sidebar et contenu */}
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {/* Sidebar (Drawer) */}
          <Box
            component="nav"
            sx={{
              width: { xs: 0, lg: drawerWidth },
              flexShrink: { lg: 0 },
              display: { xs: "none", lg: "block" }, // Permanent sur desktop
            }}
          >
            <Drawer
              variant="permanent"
              sx={{
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  border: 0,
                  backgroundColor: "background.default",
                  [theme.breakpoints.down("lg")]: {
                    display: "none", // Masqué sur mobile/tablette
                  },
                },
              }}
              open
            >
              <Sidebar />
            </Drawer>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", lg: "none" }, // Temporaire sur mobile
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  border: 0,
                  backgroundColor: "background.default",
                },
              }}
            >
              <Sidebar />
            </Drawer>
          </Box>

          {/* Contenu principal */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { lg: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
              minHeight: `calc(100vh - ${
                theme.mixins.toolbar.minHeight
              }px - ${theme.spacing(2)}px)`, // Ajuste pour Topbar et Footer
              bgcolor: "background.default",
              p: { xs: 1, sm: 2, md: 4 }, // l'espacement entre partie centrale et autres
              transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Toolbar />
            {children}
          </Box>
        </Box>

        {/* Footer fixe en bas */}
        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
