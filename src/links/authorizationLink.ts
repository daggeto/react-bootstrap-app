import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '../accessToken';

export function createAuthorizationLink() {
  return setContext((request, previousContext) => {
  const accessToken = getAccessToken();

  return {
    headers: { authorization: accessToken ? `bearer ${accessToken}` : '' },
  };
});
}
