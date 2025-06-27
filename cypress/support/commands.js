// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('apiRequest', (method, endpoint, options = {}) => {
  const token = Cypress.env('token') || 'f929eda2ef68bb912176f742e9339472b997910ab73fc10fa92de5fd5d35c7aa';

  cy.request({
    method,
    url: `${Cypress.env('baseUrl') || 'https://gorest.co.in/'}${endpoint.replace(/^\/+/, '')}`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
    body: options.body,
    ...options,
  });
});
