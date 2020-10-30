import Koa, { Context } from 'koa';
import fs from 'fs';
import path from 'path';
import serve from 'koa-static';
import Router from 'koa-router';
import koaProxy from 'koa-better-http-proxy';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fetch from 'cross-fetch';
import { getDataFromTree, renderToStringWithData } from '@apollo/react-ssr';
import { HOST_URL } from '../config/client';

import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { App } from '../src/App';
import {
  createAuthorizationLink,
  apolloRefreshTokenLink,
  errorLink,
} from '../src/links';

import { API_URL } from '../config/server';
const isDevelopment = process.env.NODE_ENV !== 'production';

const app = new Koa();
app.proxy = true;

app.use(serve('./public'));

const router = new Router();
router.get(/^\/?.*?/, async (ctx: Context) => {
  await new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve('./public/template.html'),
      'utf-8',
      (error, data) => {
        if (error) {
          ctx.status = 500;
          ctx.body = "Couldn't find index.html";

          return reject(error);
        }

        const httpLink = new HttpLink({
          uri: `${HOST_URL}/api`,
          fetch,
          credentials: 'same-origin',
          headers: {
            cookie: ctx.cookies,
          },
        });

        const client = new ApolloClient({
          ssrMode: true,
          credentials: 'include',
          // Remember that this is the interface the SSR server will use to connect to the
          // API server, so we need to ensure it isn't firewalled, etc
          link: from([
            apolloRefreshTokenLink(),
            createAuthorizationLink(),
            errorLink(),
            httpLink,
          ]),
          cache: new InMemoryCache(),
        });

        const app = <App apolloClient={client} location={ctx.request.url} />;

        renderToStringWithData(app).then((markup) => {
            // We are ready to render for real
          const initialState = client.extract();

          let body = data.replace('{content}', markup);
          body = body.replace(
            '{apollo_state_markup}',
            JSON.stringify(initialState).replace(/</g, '\\u003c'),
          );
          ctx.body = body;

          resolve();
        });
      },
    );
  });
});

const apiRouter = new Router();
apiRouter.post(
  '/',
  koaProxy(API_URL, {
    proxyReqPathResolver() {
      return '/graphql';
    },
  }),
);

router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

const refreshTokenRouter = new Router();
refreshTokenRouter.post(
  '/',
  koaProxy(API_URL, {
    proxyReqPathResolver() {
      return '/refresh_token';
    },
  }),
);

router.use(
  '/refresh_token',
  refreshTokenRouter.routes(),
  refreshTokenRouter.allowedMethods(),
);

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log(`Example app listening on ${PORT} !\n`);
});
