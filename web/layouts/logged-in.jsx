import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/authentication';
import MainLayout from './main';

const LoggedInLayout = ({ children }) => {
  const { jwt, user, isLoggedIn } = useContext(AuthContext);
  console.log(jwt, user, isLoggedIn);

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
