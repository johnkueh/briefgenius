import Alert from '../alert-messages';
import React, { useContext } from 'react';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

it('does not render anything if empty', () => {
  const { container } = render(<Alert />);

  expect(container).toBeEmpty();
});

it('renders success alert type', () => {
  const { container, getByText } = render(
    <Alert
      messages={{
        success: { email: 'Email is available!' }
      }}
    />
  );

  const alert = getByText('Email is available!');
  expect(alert).toHaveTextContent('Email is available!');
  expect(alert.parentNode).toHaveClass('alert alert-success');
});

it('renders error alert type', () => {
  const { container, getByText } = render(
    <Alert
      messages={{
        error: { name: 'Name is too long' }
      }}
    />
  );

  const alert = getByText('Name is too long');
  expect(alert.parentNode).toHaveClass('alert alert-error');
});
