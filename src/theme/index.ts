import { darkScrollbar, colors, createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
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
        body: darkScrollbar(),
      },
    },
  },
});
