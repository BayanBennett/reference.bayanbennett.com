import globby from "globby";
import { resolve, sep } from "path";
import { pathArraysToTree } from "../../components/path-tree/util";
import { Dirent, promises as fs } from "fs";

const cwd = resolve("src", "data", "JavaScript");

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

export const readMarkdownFile = async (path: string[]) => {
  const fileName = path[path.length - 1];
  const folder = path.slice(0, path.length - 1);
  return fs.readFile(resolve(cwd, ...folder, `${fileName}.md`), "utf-8");
};

export type RecentUpdate = {
  pathArray: string[];
  modified: number;
};

export const getRecentUpdates = async (): Promise<RecentUpdate[]> => {
  const filePaths = await filePathsPromise;
  const fileStatPromises = filePaths.map(async (filePath) => ({
    filePath,
    ...(await fs.stat(resolve(cwd, filePath))),
  }));
  const fileStats = await Promise.all(fileStatPromises);
  fileStats.sort(({ mtimeMs: a }, { mtimeMs: b }) => b - a);
  return fileStats.slice(0, 10).map(({ filePath, mtimeMs: modified }) => ({
    pathArray: filePathToPathArray(filePath),
    modified,
  }));
};

export const getPathArrays = async () => pathArraysPromise;

export const getPathTree = async () => pathTreePromise;
