import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';

const cmsAuthToken = process.env.CMS_AUTH_TOKEN;
const cmsUri = process.env.CMS_URI;

const httpLink = createHttpLink({
  uri: cmsUri,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: `Bearer ${cmsAuthToken}`,
  },
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
