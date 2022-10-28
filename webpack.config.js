const path = require("path");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || "development",
  devMode = mode === "development",
  target = devMode ? "web" : "browserslist",
  devtool = devMode ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool,
  entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, "production"),
    clean: true,
    filename: "js/[contenthash].js",
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.(c|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(ttf|ttc|otf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[contenthash].[ext]",
        },
      },
      {
        test: /\.(jpg|svg|png)/i,
        generator: {
          filename: "assets/img/[contenthash].[ext]",
        },
      },
      {
        test: /\.ico/i,
        generator: {
          filename: "favicon[ext]",
        },
      },
    ],
  },
};
