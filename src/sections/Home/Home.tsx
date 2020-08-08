import React from 'react';
import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query Users {
    users {
      id
      email
    }
  }
`;

export function Home() {

  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log('GQL data: ', data);

  return (
    <div className='App'>
      <button > Send Requests </button>
    </div>
  );
}
