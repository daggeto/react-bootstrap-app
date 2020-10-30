import React, {useEffect, useState} from "react";
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import fetch from 'cross-fetch';
import {Frame} from './foundation';
import { Routes } from "./Routes";
import {setAccessToken} from './accessToken';
import {HOST_URL} from '../config/client';

interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  location?: string;
}

export function App({apolloClient, location}: Props) {
  const [loading, setLoading] = useState(true);

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

  // if (loading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <ApolloProvider client={apolloClient}>
      <Frame title='React Bootstrap App'>
        <Routes location={location}/>
      </Frame>
    </ApolloProvider>
  );
}
