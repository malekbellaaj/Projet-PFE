import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function AppTheme(props) {
  const { children, disableCustomTheme, themeComponents } = props;

  const theme = React.useMemo(() => {
    return disableCustomTheme
      ? {}
      : createTheme({
          palette: {
            mode: "light", 
            primary: {
              main: "#b47cb2",
            },
            background: {
              default: "#b2e6eb",
              paper: "#d4f1f4",
            },
            text: {
              primary: "#2c2c2c",
              secondary: "#555",
            },
          },
          typography: {
            fontFamily: '"Fredoka", "Poppins", "Comic Sans MS", cursive',
            fontSize: 14,
            fontWeightRegular: 400,
            fontWeightBold: 600,
            button: {
              textTransform: "none",
              fontWeight: 600,
            },
          },
          shape: {
            borderRadius: 20,
          },
          components: {
            MuiTextField: {
              styleOverrides: {
                root: {
                  backgroundColor: "#d4f1f4",
                  borderRadius: 20,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 30,
                    "& fieldset": {
                      borderColor: "#8ecae6",
                    },
                    "&:hover fieldset": {
                      borderColor: "#219ebc",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#219ebc",
                    },
                  },
                },
              },
            },
            MuiButton: {
              styleOverrides: {
                root: {
                  borderRadius: 20,
                  backgroundColor: "#b47cb2",
                  color: "white",
                  fontWeight: 600,
                  padding: "10px 20px",
                  "&:hover": {
                    backgroundColor: "#ff6f61",
                  },
                },
              },
            },
            ...themeComponents,
          },
        });
  }, [disableCustomTheme, themeComponents]);

  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.node,
  disableCustomTheme: PropTypes.bool,
  themeComponents: PropTypes.object,
};

export default AppTheme;























// code origine
// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// import { inputsCustomizations } from './customizations/inputs';
// import { dataDisplayCustomizations } from './customizations/dataDisplay';
// import { feedbackCustomizations } from './customizations/feedback';
// import { navigationCustomizations } from './customizations/navigation';
// import { surfacesCustomizations } from './customizations/surfaces';
// import { colorSchemes, typography, shadows, shape } from './themePrimitives';

// function AppTheme(props) {
//   const { children, disableCustomTheme, themeComponents } = props;
//   const theme = React.useMemo(() => {
//     return disableCustomTheme
//       ? {}
//       : createTheme({
//           // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
//           cssVariables: {
//             colorSchemeSelector: 'data-mui-color-scheme',
//             cssVarPrefix: 'template',
//           },
//           colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
//           typography,
//           shadows,
//           shape,
//           components: {
//             ...inputsCustomizations,
//             ...dataDisplayCustomizations,
//             ...feedbackCustomizations,
//             ...navigationCustomizations,
//             ...surfacesCustomizations,
//             ...themeComponents,
//           },
//         });
//   }, [disableCustomTheme, themeComponents]);
//   if (disableCustomTheme) {
//     return <React.Fragment>{children}</React.Fragment>;
//   }
//   return (
//     <ThemeProvider theme={theme} disableTransitionOnChange>
//       {children}
//     </ThemeProvider>
//   );
// }

// AppTheme.propTypes = {
//   children: PropTypes.node,
//   /**
//    * This is for the docs site. You can ignore it or remove it.
//    */
//   disableCustomTheme: PropTypes.bool,
//   themeComponents: PropTypes.object,
// };

// export default AppTheme;
