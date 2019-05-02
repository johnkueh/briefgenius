import Login from '../log-in';
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

it('displays errors', () => {
  const handler = jest.fn();
  const { container } = render(
    <Login errors={{ name: 'Too long', email: 'Not an email' }} onSubmit={handler} />
  );

  expect(container).toHaveTextContent('Too long');
  expect(container).toHaveTextContent('Not an email');
});

it('submits with correct data', async () => {
  const handler = jest.fn();
  const { container, getByText, getByPlaceholderText } = render(<Login onSubmit={handler} />);

  const emailInput = getByPlaceholderText('Email address');
  fireEvent.change(emailInput, { target: { value: 'test@user.com' } });

  const passwordInput = getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const submitButton = getByText(/log in/i).closest('button');

  expect(container.firstChild).toHaveFormValues({
    email: 'test@user.com',
    password: 'password'
  });

  expect(submitButton).not.toHaveAttribute('disabled');
  fireEvent.click(submitButton);
  expect(submitButton).toHaveAttribute('disabled');

  await wait(() => {
    expect(handler).toHaveBeenCalledWith(
      { email: 'test@user.com', password: 'password' },
      expect.objectContaining({ setSubmitting: expect.any(Function) })
    );
  });
});
