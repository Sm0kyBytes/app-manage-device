describe('Complete User Workflow', () => {  
  
  interface LoginTest {
  description: string;
  email: string;
  password: string;
  expectedError?: string;
  expectedRedirect?: string;
}

  const loginTests : LoginTest[] = [
    {
      description: 'Should show email format validation error (missing @)',
      email: 'testexample.com', // Missing @ symbol
      password: 'testpassword',
    },
    {
      description: 'Should show email format validation error (missing domain)',
      email: 'test@', // Missing domain after @
      password: 'testpassword',
    },
    {
      description: 'Should show email format validation error (invalid domain)',
      email: 'test@testcom', // Missing dot in domain
      password: 'testpassword'  
    },
    {
      description: 'Should show email format validation error (missing top-level domain)',
      email: 'test@test.', // Missing top-level domain
      password: 'testpassword' 
    },
    {
      description: 'Should show password validation error (too short)',
      email: 'test@test.com', 
      password: 'te'
    },
    {
      description: 'Should show email password invalid error',
      email: 'test@test.com', 
      password: 'testpassword'
    },
    {
      description: 'Should successfully log in with correct email and password',
      email: 'test@test.com', 
      password: 'test'
    }
  ];

  loginTests.forEach((test) => {
    describe('Login Functionality', () => {
      beforeEach(() => {
        cy.visit('/login');
      });

      it(test.description, () => {
        cy.get('input[name="email"]').type(test.email);
        cy.get('input[name="password"]').type(test.password);
        cy.get('button[type="submit"]').click();
        cy.wait(5000);

        if (test.expectedError) {
          // Assert that the appropriate error message is displayed
          cy.get('.error-message') // Adjust the selector for your implementation
            .should('contain', test.expectedError);
        }

        if (test.expectedRedirect) {
          // Assert that the user is redirected to the expected page after login
          cy.url().should('include', test.expectedRedirect);
        }
      });
    });
  });
});
