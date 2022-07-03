const CracoLessPlugin = require("craco-less");
const path = require("path");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {"@primary-color": "#1DA57A"},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
