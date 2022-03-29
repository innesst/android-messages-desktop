import { Configuration } from "webpack";
import nodeExternals from "webpack-node-externals";
import process from "process";
import path from "path";
import merge from "webpack-merge";

const base: Configuration = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  externals: [nodeExternals()],
  devtool: "source-map",
  appId: "pw.electron.android-messages",
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
};

const main = merge(base, {
  name: "background",
  target: "electron-main",
  entry: "./src/background.ts",
  output: {
    filename: "background.js",
    path: path.resolve(__dirname, "app"),
  },
});

const preload = merge(base, {
  name: "bridge",
  target: "electron-preload",
  entry: "./src/bridge.ts",
  output: {
    filename: "bridge.js",
    path: path.resolve(__dirname, "app"),
  },
});

export default [main, preload];
