import React, { ComponentType, FunctionComponent } from "react";
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { TreeDrawer } from "./tree-drawer";
import Link from "next/link";

export const Layout: FunctionComponent = ({ children }) => (
  <>
    <AppBar
      position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Link href="/" passHref={true}>
          <Button startIcon={<Typography variant="h6">📚</Typography>}>
            <Typography color="text.primary" variant="h6">
              Reference
            </Typography>
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
    <main style={{ position: "relative" }}>
      <TreeDrawer />
      <Container>{children}</Container>
    </main>
  </>
);

type WithLayout = <T>(Component: ComponentType<T>) => ComponentType<T>;

export const withLayout: WithLayout = (Component) => (props) =>
  (
    <Layout>
      <Component {...props} />
    </Layout>
  );
