describe('Signup page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('focuses on username input', () => {
    cy.focused().should('have.id', 'username');
  });

  it('shows login button ', () => {
    cy.get('button[type="submit"]').contains('Signup');
  });
});
