import { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Layout from '../layouts/auth';
import ResetPassword from '../components/reset-password';

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    ResetPassword(input: $input) {
      message
    }
  }
`;

const ResetPasswordPage = () => {
  const [messages, setMessages] = useState(null);
  const resetPassword = useMutation(RESET_PASSWORD);

  return (
    <Layout>
      <ResetPassword
        messages={messages}
        onSubmit={async (currentValues, { setSubmitting }) => {
          const { password } = currentValues;

          try {
            const {
              data: {
                ResetPassword: { message }
              }
            } = await resetPassword({
              variables: {
                input: { password }
              }
            });

            setMessages({
              success: {
                password: message
              }
            });

            setSubmitting(false);
          } catch (error) {
            setMessages({
              warning: error.graphQLErrors[0].extensions.exception.errors
            });
            setSubmitting(false);
          }
        }}
      />
    </Layout>
  );
};

export default ResetPasswordPage;
