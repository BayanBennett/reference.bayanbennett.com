import { promises as fs } from "fs";
import { resolve, sep } from "path";
import globby from "globby";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import * as markdownComponents from "../../components/markdown";
import { pathArraysToTree } from "../../components/path-tree/util";
import { PathTreeNode } from "../../components/path-tree";

type JavaScriptPageTemplateProps = {
  markdown: string;
  path: string[];
  pathTree: PathTreeNode;
};

const cwd = resolve("src", "data", "JavaScript");

type PathResult = { path: string[] };

const pathArraysPromise = globby("**/*.md", {
  onlyFiles: true,
  cwd,
}).then((paths) => paths.map((path) => path.replace(/\.md$/, "").split(sep)));

const pathTreePromise = pathArraysPromise.then((pathArrays) =>
  pathArraysToTree(pathArrays)
);

export const getStaticPaths: GetStaticPaths<PathResult> = async () => {
  const filePaths = await pathArraysPromise;

  const paths = filePaths.map((path) => ({ params: { path } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  JavaScriptPageTemplateProps,
  PathResult
> = async ({ params }) => {
  if (typeof params?.path === "undefined") return { notFound: true };
  const { path } = params;
  const fileName = path[path.length - 1];
  const folder = path.slice(0, path.length - 1);
  const markdown = await fs.readFile(
    resolve(cwd, ...folder, `${fileName}.md`),
    "utf-8"
  );
  const pathTree = await pathTreePromise;

  return { props: { markdown, path: ["/JavaScript", ...path], pathTree } };
};

const JavaScriptPageTemplate: FunctionComponent<JavaScriptPageTemplateProps> =
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
