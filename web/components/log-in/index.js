import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import Alert from '../alert';

const LogIn = ({ errors, onSubmit }) => (
  <Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <Form className="mt-3">
        <Alert type="warning" messages={errors} />
        <Field
          autoFocus
          name="email"
          className="form-control mb-3"
          type="email"
          placeholder="Email address"
        />
        <Field
          name="password"
          className="form-control mb-3"
          type="password"
          placeholder="Password"
        />
        <div className="mt-4">
          <button disabled={isSubmitting} className="btn btn-block btn-primary" type="submit">
            Log in
          </button>
        </div>
        <div className="mt-3">
          <div>
            Dont have an account?{' '}
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </div>
          <div className="mt-1">
            <Link href="/forgot-password">
              <a>Forgot your password?</a>
            </Link>
          </div>
        </div>
      </Form>
    )}
  </Formik>
);

export default LogIn;

LogIn.propTypes = {
  errors: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
