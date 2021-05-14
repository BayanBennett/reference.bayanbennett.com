module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    const chunkFileName = dev ? "[name].js" : "[name].[fullhash].js";

    config.output.chunkFilename = isServer
      ? chunkFileName
      : `static/chunks/${chunkFileName}`;

    return config;
  },
};
