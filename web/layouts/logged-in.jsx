import Link from 'next/link';
import MainLayout from './main';

const LoggedInLayout = ({ children }) => (
  <MainLayout>
    <Link href="/">
      <a>
        <h3 className="mb-5">briefgenius</h3>
      </a>
    </Link>
    {children}
  </MainLayout>
);

export default LoggedInLayout;

LoggedInLayout.propTypes = {};
