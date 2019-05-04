import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import Button from '../button';
import Alert from '../alert-messages';

const SignUp = ({ messages, onSubmit }) => (
  <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={onSubmit}>
    {({ isSubmitting }) => (
      <Form className="mt-3">
        <Alert messages={messages} />
        <Field
          autoFocus
          name="email"
          className="form-control mb-3"
          type="email"
          placeholder="Email address"
        />
        <Field name="name" className="form-control mb-3" type="text" placeholder="Name" />
        <Field
          name="password"
          className="form-control mb-3"
          type="password"
          placeholder="Password"
        />
        <div className="mt-4">
          <Button loading={isSubmitting} className="btn btn-block btn-primary" type="submit">
            Sign up
          </Button>
        </div>
        <div className="mt-3">
          Have an account?{' '}
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </div>
      </Form>
    )}
  </Formik>
);

export default SignUp;

SignUp.propTypes = {
  messages: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
