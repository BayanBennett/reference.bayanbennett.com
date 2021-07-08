import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ComponentType } from "react";
import createEmotionServer from "@emotion/server/create-instance";

const cache = createCache({ key: "css", prepend: true });
cache.compat = true;

export const { extractCriticalToChunks } = createEmotionServer(cache);

type WithEmotionCache = <T>(Component: ComponentType<T>) => ComponentType<T>;

export const withEmotionCache: WithEmotionCache = (Component) => (props) =>
  (
    <CacheProvider value={cache}>
      <Component {...props} />
    </CacheProvider>
  );
