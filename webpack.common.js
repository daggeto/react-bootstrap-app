
const path = require("path");
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production';

const babelOptions = {
  plugins: [].filter(Boolean)
}

module.exports = {
  entry: "./src/index.tsx",
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
    path: path.resolve(__dirname, "public/"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 8080,
    public: "http://react-app.io:8080",
    publicPath: "http://react-app.io:8080",
    hot: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://graphql-app.io:4000/graphql',
        pathRewrite: {'^/api' : ''}
      },
      '/refresh_token': {
        target: 'http://graphql-app.io:4000/refresh_token',
        pathRewrite: {'^/refresh_token' : ''}
      }
    }
  },
  plugins: [
    // isDevelopment && new ReactRefreshWebpackPlugin(),
    !isDevelopment && new MinifyPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ].filter(Boolean)
}
