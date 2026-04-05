const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: {
    main: ["./src/client/index.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
    }),
  ],
  devServer: {
    proxy: [
      {
        context: ["/api", "/auth"],
        target: "http://localhost:9000",
      },
    ],
    historyApiFallback: {
      disableDotRule: true,
    },
    port: 3000,
    allowedHosts: ["web", "localhost"],
  },
};
