import unified from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkParseFrontmatter from "remark-parse-frontmatter";

export const unifiedRemarkProcessor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkParseFrontmatter);

export type Frontmatter = {
  title: string;
  created: string;
  modified: string;
  tags: string[];
};
