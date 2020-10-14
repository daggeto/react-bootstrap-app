import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import serve from 'koa-static';
import Router from 'koa-router';
import koaProxy from 'koa-better-http-proxy';
import send from 'koa-send';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import {App} from '../src/App';

import {API_URL} from '../config/server';
const isDevelopment = process.env.NODE_ENV !== 'production';

const app = new Koa();
app.proxy = true;

app.use(serve('./public'));

const router = new Router();
router.get(/^\/?.*?/, async (ctx) => {
  await new Promise((resolve, reject) => {
    fs.readFile(path.resolve('./public/template.html'), 'utf-8', (error, data) => {
      if (error) {
        ctx.status = 500;
        ctx.body = "Couldn't find index.html";

        return reject(error);
      }

      // const app = ReactDOMServer.renderToString(React.createElement(App));
      const body = data.replace('<div id="root"></div>', `<div id="root"></div>`);
      ctx.body = body;

      resolve();
    });
  });
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
