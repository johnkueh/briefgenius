import React, { useContext, useEffect } from 'react';
import Router from 'next/router';
import PageLoading from '../components/page-loading';
import { AuthContext } from '../contexts/authentication';

const Logout = () => {
  const { setUser, setJwt, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    setUser(null);
    setJwt(null);
    setIsLoggedIn(false);

    Router.push('/login');
  });

  return <PageLoading title="Logging out..." />;
};

export default Logout;
