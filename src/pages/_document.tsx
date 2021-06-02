import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/styles";
import { theme } from "../theme";
import {
  withEmotionCache,
  extractCriticalToChunks,
} from "../contexts/emotion-cache";

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
          <script
            data-ad-client="ca-pub-8946662180194573"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-Z4EFX395RV"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());

            gtag('config', 'G-Z4EFX395RV');
            `,
            }}
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
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
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
