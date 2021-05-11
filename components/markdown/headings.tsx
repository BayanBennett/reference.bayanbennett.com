import { HeadingComponent } from "react-markdown/src/ast-to-react";
import { Typography } from "@material-ui/core";
import React from "react";

export const h1: HeadingComponent = ({ ...props }) => (
  <Typography {...props} variant="h1" align="center" />
);

export const h2: HeadingComponent = ({ ...props }) => (
  <Typography {...props} variant="h2" />
);

export const h3: HeadingComponent = ({ ...props }) => (
  <Typography {...props} variant="h3" />
);

export const h4: HeadingComponent = ({ ...props }) => (
  <Typography {...props} variant="h4" />
);

export const h5: HeadingComponent = ({ ...props }) => (
  <Typography {...props} variant="h5" />
);

export const h6: HeadingComponent = ({ ...props }) => (
  <Typography {...props} variant="h6" />
);
