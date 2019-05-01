import Layout from '../layouts/logged-in';
import Link from 'next/link';

const Forms = () => {
  return (
    <Layout>
      <h2>Welcome to BriefGenius</h2>
      <p className="text-muted">No forms created yet</p>
      <Link href="/forms/new">
        <a className="mt-3 btn btn-primary">Create a form</a>
      </Link>
    </Layout>
  );
};

export default Forms;
