import Alert from '../alert';
import React, { useContext } from 'react';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

it('does not render anything if empty', () => {
  const { container } = render(<Alert type="success" />);

  expect(container).toBeEmpty();
});

it('renders correct alert type', () => {
  const { container } = render(<Alert messages={{ name: 'Too long' }} type="success" />);

  expect(container.firstChild).toHaveClass('alert alert-success');
});

it('renders error messages', () => {
  const { container } = render(
    <Alert messages={{ name: 'Too long', email: 'Not an email' }} type="error" />
  );

  expect(container).toHaveTextContent('Too long');
  expect(container).toHaveTextContent('Not an email');
});
