import React from 'react';
import '../styles/index.scss';

const MainLayout = ({ children }) => (
  <div className="container p-5">
    <div className="row">
      <div className="col-md-6 offset-md-3">{children}</div>
    </div>
  </div>
);

export default MainLayout;

MainLayout.propTypes = {};
