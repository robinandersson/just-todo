describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses on email input', () => {
    cy.focused().should('have.id', 'email');
  });

  it('shows login button ', () => {
    cy.get('button[type="submit"]').contains('Login');
  });
});
