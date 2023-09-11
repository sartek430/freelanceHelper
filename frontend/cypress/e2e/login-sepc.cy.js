/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// cypress/integration/login.spec.js
describe("Page de connexion", () => {
  beforeEach(() => {
    cy.visit("/login"); // Visitez la page de login
  });

  it("Doit saisir un email valide", () => {
    cy.window().then((win) => {
      win.console.clear();
    });

    cy.get('input[type="email"]').type("email.invalid"); // Saisissez un email invalide
    cy.get('input[type="password"]').type("password123"); // Saisissez un mot de passe valide
    cy.get('button[type="submit"]').click(); // Cliquez sur le bouton de connexion

    cy.window().then((win) => {
      win.console.log("");
    });
  });

  it("Doit se connecter avec succès", () => {
    cy.get('input[type="email"]').type("test.test@gmail.com"); // Saisissez un email valide
    cy.get('input[type="password"]').type("test.test@gmail.com"); // Saisissez un mot de passe valide
    cy.get('button[type="submit"]').click(); // Cliquez sur le bouton de connexion

    cy.url().should("eq", Cypress.config().baseUrl + "/dashboard"); // Vérifiez que l'utilisateur est redirigé vers le tableau de bord
  });
});
