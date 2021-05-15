import { darkScrollbar, colors, createTheme } from "@material-ui/core";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: colors.blueGrey,
    secondary: {
      ...colors.deepPurple,
      light: colors.deepPurple[200],
    },
    success: colors.lightGreen,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // @ts-ignore
        body: darkScrollbar(),
      },
    },
  },
});
