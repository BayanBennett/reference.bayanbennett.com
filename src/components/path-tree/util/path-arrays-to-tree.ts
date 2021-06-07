import { PathTreeNode } from "..";

type SegmentToNode = (parent: PathTreeNode, segment: string) => PathTreeNode;

const segmentToNode: SegmentToNode = (parent, segment) => {
  parent.children[segment] ??= { page: false, children: {} };
  return parent.children[segment];
};

type PathArrayToNode = (
  tree: PathTreeNode,
  pathArray: string[]
) => PathTreeNode;

const pathArrayToNode: PathArrayToNode = (tree, pathArray) => {
  const lastTreeNode = pathArray.reduce(segmentToNode, tree);
  lastTreeNode.page = true;
  return tree;
};

type PathArraysToTree = (pathArrays: string[][]) => PathTreeNode;

export const pathArraysToTree: PathArraysToTree = (pathArrays) =>
  pathArrays.reduce(pathArrayToNode, { page: true, children: {} });
