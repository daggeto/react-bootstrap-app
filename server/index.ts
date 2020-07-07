import Koa from 'koa';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpack from 'webpack';
import server from 'koa-static';

const app = new Koa();
const config = require('../webpack.server-prod.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(server('./public'));

// Serve the files on port 3001.
app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});
