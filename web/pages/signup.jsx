import Router from 'next/router';
import Layout from '../layouts/auth';
import Signup from '../components/sign-up';

const SignupPage = () => {
  return (
    <Layout>
      <Signup onSubmit={() => Router.push('/forms')} />
    </Layout>
  );
};

export default SignupPage;
