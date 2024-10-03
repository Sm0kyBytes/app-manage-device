describe('Login Page - Multiple Users', () => {
  let usersData;

  // Load the fixture data once before running any tests
  before(() => {
    // Load the fixture data and store it in usersData
    cy.fixture('loginData').then((data) => {
      usersData = data.users;
    });
  });

  // Loop through each user in usersData and create a test case for each
  usersData.forEach((user) => {
    it(`Should ${user.shouldLoginSucceed ? 'successfully log in' : 'fail to log in'} with ${user.description}`, () => {
      // Visit the login page for each test case
      cy.visit('/login');

      // Enter the email and password
      cy.get('input[name="email"]').clear().type(user.email);
      cy.get('input[name="password"]').clear().type(user.password);

      // Submit the form
      cy.get('button[type="submit"]').click();

      // Check if login should succeed or fail
      if (user.shouldLoginSucceed) {
        // If login should succeed, check for redirection to dashboard
        cy.url().should('include', '/dashboard');
      } else {
        // If login should fail, check for an error message
        cy.contains('Login failed').should('be.visible');
      }
    });
  });
});
