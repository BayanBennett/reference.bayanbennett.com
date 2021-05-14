import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import createEmotionServer from "@emotion/server/create-instance";
import { theme } from "../theme";
import { cache } from "./_app";

const { extractCritical } = createEmotionServer(cache);
const sheets = new ServerStyleSheets();

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
    ctx.renderPage = new Proxy(ctx.renderPage, {
      apply: (target) =>
        target({
          enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        }),
    });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
        <style
          key="emotion-style-tag"
          data-emotion={`css ${styles.ids.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: styles.css }}
        />,
      ],
    };
  };
}
