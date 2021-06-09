import globby from "globby";
import { resolve, sep } from "path";
import { pathArraysToTree } from "../../components/path-tree/util";
import { promises as fs } from "fs";
import vfile, { VFile } from "vfile";
import {
  unifiedRemarkProcessor,
  Frontmatter,
} from "../unified-remark-processor";

const cwd = resolve("markdown-pages");

const filePathsPromise = globby("**/*.md", {
  onlyFiles: true,
  cwd,
});

const filePathToPathArray = (path: string): string[] =>
  path.replace(/\.md$/, "").split(sep);

const pathArraysPromise = filePathsPromise.then((paths) =>
  paths.map(filePathToPathArray)
);

const pathTreePromise = pathArraysPromise.then((pathArrays) =>
  pathArraysToTree(pathArrays)
);

type ReadMarkdownFile = (path: string[]) => Promise<VFile>;

export const readMarkdownFile: ReadMarkdownFile = async (path) => {
  const fileName = path[path.length - 1];
  const folder = path.slice(0, path.length - 1);
  const file = await fs.readFile(
    resolve(cwd, ...folder, `${fileName}.md`),
    "utf-8"
  );
  return vfile(file);
};

type FileMetadata = Frontmatter & {
  filePath: string;
};

export type RecentUpdate = Frontmatter & {
  pathArray: string[];
};

type GetFileMetadata = (filePath: string) => Promise<FileMetadata>;

const getFileMetadata: GetFileMetadata = async (filePath) => {
  const fileString = await fs.readFile(resolve(cwd, filePath), "utf-8");
  const markdown = vfile(fileString);
  await unifiedRemarkProcessor.run(
    unifiedRemarkProcessor.parse(markdown),
    markdown
  );
  const { frontmatter } = markdown.data as { frontmatter: Frontmatter };
  return {
    filePath,
    ...frontmatter,
  };
};

const recentUpdatesPromise: Promise<RecentUpdate[]> = filePathsPromise.then(
  async (filePaths) => {
    const fileMetadataPromises = filePaths.map(getFileMetadata);
    const fileMetadata = await Promise.all(fileMetadataPromises);
    fileMetadata.sort(
      ({ modified: a }, { modified: b }) => Date.parse(b) - Date.parse(a)
    );
    return fileMetadata.slice(0, 10).map(({ filePath, ...metadata }) => ({
      pathArray: filePathToPathArray(filePath),
      ...metadata,
    }));
  }
);

export const getRecentUpdates = async () => recentUpdatesPromise;

export const getPathArrays = async () => pathArraysPromise;

export const getPathTree = async () => pathTreePromise;
