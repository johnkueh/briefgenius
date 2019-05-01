import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import ReactGA from 'react-ga';
import withApolloClient from '../lib/with-apollo-client';
import AuthProvider from '../contexts/authentication';
import '../styles/index.scss';

class MyApp extends App {
  componentDidMount() {
    // ReactGA.initialize('UA-137555254-1');
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <AuthProvider>
        <Container>
          <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloHooksProvider>
          </ApolloProvider>
        </Container>
      </AuthProvider>
    );
  }
}

export default withApolloClient(MyApp);
