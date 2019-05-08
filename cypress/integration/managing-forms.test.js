import 'cypress-testing-library/add-commands';

describe('creating forms', () => {
  beforeEach(() => {
    cy.createUserAndLogin({
      email: 'test+user@example.com',
      password: 'testpassword',
      name: 'Test user'
    });
  });

  it('fails to create form without a name', () => {
    cy.visit('/forms/new');
    cy.getByText('Create form').click();
    cy.getByText('Name must be at least 1 characters').should('be.visible');
  });

  it('successfully creates form', () => {
    cy.visit('/forms/new');
    cy.getByTestId('new-form-input-name').type('Form 1');
    cy.getByTestId('new-form-submit').click();
  });
});
