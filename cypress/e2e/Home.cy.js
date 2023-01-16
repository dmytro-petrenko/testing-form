const sabmitData = {
  firstName: 'John',
  lastName: 'Doe',
  dropDownItem: 'Menu item 2',
  calendarData: '01/15/2023',
  gender: 'male',
};

describe('Home page test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('Render Home page - Sucess case', () => {
    // Write First Name
    cy.get('input#first-name-input').type('John').should('have.value', 'John');

    // Write Last Name
    cy.get('input#last-name-input').type('Doe').should('have.value', 'Doe');

    // Select menu item
    cy.get('button#dropdown-button')
      .should('contains.text', 'Select item')
      .click();
    cy.get('ul > li').filter(':contains("Menu item 2")').click();
    cy.get('button#dropdown-button').should('contains.text', 'Menu item 2');
    // Enter the date to calendarPicker
    cy.get('input[placeholder="mm/dd/yyyy"]').type('01/15/2023');
    cy.get('input[placeholder="mm/dd/yyyy"]').should(
      'have.value',
      '01/15/2023'
    );
    // Select radio button
    cy.get('label').filter(':contains("Male")').click();
    cy.get('input[value="male"]').should('have.attr', 'checked');
    // Click Submit button
    cy.get('button[type="submit"]').click();

    // cy.intercept('POST', '/api/form', {
    //   body: {
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     dropDownItem: 'Menu item 2',
    //     calendarData: '01/15/2023',
    //     gender: 'male',
    //   },
    // }).as('backendAPI');

    // cy.wait('@backendAPI').then((interception) => {
    //   assert.isNotNull(interception.response.body, 'success submit data!');
    // });
    // cy.intercept('POST', '/api/form', (req) => {
    //   expect(req.body.firstName).to.equal('Joh');
    //   // expect(re)
    // });

    // Result - modal window
    cy.get('div[data-testid="modal-window"]')
      .children('h2')
      .should('contains.text', 'Success');
  });
  it('Render Home page - Failure case', () => {
    cy.get('button[type="submit"]').click();

    cy.get('div[data-testid="modal-window"]')
      .children('h2')
      .should('contains.text', 'Failure');
  });
});
