import React, {
  forwardRef,
  ForwardRefExoticComponent,
  FunctionComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { TreeItem, TreeItemContentProps, useTreeItem } from "@material-ui/lab";
import Link from "next/link";
import { Link as MUILink } from "@material-ui/core";
import clsx from "clsx";
import { PathTreeNode } from "./types";

type PathTreeItemProps = {
  path: string[];
  nodeChildren: PathTreeNode["children"];
};
type CreateContentComponentProps = {
  href: string;
};
type CreateContentComponent = (
  props: CreateContentComponentProps
) => ForwardRefExoticComponent<
  PropsWithoutRef<TreeItemContentProps> & RefAttributes<any>
>;

const createContentComponent: CreateContentComponent = ({ href }) =>
  forwardRef(
    (
      {
        classes,
        className,
        label,
        nodeId,
        displayIcon,
        expansionIcon = displayIcon,
        icon = expansionIcon,
      },
      ref
    ) => {
      const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
      } = useTreeItem(nodeId);

      return (
        <div
          className={clsx(className, classes.root, {
            [classes.expanded]: expanded,
            [classes.selected]: selected,
            [classes.focused]: focused,
            [classes.disabled]: disabled,
          })}
          ref={ref as React.Ref<HTMLDivElement>}
        >
          <div onClick={handleExpansion} className={classes.iconContainer}>
            {icon}
          </div>
          <Link href={href} passHref={true}>
            <MUILink
              variant="h6"
              onClick={handleSelection}
              ref={ref}
              sx={{ flexGrow: 1 }}
            >
              {label}
            </MUILink>
          </Link>
        </div>
      );
    }
  );

export const PathTreeItem: FunctionComponent<PathTreeItemProps> = ({
  path: parentPath,
  nodeChildren,
}) => (
  <>
    {Object.entries(nodeChildren).map(([segment, node]) => {
      const path = [...parentPath, segment];
      const href = path.join("/");
      const ContentComponent = createContentComponent({ href });
      return (
        <TreeItem
          key={href}
          nodeId={href}
          label={segment}
          ContentComponent={ContentComponent}
        >
          {Object.keys(node.children).length > 0 ? (
            <PathTreeItem nodeChildren={node.children} path={path} />
          ) : null}
        </TreeItem>
      );
    })}
  </>
);
