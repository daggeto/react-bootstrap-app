import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import {setAccessToken} from '../../../accessToken';
import {useLogoutMutation, useMeQuery} from '../../../generated/graphql';

interface Props {}

export function Header() {
  const [logout, {client}] = useLogoutMutation();

  const onLogoutClick = useCallback(async () => {
    await logout();
    setAccessToken('');
    await client!.resetStore();
  }, [])

  const {data, loading} = useMeQuery();
  let userBody: any = null;

  if (loading) {
    userBody = null;
  } else if (data && data.me) {
    userBody = (
      <div>
        <div>Logged in as: {data.me.email}</div>
        <button onClick={onLogoutClick}>Logout</button>
      </div>
    );
  }

  return (
    <header>
      <div className='Nav'>
        <div className='Link'>
          <Link to='/'>Homess</Link>
        </div>
        <div className='Link'>
          <Link to='/registration'>Register</Link>
        </div>
        <div className='Link'>
          <Link to='/login'>Login</Link>
        </div>
      </div>
      {userBody}
    </header>
  );
}
