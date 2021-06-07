export type PathTreeNode = {
  page: boolean;
  children: {
    [k: string]: PathTreeNode;
  };
};
