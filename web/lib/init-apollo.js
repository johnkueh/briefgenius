import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './fragment-types.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});

// From https://raw.githubusercontent.com/zeit/next.js/master/examples/with-apollo/lib/init-apollo.js
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.API_ENDPOINT, // Server URL (must be absolute)
      // headers: {
      //   Authorization: `Bearer ${API_KEY}`
      // } 
    }),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
