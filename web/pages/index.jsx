import Layout from '../layouts/main';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout>
      <div className="container">
        <Link href="/">
          <h5 className="mb-3">briefgenius.com</h5>
        </Link>
        <div>
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </div>
        <div>
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
