import React from 'react';
import { useUsersQuery } from '../../generated/graphql';

export function Home() {
  const { loading, error, data } = useUsersQuery({
    fetchPolicy: 'cache-first',
  });

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>Error :(</p>;

  const users = data.users.length == 0 ? 'No users' : data.users.map((user) => {
    return <li key={user.id}>Email: {user.email}</li>
  });

  return (
    <div className='App'>
      <ul>{users || '-'}</ul>
    </div>
  );
}
