describe("Test Get Random Recommendation", () => {
  it("Most get a Random Recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.populeBank();
    cy.intercept("GET", "/recommendations/random").as("GetRandom");
    cy.get("div>div>div:last").click();
    cy.wait("@GetRandom");
    cy.url().should("eq", "http://localhost:3000/random");
    cy.get("article").should("be.visible");
  });
});
