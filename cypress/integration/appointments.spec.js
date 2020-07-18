describe("Navigation", () => {
  beforeEach(() => {

    cy.request('GET', "/api/debug/reset") 

    cy.visit("/");

    cy.contains("Monday")
  })
  it("should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get('[data-testid=student-name-input]').type('Rishav Baral')

    cy.get("[alt='Tori Malcolm']").click()

    cy.contains("Save").click()

    cy.contains("SAVING")

    cy.contains(".appointment__card--show", "Rishav Baral")
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should edit an interview", () => {

    cy.get("[alt=Edit]").click({force:true})

    cy.get('[data-testid=student-name-input]').clear().type("Rishav Baral")

    cy.get("[alt='Tori Malcolm']").click()

    cy.contains("Save").click()

    cy.contains("SAVING")

    cy.contains(".appointment__card--show", "Rishav Baral")
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })
  it("should cancel an interview", () => {

    cy.get("[alt=Delete]")
      .click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");
    
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});