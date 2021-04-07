import React, { useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/styles";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@material-ui/core";
import createCache from "@emotion/cache";
import theme from "../theme";
import { Layout } from "../layout";

export const cache = createCache({ key: "css", prepend: true });

const _App = (props: AppProps) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default _App;
