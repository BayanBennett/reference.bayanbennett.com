import { PathTreeNode } from "..";

const segmentToNode = (parent: PathTreeNode, segment: string): PathTreeNode => {
  parent.children[segment] ??= { page: false, children: {} };
  return parent.children[segment];
};

const pathArrayToNode = (
  tree: PathTreeNode,
  pathArray: string[]
): PathTreeNode => {
  const lastTreeNode = pathArray.reduce(segmentToNode, tree);
  lastTreeNode.page = true;
  return tree;
};

export const pathArraysToTree = (pathArrays: string[][]) =>
  pathArrays.reduce(pathArrayToNode, { page: true, children: {} });
