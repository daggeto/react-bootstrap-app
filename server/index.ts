import Koa from 'koa';
import serve from 'koa-static';
import webpack from 'webpack';
import webpackMiddleware from 'koa-webpack-dev-middleware';
import Router from 'koa-router';
import koaProxy from 'koa-better-http-proxy';
import devWebpackConfig from '../webpack.dev';
import {API_URL} from '../config';

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = new Koa();
app.proxy = true;

const router = new Router();

if(isDevelopment) {
  const compiler = webpack(devWebpackConfig);
  app.use(webpackMiddleware(compiler), {
    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    lazy: true,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    publicPath: "/",
    // public path to bind the middleware to
    // use the same as in webpack

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
        colors: true
    }
  });

  router.get('/', (ctx) => {
    console.log('Static');
    ctx.body = ctx.webpack.fileSystem.readFileSync('/index.html');
  });

} else {
  app.use(serve('./public'));
}

const apiRouter = new Router();
apiRouter.post('/', koaProxy(API_URL, {
  proxyReqPathResolver() {
    return '/graphql';
  },
}));

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Example app listening on ${PORT} !\n`);
});
