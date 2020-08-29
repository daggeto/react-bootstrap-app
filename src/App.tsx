import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {Frame} from './foundation';
import { Routes } from "./Routes";

export function App() {
  const client = new ApolloClient({
    uri: `/api`,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Frame title='React Bootstrap App'>
        <Routes />
      </Frame>
    </ApolloProvider>
  );
}
