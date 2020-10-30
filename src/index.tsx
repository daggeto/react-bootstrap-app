
import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./App";
import {
  from,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import fetch from 'cross-fetch';
import {createAuthorizationLink, apolloRefreshTokenLink, errorLink} from './links';

declare global {
  interface Window {
    __APOLLO_STATE__: any;
  }
}

console.log("window.__APOLLO_STATE__", window.__APOLLO_STATE__);
const httpLink = new HttpLink({ uri: '/api', fetch});
const client = new ApolloClient({
  credentials: 'include',
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: from([
    apolloRefreshTokenLink(),
    createAuthorizationLink(),
    errorLink(),
    httpLink,
  ]),
});

const app = <App apolloClient={client}/>

ReactDOM.hydrate(app, document.getElementById("root"));
