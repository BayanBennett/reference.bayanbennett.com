import React, { FunctionComponent } from "react";
import {
  AppBar,
  Avatar,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";

export const Layout: FunctionComponent = ({ children }) => (
  <>
    <AppBar position="sticky">
      <Toolbar>
        <Avatar>📚</Avatar>
        <Typography variant="h6">Reference</Typography>
      </Toolbar>
    </AppBar>
    <Container>{children}</Container>
  </>
);
