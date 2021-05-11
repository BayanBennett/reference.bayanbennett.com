import { HeadingComponent } from "react-markdown/src/ast-to-react";
import { Typography } from "@material-ui/core";
import React from "react";

export const h1: HeadingComponent = ({ children }) => (
  <Typography variant="h1" align="center">
    {children}
  </Typography>
);

export const h2: HeadingComponent = ({ children }) => (
  <Typography variant="h2">{children}</Typography>
);

export const h3: HeadingComponent = ({ children }) => (
  <Typography variant="h3">{children}</Typography>
);

export const h4: HeadingComponent = ({ children }) => (
  <Typography variant="h4">{children}</Typography>
);

export const h5: HeadingComponent = ({ children }) => (
  <Typography variant="h5">{children}</Typography>
);

export const h6: HeadingComponent = ({ children }) => (
  <Typography variant="h6">{children}</Typography>
);
