import React, { ComponentType } from "react";
import Head from "next/head";
import App, { AppContext } from "next/app";
import { withTheme } from "../theme";
import { withLayout } from "../layout";
import { withEmotionCache } from "../contexts/emotion-cache";
import { withPageProps } from "../contexts/page-props";

type WithHead = <T>(Component: ComponentType<T>) => ComponentType<T>;

const withHead: WithHead = (Component) => (props) =>
  (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...props} />
    </>
  );

export default class extends App<{}, {}, {}> {
  render() {
    const { Component, pageProps } = this.props;
    const WrappedComponent = [
      withEmotionCache,
      withPageProps,
      withTheme,
      withHead,
      withLayout,
    ].reduceRight((Child, withHoc) => withHoc(Child), Component);
    return <WrappedComponent {...pageProps} />;
  }
}
