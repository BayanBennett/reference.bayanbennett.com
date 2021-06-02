import React, { VoidFunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import { RecentUpdates } from "../../components/recent-updates";
import { GetStaticProps } from "next";
import { PathTreeNode } from "../../components/path-tree";
import {
  getPathTree,
  getRecentUpdates,
  RecentUpdate,
} from "../../utils/data-path";
import { usePageProps } from "../../contexts/page-props";

type JavaScriptPageProps = {
  path: string[];
  pathTree: PathTreeNode;
  recentUpdates: RecentUpdate[];
};

export const getStaticProps: GetStaticProps<JavaScriptPageProps> = async () => {
  const pathTree = await getPathTree();
  const recentUpdates = await getRecentUpdates();
  return { props: { path: ["/JavaScript"], pathTree, recentUpdates } };
};

const JavaScriptPage: VoidFunctionComponent<JavaScriptPageProps> = () => {
  const { recentUpdates } = usePageProps();
  return (
    <>
      <Typography align="center" variant="h1">
        JavaScript
      </Typography>
      <RecentUpdates recentUpdates={recentUpdates} />
    </>
  );
};

export default JavaScriptPage;
