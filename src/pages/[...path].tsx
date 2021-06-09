import { GetStaticPaths, GetStaticProps } from "next";
import React, { VoidFunctionComponent } from "react";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";
import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { hastChildrenToReact, Root } from "react-markdown/src/ast-to-react";
// @ts-ignore
import { html } from "property-information";

import * as components from "../components/markdown";
import { PathTreeNode } from "../components/path-tree";
import {
  getPathArrays,
  getPathTree,
  readMarkdownFile,
} from "../utils/data-path";
import { Chip, Typography } from "@material-ui/core";

type Frontmatter = {
  title: string;
  created: string;
  modified: string;
  tags: string[];
};

type JavaScriptPageTemplateProps = {
  hast: Root;
  frontmatter: Frontmatter;
  path: string[];
  pathTree: PathTreeNode;
};

type PathResult = { path: string[] };

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkParseFrontmatter)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, { behavior: "wrap" });

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

  const hast = (await processor.run(
    processor.parse(markdown),
    markdown
  )) as Root;

  const { frontmatter } = markdown.data as { frontmatter: Frontmatter };

  return {
    props: {
      hast,
      frontmatter,
      path,
      pathTree,
    },
  };
};

const JavaScriptPageTemplate: VoidFunctionComponent<JavaScriptPageTemplateProps> =
  ({ hast, frontmatter }) => {
    const reactMarkdown = hastChildrenToReact(
      { options: { components }, schema: html, listDepth: 0 },
      hast
    );

    const { tags, title } = frontmatter;

    return (
      <>
        <Typography variant="h1" align="center">
          {title}
        </Typography>
        {reactMarkdown}
        <footer>
          <Typography>Tags: </Typography>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </footer>
      </>
    );
  };

export default JavaScriptPageTemplate;
