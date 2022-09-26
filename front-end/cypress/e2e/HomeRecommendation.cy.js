beforeEach(() => {
  cy.resetDataBase();
});
describe("Create New Recommendation", () => {
  it("Insert new Recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.intercept("POST", "/recommendations").as("PostRecommendation");
    cy.get('input[placeholder="Name"]').type("video legal");
    cy.get('input[placeholder="https://youtu.be/..."]').type(
      "https://www.youtube.com/watch?v=wFBp_PHXrf4"
    );
    cy.get("div>button").click();
    cy.wait("@PostRecommendation");
    cy.get("article:first>div").contains("video legal").should("be.visible");
  });
});

describe("Get timeline", () => {
  it("Most display Timeline", () => {
    cy.populeBank();

    cy.visit("http://localhost:3000/");
    cy.get("div>article").siblings().should("be.visible");
  });
});
