describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('focuses on email input', () => {
    cy.focused().should('have.id', 'email');
  });

  it('shows login button ', () => {
    cy.get('button[type=submit]').contains('Login');
  });

  describe('Unauthorized route', () => {
    it('redirects to login page', () => {
      // user must have token, etc. to view protected routes
      cy.visit('/todos');
      cy.url().should('include', '/login');
    });

    it('shows unauthorized redirect error notification', () => {
      cy.visit('/todos');
      cy.get('[data-testid="notification"]').should(elem => {
        expect(elem.attr('class')).to.include('bg-red');
      });
    });
  });
});
