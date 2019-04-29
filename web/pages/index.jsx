import Layout from '../layouts/main';
import Link from 'next/link';

function Home() {
  return (
    <Layout>
      <div className="container">
        <h5 className="mb-3">briefgenius.com</h5>
        <Link href="/signup">
          <a className="btn btn-primary">Sign up</a>
        </Link>
        <Link href="/login">
          <a className="ml-2 btn btn-light">Log in</a>
        </Link>
      </div>
    </Layout>
  );
}

export default Home;
