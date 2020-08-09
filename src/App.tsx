import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {Frame} from './foundation';
import {HOST_URL} from '../config/client';
import {Home} from './sections/Home';

export function App() {
  const client = new ApolloClient({
    uri: `${HOST_URL}/api`,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Frame title='React Bootstrap App'>
        <Home />
      </Frame>
    </ApolloProvider>
  );
}
