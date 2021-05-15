import { Link } from "@material-ui/core";
import React from "react";
import {
  ReactBaseProps,
  ReactMarkdownProps,
  ReactNode,
} from "react-markdown/src/ast-to-react";

type AComponent = (
  props: ReactBaseProps &
    ReactMarkdownProps & {
      href?: string;
    }
) => ReactNode;

export const a: AComponent = ({ href, children }) => (
  <Link href={href} underline="hover">
    {children}
  </Link>
);
