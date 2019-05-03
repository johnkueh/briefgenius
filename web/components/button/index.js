import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ loading, loadingText, children, ...props }) => (
  <button disabled={loading} {...props}>
    {loadingText ? (loading ? loadingText : children) : children}
  </button>
);

export default Button;

Button.propTypes = {
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  children: PropTypes.node
};
