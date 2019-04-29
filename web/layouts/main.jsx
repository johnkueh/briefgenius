import React from 'react';
import '../styles/index.scss';

const MainLayout = ({ children }) => <div className="container py-5">{children}</div>;

export default MainLayout;

MainLayout.propTypes = {};
