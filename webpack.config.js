const path = require("path");
const CssPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  plugins: [new CssPlugin({ filename: "bundle.css" })],
  entry: "./public/js/vendor/cheerios/dumpsterfire-pages/src/js/Application.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/dist"),
  },
  ignoreWarnings: [
    {
      message:
        /Critical dependency: the request of a dependency is an expression/,
    },
  ],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@root": path.resolve(__dirname, ""),
      "@vendor": path.resolve(__dirname, "./vendor/cheerios"),
      "@compiled": path.resolve(__dirname, "./public/js/src/vendor/cheerios/dumpsterfire-pages/src/js")
    },
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [CssPlugin.loader, "css-loader"],
      },
    ],
  },
};
