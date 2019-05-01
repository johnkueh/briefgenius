import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { AuthContext } from '../contexts/authentication';
import MainLayout from './main';

const LoggedInLayout = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      Router.push('/login');
    }
  });

  return (
    <MainLayout>
      <Link href="/">
        <a>
          <h3>briefgenius</h3>
        </a>
      </Link>
      <div className="my-5">{children}</div>
      <Link href="/logout">
        <a>Logout</a>
      </Link>
    </MainLayout>
  );
};

export default LoggedInLayout;

LoggedInLayout.propTypes = {};
