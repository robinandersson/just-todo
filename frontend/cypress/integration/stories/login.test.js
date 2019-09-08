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
        // it is enough to test if 'bg-red' is present in classname, the actual number (e.g. bg-red-400) is irrelevant
        expect(elem.attr('class')).to.include('bg-red');
      });
    });
  });
});

/* this test needs following data seeded into database to pass:
 *
 * users.username: 'John Doe'
 * users.email: 'test@test.com'
 * users.password: 'test_password'
 */
describe('Login attempt', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  const email = 'test@test.com';
  const password = 'test_password';
  const wrongPassword = 'wrong_password';

  it('fails, remains on page and shows error notification', () => {
    // incorrect password on purpose
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(`${wrongPassword}{enter}`);

    // we should have visible errors now
    cy.get('[data-testid=notification]').should(elem => {
      // it is enough to test if 'bg-red' is present in classname, the actual number (e.g. bg-red-400) is irrelevant
      expect(elem.attr('class')).to.include('bg-red');
    });

    // and still be on the same URL
    cy.url().should('include', '/login');
  });

  it('succeeds, redirects to /todos', () => {
    // correct login credentials
    cy.get('input[name=email]').type(email);
    cy.get('input[name=password]').type(`${password}{enter}`);

    // should redirect to /todos
    cy.url().should('include', '/todos');
  });
});
