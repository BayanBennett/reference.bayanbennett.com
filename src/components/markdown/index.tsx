export * from "./a";
export * from "./code";
export * from "./headings";
export const frontmatter = (frontmatter) => {
  console.log({ frontmatter });
  return null;
};
export const created = (props) => {
  console.log("created", props);
  return null;
};
export const yaml = frontmatter;
export const root = frontmatter;
