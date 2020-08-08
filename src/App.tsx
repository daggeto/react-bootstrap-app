import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {Frame} from './foundation';
import {Home} from './sections/Home';

export function App() {
  const client = new ApolloClient({
    uri: 'http://react-app.io:8080/api',
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
