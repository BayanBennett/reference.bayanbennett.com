import { Link } from "@material-ui/core";
import React, { FunctionComponent } from "react";

export const a: FunctionComponent<{ href: string }> = ({ href, children }) => (
  <Link href={href} color="textPrimary" underline="hover">
    {children}
  </Link>
);
