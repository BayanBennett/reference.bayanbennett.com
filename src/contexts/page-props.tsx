import { ComponentType, createContext, useContext } from "react";
import { AppProps } from "next/app";
import { RecentUpdate } from "../utils/data-path";
import { PathTreeNode } from "../components/path-tree";

type PageProps = {
  recentUpdates: RecentUpdate[];
  path: string[];
  pathTree: PathTreeNode;
};

const PagePropsContext = createContext<PageProps | null>(null);

export const usePageProps = () => useContext(PagePropsContext);

type WithPageProps = (
  Component: ComponentType<AppProps["pageProps"]>
) => ComponentType<AppProps["pageProps"]>;

export const withPageProps: WithPageProps = (Component) => (props) =>
  (
    <PagePropsContext.Provider value={props}>
      <Component {...props} />
    </PagePropsContext.Provider>
  );
