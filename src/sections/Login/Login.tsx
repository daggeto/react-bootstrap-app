import React, { useState, useCallback, FormEvent } from 'react';
import { MeDocument, MeQuery, useLoginMutation } from '../../generated/graphql';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../../accessToken';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      console.log('Form submitted');

      const response = await login({
        variables: { email, password },
        update: (store, {data}) => {
          if (!data) {
            return null;
          }

          store.writeQuery<MeQuery>({
            query: MeDocument,
            data: {
              me: data.login.user,
            },
          });
        },
      });
      console.log('response', response);

      if (response && response.data) {
        console.log(
          'response.data.login.accessToken',
          response.data.login.accessToken,
        );
        setAccessToken(response.data.login.accessToken);
      }

      history.push('/');
    },
    [email, password],
  );

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
        type='password'
        placeholder='password'
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button type='submit'>Login</button>
    </form>
  );
};
