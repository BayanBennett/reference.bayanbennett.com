import {
  darkScrollbar,
  colors,
  createTheme,
  GlobalStyles,
  GlobalStylesProps,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { ComponentType } from "react";

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
        body: darkScrollbar(),
      },
    },
  },
});

const html = {
  WebkitFontSmoothing: "antialiased", // Antialiasing.
  MozOsxFontSmoothing: "grayscale", // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: "100%",
};

const body = {
  color: theme.palette.text.primary,
  ...theme.typography.body1,
  backgroundColor: theme.palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: theme.palette.common.white,
  },
};

const defaultStyles = {
  html,
  "*, *::before, *::after": {
    boxSizing: "inherit",
  },
  "strong, b": {
    fontWeight: theme.typography.fontWeightBold,
  },
  body: {
    margin: 0, // Remove the margin in all browsers.
    ...body,
    // Add support for document.body.requestFullScreen().
    // Other elements, if background transparent, are not supported.
    "&::backdrop": {
      backgroundColor: theme.palette.background.default,
    },
  },
};

const themeOverrides = theme?.components?.MuiCssBaseline?.styleOverrides;

const styles = (
  typeof themeOverrides === "undefined"
    ? defaultStyles
    : [defaultStyles, themeOverrides]
) as GlobalStylesProps["styles"];

type WithTheme = <T>(Component: ComponentType<T>) => ComponentType<T>;

export const withTheme: WithTheme = (Component) => (props) =>
  (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={styles} />
      <Component {...props} />
    </ThemeProvider>
  );
