beforeEach(() => {
  cy.resetDataBase();
});

describe("Test Top recomendation", () => {
  it("Most Display Top Recomendations", () => {
    cy.visit("http://localhost:3000/top");
    cy.populeBank();
    cy.get("div>article").siblings().should("be.visible");
  });
});
