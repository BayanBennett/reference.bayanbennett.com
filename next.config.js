module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.output.hotUpdateMainFilename =
      config.output.hotUpdateMainFilename.replace(
        "[fullhash].hot-update.json",
        "[runtime].[fullhash].hot-update.json"
      );
    return config;
  },
};
