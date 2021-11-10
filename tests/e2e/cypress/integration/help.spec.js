const agencies = require('../fixtures/transit-agencies.json')

describe("Help page spec", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Clicking on Help takes user to Help", () => {
    cy.contains("Help")
      .click()

    cy.location("pathname").should("eq", "/help")
  })

  it("Contains a back link", () => {
    cy.contains("Help")
      .click()

    cy.contains("Go back")
      .then(($e) => {
        expect($e).attr("href").eql("/")
      })
  })

  it("Allows user to go back", () => {
    cy.contains("Help")
      .click()

    cy.contains("Go back")
      .click()

    cy.location("pathname").should("eq", "/")
  })

  it("Has help information for all transit agencies", () => {
    cy.contains("Help")
      .click()

    cy.contains(agencies[0].long_name)
    cy.contains(agencies[1].long_name)
    cy.contains(agencies[0].phone)
    cy.contains(agencies[1].phone)
  })

  it("Has help information for correct transit agency if clicking Help from a transit page", () => {
    cy.contains(agencies[0].short_name)
      .click()

    cy.contains(agencies[0].long_name)
    cy.contains(agencies[0].phone)
    cy.should("not.contain", agencies[1].long_name)
    cy.should("not.contain", agencies[1].phone)
  })
})
