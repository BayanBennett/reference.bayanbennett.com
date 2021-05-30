import {
  ComponentType,
  createContext,
  FunctionComponent,
  useContext,
} from "react";
import { AppProps } from "next/app";

const PagePropsContext = createContext<AppProps["pageProps"]>({});

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
