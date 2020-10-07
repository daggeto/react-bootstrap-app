const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  node: {
    fs: "empty"
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '/'),
    publicPath: "/",
    filename: "bundle.js"
  },
});
