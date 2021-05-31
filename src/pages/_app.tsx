import React, { ComponentType } from "react";
import Head from "next/head";
import App from "next/app";
import { withTheme } from "../theme";
import { withLayout } from "../layout";
import { withEmotionCache } from "../contexts/emotion-cache";
import { withPageProps } from "../contexts/page-props";

const workboxWindowImportPromise = import("workbox-window");

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
  async componentDidMount() {
    if ("serviceWorker" in navigator) {
      const { Workbox } = await workboxWindowImportPromise;
      const wb = new Workbox("/_next/static/chunks/service-worker.js");
      wb.register();
    }
  }
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
