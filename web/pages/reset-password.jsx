import { useState, useEffect, useContext } from 'react';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Layout from '../layouts/auth';
import ResetPassword from '../components/reset-password';

export const RESET_PASSWORD = gql`
  mutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
    }
  }
`;

const ResetPasswordPage = ({
  router: {
    query: { token: queryToken }
  }
}) => {
  const [messages, setMessages] = useState(null);
  const [token, setToken] = useState('');
  const resetPassword = useMutation(RESET_PASSWORD);

  useEffect(() => {
    setToken(queryToken);
  }, [queryToken]);

  return (
    <Layout>
      <ResetPassword
        token={token}
        messages={messages}
        onSubmit={async (currentValues, { setSubmitting }) => {
          const { password, repeatPassword, token } = currentValues;

          try {
            const {
              data: {
                ResetPassword: { message }
              }
            } = await resetPassword({
              variables: {
                input: { password, repeatPassword, token }
              }
            });

            setMessages({
              success: {
                password: message
              }
            });

            setToken('');

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

export default withRouter(ResetPasswordPage);
