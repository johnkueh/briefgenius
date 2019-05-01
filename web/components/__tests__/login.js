import Login from '../log-in';
import React, { useContext } from 'react';
import {
  render,
  fireEvent,
  cleanup,
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
  const { container, getByText, getByPlaceholderText } = render(
    <Login
      onSubmit={(data, { setSubmitting }) => {
        expect(data).toEqual({
          email: 'test@user.com',
          password: 'password'
        });
        expect(setSubmitting).toBeInstanceOf(Function);
        setSubmitting(false);
      }}
    />
  );

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
});
