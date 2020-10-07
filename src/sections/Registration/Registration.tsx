import React, { useState, useCallback, FormEvent } from 'react';
import {useRegisterMutation} from '../../generated/graphql';
import {RouteComponentProps} from 'react-router-dom';

export const Registration: React.FC<RouteComponentProps> = ({history}) =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register] = useRegisterMutation();

  const onSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    console.log('Form submitted');

    const response = await register({ variables: { email, password } });
    console.log("response", response);

    history.push('/');
  }, [email, password]);

  return (
    <form onSubmit={onSubmit}>
      <input
        value={email}
        placeholder='email'
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        value={password}
        type="password"
        placeholder='password'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button type="submit">Register</button>
    </form>
  );
}
