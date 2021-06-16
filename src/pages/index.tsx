import React, { VoidFunctionComponent } from "react";
import Head from "next/head";
import { IconJavaScript } from "../components/icons/javascript";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import Link from "next/link";
import { RecentUpdates } from "../components/recent-updates";
import { GetStaticProps } from "next";
import {
  getPathTree,
  getRecentUpdates,
  RecentUpdate,
} from "../utils/data-path";
import { PathTreeNode } from "../components/path-tree";
import { usePageProps } from "../contexts/page-props";

type HomePageProps = {
  path: string[];
  pathTree: PathTreeNode;
  recentUpdates: RecentUpdate[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const pathTree = await getPathTree();
  const recentUpdates = await getRecentUpdates();
  return { props: { path: [], pathTree, recentUpdates } };
};

const IndexPage: VoidFunctionComponent = () => (
  <>
    <Head>
      <title>📚 Reference</title>
    </Head>
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      <Box gridColumn="auto / span 12">
        <Typography align="center" variant="h1">
          An Interactive Playground
        </Typography>
        <br />
        <Typography align="center" variant="h2">
          for Exploring Code
        </Typography>
      </Box>
      <Box
        component={Paper}
        gridColumn="auto / span 12"
        sx={{ display: "flex", padding: 2 }}
      >
        <Typography variant="h3">Languages</Typography>
        <Box sx={{ display: "flex", flexFlow: "column nowrap", margin: 2 }}>
          <Link href="/JavaScript" passHref={true}>
            <Button
              variant="contained"
              startIcon={<IconJavaScript fontSize="large" />}
            >
              JavaScript
            </Button>
          </Link>
        </Box>
      </Box>
      <RecentUpdates gridColumn="auto / span 12" />
    </Box>
  </>
);

export default IndexPage;
