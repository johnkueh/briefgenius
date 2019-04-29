import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactGA from 'react-ga';
import withApolloClient from '../lib/with-apollo-client';

class MyApp extends App {
  componentDidMount() {
    // ReactGA.initialize('UA-137555254-1');
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
