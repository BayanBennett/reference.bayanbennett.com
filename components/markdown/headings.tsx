import React from "react";
import {
  ReactBaseProps,
  ReactMarkdownProps,
  ReactNode,
} from "react-markdown/src/ast-to-react";
import { Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

type HeadingComponentWithId = (
  props: ReactBaseProps &
    ReactMarkdownProps & {
      level: number;
      id: string | undefined;
    }
) => ReactNode;

const Heading: HeadingComponentWithId = ({ children, id, level }) => {
  const variant = `h${Math.min(level, 6)}` as Variant;
  const align = level === 1 ? "center" : undefined;
  return (
    <Typography id={id} variant={variant} align={align}>
      {children}
    </Typography>
  );
};

export const h1 = Heading;
export const h2 = Heading;
export const h3 = Heading;
export const h4 = Heading;
export const h5 = Heading;
export const h6 = Heading;
