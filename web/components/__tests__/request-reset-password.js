import RequestResetPassword from '../request-reset-password';
import React, { useContext } from 'react';
import {
  render,
  fireEvent,
  cleanup,
  wait,
  waitForElement,
  waitForDomChange
} from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

it('displays success messages', () => {
  const handler = jest.fn();
  const { container, getByText } = render(
    <RequestResetPassword
      messages={{ success: { email: 'We will send you a link to reset your password' } }}
      onSubmit={handler}
    />
  );

  const alert = getByText('We will send you a link to reset your password');
  expect(alert.parentNode).toHaveClass('alert alert-success');
  expect(alert).toHaveTextContent('We will send you a link to reset your password');
});

it('displays error messages', () => {
  const handler = jest.fn();
  const { container, getByText } = render(
    <RequestResetPassword
      messages={{ error: { email: 'Wrong email entered' } }}
      onSubmit={handler}
    />
  );

  const alert = getByText('Wrong email entered');
  expect(alert.parentNode).toHaveClass('alert alert-error');
});

it('submits with correct data', async () => {
  const handler = jest.fn((_, { setSubmitting }) => {
    setSubmitting(false);
  });
  const { container, getByText, getByPlaceholderText } = render(
    <RequestResetPassword onSubmit={handler} />
  );
  fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@user.com' } });
  const submitButton = getByText(/submit/i);
  expect(container.firstChild).toHaveFormValues({
    email: 'test@user.com'
  });
  expect(submitButton).not.toHaveAttribute('disabled');
  fireEvent.click(submitButton);
  expect(submitButton).toHaveAttribute('disabled');
  await wait(() => {
    expect(handler).toHaveBeenCalledWith(
      { email: 'test@user.com' },
      expect.objectContaining({ setSubmitting: expect.any(Function) })
    );
    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
