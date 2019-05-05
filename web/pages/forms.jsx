import React from 'react';
import Link from 'next/link';
import Layout from '../layouts/logged-in';

const Forms = () => {
  return (
    <Layout>
      <h2>Welcome to BriefGenius</h2>
      <p className="text-muted">No forms created yet</p>
      <Link href="/forms/new">
        <a href="/forms/new" className="mt-3 btn btn-primary">
          Create a form
        </a>
      </Link>
    </Layout>
  );
};

export default Forms;
