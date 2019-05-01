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
          <h3 className="mb-5">briefgenius</h3>
        </a>
      </Link>
      {children}
    </MainLayout>
  );
};

export default LoggedInLayout;

LoggedInLayout.propTypes = {};
