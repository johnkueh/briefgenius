describe('logging in successfully', () => {
  it('logs in with correct email and password', () => {
    cy.visit('http://localhost:3000/login');
  });
});
