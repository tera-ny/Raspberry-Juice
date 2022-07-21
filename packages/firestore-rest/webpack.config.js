"use strict";

const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: "node",
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [
    nodeExternals(),
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
    }),
  ],
  mode: 'development',
  devtool: "source-map",
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: path.join(__dirname, "src/index.ts"),
  output: {
      path: path.join(__dirname, "dist/js"),
      filename: `index.min.js`,
      libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "swc-loader",
          options: {
            // This makes swc-loader invoke swc synchronously.
            sync: true,
            jsc: {
              parser: {
                syntax: "typescript",
                tsx: false,
                decorators: false,
                dynamicImport: false
              },
              target: "es2021",
              loose: false,
              externalHelpers: false,
              baseUrl: "src",
              paths: {
                "~/*": [
                  "*"
                ]
              },
              
            },
            minify: true
          }
        }
      }
    ]
  }
}