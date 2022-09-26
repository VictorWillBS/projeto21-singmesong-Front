beforeEach(() => {
  cy.resetDataBase();
});

describe("Up Vote Recommendation", () => {
  it("Most Upvote Last Recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.createRecomendation();
    cy.get("article:first>div:last").invoke("text").should("eq", "0");
    cy.intercept("POST", "recommendations/1/upvote").as("UpVote");
    cy.get("article:first>div:last>svg:first").click();
    cy.wait("@UpVote");
    cy.get("article:first>div:last").invoke("text").should("eq", "1");
  });
});
describe("DownVote Recommendation", () => {
  it("Most Downvote Last Recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.createRecomendation();
    cy.get("article:first>div:last").invoke("text").should("eq", "0");
    cy.intercept("POST", "recommendations/1/downvote").as("DownVote");
    cy.get("article:first>div:last>svg:last").click();
    cy.wait("@DownVote");
    cy.get("article:first>div:last").invoke("text").should("eq", "-1");
  });
  it("Most Downvote Recommendation 6 times and delete recommendation", () => {
    cy.visit("http://localhost:3000/");
    cy.createRecomendation();
    cy.get("article:first>div:last").invoke("text").should("eq", "0");
    cy.intercept("POST", "recommendations/1/downvote").as("DownVote");
    let i = 1;
    while (i <= 6) {
      cy.get("article:first>div:last>svg:last").click();
      i++;
    }
    cy.wait("@DownVote");

    cy.get("article:first").should("not.exist");
  });
});
