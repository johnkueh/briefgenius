import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Button from '../button';
import Alert from '../alert-messages';

const ResetPassword = ({ messages, onSubmit }) => (
  <Formik initialValues={{ password: '', repeatPassword: '' }} onSubmit={onSubmit}>
    {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <Form className="mt-3">
        <Alert messages={messages} />
        <label className="mb-3">Set a new password for your account</label>
        <Field
          autoFocus
          name="password"
          className="form-control mb-3"
          type="password"
          placeholder="New password"
        />
        <Field
          name="repeatPassword"
          className="form-control mb-3"
          type="password"
          placeholder="Re-enter new password"
        />
        <div className="mt-4">
          <Button loading={isSubmitting} className="btn btn-block btn-primary" type="submit">
            Reset password
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default ResetPassword;

ResetPassword.propTypes = {
  messages: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};
