import _ from 'lodash';
import { useState } from 'react';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Layout from '../layouts/auth';
import Signup from '../components/sign-up';

const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    Signup(input: $input) {
      jwt
      user {
        name
        email
      }
    }
  }
`;

const SignupPage = () => {
  const [errors, setErrors] = useState(null);
  const signUp = useMutation(SIGNUP);
  return (
    <Layout>
      <Signup
        errors={errors}
        onSubmit={async (data, { setSubmitting }) => {
          try {
            const result = await signUp({
              variables: {
                input: data
              }
            });
            console.log(result);
            Router.push('/forms');
          } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
            setSubmitting(false);
          }
        }}
      />
    </Layout>
  );
};

export default SignupPage;
