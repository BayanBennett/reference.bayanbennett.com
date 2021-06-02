import { promises as fs } from "fs";
import { resolve, sep } from "path";
import globby from "globby";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { VoidFunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import * as markdownComponents from "../../components/markdown";
import { PathTreeNode } from "../../components/path-tree";
import {
  getPathArrays,
  getPathTree,
  readMarkdownFile,
} from "../../utils/data-path";

type JavaScriptPageTemplateProps = {
  markdown: string;
  path: string[];
  pathTree: PathTreeNode;
};

type PathResult = { path: string[] };

export const getStaticPaths: GetStaticPaths<PathResult> = async () => {
  const filePaths = await getPathArrays();

  const paths = filePaths.map((path) => ({ params: { path } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  JavaScriptPageTemplateProps,
  PathResult
> = async ({ params }) => {
  if (typeof params?.path === "undefined") return { notFound: true };
  const { path } = params;
  const markdown = await readMarkdownFile(path);
  const pathTree = await getPathTree();

  return { props: { markdown, path: ["/JavaScript", ...path], pathTree } };
};

const JavaScriptPageTemplate: VoidFunctionComponent<JavaScriptPageTemplateProps> =
  ({ markdown }) => (
    <>
      <ReactMarkdown
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ]}
        components={markdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    </>
  );

export default JavaScriptPageTemplate;
