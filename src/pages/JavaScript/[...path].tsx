import { promises as fs } from "fs";
import { resolve, sep } from "path";
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

type PathResult = { path: string[] };

export const getStaticPaths: GetStaticPaths<PathResult> = async () => {
  const filePaths = await globby("**/*.md", {
    onlyFiles: true,
    cwd,
  });
  const paths = filePaths.map((filePath) => {
    const filePathWithoutExtension = filePath.replace(/\.md$/, "");
    return {
      params: { path: filePathWithoutExtension.split(sep) },
    };
  });
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

  return { props: { markdown, path } };
};

const JavaScriptPageTemplate: FunctionComponent<JavaScriptPageTemplateProps> =
  ({ markdown, path }) => {
    return (
      <ReactMarkdown
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ]}
        components={markdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    );
  };

export default JavaScriptPageTemplate;
