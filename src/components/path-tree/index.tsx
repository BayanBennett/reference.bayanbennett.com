import React, {
  SyntheticEvent,
  useEffect,
  useState,
  VoidFunctionComponent,
} from "react";
import { TreeView } from "@material-ui/lab";
import { PathTreeItem } from "./path-tree-item";
import { useRouter } from "next/router";
import { usePageProps } from "../../contexts/page-props";

export * from "./types";

const createExpanded = (path: string[]) =>
  path.reduce<string[]>(
    (expanded, segment) =>
      expanded.length > 0
        ? [...expanded, [expanded[expanded.length - 1], segment].join("/")]
        : [segment],
    []
  );

export const PathTree: VoidFunctionComponent = () => {
  const { path: currentPath = [], pathTree } = usePageProps();
  const [expanded, setExpanded] = useState(createExpanded(currentPath));
  const [selected, setSelected] = useState(currentPath.join("/"));
  const router = useRouter();

  useEffect(() => {
    setExpanded(createExpanded(currentPath));
    setSelected(currentPath.join("/"));
  }, [router.asPath]);

  const handleSelect = (_: SyntheticEvent, nodeId: string) =>
    setSelected(nodeId);
  const handleToggle = (_: SyntheticEvent, nodeIds: string[]) =>
    setExpanded(nodeIds);

  return typeof pathTree !== "undefined" ? (
    <TreeView
      defaultCollapseIcon="➖"
      defaultExpandIcon="➕"
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <PathTreeItem path={[currentPath[0]]} nodeChildren={pathTree.children} />
    </TreeView>
  ) : null;
};
