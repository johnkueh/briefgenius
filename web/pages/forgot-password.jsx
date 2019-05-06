import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { useErrorMessages } from '../lib/use-error-messages';
import Layout from '../layouts/auth';
import ForgotPassword from '../components/forgot-password';

export const FORGOT_PASSWORD = gql`
  mutation($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
    }
  }
`;

const ForgotPasswordPage = () => {
  const [messages, setMessages] = useState(null);
  const [errorMessages, setErrorMessages] = useErrorMessages(null);
  const forgotPassword = useMutation(FORGOT_PASSWORD);

  return (
    <Layout>
      <ForgotPassword
        messages={errorMessages || messages}
        onSubmit={async (currentValues, { setSubmitting }) => {
          const { email } = currentValues;

          try {
            const {
              data: {
                forgotPassword: { message }
              }
            } = await forgotPassword({
              variables: {
                input: { email }
              }
            });

            setMessages({
              success: {
                email: message
              }
            });

            setSubmitting(false);
          } catch (error) {
            setErrorMessages(error);
            setSubmitting(false);
          }
        }}
      />
    </Layout>
  );
};

export default ForgotPasswordPage;
