import { darkScrollbar, colors, createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    mode: "dark",
    primary: colors.blueGrey,
    secondary: colors.brown,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },
  },
});
