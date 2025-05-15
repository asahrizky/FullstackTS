import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface AppThemeProps {
  children: React.ReactNode;
  disableCustomTheme?: boolean;
}

const AppTheme: React.FC<AppThemeProps> = ({
  children,
  disableCustomTheme,
}) => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
