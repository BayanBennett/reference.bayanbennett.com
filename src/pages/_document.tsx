import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import createEmotionServer from "@emotion/server/create-instance";
import { theme } from "../theme";

const getCache = () => {
  const cache = createCache({ key: "css", prepend: true });
  cache.compat = true;

  return cache;
};

export default class extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  static getInitialProps: typeof Document.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const cache = getCache();
    const { extractCriticalToChunks } = createEmotionServer(cache);

    ctx.renderPage = new Proxy(ctx.renderPage, {
      apply: (target) =>
        target({
          enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
          enhanceComponent: (Component) => (props) => (
            <CacheProvider value={cache}>
              <Component {...props} />
            </CacheProvider>
          ),
        }),
    });

    const initialProps = await Document.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
        ...emotionStyleTags,
      ],
    };
  };
}
