import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ type, errors }) =>
  errors && (
    <div className={`alert alert-${type}`}>
      {_.map(errors, (val, key) => (
        <p key={key} className="m-0 mb-1">
          {val}
        </p>
      ))}
    </div>
  );

export default Alert;

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  errors: PropTypes.object
};
