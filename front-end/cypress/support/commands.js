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
Cypress.Commands.add("resetDataBase", () => {
  cy.request("POST", "localhost:5000/clearbank");
});
Cypress.Commands.add("createRecomendation", () => {
  cy.request("POST", "localhost:5000/recommendations", {
    name: "musica Legal",
    youtubeLink: `https://youtu.be/08evFyfBEu8`,
  });
});
Cypress.Commands.add("upvote", (id) => {
  cy.request("POST", `localhost:5000/recommendations/${id}/upvote`);
});

Cypress.Commands.add("populeBank", () => {
  cy.request("POST", "localhost:5000/popule");
});

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
