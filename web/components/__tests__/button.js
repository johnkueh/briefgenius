import Button from '../button';
import React, { useContext } from 'react';
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(() => {
  cleanup();
});

it('renders with child', () => {
  const { container } = render(<Button>Submit</Button>);

  expect(container).toHaveTextContent('Submit');
});

it('renders with props', () => {
  const { container } = render(
    <Button type="submit" className="btn btn-primary">
      Submit
    </Button>
  );

  expect(container).toHaveTextContent('Submit');
  expect(container.firstChild).toHaveClass('btn btn-primary');
  expect(container.firstChild).toHaveAttribute('type');
});

it('renders normal state by default', () => {
  const { container } = render(<Button className="btn btn-primary">Submit</Button>);

  expect(container.firstChild).not.toHaveTextContent('Loading...');
  expect(container.firstChild).not.toHaveAttribute('disabled');
});

it('renders loading state', () => {
  const { container } = render(
    <Button loading={true} loadingText="Submitting..." className="btn btn-primary">
      Log in
    </Button>
  );

  expect(container).not.toHaveTextContent('Log in');
  expect(container).toHaveTextContent('Submitting...');
  expect(container.firstChild).toHaveAttribute('disabled');
});

it('renders loading state, loadingText not provided', () => {
  const { container } = render(
    <Button loading={true} className="btn btn-primary">
      Submit
    </Button>
  );

  expect(container).toHaveTextContent('Submit');
  expect(container.firstChild).toHaveAttribute('disabled');
});

it('disabled props takes precedence over loading', () => {
  const { container } = render(
    <Button loading={false} disabled={true} className="btn btn-primary">
      Submit
    </Button>
  );

  expect(container.firstChild).toHaveAttribute('disabled');
});
