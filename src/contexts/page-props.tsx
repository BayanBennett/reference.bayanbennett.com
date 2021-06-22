import { ComponentType, createContext, useContext } from "react";
import { AppProps } from "next/app";
import { RecentUpdate } from "../utils/data-path";

type PageProps = {
  recentUpdates?: RecentUpdate[];
  path?: string[];
};

const PagePropsContext = createContext<PageProps>({});

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
