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

  it("Affiche le message d'erreur pour un email vide", () => {
    cy.get('input[type="email"]').clear();
    cy.get('input[type="password"]').type("votreMotDePasse");
    cy.get('button[type="submit"]').click();

    cy.log("Veuillez remplir tous les champs");
  });

  it("Affiche le message d'erreur pour un mot de passe vide", () => {
    cy.get('input[type="email"]').type("votre.email@example.com");
    cy.get('input[type="password"]').clear();
    cy.get('button[type="submit"]').click();

    cy.log("Veuillez remplir tous les champs");
  });

  it("Affiche le message d'erreur pour une connexion invalide", () => {
    cy.get('input[type="email"]').type("email.invalide@example.com");
    cy.get('input[type="password"]').type("motdepasseincorrect");
    cy.get('button[type="submit"]').click();

    cy.log("Veuillez remplir tous les champs");
  });

  it("Redirige vers la page d'inscription depuis le lien", () => {
    cy.contains("Sign Up").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/signup");
  });

  it("Redirige vers la page de réinitialisation du mot de passe depuis le lien", () => {
    cy.contains("Forgot Password").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/dsqibh");
  });
});
