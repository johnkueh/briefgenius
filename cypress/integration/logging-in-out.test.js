import 'cypress-testing-library/add-commands';

describe('logging in errors', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('missing email', () => {
    cy.getByPlaceholderText('Password').type('testpassword');
    cy.getByText('Log in').click();
    cy.getByText('Email must be at least 1 characters').should('be.visible');
  });
  it('missing password', () => {
    cy.getByPlaceholderText('Email address').type('test@example.com');
    cy.getByText('Log in').click();
    cy.getByText('Password must be at least 6 characters').should('be.visible');
  });
  it('wrong credentials', () => {
    cy.getByPlaceholderText('Email address').type('test+wrong+user@example.com');
    cy.getByPlaceholderText('Password').type('testpassword');
    cy.getByText('Log in').click();
    cy.getByText('Please check your credentials and try again.').should('be.visible');
  });
});

describe('logging in success', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('correct credentials', () => {
    cy.getByPlaceholderText('Email address').type('test+user@example.com');
    cy.getByPlaceholderText('Password').type('testpassword');
    cy.getByText('Log in').click();
    cy.url().should('include', '/forms');
  });
});
