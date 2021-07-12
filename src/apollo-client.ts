import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { createApolloProvider } from "@vue/apollo-option"

import config from './config';

const authToken = config.token;
const domain = config.domain;

const httpLink = new HttpLink({ uri: config.default_api_domain + "/graphql" });

const authMiddleware = () =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const authToken = config.token
    const domain = config.domain

    operation.setContext({
      headers: {
        Authorization: `Bearer ${authToken}`,
        'hypi-domain': `${domain}`
      },
    });
    return forward(operation);
  });

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: authMiddleware().concat(httpLink),
  cache,
});
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export { apolloProvider, apolloClient }
