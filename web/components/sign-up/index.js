import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Link from 'next/link';
import Alert from '../alert';

const SignUp = ({ errors, onSubmit }) => (
  <>
    <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={onSubmit}>
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} className="mt-3">
          {errors && <Alert type="warning" messages={errors.map(error => error.message)} />}
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
          <input
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            className="form-control mb-3"
            type="text"
            placeholder="Name"
          />
          <input
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className="form-control mb-3"
            type="password"
            placeholder="Password"
          />
          <div className="mt-4">
            <button disabled={isSubmitting} className="btn btn-block btn-primary" type="submit">
              Sign up
            </button>
          </div>
          <div className="mt-3">
            Have an account?{' '}
            <Link href="/login">
              <a>Log in</a>
            </Link>
          </div>
        </form>
      )}
    </Formik>
  </>
);

export default SignUp;

SignUp.propTypes = {
  errors: PropTypes.array,
  onSubmit: PropTypes.func.isRequired
};
