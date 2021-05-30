import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import { theme } from "../theme";
import {
  withEmotionCache,
  extractCriticalToChunks,
} from "../contexts/emotion-cache";
import globby from "globby";
import { resolve, sep } from "path";
import { pathArraysToTree } from "../components/path-tree/util";
import { GetStaticPaths } from "next";

const cwd = resolve("src", "data", "JavaScript");

const pathTreePromise = globby("**/*.md", {
  onlyFiles: true,
  cwd,
})
  .then((paths) => paths.map((path) => path.replace(/\.md$/, "").split(sep)))
  .then((pathArrays) => pathArraysToTree(pathArrays));

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

    ctx.renderPage = new Proxy(ctx.renderPage, {
      apply: (target) =>
        target({
          enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
          enhanceComponent: withEmotionCache,
        }),
    });

    const initialProps = await Document.getInitialProps(ctx);
    const pathTree = await pathTreePromise;
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
      pathTree,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
        ...emotionStyleTags,
      ],
    };
  };
}
