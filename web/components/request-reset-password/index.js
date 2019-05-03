import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Link from 'next/link';
import Alert from '../alert';

const RequestResetPassword = ({ messages, onSubmit }) => (
  <Formik initialValues={{ email: '' }} onSubmit={onSubmit}>
    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <form onSubmit={handleSubmit} className="mt-3">
        {_.map(messages, (content, type) => (
          <Alert key={type} type={type} messages={content} />
        ))}
        <label className="mb-3">Enter your email address to request for a password reset</label>
        <input
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          autoFocus
          className="form-control mb-3"
          type="email"
          placeholder="Email address"
        />
        <div className="mt-4">
          <button disabled={isSubmitting} className="btn btn-block btn-primary" type="submit">
            Submit
          </button>
        </div>
        <div className="mt-3">
          Dont have an account?{' '}
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </div>
      </form>
    )}
  </Formik>
);

export default RequestResetPassword;

RequestResetPassword.propTypes = {
  messages: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
