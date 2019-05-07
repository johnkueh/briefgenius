import './commands';

beforeEach(() => {
  cy.task('prisma', {
    deleteManyUsers: {
      email_in: ['test+user@example.com']
    }
  });
  cy.visit('/signup');
  cy.getByPlaceholderText('Name').type('Test user');
  cy.getByPlaceholderText('Email address').type('test+user@example.com');
  cy.getByPlaceholderText('Password').type('testpassword');
  cy.getByText('Sign up').click();
  cy.url().should('include', '/forms');
});

beforeEach(() => {});
