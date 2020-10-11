import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import serve from 'koa-static';
import Router from 'koa-router';
import koaProxy from 'koa-better-http-proxy';
import {API_URL} from '../config/server';
import {rejects} from 'assert';

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = new Koa();
app.proxy = true;

app.use(serve('./public'));

const router = new Router();
router.get(/^\/*/, async (ctx) => {
  await new Promise((resolve, reject) => {
    fs.readFile(path.resolve('./public/index.html'), 'utf-8', (error, data) => {
      if (error) {
        ctx.status = 500;
        ctx.body = "Couldn't find index.html";

        return reject(error);
      }

      ctx.body = data;

      resolve();
    });
  });

  console.log('After file system');
});

const apiRouter = new Router();
apiRouter.post('/', koaProxy(API_URL, {
  proxyReqPathResolver() {
    return '/graphql';
  },
}));

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

const refreshTokenRouter = new Router();
refreshTokenRouter.post('/', koaProxy(API_URL, {
  proxyReqPathResolver() {
    return '/refresh_token';
  },
}));

router.use('/refresh_token', refreshTokenRouter.routes(), refreshTokenRouter.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Example app listening on ${PORT} !\n`);
});
