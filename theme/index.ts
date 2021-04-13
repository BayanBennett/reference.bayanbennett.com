import { createMuiTheme } from "@material-ui/core/styles";
import {
  blueGrey as primary,
  brown as secondary,
} from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    mode: "dark",
    primary,
    secondary,
  },
});

export default theme;
