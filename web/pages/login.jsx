import Router from 'next/router';
import Layout from '../layouts/auth';
import Login from '../components/log-in';

const LoginPage = () => {
  return (
    <Layout>
      <Login onSubmit={() => Router.push('/forms')} />
    </Layout>
  );
};

export default LoginPage;
