import React from 'react';
import { useUsersQuery } from '../../generated/graphql';

export function Home() {
  const { loading, error, data } = useUsersQuery({
    fetchPolicy: 'network-only',
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;

  console.log('GQL dataa: ', data);

  return (
    <div className='App'>
      {data.users.length == 0 ? 'No users' : data.users[0].email}
    </div>
  );
}
