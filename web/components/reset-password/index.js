import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Link from 'next/link';
import Alert from '../alert';

const ResetPassword = ({ messages, onSubmit }) => (
  <Formik initialValues={{ password: '', repeatPassword: '' }} onSubmit={onSubmit}>
    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit} className="mt-3">
        {_.map(messages, (content, type) => (
          <Alert key={type} type={type} messages={content} />
        ))}
        <label className="mb-3">Set a new password for your account</label>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          autoFocus
          name="password"
          className="form-control mb-3"
          type="password"
          placeholder="New password"
        />
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.repeatPassword}
          name="repeatPassword"
          className="form-control mb-3"
          type="password"
          placeholder="Re-enter new password"
        />
        <div className="mt-4">
          <button disabled={isSubmitting} className="btn btn-block btn-primary" type="submit">
            Reset password
          </button>
        </div>
      </form>
    )}
  </Formik>
);

export default ResetPassword;

ResetPassword.propTypes = {
  messages: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
