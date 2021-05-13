import { promises as fs } from "fs";
import { resolve } from "path";
import globby from "globby";
import { GetStaticPaths, GetStaticProps } from "next";
import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import * as markdownComponents from "../../components/markdown";

type JavaScriptPageTemplateProps = {
  markdown: string;
  path: string[];
};

const cwd = resolve("src", "data", "JavaScript");

export const getStaticPaths: GetStaticPaths = async () => {
  const filePaths = await globby("**/*.md", {
    onlyFiles: true,
    cwd,
  });
  const paths = filePaths.map((filePath) => {
    const filePathWithoutExtension = filePath.replace(/\.md$/, "");
    return `/JavaScript/${filePathWithoutExtension}`;
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  JavaScriptPageTemplateProps,
  { path: string[] }
> = async ({ params }) => {
  if (typeof params?.path === "undefined") return { notFound: true };
  const { path } = params;
  const fileName = path[path.length - 1];
  const folder = path.slice(0, path.length - 1);
  const markdown = await fs.readFile(
    resolve(cwd, ...folder, `${fileName}.md`),
    "utf-8"
  );

  return { props: { markdown, path } };
};

const JavaScriptPageTemplate: FunctionComponent<JavaScriptPageTemplateProps> = ({
  markdown,
  path,
}) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
      components={markdownComponents}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default JavaScriptPageTemplate;
