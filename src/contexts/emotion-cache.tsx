import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ComponentType, useEffect } from "react";
import createEmotionServer from "@emotion/server/create-instance";

const cache = createCache({ key: "css", prepend: true });

export const { extractCriticalToChunks } = createEmotionServer(cache);

type WithEmotionCache = <T>(Component: ComponentType<T>) => ComponentType<T>;

export const withEmotionCache: WithEmotionCache = (Component) => (props) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Component {...props} />
    </CacheProvider>
  );
};
