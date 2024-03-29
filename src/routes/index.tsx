import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Editor from "../pages/home/editor";
import Preview from "../pages/home/preview";
import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PaletteMode } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { useAppSelector } from "../redux/hooks";
const BASE = import.meta.env.VITE_BASE;

export default function Router() {
  const isDark = useAppSelector((state) => state.common.dark);

  // 配色
  // 默认颜色：https://mui.com/zh/material-ui/customization/default-theme/
  // 调色：https://mui.com/zh/material-ui/customization/color/#picking-colors
  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: indigo[500],
            },
            background: {
              default: grey[100],
              paper: "#FFF",
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: indigo[500],
            },
            background: {
              default: grey[900],
              paper: grey[800],
            },
          }),
    },
  });

  const theme = useMemo(
    () =>
      createTheme({
        ...getDesignTokens(isDark ? "dark" : "light"),
        breakpoints: {
          values: {
            xs: 0,
            sm: 400,
            md: 600,
            lg: 900,
            xl: 1200,
          },
        },
      }),
    [isDark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={BASE} element={<Home />}>
            <Route index element={<Preview />} />
            <Route path="editor" element={<Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
