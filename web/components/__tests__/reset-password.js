import ResetPassword from '../reset-password';
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
    <ResetPassword
      messages={{ success: { password: 'Your password has been reset' } }}
      onSubmit={handler}
    />
  );

  const alert = getByText('Your password has been reset');
  expect(alert.parentNode).toHaveClass('alert alert-success');
  expect(alert).toHaveTextContent('Your password has been reset');
});

it('displays error messages', () => {
  const handler = jest.fn();
  const { container, getByText } = render(
    <ResetPassword
      messages={{ error: { password: 'New password is too short' } }}
      onSubmit={handler}
    />
  );

  const alert = getByText('New password is too short');
  expect(alert.parentNode).toHaveClass('alert alert-error');
});

it('submits with correct data', async () => {
  const handler = jest.fn((_, { setSubmitting }) => {
    setSubmitting(false);
  });
  const { container, getByText, getByPlaceholderText } = render(
    <ResetPassword onSubmit={handler} />
  );
  fireEvent.change(getByPlaceholderText('New password'), { target: { value: 'newpassword' } });
  fireEvent.change(getByPlaceholderText('Re-enter new password'), {
    target: { value: 'newpassword' }
  });
  const submitButton = getByText(/reset password/i);
  expect(container.firstChild).toHaveFormValues({
    password: 'newpassword',
    repeatPassword: 'newpassword'
  });
  expect(submitButton).not.toHaveAttribute('disabled');
  fireEvent.click(submitButton);
  expect(submitButton).toHaveAttribute('disabled');
  await wait(() => {
    expect(handler).toHaveBeenCalledWith(
      { password: 'newpassword', repeatPassword: 'newpassword' },
      expect.objectContaining({ setSubmitting: expect.any(Function) })
    );
    expect(submitButton).not.toHaveAttribute('disabled');
  });
});
