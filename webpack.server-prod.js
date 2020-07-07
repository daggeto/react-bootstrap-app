const path = require("path");

const nodeExternals = require('webpack-node-externals');

const babelOptions = {
  presets: ["@babel/env"],
}

module.exports = {
  target: "node",
  mode: 'development',
  entry: "./server/index.ts",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 8080,
    publicPath: "http://localhost:8080/",
  },
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  resolve: { extensions: ["*", '.tsx', '.ts', ".js", "index.ts"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: '/',
    filename: "bundle-server.js"
  },
  plugins: [],
  node: {
    fs: 'empty',
    net: 'empty'
  }
}

