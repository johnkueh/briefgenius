import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import Button from '../button';
import Alert from '../alert-messages';

const RequestResetPassword = ({ messages, onSubmit }) => (
  <Formik initialValues={{ email: '' }} onSubmit={onSubmit}>
    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <Form className="mt-3">
        <Alert messages={messages} />
        <label className="mb-3">Enter your email address to request for a password reset</label>
        <Field
          name="email"
          autoFocus
          className="form-control mb-3"
          type="email"
          placeholder="Email address"
        />
        <div className="mt-4">
          <Button loading={isSubmitting} className="btn btn-block btn-primary" type="submit">
            Submit
          </Button>
        </div>
        <div className="mt-3">
          Dont have an account?{' '}
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </div>
      </Form>
    )}
  </Formik>
);

export default RequestResetPassword;

RequestResetPassword.propTypes = {
  messages: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
