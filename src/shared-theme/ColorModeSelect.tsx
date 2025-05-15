import React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { SxProps, Theme } from "@mui/material/styles";

interface ColorModeSelectProps {
  sx?: SxProps<Theme>;
}

const ColorModeSelect: React.FC<ColorModeSelectProps> = ({ sx }) => {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <IconButton onClick={toggleColorMode} color="inherit" sx={sx}>
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ColorModeSelect;
