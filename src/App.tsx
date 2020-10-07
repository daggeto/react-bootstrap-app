import React, {useEffect, useState} from "react";
import {
  from,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import {Frame} from './foundation';
import { Routes } from "./Routes";
import {getAccessToken, setAccessToken} from './accessToken';
import {HOST_URL} from '../config/client';

export function App() {
  const [loading, setLoading] = useState(true);
  const setAuthorizationLink = setContext((request, previousContext) => {
    const accessToken = getAccessToken();

    console.log('Sending this token with request: ', accessToken);
    return {
      headers: { authorization: accessToken ? `bearer ${accessToken}` : '' },
    };
  });

  const apolloRefreshTokenLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();
      if (!token) return true;

      try {
        const {exp} = jwtDecode(token);
        return !(Date.now() >= exp * 1000);
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch(`${HOST_URL}/refresh_token`, {
        method: 'POST',
        credentials: 'include',
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: (err) => {
      console.warn('Your refresh token is invalid. Try to relogin');
      console.error(err);
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const httpLink = new HttpLink({ uri: '/api' });

  const client = new ApolloClient({
    credentials: 'include',
    cache: new InMemoryCache(),
    link: from([
      apolloRefreshTokenLink,
      setAuthorizationLink,
      httpLink,
      errorLink,
    ]),
  });

  useEffect(() => {
    fetch(`${HOST_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (response) => {
      const data = await response.json();

      setAccessToken(data.accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <ApolloProvider client={client}>
      <Frame title='React Bootstrap App'>
        <Routes />
      </Frame>
    </ApolloProvider>
  );
}
