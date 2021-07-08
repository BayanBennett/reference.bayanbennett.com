const { InjectManifest } = require("workbox-webpack-plugin");
const { resolve } = require("path");

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer, dir }) => {
    if (isServer) return config;
    config.output.hotUpdateMainFilename =
      config.output.hotUpdateMainFilename.replace(
        "[fullhash].hot-update.json",
        "[runtime].[fullhash].hot-update.json"
      );
    config.plugins.push(
      new InjectManifest({
        swSrc: resolve(dir, "src", "service-worker"),
        swDest: resolve(
          config.output.path,
          "static",
          "chunks",
          "service-worker.js"
        ),
      })
    );
    return config;
  },
};
